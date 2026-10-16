const SPEED_SENSITIVITY = 3;
const SMOOTH_ENERGY = 0.8;
const BLEND = "screen";

(() => {
  const targetDiv =
    document.querySelector(".main___ruler--ctnr .cursor-index") ||
    document.querySelector(".cursor-index");
  if (!targetDiv) return;

  const canvas = document.createElement("canvas");

  const gl = canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: false,
    antialias: false,
  });
  if (!gl) return;

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  const VERT = `
    attribute vec2 aPos;
    void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }
  `;

  const FRAG = `
    precision highp float;
    uniform vec2  uRes;
    uniform float uTime;
    uniform float uEnergy; 
    uniform vec2  uDir;    

    float hash(vec2 p){
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }
    
    float noise(vec2 p){
      vec2 i = floor(p), f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                 mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
    }

    float ridgeNoise(vec2 p) {
      float v = 0.0, a = 0.5;
      for (int i = 0; i < 4; i++) {
        v += a * (1.0 - abs(noise(p) - 0.5) * 2.0);
        p = p * 2.6 + vec2(uTime * 0.5, 9.3);
        a *= 0.45;
      }
      return v;
    }

    float drawRadialArc(vec2 p, float radius, float offset, float speed, float thickness) {
      float angle = atan(p.y, p.x);
      
      float lNoise = ridgeNoise(vec2(angle * 1.5 + offset, uTime * speed));
      float targetRadius = radius + (lNoise - 0.5) * (0.12 + uEnergy * 0.18);
      
      float dist = abs(length(p) - targetRadius);
      // Épaisseur diminuée de 10% (0.0198 au lieu de 0.022)
      return (thickness * 0.0198) / max(dist, 0.007);
    }

    void main(){
      vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / (0.5 * uRes.y); 
      vec2 d = normalize(uDir);
      float along = dot(p, d);
      float perp  = dot(p, vec2(-d.y, d.x));
      float e = uEnergy;

      float stretch = 1.0 + e * 2.0;
      float a = along > 0.0 ? along / stretch : along * 1.1;
      vec2 uv = vec2(a, perp);

      // Couches d'arcs réduites de 10% (0.72, 0.54, 0.36 au lieu de 0.8, 0.6, 0.4)
      float arc1 = drawRadialArc(uv, 0.32, 0.0, 12.0, 0.72);
      float arc2 = drawRadialArc(uv, 0.28, 50.0, 22.0, 0.54) * (0.5 + 0.5 * noise(vec2(uTime * 18.0)));
      float arc3 = drawRadialArc(uv, 0.35, -120.0, 32.0, 0.36) * (0.3 + 0.7 * noise(vec2(uTime * 40.0)));
      
      // Lueur du noyau diminuée de 10% (0.63 au lieu de 0.7)
      float centerGlow = exp(-length(uv) * 5.5) * 0.63 * (1.0 + ridgeNoise(uv * 2.5 + uTime * 5.0));
      
      float totalElectricity = arc1 + arc2 + arc3 + centerGlow;

      vec3 coreColor = vec3(0.9, 0.97, 1.0) * totalElectricity;
      vec3 glowColor = vec3(0.0, 0.5, 1.0) * pow(totalElectricity, 1.2);
      vec3 finalColor = coreColor + glowColor;

      float mask = 1.0 - smoothstep(0.85, 1.0, abs(p.x / (uRes.x / uRes.y)));

      float alpha = clamp(totalElectricity * 0.9, 0.0, 1.0) * mask;
      vec3 rgb = clamp(finalColor, 0.0, 1.0) * mask;

      gl_FragColor = vec4(rgb, alpha);
    }
  `;

  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  }

  const vs = compile(gl.VERTEX_SHADER, VERT);
  const fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return;

  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW
  );
  const loc = gl.getAttribLocation(prog, "aPos");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, "uRes");
  const uTime = gl.getUniformLocation(prog, "uTime");
  const uEnergy = gl.getUniformLocation(prog, "uEnergy");
  const uDir = gl.getUniformLocation(prog, "uDir");

  [
    ["position", "absolute"],
    ["top", "55%"],
    ["left", "50%"],
    ["transform", "translate(-50%, -50%)"],
    ["width", "100%"],
    ["height", "100%"],
    ["pointer-events", "none"],
    ["background", "none"],
  ].forEach(([k, v]) => canvas.style.setProperty(k, v, "important"));

  targetDiv.style.setProperty("mix-blend-mode", BLEND, "important");
  targetDiv.appendChild(canvas);

  let lastX = targetDiv.getBoundingClientRect().left;
  let targetEnergy = 0,
    currentEnergy = 0;
  let dirX = 0,
    dirY = 1;
  let canvasW = 0,
    canvasH = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = targetDiv.getBoundingClientRect();
    canvasW = Math.round(rect.width * dpr);
    canvasH = Math.round(rect.height * dpr);
    if (canvas.width !== canvasW || canvas.height !== canvasH) {
      canvas.width = canvasW;
      canvas.height = canvasH;
      gl.viewport(0, 0, canvasW, canvasH);
    }
  }

  const t0 = performance.now();
  function frame(now) {
    resize();
    const currentX = targetDiv.getBoundingClientRect().left;
    const dx = currentX - lastX;
    lastX = currentX;

    if (Math.abs(dx) > 0.05) {
      targetEnergy = Math.min(1, Math.abs(dx) / SPEED_SENSITIVITY);
    } else {
      targetEnergy *= 0.82;
    }
    currentEnergy += (targetEnergy - currentEnergy) * SMOOTH_ENERGY;

    let tx = 0;
    let ty = 0.25;
    if (currentEnergy > 0.02) {
      tx = dx > 0 ? -1.0 : 1.0;
      ty = 0.01;
    }

    const dLen = Math.hypot(tx, ty);
    dirX += (tx / dLen - dirX) * 0.22;
    dirY += (ty / dLen - dirY) * 0.22;

    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform2f(uRes, canvasW, canvasH);
    gl.uniform1f(uTime, (now - t0) * 0.001);
    gl.uniform1f(uEnergy, currentEnergy);
    gl.uniform2f(uDir, dirX, dirY);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

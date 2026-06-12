var form = document.getElementById("my-form");
    
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);

  // Vérification du captcha avant envoi
  if (grecaptcha.getResponse().length === 0) {
      status.innerHTML = "Veuillez valider le captcha.";
      return;
  }

  fetch("https://formspree.io", {
    method: "POST",
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Merci pour votre message !";
      form.reset();
      grecaptcha.reset(); // Réinitialise le captcha
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
        } else {
          status.innerHTML = "Oups ! Un problème est survenu.";
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Oups ! Impossible d'envoyer le formulaire.";
  });
}

form.addEventListener("submit", handleSubmit)

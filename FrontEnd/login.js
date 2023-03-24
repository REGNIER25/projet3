

// Envoi du formulaire
formulaire.addEventListener("submit", function(event) {

// Récupération du formulaire 
const formulaire = document.querySelector("form");

// Récupèration des champs email et password
const email = document.getElementById("email");
const password = document.getElementById("password");

    // Validation des données
    let erreurs = validerPersonne(email.value, password.value);
  
    // Si il y a des erreurs
    if (erreurs.length > 0) {
       // Ajoute les erreurs à la fin de ul.message
       ajouterFinListe(eleMessage, erreurs);
    } else {
       // Envoi du formulaire
       eleFormulaire.submit();
    }
    
  });








//Récupération du token dans la session
var token = sessionStorage.getItem("token");


//Redirection vers la page d’accueil quand la connexion est confirmée.
function redirection(){document.location.href="index.html"; }

//Si combinaison est fausse, message d'erreur
alert("Le nom de l'utilisateur et/ou le mot de passe sont incorrects !");
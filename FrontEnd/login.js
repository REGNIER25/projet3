
const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4";

// Requête avec méthode POST pour envoyer les valeurs rentrées dans le formulaire avec Fetch
//(remplace action du html)


//appel à l'API
fetch("http://localhost:5678/api/users/login")

  //réponse du back-end (promise)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })

  //traitement (promise)
  .then(function (users) {
    (users)

    //création variable pour un projet avec la boucle for ... of ...
    for (let user of users) {

//function go(form_element){
  //var form_element_id = form_element.id;
  //alert("L’élément portant l'ID `" + form_element_id + "` à été cliqué !");
//}

    }
  })

  //si erreur
  .catch(function (error) {
    (error);
  });

  // l'evenement permet de détecter sur quel composant le clic est passé   
  input.onclick.addEventListener= function(fonctionAExecuter) {
    ('click', event => {alert("marche");
});
};

//création variable login
let login = {email: "", password: ""};

//liaison avec backend
//fichier JS pour te connecter à l'API via les routes indiquées dans Swagger.
let response = await fetch("http://localhost:5678/api/users/login", {
  method: "POST",
  body: JSON.stringify(user)
});

//objet FormData, pour soumettre les données

let result = await response.json();
alert(result.message);
Veuillez noter que si la requête body est un string, 
alors l’en-tête Content-Type est défini sur text/plain;charset=UTF-8 par défaut.

Si nous envoyons du JSON, on utilise à la place l’option headers pour envoyer application/json, 
le bon Content-Type pour les données encodées en JSON.

Un clic sur le bouton “submit” envoie les données au serveur.

  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();};

    async function submit() {
      let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
      let response = await fetch('/article/fetch/post/image', {
        method: 'POST',
        body: blob
      });

      // le serveur répond avec confirmation et la taille de l'image
      let result = await response.json();
      alert(result.message);}

Veuillez noter qu’ici, nous ne définissons pas l’en-tête Content-Type manuellement, 
car un objet Blob a un type intégré 
(ici image/png, tel que généré par toBlob). 
Pour les objets Blob, ce type devient la valeur de Content-Type.

//Fonction submit() peut être réécrite sans async/await comme ceci :
function submit() {
  canvasElem.toBlob(function(blob) {
    fetch('/article/fetch/post/image', {
      method: 'POST',
      body: blob
    })
      .then(response => response.json())
      .then(result => alert(JSON.stringify(result, null, 2)))
  }, 'image/png');
}

//requête fetch typique se compose de deux appels await :
let response = await fetch(url, options); // se résout avec des en-têtes de réponse
let result = await response.json(); // lit le corps en tant que JSON

//sans await :
fetch(url, options)
  .then(response => response.json())
  //Propriétés de réponse :
response.status – Code HTTP de la réponse,
response.ok – true est le statut 200-299.
response.headers – objet Map-like avec en-têtes HTTP.
  .then(result => /* process result */)
//Méthodes pour obtenir le corps de réponse :
response.text() – retourne la réponse sous forme de texte,
response.json() – analyse la réponse en tant qu’objet JSON,
response.formData() – retourne la réponse en tant qu’objet FormData 
(encodage multipart/form-data, voir le chapitre suivant),
response.blob() – retourne la réponse en tant que Blob 
(données binaires avec type),
response.arrayBuffer() – retourne la réponse en tant que ArrayBuffer 
(données binaires de bas niveau),
Options de fetch jusque là :

method : Méthode HTTP,
headers : un objet avec en-têtes de requête (aucun en-tête n’est autorisé),
body : les données à envoyer (corps de la demande) 
en tant que string, FormData, BufferSource, Blob ou objet UrlSearchParams.

//Si combinaison utilisateur - mot de passe est correcte, comment rediriger vers la page d’accueil 
et s’assurer que la configuration est maintenue ? 

function Création session
//Redirection vers la page d’accueil quand la connexion est confirmée.
function redirection(){document.location.href="index.html"; }
comment savoir si on a envoyé le bon email et le bon mot de passe : réponse de ton API et le status : 200

//Si combinaison est fausse, comment prévenir l’utilisateur ?
//Message d’erreur quand les infos utilisateur/mot de passe ne sont pas correctes.
function erreur (){alert("Le nom de l'utilisateur et/ou le mot de passe sont incorrects !");}

//Stocker le token d'authentification pour pouvoir réaliser les envois et suppressions de travaux.

//Créer constante token


Dans le localStorage du navigateur tu peux m'être ton token et après tu fait une condition 
si mon token est présent dans mon localStorage alors mon user et connecter.

Fait plutôt un sessionStorage c'est mieux pour rafraichir et pour deconnecter


//Compte de test pour Sophie Bluel //email: sophie.bluel@test.tld //password: S0phie 
POST/users/login ; Log In the user. Request body

{"email": "string","password": "string"}

{"userId": 1,
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4"
}



//Détecter le clic sur le bouton de validation

//Récupérer l'ensemble des valeurs des formulaires

// Formater les valeurs pour les envoyer vers le BE

//Envoyer les données au BE

//Traitement de la réponse et renvoi vers la page d'accueil si bon login



//PREMIER APPEL
//url et options (méthode, en-tête de requête, corps de la demande avec données à envoyer en tant que string)

let response = await fetch("http://localhost:5678/api/users/login", {
  method: "POST",
  headers: {"accept":"application/json","Content-type":"text/plain"},
  body: JSON.stringify(user)});

//DEUXIEME APPEL
//réponse du back-end (promise) en lisant le body en JSON (traitement)
//Pour obtenir le corps de réponse : analyse la réponse en tant qu’objet JSON

  let result = await response.json(); 


//si erreur
.catch(function (error) {
   (error);
 });


// Envoi du formulaire
formulaire.addEventListener("submit", function(event) {

// Récupération du formulaire 
const formulaire = document.querySelector("form");

// Récupèration des champs email et password (données du formulaire)
let email = document.getElementById("email");
let password = document.getElementById("password");

// l'evenement permet de détecter sur quel composant le clic est passé   
input.onclick.addEventListener= function(submit) {
   ('click', event => {alert("");});};

 // Envoi du formulaire
 formulaire.submit();


//création variables login (email et password)
let email= " ";
let password = " ";

 // Validation des données

    function validerPersonne(email, password) {
//création tableau login


      let tabloLogin = [(email),(password)];}

      //Créer variable token  
var token = sessionStorage.getItem("token");

//"userId": 1,
  
    // Si il y a des erreurs (conditions)
   // email != "" || password !="")

    .then(valid => {if (!valid) {
       //Si combinaison est fausse, message d'erreur
       {alert("Le nom de l'utilisateur et/ou le mot de passe sont incorrects !");
    } else {

//vérifier si les deux sont bons puis renvoyer le token
result.status(200).json({
   userId: "userId",
   token: "token"});})

      //Enregistrer le token d'authentification dans le sessionStorage (navigateur)
//sessionStorage.setItem('clé', 'valeur');
sessionStorage.setItem("token", token);

//Redirection vers la page d’accueil quand la connexion est confirmée via le token
function redirection(if token!=null){document.location.href="index.html"; }
      
    }
    
  });

  //email: sophie.bluel@test.tld //password: S0phie 
//{"userId": 1,
//"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4"
//}
//POST/users/login ; Log In the user. Request body

.then(response => response.json())
//Propriétés de réponse :
response.status : Code HTTP de la réponse,
response.ok : true est le statut 200-299.
response.headers : objet Map-like avec en-têtes HTTP.
.then(result => /* process result */)

function (users) {
  //création variable avec la boucle for ... of ...
  for (let user of users) {

//Fonction submit() peut être réécrite sans async/await
//Un clic sur le bouton “submit” envoie les données au serveur.
function submit() {
input.onclick.addEventListener(function(user) {
  fetch("http://localhost:5678/api/users/login", {
    method: 'POST',
    body: blob})

    .then(response => response.json())

    .then(result => alert(JSON.stringify(result, null, 2)))
}, 'image/png');}

async function submit() {
let user = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
let response = await fetch('/article/fetch/post/image', {
  method: 'POST', body: });

//Si combinaison utilisateur/mot de passe correcte, rediriger vers l’accueil avec une configuration maintenue
exports.login = (req, res, next) => {
User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
        }
        bcrypt.compare(req.body.password, user.password)
          
//Storage.setItem() pour l'interface Storage, lorsque lui sont passées le duo clé-valeur, 
//les ajoute à l'emplacement de stockage, sinon elle met à jour la valeur si la clé existe déjà.

storage.setItem(nomClé, valeurClé);
Copy to Clipboard
Paramètres
nomClé
//DOMString contenant le nom de la clé que l'on souhaite créer/modifier.

//valeurClé//C'est une DOMString contenant la valeur associée à son nom de clé que l'on souhaite créer/modifie

function creationSession
if(!localStorage.getItem('bgcolor')) {populateStorage();} else {setStyles();}

function populateStorage() {
localStorage.setItem('bgcolor', document.getElementById('bgcolor').value);
localStorage.setItem('font', document.getElementById('font').value);
localStorage.setItem('image', document.getElementById('image').value);

function setStyles() {
var currentImage = localStorage.getItem('image');

document.getElementById('bgcolor').value = currentColor;
document.getElementById('font').value = currentFont;
document.getElementById('image').value = currentImage;

htmlElem.style.backgroundColor = '#' + currentColor;
pElem.style.fontFamily = currentFont;
imgElem.setAttribute('src', currentImage);}

comment récupéere value input dom ??

formdata
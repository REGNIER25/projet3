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
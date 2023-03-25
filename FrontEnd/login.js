
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
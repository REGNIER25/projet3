


  const boutonValider = document.getElementById("submit");

  //1) Détecter le clic sur le bouton de validation
    boutonValider.onclick = async function(event){
    event.preventDefault();

//2) Récupérer l'ensemble des valeurs du formulaire
      let inputEmail = document.getElementById("email").value;
      let inputPassword = document.getElementById("password").value;

    //3) Formater les valeurs pour les envoyer vers le serveur
let tabloSubmit = {email:inputEmail, password:inputPassword};

//4) Envoyer les données formatées du formulaire au serveur
let response = await fetch("http://localhost:5678/api/users/login", {
method: "POST",
headers: { "accept": "application/json" , "Content-type": "application/json" },
body: JSON.stringify(tabloSubmit)
});
    

// //5) Traitement de la réponse et renvoi vers la page d'accueil si bonne combinaison
let result = await response.json();
   

function validationUser() {

      //Si mauvaise combinaison
      //bloquer le script
if (result.status == 401) {
  alert("Le nom de l'utilisateur et/ou le mot de passe sont incorrects !"); 
}



  
// Si bonne combinaison
//Redirection vers la Page d'accueil quand la connexion est confirmée via le token
//Création localStorage avec stockage du token
else (result.status==200) 


{localStorage.getItem(userId,token), document.location.href = "index.html"};

  
}}

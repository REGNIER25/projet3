//1) Détecter le clic sur le bouton de validation





  const boutonValider = document.getElementById("submit");
    boutonValider.onclick = function(){
    console.log("clic !");
    }


//2) Récupérer l'ensemble des valeurs du formulaire

let inputEmail = document.getElementById("email").value;

let inputPassword = document.getElementById("password").value;

boutonValider.addEventListener('click', function() {console.log(inputEmail + " et " + inputPassword)});



boutonValider.onclick = function() {

  alert('Salut ' + inputEmail + ', sympa de vous voir !');
}



//3) Formater les valeurs pour les envoyer vers le serveur
//let tabloSubmit = [(inputEmail), (inputPassword)];

//4) Envoyer les données formatées du formulaire au serveur
//let response = await fetch("http://localhost:5678/api/users/login", {
  //method: "POST",
  //headers: { "accept": "application/json", "Content-type": "text/plain" },
  //body: JSON.stringify(users)
//});

//5) Traitement de la réponse et renvoi vers la page d'accueil si bonne combinaison
//let result = await response.json();

//Si mauvaise combinaison
//if (result.status !== 200) { 
  
  //alert("Le nom de l'utilisateur et/ou le mot de passe sont incorrects !"); 

//}

//Si bonne combinaison
//else {

  //result.status(200).json(userId, token)

//};

  //Création Storage (local ou session ?) avec stockage du token
  //function creationSession()

  //let token = sessionStorage.getItem("token");


  //Redirection vers la Page d'accueil quand la connexion est confirmée via le token
  //function redirection(token!== null) { document.location.href = "index.html"; };
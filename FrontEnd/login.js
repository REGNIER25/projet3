


  const boutonValider = document.getElementById("submit");

  //1) Détecter le clic sur le bouton de validation
    boutonValider.onclick = async function(event){
    event.preventDefault();

//2) Récupérer l'ensemble des valeurs du formulaire
      let inputEmail = document.getElementById("email").value;
      let inputPassword = document.getElementById("password").value;

    //3) Formater les valeurs pour les envoyer vers le serveur
let tabloSubmit = {inputEmail, inputPassword};

// //4) Envoyer les données formatées du formulaire au serveur
// let response = await fetch("http://localhost:5678/api/users/login", {
//   method: "POST",
//   headers: { "accept": "application/json" , "Content-type": "application/json" },
//   body: JSON.stringify(tabloSubmit)
// });

// //5) Traitement de la réponse et renvoi vers la page d'accueil si bonne combinaison
// let result = await response.json();
    
      // Afficher les valeurs
      console.log(tabloSubmit);
    }




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
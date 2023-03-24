//POST/users/login ; Log In the user. Request body

//POST pour envoyer à l'API les valeurs rentrées dans le formulaire avec Fetch

//sans await :
fetch(url, options)
  .then(response => response.json())
  //Propriétés de réponse :
response.status : Code HTTP de la réponse,
response.ok : true est le statut 200-299.
response.headers : objet Map-like avec en-têtes HTTP.
  .then(result => /* process result */)
//Méthodes pour obtenir le corps de réponse :
response.text(): retourne la réponse sous forme de texte,
response.json() : analyse la réponse en tant qu’objet JSON,
response.formData() :retourne la réponse en tant qu’objet FormData 
(encodage multipart/form-data, voir le chapitre suivant)

//PREMIER APPEL AWAIT (then)
//url et options (méthode, en-tête de requête, corps de la demande avec données à envoyer)
let response = await fetch("http://localhost:5678/api/users/login", {
  method: "POST",
  headers: {"accept":"application/json","Content-type":"application/json"},
  body: JSON.stringify(user)
});

//body : les données à envoyer (corps de la demande) en tant que string, FormData
//Si la requête body est un string, l’en-tête Content-Type 
//est défini sur text/plain;charset=UTF-8 par défaut.
//Si on envoit du JSON, on utilise à la place l’option headers pour envoyer application/json, 
//le bon Content-Type pour les données encodées en JSON.


//DEUXIEME APPEL AWAIT (then) avec réponse du back-end (promise)
  //.then(function (response) {if (response.ok) {return response.json();}})
  let result = await response.json(); // lit le corps en tant que JSON (traitement)

  function (users) {
    //création variable avec la boucle for ... of ...
    for (let user of users) {


//Fonction submit() peut être réécrite sans async/await
//Un clic sur le bouton “submit” envoie les données au serveur.
function submit() {
  input.onclick.addEventListener(function(user) {
    fetch("http://localhost:5678/api/users/login", {
      method: 'POST',
      body: blob
    })
      .then(response => response.json())
      .then(result => alert(JSON.stringify(result, null, 2)))
  }, 'image/png');
}
  // l'evenement permet de détecter sur quel composant le clic est passé   
  input.onclick.addEventListener= function(submit) {
    ('click', event => {alert("marche");
});
};
//function go(form_element){
  //var form_element_id = form_element.id;
  //alert("L’élément portant l'ID `" + form_element_id + "` à été cliqué !");
//}


async function submit() {
  let user = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
  let response = await fetch('/article/fetch/post/image', {
    method: 'POST', body: });

  // reponse du back-end
  let result = await response.json(); alert(result.message);}

//création variables login (email et password)
let email= " ";
let password = " ";
//création tableau login
let tabloLogin = [(email),(password)];

//recup données du formulaire

/**
 * Valide le nom et l'âge d'une personne et retourne un tableau d'erreurs
 * @return {Array} Tableau de messages d'erreur
 */
function validerPersonne(nom, age) {
  // Initialisation du tableau des erreurs
  const erreurs = [];

  //Supprime les espaces en début et fin de chaine
  nom = nom.trim();

  //Converti l'age en entier
  age = parseInt(age);

  // Si le nom vide
  if (nom === "") {
     erreurs.push("Entrez un nom !");
  }

  // Si l'âge n'est pas un nombre entier compris entre 0 et 120
  if (Number.isNaN(age) || age < 1 || age > 119) {
     erreurs.push("Entrez un age valide !");
  }

  return erreurs;
}

/**
* Ajoute le contenu d'un tableau à la fin d'une liste HTML
* @param {HTMLElement} eleListe - Liste HTML (ol ou ul) à remplir
* @param {Array} erreurs - tableau de String
*/
function ajouterFinListe(eleListe, erreurs) {
  // Parcours les messages d'erreur
  for (message of erreurs) {
     // Ajoute un li au contenu de la liste
     eleListe.innerHTML += "<li>" + message.toString() + "</li>";
  }
}





//objet FormData, pour soumettre les données
let result = await response.json();
alert(result.message);

Un objet implémentant FormData peut être utilisé directement dans une structure for…of, au lieu de entries() : for (var p of myFormData) est équivalent à for (var p of myFormData.entries()).



Constructeur
FormData()
Crée un nouvel objet FormData.

Méthodes
FormData.append()
Ajoute une nouvelle valeur à une clé existante dans un objet FormData, ou ajoute la clé si elle n'existe pas encore.

FormData.delete()
Supprime une paire clé/valeur d'un objet FormData.

FormData.entries()
Renvoie un itérateur permettant de passer en revue toutes les paires clé/valeur contenues dans cet objet.

FormData.get()
Renvoie la première valeur associée à une clé donnée à partir d'un objet FormData.

FormData.getAll()
Renvoie un tableau de toutes les valeurs associées à une clé donnée à partir d'un objet FormData.

FormData.has()
Renvoie un booléen indiquant si un objet FormData contient une certaine clé.

FormData.keys()
Renvoie un itérateur permettant de parcourir toutes les clés des paires clé/valeur contenues dans cet objet.

FormData.set()
Définit une nouvelle valeur pour une clé existante dans un objet FormData, ou ajoute la clé/valeur si elle n'existe pas encore.

FormData.values()
Renvoie un itérateur permettant de parcourir toutes les valeurs contenues dans cet objet.


//Si combinaison utilisateur - mot de passe est correcte, rediriger vers la page d’accueil 
//avec une configuration maintenue
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
      .then(user => {
          if (!user) {
              return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
          }
          bcrypt.compare(req.body.password, user.password)
              .then(valid => {
                  if (!valid) {
                      return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                  }
//vérifier si les deux sont bons puis renvoyer le token

                  res.status(200).json({
                      userId: user._id,
                      token: 'TOKEN'
                  });
              })
              .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};




Storage.setItem()
La méthode setItem() de l'interface Storage, lorsque lui sont passées le duo clé-valeur, 
les ajoute à l'emplacement de stockage, sinon elle met à jour la valeur si la clé existe déjà.

storage.setItem(nomClé, valeurClé);
Copy to Clipboard
Paramètres
nomClé
C'est une DOMString contenant le nom de la clé que l'on souhaite créer/modifier.

valeurClé
C'est une DOMString contenant la valeur associée à son nom de clé que l'on souhaite créer/modifie


function Création session
//Stocker le token d'authentification du BE dans le navigateur (session)
//Créer variable token

//Grâce à la clé initialement créée avec setItem il est possible de récupérer facilement les données. 
//Ces dernières sont renvoyées sous la forme d'une chaîne de caractère.

//Stockage du token dans le sessionStorage du navigateur pour rafraichir et pour deconnecter

sessionStorage.setItem("token","vert")

//Le premier argument de setItem est la clé (toujours de type String). 
//Elle précise l'endroit où sont stockées les données afin de pouvoir les y retrouver ultérieurement.

//condition si mon token est présent dans mon localStorage alors mon user et connecter.



//Compte de test pour Sophie Bluel //email: sophie.bluel@test.tld //password: S0phie 
//{"userId": 1,
//"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4"
//}

else


    } })

  //si erreur
  .catch(function (error) {(error);});


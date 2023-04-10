//déclaration constante pour la gallerie des travaux
const gallery = document.getElementById("gallery");

// déclaration constante pour les filtres (div)
const filtres = document.getElementById("filtres");

//déclaration constante pour le bandeau noir
const bandeau = document.getElementById("bandeau");

//déclaration constante pour le lien Login/Logout
const log = document.getElementById("log");

//déclaration constante pour le lien Login/Logout
const modifier = document.getElementById("modifier");

//déclarations constantes (temporaires) pour la modale (v1 et v2)
const modaleVersion1 = document.getElementById("modaleVersion1");
const modaleVersion2 = document.getElementById("modaleVersion2");

//déclaration constante pour la galerie des travaux de la Modale
const modalGallery = document.getElementById("modal-gallery");


//méthode pour récupérer les travaux (données) avec liaison avec le backend
fetch("http://localhost:5678/api/works")

  //réponse du back-end (promise)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })

  //traitement (promise)
  .then(function (works) {

    //création variable pour un projet avec la boucle for ... of ...
    for (let work of works) {
      let figure = document.createElement("figure");


      // Rajout attribut data- pour avoir un sélecteur permettant de filtrer les travaux
      figure.setAttribute("data-categoryid", work.categoryId)

      //création de la balise img
      let img = document.createElement("img");

      //création attribut src
      img.setAttribute("src", work.imageUrl);

      //création attribut alt
      img.setAttribute("alt", work.title);

      figure.appendChild(img);

      let figcaption = document.createElement("figcaption");
      figcaption.innerHTML = work.title;
      figure.appendChild(figcaption);

      gallery.appendChild(figure);

      //création de la galerie de la Modale
      let div = document.createElement("div");
      div.setAttribute("data-categoryid", work.categoryId);
      let modalImg = document.createElement("img");
      modalImg.setAttribute("src", work.imageUrl);
      modalImg.setAttribute("alt", work.title);
      div.appendChild(modalImg);
      let editer = document.createElement("p");
      editer.innerHTML = "éditer";
      div.appendChild(editer);
      

      //création classe pour travaux de la galerie de la Modale (CSS)
      div.setAttribute("class", "style-modal-gallery")

      // icônes sur les travaux de la galerie de la Modale (CSS)
      let span = document.createElement("span");
      span.setAttribute("class", "style-modal-icone");
      let iconeFleche = document.createElement("i");
      let iconePanier = document.createElement("i");
      iconeFleche.setAttribute("class", "fa-solid fa-arrows-up-down-left-right");
      iconePanier.setAttribute("class", "fa-regular fa-trash-can");
      span.appendChild(iconeFleche);
      span.appendChild(iconePanier);
      div.appendChild(span);
      modalGallery.appendChild(div);

    }
  })

  //si erreur
  .catch(function (error) {
    (error);
  });


//création premier bouton qui a toutes les catégories par défaut
let buttonAll = document.createElement("button");

buttonAll.setAttribute("class", "filtre");
buttonAll.setAttribute("type", "button");
buttonAll.setAttribute("id", 0);
buttonAll.setAttribute("value", "Tous");

//affichage dans le HTML
buttonAll.innerHTML = "Tous";
filtres.appendChild(buttonAll);
//comportement par défaut
buttonAll.addEventListener('click', event => { filtering(0) });

//Méthode pour récupérer les catégories (données) avec liaison avec le backend
fetch("http://localhost:5678/api/categories")

  .then(function (response) {
    if (response.ok) { return response.json(); }
  })

  //traitement
  .then(function (categories) {
    for (let category of categories) {

      //création buttonCategories
      let buttonCategories = document.createElement("button");

      //création attributs buttonCategories dont données du Back-end (id, name)
      buttonCategories.setAttribute("class", "filtre");
      buttonCategories.setAttribute("type", "button");
      buttonCategories.setAttribute("id", category.id);
      buttonCategories.setAttribute("name", category.name);
      buttonCategories.setAttribute("value", category.name);

      // Sélection de buttonCategories (HTML) pour récupérer les category.name et générer les 3 boutons
      buttonCategories.innerHTML = category.name;

      // Intégration du buttonCategories rattaché à la div filtres
      filtres.appendChild(buttonCategories);



      //Méthode pour détecter le clic sur les filtres et récupérer le category.id de la catégorie
      buttonCategories.addEventListener('click', event => {
        filtering(category.id)
      });
    }
  })
  //si erreur
  .catch(function (error) { (error); });


//Fonction pour filtrer les catégories et toute la liste des travaux
function filtering(categoryID) {

  if (categoryID == 0) {
    let figuresToShow = gallery.querySelectorAll(`figure`);
    for (let figureToShow of figuresToShow) {
      //intégration CSS display:block; en JS pour afficher
      figureToShow.style.display = "block";
    }
  }
  else {
    // Création variable figuresToShow 
    //pour afficher par défaut toutes les figures dans le DOM avec gallery.querySelectorAll
    let figuresToShow = gallery.querySelectorAll(`figure[data-categoryid="${categoryID}"]`);
    for (let figureToShow of figuresToShow) {
      //intégration CSS display:block; en JS pour afficher
      figureToShow.style.display = "block";
    }

    //not pour sélectionner les figures des catégories non voulues
    let figures = gallery.querySelectorAll(`figure:not([data-categoryid="${categoryID}"])`);
    for (let figure of figures) {
      //intégration CSS display:none; en JS pour cacher
      figure.style.display = "none";
    }
  }
}

//Récupérer token d'authentification (condition)
//le mettre dans login.js ???
let tokenRecup = localStorage.getItem("token");
console.log (tokenRecup)

//Bandeau noir
bandeau.setAttribute("class", "bandeau");
let spanEdition = document.createElement("span");
spanEdition.setAttribute("class", "mode-edition");
let iPenToSquare = document.createElement("i");
iPenToSquare.setAttribute("class", "fa-regular fa-pen-to-square");
//comment afficher l'icône ?
spanEdition.appendChild(iPenToSquare);
spanEdition.innerHTML = "Mode édition";
bandeau.appendChild(spanEdition);
let inputPublier = document.createElement("input");
inputPublier.setAttribute("class", "inputbandeau");
inputPublier.setAttribute("type", "button");
inputPublier.setAttribute("value", "Publier les changements");
bandeau.appendChild(inputPublier);

//Logout (Connexion) à la place de Login (déconnexion)
let loginLogout = document.createElement ("a");
loginLogout.setAttribute("class", "login");
loginLogout.setAttribute("href", "login.html");
//Passer de l'un à l'autre
loginLogout.innerText = "Login";
loginLogout.innerText = "Logout";
log.appendChild(loginLogout);

//Modifier
modifier.setAttribute("class", "modifier");
let iModifier = document.createElement("i");
iModifier.setAttribute("class", "fa-regular fa-pen-to-square");
//comment afficher l'icône ?
modifier.appendChild(iModifier);
modifier.textContent = "Modifier";

//Masquer les filtres (mettre token en condition)
//filtres.style.display = "none";

//création modale (Version 1) (temporaire)
//cliquer sur quoi pour l'ouvrir ???
modaleVersion1.setAttribute("class", "modal");
let p = document.createElement("p");
p.setAttribute("class", "croix");
p.textContent = "X";
modaleVersion1.appendChild(p);




		// 	<div class="modal-wrapper">Galerie photo</div>

		// 	<div id="modal-gallery">

		// 	</div>

		// 	<hr>

		// 	<div id="ajoutphoto">
		// 		<form>
		// 			<input id="submit" type="submit" value="Ajouter une photo">
		// 		</form>

		// 		<p><a class="supprimergalerie" href="#">Supprimer la galerie</a></p>

		// 	</div>


		// </aside> */}


let modale = document.createElement("aside");
modale.setAttribute("class", "modal");

let divFlecheCroix = document.createElement("div");

//hr
let hr = document.createElement("hr");

//Fonction pour fermer modale (croix ou hors modale) (event)function closeModal


//flèche pour retour en arrière


//Suppression projet existant (demande confirmation ?) = delete
//Clic sur la corbeille (Event)
console.log ("cliqué")
//1) Détecter le clic sur le bouton de validation
// boutonValider.onclick = async function (event) {
//   event.preventDefault();

//   //2) Récupérer l'ensemble des valeurs du formulaire
//   let inputEmail = document.getElementById("email").value;
//   let inputPassword = document.getElementById("password").value;

//3) Formater l'id du projet pour l'envoyer vers le serveur
let supprimerProjet = {"id":id};

//4) Envoyer l'id du projet au serveur (promesse)
//let response = await fetch("http://localhost:5678/api/works/{Id}"), {
//method: "DELETE", body: JSON.stringify(supprimerProjet)});

//   // //5) Traitement de la réponse
//   // Si bonne combinaison, création localStorage 
//   //avec stockage du token et redirection vers l'accueil
//   if (response.ok === true) {

//     let result = await response.json()
//     localStorage.setItem("token", result.token)
//     document.location.href = "index.html"

//   }

//   //Si mauvaise combinaison
//   else {

//     alert("Le nom de l'utilisateur et/ou le mot de passe sont incorrects !");

//   }

// }
//let supprimerProjet = document.getElementById("");
//requête Fetch pour supprimer un projet de la BDD et donc de la galerie (DOM)
//DELETE par rapport au id du projet
//réponse API

//Clic sur Bouton ajouter photo (Event)
console.log ("cliqué")





//création modale (Version 2) (temporaire)

//1) Détecter le clic sur le bouton de validation (Event)
// boutonValider.onclick = async function (event) {console.log ("cliqué")}
//   event.preventDefault();
//Gestion des erreurs (bouton Valider reste désactivé)

//création formulaire envoi photo
let formulaireProjet = document.createElement("form");
//<form id="contact" enctype="multipart/form-data" action="#" method="post"></form>

//   Champ pour télécharger PHOTO
//let inputEmail = document.getElementById("email").value;
let inputPhoto = document.createElement("input");
inputPhoto.setAttribute("type", "file");
inputPhoto.setAttribute("accept", "image/png,image/jpg");
inputPhoto.setAttribute("name", "image");
inputPhoto.setAttribute("id", "image");


// Champ TITRE
//   let inputPassword = document.getElementById("password").value;
let inputTitre = document.createElement("input");
inputTitre.setAttribute("type", "Text");
inputTitre.setAttribute("name", "titre");
inputTitre.setAttribute("id", "titre");

// Menu déroulant CATEGORIE
//   let inputPassword = document.getElementById("password").value;
let labelCategories = document.createElement ("label");
labelCategories.setAttribute("for", "categorie");
labelCategories.textContent = "Catégorie";
let select = document.createElement("select");
select.setAttribute("name", "categorie");
select.setAttribute("id", "categorie");
// création première option vide par défaut
let optionVide = document.createElement("option");
optionVide.setAttribute("class", "");
optionVide.setAttribute("value", "");
select.appendChild(optionVide);
//récup catégories dans le menu déroulant pour nouveau projet (filtres catégories)
let optionCategories = document.createElement("option");
//création attributs optionCategories
optionCategories.setAttribute("class", "");
optionCategories.setAttribute("id", category.id);
optionCategories.setAttribute("name", category.name);
optionCategories.setAttribute("value", category.name);
// Récupérer les category.name et générer les 3 options
optionCategories.innerHTML = category.name;
// optionCategories rattachée à select
select.appendChild(optionCategories);

//création bouton
let inputNouveauProjet = document.createElement("input");
inputNouveauProjet.setAttribute("id", "submit");
inputNouveauProjet.setAttribute("type", "submit");
inputNouveauProjet.setAttribute("value", "Valider");

//2) Récupérer l'ensemble des valeurs du formulaire (3)


//3) Formater les valeurs pour les envoyer vers le serveur
//let tabloSubmitProjet = { email: inputEmail, password: inputPassword };
// image = string($binary)
// title = string
// category = integer($int64)
// {
//   "id": 0,
//   "title": "string",
//   "imageUrl": "string",
//   "categoryId": "string",
//   "userId": 0
// }

//   //4) Envoyer les données formatées du formulaire au serveur
//   let response = await fetch("http://localhost:5678/api/users/login", {
//     method: "POST",
//     headers: { "accept": "application/json", "Content-type": "application/json" },
//     body: JSON.stringify(tabloSubmit)
//   });

//   // //5) Traitement de la réponse
//   // Si bonne combinaison, création localStorage 
//   //avec stockage du token et redirection vers l'accueil
//   if (response.ok === true) {

//     let result = await response.json()
//     localStorage.setItem("token", result.token)
//     document.location.href = "index.html"

//   }

//   //Si mauvaise combinaison
//   else {

//     alert("Le nom de l'utilisateur et/ou le mot de passe sont incorrects !");

//   }

// }
//requête Fetch pour ajouter un projet dans la galerie (récupérer celle de Figma,dans assets)
//POST
//fetch("http://localhost:5678/api/works") (promesse)
//FormData = photo, titre, catégorie (ensemble de paires Clé/Valeur)
//réponse API
//récupérer même format html que les premiers projets
//function addWork(){créer nouveau projet}

//Publier changements (bandeau noir) pour afficher suppressions/additions dans le DOM
//Ajout projet dans la galerie après envoi du formulaire (add)




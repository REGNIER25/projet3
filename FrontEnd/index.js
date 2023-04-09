//déclaration constante pour la gallerie des travaux
const gallery = document.getElementById("gallery");

// déclaration constante pour les filtres (div)
const filtres = document.getElementById("filtres");

//déclaration constante pour la gallerie des travaux de la Modale
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
let tokenRecup = localStorage.getItem("token");
console.log (tokenRecup)

//Masquer les filtres (mettre token en condition)
//filtres.style.display = "none";

//bando noir
let bandeau = document.createElement("aside");
bandeau.setAttribute("class", "bandeau");

let spanEdition = document.createElement("span");
spanEdition.setAttribute("class", "mode-edition");

element.textContent = "Mode édition";



let inputPublier = document.createElement("input");
inputPublier.setAttribute("class", "inputbandeau");
inputPublier.setAttribute("type", "button");
inputPublier.setAttribute("class", "Publier les changements");


//Logout à la place de Login (déconnexion)
//déclaration constante pour le lien Login/Logout
const log = document.getElementById("log");
element.textContent = "Logout";


//Modifier
let spanModifier = document.createElement("span");
spanModifier.setAttribute("class", "modifier");
let iModifier = document.createElement("i");
iModifier.setAttribute("class", "fa-regular fa-pen-to-square");
element.textContent = "Modifier";


//création modale (Gestion des projets) (event)
let modale = document.createElement("aside");
modale.setAttribute("class", "modal");
let hr = document.createElement("hr");



//Fonction pour fermer modale (croix ou hors modale) (event)function closeModal


//flèche pour retour en arrière


//Suppression projet existant (demande confirmation ?) = delete
//Clic sur la corbeille (Event)
console.log ("cliqué")
//let supprimerProjet = document.getElementById("");
//requête Fetch pour supprimer un projet de la BDD et donc de la galerie (DOM)
//DELETE par rapport au id du projet
//fetch("http://localhost:5678/api/works/{Id}") (promesse)
//réponse API

//Clic sur Bouton ajouter photo (Event)
console.log ("cliqué")

//création formulaire envoi photo
let formulaireProjet = document.createElement("form");

//champ télécharger photo
let inputPhoto = document.createElement("input");
inputPhoto.setAttribute("type", "file");

//champ titre
let inputTitre = document.createElement("input");
inputTitre.setAttribute("type", "Text");


//menu déroulant avec les catégories (optionCategories)
let select = document.createElement("select");
//récup catégories dans le menu déroulant pour nouveau projet (filtres catégories)
let optionCategories = document.createElement("option");
//création attributs optionCategories
optionCategories.setAttribute("class", "");
optionCategories.setAttribute("id", category.id);
optionCategories.setAttribute("name", category.name);
optionCategories.setAttribute("value", category.name);
// Récupérer les category.name et générer les 3 options
optionCategories.innerHTML = category.name;

// // optionCategories rattachée à select
select.appendChild(optionCategories);



//Ajout projet dans la galerie après envoi du formulaire (add)
//Gestion des erreurs (bouton Valider reste désactivé)
//Clic sur Bouton Valider (Event)
// buttonCategories.addEventListener('click', event => {...
console.log ("cliqué")
//requête Fetch pour ajouter un projet dans la galerie (récupérer celle de Figma,dans assets)
//POST
//fetch("http://localhost:5678/api/works") (promesse)
//FormData = photo, titre, catégorie
//réponse API
//récupérer même format html que les premiers projets
//function addWork(){créer nouveau projet}

//Publier changements (bandeau noir) pour afficher suppressions/additions dans le DOM




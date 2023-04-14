//déclaration constante pour la gallerie des travaux
const gallery = document.getElementById("gallery");

// déclaration constante pour les filtres (div)
const filtres = document.getElementById("filtres");

//déclaration constante pour le bandeau noir
const bandeau = document.getElementById("bandeau");

//déclaration constante pour le lien Login/Logout
const log = document.getElementById("log");

//déclaration constantes pour les trois liens Modifier
const modifier1 = document.getElementById("modifier1");
const modifier2 = document.getElementById("modifier2");
const modifier3 = document.getElementById("modifier3");


//déclaration constante pour la modale (v1 et v2)
const modale = document.getElementById("modale");



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
    }
createModal(works);

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
    createMenuCategories(categories);

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

//Bandeau noir
bandeau.setAttribute("class", "bandeau");
let spanEdition = document.createElement("span");
let iPenToSquare = document.createElement("i");
iPenToSquare.setAttribute("class", "fa-regular fa-pen-to-square");
spanEdition.appendChild(iPenToSquare);
bandeau.appendChild(spanEdition);
let pModeEdition = document.createElement("p");
pModeEdition.innerHTML = "Mode édition";
pModeEdition.setAttribute("class", "mode-edition");
bandeau.appendChild(pModeEdition);
let inputPublier = document.createElement("input");
inputPublier.setAttribute("class", "inputbandeau");
inputPublier.setAttribute("type", "button");
inputPublier.setAttribute("value", "Publier les changements");
bandeau.appendChild(inputPublier);

//Logout (Connexion) à la place de Login (déconnexion)
let loginLogout = document.createElement("a");
loginLogout.setAttribute("class", "login");
loginLogout.setAttribute("href", "login.html");
//Passer de l'un à l'autre
loginLogout.innerText = "Login";
loginLogout.innerText = "Logout";
log.appendChild(loginLogout);

//Modifier (3 fois)

let divModifier1 = document.createElement("div"); 
divModifier1.setAttribute("class", "modifier1");
let spanModifier1 = document.createElement("span");
spanModifier1.setAttribute("class", "span-modifier1");
let iModifier1 = document.createElement("i");
iModifier1.setAttribute("class", "fa-regular fa-pen-to-square");
spanModifier1.appendChild(iModifier1);

let divModifier2 = document.createElement("div"); 
divModifier2.setAttribute("class", "modifier2");
let spanModifier2 = document.createElement("span");
spanModifier2.setAttribute("class", "span-modifier2");
let iModifier2 = document.createElement("i");
iModifier2.setAttribute("class", "fa-regular fa-pen-to-square");
spanModifier2.appendChild(iModifier2);

let divModifier3 = document.createElement("div"); 
divModifier3.setAttribute("class", "modifier3");
let spanModifier3 = document.createElement("span");
spanModifier3.setAttribute("class", "span-modifier3");
let iModifier3 = document.createElement("i");
iModifier3.setAttribute("class", "fa-regular fa-pen-to-square");
spanModifier3.appendChild(iModifier3);

divModifier1.appendChild(spanModifier1);
  divModifier2.appendChild(spanModifier2);
  divModifier3.appendChild(spanModifier3);


  let pModifier1 = document.createElement("p");
  pModifier1.innerHTML = "Modifier";
  pModifier1.setAttribute("class", "");

  let pModifier2 = document.createElement("p");
  pModifier2.innerHTML = "Modifier";
  pModifier2.setAttribute("class", "");

  let pModifier3 = document.createElement("p");
  pModifier3.innerHTML = "Modifier";
  pModifier3.setAttribute("class", "");

  divModifier1.appendChild(pModifier1);
  divModifier2.appendChild(pModifier2);
  divModifier3.appendChild(pModifier3);


  //Afficher quand modale ouverte (condition)
  modifier1.appendChild(divModifier1);
  divModifier1.style.display = "none";

  
  modifier2.appendChild(divModifier2);
  modifier3.appendChild(divModifier3);



//Masquer les filtres (mettre token en condition)
//filtres.style.display = "none";

//création modale (Version 1) (temporaire)
     



      function createModal(works){ 
        //cliquer pour l'ouvrir sur bandeau noir et titre projet (modifier/éditer)
        let modaleVersion1 = document.createElement("div");
        modale.appendChild (modaleVersion1);
        modale.setAttribute("class", "modal");
        let p = document.createElement("p");
        p.setAttribute("class", "croix");
        p.textContent = "X";
        modaleVersion1.appendChild(p);
        let titreGalerie = document.createElement("h3");
        titreGalerie.setAttribute("class", "modal-wrapper");
        titreGalerie.textContent = "Galerie photo";
        modaleVersion1.appendChild(titreGalerie);

        let hr = document.createElement("hr");
      modaleVersion1.appendChild(hr);

      let boutonAjoutPhoto = document.createElement("input");
      boutonAjoutPhoto.setAttribute("id", "ajoutphoto");
      boutonAjoutPhoto.setAttribute("type", "button");
      boutonAjoutPhoto.setAttribute("value", "Ajouter une photo");
      let lienSupprimerGalerie = document.createElement("a");
      lienSupprimerGalerie.setAttribute("class", "supprimergalerie");
      lienSupprimerGalerie.setAttribute("href", "#");
      lienSupprimerGalerie.textContent = "Supprimer de la galerie";
      // //lien fonctionnel pour supprimer une image ! delete
      modaleVersion1.appendChild(lienSupprimerGalerie);
      //lien vers la "deuxième" modale
      //eventlistener ajout photo cration 27ME 
boutonAjoutPhoto.addEventListener('click', event => { 
  modale.replaceChild(modaleVersion2,modaleVersion1); });
   
  
  
      modaleVersion1.appendChild(boutonAjoutPhoto);
        for(work of works) {
          
          //Création de la galerie de la Modale
          let divGalerie = document.createElement("div")
          divGalerie.setAttribute("id", "modal-gallery");
          divGalerie.setAttribute("data-categoryid", work.categoryId);
          divGalerie.setAttribute("class", "style-modal-gallery")

          let modalImg = document.createElement("img");
          modalImg.setAttribute("src", work.imageUrl);
          modalImg.setAttribute("alt", work.title);
          divGalerie.appendChild(modalImg);
          let editer = document.createElement("p");
          editer.innerHTML = "éditer";
          divGalerie.appendChild(editer);

          //Corbeille sur les travaux de la galerie de la Modale
          let span = document.createElement("span");
          span.setAttribute("class", "style-modal-icone");
          let iconePanier = document.createElement("i");
          iconePanier.setAttribute("class", "fa-regular fa-trash-can");
          span.appendChild(iconePanier);
          divGalerie.appendChild(span);
          //hover souris sur image
          //  let iconeFleche = document.createElement("i");
          //  iconeFleche.setAttribute("class", "fa-solid fa-arrows-up-down-left-right");
          modaleVersion1.appendChild(divGalerie);}}
        
      // 1) Détecter le clic sur le lien de validation
      //Clic sur éditer; la corbeille (Event)
      // boutonValider.onclick = async function (event) {
      //console.log ("cliqué");
      // event.preventDefault();
      // 2) Récupérer l'ensemble des valeurs du formulaire
      // let inputEmail = document.getElementById("email").value;
      // 3) Formater l'id du projet pour l'envoyer vers le serveur
      // let supprimerProjet = {"id":id};
      // 4) Envoyer l'id du nouveau projet au serveur
      // let response = await fetch("http://localhost:5678/api/works/{Id}"), {
      // method: "DELETE", body: JSON.stringify(supprimerProjet)});
      // 5) Traitement de la réponse
      // if (response.ok === true) {let result = await response.json()
      // localStorage.setItem("token", result.token)}
      // Si mauvaise combinaison
      // else {error}
      // let supprimerProjet = document.getElementById("");
      // requête Fetch pour supprimer un projet de la BDD et donc de la galerie (DOM)
      // DELETE par rapport au id du projet

// Modale pour ajouter un projet
let modaleVersion2 = document.createElement("div");
modaleVersion2.setAttribute("class", "modal");
let pFlecheCroix = document.createElement("p");
let spanFleche = document.createElement("span");
spanFleche.setAttribute("class", "fleche");
spanFleche.textContent = "←";
//retour en arrière
pFlecheCroix.appendChild(spanFleche);
let spanCroix = document.createElement("span");
spanCroix.setAttribute("class", "croix");
spanCroix.textContent = "X";
//fermer modale(croix ou hors modale) (event)function closeModal
pFlecheCroix.appendChild(spanCroix);
modaleVersion2.appendChild(pFlecheCroix);
let titreAjoutPhoto = document.createElement("h3");
titreAjoutPhoto.setAttribute("class", "modal-wrapper");
titreAjoutPhoto.textContent = "Ajout photo";
modaleVersion2.appendChild(titreAjoutPhoto);
//Formulaire pour ajouter projet
let formAjoutProjet = document.createElement("form");
formAjoutProjet.setAttribute("id", "contact");
formAjoutProjet.setAttribute("enctype", "multipart/form-data");
formAjoutProjet.setAttribute("action", "#");
formAjoutProjet.setAttribute("method", "post");
modaleVersion2.appendChild(formAjoutProjet);
//Champ pour télécharger photo
let champPhoto = document.createElement("div")
champPhoto.setAttribute("class", "uploader-image");
let iImage = document.createElement("i")
iImage.setAttribute("class", "fa-regular fa-image");
champPhoto.appendChild(iImage);
formAjoutProjet.appendChild(champPhoto);
let inputPhoto = document.createElement("input")
inputPhoto.setAttribute("type", "file");
inputPhoto.setAttribute("accept", "image/png,image/jpg");
inputPhoto.setAttribute("name", "image");
inputPhoto.setAttribute("id", "image");
champPhoto.appendChild(inputPhoto);
//Champ pour nommer projet
let labelTitre = document.createElement("label");
labelTitre.setAttribute("for", "titre");
labelTitre.textContent = "Titre";
formAjoutProjet.appendChild(labelTitre);
let inputTitre = document.createElement("input");
inputTitre.setAttribute("type", "Text");
inputTitre.setAttribute("name", "titre");
inputTitre.setAttribute("id", "titre");
formAjoutProjet.appendChild(inputTitre);
//Champ pour sélectionner catégorie

function createMenuCategories(categories) {
  let labelCategories = document.createElement("label");
  labelCategories.setAttribute("for", "categorie");
  labelCategories.textContent = "Catégorie";
  formAjoutProjet.appendChild(labelCategories);
  let select = document.createElement("select");
  select.setAttribute("name", "categorie");
  select.setAttribute("id", "categorie");
  // création première option vide par défaut
  let optionVide = document.createElement("option");
  optionVide.setAttribute("class", "");
  optionVide.setAttribute("value", "");
  select.appendChild(optionVide);

  for(category of categories) {


// récup les category.name dans le menu déroulant et générer les 3 options
let optionCategories = document.createElement("option");
optionCategories.setAttribute("class", "");
optionCategories.setAttribute("id", category.id);
optionCategories.setAttribute("name", category.name);
optionCategories.setAttribute("value", category.name);
optionCategories.innerHTML = category.name;
select.appendChild(optionCategories);
formAjoutProjet.appendChild(select);

  }
  

}


let hr2 = document.createElement("hr");
formAjoutProjet.appendChild(hr2);
// Création bouton
let inputNouveauProjet = document.createElement("input")
inputNouveauProjet.setAttribute("id", "submit");
inputNouveauProjet.setAttribute("type", "submit");
inputNouveauProjet.setAttribute("value", "Valider");
formAjoutProjet.appendChild(inputNouveauProjet);
// // 1) Détecter le clic sur le bouton de validation (Event)
// inputNouveauProjet.onclick = async function (event) {console.log ("cliqué !");
// console.log(tabloSubmitProjet);
// event.preventDefault();}
// // Gestion des erreurs (bouton Valider reste désactivé)
// // 2) Récupérer l'ensemble des trois valeurs du formulaire (3)
// // //pour récupérer la valeur photo
// let champImage = document.getElementById("image").value;
// // //pour récupérer la valeur titre
// let champTitre = document.getElementById("titre").value;
// // //pour récupérer la valeur id des catégories
// let champCategorie = document.getElementById(category.id);
// // // 3) Formater les valeurs pour les envoyer vers le serveur
// let tabloSubmitProjet = { "imageUrl": champImage, "title": champTitre,
// "categoryId": champCategorie};
// // //4) Envoyer les données formatées du formulaire au serveur
// // let response = await fetch("http://localhost:5678/api/works",
// // {method: "POST",
// // headers: { "accept": "application/json", "Content-type": "multipart/form-data" },
// // body: JSON.stringify(tabloSubmitProjet)});
// // // 5) Traitement de la réponse
// // if (response.ok === true) {
// // let result = await response.json()
// // console.log ("Nouveau projet créé !")}
// // //   //Si mauvaise combinaison
// // // }
// // //requête Fetch pour ajouter un projet dans la galerie (récupérer celle de Figma,dans assets)
// // //function addWork(){créer nouveau projet}
// // //Publier changements (bandeau noir) pour afficher suppressions/additions dans le DOM
// // //Ajout projet dans la galerie après envoi du formulaire (add)


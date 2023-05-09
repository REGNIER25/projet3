//CONSTANTES

// Constante pour la galerie des travaux
const gallery = document.getElementById("gallery");

// Constante pour les filtres (div)
const filtres = document.getElementById("filtres");

// Constante pour le bandeau noir
const bandeau = document.getElementById("bandeau");

// Constante pour le lien Login/Logout
const log = document.getElementById("log");

// Constantes pour les trois liens Modifier
const modifier1 = document.getElementById("modifier1");
const modifier2 = document.getElementById("modifier2");
const modifier3 = document.getElementById("modifier3");

// Constante pour la modale
const modale = document.getElementById("modale");

// Constante pour le token
const token = localStorage.getItem("token");

// RECUPERATION DES TRAVAUX
const responseWorks = await fetch("http://localhost:5678/api/works");
const works = await responseWorks.json();
displayWorks(works);



function displayWorks(works) {
  //création variable pour un projet avec la boucle for ... of ...
  for (let work of works) {
    let figure = document.createElement("figure");

    // Rajout attribut data- pour avoir un sélecteur permettant de filtrer les travaux
    figure.setAttribute("data-categoryid", work.categoryId)
    let img = document.createElement("img");
    img.setAttribute("src", work.imageUrl);
    img.setAttribute("alt", work.title);
    figure.appendChild(img);
    let figcaption = document.createElement("figcaption");
    figcaption.innerHTML = work.title;
    figure.appendChild(figcaption);
    gallery.appendChild(figure);}}

//Méthode pour récupérer les catégories (données) avec liaison avec le backend

//await avant fetch et response
//async avant fonction
const responseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await responseCategories.json();

function createFilters(categories) {

  //création premier bouton qui a toutes les catégories par défaut
  let buttonAll = document.createElement("button");
  buttonAll.setAttribute("class", "filtre");
  buttonAll.setAttribute("type", "button");
  buttonAll.setAttribute("id", 0);
  buttonAll.setAttribute("value", "Tous");
  buttonAll.innerHTML = "Tous";
  filtres.appendChild(buttonAll);

  //comportement par défaut
  buttonAll.addEventListener('click', event => { filtering(0) });
  for (let category of categories) {

    //création buttonCategories
    let buttonCategories = document.createElement("button");
    buttonCategories.setAttribute("class", "filtre");
    buttonCategories.setAttribute("type", "button");
    buttonCategories.setAttribute("id", category.id);
    buttonCategories.setAttribute("name", category.name);
    buttonCategories.setAttribute("value", category.name);

    // Sélection de buttonCategories (HTML) pour récupérer les category.name et générer les 3 boutons
    buttonCategories.innerHTML = category.name;
    filtres.appendChild(buttonCategories);

    //Méthode pour détecter le clic sur les filtres et récupérer le category.id de la catégorie
    buttonCategories.addEventListener('click', event => { filtering(category.id) });
  }
}


// FONCTION DE FILTRAGE DES TRAVAUX PAR CATEGORIES
function filtering(categoryID) {
  if (categoryID == 0) {//continue après réponse
    console.log("script filtres en cours");
    let figuresToShow = gallery.querySelectorAll(`figure`);
    for (let figureToShow of figuresToShow) {
      //intégration CSS display:block; en JS pour afficher
      figureToShow.style.display = "block";}}
  else {
    // Création variable figuresToShow 
    //pour afficher par défaut toutes les figures dans le DOM avec gallery.querySelectorAll
    let figuresToShow = gallery.querySelectorAll(`figure[data-categoryid="${categoryID}"]`);
    for (let figureToShow of figuresToShow) {
      //intégration CSS display:block; en JS pour afficher
      figureToShow.style.display = "block";}

    //not pour sélectionner les figures des catégories non voulues
    let figures = gallery.querySelectorAll(`figure:not([data-categoryid="${categoryID}"])`);
    for (let figure of figures) { figure.style.display = "none"; }}}

// MASQUER FILTRES
if (localStorage.getItem('token')) {filtres.style.display = "none";}

// BANDEAU NOIR
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

// AFFICHER BANDEAU NOIR
if (token===null) {bandeau.style.display = "none";}

//LOGIN (Connexion)
let login = document.createElement("a");
login.setAttribute("class", "login");
login.innerText = "Login";
login.setAttribute("href", "login.html");
log.appendChild(login);

// LOGOUT (Déconnexion)
let logout = document.createElement("a");
logout.setAttribute("class", "login");
logout.innerText = "Logout";
log.appendChild(logout);
logout.style.display = "none";

// si connecté
if (localStorage.getItem('token')) {
  login.style.display = "none";
  logout.style.display = "block";}
// Déconnexion/suppression token
logout.addEventListener("click", (e) => {
  localStorage.removeItem("token", token);
  console.log("token : " + token);
  login.style.display = "block";
  //retour à la page d'accueil en mode visiteur
  document.location.href = "index.html";
  e.preventDefault();})

//MODIFIER POUR LA PRESENTATION DE L'ARCHITECTE
let divModifier1 = document.createElement("div");
divModifier1.setAttribute("class", "modifier1");
let spanModifier1 = document.createElement("span");
spanModifier1.setAttribute("class", "span-modifier1");
let iModifier1 = document.createElement("i");
iModifier1.setAttribute("class", "fa-regular fa-pen-to-square");
spanModifier1.appendChild(iModifier1);
divModifier1.appendChild(spanModifier1);
let pModifier1 = document.createElement("p");
pModifier1.innerHTML = "Modifier";
divModifier1.appendChild(pModifier1);
if (token===null) {divModifier1.style.display = "none";}

//MODIFIER POUR LA PHOTO DE L'ARCHITECTE
let divModifier2 = document.createElement("div");
divModifier2.setAttribute("class", "modifier2");
let spanModifier2 = document.createElement("span");
spanModifier2.setAttribute("class", "span-modifier2");
let iModifier2 = document.createElement("i");
iModifier2.setAttribute("class", "fa-regular fa-pen-to-square");
spanModifier2.appendChild(iModifier2);
divModifier2.appendChild(spanModifier2);
let pModifier2 = document.createElement("p");
pModifier2.innerHTML = "Modifier";
divModifier2.appendChild(pModifier2);
if (token===null) {divModifier2.style.display = "none";}

// MODIFIER pour ouvrir la modale
let divModifier3 = document.createElement("div");
divModifier3.setAttribute("class", "modifier3");
let spanModifier3 = document.createElement("span");
spanModifier3.setAttribute("class", "span-modifier3");
let iModifier3 = document.createElement("i");
iModifier3.setAttribute("class", "fa-regular fa-pen-to-square");
spanModifier3.appendChild(iModifier3);
divModifier3.appendChild(spanModifier3);
let pModifier3 = document.createElement("p");
pModifier3.innerHTML = "Modifier";
divModifier3.appendChild(pModifier3);
if (localStorage.getItem('token')) {
  // divModifier3.style.display = "block";
} else {
  divModifier3.style.display = "none";
  console.log("Ouvrir la Modale : pas de connexion !");
}

modifier1.appendChild(divModifier1);
modifier2.appendChild(divModifier2);

// MODALE PAR DEFAUT
modale.style.display = "none";

// OUVERTURE DE LA MODALE
modifier3.appendChild(divModifier3);
modifier3.addEventListener('click', event => {
  createModal(works);
  modale.style.display = "block";
  document.body.style.backgroundColor = "rgba(0, 0, 0, 0.3)";});

// FERMETURE DE LA MODALE si clic en dehors de la modale
document.addEventListener("mouseup", function (event) {
let cible = document.getElementById("modale");
if (!cible.contains(event.target)) {
modale.style.display = "none";
document.body.style.backgroundColor = "rgba(0, 0, 0, 0)";}})

// CREATION MODALE

//function appelée pour faire apparaître les projets dans la modale
//async function createModal(works)

function createModal(works) {
  //cliquer pour l'ouvrir sur bandeau noir et titre projet (modifier/éditer)
  document.getElementById("modale").innerHTML="";
  let modaleVersion1 = document.createElement("div");
  modale.appendChild(modaleVersion1);
  modale.setAttribute("class", "modal");
  let pCroixModale = document.createElement("p");
  pCroixModale.setAttribute("class", "croix");
  pCroixModale.textContent = "X";
  modaleVersion1.appendChild(pCroixModale);

  // FERMETURE DE LA MODALE (croix)
  pCroixModale.addEventListener('click', event => {
    modale.style.display = "none";
    document.body.style.backgroundColor = "rgba(0, 0, 0, 0)";});

  //TITRE GALERIE PHOTO
  let titreGalerie = document.createElement("h3");
  titreGalerie.setAttribute("class", "titre-modale");
  titreGalerie.textContent = "Galerie photo";
  modaleVersion1.appendChild(titreGalerie);

  //parent en CSS
  let modalGalerie = document.createElement("div");
  modalGalerie.setAttribute("id", "modal-gallery");
  modaleVersion1.appendChild(modalGalerie);

  //BOUCLE POUR RECUPERER LES TRAVAUX DANS LA GALERIE DE LA MODALE
  for (let work of works) {
    let divGalerie = document.createElement("div");
    divGalerie.setAttribute("class", "bloc-galerie-modale");
    divGalerie.setAttribute("data-id", work.id);
    let modalImg = document.createElement("img");
    modalImg.setAttribute("src", work.imageUrl);
    modalImg.setAttribute("alt", work.title);
    let pEditer = document.createElement("p");
    pEditer.textContent = "éditer";
    // ICONE CORBEILLE
    let spanPanier = document.createElement("span");
    spanPanier.setAttribute("class", "style-modal-icone");
    let iconePanier = document.createElement("i");
    iconePanier.setAttribute("class", "fa-regular fa-trash-can");
    iconePanier.setAttribute("data-id", work.id);
    iconePanier.setAttribute("data-title", work.title);
    spanPanier.appendChild(iconePanier);
    divGalerie.appendChild(spanPanier);
    divGalerie.appendChild(modalImg);
    divGalerie.appendChild(pEditer);

    // SUPPRIMER UN PROJET sans rechargement de la page (callback?)

    // 1) DETECTION DU CLIC SUR LA CORBEILLE
    iconePanier.addEventListener("click", (e) => {
    console.log(e.currentTarget.getAttribute("data-id"));

    // 2-3) RECUPERATION DE L'ID DU PROJET POUR LE SERVEUR ("data-id")
    let workId = e.currentTarget.getAttribute("data-id");
    let workTitle = e.currentTarget.getAttribute("data-title");
      
    // 4) ENVOI DE L'ID DU PROJET A SUPPRIMER AU SERVEUR
      fetch(`http://localhost:5678/api/works/${workId}`,
      {method: 'DELETE',
      headers: {'Authorization': `Bearer ${token}`,}, })

    // 5) TRAITEMENT DE LA REPONSE ET DES ERREURS

        .then((response) => {if (response.ok) {     
    alert("Projet (" + workTitle + ") n° " + workId + " supprimé !");}

else
{alert("Projet (" + workTitle + ") n° " + workId + " non supprimé !");
 console.log("réponse du serveur :" + response.status);
}})

        .catch((error) => console.log(error))})

    //HOVER IMAGES GALERIE MODALE (récupéré en capture d'écran)
    // let iconeFleche = document.createElement("i");
    // iconeFleche.setAttribute("class", "fa-solid fa-arrows-up-down-left-right");
    // divGalerie.appendChild(iconeFleche);
    // span.appendChild(iconeFleche);
    // divGalerie.appendChild(span);

    modalGalerie.appendChild(divGalerie);
  }

  //HR (TRAIT)
  let hr = document.createElement("hr");
  hr.setAttribute("class", "hr-modale");
  modaleVersion1.appendChild(hr);

  // BOUTON AJOUTER UNE PHOTO
  let boutonAjoutPhoto = document.createElement("input");
  boutonAjoutPhoto.setAttribute("id", "ajoutphoto");
  boutonAjoutPhoto.setAttribute("type", "submit");
  boutonAjoutPhoto.setAttribute("value", "Ajouter une photo");
  boutonAjoutPhoto.addEventListener('click', event => {
  modale.replaceChild(modaleVersion2, modaleVersion1); });
  modaleVersion1.appendChild(boutonAjoutPhoto);

  // LIEN SUPPRIMER LA GALERIE
  let lienSupprimerGalerie = document.createElement("a");
  lienSupprimerGalerie.setAttribute("class", "supprimergalerie");
  lienSupprimerGalerie.setAttribute("href", "#");
  lienSupprimerGalerie.textContent = "Supprimer la galerie";
  modaleVersion1.appendChild(lienSupprimerGalerie);}

// FENETRE MODALE AJOUTER UNE PHOTO


let modaleVersion2 = document.createElement("div");
modaleVersion2.setAttribute("class", "modal");

// FLECHE POUR RETOUR A LA FENETRE PRECEDENTE
let divFlecheCroix = document.createElement("div");
divFlecheCroix.setAttribute("class", "divFlecheCroix");
modaleVersion2.appendChild(divFlecheCroix);
let pFleche = document.createElement("p");
pFleche.textContent = "←";
pFleche.addEventListener('click', event => {
  event.preventDefault();
  createModal(works);});
divFlecheCroix.appendChild(pFleche);

//CROIX FENETRE MODALE AJOUTER UNE PHOTO POUR FERMER LA MODALE
let pCroix = document.createElement("p");
pCroix.setAttribute("class", "croix");
pCroix.textContent = "X";
pCroix.addEventListener('click', event => {
  modale.style.display = "none";
  document.body.style.backgroundColor = "rgba(0, 0, 0, 0)";
  event.preventDefault();});
divFlecheCroix.appendChild(pCroix);

//TITRE FENETRE MODALE AJOUTER UNE PHOTO
let titreAjoutPhoto = document.createElement("h3");
titreAjoutPhoto.setAttribute("class", "titre-modale");
titreAjoutPhoto.textContent = "Ajout photo";
modaleVersion2.appendChild(titreAjoutPhoto);

//FORMULAIRE AJOUTER UNE PHOTO
let formAjoutProjet = document.createElement("form");
formAjoutProjet.setAttribute("id", "formulaire-ajout-projet");
formAjoutProjet.setAttribute("enctype", "multipart/form-data");
formAjoutProjet.setAttribute("action", "#");
formAjoutProjet.setAttribute("method", "post");
modaleVersion2.appendChild(formAjoutProjet);

// CHAMP PHOTO
let champPhoto = document.createElement("div")
champPhoto.setAttribute("class", "uploader-image");
formAjoutProjet.appendChild(champPhoto);



// ICONE IMAGE
let iImage = document.createElement("i");
iImage.setAttribute("class", "fa-sharp fa-regular fa-image");
let spanImage = document.createElement("i");
spanImage.setAttribute("class", "span-image");
spanImage.appendChild(iImage);
champPhoto.appendChild(spanImage);

//créer bouton à la place de l'input
let boutonAjouterPhoto = document.createElement("button");
boutonAjouterPhoto.setAttribute("class", "bouton-ajouter-photo");
boutonAjouterPhoto.textContent = "+ Ajouter photo";
boutonAjouterPhoto.classList.add("file-input-button");
champPhoto.appendChild(boutonAjouterPhoto);

//texte format image et taille
let pFormatsphoto = document.createElement("p");
pFormatsphoto.textContent = "jpg, png : 4mo max";
pFormatsphoto.setAttribute("class", "sous-titre-image");
champPhoto.appendChild(pFormatsphoto);

// INPUT PHOTO
let inputPhoto = document.createElement("input");
inputPhoto.setAttribute("required", "required");
inputPhoto.setAttribute("type", "file");
inputPhoto.setAttribute("accept", ".png, .jpg, .jpeg");
inputPhoto.setAttribute("name", "image");
inputPhoto.setAttribute("id", "image");
// inputPhoto.classList.add("bouton-ajouter-photo");
inputPhoto.setAttribute("class", "file-input-button");
// size : un nombre qui représente la taille du fichier en octets.
inputPhoto.setAttribute("max-size", "4000000");
//opacity pour cacher l'input par défaut
inputPhoto.style.opacity = "0";
champPhoto.appendChild(inputPhoto);

// PREVISUALISATION DE L'IMAGE
// listener sur input pour ajouter et modifier style d'une image
inputPhoto.addEventListener('change', function (event) {
  // pour lire le fichier choisi (un seul ici)
  let newReader = new FileReader();
  // viser le fichier avec target
  let file = event.target.files[0];
  // si fichier existe (un seul ici)
  if (file) {
    // création de l'image téléchargée
    let imageUpload = document.createElement("img");
    // Récupérer la source de l'image
    imageUpload.setAttribute("src", URL.createObjectURL(file));
    imageUpload.setAttribute("class", "imageUpload");
    // ajouter l'image téléchargée (création espace)
    imageUpload.classList.add('image-load');
    // Affichez l'image choisie dans la modale
    //vider la div de l'input
    // champPhoto.innerHTML=" ";
//cacher tous les autres éléments avec display:none; icone, bouton et et texte
iImage.style.display = "none";
boutonAjouterPhoto.style.display = "none";
pFormatsphoto.style.display = "none";

    // création div pour afficher l'image
    champPhoto.appendChild(imageUpload);

    // relier image à la div pour remplacer son ancien contenu
    // divImageForm.appendChild(imageUpload);
    // méthode pour lire le contenu du fichier choisi
    // newReader.readAsDataURL(file);


};});


// CHAMP TITRE
let labelTitre = document.createElement("label");
labelTitre.setAttribute("for", "titre");
labelTitre.setAttribute("class", "label-titre");
labelTitre.textContent = "Titre";
formAjoutProjet.appendChild(labelTitre);
let inputTitre = document.createElement("input");
//champ obligatoire
inputTitre.setAttribute("required", "required");
inputTitre.setAttribute("type", "Text");
inputTitre.setAttribute("name", "title");
inputTitre.setAttribute("id", "titre");
inputTitre.setAttribute("class", "champ-titre");
formAjoutProjet.appendChild(inputTitre);

//CHAMP CATEGORIES
createFilters(categories)
{let labelCategories = document.createElement("label");
  labelCategories.setAttribute("for", "categorie");
  labelCategories.setAttribute("class", "label-categorie");
  labelCategories.textContent = "Catégorie";
  formAjoutProjet.appendChild(labelCategories);
  let select = document.createElement("select");
  select.setAttribute("name", "category");
  select.setAttribute("id", "categorie");
  select.setAttribute("class", "champ-categorie");

  // CREATION PREMIERE OPTION VIDE (par défaut)
  let optionVide = document.createElement("option");
  optionVide.setAttribute("class", "");
  optionVide.setAttribute("value", "");
  select.appendChild(optionVide);

  // BOUCLE POUR RECUPERER LES CATEGORIES DANS LE MENU DEROULANT
  for (let category of categories) {
    let optionCategories = document.createElement("option");
    optionCategories.setAttribute("required", "required");
    optionCategories.setAttribute("class", "choix-categorie");
    optionCategories.setAttribute("id", category.id);
    optionCategories.setAttribute("name", category.name);
    optionCategories.setAttribute("value", parseInt(category.id));
    optionCategories.innerHTML = category.name;
    select.appendChild(optionCategories);
    formAjoutProjet.appendChild(select);}}


//HR (TRAIT FENETRE MODALE FORMULAIRE)
let hr2 = document.createElement("hr");
hr2.setAttribute("class", "hr2-modale");
formAjoutProjet.appendChild(hr2);

// BOUTON VALIDER FORMULAIRE (désactivé par défaut)
let inputNouveauProjet = document.createElement("input");
inputNouveauProjet.setAttribute("id", "boutonpasactif");
inputNouveauProjet.setAttribute("type", "submit");
inputNouveauProjet.setAttribute("value", "Valider");
formAjoutProjet.appendChild(inputNouveauProjet);



// inputNouveauProjet.setAttribute("disabled", "true");

// function activerBouton () {
// let requiredInputs = document.querySelectorAll('input[required]');
// let requiredSelect = document.querySelector('select[required]');
// if (requiredInputs === null ||requiredSelect === null)
// {
// console.log(requiredInputs + requiredSelect);

// }
// // ACTIVATION DU BOUTON VALIDER DU FORMULAIRE
// else {
// console.log(requiredInputs + requiredSelect);
// inputNouveauProjet.setAttribute("id", "submit");
// inputNouveauProjet.setAttribute("disabled", "false");
// }
//   }

  // function end_form()
  // {
  // var champ_obligatoire = ['image', 'titre', 'categorie'];
  // var champ_plein = true;
  // for (var i=0; i<3; h++)
  // {
  //     valeur = document.getElementById(champ_obligatoire[i]).value;
  //     if( (valeur.length == 0) || (valeur == "") || (valeur == "NULL") )
  //     {
  //         champ_plein = false;
  //     }
  // }
   
  // if (champ_plein)
  // {console.log("Tous les champs sont remplis !");
  // document.getElementById('boutonpasactif').disabled = false;
   
  // }
  // else
  // {
  //   console.log("Tous les champs ne sont pas remplis");
  // document.getElementById('boutonpasactif').disabled = true;
  // }
  // }

//CREATION NOUVEAU PROJET sans rechargement de la page (callback?)

// 1) DETECTION DU CLIC
// 2) RECUPERATION DES TROIS VALEURS DU FORMULAIRE
inputNouveauProjet.addEventListener('click', event => {
  console.log("Bouton de validation cliqué !");
  event.preventDefault();
  const tabloSubmitProjet2 = {
  image: document.getElementById("image").files[0],
  title: document.getElementById("titre").value,
  category: parseInt(document.getElementById("categorie").value)}

// 3) FORMATER VALEURS POUR ENVOI AU SERVEUR (FormData)
  let tabloSubmitProjet = new FormData(document.getElementById("formulaire-ajout-projet"));
  console.log(tabloSubmitProjet);

  // 4) ENVOI DES DONNEES AU SERVEUR
  fetch('http://localhost:5678/api/works',
 {method: 'POST', headers:
  {"accept": "application/json",
  'Authorization': `Bearer ${token}`,},
  'body': tabloSubmitProjet})

    // 5) REPONSE AVEC AJOUT NOUVEAU PROJET sans recharger la page
    .then((response) => {
      if (response.ok) {
        
        // FONCTION CALLBACK CREA NOUVO TRAVAIL
function callbackWorks(callback) {callback(works);}
callbackWorks(displayWorks);

        event.preventDefault();
        location.replace("index.html");
        modale.style.display = "none";
        document.body.style.backgroundColor = "rgba(0, 0, 0, 0)";
        alert("Nouveau projet accepté !");}
      else { alert("Nouveau projet refusé. Tous les champs doivent être remplis.") }})
    .catch((error) => console.log(error))})





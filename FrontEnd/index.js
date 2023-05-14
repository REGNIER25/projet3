// CONSTANTE POUR LA GALERIE DES TRAVAUX DANS LE HTML
const gallery = document.getElementById("gallery");

// CONSTANTE POUR LES FILTRES DANS LE HTML
const filtres = document.getElementById("filtres");

// CONSTANTE POUR LE BANDEAU NOIR DANS LE HTML
const bandeau = document.getElementById("bandeau");

// CONSTANTE POUR LE LIEN LOGIN/LOGOUT DANS LE HTML
const log = document.getElementById("log");

// CONSTANTES POUR LES LIENS MODIFIER DANS LE HTML
const modifier1 = document.getElementById("modifier1");
const modifier2 = document.getElementById("modifier2");
const modifier3 = document.getElementById("modifier3");

// CONSTANTE POUR LA MODALE DANS LE HTML
const modale = document.getElementById("modale");

// CONSTANTE POUR LE TOKEN
const token = localStorage.getItem("token");

// RECUPERATION DES TRAVAUX
const responseWorks = await fetch("http://localhost:5678/api/works");
let works = await responseWorks.json();
displayWorks(works);

function displayWorks(works) {
  document.getElementById("gallery").innerHTML = "";
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
    gallery.appendChild(figure);
  }
}

//Méthode pour récupérer les catégories (données) avec liaison avec le backend

//await avant fetch et response
//async avant fonction
const responseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await responseCategories.json();
createFilters(categories);

// FONCTION POUR CREER LES FILTRES
function createFilters(categories) {

  // BOUTON AVEC COMPORTEMENT PAR DEFAUT
  let buttonAll = document.createElement("button");
  buttonAll.setAttribute("class", "filtre");
  buttonAll.setAttribute("type", "button");
  buttonAll.setAttribute("id", 0);
  buttonAll.setAttribute("value", "Tous");
  buttonAll.innerHTML = "Tous";
  filtres.appendChild(buttonAll);
  buttonAll.addEventListener('click', event => { filtering(0) });

  //BOUCLE POUR RECUPERER LES CATEGORIES
  for (let category of categories) {

    //CREATION DES BOUTONS CATEGORIES
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
      figureToShow.style.display = "block";
    }
  }
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

//LOGIN
let login = document.createElement("a");
login.setAttribute("class", "login");
login.innerText = "Login";
login.setAttribute("href", "login.html");
log.appendChild(login);

// LOGOUT
let logout = document.createElement("a");
logout.setAttribute("class", "login");
logout.innerText = "Logout";
log.appendChild(logout);
logout.style.display = "none";

// CONNEXION
if (localStorage.getItem('token')) {
login.style.display = "none";
logout.style.display = "block";}

// DECONNEXION
logout.addEventListener("click", (e) => {
localStorage.removeItem("token", token);
console.log("token : " + token);
login.style.display = "block";
document.location.href = "index.html";
e.preventDefault();})

// MASQUER FILTRES
if (localStorage.getItem('token')) { filtres.style.display = "none"; }

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
if (token === null) { bandeau.style.display = "none"; }

//MODIFIER LA PRESENTATION DE L'ARCHITECTE
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
modifier1.appendChild(divModifier1);
if (token === null) { divModifier1.style.display = "none"; }

//MODIFIER LA PHOTO DE L'ARCHITECTE
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
modifier2.appendChild(divModifier2);
if (token === null) { divModifier2.style.display = "none"; }

// MODIFIER POUR OUVRIR LA MODALE
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
modifier3.appendChild(divModifier3);
if (token === null) { divModifier3.style.display = "none"; }

// OUVERTURE DE LA MODALE
modifier3.addEventListener('click', event => {
createModal(works);
modale.style.display = "block";
document.body.style.backgroundColor = "rgba(0, 0, 0, 0.3)";});

// FERMETURE DE LA MODALE SI CLIC EN DEHORS
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
  document.getElementById("modale").innerHTML = "";
  let modaleVersion1 = document.createElement("div");
  modale.appendChild(modaleVersion1);
  modale.setAttribute("class", "modal");
  let pCroixModale = document.createElement("p");
  pCroixModale.setAttribute("class", "croix");
  pCroixModale.textContent = "X";
  modaleVersion1.appendChild(pCroixModale);

  // FERMETURE DE LA MODALE SI CLIC SUR LA CROIX
  pCroixModale.addEventListener('click', event => {
  modale.style.display = "none";
  document.body.style.backgroundColor = "rgba(0, 0, 0, 0)";});

  // TITRE FENETRE MODALE GALERIE PHOTO
  let titreGalerie = document.createElement("h3");
  titreGalerie.setAttribute("class", "titre-modale");
  titreGalerie.textContent = "Galerie photo";
  modaleVersion1.appendChild(titreGalerie);

  // GALERIE DES PHOTOS
  let modalGalerie = document.createElement("div");
  modalGalerie.setAttribute("id", "modal-gallery");
  modaleVersion1.appendChild(modalGalerie);

  // BOUCLE POUR RECUPERER LES TRAVAUX DANS LA GALERIE DE LA MODALE
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
        {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}`, },
        })

        // 5) TRAITEMENT DE LA REPONSE ET DES ERREURS

        .then((response) => {
          if (response.ok) {
            
            // FONCTION CALLBACK SUPPRESSION PROJET
            // function callbackSupprim(callback) { callback(works); }
            // callbackSupprim(displayWorks);

            e.preventDefault();
            alert("Projet (" + workTitle + ") n° " + workId + " supprimé !");
          }

          else {
            alert("Projet (" + workTitle + ") n° " + workId + " non supprimé !");
            console.log("réponse du serveur :" + response.status);
          }
        })

        .catch((error) => console.log(error))
    })

    //HOVER IMAGES GALERIE MODALE (récupéré en capture d'écran)
    // let iconeFleche = document.createElement("i");
    // iconeFleche.setAttribute("class", "fa-solid fa-arrows-up-down-left-right");
    // divGalerie.appendChild(iconeFleche);
    // span.appendChild(iconeFleche);
    // divGalerie.appendChild(span);

    modalGalerie.appendChild(divGalerie);}

  //HR (TRAIT)
  let hr = document.createElement("hr");
  hr.setAttribute("class", "hr-modale");
  modaleVersion1.appendChild(hr);

  // BOUTON AJOUTER UNE PHOTO
  let boutonAjoutPhoto = document.createElement("input");
  boutonAjoutPhoto.setAttribute("id", "ajoutphoto");
  boutonAjoutPhoto.setAttribute("type", "submit");
  boutonAjoutPhoto.setAttribute("value", "Ajouter une photo");

  //LIEN VERS LA FENETRE AJOUTER UNE PHOTO
  boutonAjoutPhoto.addEventListener('click', event => {createModalForm();});
  modaleVersion1.appendChild(boutonAjoutPhoto);

  // LIEN "Supprimer la galerie"
  let lienSupprimerGalerie = document.createElement("a");
  lienSupprimerGalerie.setAttribute("class", "supprimergalerie");
  lienSupprimerGalerie.setAttribute("href", "#");
  lienSupprimerGalerie.textContent = "Supprimer la galerie";
  modaleVersion1.appendChild(lienSupprimerGalerie);}

// FENETRE MODALE AJOUTER UNE PHOTO
function createModalForm() {
document.getElementById('modale').innerHTML = "";
let modaleVersion2 = document.createElement("div");

document.getElementById('modale').appendChild(modaleVersion2);
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

// FERMETURE DE LA MODALE SI CLIC SUR LA CROIX
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

// BOUTON "+ Ajouter photo"
  let boutonAjouterPhoto = document.createElement("button");
  boutonAjouterPhoto.setAttribute("class", "bouton-ajouter-photo");
  boutonAjouterPhoto.textContent = "+ Ajouter photo";
  boutonAjouterPhoto.classList.add("file-input-button");
  champPhoto.appendChild(boutonAjouterPhoto);

// PARAGRAPHE "jpg, png : 4mo max"
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

// CHAMP TITRE OBLIGATOIRE
  let labelTitre = document.createElement("label");
  labelTitre.setAttribute("for", "titre");
  labelTitre.setAttribute("class", "label-titre");
  labelTitre.textContent = "Titre";
  formAjoutProjet.appendChild(labelTitre);
  let inputTitre = document.createElement("input");
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
    select.setAttribute("required", "required");

    // CREATION PREMIERE OPTION VIDE
    let optionVide = document.createElement("option");
    optionVide.setAttribute("class", "");
    optionVide.setAttribute("value", "");
    select.appendChild(optionVide);

    // BOUCLE POUR RECUPERER LES CATEGORIES DANS LE MENU DEROULANT
    for (let category of categories) {
      let optionCategories = document.createElement("option");
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

// 1) DETECTION DU CLIC
// 2) RECUPERATION DES TROIS VALEURS DU FORMULAIRE
  inputNouveauProjet.addEventListener('click', event => {
    console.log("Bouton de validation cliqué !");
    event.preventDefault();
    const tabloSubmitProjet2 = {
      image: document.getElementById("image").files[0],
      title: document.getElementById("titre").value,
      category: parseInt(document.getElementById("categorie").value)
    }

    // 3) FORMATER VALEURS POUR ENVOI AU SERVEUR (FormData)
    let tabloSubmitProjet = new FormData(document.getElementById("formulaire-ajout-projet"));
    console.log(tabloSubmitProjet);

    // 4) ENVOI DES DONNEES AU SERVEUR
    fetch('http://localhost:5678/api/works',
        {
          method: 'POST', headers:
              {
                "accept": "application/json",
                'Authorization': `Bearer ${token}`,
              },
          'body': tabloSubmitProjet
        })

        // 5) REPONSE AVEC AJOUT NOUVEAU PROJET sans recharger la page
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          else { alert("Nouveau projet refusé. Tous les champs doivent être remplis.") }
        })

        .then((work)=>{
          alert("Nouveau projet accepté !");

          works.push(work);
          displayWorks(works);

          modale.style.display = "none";
          document.body.style.backgroundColor = "rgba(0, 0, 0, 0)";
        })
        .catch((error) => console.log(error))
  })
}



// // RECUPERATION DES TRAVAUX

// const responseWorks = await fetch("http://localhost:5678/api/works");
// // let works pour pouvoir modifier au lieu de constante dans tableau
// let works = await responseWorks.json();
// displayWorks(works);
// // ligne 28
// // /id Projet
// // display works

// function displayWorks(works) {
//   //vider au début de la fonction
//   document.getElementById("gallery").innerHTML = "";
//   //création variable pour un projet avec la boucle for ... of ...
//   for (let work of works) {
//     let figure = document.createElement("figure");

//     // Rajout attribut data- pour avoir un sélecteur permettant de filtrer les travaux
//     figure.setAttribute("data-categoryid", work.categoryId)
//     let img = document.createElement("img");
//     img.setAttribute("src", work.imageUrl);
//     img.setAttribute("alt", work.title);
//     figure.appendChild(img);
//     let figcaption = document.createElement("figcaption");
//     figcaption.innerHTML = work.title;
//     figure.appendChild(figcaption);
//     gallery.appendChild(figure);}}

// //Méthode pour récupérer les catégories (données) avec liaison avec le backend
// //await avant fetch et response
// //async avant fonction
// const responseCategories = await fetch("http://localhost:5678/api/categories");
// const categories = await responseCategories.json();

// // appel de la fonction
// createFilters(categories);

// // const responseWorks = await fetch("http://localhost:5678/api/works");
// // // let works pour pouvoir modifier au lieu de constante dans tableau
// // let works = await responseWorks.json();
// // displayWorks(works);
// // // ligne 28
// // // /id Projet
// // // display works

//   for (let category of categories) {
//     // Sélection de buttonCategories (HTML) pour récupérer les category.name et générer les 3 boutons
//     buttonCategories.innerHTML = category.name;
//     filtres.appendChild(buttonCategories);

//     //Méthode pour détecter le clic sur les filtres et récupérer le category.id de la catégorie
//     buttonCategories.addEventListener('click', event => { filtering(category.id) });
//   }}

// // FONCTION DE FILTRAGE DES TRAVAUX PAR CATEGORIES
// function filtering(categoryID) {
//   if (categoryID == 0) {//continue après réponse
//     console.log("script filtres en cours");
//     let figuresToShow = gallery.querySelectorAll(`figure`);
//     for (let figureToShow of figuresToShow) {
//       //intégration CSS display:block; en JS pour afficher
//       figureToShow.style.display = "block";}}
//   else {
//     // Création variable figuresToShow 
//     //pour afficher par défaut toutes les figures dans le DOM avec gallery.querySelectorAll
//     let figuresToShow = gallery.querySelectorAll(`figure[data-categoryid="${categoryID}"]`);
//     for (let figureToShow of figuresToShow) {
//       //intégration CSS display:block; en JS pour afficher
//       figureToShow.style.display = "block";}

//     //not pour sélectionner les figures des catégories non voulues
//     let figures = gallery.querySelectorAll(`figure:not([data-categoryid="${categoryID}"])`);
//     for (let figure of figures) { figure.style.display = "none"; }
//   }}


// // OUVERTURE DE LA MODALE
// modifier3.appendChild(divModifier3);
// modifier3.addEventListener('click', event => {
//   createModal(works);
//   modale.style.display = "block";
//   document.body.style.backgroundColor = "rgba(0, 0, 0, 0.3)";});

// // CREATION MODALE
// //function appelée pour faire apparaître les projets dans la modale
// //async function createModal(works)

// //FONCTION POUR CREER LA MODALE AVEC LA GALERIE DES PROJETS

// function createModal(works) {
//   //cliquer pour l'ouvrir sur bandeau noir et titre projet (modifier/éditer)
//   document.getElementById("modale").innerHTML = "";
//   let modaleVersion1 = document.createElement("div");
//   modale.appendChild(modaleVersion1);
//   modale.setAttribute("class", "modal");
//   let pCroixModale = document.createElement("p");
//   pCroixModale.setAttribute("class", "croix");
//   pCroixModale.textContent = "X";
//   modaleVersion1.appendChild(pCroixModale);

//   //BOUCLE POUR RECUPERER LES TRAVAUX DANS LA GALERIE DE LA MODALE
//   for (let work of works) {
//     let divGalerie = document.createElement("div");
//     divGalerie.setAttribute("class", "bloc-galerie-modale");
//     divGalerie.setAttribute("data-id", work.id);
//     let modalImg = document.createElement("img");
//     modalImg.setAttribute("src", work.imageUrl);
//     modalImg.setAttribute("alt", work.title);
//     let pEditer = document.createElement("p");
//     pEditer.textContent = "éditer";

//     // SUPPRIMER UN PROJET sans rechargement de la page (callback?)

//     // 1) DETECTION DU CLIC SUR LA CORBEILLE
//     iconePanier.addEventListener("click", (e) => {
//       console.log(e.currentTarget.getAttribute("data-id"));

//       // 2-3) RECUPERATION DE L'ID DU PROJET POUR LE SERVEUR ("data-id")
//       let workId = e.currentTarget.getAttribute("data-id");
//       let workTitle = e.currentTarget.getAttribute("data-title");

//       // 4) ENVOI DE L'ID DU PROJET A SUPPRIMER AU SERVEUR
//       fetch(`http://localhost:5678/api/works/${workId}`,
//         {method: 'DELETE',
//           headers: { 'Authorization': `Bearer ${token}`, },})

//         // 5) TRAITEMENT DE LA REPONSE ET DES ERREURS
//         .then((response) => {
//           if (response.ok) {
//              // FONCTION CALLBACK SUPPRESSION PROJET
//             // function callbackSupprim(callback) { callback(works); }
//             // callbackSupprim(displayWorks);

//             e.preventDefault();
//             alert("Projet (" + workTitle + ") n° " + workId + " supprimé !");}

//           else {
//             alert("Projet (" + workTitle + ") n° " + workId + " non supprimé !");
//             console.log("réponse du serveur :" + response.status);
//           }
//         })

//         //deuxième then à refaire
//         // suppression des travaux
//         // comment retirer un travail du tableau
//         .catch((error) => console.log(error))})

// //R2CUPERER !!!
// //HOVER IMAGES GALERIE MODALE (récupéré en capture d'écran)
//     // let iconeFleche = document.createElement("i");
//     // iconeFleche.setAttribute("class", "fa-solid fa-arrows-up-down-left-right");
//     // divGalerie.appendChild(iconeFleche);
//     // span.appendChild(iconeFleche);
//     // divGalerie.appendChild(span);
//     modalGalerie.appendChild(divGalerie);
//   }

//   //Clic pour changer la version de modale
//   boutonAjoutPhoto.addEventListener('click', event => {
//     createModalForm();
//     console.log("cliqué");
//     // replace mettre appel modale V2 à la place, createmodalformulaire
//     //pas de besoin de replace
//     // modale.replaceChild(modaleVersion2, modaleVersion1);});
//   modaleVersion1.appendChild(boutonAjoutPhoto);

// // FENETRE MODALE AJOUTER UNE PHOTO

// //VOIR CREATION NOUVELLE MODALE
// //rien dans la parenthèse, pas de paramètre
// function createModalForm(){console.log("ajouter un projet");
//   //vider la page
// document.getElementById("modale").innerHTML = "";
  
// //FONCTION POUR CREER LA MODALE AVEC LE FORMULAIRE POUR AJOUTER UN PROJET
// let modaleVersion2 = document.createElement("div");
// modaleVersion2.setAttribute("id", "modaleVersion2");
// modaleVersion2.setAttribute("class", "modal");
// //rappel au début
// document.getElementById("modaleVersion2");

// // INPUT PHOTO
// let inputPhoto = document.createElement("input");
// inputPhoto.setAttribute("required", "required");
// inputPhoto.setAttribute("type", "file");
// inputPhoto.setAttribute("accept", ".png, .jpg, .jpeg");
// inputPhoto.setAttribute("name", "image");
// inputPhoto.setAttribute("id", "image");
// // inputPhoto.classList.add("bouton-ajouter-photo");
// inputPhoto.setAttribute("class", "file-input-button");
// // size : un nombre qui représente la taille du fichier en octets.
// inputPhoto.setAttribute("max-size", "4000000");
// //opacity pour cacher l'input par défaut
// inputPhoto.style.opacity = "0";
// champPhoto.appendChild(inputPhoto);

// // PREVISUALISATION DE L'IMAGE
// // listener sur input pour ajouter et modifier style d'une image
// inputPhoto.addEventListener('change', function (event) {
//   // pour lire le fichier choisi (un seul ici)
//   let newReader = new FileReader();
//   // viser le fichier avec target
//   let file = event.target.files[0];
//   // si fichier existe (un seul ici)
//   if (file) {
//     // création de l'image téléchargée
//     let imageUpload = document.createElement("img");
//     // Récupérer la source de l'image
//     imageUpload.setAttribute("src", URL.createObjectURL(file));
//     imageUpload.setAttribute("class", "imageUpload");
//     // ajouter l'image téléchargée (création espace)
//     imageUpload.classList.add('image-load');
//     // Affichez l'image choisie dans la modale
//     //vider la div de l'input
//     // champPhoto.innerHTML=" ";
//     //cacher tous les autres éléments avec display:none; icone, bouton et et texte
//     iImage.style.display = "none";
//     boutonAjouterPhoto.style.display = "none";
//     pFormatsphoto.style.display = "none";
//     // création div pour afficher l'image
//     champPhoto.appendChild(imageUpload);
//     // relier image à la div pour remplacer son ancien contenu
//     // divImageForm.appendChild(imageUpload);
//     // méthode pour lire le contenu du fichier choisi
//     // newReader.readAsDataURL(file);};});


// //CHAMP CATEGORIES
// createFilters(categories)
// console.log(categories)
// {
//   let labelCategories = document.createElement("label");
//   labelCategories.setAttribute("for", "categorie");
//   labelCategories.setAttribute("class", "label-categorie");
//   labelCategories.textContent = "Catégorie";
//   formAjoutProjet.appendChild(labelCategories);
//   let select = document.createElement("select");
//   select.setAttribute("name", "category");
//   select.setAttribute("id", "categorie");
//   select.setAttribute("class", "champ-categorie");
//   select.setAttribute("required", "required");

// // BOUTON VALIDER FORMULAIRE (désactivé par défaut)
// // ACTIVATION DU BOUTON VALIDER DU FORMULAIRE
// let inputNouveauProjet = document.createElement("input");
// inputNouveauProjet.setAttribute("id", "boutonpasactif");
// inputNouveauProjet.setAttribute("type", "submit");
// inputNouveauProjet.setAttribute("value", "Valider");
// formAjoutProjet.appendChild(inputNouveauProjet);

// //CREATION NOUVEAU PROJET sans rechargement de la page (callback?)
// // 1) DETECTION DU CLIC
// // 2) RECUPERATION DES TROIS VALEURS DU FORMULAIRE
// inputNouveauProjet.addEventListener('click', event => {
//   console.log("Bouton de validation cliqué !");
//   event.preventDefault();
//   const tabloSubmitProjet2 = {
//     image: document.getElementById("image").files[0],
//     title: document.getElementById("titre").value,
//     category: parseInt(document.getElementById("categorie").value)}

//   // 3) FORMATER VALEURS POUR ENVOI AU SERVEUR (FormData)
//   let tabloSubmitProjet = new FormData(document.getElementById("formulaire-ajout-projet"));
//   console.log(tabloSubmitProjet);

//   // 4) ENVOI DES DONNEES AU SERVEUR
//   fetch('http://localhost:5678/api/works',
//     {
//       method: 'POST', headers:
//       {
//         "accept": "application/json",
//         'Authorization': `Bearer ${token}`,
//       },
//       'body': tabloSubmitProjet
//     })

//     // 5) REPONSE AVEC AJOUT NOUVEAU PROJET sans recharger la page
//     .then((response) => {
//       if (response.ok) {
//         return response.json();}
//       else { alert("Nouveau projet refusé. Tous les champs doivent être remplis.") }
//     })

//     .then((work)=>{
//       alert("Nouveau projet accepté !");
//       //array.prototype.push
//       works.push(work);
//       //rappel fonction avec nouveau projet
//       displayWorks(works);
//       modale.style.display = "none";
//       document.body.style.backgroundColor = "rgba(0, 0, 0, 0)";
     
//       //vider le formulaire (reset???)/remettre nouvelle v2
//       //reload
//       // document.getElementById("gallery").innerHTML ="";
// // console.log(work);
// // console.log(works);})
//     .catch((error) => console.log(error))
// })
// }





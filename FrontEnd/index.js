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
      let img = document.createElement("img");
      img.setAttribute("src", work.imageUrl);
      img.setAttribute("alt", work.title);
      figure.appendChild(img);
      let figcaption = document.createElement("figcaption");
      figcaption.innerHTML = work.title;
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
    }

    //FONCTION GALERIE MODALE
    createModal(works);

  })

  //si erreur
  .catch(function (error) { (error); });

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

//Méthode pour récupérer les catégories (données) avec liaison avec le backend
fetch("http://localhost:5678/api/categories")
  .then(function (response) { if (response.ok) { return response.json(); } })
  .then(function (categories) {
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

    //FONCTION CREATION MENU DEROULANT MODALE   
    createMenuCategories(categories);
  })

  //si erreur
  .catch(function (error) { (error); });

// FONCTION DE FILTRAGE DES TRAVAUX PAR CATEGORIES
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
    for (let figure of figures) { figure.style.display = "none"; }
  }
}

// MASQUER FILTRES
if (localStorage.getItem('token')) {
  filtres.style.display = "none";
} else { console.log("Masquer les filtres : pas de connexion !"); }

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
if (localStorage.getItem('token')) {
  // bandeau.style.display = "block";
} else {
  bandeau.style.display = "none";
  console.log("Afficher le bandeau noir : pas de connexion !");
}

//LOGIN (Connexion)/ LOGOUT (déconnexion)
//mode visiteur par défaut
//login
let login = document.createElement("a");
login.setAttribute("class", "login");
login.innerText = "Login";
login.setAttribute("href", "login.html");
log.appendChild(login);
//logout
let logout = document.createElement("a");
logout.setAttribute("class", "login");
logout.innerText = "Logout";
log.appendChild(logout);
logout.style.display = "none";

// si connecté
if (localStorage.getItem('token')) {
  console.log("Afficher Logout : connexion ok !");
  login.style.display = "none";
  logout.style.display = "block";
  //si pas connecté
} else {
  console.log("Afficher Logout : pas de connexion !");
}
// Déconnexion/suppression token
logout.addEventListener("click", (e) => {
  localStorage.removeItem("token", token);
  console.log("token : " + token);
  login.style.display = "block";
  //retour à la page d'accueil en mode visiteur
  document.location.href = "index.html";
  e.preventDefault();
})

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
if (localStorage.getItem('token')) {
  // divModifier1.style.display = "block";
} else {
  divModifier1.style.display = "none";
  console.log("Modifier la présentation : pas de connexion !");
}

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
if (localStorage.getItem('token')) {
  // divModifier2.style.display = "block";
} else {
  divModifier2.style.display = "none";
  console.log("Modifier la photo : pas de connexion !");
}

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
  event.preventDefault();
  modale.style.display = "block";
  // background-color pour mettre body en sombre
  document.body.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
  console.log("Modale ouverte !");
});

// FERMETURE DE LA MODALE si clic en dehors de la modale
document.addEventListener("mouseup", function (event) {
  let cible = document.getElementById("modale");
  if (!cible.contains(event.target)) {
    console.log("clic à l'extérieur de la modale !");
    modale.style.display = "none";
    document.body.style.backgroundColor = "rgba(0, 0, 0, 0)";
  }
  else { console.log("clic à l'intérieur de la modale !"); }
})

// const target=document.querySelector(e.target.getAttribute('href'));
// target.style.display=null; target.removeAttribute('aria-hidden');
// target.setAttribute('aria-modal','true');
// afficherImageModale(); modal=target;
// modal.querySelector('.fermer-modale').addEventListener('click', stopPropagation);};
// const fermer =document.querySelector(".x-close");
// modal.querySelector('.modale-supprimer-btn').addEventListener('click', fermerModale);
// e.stopPropagation aux enfants
// const fermerModale = function(e){if(modal===null) return
// const fond=document.querySelector('html');
// modal.setAttribute('aria-hidden','true');
// modal.removeAttribute('aria-modal');
// modal.removeEventListener('click',fermerModale);
// modal.querySelector('.modale-supprimer-btn').removeEventListener('click',fermerModale);
// modal.querySelector('.fermer-modale').removeEventListener('click', stopPropagation);
// modal=null;}
// STOP PROPAGATION MODALE
// const stopPropagation=function(e) {e.stopPropagation()};
// const ouvrirModale = function(e) {e.preventDefault();
// const target = document.querySelector(e.target.getAttribute('href'));
// target.style.display = null;
// target.removeAttribute('aria-hidden');
// target.setAttribute('aria-modal','true'); modal = target;
// const fermer = document.querySelector(".x-close");
// modale.querySelector('.modale-supprimer-btn').addEventListener('click',fermerModale);};
// const fermerModale = function(e){if(modal===null) return
// modal.setAttribute('aria-hidden','true');
// modal.removeAttribute('aria-modal');
// modal.removeEventListener('click',fermerModale);
// modal.querySelector('.modale-supprimer-btn').addEventListener('click',fermerModale);
// modal=null;};
// document.querySelectorAll('.open-modal1').forEach(a=>{

// CREATION MODALE
function createModal(works) {

  //cliquer pour l'ouvrir sur bandeau noir et titre projet (modifier/éditer)
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
    document.body.style.backgroundColor = "rgba(0, 0, 0, 0)";
    console.log("croix cliquée !")
  });


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
  for (work of works) {
    let divGalerie = document.createElement("div");
    divGalerie.setAttribute("class", "bloc-galerie-modale");
    divGalerie.setAttribute("data-id", work.id);
    let modalImg = document.createElement("img");
    modalImg.setAttribute("src", work.imageUrl);
    modalImg.setAttribute("alt", work.title);
    let pEditer = document.createElement("p");
    pEditer.textContent = "éditer";
    divGalerie.appendChild(modalImg);
    divGalerie.appendChild(pEditer);
    //CORBEILLE
    let spanPanier = document.createElement("span");
    spanPanier.setAttribute("class", "style-modal-icone");
    let iconePanier = document.createElement("i");
    iconePanier.setAttribute("class", "fa-regular fa-trash-can");
    iconePanier.setAttribute("data-id", work.id);
    iconePanier.setAttribute("data-title", work.title);
    spanPanier.appendChild(iconePanier);
    divGalerie.appendChild(spanPanier);

    // SUPPRIMER UN PROJET (sans rechargement de la page!)
    // 1) Détecter le clic sur la corbeille
    iconePanier.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(e.currentTarget.getAttribute("data-id"));
      // 2 Récupérer l'id du projet à supprimer
      let workId = e.currentTarget.getAttribute("data-id");
      let workTitle = e.currentTarget.getAttribute("data-title");
      confirm("Ce projet a l'id n°" + workId + " et se nomme : " + workTitle +
        ". Voulez-vous vraiment supprimer ce projet ?");
      // 3) Formater l'id du projet pour l'envoyer au back-end
      // 4) Envoyer l'id du nouveau projet au serveur
      //Utiliser fetch pour requête api et suprimer travail avec id
      fetch(`http://localhost:5678/api/works/${workId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        // 5) Traitement de la réponse et des erreurs
        //change 200, 204 çà marche!!!
        .then((response) => {
          if (response.status === 200) {
            e.preventDefault();
            alert("Projet n° " + workId + " supprimé !");
          }
          else {
            alert("Impossible de supprimer n° " + workId);
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
    modale.replaceChild(modaleVersion2, modaleVersion1);
  });
  modaleVersion1.appendChild(boutonAjoutPhoto);

  // LIEN SUPPRIMER LA GALERIE
  let lienSupprimerGalerie = document.createElement("a");
  lienSupprimerGalerie.setAttribute("class", "supprimergalerie");
  lienSupprimerGalerie.setAttribute("href", "#");
  lienSupprimerGalerie.textContent = "Supprimer la galerie";
  modaleVersion1.appendChild(lienSupprimerGalerie);
}

// Modale pour ajouter un projet, q'une seule modale dans le code !!!
let modaleVersion2 = document.createElement("div");
modaleVersion2.setAttribute("class", "modal");

// FLECHE v2= retour en arrière V1 !!!!
let pFleche = document.createElement("p");
pFleche.textContent = "←";
pFleche.addEventListener('click', event => {
  console.log("Flèche cliquée !");
  event.preventDefault();
  // createModal(works);
  // modaleVersion2.remove();
  // modale.style.display = "block";
  // modaleVersion2.style.display="none";
});

let divFlecheCroix = document.createElement("div");
divFlecheCroix.appendChild(pFleche);

//CROIX v2
let pCroix = document.createElement("p");
pCroix.setAttribute("class", "croix");
pCroix.textContent = "X";

// FERMETURE DE LA MODALE (croix)
//problème qd on rouve la modale (v2 au lieu de v1) !!!!
pCroix.addEventListener('click', event => {
  modale.style.display = "none";
  document.getElementById("modale").innerHTML=""
  document.body.style.backgroundColor = "rgba(0, 0, 0, 0)";
  event.preventDefault();
  console.log("Croix cliquée !")
});

divFlecheCroix.appendChild(pCroix);
divFlecheCroix.setAttribute("class", "divFlecheCroix");
modaleVersion2.appendChild(divFlecheCroix);

//TITRE modale v2
let titreAjoutPhoto = document.createElement("h3");
titreAjoutPhoto.setAttribute("class", "titre-modale");
titreAjoutPhoto.textContent = "Ajout photo";
modaleVersion2.appendChild(titreAjoutPhoto);

//FORMULAIRE pour ajouter projet
let formAjoutProjet = document.createElement("form");
formAjoutProjet.setAttribute("id", "formulaire-ajout-projet");
formAjoutProjet.setAttribute("enctype", "multipart/form-data");
formAjoutProjet.setAttribute("action", "#");
formAjoutProjet.setAttribute("method", "post");
modaleVersion2.appendChild(formAjoutProjet);

//CHAMP pour télécharger photo
//cacher quand l'image est mise
let champPhoto = document.createElement("div")
champPhoto.setAttribute("class", "uploader-image");

//icone image
let iImage = document.createElement("i");
iImage.setAttribute("class", "fa-sharp fa-regular fa-image");
let spanImage = document.createElement("i");
spanImage.setAttribute("class", "span-image");
spanImage.appendChild(iImage);
champPhoto.appendChild(spanImage);


formAjoutProjet.appendChild(champPhoto);

//input photo
let inputPhoto = document.createElement("input");
//champ obligatoire
inputPhoto.setAttribute("required", "required");
inputPhoto.setAttribute("type", "file");
inputPhoto.setAttribute("accept", ".png, .jpg, .jpeg");
inputPhoto.setAttribute("name", "image");
inputPhoto.setAttribute("id", "image");
inputPhoto.setAttribute("max-size", "4000");

//opacity pour cacher l'input par défaut
inputPhoto.style.opacity = "0";

//créer bouton à la place de l'input
let boutonAjouterPhoto = document.createElement("button");
boutonAjouterPhoto.setAttribute("class", "bouton-ajouter-photo");
boutonAjouterPhoto.textContent = "+ Ajouter photo";
champPhoto.appendChild(boutonAjouterPhoto);

//texte format image et taille
let pFormatsphoto = document.createElement("p");
pFormatsphoto.textContent = "jpg, png : 4mo max";
pFormatsphoto.setAttribute("class", "sous-titre-image");
champPhoto.appendChild(pFormatsphoto);

//label = voir utilité
// let labelAjouterPhoto = document.createElement("label");
// champPhoto.appendChild(labelAjouterPhoto);

//raccorder avec "bouton" ajout photo!!!
champPhoto.appendChild(inputPhoto);

// PREVISUALISATION DE L'IMAGE
inputPhoto.addEventListener('change', function (event) {
  // pour lire le fichier
  let newReader = new FileReader();
  // viser le fichier
  let file = event.target.files[0];
  // si fichier existe (condition)
  if (file) {
    // création de l'image téléchargée
    //lui appliquer une classe et la bonne taille
    let imageUpload = document.createElement("img");
    imageUpload.setAttribute("src", URL.createObjectURL(file));
    imageUpload.setAttribute("class", "imageUpload");
    // ajouter l'image téléchargée (création espace)
    imageUpload.classList.add('image-load');
    // récupérer la source de l'image
    // imageUpload.src= event.target.result;
    // création div pour afficher l'image
    // Affichez l'image choisie dans la modale
    let divImageForm = document.getElementById("image");
    // relier image à la div
    champPhoto.appendChild(imageUpload);
    // méthode pour lire le fichier dans le DOM
    // newReader.readAsDataURL(file);
  };
});

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
function createMenuCategories(categories) {
  let labelCategories = document.createElement("label");
  labelCategories.setAttribute("for", "categorie");
  labelCategories.setAttribute("class", "label-categorie");
  labelCategories.textContent = "Catégorie";
  formAjoutProjet.appendChild(labelCategories);
  let select = document.createElement("select");
  select.setAttribute("name", "category");
  select.setAttribute("id", "categorie");
  select.setAttribute("class", "champ-categorie");

  // Première option vide par défaut
  let optionVide = document.createElement("option");
  optionVide.setAttribute("class", "");
  optionVide.setAttribute("value", "");
  select.appendChild(optionVide);

  // BOUCLE POUR RECUPERER LES CATEGORIES DANS LE MENU DEROULANT
  for (category of categories) {
    let optionCategories = document.createElement("option");
    //champ obligatoire
    optionCategories.setAttribute("required", "required");
    optionCategories.setAttribute("class", "choix-categorie");
    optionCategories.setAttribute("id", category.id);
    optionCategories.setAttribute("name", category.name);
    optionCategories.setAttribute("value", parseInt(category.id));
    optionCategories.innerHTML = category.name;
    select.appendChild(optionCategories);
    formAjoutProjet.appendChild(select);
  }
}

//HR2
let hr2 = document.createElement("hr");
hr2.setAttribute("class", "hr2-modale");
modaleVersion2.appendChild(hr2);

// BOUTON VALIDER FORMULAIRE (désactivé)
let inputNouveauProjet = document.createElement("input");
inputNouveauProjet.setAttribute("type", "submit");
inputNouveauProjet.setAttribute("value", "Valider");
modaleVersion2.appendChild(inputNouveauProjet);
inputNouveauProjet.setAttribute("id", "submit");
// inputNouveauProjet.setAttribute("disabled", "");
// inputNouveauProjet.setAttribute("id", "boutonpasactif");
//   inputNouveauProjet.setAttribute("disabled", "true");




//CREATION NOUVEAU PROJET (sans rechargement de la page !)
//récupérer photo dans dossier assets
// 1) Détecter le clic sur le bouton de validation
// 2) Récupérer les 3 valeurs du formulaire
inputNouveauProjet.addEventListener('click', event => {
  console.log("cliqué !");
  event.preventDefault();
  const tabloSubmitProjet2 = {

    // pour récupérer la valeur photo
    image: document.getElementById("image").files[0],

    // pour récupérer la valeur titre
    title: document.getElementById("titre").value,

    // pour récupérer la valeur id des catégories sur select
    category: parseInt(document.getElementById("categorie").value)
  }
  let tabloSubmitProjet = new FormData(document.getElementById("formulaire-ajout-projet"))
  console.log(tabloSubmitProjet);



  // 3) Formater les valeurs pour les envoyer vers le serveur (FormData)
  // 4) Envoyer les données formatées du formulaire au serveur
  //modale fermé quand on a ajouté un projet
  fetch('http://localhost:5678/api/works',
    {
      method: 'POST', headers:
      {
        "accept": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      //FormData sur le body créé en variable
      'body': tabloSubmitProjet
    })

    // 5) Traitement de la réponse
    //ajout projet dans la galerie de la Modale sans recharger la page
    // FERMETURE DE LA MODALE
    .then((response) => {
      if (response.ok) {
        event.preventDefault();
        location.replace("index.html");
        modale.style.display = "none";
        document.body.style.backgroundColor = "rgba(0, 0, 0, 0)";
        alert("Nouveau projet accepté !");
      }
      else { alert("Nouveau projet refusé !") }
    })
    .catch((error) => console.log(error))
})


//BOUTON VALIDER FORMULAIRE (activé)
// voir si tous les champs du formulaire sont remplis
// if (image === null ||title === null ||categorie === null)

// function RemplirFormulaire()

// {
//   let image = document.getElementById("image") ;
// let title = document.getElementById("titre") ;
// let categorie = document.getElementById("categorie");
// let tableau_champs = [image, title, categorie];
// console.log(tableau_champs);
// let tableau_plein = true;
// valeur = document.getElementById(champ_obligatoire[i]).value;

// for (let i; h<3; i++)

// if( (valeur.length == 0) || (valeur == "") || (valeur == "NULL") )
// {tableau_plein = false;
//   inputNouveauProjet.setAttribute("id", "boutonpasactif");
//   inputNouveauProjet.setAttribute("disabled", "true");
//si tous les champs ne sont pas remplis
//   console.log("Tous les champs ne sont pas remplis !");
// }
// else (tableau_plein)
// {
// document.getElementById('Validation').disabled = false;
// console.log(image + title + categorie);
// inputNouveauProjet.setAttribute("id", "submit");
// inputNouveauProjet.setAttribute("disabled", "false");

// }



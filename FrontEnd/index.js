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
//If (localStorage.getItem("token")!=null)
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
//pas à rendre fonctionnel
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

//Modifier (3 fois) = les deux premiers éléments pour l'image et la présentation
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

let pModifier2 = document.createElement("p");
pModifier2.innerHTML = "Modifier";

let pModifier3 = document.createElement("p");
pModifier3.innerHTML = "Modifier";

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

//MODALE
/* background-color: rgba(0, 0, 0, 0.02);pour body en sombre */
//création modale (Version 1) (temporaire)
//utiliser Aria ???
//Rajout let modal = null par défaut
// let modal = null;
// const ouvrirModale = function(e) {
// e.preventDefault();
// const target = document.querySelector(e.target.getAttribute('href'));
// target.style.display = null;
// target.removeAttribute('aria-hidden');
// target.setAttribute('aria-modal','true');
// modal = target;
// const fermer = document.querySelector(".x-close");
// fermer.addEventListener('click', fermerModale);
// modale.querySelector('.modale-supprimer-btn').addEventListener('click',fermerModale);
// };
// const fermerModale = function(e){
// if(modal===null) return
// e.preventDefault();
// const fond = document.querySelector('html');
// fond.style.background = "white";
// modal.style.display="none";
// modal.setAttribute('aria-hidden','true');
// modal.removeAttribute('aria-modal');
// modal.removeEventListener('click',fermerModale);
// modal.querySelector('.modale-supprimer-btn').addEventListener('click',fermerModale);
// modal=null;
// };
// document.querySelectorAll('.open-modal1').forEach(a=>{
// a.addEventListener('click',ouvrirModale)
// })



function createModal(works) {
  //cliquer pour l'ouvrir sur bandeau noir et titre projet (modifier/éditer)
  let modaleVersion1 = document.createElement("div");
  modale.appendChild(modaleVersion1);
  modale.setAttribute("class", "modal");
  let p = document.createElement("p");
  p.setAttribute("class", "croix");
  //function close(){}
  //clic sur croix ou hors modale pour fermer modale
  //eventListener pour click sur window, récup l'event avec event.target 
  //(si utilisateur a clique sur modale ou à l'extérieur display:none;)
  //console.log(event.target)
  //window.addEventListener('click',e=>{console.log(e.target)})
  //e.stopPropagation aux enfants

  //icone class="fa-solid fa-xmark"
  p.textContent = "X";
  modaleVersion1.appendChild(p);

  //Titre modale v1
  let titreGalerie = document.createElement("h3");
  titreGalerie.setAttribute("class", "titre-modale");
  titreGalerie.textContent = "Galerie photo";
  modaleVersion1.appendChild(titreGalerie);

  //lien vers la "deuxième" modale
  let boutonAjoutPhoto = document.createElement("input");
  boutonAjoutPhoto.setAttribute("id", "ajoutphoto");
  boutonAjoutPhoto.setAttribute("type", "submit");
  boutonAjoutPhoto.setAttribute("value", "Ajouter une photo");
  //eventlistener ajout photo création 2ème photo 
  boutonAjoutPhoto.addEventListener('click', event => {
    modale.replaceChild(modaleVersion2, modaleVersion1);
  });

  modaleVersion1.appendChild(boutonAjoutPhoto);

  //parent en CSS
  let modalGalerie = document.createElement("div");
  
  modalGalerie.setAttribute("id", "modal-gallery");
  modaleVersion1.appendChild(modalGalerie);


  for (work of works) {

    //Création de la galerie de la Modale
    let divGalerie = document.createElement("div");
    divGalerie.setAttribute("data-categoryid", work.categoryId);
    let modalImg = document.createElement("img");
    modalImg.setAttribute("src", work.imageUrl);
    modalImg.setAttribute("alt", work.title);
    let pEditer = document.createElement("p");

    //pas de fonction à faire dessus
    pEditer.textContent = "éditer";
    divGalerie.appendChild(modalImg);
    divGalerie.appendChild(pEditer);


    //Corbeille sur les travaux de la galerie de la Modale
    // rajouter une class au bouton pour cibler
    let buttonPanier = document.createElement("button");
    let spanPanier = document.createElement("span");
    spanPanier.setAttribute("class", "style-modal-icone");
    let iconePanier = document.createElement("i");
    iconePanier.setAttribute("class", "fa-regular fa-trash-can");
    spanPanier.appendChild(iconePanier);
    buttonPanier.appendChild(spanPanier);
    divGalerie.appendChild(buttonPanier);

// 1) Détecter le clic sur la corbeille
buttonPanier.addEventListener('click', event => {
  console.log("Cliqué !");
});

    //hover souris sur image (récupéré en capture d'écran)
    // let iconeFleche = document.createElement("i");
    // iconeFleche.setAttribute("class", "fa-solid fa-arrows-up-down-left-right");
    // divGalerie.appendChild(iconeFleche);
    // span.appendChild(iconeFleche);
    // divGalerie.appendChild(span);
    modalGalerie.appendChild(divGalerie);


  }

  //hr
  let hr = document.createElement("hr");
  hr.setAttribute("class", "hr-modale");
  modaleVersion1.appendChild(hr);


  // lien fonctionnel pour supprimer une image ! delete
  let lienSupprimerGalerie = document.createElement("a");
  lienSupprimerGalerie.setAttribute("class", "supprimergalerie");
  lienSupprimerGalerie.setAttribute("href", "#");
  lienSupprimerGalerie.textContent = "Supprimer toute la galerie";
  modaleVersion1.appendChild(lienSupprimerGalerie);

  //SUPPRIMER UN PROJET
  //Aussi pour tous les travaux
  //Pas recharger page pour voir que projet est supprimé

  


  // event.preventDefault();
  // 2) Récupérer l'id  du projet à supprimer


  // 3) Formater l'id du projet pour l'envoyer vers le serveur
  // Boucle avec toutes les corbeille pour trouver celle qu'on cible
  // for (let trash of trashIcons)
  // {trash.addEventListener("click", function() {
  // // Attribuer l'id du projet à chaque poubelle
  // let workId = trash.getAttribute ("data-works-id");
  // console.log(workId);
  // supprimerProjet(workId);});}

  // 4) Envoyer l'id du nouveau projet au serveur
  // Boucle avec tous les travaux pour trouver celui qu'on veut éliminer
  // for (const workId of selectedWorks){
  // await fetch("http://localhost:5678/api/works/${workId}",
  // {method:'DELETE', 
  // headers:
  // {"accept": "application/json",
  //   "content-type":"application/json",
  // 'Authorization':`Bearer ${localStorage.getItem('token')}`,},
  // 'body':JSON.stringify(tabloSubmitProjet)})}

  // 5) Traitement de la réponse
  // .then (async (response) =>{
  //   if (!response.ok) {
    //Mettre une alerte de confirmation pour la sécurité
  //     console.log ('Projet ${workId}supprimé !');
  //   location.replace ("index.html");
  // }
  //   } 
  //   else {console.log('Impossible de supprimer projet ${workId}')}
  //   .catch ((error) => console.log(error))})

}



// Modale pour ajouter un projet
let modaleVersion2 = document.createElement("div");
modaleVersion2.setAttribute("class", "modal");

//première ligne modale V2 (flèche et croix)
let divFlecheCroix = document.createElement("div");
divFlecheCroix.setAttribute("class", "divFlecheCroix");

//retour en arrière
//history.back()???
let pFleche = document.createElement("p");
pFleche.textContent = "←";
// pFleche.addEventListener('click', event => { 
// console.log ("flèche cliquée !")
// modaleVersion2.replaceChild(modale,modaleVersion2); });

divFlecheCroix.appendChild(pFleche);
let pCroix = document.createElement("p");
pCroix.setAttribute("class", "croix");

//fermer modale(croix ou hors modale) (event)function closeModal
pCroix.textContent = "X";

divFlecheCroix.appendChild(pCroix);
modaleVersion2.appendChild(divFlecheCroix);

//Titre modale v2
let titreAjoutPhoto = document.createElement("h3");
titreAjoutPhoto.setAttribute("class", "titre-modale");
titreAjoutPhoto.textContent = "Ajout photo";
modaleVersion2.appendChild(titreAjoutPhoto);


//Formulaire pour ajouter projet
let formAjoutProjet = document.createElement("form");
formAjoutProjet.setAttribute("id", "ajoutphoto");
formAjoutProjet.setAttribute("enctype", "multipart/form-data");
formAjoutProjet.setAttribute("action", "#");
formAjoutProjet.setAttribute("method", "post");
modaleVersion2.appendChild(formAjoutProjet);

//Champ pour télécharger photo
//voir vidéo danakil YT objet filereader pour aperçu image sélectionné
//cacher quand l'image est mise
let champPhoto = document.createElement("div")
champPhoto.setAttribute("class", "uploader-image");


//Icone photo
let spanPhoto = document.createElement("span");
spanPhoto.setAttribute("class", "style-icone-photo");
let iImage = document.createElement("i")
iImage.setAttribute("class", "fa-regular fa-image");
spanPhoto.appendChild(iImage);
champPhoto.appendChild(spanPhoto);

formAjoutProjet.appendChild(champPhoto);
let inputPhoto = document.createElement("input")
inputPhoto.setAttribute("required", "required");
inputPhoto.setAttribute("type", "file");
inputPhoto.setAttribute("accept", "image/png,image/jpg");
//rajout poids autorisé
inputPhoto.setAttribute("name", "image");
inputPhoto.setAttribute("id", "image");
let pAjouterphoto = document.createElement("p")
let pFormatsphoto = document.createElement("p")
pAjouterphoto.textContent = "+ Ajouter photo";
pFormatsphoto.textContent = "jpg, png : 4mo max";
champPhoto.appendChild(inputPhoto);
champPhoto.appendChild(pAjouterphoto);
champPhoto.appendChild(pFormatsphoto);

//Champ pour nommer projet
let labelTitre = document.createElement("label");
labelTitre.setAttribute("for", "titre");
labelTitre.textContent = "Titre";
formAjoutProjet.appendChild(labelTitre);
let inputTitre = document.createElement("input");
inputTitre.setAttribute("required", "required");
inputTitre.setAttribute("type", "Text");
inputTitre.setAttribute("name", "title");
inputTitre.setAttribute("id", "titre");
formAjoutProjet.appendChild(inputTitre);

//Champ pour sélectionner catégorie
function createMenuCategories(categories) {
  let labelCategories = document.createElement("label");
  labelCategories.setAttribute("for", "categorie");
  labelCategories.textContent = "Catégorie";
  formAjoutProjet.appendChild(labelCategories);
  let select = document.createElement("select");
  select.setAttribute("name", "category");
  select.setAttribute("id", "categorie");
  // création première option vide par défaut
  let optionVide = document.createElement("option");
  optionVide.setAttribute("class", "");
  optionVide.setAttribute("value", "");
  select.appendChild(optionVide);

  for (category of categories) {


    // récup les category.name dans le menu déroulant et générer les 3 options
    let optionCategories = document.createElement("option");
    optionCategories.setAttribute("required", "required");
    optionCategories.setAttribute("class", "choix-categorie");
    optionCategories.setAttribute("id", category.id);
    optionCategories.setAttribute("name", category.name);
    //integer pour la catégorie
    optionCategories.setAttribute("value", parseInt(category.id));
    optionCategories.innerHTML = category.name;
    select.appendChild(optionCategories);
    formAjoutProjet.appendChild(select);
  }

}


let hr2 = document.createElement("hr");
hr2.setAttribute("class", "hr-modale");
modaleVersion2.appendChild(hr2);


// Création bouton envoi formulaire (gris avant remplissage de tous les champs)
//fonction changement de couleur et activer quand tous les champs st remplis
// Gestion des erreurs (bouton Valider reste désactivé)

let inputNouveauProjet = document.createElement("input")
inputNouveauProjet.setAttribute("id", "submit");
inputNouveauProjet.setAttribute("type", "submit");
inputNouveauProjet.setAttribute("value", "Valider");
modaleVersion2.appendChild(inputNouveauProjet);

//CREATION NOUVEAU PROJET
//si formData (retirer multipart du header)
//récupérer photo dans dossier assets

// 1) Détecter le clic sur le bouton de validation
// 2) Récupérer l'ensemble des 3 valeurs du formulaire
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
  let tabloSubmitProjet = new FormData(document.getElementById("ajoutphoto"))
  console.log(tabloSubmitProjet);

  // 3) Formater les valeurs pour les envoyer vers le serveur (FormData???)
  // 4) Envoyer les données formatées du formulaire au serveur
  fetch('http://localhost:5678/api/works',
    {
      method: 'POST',
      headers:
      {
        "accept": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      //FormData sur le body créé en variable
      'body': tabloSubmitProjet
    })

    // 5) Traitement de la réponse
    .then((response) => {
      if (response.ok) {
        //ajout projet dans la galerie de la Modale sans recharger la page
        location.replace("index.html");
      }
      else { alert("Nouveau projet refusé !") }
    })
    .catch((error) => console.log(error))
})

//modale fermé quand on a ajouté un projet

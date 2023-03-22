//déclaration constante pour la gallerie des travaux
const gallery = document.getElementById("gallery");

// déclaration constante pour les filtres (div)
const filtres = document.getElementById("filtres");



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
    (works)

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
  })

  //si erreur
  .catch(function (error) {
    (error);
  });


//création premier bouton qui a toutes les catégories par défaut
let buttonAll = document.createElement("button");

buttonAll.setAttribute("class", "filtre");
buttonAll.setAttribute("type", "button");
buttonAll.setAttribute("name", "Tous");
buttonAll.setAttribute("value", "Tous");

//affichage dans le HTML
buttonAll.innerHTML = "Tous";
filtres.appendChild(buttonAll);

//comportement par défaut
buttonAll.addEventListener('click', event => {
  gallery.innerHTML = location.reload();
});

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
// Création variable figuresToShow 
//pour afficher par défaut toutes les figures dans le DOM avec gallery.querySelectorAll
//
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

//appel à l'API
fetch("http://localhost:5678/api/users/login")

  //réponse du back-end (promise)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })

  //traitement (promise)
  .then(function (users) {
    (users)

    //création variable pour un projet avec la boucle for ... of ...
    for (let user of users) {


        

        //<input id="suivant" type="button" value="suivant" onClick="go(this);" />

//et dans la fonction go
	
//function go(form_element){
  //var form_element_id = form_element.id;
  //alert("L’élément portant l'ID `" + form_element_id + "` à été cliqué !");
//}

    }
  })

  //si erreur
  .catch(function (error) {
    (error);
  });

  // l'evenement permet de détecter sur quel composant le clic est passé
        
  input.onclick.addEventListener= function(fonctionAExecuter) {
    ('click', event => {alert("marche");
});
};







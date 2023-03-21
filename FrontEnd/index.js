//déclaration constante pour la gallerie des travaux
const gallery = document.getElementById("gallery");

// déclaration constante pour les filtres (div)
const filtres = document.getElementById("filtres");



//méthode pour récupérer les données avec liaison avec le backend
fetch("http://localhost:5678/api/works")

  //réponse du back-end (promise)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })

  //traitement (promise)
  .then(function (works) {
    console.log(works)
    //création variable pour un projet avec la boucle for ... of ...
    for (let work of works) {
      let figure = document.createElement("figure");

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
let button1 = document.createElement("button");

button1.setAttribute("class", "filtre");
button1.setAttribute("type", "button");
button1.setAttribute("name", "Tous");
button1.setAttribute("value", "Tous");

//affichage dans le HTML
button1.innerHTML = "Tous";
filtres.appendChild(button1);

//comportement par défaut
button1.addEventListener('click', event => {
  gallery.innerHTML = location.reload();
});

let button2 = document.createElement("button");

//méthode pour récupérer les catégories
fetch("http://localhost:5678/api/categories")

  .then(function (response) {
    if (response.ok) { return response.json(); }
  })

  //traitement
  .then(function (categories) {
    for (let category of categories) {

      //création boutons
      let button2 = document.createElement("button");

      //création attributs bouton
      button2.setAttribute("class", "filtre");
      button2.setAttribute("type", "button");
      button2.setAttribute("id", category.id);
      button2.setAttribute("name", category.name);
      button2.setAttribute("value", category.name);

      //récupération nom catégorie sur les boutons
      button2.innerHTML = category.name;

      //boutons rattachés à la div filtres
      filtres.appendChild(button2);

      button2.addEventListener('click', event => {
        filtering(category.id)
      });
    }
  })
  //si erreur
  .catch(function (error) { (error); });




function filtering(categoryID) {
  let figuresToShow = gallery.querySelectorAll(`figure[data-categoryid="${categoryID}"]`);

  for (let figureToShow of figuresToShow) {

    figureToShow.style.display = "block";

  }
  let figures = gallery.querySelectorAll(`figure:not([data-categoryid="${categoryID}"])`);
  for (let figure of figures) {

    figure.style.display = "none";

  }

}







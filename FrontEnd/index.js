//déclaration constante
const gallery = document.getElementById("gallery");


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

    //création variable pour un projet avec la boucle for ... of ...
    for (let work of works) {
      let figure = document.createElement("figure");

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

// déclaration constante pour les filtres (div)
const filtres = document.getElementById("filtres");


//méthode pour récupérer les catégories
fetch("http://localhost:5678/api/categories")
  .then(function (response) {
    if (response.ok) { return response.json(); }
  })

  //traitement
  .then(function (categories) {
    for (let category of categories) {

      //création premier bouton qui a toutes les catégories par défaut

      let button1 = document.createElement("button");

      button1.setAttribute("class", "filtre");
      button1.setAttribute("type", "button");
      button1.setAttribute("name", "Tous");
      button1.setAttribute("value", "Tous");

      //affichage dans le HTML

      button1.innerHTML = "Tous";
      filtres.appendChild(button1);

      //création boutons
      let button2 = document.createElement("button");

      //création attributs bouton

      button2.setAttribute("class", "filtre");
      button2.setAttribute("type", "button");
      button2.setAttribute("id", category.id);
      button2.setAttribute("name", category.name);
      button2.setAttribute("value", category.name);

      //récupération nom catégorie sur les boutons
      console.log(button2.innerHTML = category.name);


      //boutons rattachés à la div filtres
    

      filtres.appendChild(button2);

      
//Event pour récupérer chaque catégorie
      const click = document.querySelector('button');
click.addEventListener('click', event => {
  click.innerHTML = gallery.innerHTML = category.work;
});


    }
  })
  //si erreur
  .catch(function (error) {(error);});//





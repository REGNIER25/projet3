const gallery = document.getElementById("gallery");

fetch("http://localhost:5678/api/works")
  .then(function(response) {
    if (response.ok) {
      return response.json();
    }
  })

  .then(function(works) {
    console.log(works);
    for(let work of works) {
      console.log (work.title);
      let figure = document.createElement("figure");
      gallery.appendChild(figure);

      let img = document.createElement("img");
      figure.appendChild(img);
      img.setAttribute("src", work.imageUrl);
      img.setAttribute("alt", work.title);

      let figcaption = document.createElement("figcaption");
      figure.appendChild(figcaption); 

      //elem.appendChild(document.createTextNode("Texte"));// 
     // set.figcaption.add //
      // figcaption.setAttribute (figcaption, work.title);*
      /*figcaption.innerHTML = `${work.title.first} ${work.title.last}`*/ 
    }
  })
   
  .catch(function(error) {
    console.log(error);
  });





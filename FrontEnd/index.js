const gallery = document.getElementById("gallery");

fetch("http://localhost:5678/api/works")
  .then(function(response) {
    if (response.ok) {
      return response.json();
    }
  })

  .then(function(works) {
    for(let work of works) {
      let figure = document.createElement("figure");
     

      let img = document.createElement("img");
      img.setAttribute("src", work.imageUrl);
      img.setAttribute("alt", work.title);
      figure.appendChild(img);

      let figcaption = document.createElement("figcaption");
      figcaption.innerHTML = work.title;
      figure.appendChild(figcaption); 

      gallery.appendChild(figure);

       
    }
  })
   
  .catch(function(error) {
    console.log(error);
  });





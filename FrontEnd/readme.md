/*Etape 1 : Récupérer dynamiquement les données des travaux via l'Api ;
Document Swagger/Readme avec les différentes routes*/

GET/works
[
  {
    "id": 1,
    "title": "Abajour Tahina",
    "imageUrl": "http://localhost:5678/images/abajour-tahina1651286843956.png",
    "categoryId": 1,
    "userId": 1,
    "category": {"id": 1, "name": "Objets"}
  }
]


fetch /*et*/ URL

/*liaison avec BDD pour récupérer les données*/

/*Constructeur*/

constructor


getAll 
/*pour récupérer les projets avec le id*/

getElementbyid

/*Etape 2 : Ajouter le tri des projets par catégorie dans la galerie*/

GET/categories

[{"id": 1,"name": "Objets"}]

/*pour récupérer les projets avec les id*/

/*pour trier*/
Sort()

/* Etape 3: Intégrer la page de connexion pour le site*/
/* Si couple identifiant-mot de passe faux, afficher message erreur*/

POST/users/login
{
  "email": "string",
  "password": "string"
}

{
  "userId": 1,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4"
}

"Erreur dans l'idenfiant ou le mot de passe !"

/* Si couple identifiant-mot de passe bon, 
rediriger vers la page d'accueil avec les boutons 
pour éditer le site : bandeau noir et modifier au niveau du titre Mes projets */

/*Etape 4 :Ajouter la modale pour gérer la liste des projets */

/*suppression travail en cliquant sur la corbeille*/


DELETE/works/{id}
	id *
integer($int64)
(path)
id of work to be deleted 1


/*Etape 5 : Créer le formulaire pour l'ajout de projet*/
/*champ image pour uploader une image*/
/*champ pour nommer le projet*/
/*champ select pour choisir une catégorie*/


POST/works
image
string($binary)
	
title
string
	
category
integer($int64)
{
  "id": 0,
  "title": "string",
  "imageUrl": "string",
  "categoryId": "string",
  "userId": 0
}


/*fonction pour fermer la modale*/

closeModal


function creationDesElements(nounourses) {
    console.log(nounourses);

    const ancre = document.getElementById('listeProduits');

    for (let elem of nounourses) {

        let mainDiv = document.createElement('div')
        mainDiv.setAttribute("id", "mainDiv")

        let lienNounours = document.createElement('a')
        lienNounours.setAttribute("href", `produits.html?productid=${elem._id}`)
        mainDiv.appendChild(lienNounours)

        let searchDiv = document.createElement('div')
        searchDiv.setAttribute("class", "searchDiv")
        lienNounours.appendChild(searchDiv)

        let searchIcon = document.createElement('i')
        searchIcon.setAttribute("class", "fas fa-search SearchFormBtnIcon")
        searchDiv.appendChild(searchIcon)

        let secondaryDiv = document.createElement('div')
        secondaryDiv.setAttribute("id", "secondaryDiv")

        let img = document.createElement('img')
        img.setAttribute("src", elem.imageUrl)
        img.setAttribute("id", "photo")
        img.setAttribute("alt", "photo du Teddy")
        lienNounours.appendChild(img)

        let nomNounours = document.createElement('h1')
        nomNounours.setAttribute("id", "nom")
        nomNounours.innerText = elem.name
        secondaryDiv.appendChild(nomNounours)

        let prixNounours = document.createElement('h2')
        prixNounours.innerText = elem.price /100 +" "+ "€"
        prixNounours.setAttribute("id", "prix")
        secondaryDiv.appendChild(prixNounours)

        lienNounours.appendChild(secondaryDiv)

        let descriptionNounours = document.createElement('h3')
        descriptionNounours.innerText = elem.description
        descriptionNounours.setAttribute("id", "description")
        lienNounours.appendChild(descriptionNounours)

        ancre.appendChild(mainDiv)
    }
}
  
async function fillProducts() { //FONCTION FAIRE LA RECETTE TERMINEE AVEC LES INGREDIENTS DE LA LISTE DE COURSE
    await fetch('http://localhost:3000/api/teddies') // PRENDRE LES INGREDIENTS --- will return info, but in wrong format
      .then((response) => response.json()) // POSER LES INGREDIENTS --- will return info, in json format
      .then((elem) => creationDesElements(elem))// PREPARER LA RECETTE AVEC LES INGREDIENTS
  }
  
fillProducts() // FAIRE LA RECETTE TERMINEE AVEC LES INGREDIENTS DE LA LISTE DE COURSE
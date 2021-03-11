function creationDesElements(nounourses) {
    console.log(nounourses);

    const ancre = document.getElementById('listeProduits');

    for (let elem of nounourses) {

        let mainDiv = document.createElement('div')
        mainDiv.setAttribute("id", "mainDiv")

        let teddiesLink = document.createElement('a')
        teddiesLink.setAttribute("href", elem._id)
        mainDiv.appendChild(teddiesLink)

        let productLink = document.createElement('div')
        productLink.setAttribute("id", "productLink")
        teddiesLink.appendChild(productLink)

        let searchIcon = document.createElement('div')
        searchIcon.setAttribute("class", "searchIcone")
        productLink.appendChild(searchIcon)

        /*let icon = document.createElement('i')
        icon.setAttribute("class", "fas fa-search SearchFormBtnIcon")
        searchIcon.appendChild("icon")*/

        //let searchIcon = document.getElementsByClassName('fas fa-search SearchFormBtnIcon')


        let secondaryDiv = document.createElement('div')
        secondaryDiv.setAttribute("id", "secondaryDiv")

        let img = document.createElement('img')
        img.setAttribute("src", elem.imageUrl)
        img.setAttribute("id", "photo")
        teddiesLink.appendChild(img)

        let nomNounours = document.createElement('h1')
        nomNounours.setAttribute("id", "nom")
        nomNounours.innerText = elem.name
        secondaryDiv.appendChild(nomNounours)

        let prixNounours = document.createElement('h2')
        prixNounours.innerText = elem.price /100 +" "+ "€"
        prixNounours.setAttribute("id", "prix")
        secondaryDiv.appendChild(prixNounours)

        teddiesLink.appendChild(secondaryDiv)

        let descriptionNounours = document.createElement('p')
        descriptionNounours.innerText = elem.description
        descriptionNounours.setAttribute("id", "description")
        teddiesLink.appendChild(descriptionNounours)

        /*let boutonLienProduit = document.createElement('button')
        boutonLienProduit.innerText = "Voir produit"
        boutonLienProduit.setAttribute("id", "bouton")
        mainDiv.appendChild(boutonLienProduit)*/

        ancre.appendChild(mainDiv)
    }
}
  
async function fillProducts() { //FONCTION FAIRE LA RECETTE TERMINEE AVEC LES INGREDIENTS DE LA LISTE DE COURSE
    await fetch('http://localhost:3000/api/teddies') // PRENDRE LES INGREDIENTS --- will return info, but in wrong format
      .then((response) => response.json()) // POSER LES INGREDIENTS --- will return info, in json format
      .then((elem) => creationDesElements(elem))// PREPARER LA RECETTE AVEC LES INGREDIENTS
  }
  
fillProducts() // FAIRE LA RECETTE TERMINEE AVEC LES INGREDIENTS DE LA LISTE DE COURSE
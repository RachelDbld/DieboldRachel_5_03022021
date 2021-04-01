const queryString = window.location.search; //récupérer les paramètres d'URL
const urlParams = new URLSearchParams(queryString); //analyse des paramètres d'URL

const product = urlParams.get('productid') //récupérer la valeur (id des produits) du paramètre "produits"


function isInTheCart (product, addLocalStorage) {
    for (let product of addLocalStorage) {
      if (product <= 1) {
          return true
      }
      //console.log('cet article a déjà été ajouté au panier');
    }
    return false
}

//CREATION DE LA PAGE PRODUIT
function creationPageNounours(nounours) {

    const ancre = document.getElementById('mainDiv'); //définit l'id "mainDiv" comme ancre à laquelle se rattacheront différents éléments

    let imgNounours = document.createElement('img')  //création de l'élément image pour intégrer les photos produits
    imgNounours.setAttribute("src", nounours.imageUrl)
    imgNounours.setAttribute("id", "photo")
    imgNounours.setAttribute("alt", "photo du teddy")
    ancre.appendChild(imgNounours)

    let secondaryDiv = document.createElement('div') //création d'une div secondaire pour y intégrer différents éléments html
    secondaryDiv.setAttribute("id", "secondaryDiv")
    ancre.appendChild(secondaryDiv)

    let nameNounours = document.createElement('h1') //permet d'intéger le nom de l'article
    nameNounours.setAttribute("id", "nom")
    nameNounours.innerText = nounours.name
    secondaryDiv.appendChild(nameNounours)

    let descriptionOurs = document.createElement('h3') //permet d'intéger la description de l'article
    descriptionOurs.innerText = nounours.description
    descriptionOurs.setAttribute("id", "description")
    secondaryDiv.appendChild(descriptionOurs)

    let titreSelect = document.createElement('p') //permet d'intéger le titre du menu déroulant
    titreSelect.innerText = 'Choisissez une couleur :'
    titreSelect.setAttribute('id', 'titreSelect')
    secondaryDiv.appendChild(titreSelect)

    let menuDeroulant = document.createElement('select') //permet de créer le menu déroulant
    menuDeroulant.setAttribute('label', 'choisissez une couleur')
    menuDeroulant.setAttribute('id', 'menuDeroulant')
    
    //boucle pour intégrer les options du menu déroulant
    for(let color of nounours.colors){
        let option = document.createElement('option');
        option.setAttribute('value', color)
        option.text = color
        menuDeroulant.appendChild(option)
        //console.log(color);
    }
    secondaryDiv.appendChild(menuDeroulant)

    let cartButton = document.createElement('button') //création du bouton d'ajout au panier
    cartButton.setAttribute('id', 'cartButton')
    cartButton.innerHTML = '<h3>Ajoutez au panier pour </h3>'
    secondaryDiv.appendChild(cartButton)

    let priceNounours = document.createElement('h2') //intégration du prix au bouton panier
    priceNounours.innerText = nounours.price /100 +" "+ "€"
    priceNounours.setAttribute("id", "prix")
    cartButton.appendChild(priceNounours)

    //PANIER
    // recupérer l'option choisie par le client et envoi du panier

    //sélection id du menu déroulant
    const idFormulaire = document.querySelector('#menuDeroulant');
    //console.log(idFormulaire);

    //sélection du bouton du panier
    const envoyerAuPanier = document.querySelector('#cartButton');
    //console.log(envoyerAuPanier)

    //écoute du bouton panier et envoi au panier
    envoyerAuPanier.addEventListener('click', (event)=>{
        

        let probableContenuPanier = []
        event.preventDefault(); //permet de ne pas réactualiser la page lors de l'ajout au panier
        isInTheCart()
        console.log(`${product} vient d'être commandé 1 fois en ${idFormulaire.value}`);
        //permet d'afficher la sélection du client
        let addLocalStorage = { color : idFormulaire.value, quantity : 1}
        console.log(Object.keys(addLocalStorage));
        probableContenuPanier.push(addLocalStorage)
        localStorage.setItem(product, JSON.stringify(probableContenuPanier)) //stringify = convertir un objet qui n'est pas une string en string

        const optionProduit = {
            "5be9c8541c9d440000665243": [
                {
                    color: 'Tan',
                    quantity: 4
                },
                {
                    color: 'Chocolate',
                    quantity: 2
                },
                {
                    color: 'Black',
                    quantity: 5
                },
                {
                    color: 'White',
                    quantity: 3
                }
            ],
            "5beaa8bf1c9d440000a57d94": [
                {
                    color: 'Pale brown',
                    quantity: 2
                },
                {
                    color: 'Dark brown',
                    quantity: 1
                },
                {
                    color: 'White',
                    quantity: 4
                }
            ],
            "5beaaa8f1c9d440000a57d95": [
                {
                    color: 'Brown',
                    quantity: 4
                }
            ],
            "5beaabe91c9d440000a57d96": [
                {
                    color: 'Brown',
                    quantity: 3
                },
                {
                    color: 'Blue',
                    quantity: 5
                },
                {
                    color: 'Pink',
                    quantity: 1
                }
            ],
            "5beaacd41c9d440000a57d97": [
                {
                    color: 'Beige',
                    quantity: 5
                },
                {
                    color: 'Tan',
                    quantity: 3
                },
                {
                    color: 'Chocolate',
                    quantity: 1
                }
            ]
        }
        //console.log(optionProduit);

    })
}

//permet d'attendre de récupérer les données de l'API avant d'exécuter la fonction qui affichera la page produit
    async function remplirPageNounours() {
        await fetch(`http://localhost:3000/api/teddies/${product}`) //permet de passer en argument l'URL de l'API afin de récupérer les données (ici, plus spécifiquement l'id du produit demandé) et de retourner une promesse au format brut
          .then((response) => response.json()) //la réponse au format brut est récupérée, aussi sous forme de promesse, mais retournée ici au format json
          .then((elem) => creationPageNounours(elem)) //retourne la réponse qui a été  reçue ci-dessus au format json puis permet l'affichage des données
      }
      
      remplirPageNounours() //exécute la fonction
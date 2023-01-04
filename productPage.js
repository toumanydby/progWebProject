class Product {
    constructor(idProduct, referenceP, nameP, quantityP, imageUrl) {
        this.idProduct = idProduct;
        this.referenceP = referenceP;
        this.nameP = nameP;
        this.quantityP = quantityP;
        this.imageUrl = imageUrl;
    }


    get productName() {
        return this.nameP;
    }

    get productReference() {
        return this.referenceP;
    }

    get productId() {
        return this.idProduct;
    }

    get productQuantity() {
        return this.quantityP;
    }

    get productImageUrl() {
        return this.imageUrl;
    }
}

var productsList = JSON.parse(window.localStorage.getItem("productsList")); // Retrieving
var ourListV2 = productsList;

function saveProductsList() {
    window.localStorage.setItem("productsList", JSON.stringify(productsList));
}

function deleteAllProducts() {
    productsList = [];
}

function createNewProduct() {
    let idProduct = productsList.length;

    // ON DOIT AVOIR UNE REFERENCE PAR PRODUIT. CORRIGE MOI CA BIEN TD
/*     let productAlreadyExist = productsList.find(({ referenceP }) => referenceP === document.querySelector('#referenceP').value);
    if (productAlreadyExist) {
        let productExist = "Il existe un produit ayant la meme reference que celui que vous essayer de creer !! vueiller utiliser une autre reference pour creer un nouveau produit. <br> Vous trouverez les informations du produit en question ci dessous. <br><br>"
            .concat("Nom du produit: ").concat(productAlreadyExist.nameP)
            .concat("\nQuantité en stock: ").concat(productAlreadyExist.quantityP)
            .concat("\nReference: ".concat(productAlreadyExist.referenceP));
        let varTextCreation = document.createElement('p');
        varTextCreation.textContent = productExist;

        document.getElementById("modalBody").appendChild(varTextCreation);
        $('#myProductCreationModal').modal('show');
        return
    };
 */
    let product = new Product(
        idProduct,
        document.querySelector('#referenceP').value,
        document.querySelector('#nameP').value,
        document.querySelector('#quantityP').value,
        document.querySelector('#imageUrl').value,
    );

    let text = "Votre produit ayant la référence "
        .concat(document.querySelector('#referenceP').value)
        .concat(" a bien été crée avec le nom : ")
        .concat(document.querySelector('#nameP').value);

    let varTextCreation = document.createElement('p');
    varTextCreation.textContent = text;

    document.getElementById("modalBody").appendChild(varTextCreation);
    productsList.push(product);
    clearCreateNewProductForm();
    saveProductsList();
    console.log(productsList);
    $('#myProductCreationModal').modal('show');
}

function clearCreateNewProductForm() {
    document.querySelector('#referenceP').value = '';
    document.querySelector('#nameP').value = '';
    document.querySelector('#quantityP').value = '';
    document.querySelector('#imageUrl').value = '';
}

/**
 * 
 * @param {} inStock 
 * inStock = 0 false
 * inStock = 1 true
 */
function renderProductsList(inStock) {
    var productsDiv = deleteMainProductListDiv();

    let ourList = [];

    if (inStock === 0) {
        ourList = productsList.slice();
    } else {
        let compteurI = 0;
        let arrayLength = productsList.length;
        while (compteurI < arrayLength) {
            console.log(productsList[compteurI].quantityP)
            if (productsList[compteurI].quantityP < 1) {
                ourList[ourList.length] = array[compteurI];
            }
            compteurI++;
        }

        if (ourList.length === 0) {
            let infoElt = document.createElement('p');
            infoElt.setAttribute("class", 'noEltClass');
            infoElt.textContent = "Il n'existe pas d'articles n'ayant pas de stock ! Tous les acticles peuvent etre vendus. :)"
            productsDiv.appendChild(infoElt);
        }
    }

    ourListV2 = ourList;
    console.log(productsList);
    console.log(ourList);

    //// For the render of all the product, we have to delete the create product form
    //var createFormSection = document.querySelector("#createProductForm");
    //createFormSection.parentNode.removeChild(createFormSection);

    // NOW WE CAN BUILD OUR PRODUCTS DIV SECTION

    // A LOOP ON ALL THE PRODUCTS, TO CREATE THE DIV SECTION OF EACH PRODUCT 
    ourList.forEach((_produit, index) => {
        createProductDivInfos(_produit, productsDiv);
    });
}

function createProductDivInfos(_produit, productsDiv) {
    let productDivId = "product_".concat(_produit.idProduct).concat("_div");
    let nameP = _produit.nameP;
    let quantityP = _produit.quantityP;
    let imageUrl = _produit.imageUrl;
    let referenceP = _produit.referenceP;

    let divElement = document.createElement('div');
    divElement.setAttribute('id', productDivId); // and make sure myclass has some styles in css

    let refElement = document.createElement('p');
    refElement.setAttribute("class", "productReferenceClass");
    refElement.textContent = referenceP;

    let nameElement = document.createElement('p');
    nameElement.setAttribute("class", "productNameClass");
    nameElement.textContent = nameP;

    let quantityElement = document.createElement('p');
    quantityElement.setAttribute("class", "productQuantityClass");
    quantityElement.textContent = quantityP;


    let btnEdit = document.createElement('button');
    // btnEdit.setAttribute('id', 'btnForSelectActionElt'.concat(_produit.idProduct));
    btnEdit.setAttribute('class', 'btnEdit');
    btnEdit.setAttribute('id', 'btnEdit'.concat(_produit.idProduct));
    btnEdit.setAttribute('idproductedit', _produit.idProduct);

    btnEdit.textContent = "Edit";

    let btnDelete = document.createElement('button');
    btnDelete.setAttribute('idproductdelete', _produit.idProduct);
    btnDelete.setAttribute('class', 'btnDelete');
    btnDelete.setAttribute('id', 'btnDelete'.concat(_produit.idProduct));

    btnDelete.textContent = "Delete";


    let imageElement = document.createElement('img');
    imageElement.setAttribute("src", imageUrl);
    imageElement.setAttribute("class", "productImageClass");

    divElement.appendChild(refElement);
    divElement.appendChild(nameElement);
    divElement.appendChild(quantityElement);
    divElement.appendChild(btnEdit);
    divElement.appendChild(btnDelete);

    divElement.appendChild(imageElement);
    productsDiv.appendChild(divElement);

}
function deleteProduct(idProd) {
    let divSection = document.getElementById("product_".concat(idProd).concat("_div"));
    divSection.parentNode.removeChild(divSection);

    idToRemove = idProd;

    index = productsList.map(function (item) {
        return item.idProduct
    }).indexOf(idToRemove);

    productsList.splice(index, 1);
    saveProductsList();
    console.log(productsList);
}

function editProduct(idProduct) {
    // SOMETHING TO DO 
}


/* function doSomethingFunc(idProduct) {
    if (document.getElementById("actionPanelSelect".concat(idProduct))) {
        if (document.getElementById("actionPanelSelect".concat(idProduct)).value === "delete") {
            deleteProduct(idProduct);
        } else if (document.getElementById("actionPanelSelect".concat(idProduct)).value === "edit")
            editProduct(idProduct);
    }
} */

function searchProduct() {
    let refProductToFind = document.querySelector('#productToFindRef').value;
    let product = productsList.find(({ referenceP }) => referenceP === refProductToFind);
    let productsDiv = deleteMainProductListDiv();
    
    if(product){
        createProductDivInfos(product, productsDiv);
    } else{
        pElt = document.createElement('p');
        pElt.setAttribute('class','productNotFoundClass');
        pElt.textContent = "Aucun produit n'a la reference suivante: ".concat(refProductToFind);

        productsDiv.appendChild(pElt);
    }
}

function deleteMainProductListDiv() {
    let ourMainProductDiv = document.getElementById("productsDiv");
    if (ourMainProductDiv) {
        ourMainProductDiv.parentNode.removeChild(ourMainProductDiv);
    }

    var productsDiv = document.createElement('div');
    productsDiv.setAttribute('id', 'productsDiv');
    document.body.appendChild(productsDiv);

    return productsDiv;
}

// EVENT LISTENER POUR LES DIFFERENTS BOUTONS DES PAGES 
document.addEventListener('click', function (event) {
    // button delete un produit
    if (event.target.classList[0] == 'btnDelete') {
        deleteProduct(event.target.getAttribute("idproductdelete"));
    };

    // button edit un produit
    if (event.target.classList[0] == 'btnEdit') {
        editProduct(event.target.getAttribute("idproductedit"));
    }
});

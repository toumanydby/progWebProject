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

var productsList;
window.onload = function () {
    let p1 = new Product(0, "459340", "Nike Air Force 1 '07", 5, "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/b7d9211c-26e7-431a-ac24-b0540fb3c00f/chaussure-air-force-1-07-pour-GjGXSP.png");
    let p2 = new Product(1, "793273", "Nike Air Max Plus 3 Leather", 7, "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/d353fda3-e930-45fe-8a5a-4c865e8ebe89/chaussure-air-max-plus-3-leather-pour-m0Vpt4.png");
    let p3 = new Product(2, "013792", "Nike Vaporfly NEXT% 2", 2, "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/d887ad59-dd77-425a-afa0-00666e311710/chaussure-de-course-sur-route-vaporfly-next-2-pour-821S4F.png");

    productsList = [p1, p2, p3];
    if (window.localStorage.getItem("productsList")) {
        productsList = JSON.parse(window.localStorage.getItem("productsList")); // Retrieving
    }
    //console.log(productsList);
};

function saveProductsList() {
    window.localStorage.setItem("productsList", JSON.stringify(productsList));
}

function createNewProduct() {
    let idProduct = productsList.length;

    // ON DOIT AVOIR UNE REFERENCE PAR PRODUIT. CORRIGE MOI CA BIEN TD
    let productAlreadyExist = productsList.find(({ referenceP }) => referenceP === document.querySelector('#referenceP').value);
    if (productAlreadyExist) {
        let productExist = "Il existe un produit ayant la meme reference que celui que vous essayer de creer !! veuiller utiliser une autre reference pour creer un nouveau produit."
            .concat("Nom du produit: ").concat(productAlreadyExist.nameP)
            .concat("\nQuantité en stock: ").concat(productAlreadyExist.quantityP)
            .concat("\nReference: ".concat(productAlreadyExist.referenceP));
        let varTextCreation = document.createElement('p');
        varTextCreation.textContent = productExist;

        document.getElementById("modalBody").innerHTML = '';
        document.getElementById("modalBody").appendChild(varTextCreation);
        $('#myProductCreationModal').modal('show');
        return;
    }

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
    //clearCreateNewProductForm();
    saveProductsList();
    //console.log(productsList);
    $('#myProductCreationModal').modal({ backdrop: 'static', keyboard: false });
    $('#myProductCreationModal').modal('show');
}

/**
 * 
 * @param {} inStock 
 * inStock = 0 false
 * inStock = 1 true
 */
function renderProductsList(inStock,role) {
    var productsDiv = deleteMainProductListDiv(role);

    if( document.getElementById('noEltHere')){
        document.body.removeChild(document.getElementById("noEltHere"));
    }

    let ourList = [];

    if (inStock === 0) {
        ourList = productsList.slice();
        if (ourList.length === 0) {
            let infoElt = document.createElement('p');
            infoElt.setAttribute("id", 'noEltHere');
            infoElt.textContent = "Il n'existe aucun article dans votre base de donnees. Vueillez en creer quelques uns";
            document.body.removeChild(document.getElementById("ourProductsTable"));
            document.body.appendChild(infoElt);
        }
    } else {
        let compteurI = 0;
        let arrayLength = productsList.length;
        while (compteurI < arrayLength) {
            //console.log(productsList[compteurI].quantityP);
            if (productsList[compteurI].quantityP < 1) {
                ourList[ourList.length] = productsList[compteurI];
            }
            compteurI++;
        }

        if (ourList.length === 0) {
            let infoElt = document.createElement('p');
            infoElt.setAttribute("id", 'noEltHere');
            infoElt.textContent = "Il n'existe pas d'articles n'ayant pas de stock ! Tous les acticles peuvent etre vendus. :)";
            document.body.removeChild(document.getElementById("ourProductsTable"));
            document.body.appendChild(infoElt);
        }
    }

    // A LOOP ON ALL THE PRODUCTS, TO CREATE THE DIV SECTION OF EACH PRODUCT 
    ourList.forEach((_produit, index) => {
        createProductDivInfos(_produit, productsDiv,role);
    });
    console.log(productsList);

}



function createProductDivInfos(_produit, tableP,role) {
    let productDivId = "product_".concat(_produit.idProduct).concat("_div");
    let nameP = _produit.nameP;
    let quantityP = _produit.quantityP;
    let imageUrl = _produit.imageUrl;
    let referenceP = _produit.referenceP;

    let divElement = document.createElement('tr');
    divElement.setAttribute('id', productDivId); // and make sure myclass has some styles in css

    let refElement = document.createElement('td');
    refElement.setAttribute("class", "productReferenceClass");
    refElement.setAttribute('id', "productReferenceID_".concat(_produit.idProduct));
    refElement.setAttribute('contenteditable', false);
    
    refElement.textContent = referenceP;

    let nameElement = document.createElement('td');
    nameElement.setAttribute("class", "productNameClass");
    nameElement.setAttribute('id', "productNameID_".concat(_produit.idProduct));
    nameElement.textContent = nameP;
    nameElement.setAttribute('contenteditable', false);

    let quantityElement = document.createElement('td');
    quantityElement.setAttribute("class", "productQuantityClass");
    quantityElement.setAttribute('id', "productQuantityID_".concat(_produit.idProduct));
    quantityElement.textContent = quantityP;
    quantityElement.setAttribute('contenteditable', false);

    let imageTd = document.createElement("td");
    let imageElement = document.createElement('img');
    imageElement.setAttribute("src", imageUrl);
    imageElement.setAttribute("class", "productImageClass");
    imageElement.setAttribute('id', "productImageID_".concat(_produit.idProduct));
    imageElement.setAttribute("width", "200px");
    imageElement.setAttribute("height", "200px");
    imageTd.appendChild(imageElement);
    imageElement.setAttribute('contenteditable', false);

    divElement.appendChild(refElement);
    divElement.appendChild(nameElement);
    divElement.appendChild(quantityElement);
    divElement.appendChild(imageTd);

    //only for admins

    if(role===0){
    let butETd = document.createElement("td");
    let btnEdit = document.createElement('button');
    btnEdit.setAttribute('class', 'btnEdit');
    btnEdit.setAttribute('id', 'btnEdit'.concat(_produit.idProduct));
    btnEdit.setAttribute('idproductedit', _produit.idProduct);
    btnEdit.textContent = "Edit";
    butETd.appendChild(btnEdit);

    let butDTd = document.createElement("td");
    let btnDelete = document.createElement('button');
    btnDelete.setAttribute('idproductdelete', _produit.idProduct);
    btnDelete.setAttribute('class', 'btnDelete');
    btnDelete.setAttribute('id', 'btnDelete'.concat(_produit.idProduct));
    btnDelete.textContent = "Delete";
    butDTd.appendChild(btnDelete);
    divElement.appendChild(butETd);
    divElement.appendChild(butDTd);
}

    tableP.appendChild(divElement);
}

function deleteProduct(idProd) {
    let divSection = document.getElementById("product_".concat(idProd).concat("_div"));
    divSection.parentNode.removeChild(divSection);
    idToRemove = idProd;
    index = productsList.map(function (item) {
        return item.idProduct;
    }).indexOf(idToRemove);

    productsList.splice(index, 1);
    saveProductsList();
    //console.log(productsList);
}

function editProduct(idProduct){
    newlist=[];
    var elements  = document.getElementById("product_".concat(idProduct).concat("_div")).getElementsByTagName("td");
    let element=elements[2];
    var oldhtml = element.innerHTML;
    if (oldhtml == null || oldhtml.length == 0) {
        return alert("Vide!");
    }

    var newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.value = oldhtml;
    newInput.onblur = function() {
      element.innerHTML = this.value == oldhtml ? oldhtml : this.value;
    }

    element.innerHTML = '';
    element.appendChild(newInput);
    newInput.setSelectionRange(0, oldhtml.length);
    newInput.focus();
  }

function searchProduct(role) {
    let refProductToFind = document.querySelector('#productToFindRef').value.trim();
    let product = productsList.find(({ referenceP }) => referenceP === refProductToFind);
    let productsDiv = deleteMainProductListDiv(role);

    if (product) {
        createProductDivInfos(product, productsDiv,role);
    } else {
        pElt = document.createElement('p');
        pElt.setAttribute('class', 'productNotFoundClass');
        pElt.textContent = "Aucun produit n'a la reference suivante: ".concat(refProductToFind);

        productsDiv.appendChild(pElt);
    }
}

function deleteMainProductListDiv(role) {

    let ourMainProductDiv = document.getElementById("ourProductsTable");
    console.log("delete");
          console.log(role===0);

    if (ourMainProductDiv) {
        document.body.removeChild(ourMainProductDiv);
    }

    const tbl = document.createElement("table");
    tbl.setAttribute('id','ourProductsTable');
    document.body.appendChild(tbl);
    const tblHead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const row = document.createElement("tr");
    const cellR = document.createElement("th");
    const cellTextR = document.createTextNode("Reference");
    const cellN = document.createElement("th");
    const cellTextN = document.createTextNode("Name");
    const cellQ = document.createElement("th");
    const cellTextQ = document.createTextNode("Quantity");
    const cellI = document.createElement("th");
    const cellButtonImage = document.createTextNode("Image");

    cellR.appendChild(cellTextR);
    cellN.appendChild(cellTextN);
    cellQ.appendChild(cellTextQ);
    cellI.appendChild(cellButtonImage);

    row.appendChild(cellR);
    row.appendChild(cellN);
    row.appendChild(cellQ);
    row.appendChild(cellI);


    if(role===0){
    const cellbtE = document.createElement("th");
    const cellButtonE = document.createTextNode("Button Edit");
    const cellbtD = document.createElement("th");
    const cellButtonD = document.createTextNode("Button Delete");
    cellbtE.appendChild(cellButtonE);
    cellbtD.appendChild(cellButtonD);
    row.appendChild(cellbtE);
    row.appendChild(cellbtD);
}


    tblHead.appendChild(row);
    tbl.appendChild(tblHead);
    tbl.appendChild(tbody);

    return tbody;
}



// EVENT LISTENER POUR LES DIFFERENTS BOUTONS DES PAGES 
document.addEventListener('click', function (event) {
    // button delete un produit
    if (event.target.classList[0] == 'btnDelete') {
        deleteProduct(event.target.getAttribute("idproductdelete"));
    };

    if (event.target.classList[0] == 'btnEdit') {
        editProduct5(event.target.getAttribute("idproductedit"));
    };
});



function editProduct5(idProduct){
    var currentTR = document.getElementById("product_".concat(idProduct).concat("_div"));
    var tdElements = currentTR.getElementsByTagName('td');
    //console.log(tdElements);
    var btnEditClicked = document.getElementById("btnEdit".concat(idProduct));
    if(btnEditClicked.textContent === 'Edit'){
        for (let index = 0; index < 3; index++) {
            let element = tdElements[index];
            element.setAttribute("contenteditable", true);
        }
    }
    else{
        for (let index = 0; index < 3; index++) {
            let element = tdElements[index];
            element.setAttribute("contenteditable", false);
        }
    }

    if(btnEditClicked.textContent === "Edit"){
        btnEditClicked.textContent = "Save";
    } else{
        btnEditClicked.textContent = "Edit";
    }

    let newReference = document.getElementById("productReferenceID_".concat(idProduct)).textContent;
    let newName = document.getElementById("productNameID_".concat(idProduct)).textContent;
    let newQuantity = document.getElementById("productQuantityID_".concat(idProduct)).textContent;
    let newUrlImg = document.getElementById("productImageID_".concat(idProduct)).getAttribute("src");

    idToRemove = parseInt(idProduct);
    index = productsList.map(function (item) {
        return item.idProduct;
    }).indexOf(idToRemove);

    productsList.splice(index, 1);
    
    let newProduct = new Product(
        parseInt(idProduct),
        newReference,
        newName,
        newQuantity,
        newUrlImg
    );
    productsList.push(newProduct);
    console.log(productsList);
    saveProductsList();
}
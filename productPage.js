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
window.onload = function() {
    productsList = [];
    if(window.localStorage.getItem("productsList")){
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
    $('#myProductCreationModal').modal({backdrop: 'static', keyboard: false});  
    $('#myProductCreationModal').modal('show');
}

/* function clearCreateNewProductForm() {
    document.querySelector('#referenceP').value = '';
    document.querySelector('#nameP').value = '';
    document.querySelector('#quantityP').value = '';
    document.querySelector('#imageUrl').value = '';
}
 */

/**
 * 
 * @param {} inStock 
 * inStock = 0 false
 * inStock = 1 true
 */
function renderProductsList(inStock) {
    var productsDiv = deleteMainProductListDiv();
    var tableP=productsDiv.firstChild;

    let ourList = [];

    if (inStock === 0) {
        ourList = productsList.slice();
        if (ourList.length === 0) {
            let infoElt = document.createElement('p');
            infoElt.setAttribute("class", 'noEltClass');
            infoElt.textContent = "Il n'existe aucun article dans votre base de donnees. Vueillez en creer quelques uns";
            productsDiv.appendChild(infoElt);
        }
    } else {
        let compteurI = 0;
        let arrayLength = productsList.length;
        while (compteurI < arrayLength) {
            //console.log(productsList[compteurI].quantityP);
            if (productsList[compteurI].quantityP < 1) {
                ourList[ourList.length] = array[compteurI];
            }
            compteurI++;
        }

        if (ourList.length === 0) {
            let infoElt = document.createElement('p');
            infoElt.setAttribute("class", 'noEltClass');
            infoElt.textContent = "Il n'existe pas d'articles n'ayant pas de stock ! Tous les acticles peuvent etre vendus. :)";
            productsDiv.appendChild(infoElt);
        }
    }

    //console.log(productsList);
    //console.log(ourList);

    // A LOOP ON ALL THE PRODUCTS, TO CREATE THE DIV SECTION OF EACH PRODUCT 
    ourList.forEach((_produit, index) => {
        createProductDivInfos(_produit, tableP);
    });
}

function createProductDivInfos(_produit, tableP) {
    let productDivId = "product_".concat(_produit.idProduct).concat("_div");
    let nameP = _produit.nameP;
    let quantityP = _produit.quantityP;
    let imageUrl = _produit.imageUrl;
    let referenceP = _produit.referenceP;

   const tblBody = document.createElement("tbody");


    let divElement = document.createElement('tr');
    divElement.setAttribute('id', productDivId); // and make sure myclass has some styles in css

    let refElement = document.createElement('td');
    refElement.setAttribute("class", "productReferenceClass");
    refElement.setAttribute('id', "productReferenceID_".concat(_produit.idProduct));
    refElement.textContent = referenceP;

    let nameElement = document.createElement('td');
    nameElement.setAttribute("class", "productNameClass");
    nameElement.setAttribute('id', "productNameID_".concat(_produit.idProduct));
    nameElement.textContent = nameP;

    let quantityElement = document.createElement('td');
    quantityElement.setAttribute("class", "productQuantityClass");
    quantityElement.setAttribute('id', "productQuantityID_".concat(_produit.idProduct));
    quantityElement.textContent = quantityP;

    let butETd=document.createElement("td");
    let btnEdit = document.createElement('button');
    // btnEdit.setAttribute('id', 'btnForSelectActionElt'.concat(_produit.idProduct));
    btnEdit.setAttribute('class', 'btnEdit');
    btnEdit.setAttribute('id', 'btnEdit'.concat(_produit.idProduct));
    btnEdit.setAttribute('idproductedit', _produit.idProduct);
    btnEdit.addEventListener("click", editProduct(_produit.idProduct));
    btnEdit.textContent = "Edit";
    butETd.appendChild(btnEdit);

    let butDTd=document.createElement("td");
    let btnDelete = document.createElement('button');
    btnDelete.setAttribute('idproductdelete', _produit.idProduct);
    btnDelete.setAttribute('class', 'btnDelete');
    btnDelete.setAttribute('id', 'btnDelete'.concat(_produit.idProduct));
    btnDelete.textContent = "Delete";
    butDTd.appendChild(btnDelete);

    let imageTd=document.createElement("td");
    let imageElement = document.createElement('img');
    imageElement.setAttribute("src", imageUrl);
    imageElement.setAttribute("class", "productImageClass");
    imageElement.setAttribute('id', "productImageID_".concat(_produit.idProduct));
    imageElement.setAttribute("width", "200px");
    imageElement.setAttribute("height", "200px");
    imageTd.appendChild(imageElement);


    divElement.appendChild(refElement);
    divElement.appendChild(nameElement);
    divElement.appendChild(quantityElement);
    divElement.appendChild(imageTd);
    divElement.appendChild(butETd);
    divElement.appendChild(butDTd);
    tblBody.appendChild(divElement);
    tableP.appendChild(tblBody);

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

function editProduct(idProduct) {
    $("tr>td:first-child").each(function(index,element){
        $(this).html(index+1)
    })
    
    ListElement=[];

     $(".btnEdit").click(function(){
    var $tds = $(this).parents("tr").children("td").filter(":lt(4)");
    var $content = $(this).html();
    if ($content=="Edit") {   
        $tds.each(function(){
            $(this).html("<input type='text' value='"+$(this).html()+"'>")
        });
        $(this).html("Save")
    }else{
        $tds.each(function(){
            var contentIn= $(this).children("input").val()
            $(this).html(contentIn);
            ListElement.push(contentIn);
        });
        $(this).html("Edit");     
    }
}

)
   



        

    saveProductsList();
}



function searchProduct() {
    let refProductToFind = document.querySelector('#productToFindRef').value.trim();
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

    var productsDiv = document.createElement('p');
    productsDiv.setAttribute('id', 'productsDiv');
    document.body.appendChild(productsDiv);

    const tbl = document.createElement("table");
    const tblHead = document.createElement("thead");
    const row = document.createElement("tr");
    const cellR = document.createElement("th");
    const cellTextR = document.createTextNode("Reference");
    const cellN = document.createElement("th");
    const cellTextN = document.createTextNode("Name");
    const cellQ = document.createElement("th");
    const cellTextQ = document.createTextNode("Quantity");
    const cellI = document.createElement("th");
    const cellButtonImage = document.createTextNode("Image");
    const cellbtE = document.createElement("th");
    const cellButtonE = document.createTextNode("Button Edit");
    const cellbtD = document.createElement("th");
    const cellButtonD = document.createTextNode("Button Delete");

    cellR.appendChild(cellTextR);
    cellN.appendChild(cellTextN);
    cellQ.appendChild(cellTextQ);
    cellI.appendChild(cellButtonImage);
    cellbtE.appendChild(cellButtonE);
    cellbtD.appendChild(cellButtonD);

    row.appendChild(cellR);
    row.appendChild(cellN);
    row.appendChild(cellQ);
    row.appendChild(cellI);
    row.appendChild(cellbtE);
    row.appendChild(cellbtD);

    tblHead.appendChild(row);
    tbl.appendChild(tblHead);
    
    productsDiv.appendChild(tbl);


    return productsDiv;
}

// EVENT LISTENER POUR LES DIFFERENTS BOUTONS DES PAGES 
document.addEventListener('click', function (event) {
    // button delete un produit
    if (event.target.classList[0] == 'btnDelete') {
        deleteProduct(event.target.getAttribute("idproductdelete"));
    };
});
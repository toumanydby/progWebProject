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

function saveProductsList() {
    window.localStorage.setItem("productsList",JSON.stringify(productsList));
}

function deleteAllProducts(){
    productsList = [];
}

function createNewProduct() {
    let idProduct = productsList.length;

    let product = new Product(
        idProduct,
        document.querySelector('#referenceP').value,
        document.querySelector('#nameP').value,
        document.querySelector('#quantityP').value,
        document.querySelector('#imageUrl').value,
    );

    productsList.push(product);
    clearCreateNewProductForm();
    saveProductsList();
    console.log(productsList);
    renderProductsList();
}

function clearCreateNewProductForm() {
    document.querySelector('#referenceP').value = '';
    document.querySelector('#nameP').value = '';
    document.querySelector('#quantityP').value = '';
    document.querySelector('#imageUrl').value = '';
}

function renderProductsList(){

    // For the render of all the product, we have to delete the create product form
    var createFormSection = document.querySelector("#createProductForm");
    createFormSection.parentNode.removeChild(createFormSection);

    // NOW WE CAN BUILD OUR PRODUCTS DIV SECTION
    var productsDiv = document.createElement('div');
    productsDiv.setAttribute('id','productsDiv');
    document.body.appendChild(productsDiv);

    // A LOOP ON ALL THE PRODUCTS, TO CREATE THE DIV SECTION OF EACH PRODUCT 
    productsList.forEach((_produit, index) => {
        let productDivId = "product_".concat(_produit.productId).concat("_div");
        let nameP = _produit.productName;
        let quantityP = _produit.productQuantity;
        let imageUrl = _produit.productImageUrl;
        let referenceP = _produit.productReference;

        let divElement = document.createElement('div');
        divElement.setAttribute('id', productDivId); // and make sure myclass has some styles in css
        divElement.setAttribute("class","eachProductDivClass");

        let refElement = document.createElement('p');
        refElement.setAttribute("class","productReferenceClass");
        refElement.textContent = referenceP;

        let nameElement = document.createElement('p');
        nameElement.setAttribute("class","productNameClass");
        nameElement.textContent = nameP;

        let quantityElement = document.createElement('p');
        quantityElement.setAttribute("class","productQuantityClass");
        quantityElement.textContent = quantityP;

        let labelForSelectActionElt = document.createElement('label');
        labelForSelectActionElt.setAttribute('for','actionPanelSelect');
        labelForSelectActionElt.textContent = "Actions";

        let selectActionPanelElt = document.createElement('select');
        selectActionPanelElt.setAttribute("name","actionPanel");
        selectActionPanelElt.setAttribute("id","actionPanelSelect");
        
        let optNull = document.createElement('option');
        optNull.setAttribute('value','');
        optNull.textContent ="Please select an action";

        let optDelete = document.createElement('option');
        optDelete.setAttribute('value','delete');
        optDelete.textContent = "Delete";

        let optModify = document.createElement('option');
        optModify.setAttribute('value','Edit');
        optModify.textContent = "Edit";

        selectActionPanelElt.appendChild(optNull);
        selectActionPanelElt.appendChild(optDelete);
        selectActionPanelElt.appendChild(optModify);

        let imageElement = document.createElement('img');
        imageElement.setAttribute("src", imageUrl);
        imageElement.setAttribute("class", "productImageClass");

        divElement.appendChild(refElement);
        divElement.appendChild(nameElement);
        divElement.appendChild(quantityElement);
        divElement.appendChild(labelForSelectActionElt);
        divElement.appendChild(selectActionPanelElt);
        divElement.appendChild(imageElement);

        productsDiv.appendChild(divElement);
    });

}

/* window.onload = function() {
    var getInput = prompt("Hey type something here: ");
    localStorage.setItem("storageName",getInput);
}

window.onload = alert(localStorage.getItem("storageName"));
 */


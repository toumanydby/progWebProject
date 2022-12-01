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

var productsList = [];

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
        let imageElement = document.createElement('img');
        imageElement.setAttribute("src", imageUrl);
        imageElement.setAttribute("class", "productImageClass");

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


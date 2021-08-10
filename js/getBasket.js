// Init customer infos : if exist -> populate form, else create empty customer
(function initCustomerInfos(){
    const LS = localStorage.getItem("ORINOCO_CUSTOMER_INFOS");
    const customerInfos = {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        email: "",
    };
    if (LS) {
        populateFormFields();
    }
    else {
        localStorage.setItem("ORINOCO_CUSTOMER_INFOS",JSON.stringify(customerInfos));
    }
})();

// Populate field
function populateField(id, value) {
    document.querySelector(`#${id}`).value = value;
  }
  
// Populate customer infos form fields
function populateFormFields() {
    const obj = JSON.parse(localStorage.getItem("ORINOCO_CUSTOMER_INFOS"));
    populateField("firstName", obj.firstName);
    populateField("lastName", obj.lastName);
    populateField("address", obj.address);
    populateField("city", obj.city);
    populateField("email", obj.email);
}

// Validate & store customer infos
function storeCustomerInfos() {
    const obj = JSON.parse(localStorage.getItem("ORINOCO_CUSTOMER_INFOS"));
    const firstName = fieldValidation("firstName");
    const lastName = fieldValidation("lastName");
    const address = fieldValidation("address");
    const city = fieldValidation("city");
    const email = fieldValidation("email");

    if (firstName && lastName && address && city && email) {
        obj.firstName = firstName;
        obj.lastName = lastName;
        obj.address = address;
        obj.city = city;
        obj.email = email;

        localStorage.setItem("ORINOCO_CUSTOMER_INFOS", JSON.stringify(obj));
        console.log("Infos saved !");
        //alert("Données sauvegardées !");
    } else {
        console.log("Invalid infos !");
    }
}

// Check if field is not an empty string
function fieldValidation(id) {
    const field = document.querySelector(`#${id}`).value.trim();
    if (field !== "") {
        console.log(field);
        return field;
    } else {
        console.log(`Champs ${id} vide !`);
    }
}

document.querySelector("#submitCustomerInfos").addEventListener("click", storeCustomerInfos);

// POST request : order id
function order(){

    const customerInfos = JSON.parse(localStorage.getItem('ORINOCO_CUSTOMER_INFOS'));
    const orderProducts = JSON.parse(localStorage.getItem('ORINOCO_CUSTOMER_BASKET'));
    const obj = {
        contact: customerInfos,
        products: orderProducts
    }

    fetch('http://localhost:3000/api/teddies/order', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        /* body: JSON.stringify({"contact":{"firstName":"gilles","lastName":"albert","address":"mon adresse","city":"canejan","email":"moi@exemple.com"},"products":["5be9c8541c9d440000665243"]})
        }) */
        body: JSON.stringify(obj)
        })
        .then(res=>res.json())
        .then(data => {
            console.log(data.orderId);
            window.location.href = `confirmation-commande.html?orderId=${data.orderId}`;
        }
            
            
        );
}

document.querySelector("#orderBtn").addEventListener("click", order);

// Empty basket after order
function emptyBasket(){
    localStorage.setItem("ORINOCO_CUSTOMER_BASKET", '[]');
}

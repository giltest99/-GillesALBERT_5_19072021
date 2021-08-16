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
    console.log('Customer infos', customerInfos);
    console.log('order products', orderProducts);
    if(customerInfos && customerInfos.firstName !== '' &&  customerInfos.lastName !== '' && customerInfos.address !== '' && customerInfos.city !== '' && email !== '' && orderProducts && orderProducts.length >= 1){
        const obj = {
            contact: customerInfos,
            products: orderProducts
        }
        console.log('Objet full', obj);   
        const items = [];
        for(item of obj.products){
            items.push(item.id);
        }
        console.log('Items ids', items);
        const bastketReq = {};
        bastketReq.contact = customerInfos;
        bastketReq.products = items;
        console.log('str basket', bastketReq);   
        fetch('http://localhost:3000/api/teddies/order', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bastketReq)
            })
            .then(res=>res.json())
            .then(data => {
                console.log(data.orderId);
                console.log(data);
                window.location.href = `confirmation-commande.html?orderId=${data.orderId}`;
            }                      
        );
    } else {
        alert('Veuillez vérifier vos informations de contact ou le contenu de votre panier !')
    } 
}

document.querySelector("#orderBtn").addEventListener("click", order);

// Load basket & display content 
(function displayBasketContent(){
    const basketContent = JSON.parse(localStorage.getItem('ORINOCO_CUSTOMER_BASKET'));
    console.log('basket : ', basketContent);
    if(basketContent !== null && basketContent.length > 0){  
        document.querySelector('#default-basket').classList.add('basket-default-hide');
        const basketList = document.createElement('table');
        basketList.className = 'table table-light';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <th>Référence</th>
            <th>Couleur</th>
            <th>Prix</th>
            <th class="delete-icon">x</th>
        `;
        basketList.appendChild(tr);
        for(item of basketContent){
            let tr = document.createElement('tr');
            tr.id = item.uuid;
            tr.innerHTML = `          
            <td>${item.name}</td>
            <td>${item.color}</td>   
            <td>${(Number(item.price)/100).toFixed(2).replace('.',',')}€</td>
            <td class="delete-item"><i class="bi bi-trash" title="Supprimer" id="del-${item.uuid}" onclick="removeItem(${item.uuid})"></i></td>
            `;
            basketList.appendChild(tr);           
        }
        document.querySelector('#basket-container').appendChild(basketList);
        totalAmountBasket();
    }
    else {
        document.querySelector('#default-basket').classList.add('basket-default-show');
    }    
})();

// Remove basket item
function removeItem(id){
    const basketContent = JSON.parse(localStorage.getItem('ORINOCO_CUSTOMER_BASKET'));
    const newBasketContent = [];
    for(item of basketContent){
        if(item.uuid !== id){
            newBasketContent.push(item);
            console.log('Article uuid ', item.uuid, ' supprimé !');
        }
    }
    console.log(newBasketContent);
    localStorage.setItem('ORINOCO_CUSTOMER_BASKET', JSON.stringify(newBasketContent));
    location.reload();
    totalAmountBasket();
}

function totalItems(){
    const basketContent = JSON.parse(localStorage.getItem('ORINOCO_CUSTOMER_BASKET'));
    return basketContent.length;
}

// Calculate basket sum, format sum & display it
function totalAmountBasket(){
    const basketContent = JSON.parse(localStorage.getItem('ORINOCO_CUSTOMER_BASKET'));
    let sum = 0;
    for(item of basketContent){
        sum += Number(item.price);
    }
    if(sum > 0){
        sum = ((sum / 100).toFixed(2)).replace('.',',') + '€';
        console.log(sum);
        document.querySelector('#amount').innerHTML = sum;
        document.querySelector('#amount').classList.add('basket-amount-show');
    }
    else {
        console.log('panier vide !');
        document.querySelector('#amount').classList.add('basket-amount-hide');
    }  
}
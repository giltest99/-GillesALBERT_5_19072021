// Check & create ORINOCO_CUSTOMER_INFOS object in localStorage if not exist
(function initStorage(){
    const LS = localStorage.getItem('ORINOCO_CUSTOMER_INFOS');
    const customerInfos = {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        email: ''
    }
    if(LS){
        populateFormFields();
        console.log('Populated fields !');
    }
    else {
        localStorage.setItem('ORINOCO_CUSTOMER_INFOS', JSON.stringify(customerInfos));
    }
})();

// Validate & store customer infos 
function storeCustomerInfos(){
    const obj = JSON.parse(localStorage.getItem('ORINOCO_CUSTOMER_INFOS'));
    const firstName = fieldValidation('firstName');
    const lastName = fieldValidation('lastName');
    const address = fieldValidation('address');
    const city = fieldValidation('city');
    const email = fieldValidation('email');

    if(firstName && lastName && address && city && email){
        obj.firstName = firstName;
        obj.lastName = lastName;
        obj.address = address;
        obj.city = city;
        obj.email = email;

        localStorage.setItem('ORINOCO_CUSTOMER_INFOS', JSON.stringify(obj));
        console.log('Infos saved !');
    }
    else {
        console.log('Invalid infos !');
    }
}

// Check if field is not an empty string
function fieldValidation(id){
    const field = document.querySelector(`#${id}`).value.trim();
    if(field !== ''){
        console.log(field);
        return field;
    }
    else {
        console.log(`Champs ${id} vide !`);
    }   
}

// Populate field
function populateField(id,value){
    document.querySelector(`#${id}`).value = value;
}

// Populate customer infos form fields
function populateFormFields(){
    const obj = JSON.parse(localStorage.getItem('ORINOCO_CUSTOMER_INFOS'));
    populateField('firstName',obj.firstName);
    populateField('lastName',obj.lastName);
    populateField('address',obj.address);
    populateField('city',obj.city);
    populateField('email',obj.email);
}

document.querySelector('#submitCustomerInfos').addEventListener('click', storeCustomerInfos);


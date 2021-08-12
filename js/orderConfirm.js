// Order confirm, clear basket & return to index.html
(function orderConfirm(){
    const params = new URLSearchParams(document.location.search);
    const id = params.get("orderId");
    console.log('Confirm : ', id);
    document.querySelector('#orderId').innerHTML = id;
})();

// Empty basket after order
function emptyBasket(){
    localStorage.setItem("ORINOCO_CUSTOMER_BASKET", '[]');
}

document.querySelector('#orderConfirmBtn').addEventListener('click', () => {
    emptyBasket();
    location.assign('/');
})
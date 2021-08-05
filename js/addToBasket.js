// Add id to customer basket
function addToBasket() {
  const params = new URLSearchParams(document.location.search);
  let id = params.get("id");
  const basket = JSON.parse(localStorage.getItem("ORINOCO_CUSTOMER_BASKET"));
  basket.push(id);
  console.log(basket);
  localStorage.setItem("ORINOCO_CUSTOMER_BASKET", JSON.stringify(basket));
}

// Check or create existing customer basket
(function customerBasket() {
  const basket = localStorage.getItem("ORINOCO_CUSTOMER_BASKET");
  if (basket) {
    console.log(JSON.parse(basket));
  } else {
    localStorage.setItem("ORINOCO_CUSTOMER_BASKET", "[]");
  }
})();

// Auto-load display article
(function loadProduct() {
  const params = new URLSearchParams(document.location.search);
  const id = params.get("id");
  console.log(id);
  const url = `http://localhost:3000/api/teddies/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const app = document.querySelector("#app");
      const cardTemplate = document.querySelector("#card-template");
      const card = cardTemplate.content.cloneNode(true);
      app.appendChild(card);
      const colors = data.colors;
      //console.log(colors, colors.length);
      for (color of colors) {
        let opt = document.createElement("OPTION");
        opt.value = color;
        opt.innerHTML = color;
        document.querySelector("#app select").appendChild(opt);
      }
      document.querySelector("#image-pres").src = data.imageUrl;
      document.getElementById("add-to-basket-btn").addEventListener("click", () => {
          addToBasket(id);
      });
      populate("#image-pres", data.imageUrl);
      populate("#nom", data.name);
      populate("#description", data.description);
      populate("#prix",Number(data.price / 100).toFixed(2).replace(".", ",") + "€");
    })
    .catch((error) => {
      console.log('error', error);
      console.log('Article non trouvé');
      document.querySelector('#app').innerHTML = '<h3>Pas d\'article trouvé</h3>'
    });
})();

// Add id to customer basket
function addToBasket() {
  const params = new URLSearchParams(document.location.search);
  const id = params.get("id");
  const url = `http://localhost:3000/api/teddies/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const clr = getColor();
      //console.log(clr);
      const obj = {};
      obj.id = id;
      obj.name = data.name;
      obj.price = data.price;
      obj.color = clr;
      obj.uuid = Date.now();
      customerBasket();      
      const basket = JSON.parse(localStorage.getItem("ORINOCO_CUSTOMER_BASKET"));     
      basket.push(obj);
      console.log(basket);
      localStorage.setItem("ORINOCO_CUSTOMER_BASKET", JSON.stringify(basket));
      alert('L\'article a été ajouté au panier');
    })
    .catch((error) => {
      console.log('error', error);
    });
}

// Check & create existing customer basket : value = array
function customerBasket() {
  const basket = localStorage.getItem("ORINOCO_CUSTOMER_BASKET");
  if (basket) {
    console.log(JSON.parse(basket));
  } else {
    localStorage.setItem("ORINOCO_CUSTOMER_BASKET", "[]");
  }
}

// Add text content to an element
function populate(selector, data) {
  document.querySelector(selector).textContent = data;
}

// Return article selected color
function getColor() {
  var obj = document.getElementById("color-select");
  return obj.options[obj.selectedIndex].text;
}
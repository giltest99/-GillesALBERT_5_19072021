function loadProduct(){
    let params = new URLSearchParams(document.location.search.substring(1));
      let id = params.get("id");
      console.log(id)
  
      let url = `http://localhost:3000/api/teddies/${id}`;
      fetch(url)
      .then(res => res.json())
      .then(data => {
      console.log(data);
      let app = document.querySelector('#app');
      let cardTemplate = document.querySelector('#card-template');
      //let selectCard = document.querySelector('#card-select');
      //console.log(selectCard)
      let card = cardTemplate.content.cloneNode(true);
      app.appendChild(card)
      const colors = data.colors;
      console.log(colors , colors.length);
      for(color of colors){
        let opt = document.createElement('OPTION');
        opt.value = color;
        opt.innerHTML = color;
        document.querySelector('#app select').appendChild(opt);    
      }
      document.querySelector('#image-pres').src = data.imageUrl;
      //document.querySelector('#image-pres').style.height = '100%';
      document.querySelector('#image-pres').style.objectFit = 'cover';
      //document.querySelector('#nom').textContent = data.name;
      //document.querySelector('#description').textContent = data.description;
      //document.querySelector('#prix').textContent = Number(data.price / 100).toFixed(2).replace('.',',') + '€';
      
      populate('#image-pres', data.imageUrl);
      populate('#nom', data.name);
      populate('#description', data.description);
      populate('#prix', Number(data.price / 100).toFixed(2).replace('.',',') + '€');
    })  
    
  }
  
  loadProduct()
  
  function populate(selector,data){
    document.querySelector(selector).textContent = data;
  }
    
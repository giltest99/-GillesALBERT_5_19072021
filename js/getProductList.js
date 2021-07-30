function getProducts(){
    let url = 'http://localhost:3000/api/teddies';
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);

        for(product of data){

            let card = `
                <div class="col-12 col-sm-6 col-lg-4" id="${product._id}"> 
                    <a href="http://localhost:3000/api/teddies/${product._id}">               
                        <div class="card shadow-sm my-3 carte">
                            <img src="${product.imageUrl}" alt="Référence ${product.name}">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.description}</p>
                                <h5 class="card-title">${(product.price/100).toFixed(2).replace('.',',')}€</h5>                      
                            </div>
                        </div>
                    </a>
                </div>
            `;

            document.querySelector('#productsSection').innerHTML += card;
            
        }
    })
    
    
}
getProducts();

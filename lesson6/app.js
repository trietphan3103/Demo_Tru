let products = ''

fetch(`https://testapi.io/api/trietphan3103/store`)
.then(response => response.json())
.then((data) => {
    products = data
    for (let key in products.data) {
        let items = products.data[key]
        
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<div class="image-container">
        <a href="./${items.name}.html">
            <img src="${items.image}">
            </div>
            <div class="container">
            <h5 class="product-name">${items.name}</h5>
            <h6><b>Price:</b>${items.price}</h6>
            <button onclick="addToCart(${key})" class="cartbtn">Add to cart</button>
            </a>
            </div>`
        document.getElementById("products").appendChild(card);
    }

    for (let items of products.data){
        let product = localStorage.product
        if ( product ) {
            product = JSON.parse(product)
        } else {
            product = []
        }
        
        product.push({
            name: items.name,
            price: items.price , 
            images: items.image
        })
    
        localStorage.setItem("product", JSON.stringify(product))
    }
})


const addToCart = ( key ) => {
    // get item has key param
    let item = products.data[key];

    let cart = localStorage.getItem("cart")
    if ( cart ) {
        cart = JSON.parse(cart);
    }
    if  ( cart == null ) {
        cart = [
            {
                product: item,
                quantity: 1
            }
        ];
        localStorage.setItem("cart", JSON.stringify(cart))
    } else {
        for ( product_item of cart ) {
            if ( product_item.product.name == item.name ) {
                // Xử lý trùng item đã thêm vào giỏ hàng
                product_item.quantity += 1;
                localStorage.setItem("cart", JSON.stringify(cart))
                return;
            }
        }
        cart.push( {
            product: item,
            quantity: 1
        } );
        localStorage.setItem("cart", JSON.stringify(cart))
    }
}
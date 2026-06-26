let iconCart = document.querySelector(".iconcart");
let closeCart = document.querySelector(".close");
let listProductHtml = document.querySelector(".listProduct");
let listCarthtml = document.querySelector(".listcart");
let iconCartSpan = document.querySelector(".iconcart span");
let listProduct = []; // Sahi naam hai listProduct
let carts = [];
let body = document.querySelector("body");

iconCart.addEventListener("click", () => {
    body.classList.toggle("showcart");
});

closeCart.addEventListener("click", () => {
    body.classList.toggle("showcart");
});

const addDataToHTML = () => {
    listProductHtml.innerHTML = "";
    if (listProduct.length > 0) {
        listProduct.forEach(product => {
            let newProduct = document.createElement("div");
            newProduct.classList.add("item");
            newProduct.dataset.id = product.id;
            // 💡 TIP: Yahan bhi details dynamic kar sakte ho future me product.name aur product.price se
            newProduct.innerHTML = `
                <img src="${product.image}" alt="">
                <h2>"${product.name}"</h2>
                <div class="price">"${product.price}"</div>
                <button class="addcart">Add to cart</button>
            `;
            listProductHtml.appendChild(newProduct);
        });
    }  
};

listProductHtml.addEventListener("click", (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains("addcart")) {
        let productId = positionClick.parentElement.dataset.id;
        addToCart(productId); 
    }
});

const addToCart = (productId) => {
    // Cart me dhoondho ki kya yeh product pehle se hai?
    let positionThisProductInCart = carts.findIndex((value) => value.productId == productId);
    
    if (positionThisProductInCart < 0) {
        // Agar nahi hai (< 0), toh naya object push karo
        carts.push({
            productId: productId,
            quantity: 1
        });
    } else {
        // Agar pehle se hai, toh sirf quantity badhao
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    
    addToCartHTML();
};

const addToCartHTML = () => {
    listCarthtml.innerHTML = "";
    if (carts.length > 0) {
        carts.forEach(cart => {
            let newCart = document.createElement("div");
            newCart.classList.add("item");
            newCart.dataset.id = cart.productId;
            
            let positionProduct = listProduct.findIndex((value) => value.id == cart.productId);
            let info = listProduct[positionProduct];
            
            if (info) { // Taaki agar data dhoondhne me koi dikkat ho toh crash na ho
                newCart.innerHTML = `
                <div class="image">
                    <img src="${info.image}" alt="">
                </div>
                <div class="name">
                    ${info.name}
                </div>
                <div class="totalPrice">
                    ₹${info.price * cart.quantity}
                </div>
                <div class="quantity">
                    <span class="minus">&lt;</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">&gt;</span>
                </div>`;
                listCarthtml.appendChild(newCart);
            }
        });
        iconCartSpan.innerText = carts.length;
    }
};

//Cart ke andar Quntity Increase ya decrease karne ke liye 
listCarthtml.addEventListener("click", (event) => {
    let buttonClick = event.target; 
    
    // Plus button ka logic
    if (buttonClick.classList.contains("plus")) {
        let id = buttonClick.parentElement.parentElement.dataset.id;
        let index = carts.findIndex(item => item.productId == id);
        carts[index].quantity = carts[index].quantity + 1;
        addToCartHTML();
    }
    
    // Minus button ka logic
    if (buttonClick.classList.contains("minus")) {
        let id = buttonClick.parentElement.parentElement.dataset.id;
        let index = carts.findIndex(item => item.productId == id);
        
        if (carts[index].quantity > 1) {
            carts[index].quantity = carts[index].quantity - 1;
        } else {
            carts.splice(index, 1); // 1 se kam hote hi cart se gayab
        }
        addToCartHTML();
    }
});
const initApp = () => {
    fetch("addtocart.json")
    .then(response => response.json())
    .then(data => {
        listProduct = data;
        addDataToHTML();
    })
    .catch(error => console.error("JSON fetch karne me error:", error)); // Safe side ke liye error catch
};

initApp();
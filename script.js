const Products = [
    { id: 1, name: 'Product-1', price: 199},
    { id: 2, name: 'Product-2', price: 299 },
    { id: 3, name: 'Product-3', price: 499 },
];

const leftBox = document.getElementById('left-box');
const rightBox = document.getElementById('right-box');

function renderProducts() {
    leftBox.innerHTML = '';
    Products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <span>${product.name} - $${product.price}</span>
            <button onclick="addToCart(${product.id})">+</button>
            <span id="quantity-${product.id}">0</span>
            <button onclick="removeFromCart(${product.id})">-</button>
        `;
        leftBox.appendChild(productDiv);
    });
}

let cart = [];

function renderCart() {
    rightBox.innerHTML = '';
    if (cart.length === 0) {
        rightBox.innerHTML = '<div class="no-product">No Product added to the cart</div>';
    } else {
        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.textContent = `${item.name} - Quantity: ${item.quantity} - Price: $${item.price * item.quantity}`;
            rightBox.appendChild(cartItemDiv);
        });
        const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const totalDiv = document.createElement('div');
        totalDiv.textContent = `Total Price: $${totalPrice}`;
        rightBox.appendChild(totalDiv);
    }
}

function addToCart(productId) {
    const product = Products.find(p => p.id === productId);
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        cart[index].quantity++;
    } else {
        cart.push({ id: productId, name: product.name, price: product.price, quantity: 1 });
    }
    renderCart();
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        cart[index].quantity--;
        if (cart[index].quantity === 0) {
            cart.splice(index, 1);
        }
    }
    renderCart();
}

renderProducts();
renderCart();

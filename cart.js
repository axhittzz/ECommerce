window.onload = function() {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var cartContainer = document.getElementById('cart-container');
    var totalPrice = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty</p>';
        return;
    }

    cart.forEach(function(product, index) {
        var productDiv = document.createElement('div');
        productDiv.classList.add('cart-item');
        
        productDiv.innerHTML = `
            <div class="cart-item-content">
                <img src="${product.image}" alt="Product Image" class="cart-item-img-small">
                <div class="cart-item-details">
                    <p><strong>${product.name}</strong></p>
                    <p>Size: ${product.size}</p>
                    <p>Price: ${product.price}</p>
                    <p>Quantity: ${product.quantity}</p>
                </div>
            </div>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        
        cartContainer.appendChild(productDiv);

        totalPrice += parseFloat(product.price.replace('$', '')) * product.quantity;
    });

    document.getElementById('total-price').innerText = '$' + totalPrice.toFixed(2);

    var removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var index = this.getAttribute('data-index');
            cart.splice(index, 1); 
            localStorage.setItem('cart', JSON.stringify(cart)); 
            window.location.reload(); 
        });
    });
};

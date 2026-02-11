  let input = document.getElementById("searchInput");
   let products = document.querySelectorAll(".product");
   

function searchInputFunction (){
  let filter = input.value.toLowerCase();
  let found = false; 

     products.forEach(product => {
  product.style.backgroundColor = ""; // reset
});

  products.forEach(product => {
    let name = product.querySelector("h3").innerText.toLowerCase();
     let details = product.querySelector(".details").innerText.toLowerCase();

    if(name.includes(filter) || details.includes(filter)) {
     product.style.display = ""; // show
      product.style.backgroundColor = "yellow";
      found = true;
    } else {
      product.style.display = "none"; // hide
      product.style.backgroundColor = ""; // reset color
    }
   

  });
      if (found) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

};




document.querySelectorAll(".toggle-btn").forEach(button => {
  button.addEventListener("click", () => {
    const details = button.previousElementSibling; // <p class="details">
    details.classList.toggle("visible");

    // Change button text
    if (details.classList.contains("visible")) {
      button.textContent = "Hide Details";
    } else {
      button.textContent = "Show Details";
    }
  });
});


let cart = [];

/* ===============================
   ADD ADD-TO-CART BUTTONS AUTO
================================== */

document.addEventListener("DOMContentLoaded", function () {

  const products = document.querySelectorAll(".product");

  products.forEach(product => {

    const name = product.querySelector("h3").innerText;

    const priceElement = product.querySelector("p");
    const priceText = priceElement.innerText;

    // Extract price number from: "Price: €48.50 / 20kg"
    const priceMatch = priceText.match(/€([\d.]+)/);

    if (!priceMatch) return; // skip N/A products

    const price = parseFloat(priceMatch[1]);

    // Create Add To Cart button
    const button = document.createElement("button");
    button.innerText = "Add to Cart";
    button.classList.add("add-cart-btn");

    button.addEventListener("click", function () {
      addToCart(name, price);
    });

    product.appendChild(button);
  });

});


/* ===============================
   ADD TO CART
================================== */

function addToCart(name, price) {

  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  updateCart();
}


/* ===============================
   UPDATE CART
================================== */

function updateCart() {

  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotalSpan = document.getElementById("cart-total");

  cartItemsDiv.innerHTML = "";

  let total = 0;

  cart.forEach(item => {

    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const itemElement = document.createElement("p");
    itemElement.innerText =
      `${item.quantity} x ${item.name} - €${itemTotal.toFixed(2)}`;

    cartItemsDiv.appendChild(itemElement);
  });

  cartTotalSpan.innerText = total.toFixed(2);
  document.getElementById("cart-count").innerText = cart.length;

}


/* ===============================
   WHATSAPP ORDER
================================== */

document.getElementById("whatsapp-order-btn")
  .addEventListener("click", sendWhatsAppOrder);


function sendWhatsAppOrder() {

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const phone = "34744650288"; // ← Put your number here

  let message = "Namaste! This is my order list:%0A%0A";

  let total = 0;

  cart.forEach(item => {

    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    message += `${item.quantity} x ${item.name} - €${itemTotal.toFixed(2)}%0A`;
  });

  message += `%0ATotal: €${total.toFixed(2)}`;

  const url = `https://wa.me/${phone}?text=${message}`;

  window.open(url, "_blank");
}


document.addEventListener("DOMContentLoaded", function () {

  const cartBtn = document.getElementById("floating-cart-btn");
  const cartPanel = document.getElementById("floating-cart-panel");

  cartBtn.addEventListener("click", function () {

    if (cartPanel.style.display === "block") {
      cartPanel.style.display = "none";
    } else {
      cartPanel.style.display = "block";
    }

  });

});

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

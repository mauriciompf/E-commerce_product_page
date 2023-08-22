const cartBox = document.querySelector("[data-cart-box]");
const cartButton = document.querySelector("[data-cart-button]");

cartButton.addEventListener("click", () => {
  cartBox.classList.toggle("hidden");
});

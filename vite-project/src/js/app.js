const cartBox = document.querySelector("[data-cart-box]");
const cartButton = document.querySelector("[data-cart-button]");
const cartItemNumber = document.querySelector("[data-cart-item-number]");
const minusButton = document.querySelector("[data-minus-btn]");
const plusButton = document.querySelector("[data-plus-btn]");
const numberInput = document.querySelector("[data-number-input]");
const cartItemButton = document.querySelector("[data-cart-item-btn]");
const emptyContentCart = document.querySelector("[data-cart-empty]");
const ContentCart = document.querySelector("[data-cart-no-empty]");
const itemPrice = document.querySelector("[data-item-price]");
const itemTitle = document.querySelector("[data-item-title]");
const itemImage = document.querySelector("[data-item-image]");
const cartImage = document.querySelector("[data-cart-image]");
const cartTitle = document.querySelector("[data-cart-title]");
const cartPrice = document.querySelector("[data-cart-price]");
const cartQuantity = document.querySelector("[data-cart-quatity]");
const cartTotalPrice = document.querySelector("[data-cart-total-price]");

function removeItem() {
  if (!(numberInput.innerHTML <= 0)) {
    numberInput.innerHTML--;
  }

  if (numberInput.innerHTML == "0" || numberInput.innerHTML == 0) {
    cartItemNumber.innerHTML = "";
  }
}

function addItem() {
  numberInput.innerHTML++;
  ContentCart.classList.toggle("hidden");
  emptyContentCart.classList.add("hidden");

  cartImage.src = itemImage.src;
  cartTitle.textContent = itemTitle.textContent;
  cartPrice.textContent = itemPrice.textContent;
  cartQuantity.textContent = numberInput.textContent;
  cartTotalPrice.innerHTML = `\$${(
    parseInt(numberInput.textContent) *
    parseInt(itemPrice.textContent.replace("$", ""))
  ).toFixed(2)}`;
}

cartButton.addEventListener("click", () => {
  cartBox.classList.toggle("hidden");
});

minusButton.addEventListener("click", () => {
  removeItem();
});

plusButton.addEventListener("click", () => {
  addItem();
});

cartItemButton.addEventListener("click", () => {
  cartItemNumber.innerHTML = numberInput.innerHTML;
});

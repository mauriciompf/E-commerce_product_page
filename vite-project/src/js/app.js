const quantityNumber = getElementItem("input-number");
const cartBox = getElementCartItem("box");
const cartItemNumber = getElementCartItem("item-number");
const emptyContentCart = getElementCartItem("empty");
const contentCart = getElementCartItem("no-empty");
const buttons = document.querySelectorAll("button");

const elements = {
  itemImage: getElementItem("image"),
  cartItemImage: getElementCartItem("image"),
  itemTitle: getElementItem("title"),
  cartItemTitle: getElementCartItem("title"),
  itemPrice: parseFloat(getElementItem("price").textContent.replace("$", "")),
  cartItemPrice: getElementCartItem("price"),
  cartItemQuantity: getElementCartItem("quantity"),
  cartItemTotalPrice: getElementCartItem("total-price"),
};

function updateCartItemDisplay() {
  const inputNumber = parseInt(quantityNumber.textContent);

  if (inputNumber !== 0) {
    cartItemNumber.innerHTML = inputNumber;

    emptyContentCart.classList.add("hidden");
    contentCart.classList.remove("hidden");

    elements.cartItemImage.src = elements.itemImage.src;
    elements.cartItemTitle.textContent = elements.itemTitle.textContent;
    elements.cartItemPrice.textContent = `$${elements.itemPrice.toFixed(2)}`;
    elements.cartItemQuantity.textContent = inputNumber;

    const totalPrice = (inputNumber * elements.itemPrice).toFixed(2);
    elements.cartItemTotalPrice.textContent = `$${totalPrice}`;
  } else {
    emptyContentCart.classList.remove("hidden");
    contentCart.classList.add("hidden");
  }
}

function removeItem() {
  if (!(quantityNumber.innerHTML <= 0)) {
    quantityNumber.innerHTML--;
  }

  if (quantityNumber.innerHTML == "0" || quantityNumber.innerHTML == 0) {
    cartItemNumber.innerHTML = "";
  }
}

function addItem() {
  quantityNumber.innerHTML++;
}

function displayCardBox() {
  cartBox.classList.toggle("hidden");
}

function removeDisplayCardBox(e) {
  const currentClick = document.elementFromPoint(e.clientX, e.clientY);
  if (!cartBox.classList.contains("hidden")) {
    if (
      currentClick.parentElement !== cartBox &&
      currentClick.parentElement !== document.querySelector("#icon-cart-btn")
    ) {
      cartBox.classList.add("hidden");
      return;
    } else {
      cartBox.classList.remove("hidden");
    }
  }
}

window.addEventListener("click", removeDisplayCardBox);

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const currentButton = e.currentTarget;

    switch (currentButton.id) {
      case "icon-cart-btn":
        displayCardBox();
        break;
      case "plus-btn":
        addItem();
        break;
      case "minus-btn":
        removeItem();
        break;
      case "add-item-btn":
        updateCartItemDisplay();
        break;
      case "delete-item-btn":
        let cartItemQuantityInt = parseInt(
          elements.cartItemQuantity.textContent
        );

        if (cartItemQuantityInt - 1 == 0) {
          emptyContentCart.classList.remove("hidden");
          contentCart.classList.add("hidden");
        }

        elements.cartItemQuantity.textContent--;
        const totalPrice = (cartItemQuantityInt * elements.itemPrice).toFixed(
          2
        );
        elements.cartItemTotalPrice.textContent = `$${totalPrice}`;

        break;
    }
  });
});

function getElementItem(item) {
  return document.querySelector(`[data-item-${item}]`);
}

function getElementCartItem(cartItem) {
  return document.querySelector(`[data-cart-${cartItem}]`);
}

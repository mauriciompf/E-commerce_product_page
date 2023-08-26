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

  const isInsideCartArea = [
    contentCart,
    emptyContentCart,
    cartBox,
    document.querySelector("aside"),
    document.querySelector("#icon-cart-btn"),
  ].some((element) => element.contains(currentClick));

  if (!cartBox.classList.contains("hidden")) {
    cartBox.classList.toggle("hidden", !isInsideCartArea);
  }
}

function deleteCartItem() {
  let cartItemQuantityInt = parseInt(elements.cartItemQuantity.textContent);

  if (cartItemQuantityInt - 1 == 0) {
    emptyContentCart.classList.remove("hidden");
    contentCart.classList.add("hidden");
    cartItemNumber.textContent = "";
  }

  elements.cartItemQuantity.textContent--;
  const totalPrice = (cartItemQuantityInt * elements.itemPrice).toFixed(2);
  elements.cartItemTotalPrice.textContent = `$${totalPrice}`;
}

function prevImage() {
  const dataImages = [
    {
      id: 1,
      src: "../images/image-product-1.jpg",
    },
    {
      id: 2,
      src: "../images/image-product-2.jpg",
    },
    {
      id: 3,
      src: "../images/image-product-3.jpg",
    },
    {
      id: 4,
      src: "./src/images/image-product-4.jpg",
    },
  ];

  // const imagesButtons = document
  // .querySelector("[data-images]")
  // .querySelectorAll("button");

  getElementItem("image").src = dataImages[dataImages.length - 1].src;
}

function nextImage() {}

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
        deleteCartItem();
        break;
      case "prev-image":
        prevImage();
        break;
      case "next-image":
        nextImage();
        break;
    }
  });
});

window.addEventListener("click", removeDisplayCardBox);

function getElementItem(item) {
  return document.querySelector(`[data-item-${item}]`);
}

function getElementCartItem(cartItem) {
  return document.querySelector(`[data-cart-${cartItem}]`);
}

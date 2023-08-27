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

const dataImages = [
  "./src/images/image-product-1.jpg",
  "./src/images/image-product-2.jpg",
  "./src/images/image-product-3.jpg",
  "./src/images/image-product-4.jpg",
];

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
    document.querySelector("[data-cart-wrapper]"),
    document.querySelector("#icon-cart-btn"),
  ].some((element) => element.contains(currentClick));

  if (!cartBox.classList.contains("hidden")) {
    cartBox.classList.toggle("hidden", !isInsideCartArea);
  }
}

function deleteCartItem() {
  let cartItemQuantityInt = parseInt(elements.cartItemQuantity.textContent) - 1;

  if (cartItemQuantityInt == 0) {
    emptyContentCart.classList.remove("hidden");
    contentCart.classList.add("hidden");
    cartItemNumber.textContent = "";
  }

  elements.cartItemQuantity.textContent--;
  cartItemNumber.innerHTML--;

  if (cartItemNumber.innerHTML === "-1") {
    cartItemNumber.textContent = "";
  }
  const totalPrice = (cartItemQuantityInt * elements.itemPrice).toFixed(2);
  elements.cartItemTotalPrice.textContent = `$${totalPrice}`;
}

let imageIndex = 0;
function UpdateImage() {
  const imageElement = getElementItem("image");
  imageElement.src = dataImages[imageIndex];
}

function prevImage() {
  imageIndex--;

  if (imageIndex < 0) {
    imageIndex = dataImages.length - 1;
  }

  UpdateImage();
}

function nextImage() {
  imageIndex++;

  if (imageIndex >= dataImages.length) {
    imageIndex = 0;
  }

  UpdateImage();
}

function openMenu() {
  document.querySelector("[data-menu]").classList.remove("hidden");
}

function closeMenu() {
  document.querySelector("[data-menu]").classList.add("hidden");
}

function updateImageSource(newSource) {
  const imageElement = getElementItem("image");

  if (imageElement) {
    imageElement.src = newSource;
  }
}

const imageButtons = document.querySelectorAll("[data-images] button");

imageButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const clickedImage =
      e.target.tagName === "IMG" ? e.target : e.target.querySelector("img");
    const newImageSource = clickedImage.src.replace("-thumbnail.jpg", ".jpg");
    updateImageSource(newImageSource);

    imageButtons.forEach((button) => {
      button
        .querySelector("img")
        .classList.remove("border-2", "border-pri-orange", "opacity-50");
    });

    this.querySelector("img").classList.add(
      "border-2",
      "border-pri-orange",
      "opacity-50"
    );
  });
});

window.addEventListener("DOMContentLoaded", () => {
  imageButtons[0]
    .querySelector("img")
    .classList.add("border-2", "border-pri-orange", "opacity-50");
});

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
      case "open-menu-btn":
        openMenu();
        break;
      case "close-menu-btn":
        closeMenu();
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

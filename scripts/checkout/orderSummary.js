import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
  updateCartQuantity,
  updateDeliveryOption
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions, getDeliveryOption,deliveryOptionsHTML } from "../../data/deliveryOptions.js";
import {renderPaymentSummary} from './paymentSummary.js';
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary(){
let cartSummary = "";
cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  const matchingProduct = getProduct(productId);
  const deliveryOptionsId = cartItem.deliveryOptionsId;

  const deliveryOption = getDeliveryOption(deliveryOptionsId);
  
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dataString = deliveryDate.format("dddd, MMMM D");
  cartSummary += `<div class="cart-item-container js-cart-item-container-${
    matchingProduct.id
  }">
    <div class="delivery-date">
      Delivery date: ${dataString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-label-${
              matchingProduct.id
            }">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-link" data-product-id="${
            matchingProduct.id
          }">
            Update
          </span>
          <input class="quantity-input js-quantity-input-${matchingProduct.id}">
          <span class="save-quantity-link link-primary js-save-link" data-product-id=${
            matchingProduct.id
          }>Save</span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
            matchingProduct.id
          }">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct, cartItem)}
      </div>
    </div>
  </div>`;
});

document.querySelector(".js-order-summary").innerHTML = cartSummary;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    renderOrderSummary();
  });
});
document.querySelectorAll(".js-update-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.add("is-editing-quantity");
  });
});
document.querySelectorAll(".js-save-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.remove("is-editing-quantity");
    const quantityInput = document.querySelector(
      `.js-quantity-input-${productId}`
    );
    const newQuantity = Number(quantityInput.value);
    if (newQuantity < 0 || newQuantity >= 1000) {
      alert("Quantity must be at least 0 and less than 1000");
      return;
    }
    updateQuantity(productId, newQuantity);
    const quantityLabel = document.querySelector(
      `.js-quantity-label-${productId}`
    );
    quantityLabel.innerHTML = newQuantity;
    renderOrderSummary();
  });
  const quantityInput = document.querySelector(
    ".js-quantity-input-" + link.dataset.productId
  );
  quantityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      link.click();
    }
  });
  renderCheckoutHeader();
  renderPaymentSummary();
});

document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click',()=>{
    const {productId, deliveryOptionId} = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
    renderOrderSummary();
    renderPaymentSummary();
  });
});
};
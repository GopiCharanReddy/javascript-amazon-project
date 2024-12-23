import { formatCurrency } from "../scripts/utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
export const deliveryOptions = [{
  id :'1',
  deliveryDays:7,
  priceCents:0
},{
  id :'2',
  deliveryDays:3,
  priceCents:499
},{
  id : '3',
  deliveryDays : 1,
  priceCents:999
}
];
export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  return deliveryOption || deliveryOptions[0];
};
export function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = "";
  deliveryOptions.forEach((deliveryOption) => {
  const dateString =  calculateDeliveryDate(deliveryOption);
    const priceString =
      deliveryOption.priceCents === 0
        ? "FREE"
        : `$${formatCurrency(deliveryOption.priceCents)} - `;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;
    html += `<div class="delivery-option js-delivery-option"
    data-product-id="${matchingProduct.id}"
    data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" ${isChecked ? "checked" : " "}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
    `;
  });
  return html;
};
function isWeekend(date){
  const dayOfWeek = date.format('dddd');
  return dayOfWeek==='Sunday' || dayOfWeek === 'Saturday';
}
export function calculateDeliveryDate(deliveryOption){
  let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate = dayjs();
  while (remainingDays > 0){
    deliveryDate = deliveryDate.add(1,'day');
    if (!isWeekend(deliveryDate)){
      remainingDays--;
    }
  }
  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  );
  return dateString;
}

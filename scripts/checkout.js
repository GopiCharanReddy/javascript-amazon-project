import { renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import {loadProduct, loadProductFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';
// import '../data/car.js';
// import '../data/backend-practice.js';

Promise.all([
  loadProductFetch(),
  new Promise((resolve)=>{
      loadCart(()=>{
        resolve();
      });
    }),

]).then((values)=>{
  console.log(values);
  
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
/*
new Promise((resolve)=>{
loadProduct(()=>{
  resolve('value1');
});  

}).then((value)=>{
  console.log(value);
  return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  });

}).then(()=>{
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});
*/

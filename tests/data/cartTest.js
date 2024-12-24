import {cart,addToCart,loadFromStorage, removeFromCart, updateDeliveryOption} from '../../data/cart.js';

describe('test suite: addToCart',()=>{
  beforeEach(()=>{
    spyOn(localStorage,'setItem');
  });
  it('adds an existing product to the cart',()=>{
    // spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
       quantity:1,
       deliveryOptionsId:'1'
      }]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
     expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
     expect(cart[0].quantity).toEqual(2);
     expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
     quantity:2,
     deliveryOptionsId:'1'
    }]))
  });
  it('adds a new product to the cart',()=>{
    // spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });
    // console.log(localStorage.getItem('cart'));
    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
     expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
     expect(cart[0].quantity).toEqual(1);
     expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
     quantity:1,
     deliveryOptionsId:'1'
    }]))
  });
})
describe('test suite: removeFromCart',()=>{
  beforeEach(()=>{
    spyOn(localStorage,'setItem');
  });

    it('remove a product that is in cart',()=>{
      spyOn(localStorage,'getItem').and.callFake(()=>{
        return JSON.stringify([{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '1'
        }]);
      });
      loadFromStorage();
  
      removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

      expect(cart.length).toEqual(0);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([]));
  });
  it('remove a product that is not in the cart',()=>{
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
      
      //this below code isn't being used anywhere as we are trying to remove a product not in cart
      loadFromStorage();
      removeFromCart(does-not-exist);
      expect(cart.length).toEqual(0);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]));
    });
  })
})

describe('test suite: updateDeliveryOption',()=>{
  beforeEach(()=>{
    spyOn(localStorage,'setItem');
  });
  it('update the delivery option of a product in the cart',()=>{
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();

    updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6','3');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
  it('update the delivery option of a product not in the cart',()=>{
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });
    loadFromStorage();

    updateDeliveryOption('does-not-exist','3');
    expect(cart.length).toEqual(0);

    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
})
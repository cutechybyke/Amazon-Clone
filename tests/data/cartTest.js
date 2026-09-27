import {addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption} from '../../data/cart.js';

describe('test suite: addToCart', () => {
  it('adds an existing product to the cart', () => {

    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
    
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
});

describe('test suite: cart resilience', () => {
  it('recovers from malformed localStorage data', () => {
    spyOn(localStorage, 'getItem').and.returnValue('{not-valid-json');
    spyOn(console, 'warn');

    loadFromStorage();

    expect(Array.isArray(cart)).toBeTrue();
    expect(cart.length).toBeGreaterThan(0);
    expect(console.warn).toHaveBeenCalled();
  });

  it('removes a product and persists the change', () => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([
      {productId: 'one', quantity: 1, deliveryOptionId: '1'},
      {productId: 'two', quantity: 1, deliveryOptionId: '1'}
    ]));
    loadFromStorage();

    removeFromCart('one');

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('two');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('returns false when updating a missing product', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([]));
    loadFromStorage();

    expect(updateDeliveryOption('missing', '2')).toBeFalse();
  });

  it('updates and persists a delivery option', () => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([
      {productId: 'one', quantity: 1, deliveryOptionId: '1'}
    ]));
    loadFromStorage();

    expect(updateDeliveryOption('one', '2')).toBeTrue();
    expect(cart[0].deliveryOptionId).toEqual('2');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});

export let cart;

const defaultCart = () => [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
  deliveryOptionId: '1'
}, {
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 4,
  deliveryOptionId: '2'
}];

loadFromStorage();

export function loadFromStorage() {
  try {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    cart = Array.isArray(storedCart) ? storedCart : defaultCart();
  } catch (error) {
    console.warn('Unable to parse saved cart. Restoring defaults.', error);
    cart = defaultCart();
  }
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  const matchingItem = cart.find((cartItem) => cartItem.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  cart = cart.filter((cartItem) => cartItem.productId !== productId);
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  const matchingItem = cart.find((cartItem) => cartItem.productId === productId);

  if (!matchingItem) {
    return false;
  }

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
  return true;
}

export function loadCart(callback) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      callback(null, xhr.response);
      return;
    }

    callback(new Error(`Unable to load cart (HTTP ${xhr.status}).`));
  });

  xhr.addEventListener('error', () => {
    callback(new Error('Unable to load cart due to a network error.'));
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}

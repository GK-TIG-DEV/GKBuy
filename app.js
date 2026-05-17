const products = [
  {
    id: 'air-force-white',
    name: 'Nike Air Force White',
    desc: 'Klasyczne biale buty do każdej stylówki RP.',
    category: 'shoes',
    price: 850,
    art: 'shoe'
  },
  {
    id: 'air-force-red',
    name: 'Air Force GK Red',
    desc: 'Czerwony custom, pasuje pod ekipowy drip.',
    category: 'shoes',
    price: 1250,
    art: 'shoe'
  },
  {
    id: 'air-force-black',
    name: 'Air Force Black Smoke',
    desc: 'Czarne sneakersy do ciemnej stylówki.',
    category: 'shoes',
    price: 1150,
    art: 'shoe'
  },
  {
    id: 'merol-amg',
    name: 'Merol AMG Pakiet',
    desc: 'Sedan premium, czarny lakier i sportowe dodatki.',
    category: 'cars',
    price: 175000,
    art: 'car'
  },
  {
    id: 'merol-old',
    name: 'Merol Old School',
    desc: 'Stary klimat, dobry na podjazd i do sesji.',
    category: 'cars',
    price: 68000,
    art: 'car'
  },
  {
    id: 'gk-phone',
    name: 'iFrut 15 Pro',
    desc: 'Flagowy telefon bez prawdziwego logo, full RP.',
    category: 'tech',
    price: 4200,
    art: 'phonepic'
  },
  {
    id: 'ifrut-max',
    name: 'iFrut 15 Max',
    desc: 'Większy ekran, mocniejsza bateria, premium vibe.',
    category: 'tech',
    price: 5600,
    art: 'phonepic'
  },
  {
    id: 'ipods-pro',
    name: 'iPods Pro',
    desc: 'Bezprzewodowe słuchawki do rozmów i muzyki.',
    category: 'tech',
    price: 1300,
    art: 'airpods'
  },
  {
    id: 'ipods-max',
    name: 'iPods Max',
    desc: 'Duże słuchawki, czysty dźwięk i luksusowy wygląd.',
    category: 'tech',
    price: 2900,
    art: 'headphones'
  },
  {
    id: 'smart-watch',
    name: 'Smart Watch Carbon',
    desc: 'Zegarek do fitu, elegancki i drogi.',
    category: 'tech',
    price: 2100,
    art: 'watch'
  },
  {
    id: 'street-bag',
    name: 'Torba Street Cargo',
    desc: 'Na gotówkę, klucze i rzeczy po robocie.',
    category: 'style',
    price: 650,
    art: 'bag'
  },
  {
    id: 'gold-chain',
    name: 'Łańcuch GK Gold',
    desc: 'Błysk na mieście, zero ciszy przy wejściu.',
    category: 'style',
    price: 3400,
    art: 'bag'
  },
  {
    id: 'gk-hoodie',
    name: 'Bluza GK Street',
    desc: 'Czarna bluza z czerwonym akcentem.',
    category: 'style',
    price: 780,
    art: 'bag'
  }
];

const state = {
  category: 'all',
  query: '',
  cart: []
};

const productList = document.getElementById('products');
const search = document.getElementById('search');
const cartSheet = document.getElementById('cartSheet');
const cartList = document.getElementById('cartList');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const toast = document.getElementById('toast');

function money(value) {
  return `$${Number(value).toLocaleString('pl-PL')}`;
}

function showToast(text) {
  toast.textContent = text;
  toast.classList.remove('hidden');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.add('hidden'), 1400);
}

function filteredProducts() {
  const query = state.query.trim().toLowerCase();
  return products.filter((product) => {
    const categoryMatch = state.category === 'all' || product.category === state.category;
    const queryMatch = !query || `${product.name} ${product.desc}`.toLowerCase().includes(query);
    return categoryMatch && queryMatch;
  });
}

function renderProducts() {
  const list = filteredProducts();

  if (!list.length) {
    productList.innerHTML = '<article class="product"><h3>Nic nie znaleziono</h3><p>Zmień frazę albo kategorię.</p></article>';
    return;
  }

  productList.innerHTML = list.map((product) => `
    <article class="product">
      <div class="art ${product.art}">
        <img src="${productImage(product)}" alt="${product.name}">
        <i></i>
      </div>
      <h3>${product.name}</h3>
      <p>${product.desc}</p>
      <div class="buy-row">
        <span class="price">${money(product.price)}</span>
        <button class="buy" data-id="${product.id}">Kup</button>
      </div>
    </article>
  `).join('');
}

function svgData(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function productImage(product) {
  const color = product.id.includes('red') ? '#ff4b2f' : product.id.includes('black') ? '#17191f' : '#ffffff';

  if (product.art === 'shoe') {
    return svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 140"><rect width="220" height="140" fill="none"/><path d="M32 85c28 0 48-11 75-22 24-10 45-12 57-4 10 7 14 21 10 35H35c-13 0-17-9-3-9Z" fill="${color}" stroke="#d9dde6" stroke-width="6"/><path d="M74 82c35-2 66-10 86-23" fill="none" stroke="#d8431d" stroke-width="7" stroke-linecap="round"/><path d="M38 96h139" stroke="#c9ced8" stroke-width="8" stroke-linecap="round"/></svg>`);
  }

  if (product.art === 'car') {
    return svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 140"><rect width="220" height="140" fill="none"/><path d="M32 84h154c5 0 9 4 9 9v12H24V94c0-6 3-10 8-10Z" fill="#20242d"/><path d="M58 82c13-24 29-35 62-35h22c18 0 34 13 44 35H58Z" fill="#5f6978"/><path d="M80 57h37v24H61c5-10 11-18 19-24Zm46 0h20c12 0 23 9 31 24h-51V57Z" fill="#dbe7f6"/><circle cx="64" cy="105" r="19" fill="#0a0c11"/><circle cx="162" cy="105" r="19" fill="#0a0c11"/><circle cx="64" cy="105" r="8" fill="#444b58"/><circle cx="162" cy="105" r="8" fill="#444b58"/></svg>`);
  }

  if (product.art === 'phonepic') {
    return svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 140"><rect width="220" height="140" fill="none"/><rect x="72" y="10" width="76" height="120" rx="18" fill="#11131a"/><rect x="80" y="20" width="60" height="100" rx="12" fill="url(#g)"/><circle cx="128" cy="30" r="5" fill="#242a35"/><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ff5a1f"/><stop offset="1" stop-color="#17191f"/></linearGradient></defs></svg>`);
  }

  if (product.art === 'airpods') {
    return svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 140"><rect width="220" height="140" fill="none"/><rect x="58" y="55" width="104" height="58" rx="22" fill="#fff" stroke="#d7dce5" stroke-width="6"/><path d="M74 57V34c0-10 8-18 18-18h36c10 0 18 8 18 18v23" fill="none" stroke="#d7dce5" stroke-width="7"/><path d="M82 77h56" stroke="#c7ccd6" stroke-width="5" stroke-linecap="round"/></svg>`);
  }

  if (product.art === 'headphones') {
    return svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 140"><rect width="220" height="140" fill="none"/><path d="M58 74V61c0-30 22-49 52-49s52 19 52 49v13" fill="none" stroke="#e4e7ee" stroke-width="13" stroke-linecap="round"/><rect x="40" y="68" width="38" height="48" rx="15" fill="#ff5a1f"/><rect x="142" y="68" width="38" height="48" rx="15" fill="#ff5a1f"/><path d="M78 92h64" stroke="#e4e7ee" stroke-width="9" stroke-linecap="round"/></svg>`);
  }

  if (product.art === 'watch') {
    return svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 140"><rect width="220" height="140" fill="none"/><rect x="86" y="11" width="48" height="118" rx="18" fill="#ccd2dd"/><rect x="72" y="39" width="76" height="62" rx="19" fill="#11131a"/><circle cx="110" cy="70" r="21" fill="#ff5a1f"/></svg>`);
  }

  return svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 140"><rect width="220" height="140" fill="none"/><rect x="55" y="48" width="110" height="62" rx="16" fill="#ff5a1f"/><path d="M82 48V34c0-12 10-22 28-22s28 10 28 22v14" fill="none" stroke="#17191f" stroke-width="9"/><path d="M75 72h70" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".65"/></svg>`);
}

function cartSum() {
  return state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function cartItemsCount() {
  return state.cart.reduce((sum, item) => sum + item.qty, 0);
}

function renderCart() {
  cartCount.textContent = cartItemsCount();
  cartTotal.textContent = money(cartSum());

  if (!state.cart.length) {
    cartList.innerHTML = '<div class="cart-item"><div><strong>Koszyk jest pusty</strong><span>Dodaj coś z GKBAY.</span></div></div>';
    return;
  }

  cartList.innerHTML = state.cart.map((item) => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong>
        <span>${item.qty} szt. • ${money(item.price * item.qty)}</span>
      </div>
      <button data-remove="${item.id}">Usuń</button>
    </div>
  `).join('');
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const existing = state.cart.find((item) => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ ...product, qty: 1 });
  }

  renderCart();
  showToast(`${product.name} dodano do koszyka`);
}

productList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-id]');
  if (button) addToCart(button.dataset.id);
});

document.querySelectorAll('.category').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.category').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    state.category = button.dataset.category;
    renderProducts();
  });
});

search.addEventListener('input', () => {
  state.query = search.value;
  renderProducts();
});

document.querySelectorAll('[data-quick]').forEach((button) => {
  button.addEventListener('click', () => addToCart(button.dataset.quick));
});

document.getElementById('openCart').addEventListener('click', () => {
  cartSheet.classList.add('open');
  cartSheet.setAttribute('aria-hidden', 'false');
});

document.getElementById('closeCart').addEventListener('click', () => {
  cartSheet.classList.remove('open');
  cartSheet.setAttribute('aria-hidden', 'true');
});

cartList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-remove]');
  if (!button) return;

  const index = state.cart.findIndex((item) => item.id === button.dataset.remove);
  if (index >= 0) {
    state.cart.splice(index, 1);
    renderCart();
  }
});

document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (!state.cart.length) {
    showToast('Koszyk jest pusty');
    return;
  }

  const total = money(cartSum());
  state.cart = [];
  renderCart();
  cartSheet.classList.remove('open');
  cartSheet.setAttribute('aria-hidden', 'true');
  showToast(`Zakup przyjęty: ${total}`);
});

document.getElementById('ordersBtn').addEventListener('click', () => showToast('Zakupy: ostatnie zamówienie gotowe do odbioru'));
document.getElementById('favBtn').addEventListener('click', () => showToast('Ulubione zapisane lokalnie'));
document.getElementById('profileBtn').addEventListener('click', () => showToast('Profil GKBAY aktywny'));

renderProducts();
renderCart();

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
      <div class="info">
        <h3>${product.name}</h3>
        <p>${product.desc}</p>
        <div class="buy-row">
          <span class="price">${money(product.price)}</span>
          <button class="buy" data-id="${product.id}" aria-label="Kup ${product.name}">Kup</button>
        </div>
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
    return svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 180"><defs><linearGradient id="sole" x1="0" x2="1"><stop stop-color="#f8fbff"/><stop offset="1" stop-color="#cfd8e4"/></linearGradient><filter id="s"><feDropShadow dx="0" dy="12" stdDeviation="7" flood-color="#5d6878" flood-opacity=".28"/></filter></defs><rect width="260" height="180" fill="none"/><ellipse cx="128" cy="143" rx="86" ry="13" fill="#b4bdca" opacity=".28"/><g filter="url(#s)" transform="rotate(-8 130 90)"><path d="M37 104c31-3 56-15 91-29 30-12 61-16 77-4 13 10 17 27 11 46H42c-18 0-24-11-5-13Z" fill="${color}" stroke="#dce3ec" stroke-width="8"/><path d="M46 115h169c8 0 10 15 1 17H42c-18 0-24-17 4-17Z" fill="url(#sole)"/><path d="M91 100c44-4 85-15 111-32" fill="none" stroke="#f45a24" stroke-width="8" stroke-linecap="round"/><path d="M86 81c17 7 49 6 78-6" fill="none" stroke="#aab5c4" stroke-width="4" stroke-linecap="round"/><path d="M118 77l-7 23M136 72l-5 24M154 70l-3 21" stroke="#b6bfcb" stroke-width="4" stroke-linecap="round"/></g></svg>`);
  }

  if (product.art === 'car') {
    return svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 180"><defs><linearGradient id="body" x1="0" x2="1"><stop stop-color="#10141c"/><stop offset=".55" stop-color="#667284"/><stop offset="1" stop-color="#222833"/></linearGradient><filter id="s"><feDropShadow dx="0" dy="12" stdDeviation="8" flood-color="#18202a" flood-opacity=".34"/></filter></defs><rect width="260" height="180" fill="none"/><ellipse cx="132" cy="135" rx="96" ry="15" fill="#9aa4b2" opacity=".27"/><g filter="url(#s)"><path d="M34 102h188c6 0 11 5 11 12v17H25v-16c0-8 4-13 9-13Z" fill="url(#body)"/><path d="M65 99c17-31 38-45 78-45h29c22 0 42 18 55 45H65Z" fill="#5b6878"/><path d="M90 66h45v31H67c6-13 14-23 23-31Zm56 0h28c15 0 29 12 39 31h-67V66Z" fill="#dce9f6"/><path d="M40 108h184" stroke="#f45a24" stroke-width="5"/><circle cx="75" cy="131" r="23" fill="#0a0c11"/><circle cx="190" cy="131" r="23" fill="#0a0c11"/><circle cx="75" cy="131" r="9" fill="#5d6674"/><circle cx="190" cy="131" r="9" fill="#5d6674"/></g></svg>`);
  }

  if (product.art === 'phonepic') {
    return svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 180"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ff7a3d"/><stop offset=".55" stop-color="#8f4dff"/><stop offset="1" stop-color="#11151c"/></linearGradient><filter id="s"><feDropShadow dx="0" dy="14" stdDeviation="8" flood-color="#11151c" flood-opacity=".32"/></filter></defs><rect width="260" height="180" fill="none"/><g filter="url(#s)"><rect x="84" y="18" width="92" height="144" rx="24" fill="#11151c"/><rect x="94" y="31" width="72" height="118" rx="17" fill="url(#g)"/><circle cx="153" cy="42" r="6" fill="#202735"/><path d="M108 130h44" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".55"/></g></svg>`);
  }

  if (product.art === 'airpods') {
    return svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 180"><defs><filter id="s"><feDropShadow dx="0" dy="12" stdDeviation="8" flood-color="#6f7b8c" flood-opacity=".28"/></filter></defs><rect width="260" height="180" fill="none"/><ellipse cx="130" cy="140" rx="72" ry="12" fill="#aeb8c7" opacity=".25"/><g filter="url(#s)"><rect x="69" y="69" width="122" height="67" rx="25" fill="#fff" stroke="#dbe1ea" stroke-width="7"/><path d="M88 70V43c0-13 10-23 23-23h38c13 0 23 10 23 23v27" fill="none" stroke="#dbe1ea" stroke-width="8"/><path d="M96 94h68" stroke="#c4ccd8" stroke-width="5" stroke-linecap="round"/><circle cx="107" cy="103" r="5" fill="#f45a24"/><circle cx="153" cy="103" r="5" fill="#f45a24"/></g></svg>`);
  }

  if (product.art === 'headphones') {
    return svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 180"><defs><filter id="s"><feDropShadow dx="0" dy="14" stdDeviation="8" flood-color="#11151c" flood-opacity=".35"/></filter></defs><rect width="260" height="180" fill="none"/><g filter="url(#s)"><path d="M65 92V76c0-37 27-61 65-61s65 24 65 61v16" fill="none" stroke="#e4e9f1" stroke-width="15" stroke-linecap="round"/><rect x="43" y="84" width="45" height="59" rx="17" fill="#ff5a1f"/><rect x="172" y="84" width="45" height="59" rx="17" fill="#ff5a1f"/><path d="M88 114h84" stroke="#e4e9f1" stroke-width="10" stroke-linecap="round"/><path d="M64 96v33M195 96v33" stroke="#11151c" stroke-width="7" stroke-linecap="round" opacity=".28"/></g></svg>`);
  }

  if (product.art === 'watch') {
    return svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 180"><defs><filter id="s"><feDropShadow dx="0" dy="14" stdDeviation="8" flood-color="#11151c" flood-opacity=".3"/></filter></defs><rect width="260" height="180" fill="none"/><g filter="url(#s)"><rect x="101" y="17" width="58" height="146" rx="22" fill="#cbd3df"/><rect x="84" y="56" width="92" height="75" rx="22" fill="#11151c"/><circle cx="130" cy="94" r="26" fill="#ff5a1f"/><path d="M116 94h28M130 80v28" stroke="#fff" stroke-width="6" stroke-linecap="round"/></g></svg>`);
  }

  return svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 180"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#ff5a1f"/><stop offset="1" stop-color="#b7192b"/></linearGradient><filter id="s"><feDropShadow dx="0" dy="14" stdDeviation="8" flood-color="#11151c" flood-opacity=".28"/></filter></defs><rect width="260" height="180" fill="none"/><g filter="url(#s)"><rect x="65" y="64" width="130" height="73" rx="18" fill="url(#g)"/><path d="M97 64V47c0-15 12-27 33-27s33 12 33 27v17" fill="none" stroke="#11151c" stroke-width="10"/><path d="M88 92h84" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".65"/></g></svg>`);
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
    cartList.innerHTML = '<div class="cart-item"><div><strong>Koszyk jest pusty</strong><span>Dodaj produkt z listy.</span></div></div>';
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

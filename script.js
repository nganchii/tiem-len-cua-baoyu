// ====== GIỎ HÀNG ======
const CART_KEY = 'cart';
let cart = [];
try {
  cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
} catch (e) {
  cart = [];
}
const saveCart = () => {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
};

const addToCartButtons = document.querySelectorAll('.cart-1st');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const orderCart = document.getElementById('order-cart');
const cartContent = document.querySelector('.cart-content');
const closeCartBTP = document.querySelector('.close-cart');
const openCart = document.getElementById('cart-open');

const parsePrice = (text) => parseInt(String(text).replace(/\D/g, '')) || 0;
const money = (n) => n.toLocaleString('vi-VN') + 'đ';
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

// Bấm nút "Thêm vào giỏ hàng"
addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.sp');

    const name = (
      button.dataset.name ||
      card?.querySelector('h3')?.innerText ||
      'Sản phẩm'
    ).trim();
    const price =
      parseInt(button.dataset.price) ||
      parsePrice(card?.querySelector('.price')?.innerText || '');
    const img = button.dataset.img || card?.querySelector('img')?.getAttribute('src') || '';
    const id = button.dataset.id || name;

    addToCart(id, name, price, img);
    openCartPanel();
  });
});

function addToCart(id, name, price, img) {
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, name, price, img, quantity: 1 });
  }
  saveCart();
  renderCart();
  cartItemsContainer.scrollTop = cartItemsContainer.scrollHeight;
}

function changeQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter((i) => i.id !== id);
  }
  saveCart();
  renderCart();
}

function renderCart() {
  if (!cartItemsContainer || !cartTotalElement) return;
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="empty-cart">Chưa có sản phẩm nào trong giỏ hàng của bạn</p>';
    cartTotalElement.innerText = '0đ';
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
      <div style="display: flex; flex-direction: column; width: 100%; padding-bottom: 10px; background-color: #f7c8d3; border-radius: 12px;">
        <div class="item-info" style="display: flex; gap: 12px; padding: 10px; align-items: center">
          <img src="${esc(item.img)}" alt="${esc(item.name)}" style="width: 50px !important; height: 50px !important; object-fit: cover; border-radius: 6px; flex-shrink: 0;">
          <span class="item-name">${esc(item.name)}</span>
          <span class="item-price">${money(item.price)}</span>
        </div>
        <div class="note" style="display: flex; flex-direction: row; gap: 20px; margin-left: 10px">
          <div class="item-qty">
            <div class="qty-box">
              <button type="button" class="qty-btn" data-id="${esc(item.id)}" data-delta="-1">−</button>
              <span>${item.quantity}</span>
              <button type="button" class="qty-btn" data-id="${esc(item.id)}" data-delta="1">+</button>
            </div>
          </div>
          <div class="item-subtotal">
            Thành tiền: <strong>${money(itemTotal)}</strong>
          </div>
        </div>
      </div>
      <hr>
    `;
    cartItemsContainer.appendChild(itemElement);
  });

  cartTotalElement.innerText = money(total);
}

// Bấm + / − trong giỏ
if (cartItemsContainer) {
  cartItemsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-delta]');
    if (!btn) return;
    changeQty(btn.dataset.id, Number(btn.dataset.delta));
  });
}

// ====== MỞ / ĐÓNG THANH GIỎ HÀNG ======
function openCartPanel() {
  if (!orderCart) return;
  orderCart.style.display = 'flex';
  orderCart.classList.add('open');
}

function closeCart() {
  if (cartContent) {
    cartContent.style.animation = 'slideOutRight 0.3s ease-in forwards';
  }
  setTimeout(() => {
    if (orderCart) {
      orderCart.classList.remove('open');
      orderCart.style.display = 'none';
    }
    if (cartContent) {
      cartContent.style.animation = 'slideInRight 0.35s ease-out forwards';
    }
  }, 300);
}

if (openCart) openCart.addEventListener('click', openCartPanel);
if (closeCartBTP) closeCartBTP.addEventListener('click', closeCart);

window.addEventListener('click', (event) => {
  if (event.target === orderCart) closeCart();
});

renderCart();

// ====== SLIDER SẢN PHẨM ======
document.querySelectorAll('.slider-wrap').forEach((wrap) => {
  const track = wrap.querySelector('.slider-track');
  const prev = wrap.querySelector('.prev');
  const next = wrap.querySelector('.next');
  if (!track || !prev || !next) return;

  const step = () => track.clientWidth;

  prev.addEventListener('click', () => {
    track.scrollBy({ left: -step(), behavior: 'smooth' });
  });
  next.addEventListener('click', () => {
    track.scrollBy({ left: step(), behavior: 'smooth' });
  });

  function updateButtons() {
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
  }

  track.addEventListener('scroll', updateButtons);
  window.addEventListener('resize', updateButtons);
  updateButtons();
});

// ====== TÌM KIẾM SẢN PHẨM ======
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const aboutSection = document.querySelector('.about-us');
const searchSections = document.querySelectorAll('.slider-wrap');

// Bỏ dấu tiếng Việt để gõ "hong" vẫn tìm ra "Hồng"
const normalize = (s) =>
  String(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/\s+/g, ' ')
    .trim();

// Dòng thông báo khi không có kết quả
const emptyMsg = document.createElement('p');
emptyMsg.style.cssText = 'display:none; padding:24px 4px; font-size:1.05rem;';
if (searchSections.length) {
  searchSections[0].parentNode.insertBefore(emptyMsg, searchSections[0]);
}

function runSearch() {
  if (!searchInput) return;

  const keyword = normalize(searchInput.value);
  const words = keyword ? keyword.split(' ') : [];
  let totalFound = 0;

  searchSections.forEach((section) => {
    const title = normalize(section.querySelector('h2')?.innerText || '');
    let found = 0;

    section.querySelectorAll('.sp').forEach((card) => {
      const name = card.querySelector('h3')?.innerText || '';
      const alt = card.querySelector('img')?.alt || '';
      const text = normalize(name + ' ' + alt + ' ' + title);

      // Mọi từ bạn gõ đều phải xuất hiện trong sản phẩm
      const match = words.every((w) => text.includes(w));
      card.style.display = match ? '' : 'none';
      if (match) found++;
    });

    // Ẩn cả mục nếu không có sản phẩm nào khớp
    section.style.display = found > 0 ? '' : 'none';

    const track = section.querySelector('.slider-track');
    if (track) track.scrollLeft = 0;

    totalFound += found;
  });

  // Đang tìm thì ẩn khung ABOUT US cho kết quả hiện lên cao hơn
  if (aboutSection) aboutSection.style.display = keyword ? 'none' : '';

  if (keyword && totalFound === 0) {
    emptyMsg.textContent =
      'Không tìm thấy sản phẩm nào với từ khóa "' + searchInput.value.trim() + '".';
    emptyMsg.style.display = 'block';
  } else {
    emptyMsg.style.display = 'none';
  }

  // Cập nhật lại nút ‹ › của các slider
  window.dispatchEvent(new Event('resize'));
}

if (searchInput) {
  //searchInput.addEventListener('input', runSearch);//
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runSearch();
    }
  });
}
if (searchBtn) searchBtn.addEventListener('click', runSearch);

// ====== BẤM VÀO SẢN PHẨM -> TRANG CHI TIẾT ======
document.querySelectorAll('.sp').forEach((card) => {
  const id = card.querySelector('.cart-1st')?.dataset.id;
  if (!id) return;

  card.style.cursor = 'pointer';
  card.addEventListener('click', (e) => {
    if (e.target.closest('button')) return; // bấm nút giỏ hàng thì không chuyển trang
    window.location.href = 'san-pham.html?id=' + encodeURIComponent(id);
  });
});

// ====== GHI CHÚ + THANH TOÁN ======
const cartNote = document.getElementById('cart-note');
const checkoutBtn = document.getElementById('checkout-btn');

if (cartNote) {
  try { cartNote.value = localStorage.getItem('cartNote') || ''; } catch (e) {}
  cartNote.addEventListener('input', () => {
    try { localStorage.setItem('cartNote', cartNote.value); } catch (e) {}
  });
}

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Giỏ hàng đang trống, hãy thêm sản phẩm trước khi thanh toán nhé.');
      return;
    }
    try { localStorage.setItem('cartNote', cartNote ? cartNote.value : ''); } catch (e) {}
    window.location.href = 'thanh-toan.html';
  });
}

// ====== MỤC "TÀI KHOẢN" Ở THANH BÊN ======
const accountLink = document.querySelector('.menu a[href="dang-nhap.html"], .menu a[href="tai-khoan.html"]');
if (accountLink) {
  const loggedIn = localStorage.getItem('token') || sessionStorage.getItem('token');
  accountLink.href = loggedIn ? 'tai-khoan.html' : 'dang-nhap.html';
}
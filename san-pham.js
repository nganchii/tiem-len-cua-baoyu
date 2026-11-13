
const app = document.getElementById("app");
const id = new URLSearchParams(location.search).get("id");
const p = PRODUCTS[id];
const money = (n) => n.toLocaleString("vi-VN") + "đ";

if (!p) {
    app.innerHTML =
    '<div class="notfound"><h2>Không tìm thấy sản phẩm</h2>' +
    '<p><a href="index.html">Quay về trang chủ</a></p></div>';
} else {
    document.title = p.name + " | Tiệm len của Baoyuu";

    // dùng textContent để chữ trong dữ liệu không làm vỡ trang
    const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
    };

    const wrap = el("div", "wrap");

    const photo = el("div", "photo");
    const img = document.createElement("img");
    img.src = p.img;
    img.alt = p.name;
    photo.appendChild(img);

    const info = el("div", "info");
    info.append(
    el("p", "cat", p.category),
    el("h1", "", p.name),
    el("p", "price", money(p.price)),
    el("p", "desc", p.desc)
    );

    const specs = el("ul", "specs");
    [["Chất liệu", p.material], ["Kích thước", p.size], ["Hình thức", "Làm thủ công (handmade)"]]
    .forEach(([k, v]) => {
        if (!v) return;
        const li = document.createElement("li");
        li.append(el("b", "", k), document.createTextNode(v));
        specs.appendChild(li);
    });
    info.appendChild(specs);

    // chọn số lượng + nút thêm vào giỏ
    let qty = 1;
    const buy = el("div", "buy");
    const qtyBox = el("div", "qty");
    const minus = el("button", "", "−"); minus.type = "button";
    const num = el("span", "", "1");
    const plus = el("button", "", "+"); plus.type = "button";
    qtyBox.append(minus, num, plus);
    const addBtn = el("button", "", "🛒 Thêm vào giỏ hàng");
    addBtn.id = "addBtn"; addBtn.type = "button";
    buy.append(qtyBox, addBtn);
    info.appendChild(buy);

    minus.onclick = () => { if (qty > 1) num.textContent = --qty; };
    plus.onclick = () => { num.textContent = ++qty; };

    addBtn.onclick = () => {
    let cart = [];
    try { cart = JSON.parse(localStorage.getItem("cart") || "[]"); } catch (e) { cart = []; }

    const found = cart.find((i) => i.id === id);
    if (found) found.quantity += qty;
    else cart.push({ id, name: p.name, price: p.price, img: p.img, quantity: qty });

    try { localStorage.setItem("cart", JSON.stringify(cart)); } catch (e) {}

    const t = document.getElementById("toast");
    t.innerHTML = 'Đã thêm vào giỏ hàng <a href="index.html">Xem trang chủ</a>';
    t.style.display = "block";
    clearTimeout(t._timer);
    t._timer = setTimeout(() => (t.style.display = "none"), 2500);
    };

    wrap.append(photo, info);
    app.appendChild(wrap);
}
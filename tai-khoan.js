
// ===== Kiểm tra đăng nhập =====
const store = localStorage.getItem('token') ? localStorage
            : sessionStorage.getItem('token') ? sessionStorage : null;
const email = store ? store.getItem('userEmail') : null;
if (!store || !email) {
    location.replace('dang-nhap.html');
} else {
    init();
}

function init() {
    const $ = (id) => document.getElementById(id);
    const money = (n) => n.toLocaleString('vi-VN') + 'đ';
    const read = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key) || fallback); }
    catch (e) { return JSON.parse(fallback); }
    };

    const users = read('users', '[]');
    const account = users.find((u) => u.email === email) || {};
    const profiles = read('profiles', '{}');
    // lần đầu: lấy sẵn tên và SĐT từ lúc đăng ký
    let profile = profiles[email] || { name: account.name || '', phone: account.phone || '' };

    // ===== Hiển thị =====
    function showAvatar() {
    const box = $('avatar');
    box.innerHTML = '';
    if (profile.avatar) {
        const img = document.createElement('img');
        img.src = profile.avatar; img.alt = 'Ảnh đại diện';
        box.appendChild(img);
    } else {
        box.textContent = (profile.name || email).trim().charAt(0).toUpperCase();
    }
    $('sideName').textContent = profile.name || 'Khách hàng';
    $('sideEmail').textContent = email;
    }

    $('name').value = profile.name || '';
    $('email').value = email;
    $('phone').value = profile.phone || '';
    $('birthday').value = profile.birthday || '';
    $('gender').value = profile.gender || '';
    $('address').value = profile.address || '';
    showAvatar();

    // ===== Lưu thông tin =====
    $('profileForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('name').value.trim();
    const phone = $('phone').value.trim();
    let ok = true;

    const check = (id, cond, msg) => {
        $('err-' + id).textContent = cond ? '' : msg;
        $(id).classList.toggle('invalid', !cond);
        if (!cond) ok = false;
    };
    check('name', name.length >= 2, 'Nhập họ và tên.');
    check('phone', phone === '' || /^(0|\+84)\d{9}$/.test(phone), 'Số điện thoại chưa hợp lệ.');
    if (!ok) return;

    profile = {
        ...profile,
        name, phone,
        birthday: $('birthday').value,
        gender: $('gender').value,
        address: $('address').value.trim()
    };
    profiles[email] = profile;
    try {
        localStorage.setItem('profiles', JSON.stringify(profiles));
        store.setItem('userName', name);   // để lời chào "Xin chào, ..." cập nhật theo
    } catch (err) {}

    showAvatar();
    $('msg').textContent = 'Đã lưu thông tin';
    setTimeout(() => ($('msg').textContent = ''), 2500);
    });

    // ===== Đổi ảnh đại diện (thu nhỏ trước khi lưu) =====
    $('avatarFile').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        const img = new Image();
        img.onload = () => {
        const size = 200;
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = size;
        const side = Math.min(img.width, img.height);
        const sx = (img.width - side) / 2, sy = (img.height - side) / 2;
        canvas.getContext('2d').drawImage(img, sx, sy, side, side, 0, 0, size, size);
        profile.avatar = canvas.toDataURL('image/jpeg', 0.8);
        profiles[email] = profile;
        try { localStorage.setItem('profiles', JSON.stringify(profiles)); } catch (err) {}
        showAvatar();
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
    });

    // ===== Chuyển tab =====
    document.querySelectorAll('.tab').forEach((btn) => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach((b) => b.classList.toggle('active', b === btn));
        $('tab-info').hidden = btn.dataset.tab !== 'info';
        $('tab-orders').hidden = btn.dataset.tab !== 'orders';
    });
    });

    // ===== Lịch sử đơn hàng =====
    const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
    };

    const mine = read('orders', '[]')
    .filter((o) => o.email === email || (profile.phone && o.customer && o.customer.phone === profile.phone))
    .reverse();

    const list = $('orderList');
    if (mine.length === 0) {
    list.appendChild(el('p', 'empty', 'Bạn chưa có đơn hàng nào.'));
    } else {
    mine.forEach((o) => {
        const card = el('div', 'order');
        const head = el('div', 'order-head');
        head.append(
        el('b', '', 'Mã đơn: ' + o.code),
        el('span', '', new Date(o.createdAt).toLocaleString('vi-VN')),
        el('span', 'badge', o.payment === 'bank' ? 'Chuyển khoản' : 'Thanh toán khi nhận hàng')
        );
        const ul = el('ul');
        o.items.forEach((it) => ul.appendChild(el('li', '', it.name + ' × ' + it.quantity + ' — ' + money(it.price * it.quantity))));
        card.append(head, ul, el('b', '', 'Tổng: ' + money(o.total)));
        if (o.note) card.appendChild(el('p', '', 'Ghi chú: ' + o.note));
        list.appendChild(card);
    });
    }

    // ===== Đăng xuất =====
    $('logoutBtn').addEventListener('click', () => {
    ['token', 'userName', 'userEmail'].forEach((k) => {
        localStorage.removeItem(k);
        sessionStorage.removeItem(k);
    });
    location.href = 'dang-nhap.html';
    });
}

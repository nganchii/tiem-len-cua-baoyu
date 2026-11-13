// ===== ĐIỀN VÀO ĐÂY (lấy từ EmailJS) =====
    const EMAILJS_PUBLIC_KEY = '3aUnGWmNmVGTMTKpL';
    const EMAILJS_SERVICE_ID = 'service_arf3lzc';
    const EMAILJS_TEMPLATE_ID = 'template_ty4k51m';
    // =========================================

    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

    const $ = (id) => document.getElementById(id);
    const EXPIRE_MIN = 10;
    const RESET_KEY = 'resetRequest';

    const readUsers = () => {
      try { return JSON.parse(localStorage.getItem('users') || '[]'); }
      catch (e) { return []; }
    };
    const say = (id, text, type) => {
      const el = $(id);
      el.textContent = text;
      el.className = 'msg ' + (type || '');
    };
    const makeCode = () => {
      const n = crypto.getRandomValues(new Uint32Array(1))[0] % 1000000;
      return String(n).padStart(6, '0');
    };

    // ----- Bước 1: gửi mã -----
    $('formEmail').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = $('email').value.trim().toLowerCase();

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return say('msg1', 'Email chưa hợp lệ.', 'err');
      }
      const user = readUsers().find((u) => String(u.email).toLowerCase() === email);
      if (!user) {
        return say('msg1', 'Không tìm thấy tài khoản với email này trên thiết bị này.', 'err');
      }

      const code = makeCode();
      const btn = $('btnSend');
      btn.disabled = true;
      say('msg1', 'Đang gửi mã...', '');

      try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          to_email: email,
          to_name: user.name || 'bạn',
          code: code,
          expire_minutes: EXPIRE_MIN
        });
        sessionStorage.setItem(RESET_KEY, JSON.stringify({
          email, code, expires: Date.now() + EXPIRE_MIN * 60000, tries: 0
        }));
        $('sentInfo').textContent = 'Đã gửi mã tới ' + email + '. Mã có hiệu lực ' + EXPIRE_MIN + ' phút, hãy kiểm tra cả mục Spam.';
        $('formEmail').hidden = true;
        $('formReset').hidden = false;
        $('code').focus();
      } catch (err) {
        console.error('EmailJS lỗi:', err);
        const detail = (err && (err.text || err.message)) || 'không rõ';
        say('msg1', 'Không gửi được email: ' + detail, 'err');
      } finally {
        btn.disabled = false;
      }
    });

    // ----- Bước 2: xác nhận mã và đổi mật khẩu -----
    $('formReset').addEventListener('submit', (e) => {
      e.preventDefault();
      let req;
      try { req = JSON.parse(sessionStorage.getItem(RESET_KEY) || 'null'); } catch (err) { req = null; }

      if (!req || Date.now() > req.expires) {
        sessionStorage.removeItem(RESET_KEY);
        return say('msg2', 'Mã đã hết hạn. Hãy quay lại gửi mã mới.', 'err');
      }
      if (req.tries >= 5) {
        sessionStorage.removeItem(RESET_KEY);
        return say('msg2', 'Bạn nhập sai quá 5 lần. Hãy gửi mã mới.', 'err');
      }

      const pw = $('pw').value;
      const pw2 = $('pw2').value;
      if ($('code').value.trim() !== req.code) {
        req.tries += 1;
        sessionStorage.setItem(RESET_KEY, JSON.stringify(req));
        return say('msg2', 'Mã chưa đúng.', 'err');
      }
      if (pw.length < 8) return say('msg2', 'Mật khẩu cần ít nhất 8 ký tự.', 'err');
      if (pw !== pw2) return say('msg2', 'Hai mật khẩu chưa khớp.', 'err');

      const users = readUsers();
      const user = users.find((u) => String(u.email).toLowerCase() === req.email);
      if (!user) return say('msg2', 'Không tìm thấy tài khoản.', 'err');

      user.password = pw;
      try { localStorage.setItem('users', JSON.stringify(users)); } catch (err) {}
      sessionStorage.removeItem(RESET_KEY);

      say('msg2', 'Đổi mật khẩu thành công. Đang chuyển sang trang đăng nhập...', 'ok');
      setTimeout(() => { location.href = 'dang-nhap.html'; }, 1500);
    });
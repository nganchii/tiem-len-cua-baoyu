const form = document.getElementById("registerForm");

function showError(id, message) {
  document.getElementById("err-" + id).textContent = message;
  const input = document.getElementById(id);
  if (input) input.classList.toggle("invalid", Boolean(message));
}

function validate() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;
  const agree = document.getElementById("agree").checked;
  let ok = true;

  const check = (id, condition, message) => {
    showError(id, condition ? "" : message);
    if (!condition) ok = false;
  };

  check("name", name.length >= 2, "Nhập họ và tên của bạn.");
  check("email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), "Email chưa hợp lệ.");
  check("phone", /^(0|\+84)\d{9}$/.test(phone), "Số điện thoại chưa hợp lệ.");
  check("password", password.length >= 8, "Mật khẩu cần ít nhất 8 ký tự.");
  check("confirm", confirm === password && confirm !== "", "Hai mật khẩu chưa khớp.");
  check("agree", agree, "Bạn cần đồng ý với điều khoản.");

  return ok ? { name, email, phone, password } : null;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = validate();
  if (!data) return;

  const button = form.querySelector("button");
  const result = document.getElementById("result");
  button.disabled = true;
  result.textContent = "Đang tạo tài khoản...";

  try {
    // GIẢ LẬP: lưu tài khoản tạm trong trình duyệt, xóa đi khi có backend thật
    await new Promise((r) => setTimeout(r, 600));

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u) => u.email === data.email)) {
      throw new Error("Email này đã được đăng ký.");
    }

    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));

    result.textContent = "Đăng ký thành công! Đang chuyển sang trang đăng nhập...";
    setTimeout(() => { window.location.href = "dang-nhap.html"; }, 1200);
  } catch (err) {
    result.textContent = err.message;
  } finally {
    button.disabled = false;
  }
});
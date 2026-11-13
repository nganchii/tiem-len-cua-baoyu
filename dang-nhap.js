const form = document.getElementById("loginForm");

function showError(id, message) {
  document.getElementById("err-" + id).textContent = message;
  document.getElementById(id).classList.toggle("invalid", Boolean(message));
}

function validate() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  let ok = true;

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  showError("email", emailOk ? "" : "Email chưa hợp lệ.");
  if (!emailOk) ok = false;

  const passOk = password.length > 0;
  showError("password", passOk ? "" : "Nhập mật khẩu của bạn.");
  if (!passOk) ok = false;

  return ok ? { email, password } : null;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = validate();
  if (!data) return;

  const button = form.querySelector("button");
  const result = document.getElementById("result");
  button.disabled = true;
  result.textContent = "Đang đăng nhập...";

  try {
    // GIẢ LẬP: tìm tài khoản đã đăng ký trong trình duyệt
    await new Promise((r) => setTimeout(r, 600));

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (!user) {
      throw new Error("Email hoặc mật khẩu không đúng.");
    }

    const remember = document.getElementById("remember").checked;
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem("token", "token-gia-lap");
    storage.setItem("userName", user.name);
    storage.setItem("userEmail", user.email);

    window.location.href = "tai-khoan.html";
  } catch (err) {
    result.textContent = err.message;
  } finally {
    button.disabled = false;
  }
});
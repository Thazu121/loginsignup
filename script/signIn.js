const users = [
  { email: "user@example.com", password: "123456" },
  { email: "admin@example.com", password: "admin123" }
];

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const signInForm = document.getElementById('signIn');
const message = document.getElementById('message');

togglePassword.addEventListener('click', () => {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  togglePassword.innerText = type === 'password' ? '👁' : '🙈';
});



signInForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    message.textContent = "All fields are required";
    message.style.color = "red";
    return;
  }

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    message.textContent = "Login successful!";
    message.style.color = "green";

    setTimeout(() => {
      window.location.href = "tourist-landing.html";
    }, 1000);
  } else {
    message.textContent = "Invalid email or password";
    message.style.color = "red";
  }
});




const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const signInForm = document.getElementById('signIn');
const message = document.getElementById('message');


let user = JSON.parse(localStorage.getItem("my")) || []

console.log(user);

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

  const user = user.find(u => u.email === email && u.password === password);

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



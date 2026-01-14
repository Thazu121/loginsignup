const signInForm = document.getElementById("signIn");
const message = document.getElementById("message");
const passwordInput = document.getElementById("loginPassword");
const toggle = document.querySelector(".eye-toggle");
const forgotPasswordLink = document.getElementById("forgotPassword");

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

if (toggle) {
  toggle.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password"
    passwordInput.type = isHidden ? "text" : "password"
    toggle.textContent = isHidden ? "🙈" : "👁️"
  });
}

signInForm.addEventListener("submit", e => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase()
  const password = passwordInput.value.trim()
  const users = JSON.parse(localStorage.getItem("m")) || []

  if (!email || !password) {
    return showMessage("Please fill in all fields", "error")
  }

  if (users.length === 0) {
    return showMessage("No registered users found. Please sign up first.", "error")
  }

  const validUser = users.find(
    u => u.email === email && u.password === password
  )

  if (!validUser) {
    return showMessage("Invalid email or password", "error")
  }

  localStorage.setItem("loggedInUser", JSON.stringify(validUser))
  showMessage("Login successful!", "success")

  setTimeout(() => {
    window.location.href = "tourist-landing.html"
  }, 1000);
});

forgotPasswordLink.addEventListener("click", e => {
  e.preventDefault();

  const emailInput = prompt("Enter your registered email:")
  if (!emailInput) return alert("Email is required!")

  const email = emailInput.trim().toLowerCase()
  const users = JSON.parse(localStorage.getItem("m")) || []

  const user = users.find(u => u.email === email)
  if (!user) return alert("No user found with that email.")

  const newPassword = prompt(
    "Enter new password (min 8 chars, 1 uppercase, 1 number, 1 special char):"
  )

  if (!newPassword) return alert("Password is required!")

  if (!PASSWORD_REGEX.test(newPassword)) {
    return alert("Password must meet all requirements.")
  }

  user.password = newPassword
  localStorage.setItem("m", JSON.stringify(users))

  alert("Password reset successful! You can now sign in.")
});

function showMessage(text, type) {
  message.textContent = text
  message.style.color = type === "error" ? "red" : "green"
}

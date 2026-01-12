const signInForm = document.getElementById("signIn")
const message = document.getElementById("message")
const togglePassword = document.getElementById("togglePassword")
const passwordInput = document.getElementById("loginPassword")


document.querySelector('.eye-toggle').addEventListener('click', function () {
    const password = document.getElementById('loginPassword');
    if (password.type === 'password') {
        password.type = 'text';
        this.textContent = '🙈';
    } else {
        password.type = 'password';
        this.textContent = '👁️';
    }
});
signInForm.addEventListener("submit", e => {
    e.preventDefault()

    const email = document.getElementById("email").value.trim().toLowerCase()
    const password = passwordInput.value.trim()

    const users = JSON.parse(localStorage.getItem("m")) || []

    if (users.length === 0) {
        message.textContent = "No registered users found. Please sign up first."
         message.style.color = "red"
         return
    }

    const validUser = users.find(u => u.email === email && u.password === password)

    if (!validUser) {
        message.textContent = "Invalid email or password"; message.style.color = "red"
         return
    }

    message.textContent = "Login successful! "
    message.style.color = "green";

    localStorage.setItem("loggedInUser", JSON.stringify(validUser))

    setTimeout(() => { window.location.href = "tourist-landing.html"; }, 1000)
});

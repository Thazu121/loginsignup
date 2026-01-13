const signInForm = document.getElementById("signIn")
const message = document.getElementById("message")
const passwordInput = document.getElementById("loginPassword")
const toggle = document.querySelector('.eye-toggle')

toggle.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggle.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggle.textContent = '👁️';
    }
});

signInForm.addEventListener("submit", e => {
    e.preventDefault()

    const email = document.getElementById("email").value.trim().toLowerCase()
    const password = passwordInput.value.trim()
    const users = JSON.parse(localStorage.getItem("m")) || []

    
    if (!email || !password) {
        return showMessage("Please fill in all fields", "error")
    }


    if (users.length === 0) return showMessage("No registered users found. Please sign up first.", "error")

    const validUser = users.find(u => u.email === email && u.password === password)
    if (!validUser) return showMessage("Invalid email or password", "error")

    localStorage.setItem("loggedInUser", JSON.stringify(validUser))
    showMessage("Login successful!", "success")
    setTimeout(() => { window.location.href = "tourist-landing.html"; }, 1000)
});

function showMessage(text, type) {
    message.textContent = text
    message.style.color = type === "error" ? "red" : "green"
}


const forgotPasswordLink = document.getElementById("forgotPassword")

forgotPasswordLink.addEventListener("click", e => {
    e.preventDefault();

    const email = prompt("Enter your registered email to reset your password:")

    if (!email) return alert("Email is required!")

    const users = JSON.parse(localStorage.getItem("m")) || []

    const user = users.find(u => u.email === email.trim().toLowerCase())

    if (!user) {
        alert("No user found with that email.")
        return;
    }

    let newPassword = prompt("Enter your new password (min 8 chars, 1 uppercase, 1 number, 1 special char):")

    if (!newPassword) return alert("Password is required!")

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
    if (!passwordRegex.test(newPassword)) {
        alert("Password must be at least 8 characters, include one uppercase letter, one number, and one special character.")
        return
    }

    user.password = newPassword
    localStorage.setItem("m", JSON.stringify(users))

    alert("Password reset successful! You can now sign in with your new password.")
})
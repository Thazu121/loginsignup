
    users: [
        {
            name: "admin",
            email: "admin@example.com",
            phoneNumber: "9897906745",
            city: "kannur",
            password: "asQ@123"
        }
    ]




const signUp = document.getElementById("signUp")
const error = document.getElementById("error")

const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword")

const strength = document.getElementById("strength");
const confirmError = document.getElementById("confirm-error")

let user = JSON.parse(localStorage.getItem("m")) || []



document.querySelectorAll(".eye-toggle").forEach(toggle => {
    toggle.addEventListener("click", () => {
        const input = document.getElementById(toggle.dataset.target);

        if (input.type === "password") {
            input.type = "text";
            toggle.textContent = "🙈";
        } else {
            input.type = "password";
            toggle.textContent = "👁️";
        }
    });
});

passwordInput.addEventListener("input", () => {
    const value = passwordInput.value;

    if (value.length === 0) {
        strength.textContent = "";
        return;
    }

    if (value.length < 6) {
        strength.textContent = "Weak password";
        strength.style.color = "red";
    } 
    else if (/[A-Z]/.test(value) && /[0-9]/.test(value)) {
        strength.textContent = "Strong password";
        strength.style.color = "green";
    } 
    else {
        strength.textContent = "Medium password";
        strength.style.color = "orange";
    }
});

function checkPasswordMatch() {
    if (confirmPasswordInput.value === "") {
        confirmError.textContent = "";
        return;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
        confirmError.textContent = "Passwords do not match";
        confirmError.style.color = "red";
    } else {
        confirmError.textContent = "Passwords match";
        confirmError.style.color = "green";
    }
}

passwordInput.addEventListener("input", checkPasswordMatch);
confirmPasswordInput.addEventListener("input", checkPasswordMatch);

signUp.addEventListener("submit", (e) => {
    e.preventDefault();
    
    error.textContent = "";

    const name = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const city = document.getElementById("location").value.trim();
    const password = passwordInput.value.trim();
    const confirm = confirmPasswordInput.value.trim();

    if (!name || !email || !phoneNumber || !city || !password || !confirm) {
        error.textContent = "All fields are required";
        error.style.color = "red";
        return;
    }

    if (name.length < 3) {
        error.textContent = "Name must be at least 3 characters long";
        error.style.color = "red";
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        error.textContent = "Invalid email address";
        error.style.color = "red";
        return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
        error.textContent = "Phone number must be 10 digits";
        error.style.color = "red";
        return;
    }

    if (!/^[A-Za-z\s]{2,}$/.test(city)) {
        error.textContent = "City name must contain only letters";
        error.style.color = "red";
        return;
    }

    if (
        password.length < 6 ||
        !/[A-Z]/.test(password) ||
        !/[0-9]/.test(password)||
        !/[!@#$%^&*(),.?":{}|<>]/.test(password)

    ) {
        error.textContent =
        "Password must be at least 6 characters, include one uppercase letter, one number, and one special character";
        error.style.color = "red";
        return;
    }

    if (password !== confirm) {
        error.textContent = "Passwords do not match";
        error.style.color = "red";
        return;
    }
const exists = user.some(u => u.email === email);
if (exists) {
    error.textContent = "Email already registered";
    error.style.color = "red";
    return;
}

    error.textContent = "Signup successful!";
    error.style.color = "green";

user.push({
    name,
    email,
    phoneNumber,
    city,
    password
});

localStorage.setItem("m", JSON.stringify(user));

    signUp.reset();
    strength.textContent = "";
    confirmError.textContent = "";
})


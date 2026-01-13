if (!localStorage.getItem("m")) {
    localStorage.setItem(
        "m",
        JSON.stringify([
            {
                name: "Admin",
                email: "admin@example.com",
                phoneNumber: "9897906745",
                city: "Kannur",
                password: "asQ@1234",
            },
        ])
    );
}

function showMessage(element, text, type) {
    element.textContent = text;
    element.style.color = type === "error" ? "red" : "green";
}

function togglePassword(input, toggleButton) {
    if (input.type === "password") {
        input.type = "text";
        toggleButton.textContent = "🙈";
    } else {
        input.type = "password";
        toggleButton.textContent = "👁️";
    }
}

const signUpForm = document.getElementById("signUp");
if (signUpForm) {
    const error = document.getElementById("error");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const strength = document.getElementById("strength");
    const confirmError = document.getElementById("confirm-error");

    let users = JSON.parse(localStorage.getItem("m")) || [];

    document.querySelectorAll(".eye-toggle").forEach((toggle) => {
        toggle.addEventListener("click", () => {
            const input = document.getElementById(toggle.dataset.target);
            togglePassword(input, toggle);
        });
    });

    passwordInput.addEventListener("input", () => {
        const value = passwordInput.value.trim();
        if (!value) {
            strength.textContent = "";
            return;
        }
        if (value.length < 8) {
            strength.textContent = "Weak password";
            strength.style.color = "red";
        } else if (
            /[A-Z]/.test(value) &&
            /[0-9]/.test(value) &&
            /[!@#$%^&*(),.?":{}|<>]/.test(value)
        ) {
            strength.textContent = "Strong password";
            strength.style.color = "green";
        } else {
            strength.textContent = "Medium password";
            strength.style.color = "orange";
        }
    });

    // Confirm password match
    function checkPasswordMatch() {
        if (!confirmPasswordInput.value) {
            confirmError.textContent = "";
            return;
        }
        if (passwordInput.value !== confirmPasswordInput.value) {
            showMessage(confirmError, "Passwords do not match", "error");
        } else {
            showMessage(confirmError, "Passwords match", "success");
        }
    }

    passwordInput.addEventListener("input", checkPasswordMatch);
    confirmPasswordInput.addEventListener("input", checkPasswordMatch);

    // Form submit
    signUpForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const phoneNumber = document.getElementById("phoneNumber").value.trim();
        const city = document.getElementById("location").value.trim();
        const password = passwordInput.value.trim();
        const confirm = confirmPasswordInput.value.trim();

        // Required fields
        if (!name || !email || !phoneNumber || !city || !password || !confirm) {
            return showMessage(error, "All fields are required", "error");
        }

        // Name validation
        if (name.length < 3) return showMessage(error, "Name must be at least 3 characters", "error");

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return showMessage(error, "Invalid email address", "error");

        // Phone validation (optional country code)
        const normalizedPhone = phoneNumber.replace(/[\s\-()]/g, "");
        const phoneRegex = /^(\+\d{1,3})?\d{10}$/;
        if (!phoneRegex.test(normalizedPhone)) {
            return showMessage(
                error,
                "Enter a valid phone number with 10 digits. You may include a country code like +1 or +91.",
                "error"
            );
        }

        const letterCount = city.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ]/g, "").length;
        if (letterCount < 2) return showMessage(error, "City name must contain at least 2 letters", "error");
        if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/.test(city)) {
            return showMessage(
                error,
                "City name can only contain letters, spaces, hyphens, or apostrophes",
                "error"
            );
        }

        if (
            password.length < 8 ||
            !/[A-Z]/.test(password) ||
            !/[0-9]/.test(password) ||
            !/[!@#$%^&*(),.?":{}|<>]/.test(password)
        ) {
            return showMessage(
                error,
                "Password must be at least 8 characters, include one uppercase letter, one number, and one special character",
                "error"
            )
        }

        if (password !== confirm) return showMessage(error, "Passwords do not match", "error")

        if (users.some((u) => u.email === email)) return showMessage(error, "Email already registered", "error")

        users.push({ name, email, phoneNumber: normalizedPhone, city, password })
        localStorage.setItem("m", JSON.stringify(users))

        showMessage(error, "Signup successful!", "success")

        signUpForm.reset();
        strength.textContent = ""
        confirmError.textContent = ""

        setTimeout(() => {
            window.location.href = "index.html"
        }, 2000)
    })
}

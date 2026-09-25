"use strict";
// =========================
// GET USERS
// =========================
function getUsers() {
    const users = localStorage.getItem("lifetrack_users");
    if (!users) {
        return [];
    }
    return JSON.parse(users);
}
// =========================
// SAVE USERS
// =========================
function saveUsers(users) {
    localStorage.setItem("lifetrack_users", JSON.stringify(users));
}
// =========================
// LOGIN
// =========================
function loginUser(event) {
    event.preventDefault();
    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const users = getUsers();
    const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password);
    if (!user) {
        showToast("Invalid email or password.");
        return;
    }
    localStorage.setItem("lifetrack_current_user", JSON.stringify(user));
    showToast("Login successful!");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 700);
}
// =========================
// SIGNUP
// =========================
function signupUser(event) {
    event.preventDefault();
    const nameInput = document.getElementById("signupName");
    const emailInput = document.getElementById("signupEmail");
    const passwordInput = document.getElementById("signupPassword");
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const users = getUsers();
    const existingUser = users.find((item) => item.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        showToast("An account with this email already exists.");
        return;
    }
    const newUser = {
        name,
        email,
        password
    };
    users.push(newUser);
    saveUsers(users);
    localStorage.setItem("lifetrack_current_user", JSON.stringify(newUser));
    showToast("Account created successfully!");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 700);
}
// =========================
// GOOGLE LOGIN
// =========================
function googleLogin() {
    showToast("Google Login will be connected with Firebase later.");
}
// =========================
// FORGOT PASSWORD
// =========================
function forgotPassword(event) {
    event.preventDefault();
    showToast("Password recovery will be added with Firebase.");
}
// =========================
// SHOW SIGNUP
// =========================
function showSignup() {
    const login = document.getElementById("loginForm");
    const signup = document.getElementById("signupForm");
    login?.classList.add("hidden");
    signup?.classList.remove("hidden");
}
// =========================
// SHOW LOGIN
// =========================
function showLogin() {
    const login = document.getElementById("loginForm");
    const signup = document.getElementById("signupForm");
    signup?.classList.add("hidden");
    login?.classList.remove("hidden");
}
// =========================
// PASSWORD VISIBILITY
// =========================
function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        button.textContent = "🙈";
    }
    else {
        input.type = "password";
        button.textContent = "👁";
    }
}
// =========================
// TOAST
// =========================
function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast)
        return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}
function continueAsGuest() {
    localStorage.setItem("lifetrack_guest", "true");
    window.location.href = "index.html";
}
window.continueAsGuest = continueAsGuest;
window.loginUser = loginUser;
window.signupUser = signupUser;
window.googleLogin = googleLogin;
window.forgotPassword = forgotPassword;
window.showSignup = showSignup;
window.showLogin = showLogin;
window.togglePassword = togglePassword;
window.continueAsGuest = continueAsGuest;
//# sourceMappingURL=auth.js.map
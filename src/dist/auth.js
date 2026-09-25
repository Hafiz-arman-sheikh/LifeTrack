// =========================
// GET USERS
// =========================
function getUsers() {
    var users = localStorage.getItem("lifetrack_users");
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
    var emailInput = document.getElementById("loginEmail");
    var passwordInput = document.getElementById("loginPassword");
    var email = emailInput.value.trim();
    var password = passwordInput.value;
    var users = getUsers();
    var user = users.find(function (item) {
        return item.email.toLowerCase() === email.toLowerCase() &&
            item.password === password;
    });
    if (!user) {
        showToast("Invalid email or password.");
        return;
    }
    localStorage.setItem("lifetrack_current_user", JSON.stringify(user));
    showToast("Login successful!");
    setTimeout(function () {
        window.location.href = "index.html";
    }, 700);
}
// =========================
// SIGNUP
// =========================
function signupUser(event) {
    event.preventDefault();
    var nameInput = document.getElementById("signupName");
    var emailInput = document.getElementById("signupEmail");
    var passwordInput = document.getElementById("signupPassword");
    var name = nameInput.value.trim();
    var email = emailInput.value.trim();
    var password = passwordInput.value;
    var users = getUsers();
    var existingUser = users.find(function (item) {
        return item.email.toLowerCase() === email.toLowerCase();
    });
    if (existingUser) {
        showToast("An account with this email already exists.");
        return;
    }
    var newUser = {
        name: name,
        email: email,
        password: password
    };
    users.push(newUser);
    saveUsers(users);
    localStorage.setItem("lifetrack_current_user", JSON.stringify(newUser));
    showToast("Account created successfully!");
    setTimeout(function () {
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
    var login = document.getElementById("loginForm");
    var signup = document.getElementById("signupForm");
    login === null || login === void 0 ? void 0 : login.classList.add("hidden");
    signup === null || signup === void 0 ? void 0 : signup.classList.remove("hidden");
}
// =========================
// SHOW LOGIN
// =========================
function showLogin() {
    var login = document.getElementById("loginForm");
    var signup = document.getElementById("signupForm");
    signup === null || signup === void 0 ? void 0 : signup.classList.add("hidden");
    login === null || login === void 0 ? void 0 : login.classList.remove("hidden");
}
// =========================
// PASSWORD VISIBILITY
// =========================
function togglePassword(inputId, button) {
    var input = document.getElementById(inputId);
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
    var toast = document.getElementById("toast");
    if (!toast)
        return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(function () {
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

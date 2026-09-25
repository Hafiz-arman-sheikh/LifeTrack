interface User {
  name: string;
  email: string;
  password: string;
}


// =========================
// GET USERS
// =========================

function getUsers(): User[] {
  const users = localStorage.getItem("lifetrack_users");

  if (!users) {
    return [];
  }

  return JSON.parse(users);
}


// =========================
// SAVE USERS
// =========================

function saveUsers(users: User[]): void {
  localStorage.setItem(
    "lifetrack_users",
    JSON.stringify(users)
  );
}


// =========================
// LOGIN
// =========================

function loginUser(event: SubmitEvent): void {

  event.preventDefault();

  const emailInput =
    document.getElementById("loginEmail") as HTMLInputElement;

  const passwordInput =
    document.getElementById("loginPassword") as HTMLInputElement;


  const email = emailInput.value.trim();
  const password = passwordInput.value;


  const users = getUsers();

  const user = users.find(
    (item) =>
      item.email.toLowerCase() === email.toLowerCase() &&
      item.password === password
  );


  if (!user) {

    showToast(
      "Invalid email or password."
    );

    return;
  }


  localStorage.setItem(
    "lifetrack_current_user",
    JSON.stringify(user)
  );


  showToast("Login successful!");

  setTimeout(() => {

    window.location.href = "index.html";

  }, 700);
}


// =========================
// SIGNUP
// =========================

function signupUser(event: SubmitEvent): void {

  event.preventDefault();


  const nameInput =
    document.getElementById("signupName") as HTMLInputElement;

  const emailInput =
    document.getElementById("signupEmail") as HTMLInputElement;

  const passwordInput =
    document.getElementById("signupPassword") as HTMLInputElement;


  const name = nameInput.value.trim();

  const email = emailInput.value.trim();

  const password = passwordInput.value;


  const users = getUsers();


  const existingUser = users.find(
    (item) =>
      item.email.toLowerCase() === email.toLowerCase()
  );


  if (existingUser) {

    showToast(
      "An account with this email already exists."
    );

    return;
  }


  const newUser: User = {

    name,

    email,

    password

  };


  users.push(newUser);

  saveUsers(users);


  localStorage.setItem(
    "lifetrack_current_user",
    JSON.stringify(newUser)
  );


  showToast(
    "Account created successfully!"
  );


  setTimeout(() => {

    window.location.href = "index.html";

  }, 700);
}


// =========================
// GOOGLE LOGIN
// =========================

function googleLogin(): void {

  showToast(
    "Google Login will be connected with Firebase later."
  );
}


// =========================
// FORGOT PASSWORD
// =========================

function forgotPassword(
  event: MouseEvent
): void {

  event.preventDefault();

  showToast(
    "Password recovery will be added with Firebase."
  );
}


// =========================
// SHOW SIGNUP
// =========================

function showSignup(): void {

  const login =
    document.getElementById("loginForm");

  const signup =
    document.getElementById("signupForm");


  login?.classList.add("hidden");

  signup?.classList.remove("hidden");
}


// =========================
// SHOW LOGIN
// =========================

function showLogin(): void {

  const login =
    document.getElementById("loginForm");

  const signup =
    document.getElementById("signupForm");


  signup?.classList.add("hidden");

  login?.classList.remove("hidden");
}


// =========================
// PASSWORD VISIBILITY
// =========================

function togglePassword(
  inputId: string,
  button: HTMLButtonElement
): void {

  const input =
    document.getElementById(
      inputId
    ) as HTMLInputElement;


  if (input.type === "password") {

    input.type = "text";

    button.textContent = "🙈";

  } else {

    input.type = "password";

    button.textContent = "👁";

  }
}


// =========================
// TOAST
// =========================

function showToast(message: string): void {

  const toast =
    document.getElementById("toast");


  if (!toast) return;


  toast.textContent = message;

  toast.classList.add("show");


  setTimeout(() => {

    toast.classList.remove("show");

  }, 2500);
}


function continueAsGuest(): void {

    localStorage.setItem(
        "lifetrack_guest",
        "true"
    );

    window.location.href = "index.html";
}

(window as any).continueAsGuest = continueAsGuest;

(window as any).loginUser = loginUser;
(window as any).signupUser = signupUser;
(window as any).googleLogin = googleLogin;
(window as any).forgotPassword = forgotPassword;
(window as any).showSignup = showSignup;
(window as any).showLogin = showLogin;
(window as any).togglePassword = togglePassword;
(window as any).continueAsGuest = continueAsGuest;
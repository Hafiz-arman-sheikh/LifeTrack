"use strict";
// =====================================================
// LifeTrack
// Personal / Family / Business Reminder System
// =====================================================
// ================= TYPES =================
const currentUser = localStorage.getItem("lifetrack_current_user");
const guestMode = localStorage.getItem("lifetrack_guest");
if (!currentUser && !guestMode) {
    window.location.href =
        "login.html";
}
// ================= TRANSLATIONS =================
const translations = {
    en: {
        dashboard: "Dashboard",
        reminders: "Reminders",
        categories: "Categories",
        history: "History",
        darkMode: "Dark Mode",
        language: "Language",
        welcomeBack: "Welcome back",
        goodMorning: "Good Morning",
        dashboardSubtitle: "Here's what needs your attention.",
        addReminder: "Add Reminder",
        activeReminders: "Active Reminders",
        dueSoon: "Due Soon",
        overdue: "Overdue",
        completed: "Completed",
        upcoming: "Upcoming",
        upcomingSubtitle: "Your next important reminders",
        viewAll: "View All",
        allReminders: "All Reminders",
        manageReminders: "Manage everything in one place.",
        newReminder: "New Reminder"
    },
    roman: {
        dashboard: "Dashboard",
        reminders: "Reminders",
        categories: "Categories",
        history: "History",
        darkMode: "Dark Mode",
        language: "Zaban",
        welcomeBack: "Khush aamdeed",
        goodMorning: "Assalam-o-Alaikum",
        dashboardSubtitle: "Ye cheezein aapki tawajjo chahti hain.",
        addReminder: "Reminder Add Karein",
        activeReminders: "Active Reminders",
        dueSoon: "Jald Aane Wale",
        overdue: "Late Reminders",
        completed: "Mukammal",
        upcoming: "Aane Wale",
        upcomingSubtitle: "Aap ke important reminders",
        viewAll: "Sab Dekhein",
        allReminders: "Tamam Reminders",
        manageReminders: "Sab kuch aik jagah manage karein.",
        newReminder: "Naya Reminder"
    }
};
// ================= STATE =================
let reminders = [];
let currentLanguage = "en";
// ================= DOM =================
const modal = document.getElementById("modal");
const reminderForm = document.getElementById("reminderForm");
const openAddReminder = document.getElementById("openAddReminder");
const openAddReminder2 = document.getElementById("openAddReminder2");
const closeModal = document.getElementById("closeModal");
const cancelModal = document.getElementById("cancelModal");
const upcomingList = document.getElementById("upcomingList");
const allRemindersList = document.getElementById("allRemindersList");
const historyList = document.getElementById("historyList");
const themeBtn = document.getElementById("themeBtn");
const languageSelect = document.getElementById("languageSelect");
const notificationBtn = document.getElementById("notificationBtn");
const alarmToast = document.getElementById("alarmToast");
const alarmTitle = document.getElementById("alarmTitle");
const closeAlarm = document.getElementById("closeAlarm");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
// ================= LOCAL STORAGE =================
function loadData() {
    const saved = localStorage.getItem("lifetrack_reminders");
    if (saved) {
        try {
            reminders =
                JSON.parse(saved);
        }
        catch {
            reminders = [];
        }
    }
}
function saveData() {
    localStorage.setItem("lifetrack_reminders", JSON.stringify(reminders));
}
// ================= MODAL =================
function openModal() {
    modal.classList.add("show");
}
function closeModalWindow() {
    modal.classList.remove("show");
    reminderForm.reset();
}
openAddReminder.addEventListener("click", openModal);
openAddReminder2.addEventListener("click", openModal);
closeModal.addEventListener("click", closeModalWindow);
cancelModal.addEventListener("click", closeModalWindow);
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModalWindow();
    }
});
// =========================
// LOAD CURRENT USER
// =========================
function loadUserInfo() {
    const currentUser = localStorage.getItem("lifetrack_current_user");
    const guestMode = localStorage.getItem("lifetrack_guest");
    let userName = "Guest";
    // Logged-in user
    if (currentUser) {
        try {
            const user = JSON.parse(currentUser);
            if (user.name) {
                userName = user.name;
            }
        }
        catch (error) {
            console.log("Could not load user information.");
        }
    }
    // Guest
    else if (guestMode) {
        userName = "Guest";
    }
    // Dashboard greeting
    const welcomeUser = document.getElementById("welcomeUser");
    if (welcomeUser) {
        welcomeUser.textContent =
            `Good Morning, ${userName} 👋`;
    }
    // Top-right name
    const userNameElement = document.getElementById("userName");
    if (userNameElement) {
        userNameElement.textContent =
            userName;
    }
    // Avatar initial
    const userAvatar = document.getElementById("userAvatar");
    if (userAvatar) {
        userAvatar.textContent =
            userName.charAt(0).toUpperCase();
    }
}
// ================= ADD REMINDER =================
reminderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value.trim();
    const category = document.getElementById("category").value;
    const lastDate = document.getElementById("lastDate").value;
    const reminderDate = document.getElementById("reminderDate").value;
    const reminderTime = document.getElementById("reminderTime").value;
    const costValue = document.getElementById("cost").value;
    const notes = document.getElementById("notes").value.trim();
    // -------------------------
    const newReminder = {
        id: crypto.randomUUID(),
        title,
        category,
        lastDate,
        reminderDate,
        reminderTime,
        cost: costValue
            ? Number(costValue)
            : 0,
        notes,
        completed: false,
        alarmTriggered: false,
        createdAt: new Date().toISOString()
    };
    reminders.push(newReminder);
    saveData();
    renderEverything();
    closeModalWindow();
});
// ================= DATE / TIME =================
function getReminderDateTime(reminder) {
    return new Date(`${reminder.reminderDate}T${reminder.reminderTime}`);
}
function formatDate(dateString) {
    if (!dateString) {
        return "Not specified";
    }
    const date = new Date(`${dateString}T00:00:00`);
    return date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}
function formatTime(timeString) {
    const timeParts = timeString.split(":");
    const hour = Number(timeParts[0]);
    const minute = Number(timeParts[1]);
    const date = new Date();
    date.setHours(hour, minute, 0, 0);
    return date.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit"
    });
}
// ================= STATUS =================
function getStatus(reminder) {
    const now = new Date();
    const target = getReminderDateTime(reminder);
    const difference = target.getTime()
        -
            now.getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    if (difference < 0) {
        return "overdue";
    }
    if (difference <= oneDay * 3) {
        return "soon";
    }
    return "upcoming";
}
// ================= CATEGORY =================
function categoryIcon(category) {
    const icons = {
        home: "🏠",
        vehicle: "🚗",
        payment: "💰",
        family: "👨‍👩‍👧",
        business: "💼",
        health: "🏥",
        subscription: "📱",
        document: "📄",
        maintenance: "🔧",
        custom: "🎯"
    };
    return icons[category];
}
function categoryName(category) {
    return category.charAt(0).toUpperCase()
        + category.slice(1);
}
// ================= REMINDER CARD =================
function createReminderCard(reminder) {
    const status = getStatus(reminder);
    const statusText = {
        upcoming: "Upcoming",
        soon: "Due Soon",
        overdue: "Overdue"
    }[status];
    return `

        <article
            class="reminder-card"
            data-id="${reminder.id}"
        >

            <div class="reminder-top">

                <span class="reminder-category">

                    ${categoryIcon(reminder.category)}

                    ${categoryName(reminder.category)}

                </span>

            </div>


            <h3>
                ${escapeHTML(reminder.title)}
            </h3>


            <p>
                ${escapeHTML(reminder.notes || "No notes")}
            </p>


            <div class="reminder-date">

                📅

                ${formatDate(reminder.reminderDate)}

                &nbsp;

                ⏰

                ${formatTime(reminder.reminderTime)}

            </div>


            <div class="reminder-status">

                <span class="status ${status}">
                    ${statusText}
                </span>


                <div class="card-actions">

                    <button
                        onclick="completeReminder('${reminder.id}')"
                        title="Complete"
                    >
                        ✓
                    </button>

                    <button
                        onclick="deleteReminder('${reminder.id}')"
                        title="Delete"
                    >
                        🗑
                    </button>

                </div>

            </div>

        </article>

    `;
}
// ================= ESCAPE HTML =================
function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}
// ================= DASHBOARD =================
function renderDashboard() {
    const active = reminders.filter(reminder => !reminder.completed);
    const dueSoon = active.filter(reminder => getStatus(reminder)
        === "soon");
    const overdue = active.filter(reminder => getStatus(reminder)
        === "overdue");
    const completed = reminders.filter(reminder => reminder.completed);
    document.getElementById("totalReminders").textContent =
        active.length.toString();
    document.getElementById("dueSoon").textContent =
        dueSoon.length.toString();
    document.getElementById("overdue").textContent =
        overdue.length.toString();
    document.getElementById("completed").textContent =
        completed.length.toString();
    const upcoming = active
        .sort((a, b) => getReminderDateTime(a).getTime()
        -
            getReminderDateTime(b).getTime())
        .slice(0, 6);
    if (!upcoming.length) {
        upcomingList.innerHTML = `

            <div class="empty-state">

                <span>📅</span>

                <strong>
                    No reminders yet
                </strong>

                <p>
                    Add your first reminder.
                </p>

            </div>

        `;
        return;
    }
    upcomingList.innerHTML =
        upcoming
            .map(createReminderCard)
            .join("");
}
// ================= ALL REMINDERS =================
function renderAllReminders() {
    const search = searchInput.value
        .toLowerCase()
        .trim();
    const category = categoryFilter.value;
    const filtered = reminders
        .filter(reminder => {
        const matchesSearch = reminder.title
            .toLowerCase()
            .includes(search);
        const matchesCategory = category === "all"
            ||
                reminder.category === category;
        return (matchesSearch
            &&
                matchesCategory);
    })
        .sort((a, b) => getReminderDateTime(a).getTime()
        -
            getReminderDateTime(b).getTime());
    if (!filtered.length) {
        allRemindersList.innerHTML = `

            <div class="empty-state">

                <span>🔎</span>

                No reminders found.

            </div>

        `;
        return;
    }
    allRemindersList.innerHTML =
        filtered
            .map(createReminderCard)
            .join("");
}
// ================= HISTORY =================
function renderHistory() {
    const completed = reminders.filter(reminder => reminder.completed);
    if (!completed.length) {
        historyList.innerHTML = `

            <div class="empty-state">

                <span>↺</span>

                No completed reminders yet.

            </div>

        `;
        return;
    }
    historyList.innerHTML =
        completed
            .map(reminder => `

                <div class="history-item">

                    <div>

                        <strong>
                            ${escapeHTML(reminder.title)}
                        </strong>

                        <p>
                            ${categoryIcon(reminder.category)}
                            ${categoryName(reminder.category)}
                        </p>

                    </div>


                    <span>
                        ✓ Completed
                    </span>

                </div>

            `)
            .join("");
}
// ================= COMPLETE =================
function completeReminder(id) {
    const reminder = reminders.find(item => item.id === id);
    if (!reminder)
        return;
    reminder.completed = true;
    saveData();
    renderEverything();
}
window.completeReminder =
    completeReminder;
// ================= DELETE =================
function deleteReminder(id) {
    const confirmed = confirm("Delete this reminder?");
    if (!confirmed)
        return;
    reminders =
        reminders.filter(reminder => reminder.id !== id);
    saveData();
    renderEverything();
}
window.deleteReminder =
    deleteReminder;
// ================= ALARM SYSTEM =================
function checkAlarms() {
    const now = new Date();
    let changed = false;
    reminders.forEach(reminder => {
        if (reminder.completed
            ||
                reminder.alarmTriggered) {
            return;
        }
        const target = getReminderDateTime(reminder);
        if (now.getTime()
            >=
                target.getTime()) {
            triggerAlarm(reminder);
            reminder.alarmTriggered =
                true;
            changed = true;
        }
    });
    if (changed) {
        saveData();
        renderEverything();
    }
}
// ================= TRIGGER ALARM =================
function triggerAlarm(reminder) {
    alarmTitle.textContent =
        reminder.title;
    alarmToast.classList.add("show");
    playAlarmSound();
    // Browser notification
    if ("Notification" in window
        &&
            Notification.permission ===
                "granted") {
        new Notification("LifeTrack Reminder", {
            body: `${reminder.title} is due now.`,
            icon: ""
        });
    }
    // Browser tab title
    document.title =
        `🔔 ${reminder.title} - LifeTrack`;
}
closeAlarm.addEventListener("click", () => {
    alarmToast.classList.remove("show");
    document.title =
        "LifeTrack";
});
// ================= ALARM SOUND =================
function playAlarmSound() {
    const AudioContextClass = window.AudioContext
        ||
            window.webkitAudioContext;
    if (!AudioContextClass) {
        return;
    }
    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type =
        "sine";
    oscillator.frequency.value =
        880;
    gain.gain.value =
        0.15;
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    setTimeout(() => {
        oscillator.stop();
        audioContext.close();
    }, 700);
}
// ================= NOTIFICATIONS =================
notificationBtn.addEventListener("click", async () => {
    if (!("Notification" in window)) {
        alert("Notifications are not supported in this browser.");
        return;
    }
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
        alert("Notifications enabled!");
    }
});
// ================= THEME =================
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("lifetrack_theme", isDark
        ? "dark"
        : "light");
    const themeIcon = document.getElementById("themeIcon");
    themeIcon.textContent =
        isDark
            ? "☀"
            : "☾";
});
function loadTheme() {
    const saved = localStorage.getItem("lifetrack_theme");
    if (saved === "dark") {
        document.body.classList.add("dark");
        document.getElementById("themeIcon").textContent = "☀";
    }
}
// ================= LANGUAGE =================
languageSelect.addEventListener("change", () => {
    currentLanguage =
        languageSelect.value;
    applyLanguage();
});
function applyLanguage() {
    const dictionary = translations[currentLanguage];
    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {
        const key = element.getAttribute("data-i18n");
        if (dictionary[key]) {
            element.textContent =
                dictionary[key];
        }
    });
    localStorage.setItem("lifetrack_language", currentLanguage);
}
function loadLanguage() {
    const saved = localStorage.getItem("lifetrack_language");
    if (saved
        &&
            translations[saved]) {
        currentLanguage =
            saved;
        languageSelect.value =
            saved;
        applyLanguage();
    }
}
// ================= SEARCH =================
searchInput.addEventListener("input", renderAllReminders);
categoryFilter.addEventListener("change", renderAllReminders);
// ================= NAVIGATION =================
document
    .querySelectorAll(".nav-item[data-page]")
    .forEach(button => {
    button.addEventListener("click", () => {
        const page = button.getAttribute("data-page");
        if (!page)
            return;
        document
            .querySelectorAll(".page")
            .forEach(item => item.classList.remove("active-page"));
        const target = document.getElementById(`${page}Page`);
        target?.classList.add("active-page");
        document
            .querySelectorAll(".nav-item")
            .forEach(item => item.classList.remove("active"));
        button.classList.add("active");
    });
});
// ================= VIEW ALL =================
document
    .getElementById("viewAllBtn")
    ?.addEventListener("click", () => {
    document
        .querySelector('[data-page="reminders"]')
        ?.dispatchEvent(new Event("click"));
});
// ================= RENDER =================
function renderEverything() {
    renderDashboard();
    renderAllReminders();
    renderHistory();
}
// ================= START =================
loadData();
loadTheme();
loadLanguage();
renderEverything();
// Check alarms immediately
checkAlarms();
// Check every second
setInterval(checkAlarms, 1000);
function logoutUser() {
    localStorage.removeItem("lifetrack_current_user");
    window.location.href = "login.html";
}
window.logoutUser = logoutUser;
loadUserInfo();
//# sourceMappingURL=app.js.map
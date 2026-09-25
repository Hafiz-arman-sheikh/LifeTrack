// =====================================================
// LifeTrack
// Personal / Family / Business Reminder System
// =====================================================
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
var _this = this;
// ================= TYPES =================
var currentUser = localStorage.getItem("lifetrack_current_user");
var guestMode = localStorage.getItem("lifetrack_guest");
if (!currentUser && !guestMode) {
    window.location.href =
        "login.html";
}
// ================= TRANSLATIONS =================
var translations = {
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
var reminders = [];
var currentLanguage = "en";
// ================= DOM =================
var modal = document.getElementById("modal");
var reminderForm = document.getElementById("reminderForm");
var openAddReminder = document.getElementById("openAddReminder");
var openAddReminder2 = document.getElementById("openAddReminder2");
var closeModal = document.getElementById("closeModal");
var cancelModal = document.getElementById("cancelModal");
var upcomingList = document.getElementById("upcomingList");
var allRemindersList = document.getElementById("allRemindersList");
var historyList = document.getElementById("historyList");
var themeBtn = document.getElementById("themeBtn");
var languageSelect = document.getElementById("languageSelect");
var notificationBtn = document.getElementById("notificationBtn");
var alarmToast = document.getElementById("alarmToast");
var alarmTitle = document.getElementById("alarmTitle");
var closeAlarm = document.getElementById("closeAlarm");
var searchInput = document.getElementById("searchInput");
var categoryFilter = document.getElementById("categoryFilter");
// ================= LOCAL STORAGE =================
function loadData() {
    var saved = localStorage.getItem("lifetrack_reminders");
    if (saved) {
        try {
            reminders =
                JSON.parse(saved);
        }
        catch (_a) {
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
modal.addEventListener("click", function (event) {
    if (event.target === modal) {
        closeModalWindow();
    }
});
// =========================
// LOAD CURRENT USER
// =========================
function loadUserInfo() {
    var currentUser = localStorage.getItem("lifetrack_current_user");
    var guestMode = localStorage.getItem("lifetrack_guest");
    var userName = "Guest";
    // Logged-in user
    if (currentUser) {
        try {
            var user = JSON.parse(currentUser);
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
    var welcomeUser = document.getElementById("welcomeUser");
    if (welcomeUser) {
        welcomeUser.textContent =
            "Good Morning, " + userName + " \uD83D\uDC4B";
    }
    // Top-right name
    var userNameElement = document.getElementById("userName");
    if (userNameElement) {
        userNameElement.textContent =
            userName;
    }
    // Avatar initial
    var userAvatar = document.getElementById("userAvatar");
    if (userAvatar) {
        userAvatar.textContent =
            userName.charAt(0).toUpperCase();
    }
}
// ================= ADD REMINDER =================
reminderForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var title = document.getElementById("title").value.trim();
    var category = document.getElementById("category").value;
    var lastDate = document.getElementById("lastDate").value;
    var reminderDate = document.getElementById("reminderDate").value;
    var reminderTime = document.getElementById("reminderTime").value;
    var costValue = document.getElementById("cost").value;
    var notes = document.getElementById("notes").value.trim();
    // -------------------------
    var newReminder = {
        id: crypto.randomUUID(),
        title: title,
        category: category,
        lastDate: lastDate,
        reminderDate: reminderDate,
        reminderTime: reminderTime,
        cost: costValue
            ? Number(costValue)
            : 0,
        notes: notes,
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
    return new Date(reminder.reminderDate + "T" + reminder.reminderTime);
}
function formatDate(dateString) {
    if (!dateString) {
        return "Not specified";
    }
    var date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}
function formatTime(timeString) {
    var timeParts = timeString.split(":");
    var hour = Number(timeParts[0]);
    var minute = Number(timeParts[1]);
    var date = new Date();
    date.setHours(hour, minute, 0, 0);
    return date.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit"
    });
}
// ================= STATUS =================
function getStatus(reminder) {
    var now = new Date();
    var target = getReminderDateTime(reminder);
    var difference = target.getTime()
        -
            now.getTime();
    var oneDay = 24 * 60 * 60 * 1000;
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
    var icons = {
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
    var status = getStatus(reminder);
    var statusText = {
        upcoming: "Upcoming",
        soon: "Due Soon",
        overdue: "Overdue"
    }[status];
    return "\n\n        <article\n            class=\"reminder-card\"\n            data-id=\"" + reminder.id + "\"\n        >\n\n            <div class=\"reminder-top\">\n\n                <span class=\"reminder-category\">\n\n                    " + categoryIcon(reminder.category) + "\n\n                    " + categoryName(reminder.category) + "\n\n                </span>\n\n            </div>\n\n\n            <h3>\n                " + escapeHTML(reminder.title) + "\n            </h3>\n\n\n            <p>\n                " + escapeHTML(reminder.notes || "No notes") + "\n            </p>\n\n\n            <div class=\"reminder-date\">\n\n                \uD83D\uDCC5\n\n                " + formatDate(reminder.reminderDate) + "\n\n                &nbsp;\n\n                \u23F0\n\n                " + formatTime(reminder.reminderTime) + "\n\n            </div>\n\n\n            <div class=\"reminder-status\">\n\n                <span class=\"status " + status + "\">\n                    " + statusText + "\n                </span>\n\n\n                <div class=\"card-actions\">\n\n                    <button\n                        onclick=\"completeReminder('" + reminder.id + "')\"\n                        title=\"Complete\"\n                    >\n                        \u2713\n                    </button>\n\n                    <button\n                        onclick=\"deleteReminder('" + reminder.id + "')\"\n                        title=\"Delete\"\n                    >\n                        \uD83D\uDDD1\n                    </button>\n\n                </div>\n\n            </div>\n\n        </article>\n\n    ";
}
// ================= ESCAPE HTML =================
function escapeHTML(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}
// ================= DASHBOARD =================
function renderDashboard() {
    var active = reminders.filter(function (reminder) {
        return !reminder.completed;
    });
    var dueSoon = active.filter(function (reminder) {
        return getStatus(reminder)
            === "soon";
    });
    var overdue = active.filter(function (reminder) {
        return getStatus(reminder)
            === "overdue";
    });
    var completed = reminders.filter(function (reminder) {
        return reminder.completed;
    });
    document.getElementById("totalReminders").textContent =
        active.length.toString();
    document.getElementById("dueSoon").textContent =
        dueSoon.length.toString();
    document.getElementById("overdue").textContent =
        overdue.length.toString();
    document.getElementById("completed").textContent =
        completed.length.toString();
    var upcoming = active
        .sort(function (a, b) {
        return getReminderDateTime(a).getTime()
            -
                getReminderDateTime(b).getTime();
    })
        .slice(0, 6);
    if (!upcoming.length) {
        upcomingList.innerHTML = "\n\n            <div class=\"empty-state\">\n\n                <span>\uD83D\uDCC5</span>\n\n                <strong>\n                    No reminders yet\n                </strong>\n\n                <p>\n                    Add your first reminder.\n                </p>\n\n            </div>\n\n        ";
        return;
    }
    upcomingList.innerHTML =
        upcoming
            .map(createReminderCard)
            .join("");
}
// ================= ALL REMINDERS =================
function renderAllReminders() {
    var search = searchInput.value
        .toLowerCase()
        .trim();
    var category = categoryFilter.value;
    var filtered = reminders
        .filter(function (reminder) {
        var matchesSearch = reminder.title
            .toLowerCase()
            .includes(search);
        var matchesCategory = category === "all"
            ||
                reminder.category === category;
        return (matchesSearch
            &&
                matchesCategory);
    })
        .sort(function (a, b) {
        return getReminderDateTime(a).getTime()
            -
                getReminderDateTime(b).getTime();
    });
    if (!filtered.length) {
        allRemindersList.innerHTML = "\n\n            <div class=\"empty-state\">\n\n                <span>\uD83D\uDD0E</span>\n\n                No reminders found.\n\n            </div>\n\n        ";
        return;
    }
    allRemindersList.innerHTML =
        filtered
            .map(createReminderCard)
            .join("");
}
// ================= HISTORY =================
function renderHistory() {
    var completed = reminders.filter(function (reminder) {
        return reminder.completed;
    });
    if (!completed.length) {
        historyList.innerHTML = "\n\n            <div class=\"empty-state\">\n\n                <span>\u21BA</span>\n\n                No completed reminders yet.\n\n            </div>\n\n        ";
        return;
    }
    historyList.innerHTML =
        completed
            .map(function (reminder) { return "\n\n                <div class=\"history-item\">\n\n                    <div>\n\n                        <strong>\n                            " + escapeHTML(reminder.title) + "\n                        </strong>\n\n                        <p>\n                            " + categoryIcon(reminder.category) + "\n                            " + categoryName(reminder.category) + "\n                        </p>\n\n                    </div>\n\n\n                    <span>\n                        \u2713 Completed\n                    </span>\n\n                </div>\n\n            "; })
            .join("");
}
// ================= COMPLETE =================
function completeReminder(id) {
    var reminder = reminders.find(function (item) {
        return item.id === id;
    });
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
    var confirmed = confirm("Delete this reminder?");
    if (!confirmed)
        return;
    reminders =
        reminders.filter(function (reminder) {
            return reminder.id !== id;
        });
    saveData();
    renderEverything();
}
window.deleteReminder =
    deleteReminder;
// ================= ALARM SYSTEM =================
function checkAlarms() {
    var now = new Date();
    var changed = false;
    reminders.forEach(function (reminder) {
        if (reminder.completed
            ||
                reminder.alarmTriggered) {
            return;
        }
        var target = getReminderDateTime(reminder);
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
            body: reminder.title + " is due now.",
            icon: ""
        });
    }
    // Browser tab title
    document.title =
        "\uD83D\uDD14 " + reminder.title + " - LifeTrack";
}
closeAlarm.addEventListener("click", function () {
    alarmToast.classList.remove("show");
    document.title =
        "LifeTrack";
});
// ================= ALARM SOUND =================
function playAlarmSound() {
    var AudioContextClass = window.AudioContext
        ||
            window.webkitAudioContext;
    if (!AudioContextClass) {
        return;
    }
    var audioContext = new AudioContextClass();
    var oscillator = audioContext.createOscillator();
    var gain = audioContext.createGain();
    oscillator.type =
        "sine";
    oscillator.frequency.value =
        880;
    gain.gain.value =
        0.15;
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    setTimeout(function () {
        oscillator.stop();
        audioContext.close();
    }, 700);
}
// ================= NOTIFICATIONS =================
notificationBtn.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
    var permission;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!("Notification" in window)) {
                    alert("Notifications are not supported in this browser.");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, Notification.requestPermission()];
            case 1:
                permission = _a.sent();
                if (permission === "granted") {
                    alert("Notifications enabled!");
                }
                return [2 /*return*/];
        }
    });
}); });
// ================= THEME =================
themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    var isDark = document.body.classList.contains("dark");
    localStorage.setItem("lifetrack_theme", isDark
        ? "dark"
        : "light");
    var themeIcon = document.getElementById("themeIcon");
    themeIcon.textContent =
        isDark
            ? "☀"
            : "☾";
});
function loadTheme() {
    var saved = localStorage.getItem("lifetrack_theme");
    if (saved === "dark") {
        document.body.classList.add("dark");
        document.getElementById("themeIcon").textContent = "☀";
    }
}
// ================= LANGUAGE =================
languageSelect.addEventListener("change", function () {
    currentLanguage =
        languageSelect.value;
    applyLanguage();
});
function applyLanguage() {
    var dictionary = translations[currentLanguage];
    document
        .querySelectorAll("[data-i18n]")
        .forEach(function (element) {
        var key = element.getAttribute("data-i18n");
        if (dictionary[key]) {
            element.textContent =
                dictionary[key];
        }
    });
    localStorage.setItem("lifetrack_language", currentLanguage);
}
function loadLanguage() {
    var saved = localStorage.getItem("lifetrack_language");
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
    .forEach(function (button) {
    button.addEventListener("click", function () {
        var page = button.getAttribute("data-page");
        if (!page)
            return;
        document
            .querySelectorAll(".page")
            .forEach(function (item) {
            return item.classList.remove("active-page");
        });
        var target = document.getElementById(page + "Page");
        target === null || target === void 0 ? void 0 : target.classList.add("active-page");
        document
            .querySelectorAll(".nav-item")
            .forEach(function (item) {
            return item.classList.remove("active");
        });
        button.classList.add("active");
    });
});
// ================= VIEW ALL =================
(_a = document
    .getElementById("viewAllBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    var _a;
    (_a = document
        .querySelector('[data-page="reminders"]')) === null || _a === void 0 ? void 0 : _a.dispatchEvent(new Event("click"));
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

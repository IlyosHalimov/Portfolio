// Til almashtirish funksiyasi
const translations = {
    uz: {
        home: "Bosh sahifa",
        about: "Men haqimda",
        projects: "Loyihalar",
        skills: "Ko‘nikmalar",
        contact: "Aloqa",
        welcome: "Xush kelibsiz!",
        intro: "Bu mening shaxsiy portfoliom — QR CODE.",
        "about-text": "Men Halimov Ilyos, frontend va Python dasturchisiman.",
        send: "Yuborish"
    },
    en: {
        home: "Home",
        about: "About",
        projects: "Projects",
        skills: "Skills",
        contact: "Contact",
        welcome: "Welcome!",
        intro: "This is my personal portfolio — QR CODE.",
        "about-text": "I am Ilyos Halimov, a frontend and Python developer.",
        send: "Send"
    }
};

const switcher = document.getElementById("language-switcher");

// Tilni o‘zgartirish funksiyasi
function setLanguage(lang) {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    // Tanlangan tilni saqlab qo‘yish
    localStorage.setItem("selectedLanguage", lang);
}

// Tilni almashtirish event
switcher.addEventListener("change", (e) => {
    const lang = e.target.value;
    setLanguage(lang);
});

// Sayt yuklanganda — saqlangan tilni tiklash
window.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("selectedLanguage") || "uz";
    switcher.value = savedLang;
    setLanguage(savedLang);
});
// Loyihalarni yuklash funksiyasi
function loadProjects() {
    fetch("data/projects.json")
        .then((res) => res.json())
        .then((projects) => {
            const container = document.querySelector(".project-list");
            container.innerHTML = "";

            projects.forEach((proj, index) => {
                const techList = proj.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join(" ");
                const card = document.createElement("div");
                card.className = "project-card";

                // ✅ AOS atributlari
                card.setAttribute("data-aos", "fade-up");
                card.setAttribute("data-aos-delay", `${index * 200}`);

                card.innerHTML = `
          <img src="${proj.image}" alt="${proj.title}" class="project-image">
          <h3>${proj.title}</h3>
          <p>${proj.description}</p>
          <div class="tech-list">${techList}</div>
          <a href="${proj.link}" target="_blank" class="view-button">Ko‘rish</a>
        `;
                container.appendChild(card);
            });
        })
        .catch((err) => {
            console.error("Loyihalarni yuklashda xatolik:", err);
        });
}
window.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("selectedLanguage") || "uz";
    switcher.value = savedLang;
    setLanguage(savedLang);
    loadProjects(); // 👌 bu yerda to‘g‘ri chaqirilyapti
});
// Ko‘nikmalarni yuklash funksiyasi
function loadSkills() {
    fetch("data/skills.json")
        .then(res => res.json())
        .then(skills => {
            const skillSection = document.querySelector("#skills ul");
            skillSection.innerHTML = "";
            skills.forEach(skill => {
                const li = document.createElement("li");
                li.textContent = skill;
                skillSection.appendChild(li);
            });
        })
        .catch(err => {
            console.error("Ko‘nikmalarni yuklashda xatolik:", err);
        });
}
window.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("selectedLanguage") || "uz";
    switcher.value = savedLang;
    setLanguage(savedLang);
    loadProjects();
    loadSkills(); // 👉 Qo‘shildi!
});
// AOS (Animate On Scroll) kutubxonasini ishga tushirish
AOS.init({
    duration: 1000, // animatsiya davomiyligi (ms)
    once: true      // faqat bir marta animatsiya bo'lsin
});
// Dark mode funksiyasi
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// LocalStorage’dan saqlangan holatni tiklash
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    body.classList.toggle("light", savedTheme === "light");
    themeToggle.textContent = savedTheme === "light" ? "🌙" : "☀️";
}

// Tugma bosilganda rejimni o‘zgartirish
themeToggle.addEventListener("click", () => {
    const isLight = body.classList.toggle("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    themeToggle.textContent = isLight ? "🌙" : "☀️";
});
// Scroll bo'limlarga o'tganda faollikni kursatish uchun.
const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll("nav a");

function updateActiveLink() {
    let currentSectionId = "";

    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        // Bo‘limning yuqori qismi viewportning 150px pastidan yuqorida va bo‘lim hali tugamagan bo‘lsa
        if (rect.top <= 150 && rect.bottom >= 150) {
            currentSectionId = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSectionId}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("DOMContentLoaded", updateActiveLink);
// Tugmani bosganda menyuni ochish
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});
// Ko‘nikmalar (Skills) bo‘limiga progress bar qo‘shamiz
window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".progress-bar").forEach((bar) => {
        const width = bar.style.width;
        bar.style.width = "0"; // boshlanish 0
        setTimeout(() => {
            bar.style.width = width; // animatsiyali to‘ladi
        }, 300);
    });
});
// Yuborilmoqda... animatsiyasi (Contact form uchun)
const contactForm = document.getElementById("contact-form");
const sendButton = document.getElementById("send-button");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // reload bo‘lishining oldini olamiz

    const originalText = sendButton.textContent;
    sendButton.textContent = "⏳ Yuborilmoqda...";
    sendButton.disabled = true;

    // Sun'iy kechikish (masalan: 2 soniya)
    setTimeout(() => {
        sendButton.textContent = "✅ Yuborildi!";

        // 3 soniyadan so‘ng qayta tiklash
        setTimeout(() => {
            sendButton.textContent = originalText;
            sendButton.disabled = false;
            contactForm.reset(); // formani tozalash
        }, 3000);

    }, 2000);
});
// git pull --rebase origin main
// git push origin main

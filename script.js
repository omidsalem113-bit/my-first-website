const body = document.body;
const themeToggle = document.getElementById("theme-toggle");
const themeLabel = document.getElementById("theme-label");
const toast = document.getElementById("toast");

function setTheme(theme) {
  const isLight = theme === "light";
  body.classList.toggle("light", isLight);
  themeLabel.textContent = isLight ? "Dark Mode" : "Light Mode";
  localStorage.setItem("theme", theme);
  document.querySelector('meta[name="theme-color"]').setAttribute(
    "content",
    isLight ? "#ffffff" : "#050505"
  );
}

const savedTheme = localStorage.getItem("theme");
setTheme(savedTheme || "dark");

themeToggle.addEventListener("click", () => {
  setTheme(body.classList.contains("light") ? "dark" : "light");
});

document.querySelectorAll(".reveal-card").forEach((card) => {
  card.addEventListener("click", () => {
    const target = document.getElementById(card.dataset.target);
    const isHidden = target.hidden;

    document.querySelectorAll(".details").forEach((detail) => {
      detail.hidden = true;
    });

    target.hidden = !isHidden;
  });
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      showToast("Copied");
    } catch {
      showToast("Copy is not available");
    }
  });
});

document.getElementById("save-contact").addEventListener("click", () => {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Omid Salem",
    "TEL;TYPE=CELL:09046870221",
    "EMAIL:omidsalem113@gmail.com",
    "X-SOCIALPROFILE;TYPE=instagram:https://instagram.com/omid_.slm",
    "X-SOCIALPROFILE;TYPE=telegram:https://t.me/Omid_st116",
    "END:VCARD"
  ].join("\r\n");

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Omid-Salem.vcf";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
});

let toastTimer;
function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1500);
}

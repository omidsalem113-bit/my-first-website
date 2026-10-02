const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");

function applyTheme(theme) {
  root.dataset.theme = theme;
  themeLabel.textContent = theme === "dark" ? "Light" : "Dark";
  localStorage.setItem("nfc-theme", theme);
}

const savedTheme = localStorage.getItem("nfc-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
applyTheme(savedTheme || preferredTheme);

themeToggle.addEventListener("click", () => {
  applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

document.querySelectorAll(".expandable").forEach((card) => {
  const head = card.querySelector(".card-head");

  head.addEventListener("click", () => {
    const isOpen = card.classList.toggle("open");
    head.setAttribute("aria-expanded", String(isOpen));
  });
});

document.getElementById("copyPhone").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("09046870221");
    const button = document.getElementById("copyPhone");
    const oldText = button.textContent;
    button.textContent = "Copied";
    setTimeout(() => button.textContent = oldText, 1200);
  } catch {
    alert("Copy is not available in this browser.");
  }
});

document.getElementById("saveContact").addEventListener("click", () => {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Omid Salem",
    "TEL;TYPE=CELL:09046870221",
    "EMAIL:omidsalem113@gmail.com",
    "X-SOCIALPROFILE;TYPE=instagram:https://instagram.com/omid_.slm",
    "X-SOCIALPROFILE;TYPE=telegram:https://t.me/Omid_st116",
    "X-SOCIALPROFILE;TYPE=eitaa:https://eitaa.com/Omid_st116",
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

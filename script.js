const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("nfc-theme", theme);
  themeLabel.textContent = theme === "dark" ? "Light" : "Dark";
}

const savedTheme = localStorage.getItem("nfc-theme");
setTheme(savedTheme || "light");

themeToggle.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

document.querySelectorAll(".expandable .card-main").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".expandable");
    const isOpen = card.classList.contains("open");

    document.querySelectorAll(".expandable.open").forEach(openCard => {
      openCard.classList.remove("open");
      openCard.querySelector(".card-main").setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      card.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
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
    alert("Could not copy the number.");
  }
});

document.getElementById("saveContact").addEventListener("click", () => {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Omid Salem",
    "TEL;TYPE=CELL:09046870221",
    "EMAIL:omidsalem113@gmail.com",
    "URL:https://instagram.com/omid_.slm",
    "URL:https://t.me/Omid_st116",
    "END:VCARD"
  ].join("\n");

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Omid-Salem.vcf";
  link.click();
  URL.revokeObjectURL(url);
});

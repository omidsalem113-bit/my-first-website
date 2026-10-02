const root = document.documentElement;
const lightMode = document.getElementById("lightMode");
const darkMode = document.getElementById("darkMode");

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("omid-theme", theme);

  lightMode.classList.toggle("active", theme === "light");
  darkMode.classList.toggle("active", theme === "dark");

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#02090b" : "#ffffff");
}

setTheme(localStorage.getItem("omid-theme") || "light");

lightMode.addEventListener("click", () => setTheme("light"));
darkMode.addEventListener("click", () => setTheme("dark"));

document.querySelectorAll(".expandable .card-button").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".expandable");
    const wasOpen = card.classList.contains("open");

    document.querySelectorAll(".expandable.open").forEach(item => {
      item.classList.remove("open");
      item.querySelector(".card-button").setAttribute("aria-expanded", "false");
    });

    if (!wasOpen) {
      card.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

document.getElementById("copyPhone").addEventListener("click", async () => {
  const button = document.getElementById("copyPhone");
  try {
    await navigator.clipboard.writeText("09046870221");
    button.textContent = "Copied";
    setTimeout(() => button.textContent = "Copy", 1300);
  } catch {
    button.textContent = "Copy failed";
    setTimeout(() => button.textContent = "Copy", 1300);
  }
});

document.getElementById("saveContact").addEventListener("click", () => {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Omid Salem",
    "N:Salem;Omid;;;",
    "TEL;TYPE=CELL:09046870221",
    "EMAIL;TYPE=INTERNET:omidsalem113@gmail.com",
    "URL:https://instagram.com/omid_.slm",
    "URL:https://t.me/Omid_st116",
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
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});


// Use the device's native phone handler for Call buttons.
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener("click", () => {
    window.location.href = link.getAttribute("href");
  });
});

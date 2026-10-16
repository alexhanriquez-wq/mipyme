// PYMES: cambiá el número por tu WhatsApp en formato internacional, solo números.
// Argentina: código país 54 + característica (sin 0) + número (sin 15).
// Ejemplo ficticio: 5493624123456. No incluyas el signo + ni espacios.
const WHATSAPP_NUMBER = "5493731558574";
const WHATSAPP_MESSAGE = "¡Hola PYMES! Me gustaría consultar por una página web para mi negocio.";

function configureWhatsApp() {
  const validNumber = /^\d{10,15}$/.test(WHATSAPP_NUMBER) && !WHATSAPP_NUMBER.endsWith("0000000000");
  const links = [document.getElementById("whatsapp-cta"), document.getElementById("whatsapp-float")];
  const url = validNumber
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
    : `https://wa.me/?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  links.forEach((link) => {
    if (link) link.href = url;
  });
}

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    menuToggle.setAttribute("aria-label", expanded ? "Abrir menú" : "Cerrar menú");
    siteNav.classList.toggle("is-open", !expanded);
    document.body.classList.toggle("menu-open", !expanded);
  });
  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
      siteNav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    });
  });
}
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
configureWhatsApp();

// PYMES: cambiá el número por tu WhatsApp en formato internacional, solo números.
// Argentina: código país 54 + característica (sin 0) + número (sin 15).
// Ejemplo ficticio: 5493624123456. No incluyas el signo + ni espacios.
const WHATSAPP_NUMBER = "5493731558574";
const WHATSAPP_MESSAGE = "¡Hola PYMES! Me gustaría consultar por una página web para mi negocio.";
const WHATSAPP_POS_MESSAGE = "¡Hola PYMES! Me interesa el software de punto de venta gratuito (Lite / Pro) con mi web enlazada.";

function configureWhatsApp() {
  const validNumber = /^\d{10,15}$/.test(WHATSAPP_NUMBER) && !WHATSAPP_NUMBER.endsWith("0000000000");
  const links = [document.getElementById("whatsapp-cta"), document.getElementById("whatsapp-float")];
  const url = validNumber
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
    : `https://wa.me/?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  links.forEach((link) => {
    if (link) link.href = url;
  });
  const posLink = document.getElementById("whatsapp-pos");
  if (posLink) {
    const posText = encodeURIComponent(WHATSAPP_POS_MESSAGE);
    posLink.href = validNumber ? `https://wa.me/${WHATSAPP_NUMBER}?text=${posText}` : `https://wa.me/?text=${posText}`;
  }
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
function renderDirectorio() {
  const lista = document.getElementById("dir-lista");
  const filtros = document.getElementById("dir-filtros");
  const buscar = document.getElementById("dir-buscar");
  const vacio = document.getElementById("dir-vacio");
  if (!lista || typeof COMERCIOS === "undefined") return;

  const normalizar = (t) => String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const rubros = [...new Set(COMERCIOS.map((c) => c.rubro).filter(Boolean))].sort((a, b) => a.localeCompare(b, "es"));
  let rubroActivo = "";

  const chip = (texto, valor) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "dir-chip";
    b.textContent = texto;
    b.setAttribute("aria-pressed", String(valor === rubroActivo));
    b.addEventListener("click", () => {
      rubroActivo = valor;
      filtros.querySelectorAll(".dir-chip").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      pintar();
    });
    return b;
  };
  if (filtros && rubros.length > 1) {
    filtros.append(chip("Todos", ""));
    rubros.forEach((r) => filtros.append(chip(r, r)));
  }

  const dominio = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const tarjeta = (c) => {
    const a = document.createElement("a");
    a.className = "dir-card";
    a.href = c.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.innerHTML = `<div class="dir-head"><span class="dir-logo"></span><div><h3></h3><span class="dir-rubro"></span></div></div><p></p><div class="dir-foot"><span class="dir-place"></span><span class="dir-url"></span></div>`;
    a.querySelector(".dir-logo").textContent = c.iniciales || c.nombre.slice(0, 2).toUpperCase();
    a.querySelector("h3").textContent = c.nombre;
    a.querySelector(".dir-rubro").textContent = c.rubro || "";
    a.querySelector("p").textContent = c.descripcion || "";
    a.querySelector(".dir-place").textContent = c.localidad ? "📍 " + c.localidad : "";
    a.querySelector(".dir-url").textContent = dominio(c.url) + " ↗";
    return a;
  };
  const sumate = () => {
    const a = document.createElement("a");
    a.className = "dir-card dir-join";
    a.href = "#contacto";
    a.innerHTML = `<h3>¿Tenés un negocio?</h3><p>Sumate a pymes.uno con tu propia página y que tus vecinos te encuentren acá.</p><span class="dir-url">Quiero aparecer ↗</span>`;
    return a;
  };

  function pintar() {
    const q = normalizar(buscar ? buscar.value : "");
    const visibles = COMERCIOS.filter((c) =>
      (!rubroActivo || c.rubro === rubroActivo) &&
      (!q || normalizar([c.nombre, c.rubro, c.localidad, c.descripcion].join(" ")).includes(q))
    );
    lista.replaceChildren(...visibles.map(tarjeta), sumate());
    if (vacio) vacio.hidden = visibles.length > 0;
  }
  if (buscar) buscar.addEventListener("input", pintar);
  pintar();
}

renderDirectorio();
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
configureWhatsApp();

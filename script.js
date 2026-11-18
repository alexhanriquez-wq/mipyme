// PYMES: cambiá el número por tu WhatsApp en formato internacional, solo números.
// Argentina: código país 54 + característica (sin 0) + número (sin 15).
// Ejemplo ficticio: 5493624123456. No incluyas el signo + ni espacios.
const WHATSAPP_NUMBER = "5493731558574";
const WHATSAPP_MESSAGE = "¡Hola PYMES! Me gustaría consultar por una página web para mi negocio.";
const WHATSAPP_POS_MESSAGE = "¡Hola PYMES! Me interesa el software de punto de venta Pymes (Lite / Pro) con mi web enlazada.";

const WHATSAPP_CONFIG_MESSAGE = "¡Hola PYMES! Necesito el archivo de configuración para conectar mi página web.";

// Las apps abren pymes.uno/?origen=...#contacto; según de dónde llega, se adapta el aviso y el mensaje de WhatsApp.
const ORIGENES = {
  "pymesweb": {
    titulo: "¡Hola! Llegaste desde la app PymesWeb.",
    texto: "Para usarla necesitás tu página web. Contratá los servicios de PYMES y te enviamos el archivo de configuración.",
    mensaje: "¡Hola PYMES! Tengo la app PymesWeb y quiero contratar mi página web.",
  },
  "pymes-lite": {
    titulo: "¡Hola! Llegaste desde Pymes Lite.",
    texto: "Contratá tu página web con PYMES y publicá tus productos desde la caja con un clic.",
    mensaje: "¡Hola PYMES! Uso Pymes Lite y quiero contratar mi página web.",
  },
  "pymes-tienda": {
    titulo: "¡Hola! Llegaste desde PymesTienda.",
    texto: "Contratá tu página web con PYMES: tu catálogo de ropa con talles y colores, y los pedidos directo a tu WhatsApp.",
    mensaje: "¡Hola PYMES! Uso PymesTienda y quiero contratar mi página web.",
  },
  "pymes-pro": {
    titulo: "¡Hola! Llegaste desde Pymes Pro.",
    texto: "Contratá tu página web con PYMES y publicá tus productos desde la caja con un clic.",
    mensaje: "¡Hola PYMES! Uso Pymes Pro y quiero contratar mi página web.",
  },
};

function leerOrigen() {
  try {
    return ORIGENES[new URLSearchParams(location.search).get("origen")] || null;
  } catch {
    return null;
  }
}

function configureWhatsApp() {
  const validNumber = /^\d{10,15}$/.test(WHATSAPP_NUMBER) && !WHATSAPP_NUMBER.endsWith("0000000000");
  const waUrl = (texto) => validNumber
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`
    : `https://wa.me/?text=${encodeURIComponent(texto)}`;
  const setHref = (id, texto) => {
    const link = document.getElementById(id);
    if (link) link.href = waUrl(texto);
  };

  const origen = leerOrigen();
  const mensaje = origen ? origen.mensaje : WHATSAPP_MESSAGE;
  ["whatsapp-cta", "whatsapp-float", "contacto-whatsapp"].forEach((id) => setHref(id, mensaje));
  setHref("whatsapp-pos", WHATSAPP_POS_MESSAGE);
  setHref("contacto-config", WHATSAPP_CONFIG_MESSAGE);

  const llamar = document.getElementById("contacto-llamar");
  if (llamar) llamar.hidden = !validNumber;

  const aviso = document.getElementById("contacto-origen");
  if (aviso && origen) {
    document.getElementById("contacto-origen-titulo").textContent = origen.titulo;
    document.getElementById("contacto-origen-texto").textContent = origen.texto;
    aviso.hidden = false;
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
// Sección "Emprendedores de la zona": las tarjetas salen de emprendimientos.js.
function renderEmprendimientos() {
  const lista = document.getElementById("emp-lista");
  const filtros = document.getElementById("emp-filtros");
  const buscar = document.getElementById("emp-buscar");
  const vacio = document.getElementById("emp-vacio");
  const contador = document.getElementById("emp-contador");
  if (!lista || typeof EMPRENDIMIENTOS === "undefined") return;

  const tieneWeb = (e) => /^https?:\/\//.test(String(e.web || ""));
  // Las tarjetas de ejemplo muestran cómo se vería un emprendimiento mientras haya pocos cargados (menos de 6);
  // van al final, marcadas como "Ejemplo" y con los botones desactivados.
  const reales = EMPRENDIMIENTOS.filter((e) => e && e.nombre && !e.ejemplo);
  const mostrarEjemplos = reales.length < 6;
  // Los que tienen página web hecha por PYMES van primero; después el resto, y los ejemplos al final.
  const todos = EMPRENDIMIENTOS
    .filter((e) => e && e.nombre && (!e.ejemplo || mostrarEjemplos))
    .map((e, i) => ({ e, i }))
    .sort((a, b) => (!!a.e.ejemplo - !!b.e.ejemplo) || (tieneWeb(b.e) - tieneWeb(a.e)) || a.i - b.i)
    .map((x) => x.e);

  const normalizar = (t) => String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const rubros = [...new Set(todos.map((e) => e.rubro).filter(Boolean))].sort((a, b) => a.localeCompare(b, "es"));
  let rubroActivo = "";

  const chip = (texto, valor) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "emp-chip";
    b.dataset.valor = valor;
    b.textContent = texto;
    const n = valor ? todos.filter((e) => e.rubro === valor).length : todos.length;
    const cuenta = document.createElement("small");
    cuenta.textContent = n;
    b.append(cuenta);
    b.setAttribute("aria-pressed", String(valor === rubroActivo));
    b.addEventListener("click", () => {
      elegirRubro(valor);
      irAlListado();
    });
    return b;
  };
  const elegirRubro = (valor) => {
    rubroActivo = valor;
    if (filtros) filtros.querySelectorAll(".emp-chip").forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.valor === valor)));
    pintar();
  };
  if (filtros && rubros.length > 1) {
    filtros.append(chip("Todos", ""));
    rubros.forEach((r) => filtros.append(chip(r, r)));
  }

  const listado = document.getElementById("emp-listado");
  const irAlListado = () => {
    if (listado && listado.getBoundingClientRect().top > window.innerHeight * 0.6) listado.scrollIntoView({ behavior: "smooth" });
  };

  // Números de la portada.
  const stats = document.getElementById("emp-stats");
  if (stats && reales.length) {
    const localidades = new Set(reales.map((e) => String(e.localidad || "").split(",")[0].trim()).filter(Boolean));
    document.getElementById("emp-n-emp").textContent = reales.length;
    document.getElementById("emp-n-rub").textContent = new Set(reales.map((e) => e.rubro).filter(Boolean)).size;
    document.getElementById("emp-n-loc").textContent = localidades.size;
    stats.hidden = false;
  }

  const el = (tag, clase, texto) => {
    const n = document.createElement(tag);
    if (clase) n.className = clase;
    if (texto) n.textContent = texto;
    return n;
  };
  const enlace = (clase, href, texto) => {
    const a = el("a", "emp-link " + clase, texto);
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    return a;
  };
  const soloNumeros = (t) => String(t || "").replace(/\D/g, "");
  const usuarioIg = (t) => String(t || "").trim().replace(/^@/, "").replace(/^https?:\/\/(www\.)?instagram\.com\//, "").replace(/\/.*$/, "");

  const tarjeta = (e) => {
    const card = el("article", "emp-card" + (e.ejemplo ? " emp-ejemplo" : "") + (tieneWeb(e) ? " emp-destacado" : ""));
    if (tieneWeb(e)) card.append(el("span", "emp-badge", "★ Página web"));

    const head = el("div", "emp-head");
    const logo = el("span", "emp-logo");
    if (e.foto) {
      const img = el("img");
      img.src = e.foto;
      img.alt = "";
      img.loading = "lazy";
      logo.append(img);
    } else {
      logo.textContent = (e.iniciales || e.nombre.replace(/[^\p{L}\p{N} ]/gu, "").trim().slice(0, 2)).toUpperCase();
    }
    const titulo = el("div");
    titulo.append(el("h3", "", e.nombre));
    if (e.rubro) titulo.append(el("span", "emp-rubro", e.rubro));
    head.append(logo, titulo);
    card.append(head);

    if (e.descripcion) card.append(el("p", "emp-desc", e.descripcion));

    const ofrece = Array.isArray(e.ofrece) ? e.ofrece.filter(Boolean) : [];
    if (ofrece.length) {
      const tags = el("ul", "emp-tags");
      tags.setAttribute("aria-label", "Qué ofrece");
      ofrece.forEach((o) => tags.append(el("li", "", o)));
      card.append(tags);
    }

    const datos = [
      e.localidad && "📍 " + e.localidad,
      e.entrega && "🛵 " + e.entrega,
      e.responsable && "👤 " + e.responsable,
    ].filter(Boolean);
    if (datos.length) {
      const info = el("div", "emp-info");
      datos.forEach((d) => info.append(el("span", "", d)));
      card.append(info);
    }

    const acciones = el("div", "emp-actions");
    if (e.ejemplo) {
      // Ejemplo: los botones se ven pero no llevan a ningún lado (los datos son inventados).
      ["WhatsApp", e.instagram ? "Instagram" : null].filter(Boolean).forEach((t) => {
        const s = el("span", "emp-link emp-link-off " + (t === "WhatsApp" ? "emp-wa" : "emp-ig"), t);
        s.title = "Ejemplo: así se verían tus botones";
        acciones.append(s);
      });
      card.append(acciones);
      return card;
    }
    if (tieneWeb(e)) acciones.append(enlace("emp-web", e.web, "Ver su página ↗"));
    const wa = soloNumeros(e.whatsapp);
    if (wa.length >= 10) {
      const msg = `¡Hola! Te encontré en pymes.uno y quiero consultar por ${e.nombre.replace(/\s*\(ejemplo\)$/, "")}.`;
      acciones.append(enlace("emp-wa", `https://wa.me/${wa}?text=${encodeURIComponent(msg)}`, "WhatsApp"));
    }
    const ig = usuarioIg(e.instagram);
    if (ig) acciones.append(enlace("emp-ig", `https://instagram.com/${ig}`, "Instagram"));
    if (e.facebook && /^https?:\/\//.test(e.facebook)) acciones.append(enlace("emp-fb", e.facebook, "Facebook"));
    if (acciones.childElementCount) card.append(acciones);

    return card;
  };

  const sumate = () => {
    const card = el("article", "emp-card emp-join");
    card.append(el("span", "emp-join-kicker", "✦ ¡Sé el primero!"));
    card.append(el("h3", "", "Tu emprendimiento puede estar acá"));
    card.append(el("p", "", "Aparecé gratis en la vidriera de pymes.uno para que la gente de la zona te conozca y te escriba. No hace falta que tengas página web."));
    const b = el("a", "emp-join-btn", "Quiero aparecer");
    b.href = "sumate.html";
    b.append(el("span", "emp-join-flecha", "→"));
    card.append(b);
    return card;
  };

  function pintar() {
    const q = normalizar(buscar ? buscar.value : "");
    const visibles = todos.filter((e) =>
      (!rubroActivo || e.rubro === rubroActivo) &&
      (!q || normalizar([e.nombre, e.rubro, e.localidad, e.descripcion, e.responsable, (e.ofrece || []).join(" ")].join(" ")).includes(q))
    );
    lista.replaceChildren(...visibles.map(tarjeta), sumate());
    if (vacio) vacio.hidden = visibles.length > 0 || todos.length === 0;
    const visiblesReales = visibles.filter((e) => !e.ejemplo).length;
    if (contador) contador.textContent = visiblesReales ? String(visiblesReales) : "";
    if (actual) {
      const partes = [];
      if (rubroActivo) partes.push(`rubro “${rubroActivo}”`);
      if (q) partes.push(`búsqueda “${buscar.value.trim()}”`);
      actual.textContent = partes.length
        ? `Mostrando ${partes.join(" y ")}.`
        : todos.length ? "Escribiles directo: cada uno atiende por su WhatsApp o sus redes." : "Muy pronto vas a encontrar acá a los emprendedores de la zona.";
    }
  }
  const actual = document.getElementById("emp-filtro-actual");
  if (buscar) buscar.addEventListener("input", pintar);
  const form = document.getElementById("emp-form");
  if (form) form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    pintar();
    if (listado) listado.scrollIntoView({ behavior: "smooth" });
  });
  const limpiar = document.getElementById("emp-limpiar");
  if (limpiar) limpiar.addEventListener("click", () => {
    if (buscar) buscar.value = "";
    elegirRubro("");
  });
  pintar();
}

// Página sumate.html: el incentivo lleva a WhatsApp para pedir la página web.
const upsell = document.getElementById("upsell-cta");
if (upsell && /^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
  upsell.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("¡Hola PYMES! Quiero ser de los primeros en tener mi página web en pymes.uno.")}`;
  upsell.target = "_blank";
  upsell.rel = "noopener noreferrer";
}

// Formulario "Sumá tu emprendimiento" (sumate.html): arma el mensaje y lo abre en el WhatsApp de PYMES.
const altaForm = document.getElementById("alta-form");
if (altaForm) {
  const form = altaForm;
  const error = document.getElementById("alta-error");
  const ok = document.getElementById("alta-ok");

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const d = Object.fromEntries(new FormData(form).entries());
    Object.keys(d).forEach((k) => { if (typeof d[k] === "string") d[k] = d[k].trim(); });

    const faltan = [...form.querySelectorAll("[required]")].filter((c) => !c.value.trim());
    form.querySelectorAll("[required]").forEach((c) => c.classList.toggle("alta-mal", !c.value.trim()));
    const tel = (d.whatsapp || "").replace(/\D/g, "");
    if (faltan.length || tel.length < 8) {
      error.textContent = faltan.length
        ? "Completá los campos marcados con *."
        : "Revisá el número de WhatsApp: escribilo con la característica, ej. 3731 555555.";
      if (!faltan.length) form.querySelector("[name=whatsapp]").classList.add("alta-mal");
      error.hidden = false;
      (faltan[0] || form.querySelector("[name=whatsapp]")).focus();
      return;
    }
    error.hidden = true;

    const campo = (titulo, valor) => (valor ? [`*${titulo}:* ${valor}`] : []);
    const lineas = [
      "¡Hola PYMES! Quiero sumar mi emprendimiento a la vidriera de pymes.uno.",
      "",
      ...campo("Nombre", d.nombre),
      ...campo("Rubro", d.rubro),
      ...campo("Localidad", d.localidad),
      ...campo("A qué se dedica", d.descripcion),
      ...campo("Qué ofrece", d.ofrece),
      ...campo("Responsable", d.responsable),
      ...campo("WhatsApp", d.whatsapp),
      ...campo("Instagram", d.instagram),
      ...campo("Facebook", d.facebook),
      ...campo("Entrega", d.entrega),
      ...(d.quiereweb ? ["", "✅ También me interesa tener mi página web."] : []),
    ];
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lineas.join("\n"))}`;
    window.open(url, "_blank", "noopener");
    form.querySelectorAll(".alta-mal").forEach((c) => c.classList.remove("alta-mal"));
    if (ok) {
      ok.hidden = false;
      ok.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
  form.addEventListener("input", (ev) => {
    if (ev.target.classList) ev.target.classList.remove("alta-mal");
    if (ok) ok.hidden = true;
  });
}

renderEmprendimientos();
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
configureWhatsApp();

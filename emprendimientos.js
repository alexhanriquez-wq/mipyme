// PYMES: emprendimientos que se muestran en la sección "Emprendedores de la zona".
// Para sumar uno, copiá un bloque { ... }, pegalo en la lista y cambiá los datos.
//
//   nombre       (obligatorio) nombre del emprendimiento
//   rubro        (obligatorio) se usa para los filtros: escribilo siempre igual, ej. "Pastelería", "Ropa", "Servicios"
//   descripcion  (obligatorio) 1 o 2 frases: qué hace, a qué se dedica
//   ofrece       lista corta de lo que vende o hace, ej. ["Tortas", "Budines", "Mesa dulce"]
//   localidad    ej. "Campo Largo, Chaco"
//   responsable  nombre de la persona (opcional)
//   whatsapp     solo números, con 549 adelante, ej. "5493731555555" (sin + ni espacios)
//   instagram    usuario sin @, ej. "dulcesdelaabuela"
//   facebook     dirección completa de la página, ej. "https://facebook.com/dulcesdelaabuela"
//   web          su página web, ej. "https://js.pymes.uno". Los que tienen web salen primero y destacados.
//   entrega      ej. "Envíos en Campo Largo" o "Retiro a domicilio"
//   foto         imagen opcional en assets/emprendimientos/, ej. "assets/emprendimientos/dulces.jpg"
//   iniciales    1 a 3 letras para el logo cuando no hay foto (si no se pone, se usan las 2 primeras)
//
// Los bloques con  ejemplo: true  son tarjetas de muestra ("así se vería el tuyo"): van al final, con los botones
// desactivados, y dejan de mostrarse solas cuando hay 6 emprendimientos reales cargados. También se pueden borrar.
const EMPRENDIMIENTOS = [
  {
    nombre: "JS Distribuidora",
    rubro: "Distribuidora",
    descripcion: "Almacén, bebidas, limpieza e higiene con precios mayoristas y minoristas para comercios y familias.",
    ofrece: ["Almacén", "Bebidas", "Limpieza", "Por mayor"],
    localidad: "Campo Largo, Chaco",
    web: "https://js.pymes.uno",
    iniciales: "JS",
  },
  {
    ejemplo: true,
    nombre: "Dulce Tentación",
    rubro: "Pastelería",
    descripcion: "Tortas, budines y mesas dulces caseras por encargo para cumpleaños y eventos.",
    ofrece: ["Tortas", "Budines", "Mesa dulce", "Alfajores"],
    localidad: "Campo Largo, Chaco",
    responsable: "María",
    whatsapp: "5493731000000",
    instagram: "ejemplo",
    entrega: "Envíos en el pueblo",
  },
  {
    ejemplo: true,
    nombre: "Taller El Tornillo",
    rubro: "Servicios",
    descripcion: "Arreglos de bicicletas, motos chicas y herrería a medida.",
    ofrece: ["Bicicletas", "Soldadura", "Rejas"],
    localidad: "Campo Largo, Chaco",
    whatsapp: "5493731000000",
  },
  {
    ejemplo: true,
    nombre: "Tejidos Lunita",
    rubro: "Ropa y accesorios",
    descripcion: "Prendas tejidas a mano para bebés y adultos. Se hacen a pedido en el color que elijas.",
    ofrece: ["Gorros", "Bufandas", "Ajuares"],
    localidad: "Avia Terai, Chaco",
    instagram: "ejemplo",
  },
];

// PYMES Vidriera: emprendimientos que se muestran en pymes.uno.
// Lo generan la app PymesVidriera (Android) y el cargador web (PAGINAS/pymes-cargador).
// Si lo editás a mano, mantené el formato JSON: claves y textos entre comillas dobles y sin coma después del último.
// Campos: nombre, rubro, descripcion (obligatorios); ofrece, localidad, responsable, whatsapp (549...), instagram,
// facebook, web, entrega, ubicacion (link de Maps o dirección), logo (emoji), color, foto, iniciales, ejemplo (true/false).
const EMPRENDIMIENTOS = [
  {
    "nombre": "JS Distribuidora",
    "rubro": "Distribuidora",
    "descripcion": "Almacén, bebidas, limpieza e higiene con precios mayoristas y minoristas para comercios y familias.",
    "ofrece": [
      "Almacén",
      "Bebidas",
      "Limpieza",
      "Por mayor"
    ],
    "localidad": "Campo Largo, Chaco",
    "web": "https://js.pymes.uno",
    "foto": "assets/emprendimientos/js.png",
    "iniciales": "JS"
  },
  {
    "ejemplo": true,
    "nombre": "Dulce Tentación",
    "rubro": "Pastelería",
    "descripcion": "Tortas, budines y mesas dulces caseras por encargo para cumpleaños y eventos.",
    "ofrece": [
      "Tortas",
      "Budines",
      "Mesa dulce",
      "Alfajores"
    ],
    "localidad": "Campo Largo, Chaco",
    "responsable": "María",
    "whatsapp": "5493731000000",
    "instagram": "ejemplo",
    "entrega": "Envíos en el pueblo",
    "foto": "assets/emprendimientos/dulce.svg"
  },
  {
    "ejemplo": true,
    "nombre": "Taller El Tornillo",
    "rubro": "Servicios",
    "descripcion": "Arreglos de bicicletas, motos chicas y herrería a medida.",
    "ofrece": [
      "Bicicletas",
      "Soldadura",
      "Rejas"
    ],
    "localidad": "Campo Largo, Chaco",
    "whatsapp": "5493731000000",
    "foto": "assets/emprendimientos/tornillo.svg"
  },
  {
    "ejemplo": true,
    "nombre": "Tejidos Lunita",
    "rubro": "Ropa y accesorios",
    "descripcion": "Prendas tejidas a mano para bebés y adultos. Se hacen a pedido en el color que elijas.",
    "ofrece": [
      "Gorros",
      "Bufandas",
      "Ajuares"
    ],
    "localidad": "Avia Terai, Chaco",
    "instagram": "ejemplo",
    "foto": "assets/emprendimientos/lunita.svg"
  }
];

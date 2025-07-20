const fs = require("fs");

const operadores_PIC = [
  {
    nit: "814003182:9",
    operador_pic: "E.S.E. Centro Hospital Luis Antonio Montero POTOSI",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "POTOSI",
  },
  {
    nit: "814003370:7",
    operador_pic: "E.S.E. Centro de Salud de Puerres PUERRES",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "PUERRES",
  },
  {
    nit: "891200528:8",
    operador_pic: "E.S.E. Hospital Departamental de Nariño PASTO",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "PASTO",
  },
  {
    nit: "800084362:3",
    operador_pic: "E.S.E. Hospital Civil Regional  IPIALES",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "IPIALES",
  },
  {
    nit: "891201410:2",
    operador_pic: "E.S.E. Hospital el Buen Samaritano  LA CRUZ",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "LA CRUZ",
  },
  {
    nit: "891200952:8",
    operador_pic: "E.S.E. Hospital Eduardo Santos  LA UNION",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "LA UNION",
  },
  {
    nit: "891200622:2",
    operador_pic: "E.S.E. Hospital Lorencita Villegas  SAMANIEGO",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "SAMANIEGO",
  },
  {
    nit: "891200248:0",
    operador_pic: "E.S.E. Hospital Clarita Santos SANDONA",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "SANDONA",
  },
  {
    nit: "891200543:9",
    operador_pic: "E.S.E. Hospital San Carlos  SAN PABLO",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "SAN PABLO",
  },
  {
    nit: "800179870:2",
    operador_pic: "E.S.E. Hospital San Andrés  TUMACO",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "TUMACO",
  },
  {
    nit: "900000410:1",
    operador_pic: "E.S.E. Centro de Salud de Ancuyá  ANCUYA",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "ANCUYA",
  },
  {
    nit: "814006732:3",
    operador_pic: "E.S.E. Centro de Salud  CONSACA",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "CONSACA",
  },
  {
    nit: "814006908:2",
    operador_pic: "E.S.E. Centro de Salud San Bartolomé de Córdoba  CORDOBA",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "CORDOBA",
  },
  {
    nit: "814006607:8",
    operador_pic: "E.S.E. Centro de Salud de Cuaspud Carlosama CUASPUD",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "CUASPUD",
  },
  {
    nit: "814001329:5",
    operador_pic: "E.S.E. Hospital  CUMBAL",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "CUMBAL",
  },
  {
    nit: "837000286:6",
    operador_pic: "E.S.E. Hospital  GUACHUCAL",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "GUACHUCAL",
  },
  {
    nit: "814002021:7",
    operador_pic: "E.S.E. Centro Hospital Guaitarilla GUAITARILLA",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "GUAITARILLA",
  },
  {
    nit: "814006632:5",
    operador_pic: "E.S.E. Centro de Salud de Iles ILES",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "ILES",
  },
  {
    nit: "814006689:4",
    operador_pic: "E.S.E. Centro de Salud Nivel I Luis Acosta  LA UNION",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "LA UNION",
  },
  {
    nit: "814006620:7",
    operador_pic: "E.S.E. Centro de Salud de Linares  LINARES",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "LINARES",
  },
  {
    nit: "814006625:3",
    operador_pic: "E.S.E. Centro de Salud Santiago de Mallama MALLAMA",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "MALLAMA",
  },
  {
    nit: "814007194:5",
    operador_pic: "E.S.E. Centro de Salud de Providencia  PROVIDENCIA",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "PROVIDENCIA",
  },
  {
    nit: "814006654:7",
    operador_pic:
      "E.S.E Centro de Salud San Juan Bautista de Pupiales  PUPIALES",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "PUPIALES",
  },
  {
    nit: "900014225:6",
    operador_pic: "E.S.E. Centro de Salud de Sapuyes SAPUYES",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "SAPUYES",
  },
  {
    nit: "840001036:7",
    operador_pic: "E.S.E. Centro Hospital Divino Niño  TUMACO",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "TUMACO",
  },
  {
    nit: "900091143:9",
    operador_pic: "E.S.E. Pasto Salud PASTO",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "PASTO",
  },
  {
    nit: "900108282:0",
    operador_pic: "E.S.E. Centro de Salud de Yacuanquer YACUANQUER",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "YACUANQUER",
  },
  {
    nit: "900122524:6",
    operador_pic:
      "E.S.E. Centro de Salud Municipal de Cartago SAN PEDRO DE CARTAGO",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "SAN PEDRO DE CARTAGO",
  },
  {
    nit: "814001677:3",
    operador_pic: "E.S.E. Centro de Salud Belén  BELEN",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "BELEN",
  },
  {
    nit: "900131684:4",
    operador_pic: "E.S.E. Centro de Salud San José de Albán ALBAN",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "ALBAN",
  },
  {
    nit: "814001594:0",
    operador_pic: "E.S.E. Centro de Salud Señor de los Milagros GUALMATAN",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "GUALMATAN",
  },
  {
    nit: "900126794:6",
    operador_pic: "E.S.E. Centro de Salud Sagrado Corazón de Jesús  CONTADERO",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "CONTADERO",
  },
  {
    nit: "900126464:0",
    operador_pic: "E.S.E. Centro de Salud San Isidro  EL PEÑOL",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "EL PEÑOL",
  },
  {
    nit: "900127211:9",
    operador_pic: "E.S.E. Centro Hospital San Juan Bautista  TAMINANGO",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "TAMINANGO",
  },
  {
    nit: "900127207:9",
    operador_pic: "E.S.E. Centro de Salud San Sebastian  NARIÑO",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "NARIÑO",
  },
  {
    nit: "900121152:5",
    operador_pic: "E.S.E. Hospital Ricaurte RICAURTE",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "RICAURTE",
  },
  {
    nit: "900134576:0",
    operador_pic: "E.S.E. Centro de Salud San Bernardo SAN BERNARDO",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "SAN BERNARDO",
  },
  {
    nit: "900126676:5",
    operador_pic: "E.S.E. Centro de Salud San Miguel Arcángel  OSPINA",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "OSPINA",
  },
  {
    nit: "900125582:7",
    operador_pic: "E.S.E. Tangua Salud Hermes Andrade Mejía TANGUA",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "TANGUA",
  },
  {
    nit: "900140894:2",
    operador_pic: "E.S.E. Centro de Salud Señor del Mar FRANCISCO PIZARRO",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "FRANCISCO PIZARRO",
  },
  {
    nit: "900127853:7",
    operador_pic:
      "E.S.E. Centro de Salud Camilo Hurtado Cifuentes OLAYA HERRERA",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "OLAYA HERRERA",
  },
  {
    nit: "900153346:4",
    operador_pic: "E.S.E. Centro Hospital San Luis  EL TAMBO",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "EL TAMBO",
  },
  {
    nit: "900136920:0",
    operador_pic: "E.S.E. Centro de Salud La Buena Esperanza  COLON",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "COLON",
  },
  {
    nit: "900134497:7",
    operador_pic: "E.S.E. Centro de Salud Nuestra Señora de Fátima  CHACHAGUI",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "CHACHAGUI",
  },
  {
    nit: "900142446:5",
    operador_pic: "E.S.E. Centro de Salud de Los Andes LOS ANDES SOTOMAYOR",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "LOS ANDES SOTOMAYOR",
  },
  {
    nit: "900109862:7",
    operador_pic: "E.S.E. Centro de Salud Santa Bárbara  SANTA BARBARA",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "SANTA BARBARA",
  },
  {
    nit: "900176479:4",
    operador_pic: "E.S.E. Centro de Salud Policarpa POLICARPA",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "POLICARPA",
  },
  {
    nit: "900128655:1",
    operador_pic: "E.S.E. Centro de Salud Funes FUNES",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "FUNES",
  },
  {
    nit: "900142999:6",
    operador_pic: "E.S.E. Santiago Apóstol  IMUES",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "IMUES",
  },
  {
    nit: "900135676:3",
    operador_pic: "E.S.E. Centro de Salud San Miguel  ARBOLEDA",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "ARBOLEDA",
  },
  {
    nit: "900145604:6",
    operador_pic: "E.S.E. Centro de Salud El Rosario EL ROSARIO",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "EL ROSARIO",
  },
  {
    nit: "900154361:1",
    operador_pic:
      "E.S.E. Centro de Salud de Tablón de Gómez EL TABLON DE GOMEZ",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "EL TABLON DE GOMEZ",
  },
  {
    nit: "900140292:9",
    operador_pic: "E.S.E. Centro de Salud San Juan Bosco  LA LLANADA",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "LA LLANADA",
  },
  {
    nit: "900167616:9",
    operador_pic: "E.S.E. Centro de Salud San Francisco MOSQUERA",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "MOSQUERA",
  },
  {
    nit: "900190473:9",
    operador_pic: "E.S.E. Municipal de Ipiales IPIALES",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "IPIALES",
  },
  {
    nit: "900129891:6",
    operador_pic: "E.S.E. Centro de Salud de Guachavés SANTACRUZ",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "SANTACRUZ",
  },
  {
    nit: "900192544:2",
    operador_pic: "E.S.E. Centro Hospital de La Florida LA FLORIDA",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "LA FLORIDA",
  },
  {
    nit: "900192678:0",
    operador_pic: "E.S.E. Centro de Salud Nuestra Señora del Pilar ALDANA",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "ALDANA",
  },
  {
    nit: "900160887:6",
    operador_pic: "E.S.E. Centro Hospital Las Mercedes ROBERTO PAYAN",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "ROBERTO PAYAN",
  },
  {
    nit: "900192832:9",
    operador_pic: "E.S.E. Centro de Salud San Lorenzo SAN LORENZO",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "SAN LORENZO",
  },
  {
    nit: "900113729:0",
    operador_pic: "E.S.E. Centro de Salud Saul Quiñones MAGUI",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "MAGUI",
  },
  {
    nit: "900166361:1",
    operador_pic: "E.S.E. Centro de Salud Nuestra Señora del Carmen  LA TOLA",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "LA TOLA",
  },
  {
    nit: "900179095:3",
    operador_pic: "E.S.E. San Pedro de Cumbitara CUMBITARA",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "CUMBITARA",
  },
  {
    nit: "900193766:5",
    operador_pic: "E.S.E. Centro de Salud San José de Leiva LEIVA",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "LEIVA",
  },
  {
    nit: "900142579:6",
    operador_pic: "E.S.E. Centro de Salud Virgen de Lourdes BUESACO",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "BUESACO",
  },
  {
    nit: "891200638:1",
    operador_pic: "E.S.E. CEHANI  PASTO",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "PASTO",
  },
  {
    nit: "900408019:7",
    operador_pic: "IPS  Indígena del Pueblo Inga en Aponte EL TABLON DE GOMEZ",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "EL TABLON DE GOMEZ",
  },
  {
    nit: "900056747:9",
    operador_pic: "IPS  Indígena Guaitara IPIALES",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "IPIALES",
  },
  {
    nit: "814005761:2",
    operador_pic: "IPS  Indígena Mingasalud Resguardo de Guachavés SANTACRUZ",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "SANTACRUZ",
  },
  {
    nit: "800118954:1",
    operador_pic: "Universidad de Nariño PASTO",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "PASTO",
  },
  {
    nit: "0",
    operador_pic: "Otro SIN ESPECIFICAR",
    departamento: "DEPARTAMENTO DE NARIÑO",
    municipio: "SIN ESPECIFICAR",
  },
];

const municipios = [
  {
    nodo: "CENTRO",
    nombre_municipio: "CHACHAGUI",
    codigo: "52240",
  },
  {
    nodo: "CENTRO",
    nombre_municipio: "LA FLORIDA",
    codigo: "52207",
  },
  {
    nodo: "CENTRO",
    nombre_municipio: "NARIÑO",
    codigo: "52254",
  },
  {
    nodo: "CENTRO",
    nombre_municipio: "PASTO",
    codigo: "52260",
  },
  {
    nodo: "CENTRO",
    nombre_municipio: "TANGUA",
    codigo: "52381",
  },
  {
    nodo: "CENTRO",
    nombre_municipio: "YACUANQUER",
    codigo: "52480",
  },
  {
    nodo: "GUAMBUYACO",
    nombre_municipio: "EL PEÑOL",
    codigo: "52001",
  },
  {
    nodo: "GUAMBUYACO",
    nombre_municipio: "EL TAMBO",
    codigo: "52683",
  },
  {
    nodo: "GUAMBUYACO",
    nombre_municipio: "LA LLANADA",
    codigo: "52788",
  },
  {
    nodo: "GUAMBUYACO",
    nombre_municipio: "LOS ANDES SOTOMAYOR",
    codigo: "52885",
  },
  {
    nodo: "JUANAMBU",
    nombre_municipio: "ARBOLEDA",
    codigo: "52036",
  },
  {
    nodo: "JUANAMBU",
    nombre_municipio: "BUESACO",
    codigo: "52320",
  },
  {
    nodo: "JUANAMBU",
    nombre_municipio: "LA UNION",
    codigo: "52385",
  },
  {
    nodo: "JUANAMBU",
    nombre_municipio: "SAN LORENZO",
    codigo: "52411",
  },
  {
    nodo: "JUANAMBU",
    nombre_municipio: "SAN PEDRO DE CARTAGO",
    codigo: "52418",
  },
  {
    nodo: "LA CORDILLERA",
    nombre_municipio: "CUMBITARA",
    codigo: "52435",
  },
  {
    nodo: "LA CORDILLERA",
    nombre_municipio: "EL ROSARIO",
    codigo: "52506",
  },
  {
    nodo: "LA CORDILLERA",
    nombre_municipio: "LEIVA",
    codigo: "52565",
  },
  {
    nodo: "LA CORDILLERA",
    nombre_municipio: "POLICARPA",
    codigo: "52612",
  },
  {
    nodo: "LA CORDILLERA",
    nombre_municipio: "TAMINANGO",
    codigo: "52678",
  },
  {
    nodo: "LA SABANA",
    nombre_municipio: "GUAITARILLA",
    codigo: "52699",
  },
  {
    nodo: "LA SABANA",
    nombre_municipio: "OSPINA",
    codigo: "52720",
  },
  {
    nodo: "LA SABANA",
    nombre_municipio: "SAPUYES",
    codigo: "52838",
  },
  {
    nodo: "LA SABANA",
    nombre_municipio: "TUQUERRES",
    codigo: "52079",
  },
  {
    nodo: "LA SABANA",
    nombre_municipio: "IMUES",
    codigo: "52250",
  },
  {
    nodo: "LOS ABADES",
    nombre_municipio: "PROVIDENCIA",
    codigo: "52520",
  },
  {
    nodo: "LOS ABADES",
    nombre_municipio: "SAMANIEGO",
    codigo: "52390",
  },
  {
    nodo: "LOS ABADES",
    nombre_municipio: "SANTACRUZ",
    codigo: "52427",
  },
  {
    nodo: "OCCIDENTE",
    nombre_municipio: "CONSACA",
    codigo: "52473",
  },
  {
    nodo: "OCCIDENTE",
    nombre_municipio: "SANDONA",
    codigo: "52490",
  },
  {
    nodo: "OCCIDENTE",
    nombre_municipio: "ANCUYA",
    codigo: "52621",
  },
  {
    nodo: "OCCIDENTE",
    nombre_municipio: "LINARES",
    codigo: "52696",
  },
  {
    nodo: "PACIFICO SUR",
    nombre_municipio: "FRANCISCO PIZARRO",
    codigo: "52835",
  },
  {
    nodo: "PACIFICO SUR",
    nombre_municipio: "TUMACO",
    codigo: "52019",
  },
  {
    nodo: "PIE DE MONTE COSTERO",
    nombre_municipio: "MALLAMA",
    codigo: "52051",
  },
  {
    nodo: "PIE DE MONTE COSTERO",
    nombre_municipio: "RICAURTE",
    codigo: "52083",
  },
  {
    nodo: "RIO MAYO",
    nombre_municipio: "ALBAN",
    codigo: "52110",
  },
  {
    nodo: "RIO MAYO",
    nombre_municipio: "BELEN",
    codigo: "52203",
  },
  {
    nodo: "RIO MAYO",
    nombre_municipio: "COLON",
    codigo: "52233",
  },
  {
    nodo: "RIO MAYO",
    nombre_municipio: "EL TABLON DE GOMEZ",
    codigo: "52256",
  },
  {
    nodo: "RIO MAYO",
    nombre_municipio: "LA CRUZ",
    codigo: "52258",
  },
  {
    nodo: "RIO MAYO",
    nombre_municipio: "SAN BERNARDO",
    codigo: "52378",
  },
  {
    nodo: "RIO MAYO",
    nombre_municipio: "SAN PABLO",
    codigo: "52399",
  },
  {
    nodo: "SANQUIANGA",
    nombre_municipio: "EL CHARCO",
    codigo: "52405",
  },
  {
    nodo: "SANQUIANGA",
    nombre_municipio: "LA TOLA",
    codigo: "52540",
  },
  {
    nodo: "SANQUIANGA",
    nombre_municipio: "MOSQUERA",
    codigo: "52685",
  },
  {
    nodo: "SANQUIANGA",
    nombre_municipio: "OLAYA HERRERA",
    codigo: "52687",
  },
  {
    nodo: "SANQUIANGA",
    nombre_municipio: "SANTA BARBARA",
    codigo: "52693",
  },
  {
    nodo: "SUR",
    nombre_municipio: "ALDANA",
    codigo: "52694",
  },
  {
    nodo: "SUR",
    nombre_municipio: "CONTADERO",
    codigo: "52786",
  },
  {
    nodo: "SUR",
    nombre_municipio: "CORDOBA",
    codigo: "52022",
  },
  {
    nodo: "SUR",
    nombre_municipio: "CUASPUD",
    codigo: "52210",
  },
  {
    nodo: "SUR",
    nombre_municipio: "CUMBAL",
    codigo: "52215",
  },
  {
    nodo: "SUR",
    nombre_municipio: "FUNES",
    codigo: "52224",
  },
  {
    nodo: "SUR",
    nombre_municipio: "GUACHUCAL",
    codigo: "52227",
  },
  {
    nodo: "SUR",
    nombre_municipio: "GUALMATAN",
    codigo: "52287",
  },
  {
    nodo: "SUR",
    nombre_municipio: "ILES",
    codigo: "52317",
  },
  {
    nodo: "SUR",
    nombre_municipio: "IPIALES",
    codigo: "52323",
  },
  {
    nodo: "SUR",
    nombre_municipio: "POTOSI",
    codigo: "52352",
  },
  {
    nodo: "SUR",
    nombre_municipio: "PUERRES",
    codigo: "52354",
  },
  {
    nodo: "SUR",
    nombre_municipio: "PUPIALES",
    codigo: "52356",
  },
  {
    nodo: "TELEMBI",
    nombre_municipio: "BARBACOAS",
    codigo: "52560",
  },
  {
    nodo: "TELEMBI",
    nombre_municipio: "MAGUI",
    codigo: "52573",
  },
  {
    nodo: "TELEMBI",
    nombre_municipio: "ROBERTO PAYAN",
    codigo: "52585",
  },
];

for (const municipio of municipios) {
  municipio.label = `${municipio.nombre_municipio} (${municipio.nodo})`;
}

console.log("municipios:", municipios);

fs.writeFileSync("municipios.json", JSON.stringify(municipios, null, 2));

const fs = require("fs");

const data2 = [
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
    nombre_municipio: "SANTA CRUZ",
    codigo: "52427",
  },
  {
    nodo: "OCCIDENTE",
    nombre_municipio: "CONSACA",
    codigo: "52473",
  },
  {
    nodo: "OCCIDENTE",
    nombre_municipio: "SANDONÁ",
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
    nombre_municipio: "CÓRDOBA",
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
    nombre_municipio: "POTOSÍ",
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
    nombre_municipio: "MAGÜI",
    codigo: "52573",
  },
  {
    nodo: "TELEMBI",
    nombre_municipio: "ROBERTO PAYAN",
    codigo: "52585",
  },
];

const sortedData = data2.sort((a, b) => {
  if (a.codigo < b.codigo) {
    return -1;
  }
  if (a.codigo > b.codigo) {
    return 1;
  }
  return 0;
});

const newData = sortedData.map((item) => {
  return {
    ...item,
    label: `${item.nombre_municipio} (${item.nodo})`,
  };
});

//SAVE THE DATA TO A FILE

fs.writeFileSync("sortedData1.json", JSON.stringify(newData, null, 2), "utf-8");

const signos = [
    ["Capricornio", [22, 12], [19, 1]],
    ["Acuario", [20, 1], [18, 2]],
    ["Piscis", [19, 2], [20, 3]],
    ["Aries", [21, 3], [19, 4]],
    ["Tauro", [20, 4], [20, 5]],
    ["Géminis", [21, 5], [20, 6]],
    ["Cáncer", [21, 6], [22, 7]],
    ["Leo", [23, 7], [22, 8]],
    ["Virgo", [23, 8], [22, 9]],
    ["Libra", [23, 9], [22, 10]],
    ["Escorpio", [23, 10], [21, 11]],
    ["Sagitario", [22, 11], [21, 12]],
    ["Capricornio", [22, 12], [31, 12]],
];

const aliasSignos = {
    "aries": "Aries", "tauro": "Tauro", "geminis": "Géminis", "géminis": "Géminis",
    "cancer": "Cáncer", "cáncer": "Cáncer", "leo": "Leo", "virgo": "Virgo",
    "libra": "Libra", "escorpio": "Escorpio", "sagitario": "Sagitario",
    "capricornio": "Capricornio", "acuario": "Acuario", "piscis": "Piscis"
};

const elementos = {
    "Aries": "Fuego", "Tauro": "Tierra", "Géminis": "Aire", "Cáncer": "Agua",
    "Leo": "Fuego", "Virgo": "Tierra", "Libra": "Aire", "Escorpio": "Agua",
    "Sagitario": "Fuego", "Capricornio": "Tierra", "Acuario": "Aire", "Piscis": "Agua"
};

const descripciones = {
    "Aries": "Impulsivo, valiente, lleno de energía y con iniciativa.",
    "Tauro": "Paciente, leal, estable y amante del confort.",
    "Géminis": "Comunicativo, curioso, adaptable y con mente rápida.",
    "Cáncer": "Emocional, protector, sensible y muy familiar.",
    "Leo": "Líder, creativo, generoso y con gran confianza.",
    "Virgo": "Analítico, perfeccionista, lógico y muy trabajador.",
    "Libra": "Diplomático, equilibrado, sociable y amante de la armonía.",
    "Escorpio": "Apasionado, intenso, misterioso y determinado.",
    "Sagitario": "Optimista, aventurero, sincero y amante de la libertad.",
    "Capricornio": "Responsable, disciplinado, ambicioso y constante.",
    "Acuario": "Innovador, independiente, original y humanitario.",
    "Piscis": "Empático, soñador, intuitivo y muy sensible."
};

function obtenerSigno(dia, mes) {
    for (const [signo, [di, mi], [df, mf]] of signos) {
        if ((mes === mi && dia >= di) || (mes === mf && dia <= df)) {
            return signo;
        }
    }
    return "Fecha inválida";
}

function descubrirSigno() {
    const fecha = document.getElementById("fecha").value;
    const [d, m] = fecha.split("/").map(Number);
    const signo = obtenerSigno(d, m);
    const elemento = elementos[signo] || "Desconocido";
    const descripcion = descripciones[signo] || "No disponible";

    document.getElementById("resultadoSigno").innerHTML =
        `<strong>Signo:</strong> ${signo}<br>
         <strong>Elemento:</strong> ${elemento}<br>
         <strong>Descripción:</strong> ${descripcion}`;
}

function verCompatibilidad() {
    let s1 = document.getElementById("signo1").value.toLowerCase();
    let s2 = document.getElementById("signo2").value.toLowerCase();

    s1 = aliasSignos[s1];
    s2 = aliasSignos[s2];

    if (!s1 || !s2 || !elementos[s1] || !elementos[s2]) {
        document.getElementById("resultadoCompatibilidad").innerText = "Uno de los signos no es válido.";
        return;
    }

    const e1 = elementos[s1];
    const e2 = elementos[s2];

    const compatibles = {
        "Fuego": ["Fuego", "Aire"],
        "Tierra": ["Tierra", "Agua"],
        "Aire": ["Aire", "Fuego"],
        "Agua": ["Agua", "Tierra"]
    };

    let porcentaje = 40;
    if (e1 === e2) porcentaje = 90;
    else if (compatibles[e1]?.includes(e2)) porcentaje = 75;

    const barra = "█".repeat(porcentaje / 10) + "-".repeat(10 - porcentaje / 10);

    document.getElementById("resultadoCompatibilidad").innerHTML =
        `<strong>Compatibilidad entre ${s1} (${e1}) y ${s2} (${e2}):</strong><br>
         <span style="color: lightgreen;">[${barra}] ${porcentaje}%</span>`;
}

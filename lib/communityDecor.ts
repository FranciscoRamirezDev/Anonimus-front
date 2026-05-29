// Decoración visual para comunidades. El API solo provee { nombre, categoria },
// así que el icono y el nº de "miembros" son decorativos (no vienen del backend).

const ICON_BY_KEYWORD: Array<[RegExp, string]> = [
  [/alcohol|bebida/i, "local_bar"],
  [/fumar|tabaco|cigarr/i, "smoking_rooms"],
  [/ansiedad|estr[eé]s|p[aá]nico/i, "psychology"],
  [/aliment|comida|nutric|dieta/i, "restaurant"],
  [/ejercicio|deporte|f[ií]sic/i, "fitness_center"],
  [/sue[ñn]o|dormir|insomnio/i, "bedtime"],
  [/depresi[oó]n|[aá]nimo|emocion/i, "favorite"],
  [/tecnolog|pantalla|adicci[oó]n/i, "devices"],
  [/estudio|escuela|universidad/i, "school"],
  [/trabajo|laboral|empleo/i, "work"],
];

export function communityIcon(categoria?: string): string {
  const text = categoria ?? "";
  for (const [re, icon] of ICON_BY_KEYWORD) {
    if (re.test(text)) return icon;
  }
  return "groups";
}

// Número decorativo y estable a partir del id (no es un dato real del API).
export function decorativeMembers(id: number): string {
  const n = 300 + ((id * 977) % 9700);
  return n.toLocaleString("es-MX");
}

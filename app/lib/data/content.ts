/**
 * Contenido de la landing. Fuente: info.md
 * Estructura según estructura.md (una sola historia, una sola acción: WhatsApp).
 */

export const hero = {
  headline:
    "Acompañamiento para transformar tus vínculos y crear la vida que elegís",
  subheadline:
    "A través de constelaciones familiares, reprogramación bioneuroemocional y sanación akáshica, liberás memorias y creencias que hoy condicionan tu presente.",
  cta: "Coordinemos tu encuentro",
} as const;

export const tePasaQue = {
  title: "¿Te pasa que…?",
  items: [
    "Repetís situaciones, vínculos o emociones sin comprender por qué",
    "Sentís bloqueos en el trabajo, el dinero o tu camino personal",
    "Aparecen síntomas físicos o emocionales persistentes sin una causa clara",
    "Vivís conflictos que se repiten, aun habiendo trabajado la mente",
    "Sentís que cargás con historias familiares que no te pertenecen",
  ],
  cierre:
    "Cuando algo se repite, no es casual. Es información que pide ser mirada, comprendida y ordenada.",
} as const;

export const miradaIntegral = {
  title: "Una mirada integral para comprender y transformar",
  parrafo1:
    "El acompañamiento que ofrezco parte de una mirada profunda e integral de la persona, entendiendo que las memorias **álmicas, mentales y biológicas** interactúan entre sí y se activan simultáneamente, influyendo directamente en cómo hoy se manifiestan los conflictos, los síntomas y los estados emocionales.",
  parrafo2:
    "No se trata solo de comprender lo que sucede en el presente, sino de acceder a la información profunda que sostiene la experiencia actual, para generar un cambio interno real y sostenido en el tiempo.",
} as const;

export const metodoCrea = {
  title: "¿Qué es el Método C.R.E.A.?",
  intro:
    "C.R.E.A. es mi método personal aplicado para un abordaje integral que une la mirada sistémica de las Constelaciones Familiares, la reprogramación bioneuroemocional y biológica para acompañar procesos reales de Transformación.",
  subtitle: "El Método C.R.E.A. combina:",
  pilares: [
    {
      title: "Constelaciones Familiares y Sistémicas",
      text: "Un espacio cuidado para trabajar en profundidad dentro del campo sistémico.",
    },
    {
      title: "Biodecodificación y Reprogramación Bioneuroemocional y Biológica",
      text: "Orientadas a identificar y reprogramar las memorias emocionales, mentales y su impacto en nuestra salud.",
    },
    {
      title: "Lectura Akáshica aplicada al proceso terapéutico",
      text: "Utilizo la lectura Akáshica como un campo de información al que accedo para aportar claridad sobre lo que está activo en el presente, acompañando el proceso de comprensión, sanación y transformación de cada persona.",
    },
  ],
  cierre:
    "",
} as const;

export const queSePuedeTrabajar = {
  title: "¿Qué situaciones se pueden trabajar?",
  intro:
    "A través del Método C.R.E.A. se pueden abordar todas aquellas situaciones que hoy generan malestar o se repiten, entre ellas:",
  items: [
    "Vínculos familiares, de pareja, hijos, amistades o sociedades",
    "Conflictos laborales, profesión, empresas o negocios",
    "Relación con el dinero y la abundancia",
    "Estados emocionales como ansiedad, angustia o desvalorización",
    "Síntomas físicos, enfermedades o procesos corporales",
    "Duelos no resueltos, reales o simbólicos",
    "Patrones repetitivos y bloqueos personales",
  ],
  cierre:
    "Todo aquello que hoy se expresa como síntoma, conflicto o repetición puede ser una puerta hacia una comprensión más profunda.",
} as const;

export const intensivo = {
  title: "Creando Mi Nuevo YO - Programa Intensivo de Sanación y Transformación Personal",
  subtitle:
    "Programa Intensivo de Sanación y Transformación Personal de creación consciente de un nuevo estado del ser",
  descripcion:
    "Pensado para quienes sienten que ya no pueden —ni quieren— seguir siendo la misma versión de sí mismas. No es un espacio para «arreglar» lo que está mal: es un proceso para comprender desde dónde estás creando tu vida hoy y elegir conscientemente un nuevo estado interno. Cuando cambia el estado del ser, la realidad inevitablemente se transforma.",
  detalle:
    "En 4 encuentros consecutivos, desarrollados a lo largo de un mes, se recorre un proceso profundo y ordenado que permite reprogramar las tres dimensiones desde las cuales se crea la experiencia de vida: las memorias del alma (origen de la identidad actual), la mente (creencias que sostienen la percepción) y el cuerpo y la acción (donde se expresa o se limita el poder de elección). Integra Constelaciones Familiares, Física Cuántica, Reprogramación Bioneuroemocional y PNL como experiencia consciente. No se trata de entender más; se trata de ser distinto.",
  frecuencia: "3 ediciones anuales. Días sábados de 18 a 20Hs.",
  modalidad: "Modalidad: Online. Incluye 1 encuentro virtual en vivo por semana + material de trabajo para imprimir",
  cta: "Consultar próximas fechas por WhatsApp",
} as const;

export const formatosAcompanamiento = {
  title: "Formas de acompañamiento",
  subtitle: "Elegí el espacio que resuene con lo que necesitás hoy. Cada encuentro es un lugar cuidado para tu proceso.",
  bloques: [
    {
      id: "intensivo",
      titulo: intensivo.title,
      descripcion: intensivo.descripcion,
      detalle: intensivo.detalle,
      extra: intensivo.frecuencia,
      cta: intensivo.cta,
    },
    {
      id: "individuales",
      titulo: "Sesiones Individuales (1:1)",
      descripcion:
        "Esta sesión individual es un espacio terapéutico íntimo, profundo y completamente personalizado, creado para acompañarte en un proceso uno a uno, donde tu historia, tu momento y tu necesidad son el centro.",
      detalle:
        "Durante la sesión exploramos qué se está expresando a través de un síntoma, emoción, conflicto vincular o situación repetitiva, para lograr una comprensión clara de su origen y de las dinámicas que hoy se manifiestan en tu presente. Luego realizamos el trabajo de integración, liberación y reprogramación consciente, buscando restablecer el orden interno y habilitar nuevas posibilidades.",
      duracion: "Duración: 1 hora",
      modalidad: "Modalidad: presencial u online",
      cta: "Me interesa",
    },
    {
      id: "proceso-crea",
      titulo: 'Sesiones individuales de 4 encuentros consecutivos - "Proceso profundo C.R.E.A." ',
      descripcion:
        "Un proceso de acompañamiento consciente diseñado para profundizar en el autoconocimiento, la sanación emocional y la transformación personal desde una mirada integral a través del Método C.R.E.A.",
      detalle:
        "Se trata de un ciclo de 4 sesiones consecutivas a lo largo de un mes, con encuentros de 1 hora cada uno y un abordaje completamente personalizado, respetando la historia, el momento vital y el ritmo de cada persona. A lo largo del proceso se integran, según lo que cada etapa requiera: Constelaciones Familiares y Sistémicas, Biodecodificación y Reprogramación Bioneuroemocional, Lectura Akáshica aplicada al proceso terapéutico, Ejercicios y meditaciones de integración, Análisis del árbol generacional y memorias emocionales. Los días y la frecuencia de los encuentros se acuerdan previamente, favoreciendo un seguimiento continuo, consciente y respetuoso.",
      nota:
        "Este proceso no busca abordar síntomas de manera aislada, sino comprender, liberar y reordenar las memorias emocionales, mentales, biológicas y álmicas que hoy se expresan como conflicto o malestar, habilitando un nuevo estado de coherencia interna.",
      modalidad: "Modalidad: presencial u online",
      cta: "Me interesa",
    },
    {
      id: "constelaciones",
      titulo: "Constelaciones Familiares Exclusivas - (Grupos reducidos)",
      descripcion:
        "Un espacio diseñado para quienes desean un trabajo profundo, íntimo y consciente, en grupos reducidos de hasta 4 o 5 personas, favoreciendo la privacidad, la contención y un acompañamiento personalizado.",
      detalle:
        "Todos los participantes constelan. Al desarrollarse dentro de un campo de resonancia sistémica, el grupo se conecta de manera precisa a través de las historias personales y del sistema familiar, potenciando los movimientos de conciencia y sanación individuales y colectivos. Se integran ejercicios y meditaciones sistémicas que acompañan y profundizan el proceso grupal.",
      modalidad: "Modalidad: presencial",
      extra: "",
      cta: "Consultar próximos encuentros por WhatsApp",
    },
  ],
} as const;



export const quienAcompana = {
  title: "Una agenda consciente",
  parrafo1:
    "Este año he elegido trabajar con una agenda más consciente, cuidando la energía, el tiempo y la profundidad de cada proceso.",
  parrafo2:
    "Los cupos son limitados para poder ofrecer un acompañamiento presente, respetuoso y personalizado.",
} as const;

/**
 * Reviews / Experiencias. Estructura según reviews.md:
 * name, date (texto para ordenar), rating (1–5), message.
 * Opcional: subtitle (ej. tipo de acompañamiento).
 */
export const reviews = [
  {
    id: "1",
    name: "Anónimo",
    rating: 5,
    message:
      "Constelé por primera vez de forma grupal y desde ese día comenzaron grandes cambios en mi vida. Venía atravesando un proceso de salud muy difícil y siempre pensaba lo peor. Dos días antes de una operación muy importante hice la constelación y pude aceptar lo que no quería ver. Hoy, en mi postquirúrgico, lloro de felicidad porque veo con claridad y siento que comenzó una nueva etapa en mi vida. Gracias por acompañarme en ese proceso.",
    subtitle: "Constelación Grupal",
  },
  {
    id: "2",
    name: "Mabel",
    rating: 5,
    message:
      "Quiero agradecer lo vivido en el Encuentro de Sanación del Linaje Femenino. Fue una experiencia muy movilizante que me permitió cerrar un ciclo que venía trabajando hace mucho tiempo en terapia, lecturas y otros espacios. Encontré en el encuentro algo que me faltaba. Gracias por tu trabajo y dedicación.",
    subtitle: "Encuentro de Sanación del Linaje Femenino",
  },
  {
    id: "3",
    name: "María Ángeles",
    rating: 5,
    message:
      "Desde el primer encuentro del programa Creando Mi Nuevo Yo soy otra persona. Me siento profundamente feliz, sin un motivo específico, y noto cambios concretos en mi vida. Después de 26 años, volví a salir sola y disfrutar. Fue un antes y un después para mí.",
    subtitle: "Programa Creando Mi Nuevo Yo",
  },
  {
    id: "4",
    name: "Anónimo",
    rating: 5,
    message:
      "El encuentro Creando Mi Nuevo Yo fue una experiencia muy profunda. Me permitió conectar con recuerdos y emociones que estaban guardadas desde hace muchos años. Salí con una enorme sensación de paz y felicidad, y con la certeza de que estoy lista para afrontar lo que antes evitaba.",
    subtitle: "Creando Mi Nuevo Yo",
  },
  {
    id: "5",
    name: "Sandra",
    rating: 5,
    message:
      "En cada Constelación exclusiva encuentro paz, claridad y una evolución muy notoria en mi vida. Desde el primer encuentro hasta hoy el cambio es evidente. Estoy profundamente agradecida por el acompañamiento y por el trabajo realizado con tanto compromiso y corazón.",
    subtitle: "Constelaciones Exclusivas",
  },
  {
    id: "6",
    name: "Rosana",
    rating: 5,
    message:
      "El Programa Creando Mi Nuevo Yo fue una experiencia transformadora desde el primer momento. Incluso desde la lectura inicial ya comenzó a movilizarme profundamente. Me ayudó a ver mi historia desde otra perspectiva y a conectar con la vida de una manera más consciente y plena.",
    subtitle: "Programa Creando Mi Nuevo Yo",
  },
  {
    id: "7",
    name: "José",
    rating: 5,
    message:
      "Después de la constelación me siento muy bien, hacía mucho que no experimentaba esta sensación. Estoy agradecido por la conexión y por el acompañamiento brindado. Fue una experiencia muy significativa para mí.",
    subtitle: "Constelaciones",
  },
] as const;

/** IDs de secciones para anclas y navegación */
export const sectionIds = {
  hero: "hero",
  tePasaQue: "te-pasa-que",
  miradaIntegral: "mirada-integral",
  metodoCrea: "metodo-crea",
  queSePuedeTrabajar: "que-se-puede-trabajar",
  servicios: "servicios",
  procesoCrea: "proceso-crea",
  quienAcompana: "quien-acompana",
  ctaFinal: "cta-final",
} as const;

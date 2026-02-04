/**
 * Contenido de la landing. Fuente: info.md
 * Estructura según estructura.md (una sola historia, una sola acción: WhatsApp).
 */

export const hero = {
  headline:
    "Acompañamiento consciente para sanar vínculos, liberar bloqueos y crear nuevas posibilidades",
  subheadline:
    "Método C.R.E.A. · Constelaciones Familiares · Reprogramación Bioneuroemocional y Biológica · Sanación Akáshica",
  subheadline2:
    "Sesiones individuales, procesos personalizados y constelaciones en grupos reducidos",
  ubicacion: "Presencial en Córdoba Capital y modalidad online",
  cta: "👉 Escribime por WhatsApp y coordinamos tu encuentro",
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
    "Trabajo desde mi propio método de acompañamiento consciente, al que denominé **C.R.E.A.**, que integra distintas herramientas terapéuticas según lo que cada proceso requiere.",
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
    "Este abordaje permite no solo comprender por qué vivís lo que vivís o sentís lo que sentís, sino dar un paso más: **reordenar y reprogramar la información interna** para habilitar nuevas posibilidades.",
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
  title: "Creando Mi Nuevo Yo · Programa intensivo",
  subtitle:
    "Programa intensivo de creación consciente de un nuevo estado del ser",
  descripcion:
    "Pensado para quienes sienten que ya no pueden —ni quieren— seguir siendo la misma versión de sí mismas. No es un espacio para «arreglar» lo que está mal: es un proceso para comprender desde dónde estás creando tu vida hoy y elegir conscientemente un nuevo estado interno. Cuando cambia el estado del ser, la realidad inevitablemente se transforma.",
  detalle:
    "A lo largo de 3 encuentros semanales se recorre un proceso profundo y ordenado que permite reprogramar las tres dimensiones desde las cuales se crea la experiencia de vida: las memorias del alma (origen de la identidad actual), la mente (creencias que sostienen la percepción) y el cuerpo y la acción (donde se expresa o se limita el poder de elección). Integra Constelaciones Familiares, Física Cuántica, Reprogramación Bioneuroemocional y PNL como experiencia consciente. No se trata de entender más; se trata de ser distinto.",
  frecuencia: "Se ofrece dos veces al año",
  cta: "👉 Consultar próximas fechas por WhatsApp",
} as const;

export const formatosAcompanamiento = {
  title: "Formas de acompañamiento",
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
      titulo: "Encuentros Individuales (1:1)",
      descripcion:
        "El encuentro individual es un espacio terapéutico íntimo, profundo y completamente personalizado, creado para acompañarte en un proceso uno a uno, donde tu historia, tu momento y tu necesidad son el centro.",
      detalle:
        "Durante el encuentro exploramos qué se está expresando a través de un síntoma, emoción, conflicto vincular o situación repetitiva, para lograr una comprensión clara de su origen y de las dinámicas que hoy se manifiestan en tu presente. Luego realizamos el trabajo de integración, liberación y reprogramación consciente, buscando restablecer el orden interno y habilitar nuevas posibilidades.",
      duracion: "Duración: 1 hora",
      modalidad: "Modalidad: presencial en Córdoba Capital u online",
      cta: "👉 Consultar disponibilidad por WhatsApp",
    },
    {
      id: "proceso-crea",
      titulo: "Sesiones C.R.E.A. · Proceso de 4 encuentros",
      descripcion:
        "Un proceso de acompañamiento consciente conformado por cuatro encuentros terapéuticos, diseñado para profundizar en el autoconocimiento, la sanación emocional y la transformación personal desde una mirada integral a través del Método C.R.E.A.",
      detalle:
        "Cada sesión tiene una duración de 1 hora y el recorrido se desarrolla de forma personalizada, respetando la historia, el momento vital y el ritmo de cada persona. A lo largo del proceso se integran, según lo que cada etapa requiera: Constelaciones Familiares y Sistémicas, Biodecodificación y Reprogramación Bioneuroemocional, Lectura Akáshica aplicada al proceso terapéutico, Ejercicios y meditaciones de integración, Análisis del árbol generacional y memorias emocionales. Los días y la frecuencia de los encuentros se acuerdan previamente, favoreciendo un seguimiento continuo, consciente y respetuoso.",
      nota:
        "Este proceso no busca abordar síntomas de manera aislada, sino comprender, liberar y reordenar las memorias emocionales, mentales, biológicas y álmicas que hoy se expresan como conflicto o malestar, habilitando un nuevo estado de coherencia interna.",
      cta: "👉 Solicitar información por WhatsApp",
    },
    {
      id: "constelaciones",
      titulo: "Constelaciones Familiares Exclusivas · Grupos reducidos",
      descripcion:
        "Un espacio diseñado para quienes desean un trabajo profundo, íntimo y consciente, en grupos reducidos de hasta 4 personas, favoreciendo la privacidad, la contención y un acompañamiento personalizado.",
      detalle:
        "Todos los participantes constelan. Al desarrollarse dentro de un campo de resonancia sistémica, el grupo se conecta de manera precisa a través de las historias personales y del sistema familiar, potenciando los movimientos de conciencia y sanación individuales y colectivos. Se integran ejercicios y meditaciones sistémicas que acompañan y profundizan el proceso grupal.",
      modalidad: "Modalidad: presencial",
      extra: "Cupos muy limitados",
      cta: "👉 Consultar próximos encuentros por WhatsApp",
    },
  ],
} as const;

export const procesoCreaFoco = {
  title: "Proceso C.R.E.A. · 4 encuentros",
  subtitle: "El servicio más profundo",
  intro:
    "Un proceso de acompañamiento consciente conformado por cuatro encuentros terapéuticos, diseñado para profundizar en el autoconocimiento, la sanación emocional y la transformación personal desde una mirada integral a través del Método C.R.E.A.",
  desarrollo:
    "Cada sesión tiene una duración de 1 hora y el recorrido se desarrolla de forma personalizada, respetando la historia, el momento vital y el ritmo de cada persona. A lo largo del proceso se integran, según lo que cada etapa requiera: Constelaciones Familiares y Sistémicas, Biodecodificación y Reprogramación Bioneuroemocional, Lectura Akáshica aplicada al proceso terapéutico, Ejercicios y meditaciones de integración, Análisis del árbol generacional y memorias emocionales. Los días y la frecuencia de los encuentros se acuerdan previamente, favoreciendo un seguimiento continuo, consciente y respetuoso.",
  paraQuien:
    "Este proceso no busca abordar síntomas de manera aislada, sino comprender, liberar y reordenar las memorias emocionales, mentales, biológicas y álmicas que hoy se expresan como conflicto o malestar, habilitando un nuevo estado de coherencia interna.",
  cta: "👉 Solicitar información por WhatsApp",
} as const;

export const quienAcompana = {
  title: "Una agenda consciente",
  parrafo1:
    "Este año he elegido trabajar con una agenda más consciente, cuidando la energía, el tiempo y la profundidad de cada proceso.",
  parrafo2:
    "Los cupos son limitados para poder ofrecer un acompañamiento presente, respetuoso y personalizado.",
} as const;

export const cierre = {
  title:
    "Todo lo que llega es una oportunidad para mirarte, ordenarte y crear algo nuevo",
  parrafo:
    "Si sentís que este proceso es para vos, escribime y vemos juntos cuál es el espacio más adecuado para acompañarte en este momento.",
  cta: "👉 Contactarme por WhatsApp",
} as const;

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

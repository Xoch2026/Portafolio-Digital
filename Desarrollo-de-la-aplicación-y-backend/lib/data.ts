const REPO = "https://github.com/Xoch2026/Portafolio-Digital";

export const perfil = {
  nombre: "Xochitl Lisbeth Delgado Cano",
  carrera: "Bachillerato General · Instituto Técnico Emiliani",
  frase: "Código con distorsión, interfaces con volumen al máximo.",
  email: "xomerino1309@gmail.com",
  github: "https://github.com/Xoch2026",
};

export type Captura = { src: string; alt: string; pie?: string };
export type Archivo = { nombre: string; ruta: string };

export type Proyecto = {
  slug: string; lado: "A" | "B"; titulo: string; semana: string; resumen: string;
  problema: string; objetivo: string; tecnologias: string[];
  solucion: string[]; resultados: string[];
  equipo?: string; salida?: string; mapa?: string; canva?: string;
  capturas: Captura[]; archivos: Archivo[]; codigo?: Archivo;
  repo: string; // URL del repositorio en GitHub
};

export const proyectos: Proyecto[] = [
  {
    "slug": "regresion-lineal",
    "lado": "A",
    "titulo": "Regresión lineal",
    "semana": "Semana 3",
    "resumen": "Modelo que predice el puntaje (score) de una persona según sus horas de estudio.",
    "problema": "Saber qué puntaje se puede esperar según las horas que se dedican a estudiar, y avisar cuando el dato ingresado queda fuera del rango de los datos disponibles.",
    "objetivo": "Entrenar un modelo de regresión lineal con 30 registros de horas de estudio y score, medir qué tan bien se ajusta y usarlo para hacer predicciones.",
    "tecnologias": [
      "Python",
      "pandas",
      "scikit-learn",
      "Matplotlib"
    ],
    "solucion": [
      "Cargué 30 registros en un DataFrame de pandas: horas de estudio de 0.5 a 15 y score de 1.5 a 10.",
      "Entrené un modelo LinearRegression de scikit-learn con las horas como entrada y el score como valor a predecir.",
      "Calculé la recta (pendiente e intercepto) y medí el ajuste con R² y MSE.",
      "El programa pide las horas de estudio. Si no es un número, muestra un error; si está fuera del rango de 0.5 a 15 horas, avisa que no hay datos para ese valor; si está dentro, predice el score y dibuja la gráfica con la recta y el punto predicho."
    ],
    "resultados": [
      "Pendiente: 0.6017. Cada hora adicional de estudio suma cerca de 0.60 puntos al score.",
      "Intercepto: 1.8269.",
      "R²: 0.9821. La recta explica cerca del 98.2 % de la variación del score.",
      "MSE: 0.1237.",
      "Ejemplo: con 7.5 horas de estudio, el score predicho es 6.34.",
      "En las horas más altas los datos se aplanan cerca de 10 y la recta pasa de ese valor."
    ],
    "salida": "Total de registros: 30\nPendiente: 0.6016907675194659\nIntercepto: 1.826896551724139\nR²: 0.9820863828913831\nMSE: 0.12367979236188362\n\nIngrese las horas de estudio: 7.5\nScore predicho para 7.5 horas de estudio: 6.34\n",
    "capturas": [
      {
        "src": "/proyectos/regresion-lineal/grafica.png",
        "alt": "Gráfica de regresión lineal con los datos, la recta roja y el punto verde de la predicción",
        "pie": "Datos, recta de regresión y predicción para 7.5 horas. Gráfica generada al ejecutar el código."
      }
    ],
    "archivos": [
      {
        "nombre": "regresion_lineal.py",
        "ruta": "/proyectos/regresion-lineal/regresion_lineal.py"
      }
    ],
    "codigo": {
      "nombre": "regresion_lineal.py",
      "ruta": "/proyectos/regresion-lineal/regresion_lineal.py"
    },
    "repo": REPO
  },
  {
    "slug": "laberinto",
    "lado": "A",
    "titulo": "Laberinto (árboles de decisión)",
    "semana": "Semana 4",
    "resumen": "Juego de laberinto en Python y Pygame: el mapa se genera solo con DFS y el camino más corto se calcula con BFS.",
    "problema": "Un laberinto dibujado a mano siempre es igual y se memoriza. Hacía falta un mapa distinto en cada partida, con solución garantizada, y una forma de calcular el camino más corto para saber qué tan bien se está jugando.",
    "objetivo": "Aplicar recorridos de grafos en un juego interactivo: usar DFS con backtracking para generar el laberinto y BFS para encontrar la ruta más corta hasta la meta.",
    "tecnologias": [
      "Python",
      "Pygame",
      "DFS (backtracking)",
      "BFS"
    ],
    "solucion": [
      "Mapa: el laberinto es una matriz de 27 filas por 39 columnas donde 1 es pared y 0 es camino. Empieza todo en paredes y el jugador sale de la celda (1, 1).",
      "Generación con DFS: una pila guarda el recorrido. Desde la celda actual se elige al azar un vecino sin visitar a dos celdas de distancia, se derriba la pared que hay en medio y se avanza. Cuando no quedan vecinos se retrocede. Así se obtiene un laberinto sin ciclos y con un solo camino entre dos puntos.",
      "Atajos: se toma el 10 % de las paredes interiores al azar y se derriban solo si tienen camino libre a ambos lados en línea recta. Esto crea ciclos y varias rutas posibles.",
      "Camino más corto con BFS: una cola explora el mapa por capas, guarda de qué celda llegó a cada una y reconstruye la ruta desde la meta hacia atrás. Como todos los pasos cuestan lo mismo, la ruta encontrada es la más corta.",
      "Juego con Pygame: el jugador (círculo cian) se mueve con las flechas o con WASD y no puede atravesar paredes. La meta (cuadro magenta) está en la esquina opuesta. El programa cuenta los pasos y los muestra arriba junto con la distancia mínima.",
      "Controles: H dibuja durante 3 segundos la ruta de BFS en dorado, R reinicia con un laberinto nuevo y, al llegar a la meta, aparece una pantalla de felicitación con los pasos usados y ENTER o R para jugar otra vez."
    ],
    "resultados": [
      "Cada partida crea un laberinto distinto de 27 × 39 celdas y siempre tiene solución: en una prueba con 200 laberintos generados, la meta fue alcanzable en los 200.",
      "Los atajos acortan y diversifican el recorrido: la ruta mínima promedió 80.3 pasos (entre 60 y 148), frente a 199.3 pasos en promedio cuando no se agregaban atajos.",
      "Al seguir la ruta que calcula BFS, el jugador llega a la meta en exactamente la cantidad mínima de pasos (86 en la partida de prueba). Después de ganar, el jugador ya no se mueve.",
      "El juego muestra pasos, distancia mínima, pista temporal con H, reinicio con R y pantalla de victoria.",
      "Detalle: al pulsar H, la distancia mínima de la barra superior se recalcula desde la posición actual del jugador y no desde el inicio."
    ],
    "capturas": [
      {
        "src": "/proyectos/laberinto/captura-laberinto.png",
        "alt": "Captura del juego del laberinto: jugador cian arriba a la izquierda, meta magenta abajo a la derecha y barra superior con los pasos y la distancia mínima",
        "pie": "Laberinto generado con DFS al iniciar una partida: 0 pasos y distancia mínima de 88 calculada con BFS."
      }
    ],
    "archivos": [
      {
        "nombre": "laberinto.py",
        "ruta": "/proyectos/laberinto/laberinto.py"
      }
    ],
    "codigo": {
      "nombre": "laberinto.py",
      "ruta": "/proyectos/laberinto/laberinto.py"
    },
    "repo": REPO
  },
  {
    "slug": "kmeans-knn",
    "lado": "B",
    "titulo": "AI Challenge: K-Means y KNN",
    "semana": "Actividad del curso",
    "resumen": "Agrupación con K-Means y clasificación con KNN de 500 estudiantes simulados.",
    "problema": "Descubrir grupos de estudiantes con hábitos parecidos y predecir si un estudiante aprobará según sus horas de estudio, su asistencia y sus tareas.",
    "objetivo": "Aplicar K-Means con 3 y 4 grupos, entrenar un KNN, comparar su resultado con y sin normalizar los datos y probar el modelo con un estudiante nuevo.",
    "tecnologias": [
      "Python",
      "NumPy",
      "pandas",
      "scikit-learn",
      "Matplotlib"
    ],
    "solucion": [
      "Generé un dataset simulado (semilla 42) con 500 estudiantes: horas de estudio de 1 a 10, asistencia de 40 a 100 y tareas de 30 a 100. La nota sale de una fórmula con algo de ruido y se marca como aprobado si es 60 o más.",
      "Normalicé las tres variables con StandardScaler.",
      "Apliqué K-Means con 3 y con 4 grupos, calculé los promedios de cada grupo y grafiqué horas de estudio contra nota.",
      "Entrené un KNN con 75 % de los datos para entrenar y 25 % para probar, con k = 1, 3, 5, 7, 11, 15 y 21, y comparé la exactitud con y sin normalización.",
      "En el desafío final elegí el mejor k y predije el resultado de un estudiante nuevo: 4 horas de estudio, 55 % de asistencia y 50 % de tareas."
    ],
    "resultados": [
      "El dataset quedó con 311 aprobados y 189 reprobados.",
      "Con K = 3 aparecen un grupo de estudio alto (8.3 horas, nota promedio 79.8), uno de estudio bajo (2.9 horas, nota 49.7) y uno de asistencia alta (89.5 %, nota 74.3).",
      "Con K = 4 los grupos también se separan por tareas: uno con 85.7 % de tareas y otro con 47.6 %.",
      "Con normalización, la exactitud del KNN va de 0.872 (k = 1) a 0.912 (k = 21).",
      "Sin normalización baja de 0.832 (k = 1) a 0.696 (k = 21). Normalizar mejora el modelo, sobre todo con k altos.",
      "Mejor valor: k = 21, con exactitud de 0.912 (91.2 %).",
      "El estudiante nuevo se clasificó como REPROBADO, con probabilidad de 95.24 % de reprobar y 4.76 % de aprobar."
    ],
    "salida": "\nPromedios por grupo (K=3):\n           Horas  Asistencia     Tareas       Nota\nGrupo3                                            \n0       8.253333   60.040000  72.526667  79.825139\n1       2.852761   58.515337  60.552147  49.730647\n2       5.411765   89.497326  61.748663  74.297464\n\nPromedios por grupo (K=4):\n           Horas  Asistencia     Tareas       Nota\nGrupo4                                            \n0       6.264000   87.952000  47.576000  74.500157\n1       2.830986   57.232394  57.647887  48.669125\n2       4.576577   83.621622  85.702703  73.569542\n3       8.377049   56.368852  70.901639  78.555224\n\nRESULTADOS CON NORMALIZACIÓN:\nk=1 -> 0.8720\nk=3 -> 0.8720\nk=5 -> 0.8800\nk=7 -> 0.8880\nk=11 -> 0.9040\nk=15 -> 0.8960\nk=21 -> 0.9120\n\nRESULTADOS SIN NORMALIZACIÓN:\nk=1 -> 0.8320\nk=3 -> 0.7920\nk=5 -> 0.7920\nk=7 -> 0.7760\nk=11 -> 0.7040\nk=15 -> 0.6960\nk=21 -> 0.6960\n\nTabla comparativa:\n    k  Con_Normalizacion  Sin_Normalizacion\n0   1              0.872              0.832\n1   3              0.872              0.792\n2   5              0.880              0.792\n3   7              0.888              0.776\n4  11              0.904              0.704\n5  15              0.896              0.696\n6  21              0.912              0.696\n\nMejor valor de k: 21\n\nRESULTADO DEL DESAFÍO\nPredicción: REPROBADO\n\nProbabilidades:\n[[0.95238095 0.04761905]]\n",
    "capturas": [
      {
        "src": "/proyectos/kmeans-knn/kmeans_3_grupos.png",
        "alt": "Gráfica de K-Means con 3 grupos: horas de estudio contra nota",
        "pie": "K-Means con 3 grupos."
      },
      {
        "src": "/proyectos/kmeans-knn/kmeans_4_grupos.png",
        "alt": "Gráfica de K-Means con 4 grupos: horas de estudio contra nota",
        "pie": "K-Means con 4 grupos."
      },
      {
        "src": "/proyectos/kmeans-knn/knn_comparacion.png",
        "alt": "Gráfica que compara la exactitud del KNN con y sin normalización según k",
        "pie": "Exactitud del KNN con y sin normalización."
      }
    ],
    "archivos": [
      {
        "nombre": "ai_challenge_kmeans_knn.py",
        "ruta": "/proyectos/kmeans-knn/ai_challenge_kmeans_knn.py"
      }
    ],
    "codigo": {
      "nombre": "ai_challenge_kmeans_knn.py",
      "ruta": "/proyectos/kmeans-knn/ai_challenge_kmeans_knn.py"
    },
    "repo": REPO
  },
  {
    "slug": "hotspots-comerciales",
    "lado": "B",
    "titulo": "Hotspots comerciales: Wendy's San Salvador",
    "semana": "Proyecto grupal · Noviembre 2026",
    "equipo": "Grupo «El Crustáceo Cascarudo», Centro ¡Supérate! Fundación Frech.",
    "resumen": "Análisis de las 11 sucursales de Wendy's de San Salvador con K-Means y KNN con distancia Haversine.",
    "problema": "Antes de abrir una nueva sucursal conviene saber cómo está repartida la marca en el territorio: una zona donde ya hay varios locales no ofrece las mismas condiciones que una donde hay pocos.",
    "objetivo": "Reconocer las áreas con mayor presencia de establecimientos y analizar cómo se comportaría una posible nueva sucursal dentro de ellas. Es un prototipo académico: describe cómo se distribuyen los locales, pero no determina si abrir una sucursal sería rentable.",
    "tecnologias": [
      "Python",
      "pandas",
      "NumPy",
      "scikit-learn",
      "folium",
      "Streamlit",
      "Overpass API (OpenStreetMap)",
      "Jupyter Notebook",
      "Canva"
    ],
    "solucion": [
      "Recopilación: consulta automática con la Overpass API a OpenStreetMap de los locales fast_food o restaurant de Wendy's en el departamento de San Salvador. Resultado: 11 establecimientos.",
      "Depuración: se dejaron solo los registros dentro del área definida (latitud 13.45 a 14.08, longitud -89.30 a -89.00), se quitaron los repetidos y se mantuvieron los valores desconocidos sin inventar datos.",
      "K-Means: se agruparon los locales por su posición con K de 2 a 7, comparando la inercia y el coeficiente de silueta. Se escogieron 3 agrupaciones.",
      "KNN con distancia Haversine: las coordenadas se pasaron a radianes y se usó el radio de la Tierra de 6,371 km. Cada grupo se etiquetó como Alta o Baja concentración según su cantidad de locales frente al promedio. El número de vecinos se eligió con validación Leave-One-Out entre k = 1, 3, 5, 7 y 9.",
      "Entregables: informe, notebook ejecutable, aplicación interactiva en Streamlit, mapa HTML, datasets y presentación en Canva."
    ],
    "resultados": [
      "Las 11 sucursales quedaron en 3 agrupaciones comerciales, con un promedio de 3.67 locales por grupo y un coeficiente de silueta de 0.5114.",
      "KNN con k = 3 alcanzó una exactitud Leave-One-Out de 90.91 % (10 aciertos de 11).",
      "Un punto de prueba en el Paseo General Escalón (13.7015, -89.231) se clasificó como Alta concentración. Sus tres vecinos más cercanos estaban a 0.044 km, 1.038 km y 1.713 km.",
      "Lectura del resultado: la zona ya tiene presencia de la marca, no es una oportunidad libre para abrir otro local.",
      "Limitaciones: datos de OpenStreetMap incompletos, etiquetas basadas en una regla del equipo, pocos datos, distancia en línea recta y sin factores económicos."
    ],
    "capturas": [
      {
        "src": "/proyectos/hotspots-comerciales/figura1_inercia_silueta.png",
        "alt": "Inercia y coeficiente de silueta según el número de agrupaciones K",
        "pie": "Inercia y coeficiente de silueta según K. El punto rojo marca K = 3. Figura del informe."
      },
      {
        "src": "/proyectos/hotspots-comerciales/figura2_vecinos.png",
        "alt": "Distancia del punto evaluado a sus tres vecinos más cercanos",
        "pie": "Distancia del punto evaluado a sus tres vecinos más cercanos. Figura del informe."
      }
    ],
    "mapa": "/proyectos/hotspots-comerciales/mapa_wendys.html",
    "canva": "https://canva.link/8oqwiq9e31apia5",
    "archivos": [
      {
        "nombre": "Informe.pdf",
        "ruta": "/proyectos/hotspots-comerciales/Informe.pdf"
      },
      {
        "nombre": "proyecto_hotspots_wendys_sv.ipynb",
        "ruta": "/proyectos/hotspots-comerciales/proyecto_hotspots_wendys_sv.ipynb"
      },
      {
        "nombre": "app.py (aplicación Streamlit)",
        "ruta": "/proyectos/hotspots-comerciales/app.py"
      },
      {
        "nombre": "mapa_wendys.html",
        "ruta": "/proyectos/hotspots-comerciales/mapa_wendys.html"
      },
      {
        "nombre": "wendys_san_salvador_limpio.csv",
        "ruta": "/proyectos/hotspots-comerciales/wendys_san_salvador_limpio.csv"
      },
      {
        "nombre": "dataset_final_wendys_san_salvador.csv",
        "ruta": "/proyectos/hotspots-comerciales/dataset_final_wendys_san_salvador.csv"
      },
      {
        "nombre": "requirements.txt",
        "ruta": "/proyectos/hotspots-comerciales/requirements.txt"
      }
    ],
    "codigo": {
      "nombre": "app.py",
      "ruta": "/proyectos/hotspots-comerciales/app.py"
    },
    "repo": REPO
  },
  {
    "slug": "ingenia",
    "lado": "B",
    "titulo": "Ingenia: plataforma web para albañiles",
    "semana": "ExpoTech · Mayo 2026",
    "equipo": "Proyecto presentado en ExpoTech, Centro ¡Supérate! Fundación Frech.",
    "resumen": "Página web que conecta a albañiles con clientes y con ferreterías aliadas para proyectos y presupuestos.",
    "problema": "Los albañiles tienen pocas formas de darse a conocer y los clientes no saben en quién confiar ni cuánto costará su proyecto. Ingenia reúne en un solo lugar a clientes, albañiles y ferreterías.",
    "objetivo": "Crear una plataforma web donde los clientes encuentren albañiles verificados y reciban presupuestos, y donde los albañiles consigan trabajo y materiales con ferreterías aliadas.",
    "tecnologias": [
      "HTML",
      "CSS",
      "JavaScript",
      "PHP",
      "Azure SQL",
      "Azure Web App",
      "Azure Document Intelligence (OCR)",
      "PHPMailer",
      "Inicio de sesión con Google y Microsoft",
      "GitHub Actions"
    ],
    "solucion": [
      "Página de inicio: presenta la plataforma, explica cómo funciona para clientes y para albañiles, sus beneficios y las ferreterías aliadas.",
      "Elección de perfil: la persona escoge si es cliente o albañil, y ese rol se guarda en el navegador.",
      "Registro por pasos: datos personales, ubicación (departamento, municipio y distrito), contraseña y perfil con títulos y trabajos destacados.",
      "Inicio de sesión con correo, con cuenta de Microsoft o con cuenta de Google. El correo recibe un código de verificación que se guarda cifrado.",
      "Verificación de identidad con OCR: se escanean el frente y el reverso del DUI y sus datos se leen con Azure Document Intelligence. La contraseña y el número de DUI se guardan con hash, no en texto plano.",
      "Pantallas de uso: directorio de albañiles con búsqueda, calificación, experiencia y ciudad; ferreterías aliadas con dirección, teléfono y horario; mis proyectos; e inventario de materiales y herramientas.",
      "Servidor y despliegue: backend en PHP con base de datos Azure SQL, publicado en un Azure Web App mediante GitHub Actions."
    ],
    "resultados": [
      "Prototipo funcional presentado en ExpoTech, en el Centro ¡Supérate! (mayo 2026).",
      "Registro con verificación por correo y por documento de identidad.",
      "Interfaz con página de inicio, selección de perfil, directorio de albañiles, ferreterías aliadas, proyectos e inventario.",
      "Los albañiles y ferreterías que aparecen en las pantallas son datos de ejemplo.",
      "El código del servidor (PHP) no se publica aquí por seguridad, porque usa claves y conexiones privadas."
    ],
    "capturas": [],
    "archivos": [
      {
        "nombre": "web.html (página de inicio)",
        "ruta": "/proyectos/ingenia/web.html"
      },
      {
        "nombre": "user.html (elección de perfil)",
        "ruta": "/proyectos/ingenia/user.html"
      },
      {
        "nombre": "albaniles.html (directorio de albañiles)",
        "ruta": "/proyectos/ingenia/albaniles.html"
      },
      {
        "nombre": "ferreterias.html (ferreterías aliadas)",
        "ruta": "/proyectos/ingenia/ferreterias.html"
      },
      {
        "nombre": "inventario.html (inventario del proyecto)",
        "ruta": "/proyectos/ingenia/inventario.html"
      },
      {
        "nombre": "Main-Javascript.js (lógica del cliente)",
        "ruta": "/proyectos/ingenia/Main-Javascript.js"
      }
    ],
    "codigo": {
      "nombre": "Main-Javascript.js",
      "ruta": "/proyectos/ingenia/Main-Javascript.js"
    },
    "repo": REPO
  },
  {
    "slug": "app-y-backend",
    "lado": "B",
    "titulo": "App web y backend",
    "semana": "Actividad del curso",
    "resumen": "Este portafolio: Next.js, componentes React y una API REST para el formulario de contacto.",
    "problema": "Reunir mi trabajo en una página web pública y permitir que cualquier persona me escriba desde ella.",
    "objetivo": "Construir y publicar mi portafolio con Next.js, React, TypeScript y Tailwind CSS, con un formulario de contacto conectado a una API REST.",
    "tecnologias": [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Git y GitHub",
      "Vercel"
    ],
    "solucion": [
      "Estructura: proyecto Next.js con App Router. La página principal arma las siete secciones, el layout carga las tipografías y los metadatos, y el archivo de estilos define la paleta y el efecto neón con Tailwind CSS.",
      "Componentes React: el formulario de contacto (con estado en el cliente) y componentes reutilizables de la página para las subsecciones y las etiquetas.",
      "Organización: los datos del portafolio están en lib/data.ts y cada proyecto tiene su página de detalle en la ruta dinámica proyectos/[slug].",
      "Backend: el endpoint POST /api/contact recibe un JSON con nombre, correo y mensaje, y responde en JSON.",
      "Validaciones: el navegador revisa que el nombre tenga al menos 2 letras, que el correo tenga formato válido y que el mensaje tenga al menos 10 caracteres. El servidor vuelve a validar (mensaje de 10 a 2000 caracteres) y responde 400 si el JSON no es válido o 422 si los datos no son válidos. La interfaz muestra un mensaje de éxito o de error."
    ],
    "resultados": [
      "El portafolio compila sin errores de TypeScript y genera la página principal y una página de detalle para cada proyecto.",
      "La API POST /api/contact responde 200 con un mensaje de éxito cuando los datos son válidos, 422 con el motivo cuando el correo o el mensaje no cumplen las reglas, y 400 cuando el cuerpo no es JSON.",
      "El formulario muestra los errores junto a cada campo antes de enviar y un mensaje de éxito o de error según la respuesta del servidor."
    ],
    "capturas": [
      {
        "src": "/proyectos/app-y-backend/captura-portafolio.png",
        "alt": "Captura del portafolio en el navegador: sección Sobre mí con intereses, objetivos personales y profesionales y fortalezas, y el menú de navegación arriba",
        "pie": "Sección «Sobre mí» del portafolio funcionando en el navegador, con el menú de navegación fijo arriba."
      }
    ],
    "archivos": [],
    "repo": REPO
  }
];

export const experiencia = [
  { cuando: "Diciembre 2025", tipo: "Trabajo", titulo: "Cobradora y preparación de alimentos", lugar: "Negocio familiar",
    detalle: "Responsable del cobro a clientes y de la preparación de nachos, palomitas y panes con pollo." },
  { cuando: "Octubre 2026", tipo: "Proyecto", titulo: "Feria CIMAT · VitalAir", lugar: "ABC, Santa Tecla",
    detalle: "Prototipo de AMBU automatizado controlado desde una app, con motores que se ajustan al nivel de oxígeno del paciente." },
  { cuando: "Julio 2026", tipo: "Proyecto", titulo: "Expo de ecosistemas · BioSpectra", lugar: "Expo abierta al público",
    detalle: "Detección de vida vegetal en planetas hipotéticos con espectroscopio, clorofila y un software de la NASA." },
  { cuando: "Mayo 2026", tipo: "Proyecto", titulo: "ExpoTech · Ingenia", lugar: "Centro ¡Supérate!",
    detalle: "Página web que ayuda a albañiles a buscar trabajo, con ferreterías aliadas para proyectos y presupuestos." },
  { cuando: "Septiembre 2025", tipo: "Proyecto", titulo: "Expo de Logros · Sentinel", lugar: "Centro ¡Supérate!",
    detalle: "App de seguridad vial que detecta somnolencia al conducir y avisa al contacto de emergencia si no hay respuesta." },
  { cuando: "Octubre 2024", tipo: "Hackathon", titulo: "Mom's Steps", lugar: "Centro ¡Supérate!",
    detalle: "App en Power Apps para madres embarazadas que muestra las vacunas que necesitan las madres y los bebés." },
  { cuando: "Actualidad", tipo: "Voluntariado", titulo: "Iglesia La Sagrada Familia", lugar: "Según se necesite",
    detalle: "Apoyo en venta de ropa usada y entrega de donaciones de juguetes y comida; armado y entrega mensual de víveres a adultos mayores." },
  { cuando: "Actualidad", tipo: "Actividad extracurricular", titulo: "Grupo juvenil Padre Dean Brackley", lugar: "Iglesia La Sagrada Familia",
    detalle: "Participación en asambleas y consejería." },
];

export const habilidades: Record<string, string[]> = {
  "Lenguajes de programación": ["Python (nivel básico)"],
  "Desarrollo web": ["HTML", "CSS"],
  "Bases de datos": ["MySQL"],
  "Herramientas tecnológicas": ["Excel (MOS Expert)", "Power Apps", "Circuitos electrónicos (nivel básico)"],
  "Inteligencia artificial y Machine Learning": ["Regresión lineal", "K-Means", "KNN", "scikit-learn", "pandas", "NumPy", "Matplotlib"],
  "Habilidades personales": ["Liderazgo", "Responsabilidad", "Pensamiento analítico", "Empatía", "Perseverancia"],
  "Idiomas": ["Español (nativo)", "Inglés B1 (intermedio)"],
};

export const descripcionHabilidades: Record<string, string> = {
  "Lenguajes de programación": "Los lenguajes con los que escribo código.",
  "Desarrollo web": "Lo que uso para construir páginas web.",
  "Bases de datos": "Los sistemas que uso para guardar y consultar información.",
  "Herramientas tecnológicas": "Programas y componentes que uso para crear mis proyectos.",
  "Inteligencia artificial y Machine Learning": "Los algoritmos y bibliotecas que usé para analizar datos y entrenar modelos.",
  "Habilidades personales": "Mi forma de trabajar con otras personas y de enfrentar retos.",
  "Idiomas": "Los idiomas que hablo.",
};

export const sobreMi = {
  quien: "Soy Xochitl Lisbeth Delgado Cano, bachiller general próxima a graduarme y becaria del Centro ¡Supérate! Fundación Frech, en San Salvador. He desarrollado proyectos de tecnología con programación, diseño web, electrónica y aplicaciones, y cuento con certificaciones MOS en Excel.",
  estudio: "Bachillerato General en el Instituto Técnico Emiliani (enero 2025 – noviembre 2026) y formación como becaria en el Centro ¡Supérate! Fundación Frech (2024 – 2026).",
  intereses: ["Programación", "Diseño web", "Electrónica", "Aplicaciones"],
  objetivos: {
    personales: [
      "Ser políglota para conectar con personas de todo el mundo.",
      "Conocer nuevas culturas y viajar con curiosidad y respeto.",
      "Hacer voluntariados con niños, adultos mayores y animales, porque ayudar me llena el corazón.",
      "Compartir lo que sé con los niños y disfrutar el tiempo con ellos.",
      "Lograr mi estabilidad económica.",
      "Tener mi casa propia.",
    ],
    profesionales: [
      "Tener un trabajo estable y flexible en informática que me permita crecer.",
      "Aportar económicamente a causas sociales, incluso cuando no pueda asistir a un voluntariado.",
      "Trabajar en el extranjero y vivir nuevas experiencias profesionales.",
      "Estudiar una maestría en ingeniería en sistemas y luego un doctorado de especialización.",
      "Crear, poco a poco, mi propia empresa.",
      "Fundar mi propia ONG para ayudar en diferentes áreas donde más se necesite.",
    ],
  },
};

export const formacion: { titulo: string; descripcion: string; items: string[] }[] = [
  { titulo: "Institución educativa", descripcion: "Los lugares donde estudio y me formo.", items: ["Instituto Técnico Emiliani", "Centro ¡Supérate! Fundación Frech"] },
  { titulo: "Estudios actuales", descripcion: "Lo que estoy estudiando en este momento.", items: ["Bachillerato General, en proceso de graduación (enero 2025 – noviembre 2026)"] },
  { titulo: "Cursos realizados", descripcion: "Cursos que he completado para aprender más allá del colegio.", items: [
    "Platzi (septiembre 2026): Encontrar tu propósito de vida",
    "Platzi (septiembre 2026): Networking efectivo",
    "Platzi (septiembre 2026): Diseño y desarrollo de plan de carrera",
    "Curso de emprendimiento, Empower Youth (2024)"] },
  { titulo: "Certificaciones obtenidas", descripcion: "Certificados oficiales que he obtenido o estoy preparando.", items: [
    "MOS Excel Expert, Microsoft (mayo 2026)",
    "MOS Excel Specialist, Microsoft (noviembre 2025)",
    "TOEIC (en proceso, fecha estimada: diciembre 2026)"] },
  { titulo: "Reconocimientos académicos", descripcion: "Reconocimientos que recibí por mi desempeño.", items: ["Beca del Centro ¡Supérate! Fundación Frech (2024 – 2026)"] },
  { titulo: "Formación complementaria", descripcion: "Otros aprendizajes que complementan mis estudios.", items: ["Inglés B1 (intermedio)", "Participación en hackathon y expos de tecnología"] },
];

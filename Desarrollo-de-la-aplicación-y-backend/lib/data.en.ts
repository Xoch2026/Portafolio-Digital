// Versión en inglés del contenido del portafolio.
// Los datos que no cambian de idioma (rutas de archivos, imágenes, enlaces, repositorio) se toman de lib/data.ts.
// Aquí solo van los textos. Los proyectos se unen por "slug" en lib/contenido.ts.

export const perfilEn = {
  nombre: "Xochitl Lisbeth Delgado Cano",
  carrera: "General High School Diploma · Instituto Técnico Emiliani",
  frase: "Code with distortion, interfaces cranked up to eleven.",
  email: "xomerino1309@gmail.com",
  github: "https://github.com/Xoch2026",
};

export type TextoProyecto = {
  titulo: string;
  semana: string;
  resumen: string;
  problema: string;
  objetivo: string;
  solucion: string[];
  resultados: string[];
  equipo?: string;
  tecnologias?: string[];
  capturas?: { alt: string; pie?: string }[]; // en el mismo orden que en lib/data.ts
  archivos?: string[]; // nombres a mostrar, en el mismo orden que en lib/data.ts
};

export const textosProyectosEn: Record<string, TextoProyecto> = {
  "regresion-lineal": {
    titulo: "Linear regression",
    semana: "Week 3",
    resumen: "Model that predicts a person's score based on their study hours.",
    problema:
      "Knowing what score to expect based on the hours spent studying, and warning when the value entered falls outside the range of the available data.",
    objetivo:
      "Train a linear regression model with 30 records of study hours and scores, measure how well it fits, and use it to make predictions.",
    solucion: [
      "I loaded 30 records into a pandas DataFrame: study hours from 0.5 to 15 and scores from 1.5 to 10.",
      "I trained a scikit-learn LinearRegression model with study hours as the input and the score as the value to predict.",
      "I calculated the line (slope and intercept) and measured the fit with R² and MSE.",
      "The program asks for the study hours. If the input is not a number, it shows an error; if it is outside the 0.5 to 15 hour range, it warns that there is no data for that value; if it is within range, it predicts the score and draws the chart with the line and the predicted point.",
    ],
    resultados: [
      "Slope: 0.6017. Each additional hour of study adds about 0.60 points to the score.",
      "Intercept: 1.8269.",
      "R²: 0.9821. The line explains about 98.2% of the variation in the score.",
      "MSE: 0.1237.",
      "Example: with 7.5 study hours, the predicted score is 6.34.",
      "At the highest hours the data flatten out near 10 and the line goes past that value.",
    ],
    capturas: [
      {
        alt: "Linear regression chart with the data points, the red line, and the green point of the prediction",
        pie: "Data, regression line, and prediction for 7.5 hours. Chart generated when running the code.",
      },
    ],
  },

  laberinto: {
    titulo: "Maze (decision trees)",
    semana: "Week 4",
    resumen:
      "Maze game in Python and Pygame: the map generates itself with DFS and the shortest path is calculated with BFS.",
    problema:
      "A hand-drawn maze is always the same and ends up memorized. The game needed a different map every time, with a guaranteed solution, and a way to calculate the shortest path to know how well one is playing.",
    objetivo:
      "Apply graph traversals in an interactive game: use DFS with backtracking to generate the maze and BFS to find the shortest route to the goal.",
    solucion: [
      "Map: the maze is a matrix of 27 rows by 39 columns where 1 is a wall and 0 is a path. Everything starts as walls and the player starts at cell (1, 1).",
      "Generation with DFS: a stack keeps track of the path. From the current cell, an unvisited neighbor two cells away is picked at random, the wall in between is knocked down, and the search moves forward. When no neighbors are left, it backtracks. This produces a maze with no cycles and a single path between any two points.",
      "Shortcuts: 10% of the interior walls are picked at random and are knocked down only if they have a clear path on both sides in a straight line. This creates cycles and several possible routes.",
      "Shortest path with BFS: a queue explores the map layer by layer, records which cell each one was reached from, and rebuilds the route from the goal backwards. Since every step costs the same, the route found is the shortest.",
      "Game with Pygame: the player (cyan circle) moves with the arrow keys or WASD and cannot go through walls. The goal (magenta square) is in the opposite corner. The program counts the steps and shows them at the top along with the minimum distance.",
      "Controls: H draws the BFS route in gold for 3 seconds, R restarts with a new maze, and when the goal is reached a congratulations screen appears with the steps used and ENTER or R to play again.",
    ],
    resultados: [
      "Each game creates a different maze of 27 × 39 cells and it always has a solution: in a test with 200 generated mazes, the goal was reachable in all 200.",
      "Shortcuts shorten and diversify the route: the minimum route averaged 80.3 steps (between 60 and 148), compared to 199.3 steps on average when no shortcuts were added.",
      "When following the route calculated by BFS, the player reaches the goal in exactly the minimum number of steps (86 in the test game). After winning, the player no longer moves.",
      "The game shows steps, minimum distance, a temporary hint with H, restart with R, and a victory screen.",
      "Detail: when pressing H, the minimum distance in the top bar is recalculated from the player's current position and not from the start.",
    ],
    capturas: [
      {
        alt: "Screenshot of the maze game: cyan player at the top left, magenta goal at the bottom right, and a top bar with the steps and the minimum distance",
        pie: "Maze generated with DFS at the start of a game: 0 steps and a minimum distance of 88 calculated with BFS.",
      },
    ],
  },

  "kmeans-knn": {
    titulo: "AI Challenge: K-Means and KNN",
    semana: "Course activity",
    resumen: "K-Means grouping and KNN classification of 500 simulated students.",
    problema:
      "Discover groups of students with similar habits and predict whether a student will pass based on their study hours, attendance, and assignments.",
    objetivo:
      "Apply K-Means with 3 and 4 groups, train a KNN, compare its result with and without normalizing the data, and test the model with a new student.",
    solucion: [
      "I generated a simulated dataset (seed 42) with 500 students: study hours from 1 to 10, attendance from 40 to 100, and assignments from 30 to 100. The grade comes from a formula with some noise and is marked as passed if it is 60 or higher.",
      "I normalized the three variables with StandardScaler.",
      "I applied K-Means with 3 and with 4 groups, calculated the averages of each group, and plotted study hours against grade.",
      "I trained a KNN with 75% of the data for training and 25% for testing, with k = 1, 3, 5, 7, 11, 15, and 21, and compared the accuracy with and without normalization.",
      "In the final challenge I chose the best k and predicted the result for a new student: 4 study hours, 55% attendance, and 50% assignments.",
    ],
    resultados: [
      "The dataset ended up with 311 students who passed and 189 who failed.",
      "With K = 3 there is a high-study group (8.3 hours, average grade 79.8), a low-study group (2.9 hours, grade 49.7), and a high-attendance group (89.5%, grade 74.3).",
      "With K = 4 the groups also separate by assignments: one with 85.7% of assignments and another with 47.6%.",
      "With normalization, the KNN accuracy goes from 0.872 (k = 1) to 0.912 (k = 21).",
      "Without normalization it drops from 0.832 (k = 1) to 0.696 (k = 21). Normalizing improves the model, especially with high values of k.",
      "Best value: k = 21, with an accuracy of 0.912 (91.2%).",
      "The new student was classified as FAILED, with a 95.24% probability of failing and 4.76% of passing.",
    ],
    capturas: [
      { alt: "K-Means chart with 3 groups: study hours against grade", pie: "K-Means with 3 groups." },
      { alt: "K-Means chart with 4 groups: study hours against grade", pie: "K-Means with 4 groups." },
      {
        alt: "Chart comparing the KNN accuracy with and without normalization according to k",
        pie: "KNN accuracy with and without normalization.",
      },
    ],
  },

  "hotspots-comerciales": {
    titulo: "Commercial hotspots: Wendy's San Salvador",
    semana: "Group project · November 2026",
    equipo: "Team «El Crustáceo Cascarudo», Centro ¡Supérate! Fundación Frech.",
    resumen:
      "Analysis of the 11 Wendy's locations in San Salvador with K-Means and KNN with Haversine distance.",
    problema:
      "Before opening a new branch it is worth knowing how the brand is spread across the territory: an area where there are already several locations does not offer the same conditions as one where there are few.",
    objetivo:
      "Identify the areas with the highest presence of establishments and analyze how a possible new branch would behave within them. It is an academic prototype: it describes how the locations are distributed, but it does not determine whether opening a branch would be profitable.",
    solucion: [
      "Data collection: automated query with the Overpass API to OpenStreetMap for Wendy's locations tagged fast_food or restaurant in the department of San Salvador. Result: 11 establishments.",
      "Cleaning: only the records inside the defined area were kept (latitude 13.45 to 14.08, longitude -89.30 to -89.00), duplicates were removed, and unknown values were kept without making up data.",
      "K-Means: the locations were grouped by position with K from 2 to 7, comparing the inertia and the silhouette coefficient. 3 clusters were chosen.",
      "KNN with Haversine distance: the coordinates were converted to radians and the Earth's radius of 6,371 km was used. Each group was labeled High or Low concentration according to its number of locations compared to the average. The number of neighbors was chosen with Leave-One-Out validation among k = 1, 3, 5, 7, and 9.",
      "Deliverables: report, runnable notebook, interactive Streamlit app, HTML map, datasets, and a Canva presentation.",
    ],
    resultados: [
      "The 11 branches ended up in 3 commercial clusters, with an average of 3.67 locations per group and a silhouette coefficient of 0.5114.",
      "KNN with k = 3 reached a Leave-One-Out accuracy of 90.91% (10 correct out of 11).",
      "A test point on Paseo General Escalón (13.7015, -89.231) was classified as High concentration. Its three nearest neighbors were at 0.044 km, 1.038 km, and 1.713 km.",
      "Reading of the result: the area already has a presence of the brand; it is not a free opportunity to open another location.",
      "Limitations: incomplete OpenStreetMap data, labels based on a rule made by the team, little data, straight-line distance, and no economic factors.",
    ],
    capturas: [
      {
        alt: "Inertia and silhouette coefficient according to the number of clusters K",
        pie: "Inertia and silhouette coefficient according to K. The red dot marks K = 3. Figure from the report.",
      },
      {
        alt: "Distance from the evaluated point to its three nearest neighbors",
        pie: "Distance from the evaluated point to its three nearest neighbors. Figure from the report.",
      },
    ],
    archivos: [
      "Informe.pdf (report, in Spanish)",
      "proyecto_hotspots_wendys_sv.ipynb (notebook)",
      "app.py (Streamlit app)",
      "mapa_wendys.html (map)",
      "wendys_san_salvador_limpio.csv (clean dataset)",
      "dataset_final_wendys_san_salvador.csv (final dataset)",
      "requirements.txt",
    ],
  },

  ingenia: {
    titulo: "Ingenia: web platform for bricklayers",
    semana: "ExpoTech · May 2026",
    equipo: "Project presented at ExpoTech, Centro ¡Supérate! Fundación Frech.",
    resumen:
      "Website that connects bricklayers with clients and with partner hardware stores for projects and quotes.",
    problema:
      "Bricklayers have few ways to make themselves known and clients do not know whom to trust or how much their project will cost. Ingenia brings clients, bricklayers, and hardware stores together in one place.",
    objetivo:
      "Create a web platform where clients find verified bricklayers and receive quotes, and where bricklayers find work and materials from partner hardware stores.",
    tecnologias: [
      "HTML",
      "CSS",
      "JavaScript",
      "PHP",
      "Azure SQL",
      "Azure Web App",
      "Azure Document Intelligence (OCR)",
      "PHPMailer",
      "Google and Microsoft sign-in",
      "GitHub Actions",
    ],
    solucion: [
      "Home page: introduces the platform, explains how it works for clients and for bricklayers, its benefits, and the partner hardware stores.",
      "Profile selection: the person chooses whether they are a client or a bricklayer, and that role is saved in the browser.",
      "Step-by-step registration: personal information, location (department, municipality, and district), password, and a profile with qualifications and featured jobs.",
      "Sign-in with email, with a Microsoft account, or with a Google account. The email receives a verification code that is stored encrypted.",
      "Identity verification with OCR: the front and back of the DUI (national ID) are scanned and their data is read with Azure Document Intelligence. The password and the DUI number are stored hashed, not in plain text.",
      "Screens in use: directory of bricklayers with search, rating, experience, and city; partner hardware stores with address, phone, and hours; my projects; and an inventory of materials and tools.",
      "Server and deployment: PHP backend with an Azure SQL database, published to an Azure Web App through GitHub Actions.",
    ],
    resultados: [
      "Working prototype presented at ExpoTech, at Centro ¡Supérate! (May 2026).",
      "Registration with verification by email and by identity document.",
      "Interface with a home page, profile selection, bricklayer directory, partner hardware stores, projects, and inventory.",
      "The bricklayers and hardware stores shown on the screens are sample data.",
      "The server code (PHP) is not published here for security, because it uses private keys and connections.",
    ],
    archivos: [
      "web.html (home page)",
      "user.html (profile selection)",
      "albaniles.html (bricklayer directory)",
      "ferreterias.html (partner hardware stores)",
      "inventario.html (project inventory)",
      "Main-Javascript.js (client logic)",
    ],
  },

  "app-y-backend": {
    titulo: "Web app and backend",
    semana: "Course activity",
    resumen: "This portfolio: Next.js, React components, and a REST API for the contact form.",
    problema: "Bring my work together on a public web page and let anyone write to me from it.",
    objetivo:
      "Build and publish my portfolio with Next.js, React, TypeScript, and Tailwind CSS, with a contact form connected to a REST API.",
    tecnologias: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Git and GitHub", "Vercel"],
    solucion: [
      "Structure: Next.js project with App Router. The main page puts together the seven sections, the layout loads the fonts and the metadata, and the stylesheet defines the palette and the neon effect with Tailwind CSS.",
      "React components: the contact form (with client-side state) and reusable page components for the subsections and the tags.",
      "Organization: the portfolio data is in lib/data.ts and each project has its own detail page on the dynamic route proyectos/[slug].",
      "Backend: the POST /api/contact endpoint receives a JSON with name, email, and message, and responds in JSON.",
      "Validations: the browser checks that the name has at least 2 letters, that the email has a valid format, and that the message has at least 10 characters. The server validates again (message of 10 to 2000 characters) and responds 400 if the JSON is not valid or 422 if the data is not valid. The interface shows a success or an error message.",
    ],
    resultados: [
      "The portfolio compiles without TypeScript errors and generates the main page and a detail page for each project.",
      "The POST /api/contact API responds 200 with a success message when the data is valid, 422 with the reason when the email or the message do not meet the rules, and 400 when the body is not JSON.",
      "The form shows the errors next to each field before sending and a success or error message depending on the server's response.",
    ],
    capturas: [
      {
        alt: "Screenshot of the portfolio in the browser: About me section with interests, personal and professional goals, and strengths, and the navigation menu at the top",
        pie: "The portfolio's «About me» section working in the browser, with the navigation menu fixed at the top.",
      },
    ],
  },
};

export const experienciaEn = [
  { cuando: "December 2025", tipo: "Job", titulo: "Cashier and food preparation", lugar: "Family business",
    detalle: "In charge of charging customers and preparing nachos, popcorn, and chicken sandwiches (panes con pollo)." },
  { cuando: "October 2026", tipo: "Project", titulo: "CIMAT Fair · VitalAir", lugar: "ABC, Santa Tecla",
    detalle: "Prototype of an automated AMBU resuscitator bag controlled from an app, with motors that adjust to the patient's oxygen level." },
  { cuando: "July 2026", tipo: "Project", titulo: "Ecosystems Expo · BioSpectra", lugar: "Expo open to the public",
    detalle: "Detection of plant life on hypothetical planets with a spectroscope, chlorophyll, and NASA software." },
  { cuando: "May 2026", tipo: "Project", titulo: "ExpoTech · Ingenia", lugar: "Centro ¡Supérate!",
    detalle: "Website that helps bricklayers look for work, with partner hardware stores for projects and quotes." },
  { cuando: "September 2025", tipo: "Project", titulo: "Achievements Expo · Sentinel", lugar: "Centro ¡Supérate!",
    detalle: "Road safety app that detects drowsiness while driving and alerts the emergency contact if there is no response." },
  { cuando: "October 2024", tipo: "Hackathon", titulo: "Mom's Steps", lugar: "Centro ¡Supérate!",
    detalle: "Power Apps app for pregnant mothers that shows the vaccines that mothers and babies need." },
  { cuando: "Present", tipo: "Volunteering", titulo: "La Sagrada Familia Church", lugar: "As needed",
    detalle: "Support with used clothing sales and delivery of toy and food donations; monthly packing and delivery of food supplies to older adults." },
  { cuando: "Present", tipo: "Extracurricular activity", titulo: "Padre Dean Brackley youth group", lugar: "La Sagrada Familia Church",
    detalle: "Participation in assemblies and counseling." },
];

export const habilidadesEn: Record<string, string[]> = {
  "Programming languages": ["Python (basic level)"],
  "Web development": ["HTML", "CSS"],
  "Databases": ["MySQL"],
  "Technology tools": ["Excel (MOS Expert)", "Power Apps", "Electronic circuits (basic level)"],
  "Artificial intelligence and Machine Learning": ["Linear regression", "K-Means", "KNN", "scikit-learn", "pandas", "NumPy", "Matplotlib"],
  "Personal skills": ["Leadership", "Responsibility", "Analytical thinking", "Empathy", "Perseverance"],
  "Languages": ["Spanish (native)", "English B1 (intermediate)"],
};

export const fortalezasEn = habilidadesEn["Personal skills"];

export const descripcionHabilidadesEn: Record<string, string> = {
  "Programming languages": "The languages I write code in.",
  "Web development": "What I use to build web pages.",
  "Databases": "The systems I use to store and query information.",
  "Technology tools": "Programs and components I use to create my projects.",
  "Artificial intelligence and Machine Learning": "The algorithms and libraries I used to analyze data and train models.",
  "Personal skills": "How I work with other people and face challenges.",
  "Languages": "The languages I speak.",
};

export const sobreMiEn = {
  quien:
    "I am Xochitl Lisbeth Delgado Cano, a general high school student about to graduate and a scholarship recipient at Centro ¡Supérate! Fundación Frech, in San Salvador. I have developed technology projects involving programming, web design, electronics, and apps, and I hold MOS certifications in Excel.",
  estudio:
    "General High School Diploma (Bachillerato General) at Instituto Técnico Emiliani (January 2025 – November 2026) and training as a scholarship recipient at Centro ¡Supérate! Fundación Frech (2024 – 2026).",
  intereses: ["Programming", "Web design", "Electronics", "Apps"],
  objetivos: {
    personales: [
      "Be a polyglot to connect with people all over the world.",
      "Learn about new cultures and travel with curiosity and respect.",
      "Volunteer with children, older adults, and animals, because helping fills my heart.",
      "Share what I know with children and enjoy my time with them.",
      "Achieve financial stability.",
      "Own my own home.",
    ],
    profesionales: [
      "Have a stable and flexible job in IT that lets me grow.",
      "Contribute financially to social causes, even when I cannot attend a volunteer activity.",
      "Work abroad and live new professional experiences.",
      "Study a master's degree in systems engineering and then a specialization doctorate.",
      "Gradually build my own company.",
      "Found my own NGO to help in different areas where it is needed most.",
    ],
  },
};

export const formacionEn: { titulo: string; descripcion: string; items: string[] }[] = [
  { titulo: "Educational institutions", descripcion: "The places where I study and train.", items: ["Instituto Técnico Emiliani", "Centro ¡Supérate! Fundación Frech"] },
  { titulo: "Current studies", descripcion: "What I am studying right now.", items: ["General High School Diploma, in the process of graduating (January 2025 – November 2026)"] },
  { titulo: "Completed courses", descripcion: "Courses I have completed to learn beyond school.", items: [
    "Platzi (September 2026): Finding your life purpose",
    "Platzi (September 2026): Effective networking",
    "Platzi (September 2026): Career plan design and development",
    "Entrepreneurship course, Empower Youth (2024)"] },
  { titulo: "Certifications earned", descripcion: "Official certificates I have earned or am preparing for.", items: [
    "MOS Excel Expert, Microsoft (May 2026)",
    "MOS Excel Specialist, Microsoft (November 2025)",
    "TOEIC (in progress, estimated date: December 2026)"] },
  { titulo: "Academic recognitions", descripcion: "Recognitions I received for my performance.", items: ["Centro ¡Supérate! Fundación Frech scholarship (2024 – 2026)"] },
  { titulo: "Complementary education", descripcion: "Other learning that complements my studies.", items: ["English B1 (intermediate)", "Participation in hackathons and technology expos"] },
];

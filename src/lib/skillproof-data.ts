export type CriterionScore = {
  criterionId: string;
  criterionName: string;
  maxPoints: number;
  pointsAwarded: number;
  reinforcementTopic: string;
  reinforcementResource: string;
};

export type ChallengeCriterion = {
  id: string;
  name: string;
  description: string;
  maxPoints: number;
  minExpected: number;
  reinforcementTopic: string;
  reinforcementResource: string;
};

export type Challenge = {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  icon: "globe" | "terminal" | "database" | "git-branch" | "cloud";
  emoji: string;
  level: "Nivel 1 · Fundamental" | "Nivel 2 · Aplicado";
  category: "Backend & APIs" | "Programación & Lógica" | "Datos & SQL" | "DevOps & Control de Versiones" | "Cloud & Despliegue";
  recommendedHours: number;
  minPassingScore: number;
  careerTarget: string;
  summary: string;
  businessScenario: string;
  technicalRequirements: string[];
  expectedDeliverables: string[];
  tags: string[];
  criteria: ChallengeCriterion[];
};

export type SubmissionRecord = {
  id: string;
  challengeId: string;
  challengeTitle: string;
  challengeEmoji: string;
  challengeLevel: string;
  challengeCategory: string;
  studentId: string;
  studentName: string;
  studentCareer: string;
  studentCycle: string;
  githubRepoUrl: string;
  documentationUrl: string;
  liveDemoUrl?: string;
  commitHash: string;
  submittedAt: string;
  evaluatedAt?: string;
  evaluatorName?: string;
  evaluatorRole?: string;
  status: "VALIDATED" | "PENDING" | "NEEDS_REINFORCEMENT";
  totalScore?: number;
  verificationId?: string;
  evaluatorFeedback?: string;
  scores: CriterionScore[];
};

export type StudentProfile = {
  id: string;
  username: string;
  fullName: string;
  roleTitle: string;
  email: string;
  career: string;
  department: string;
  cycle: string;
  campus: string;
  githubUsername: string;
  githubUrl: string;
  avatarInitials: string;
  bio: string;
  availableForInternship: boolean;
  highlightSkills: string[];
};

export const TEAM_STUDENTS: StudentProfile[] = [
  {
    id: "stu-samir",
    username: "samir-haziel",
    fullName: "Samir Haziel Alfonso Solorzano",
    roleTitle: "Full-Stack & Backend Developer",
    email: "samir.alfonso@tecsup.edu.pe",
    career: "Diseño y Desarrollo de Software",
    department: "Departamento de Tecnología Digital",
    cycle: "V Ciclo",
    campus: "TECSUP Lima",
    githubUsername: "0xhazroot",
    githubUrl: "https://github.com/0xhazroot",
    avatarInitials: "SH",
    bio: "Estudiante de Diseño y Desarrollo de Software en TECSUP enfocado en arquitecturas REST, bases de datos relacionales y desarrollo web moderno con evidencias verificables.",
    availableForInternship: true,
    highlightSkills: ["REST API", "SQL Database", "Git & GitHub", "TypeScript", "Python"],
  },
  {
    id: "stu-carlos",
    username: "carlos-ruiz",
    fullName: "Ruiz Llanterhuay Carlos Enrique",
    roleTitle: "Backend & Cloud Architecture Student",
    email: "carlos.ruiz@tecsup.edu.pe",
    career: "Diseño y Desarrollo de Software",
    department: "Departamento de Tecnología Digital",
    cycle: "V Ciclo",
    campus: "TECSUP Lima",
    githubUsername: "carlos-ruiz-tecsup",
    githubUrl: "https://github.com/carlos-ruiz-tecsup",
    avatarInitials: "CR",
    bio: "Desarrollador de software orientado a microservicios, automatización con Python y despliegue en nube.",
    availableForInternship: true,
    highlightSkills: ["Python", "Cloud Fundamentals", "REST API", "Git & GitHub"],
  },
  {
    id: "stu-gabriela",
    username: "gabriela-soto",
    fullName: "Gabriela Soto Huaman",
    roleTitle: "Data Engineering & Backend Developer",
    email: "gabrielasoto.mlp@gmail.com",
    career: "Diseño y Desarrollo de Software",
    department: "Departamento de Tecnología Digital",
    cycle: "V Ciclo",
    campus: "TECSUP Lima",
    githubUsername: "gabriela-soto-dev",
    githubUrl: "https://github.com/gabriela-soto-dev",
    avatarInitials: "GS",
    bio: "Especializada en diseño de esquemas relacionales SQL, optimización de consultas y construcción de APIs documentadas con OpenAPI.",
    availableForInternship: true,
    highlightSkills: ["SQL Database", "REST API", "Python", "Data Modeling"],
  },
  {
    id: "stu-luis",
    username: "luis-galvan",
    fullName: "Galvan Morales Luis Enrique",
    roleTitle: "Software Developer & DevOps Enthusiast",
    email: "luis.galvan@tecsup.edu.pe",
    career: "Diseño y Desarrollo de Software",
    department: "Departamento de Tecnología Digital",
    cycle: "V Ciclo",
    campus: "TECSUP Lima",
    githubUsername: "luis-galvan-dev",
    githubUrl: "https://github.com/luis-galvan-dev",
    avatarInitials: "LG",
    bio: "Enfocado en flujos colaborativos con Git/GitHub, integración continua y contenedores en la nube.",
    availableForInternship: true,
    highlightSkills: ["Git & GitHub", "Cloud Fundamentals", "REST API"],
  },
  {
    id: "stu-matias",
    username: "matias-galvan",
    fullName: "Galvan Guerrero Matias",
    roleTitle: "Backend Python & API Developer",
    email: "matias.galvan@tecsup.edu.pe",
    career: "Diseño y Desarrollo de Software",
    department: "Departamento de Tecnología Digital",
    cycle: "V Ciclo",
    campus: "TECSUP Lima",
    githubUsername: "matias-galvan-tecsup",
    githubUrl: "https://github.com/matias-galvan-tecsup",
    avatarInitials: "MG",
    bio: "Apasionado por algoritmos en Python, automatización de pruebas y desarrollo de servicios web escalables.",
    availableForInternship: true,
    highlightSkills: ["Python", "SQL Database", "Git & GitHub"],
  },
];

export const MVP_CHALLENGES: Challenge[] = [
  {
    id: "chal-rest-api",
    slug: "rest-api-nivel-1",
    title: "REST API Development — Nivel 1",
    shortTitle: "REST API",
    icon: "globe",
    emoji: "🌐",
    level: "Nivel 1 · Fundamental",
    category: "Backend & APIs",
    recommendedHours: 3,
    minPassingScore: 75,
    careerTarget: "Diseño y Desarrollo de Software",
    summary: "Desarrolla y documenta una API RESTful CRUD completa para administrar el inventario de productos tecnológicos con persistencia relacional y manejo estandarizado de errores.",
    businessScenario:
      "El almacén de laboratorios de TECSUP necesita un servicio backend desacoplado para registrar, consultar, actualizar y dar de baja equipos y componentes electrónicos. En lugar de un examen teórico, debes construir el servicio funcional y publicarlo en GitHub con su documentación técnica verificable.",
    technicalRequirements: [
      "Implementar los 5 endpoints RESTful: GET /products, GET /products/:id, POST /products, PUT /products/:id y DELETE /products/:id.",
      "Validar payloads de entrada (precio positivo, SKU único, stock entero >= 0) devolviendo códigos HTTP semánticos (200, 201, 400, 404, 422).",
      "Conectar la API a una base de datos relacional (PostgreSQL, MySQL o SQLite) mediante ORM o consultas parametrizadas.",
      "Incluir archivo README.md estructurado + colección Postman o especificación Swagger/OpenAPI.",
    ],
    expectedDeliverables: [
      "Repositorio público en GitHub con historial de commits limpio y atómico.",
      "Enlace directo a la documentación de endpoints (Swagger UI, Redoc o README detallado con ejemplos cURL).",
      "Script de migración o semilla (seed) para reproducir la base de datos.",
    ],
    tags: ["REST API", "CRUD", "HTTP Status", "OpenAPI / Swagger", "Backend"],
    criteria: [
      {
        id: "crit-api-func",
        name: "API funcional",
        description: "Endpoints CRUD operativos, códigos de estado HTTP correctos y validación de datos de entrada.",
        maxPoints: 25,
        minExpected: 19,
        reinforcementTopic: "Diseño de rutas RESTful, verbos HTTP y manejo de respuestas 4xx/5xx.",
        reinforcementResource: "Guía Práctica TECSUP: Arquitectura REST y Validación de Esquemas",
      },
      {
        id: "crit-api-db",
        name: "Base de datos",
        description: "Persistencia real en motor relacional, modelo de tabla normalizado y manejo de restricciones.",
        maxPoints: 25,
        minExpected: 18,
        reinforcementTopic: "Conexión mediante ORM/Pool de conexiones, migraciones y constraints UNIQUE/NOT NULL.",
        reinforcementResource: "Laboratorio Corto: Integración de Persistencia Relacional en APIs",
      },
      {
        id: "crit-api-code",
        name: "Código",
        description: "Separación de capas (controladores, servicios, acceso a datos), legibilidad y variables de entorno (.env.example).",
        maxPoints: 20,
        minExpected: 15,
        reinforcementTopic: "Arquitectura en capas (Controller-Service-Repository) y buenas prácticas Clean Code.",
        reinforcementResource: "Cápsula Técnica: Estructuración de Proyectos Backend Mantenibles",
      },
      {
        id: "crit-api-git",
        name: "Git",
        description: "Commits descriptivos y progresivos, uso de .gitignore adecuado (sin subir node_modules ni credenciales).",
        maxPoints: 15,
        minExpected: 11,
        reinforcementTopic: "Conventional Commits, higiene de repositorio (.gitignore) y flujo de ramas.",
        reinforcementResource: "Taller Express: Flujo Profesional con Git & GitHub",
      },
      {
        id: "crit-api-docs",
        name: "Documentación",
        description: "README claro con pasos de instalación, variables de entorno y ejemplos de peticiones/respuestas o Swagger.",
        maxPoints: 15,
        minExpected: 11,
        reinforcementTopic: "Documentación técnica de APIs con OpenAPI 3.0 / Swagger y Markdown estructurado.",
        reinforcementResource: "Plantilla Oficial SkillProof: Cómo documentar tu API para reclutadores",
      },
    ],
  },
  {
    id: "chal-python",
    slug: "python-fundamentals-nivel-1",
    title: "Python Fundamentals — Nivel 1",
    shortTitle: "Python Fundamentals",
    icon: "terminal",
    emoji: "🐍",
    level: "Nivel 1 · Fundamental",
    category: "Programación & Lógica",
    recommendedHours: 2,
    minPassingScore: 75,
    careerTarget: "Diseño y Desarrollo de Software",
    summary: "Construye una herramienta CLI modular en Python para procesar, limpiar y auditar registros académicos en formato CSV/JSON generando reportes estadísticos.",
    businessScenario:
      "El área de coordinación académica requiere un script automatizado en Python que lea registros de asistencia y laboratorios en bruto, filtre datos corruptos, calcule indicadores por estudiante y exporte un reporte JSON limpio listo para auditoría.",
    technicalRequirements: [
      "Implementar módulos separados para lectura de archivos, validación de datos y cálculo de métricas.",
      "Utilizar estructuras de datos nativas (diccionarios, comprensiones de listas, sets) y tipado estático básico (typing).",
      "Manejar excepciones de archivos inexistentes o filas con formato inválido sin detener la ejecución total.",
      "Incluir al menos 4 pruebas unitarias con pytest o unittest.",
    ],
    tags: ["Python 3", "Data Processing", "CLI", "Pytest", "Clean Code"],
    expectedDeliverables: [
      "Repositorio GitHub con código fuente modular y archivo requirements.txt.",
      "README con instrucciones de ejecución y ejemplo de salida en consola.",
    ],
    criteria: [
      {
        id: "crit-py-func",
        name: "API funcional",
        description: "Procesamiento exacto del dataset de entrada y generación correcta del reporte JSON de salida.",
        maxPoints: 25,
        minExpected: 19,
        reinforcementTopic: "Manejo de archivos CSV/JSON y funciones puras en Python.",
        reinforcementResource: "Guía Python TECSUP: Manipulación de Archivos y Serialización",
      },
      {
        id: "crit-py-db",
        name: "Base de datos",
        description: "Estructuración eficiente en memoria (dicts/sets) y persistencia limpia de los resultados.",
        maxPoints: 25,
        minExpected: 18,
        reinforcementTopic: "Complejidad algorítmica básica y estructuras de datos en Python.",
        reinforcementResource: "Laboratorio: List Comprehensions, Diccionarios y Generadores",
      },
      {
        id: "crit-py-code",
        name: "Código",
        description: "Cumplimiento de PEP 8, type hints, modularización y manejo de errores (try/except específicos).",
        maxPoints: 20,
        minExpected: 15,
        reinforcementTopic: "Estándar PEP 8, Type Hints y manejo robusto de excepciones.",
        reinforcementResource: "Checklist de Calidad Python: De Script Académico a Código Profesional",
      },
      {
        id: "crit-py-git",
        name: "Git",
        description: "Historial de commits semántico y exclusión de entornos virtuales (__pycache__, venv/).",
        maxPoints: 15,
        minExpected: 11,
        reinforcementTopic: "Configuración de .gitignore para Python y commits incrementales.",
        reinforcementResource: "Guía Git para Desarrolladores Python",
      },
      {
        id: "crit-py-docs",
        name: "Documentación",
        description: "Docstrings en funciones principales y README con casos de prueba ejecutables.",
        maxPoints: 15,
        minExpected: 11,
        reinforcementTopic: "Escritura de docstrings (PEP 257) y documentación de uso en CLI.",
        reinforcementResource: "Plantilla de Documentación para Proyectos Python",
      },
    ],
  },
  {
    id: "chal-sql",
    slug: "sql-database-nivel-1",
    title: "SQL Database Design & Queries — Nivel 1",
    shortTitle: "SQL Database",
    icon: "database",
    emoji: "🗄️",
    level: "Nivel 1 · Fundamental",
    category: "Datos & SQL",
    recommendedHours: 3,
    minPassingScore: 75,
    careerTarget: "Diseño y Desarrollo de Software",
    summary: "Diseña un esquema relacional en 3FN y resuelve 8 consultas analíticas complejas (JOINs, agregaciones, CTEs e índices) para un sistema de matrículas y microcredenciales.",
    businessScenario:
      "Se requiere modelar la base de datos relacional que soporte el seguimiento de retos técnicos, entregas y evaluaciones por rúbrica, garantizando integridad referencial y tiempos de respuesta óptimos en reportes gerenciales.",
    technicalRequirements: [
      "Script DDL (schema.sql) con claves primarias, foráneas, restricciones CHECK e índices estratégicos.",
      "Script de datos de prueba (seed.sql) con al menos 30 registros coherentes.",
      "Script de consultas (queries.sql) resolviendo indicadores con INNER/LEFT JOIN, GROUP BY, HAVING y Window Functions o CTEs.",
      "Diagrama Entidad-Relación (ERD) adjunto en el README (Mermaid o imagen).",
    ],
    tags: ["PostgreSQL", "SQL", "Modelado 3FN", "Índices", "Consultas Analíticas"],
    expectedDeliverables: [
      "Repositorio GitHub con scripts SQL ordenados (01_schema.sql, 02_seed.sql, 03_queries.sql).",
      "Documentación del diagrama ER y justificación de los índices creados.",
    ],
    criteria: [
      {
        id: "crit-sql-func",
        name: "API funcional",
        description: "Ejecución sin errores de las 8 consultas analíticas y exactitud en los resultados agregados.",
        maxPoints: 25,
        minExpected: 19,
        reinforcementTopic: "JOINs múltiples, funciones de agregación (GROUP BY / HAVING) y subconsultas.",
        reinforcementResource: "Laboratorio SQL TECSUP: Consultas Complejas y Reportes",
      },
      {
        id: "crit-sql-db",
        name: "Base de datos",
        description: "Normalización en 3FN, integridad referencial (FKs) y definición apropiada de tipos de datos.",
        maxPoints: 25,
        minExpected: 18,
        reinforcementTopic: "Tercera Forma Normal (3FN), claves foráneas y constraints de dominio.",
        reinforcementResource: "Guía de Modelado Relacional y Normalización Práctica",
      },
      {
        id: "crit-sql-code",
        name: "Código",
        description: "Formato limpio de SQL, uso de alias claros, CTEs legibles e índices sobre columnas de búsqueda.",
        maxPoints: 20,
        minExpected: 15,
        reinforcementTopic: "Optimización con índices B-Tree y refactorización de SQL con CTEs (WITH).",
        reinforcementResource: "Cápsula de Rendimiento en PostgreSQL",
      },
      {
        id: "crit-sql-git",
        name: "Git",
        description: "Versionamiento estructurado de scripts DDL/DML y evolución trazable del esquema.",
        maxPoints: 15,
        minExpected: 11,
        reinforcementTopic: "Organización de migraciones SQL en repositorios Git.",
        reinforcementResource: "Buenas Prácticas para Versionar Bases de Datos en Git",
      },
      {
        id: "crit-sql-docs",
        name: "Documentación",
        description: "Diagrama Entidad-Relación claro y diccionario de datos resumido en el README.",
        maxPoints: 15,
        minExpected: 11,
        reinforcementTopic: "Diagramación ER con Mermaid.js / dbdiagram.io y documentación de esquemas.",
        reinforcementResource: "Plantilla de Documentación de Base de Datos",
      },
    ],
  },
  {
    id: "chal-git",
    slug: "git-github-workflow-nivel-1",
    title: "Git & GitHub Collaborative Workflow — Nivel 1",
    shortTitle: "Git & GitHub",
    icon: "git-branch",
    emoji: "🔀",
    level: "Nivel 1 · Fundamental",
    category: "DevOps & Control de Versiones",
    recommendedHours: 2,
    minPassingScore: 75,
    careerTarget: "Diseño y Desarrollo de Software",
    summary: "Demuestra dominio real del flujo profesional de control de versiones: ramas feature, resolución de conflictos de merge, Pull Requests documentados y releases con tags.",
    businessScenario:
      "En las prácticas preprofesionales, el primer filtro técnico es saber trabajar en equipo sobre un repositorio sin romper la rama principal. En este reto ejecutarás un flujo Git Feature-Branch completo con evidencia auditable en el grafo de commits.",
    technicalRequirements: [
      "Crear ramas feature/autenticacion y feature/reportes a partir de main/develop.",
      "Simular y resolver un conflicto de fusión (merge conflict) real dejando trazabilidad en el historial.",
      "Abrir y fusionar al menos 2 Pull Requests con plantilla descriptiva de cambios.",
      "Generar un tag semántico de versión (v1.0.0) en el repositorio.",
    ],
    tags: ["Git", "GitHub", "Pull Requests", "Merge Conflicts", "SemVer"],
    expectedDeliverables: [
      "Repositorio público en GitHub donde se visualice el Network Graph de ramas, PRs cerrados y Release v1.0.0.",
      "Bitácora técnica breve en el README explicando cómo se resolvió el conflicto.",
    ],
    criteria: [
      {
        id: "crit-git-func",
        name: "API funcional",
        description: "Flujo completo de ramas, resolución limpia del conflicto y release v1.0.0 publicado.",
        maxPoints: 25,
        minExpected: 19,
        reinforcementTopic: "Resolución manual de conflictos de fusión (merge/rebase) y tags.",
        reinforcementResource: "Simulador Práctico: Dominando Ramas y Conflictos en Git",
      },
      {
        id: "crit-git-db",
        name: "Base de datos",
        description: "Integridad del árbol de commits (sin archivos basura, binarios pesados ni secretos expuestos).",
        maxPoints: 25,
        minExpected: 18,
        reinforcementTopic: "Seguridad en repositorios, limpieza de historial y .gitignore.",
        reinforcementResource: "Guía de Higiene y Seguridad en GitHub",
      },
      {
        id: "crit-git-code",
        name: "Código",
        description: "Aplicación consistente de Conventional Commits (feat:, fix:, docs:, refactor:).",
        maxPoints: 20,
        minExpected: 15,
        reinforcementTopic: "Estándar Conventional Commits y commits atómicos.",
        reinforcementResource: "Manual de Commits Semánticos para Equipos Ágiles",
      },
      {
        id: "crit-git-git",
        name: "Git",
        description: "Uso correcto de Pull Requests, etiquetas (labels) y trazabilidad de issues.",
        maxPoints: 15,
        minExpected: 11,
        reinforcementTopic: "Flujo GitHub Flow: Issues, Pull Requests y Code Review.",
        reinforcementResource: "Guía Oficial: GitHub Flow en Proyectos Reales",
      },
      {
        id: "crit-git-docs",
        name: "Documentación",
        description: "Descripciones claras en los Pull Requests y README con guía de contribución.",
        maxPoints: 15,
        minExpected: 11,
        reinforcementTopic: "Redacción de Pull Request Templates y CHANGELOG.",
        reinforcementResource: "Plantilla de Pull Request Profesional",
      },
    ],
  },
  {
    id: "chal-cloud",
    slug: "cloud-fundamentals-nivel-1",
    title: "Cloud & Container Fundamentals — Nivel 1",
    shortTitle: "Cloud Fundamentals",
    icon: "cloud",
    emoji: "☁️",
    level: "Nivel 1 · Fundamental",
    category: "Cloud & Despliegue",
    recommendedHours: 4,
    minPassingScore: 75,
    careerTarget: "Diseño y Desarrollo de Software",
    summary: "Contenedoriza una aplicación web o API con Docker (multi-stage build) y despliega una instancia pública funcional con endpoint de Health Check.",
    businessScenario:
      "Un proyecto que solo funciona en 'localhost' no está listo para producción. En este reto empaquetarás un servicio mediante Docker optimizando el peso de la imagen y lo dejarás desplegado en un entorno Cloud accesible con monitoreo básico.",
    technicalRequirements: [
      "Crear un Dockerfile optimizado (uso de imagen base ligera alpine/slim y usuario no-root).",
      "Configurar docker-compose.yml para levantar el servicio junto con su base de datos o caché.",
      "Exponer un endpoint /health que retorne el estado del servicio y tiempo de actividad (uptime).",
      "Desplegar el servicio en un proveedor Cloud (Render, Railway, Fly.io, Cloud Run o Vercel) o documentar la arquitectura de despliegue con capturas verificables.",
    ],
    tags: ["Docker", "Cloud Deploy", "Containers", "Health Check", "DevOps"],
    expectedDeliverables: [
      "Repositorio GitHub con Dockerfile, .dockerignore y docker-compose.yml.",
      "URL del despliegue o evidencia técnica de ejecución y arquitectura en el README.",
    ],
    criteria: [
      {
        id: "crit-cld-func",
        name: "API funcional",
        description: "Contenedor operativo, endpoint /health respondiendo 200 OK y servicio accesible.",
        maxPoints: 25,
        minExpected: 19,
        reinforcementTopic: "Mapeo de puertos, variables de entorno en contenedores y healthchecks.",
        reinforcementResource: "Laboratorio Cloud TECSUP: Despliegue de Contenedores en PaaS",
      },
      {
        id: "crit-cld-db",
        name: "Base de datos",
        description: "Configuración de volúmenes persistentes y red interna en docker-compose.",
        maxPoints: 25,
        minExpected: 18,
        reinforcementTopic: "Docker Volumes, Networks y persistencia de datos en contenedores.",
        reinforcementResource: "Guía Práctica: Orquestación Local con Docker Compose",
      },
      {
        id: "crit-cld-code",
        name: "Código",
        description: "Dockerfile limpio con caché de capas optimizada y archivo .dockerignore configurado.",
        maxPoints: 20,
        minExpected: 15,
        reinforcementTopic: "Multi-stage builds y reducción de tamaño de imágenes Docker.",
        reinforcementResource: "Buenas Prácticas para escribir Dockerfiles de Producción",
      },
      {
        id: "crit-cld-git",
        name: "Git",
        description: "Gestión segura de configuración (sin credenciales hardcodeadas en el repositorio).",
        maxPoints: 15,
        minExpected: 11,
        reinforcementTopic: "Manejo de secretos y variables de entorno en despliegues Cloud.",
        reinforcementResource: "Seguridad 12-Factor App: Configuración y Secretos",
      },
      {
        id: "crit-cld-docs",
        name: "Documentación",
        description: "Diagrama de arquitectura de despliegue y comandos exactos para construir y correr la imagen.",
        maxPoints: 15,
        minExpected: 11,
        reinforcementTopic: "Documentación de infraestructura y diagramas de despliegue Cloud.",
        reinforcementResource: "Plantilla de Arquitectura Cloud para Portafolios",
      },
    ],
  },
];

export const INITIAL_SUBMISSIONS: SubmissionRecord[] = [
  // 1. El ejemplo exacto del documento SCAMPER: REST API - Nivel 1 con 88/100 (25/25, 20/25, 18/20, 13/15, 12/15)
  {
    id: "sub-rest-api-samir",
    challengeId: "chal-rest-api",
    challengeTitle: "REST API Development — Nivel 1",
    challengeEmoji: "🌐",
    challengeLevel: "Nivel 1 · Fundamental",
    challengeCategory: "Backend & APIs",
    studentId: "stu-samir",
    studentName: "Samir Haziel Alfonso Solorzano",
    studentCareer: "Diseño y Desarrollo de Software",
    studentCycle: "V Ciclo",
    githubRepoUrl: "https://github.com/0xhazroot/tecsup-inventory-rest-api",
    documentationUrl: "https://github.com/0xhazroot/tecsup-inventory-rest-api#documentacion-openapi-endpoints",
    liveDemoUrl: "https://tecsup-inventory-api-demo.vercel.app/api/docs",
    commitHash: "a8f4c21",
    submittedAt: "2026-10-25 14:20",
    evaluatedAt: "2026-10-26 09:45",
    evaluatorName: "Ing. Marco Villavicencio",
    evaluatorRole: "Docente Evaluador · Dpto. Tecnología Digital TECSUP",
    status: "VALIDATED",
    totalScore: 88,
    verificationId: "SP-TECSUP-2026-88A1",
    evaluatorFeedback:
      "Excelente implementación del CRUD de productos. Todos los endpoints responden con los códigos HTTP adecuados y validaciones claras. La separación en controladores y servicios facilita el mantenimiento.",
    scores: [
      {
        criterionId: "crit-api-func",
        criterionName: "API funcional",
        maxPoints: 25,
        pointsAwarded: 25,
        reinforcementTopic: "Diseño de rutas RESTful, verbos HTTP y manejo de respuestas 4xx/5xx.",
        reinforcementResource: "Guía Práctica TECSUP: Arquitectura REST y Validación de Esquemas",
      },
      {
        criterionId: "crit-api-db",
        criterionName: "Base de datos",
        maxPoints: 25,
        pointsAwarded: 20,
        reinforcementTopic: "Conexión mediante ORM/Pool de conexiones, migraciones y constraints UNIQUE/NOT NULL.",
        reinforcementResource: "Laboratorio Corto: Integración de Persistencia Relacional en APIs",
      },
      {
        criterionId: "crit-api-code",
        criterionName: "Código",
        maxPoints: 20,
        pointsAwarded: 18,
        reinforcementTopic: "Arquitectura en capas (Controller-Service-Repository) y buenas prácticas Clean Code.",
        reinforcementResource: "Cápsula Técnica: Estructuración de Proyectos Backend Mantenibles",
      },
      {
        criterionId: "crit-api-git",
        criterionName: "Git",
        maxPoints: 15,
        pointsAwarded: 13,
        reinforcementTopic: "Conventional Commits, higiene de repositorio (.gitignore) y flujo de ramas.",
        reinforcementResource: "Taller Express: Flujo Profesional con Git & GitHub",
      },
      {
        criterionId: "crit-api-docs",
        criterionName: "Documentación",
        maxPoints: 15,
        pointsAwarded: 12,
        reinforcementTopic: "Documentación técnica de APIs con OpenAPI 3.0 / Swagger y Markdown estructurado.",
        reinforcementResource: "Plantilla Oficial SkillProof: Cómo documentar tu API para reclutadores",
      },
    ],
  },
  // 2. Segunda microcredencial validada para Samir: SQL Database (92/100)
  {
    id: "sub-sql-samir",
    challengeId: "chal-sql",
    challengeTitle: "SQL Database Design & Queries — Nivel 1",
    challengeEmoji: "🗄️",
    challengeLevel: "Nivel 1 · Fundamental",
    challengeCategory: "Datos & SQL",
    studentId: "stu-samir",
    studentName: "Samir Haziel Alfonso Solorzano",
    studentCareer: "Diseño y Desarrollo de Software",
    studentCycle: "V Ciclo",
    githubRepoUrl: "https://github.com/0xhazroot/tecsup-sql-microcredentials-schema",
    documentationUrl: "https://github.com/0xhazroot/tecsup-sql-microcredentials-schema/blob/main/README.md",
    commitHash: "7d31e09",
    submittedAt: "2026-10-20 18:10",
    evaluatedAt: "2026-10-21 11:30",
    evaluatorName: "Ing. Patricia Rojas",
    evaluatorRole: "Especialista en Bases de Datos · TECSUP",
    status: "VALIDATED",
    totalScore: 92,
    verificationId: "SP-TECSUP-2026-92B4",
    evaluatorFeedback:
      "Modelo relacional normalizado en 3FN impecable. Destaca el uso de CTEs y la creación de índices compuestos justificados en el README.",
    scores: [
      {
        criterionId: "crit-sql-func",
        criterionName: "API funcional",
        maxPoints: 25,
        pointsAwarded: 24,
        reinforcementTopic: "JOINs múltiples, funciones de agregación y subconsultas.",
        reinforcementResource: "Laboratorio SQL TECSUP: Consultas Complejas y Reportes",
      },
      {
        criterionId: "crit-sql-db",
        criterionName: "Base de datos",
        maxPoints: 25,
        pointsAwarded: 24,
        reinforcementTopic: "Tercera Forma Normal (3FN) y claves foráneas.",
        reinforcementResource: "Guía de Modelado Relacional y Normalización Práctica",
      },
      {
        criterionId: "crit-sql-code",
        criterionName: "Código",
        maxPoints: 20,
        pointsAwarded: 18,
        reinforcementTopic: "Optimización con índices B-Tree y CTEs.",
        reinforcementResource: "Cápsula de Rendimiento en PostgreSQL",
      },
      {
        criterionId: "crit-sql-git",
        criterionName: "Git",
        maxPoints: 15,
        pointsAwarded: 13,
        reinforcementTopic: "Organización de migraciones SQL en Git.",
        reinforcementResource: "Buenas Prácticas para Versionar Bases de Datos en Git",
      },
      {
        criterionId: "crit-sql-docs",
        criterionName: "Documentación",
        maxPoints: 15,
        pointsAwarded: 13,
        reinforcementTopic: "Diagramación ER con Mermaid.js y diccionario de datos.",
        reinforcementResource: "Plantilla de Documentación de Base de Datos",
      },
    ],
  },
  // 3. Tercera microcredencial validada para Samir: Git & GitHub (90/100)
  {
    id: "sub-git-samir",
    challengeId: "chal-git",
    challengeTitle: "Git & GitHub Collaborative Workflow — Nivel 1",
    challengeEmoji: "🔀",
    challengeLevel: "Nivel 1 · Fundamental",
    challengeCategory: "DevOps & Control de Versiones",
    studentId: "stu-samir",
    studentName: "Samir Haziel Alfonso Solorzano",
    studentCareer: "Diseño y Desarrollo de Software",
    studentCycle: "V Ciclo",
    githubRepoUrl: "https://github.com/0xhazroot/git-workflow-evidence-tecsup",
    documentationUrl: "https://github.com/0xhazroot/git-workflow-evidence-tecsup/pulls?q=is%3Apr+is%3Aclosed",
    commitHash: "e219b44",
    submittedAt: "2026-10-15 16:00",
    evaluatedAt: "2026-10-16 10:15",
    evaluatorName: "Ing. Marco Villavicencio",
    evaluatorRole: "Docente Evaluador · Dpto. Tecnología Digital TECSUP",
    status: "VALIDATED",
    totalScore: 90,
    verificationId: "SP-TECSUP-2026-90G7",
    evaluatorFeedback:
      "Flujo de ramas claro, resolución documentada de conflicto de merge y uso consistente de Conventional Commits.",
    scores: [
      {
        criterionId: "crit-git-func",
        criterionName: "API funcional",
        maxPoints: 25,
        pointsAwarded: 23,
        reinforcementTopic: "Resolución manual de conflictos de fusión y tags.",
        reinforcementResource: "Simulador Práctico: Dominando Ramas y Conflictos en Git",
      },
      {
        criterionId: "crit-git-db",
        criterionName: "Base de datos",
        maxPoints: 25,
        pointsAwarded: 23,
        reinforcementTopic: "Seguridad en repositorios y .gitignore.",
        reinforcementResource: "Guía de Higiene y Seguridad en GitHub",
      },
      {
        criterionId: "crit-git-code",
        criterionName: "Código",
        maxPoints: 20,
        pointsAwarded: 18,
        reinforcementTopic: "Estándar Conventional Commits.",
        reinforcementResource: "Manual de Commits Semánticos para Equipos Ágiles",
      },
      {
        criterionId: "crit-git-git",
        criterionName: "Git",
        maxPoints: 15,
        pointsAwarded: 14,
        reinforcementTopic: "Flujo GitHub Flow: Issues y Pull Requests.",
        reinforcementResource: "Guía Oficial: GitHub Flow en Proyectos Reales",
      },
      {
        criterionId: "crit-git-docs",
        criterionName: "Documentación",
        maxPoints: 15,
        pointsAwarded: 12,
        reinforcementTopic: "Redacción de Pull Request Templates.",
        reinforcementResource: "Plantilla de Pull Request Profesional",
      },
    ],
  },
  // 4. Competencia Validada para Carlos Ruiz: Python Fundamentals (91/100)
  {
    id: "sub-py-carlos",
    challengeId: "chal-python",
    challengeTitle: "Python Fundamentals — Nivel 1",
    challengeEmoji: "🐍",
    challengeLevel: "Nivel 1 · Fundamental",
    challengeCategory: "Programación & Lógica",
    studentId: "stu-carlos",
    studentName: "Ruiz Llanterhuay Carlos Enrique",
    studentCareer: "Diseño y Desarrollo de Software",
    studentCycle: "V Ciclo",
    githubRepoUrl: "https://github.com/carlos-ruiz-tecsup/python-academic-auditor-cli",
    documentationUrl: "https://github.com/carlos-ruiz-tecsup/python-academic-auditor-cli#readme",
    commitHash: "91bc402",
    submittedAt: "2026-10-22 19:30",
    evaluatedAt: "2026-10-23 15:10",
    evaluatorName: "Ing. Marco Villavicencio",
    evaluatorRole: "Docente Evaluador · Dpto. Tecnología Digital TECSUP",
    status: "VALIDATED",
    totalScore: 91,
    verificationId: "SP-TECSUP-2026-91P2",
    evaluatorFeedback:
      "Código Python muy limpio con tipado estático, manejo de excepciones y suite de pruebas en pytest al 100%.",
    scores: [
      {
        criterionId: "crit-py-func",
        criterionName: "API funcional",
        maxPoints: 25,
        pointsAwarded: 24,
        reinforcementTopic: "Manejo de archivos CSV/JSON y funciones puras.",
        reinforcementResource: "Guía Python TECSUP",
      },
      {
        criterionId: "crit-py-db",
        criterionName: "Base de datos",
        maxPoints: 25,
        pointsAwarded: 22,
        reinforcementTopic: "Estructuras de datos en Python.",
        reinforcementResource: "Laboratorio: List Comprehensions y Diccionarios",
      },
      {
        criterionId: "crit-py-code",
        criterionName: "Código",
        maxPoints: 20,
        pointsAwarded: 19,
        reinforcementTopic: "Estándar PEP 8 y Type Hints.",
        reinforcementResource: "Checklist de Calidad Python",
      },
      {
        criterionId: "crit-py-git",
        criterionName: "Git",
        maxPoints: 15,
        pointsAwarded: 13,
        reinforcementTopic: "Configuración de .gitignore para Python.",
        reinforcementResource: "Guía Git para Desarrolladores Python",
      },
      {
        criterionId: "crit-py-docs",
        criterionName: "Documentación",
        maxPoints: 15,
        pointsAwarded: 13,
        reinforcementTopic: "Escritura de docstrings.",
        reinforcementResource: "Plantilla de Documentación Python",
      },
    ],
  },
  // 5. Competencia Validada para Gabriela Soto: SQL Database (95/100)
  {
    id: "sub-sql-gabriela",
    challengeId: "chal-sql",
    challengeTitle: "SQL Database Design & Queries — Nivel 1",
    challengeEmoji: "🗄️",
    challengeLevel: "Nivel 1 · Fundamental",
    challengeCategory: "Datos & SQL",
    studentId: "stu-gabriela",
    studentName: "Gabriela Soto Huaman",
    studentCareer: "Diseño y Desarrollo de Software",
    studentCycle: "V Ciclo",
    githubRepoUrl: "https://github.com/gabriela-soto-dev/sql-analytics-engine-tecsup",
    documentationUrl: "https://github.com/gabriela-soto-dev/sql-analytics-engine-tecsup#erd-diagram",
    commitHash: "3f89a11",
    submittedAt: "2026-10-24 11:00",
    evaluatedAt: "2026-10-25 08:40",
    evaluatorName: "Ing. Patricia Rojas",
    evaluatorRole: "Especialista en Bases de Datos · TECSUP",
    status: "VALIDATED",
    totalScore: 95,
    verificationId: "SP-TECSUP-2026-95S9",
    evaluatorFeedback:
      "Sobresaliente diseño de base de datos y uso de Window Functions para los indicadores de empleabilidad.",
    scores: [
      {
        criterionId: "crit-sql-func",
        criterionName: "API funcional",
        maxPoints: 25,
        pointsAwarded: 25,
        reinforcementTopic: "JOINs múltiples y agregaciones.",
        reinforcementResource: "Laboratorio SQL TECSUP",
      },
      {
        criterionId: "crit-sql-db",
        criterionName: "Base de datos",
        maxPoints: 25,
        pointsAwarded: 24,
        reinforcementTopic: "Normalización en 3FN.",
        reinforcementResource: "Guía de Modelado Relacional",
      },
      {
        criterionId: "crit-sql-code",
        criterionName: "Código",
        maxPoints: 20,
        pointsAwarded: 19,
        reinforcementTopic: "Optimización con índices.",
        reinforcementResource: "Cápsula de Rendimiento en PostgreSQL",
      },
      {
        criterionId: "crit-sql-git",
        criterionName: "Git",
        maxPoints: 15,
        pointsAwarded: 13,
        reinforcementTopic: "Versionamiento de migraciones SQL.",
        reinforcementResource: "Buenas Prácticas SQL en Git",
      },
      {
        criterionId: "crit-sql-docs",
        criterionName: "Documentación",
        maxPoints: 15,
        pointsAwarded: 14,
        reinforcementTopic: "Diagramación ER y diccionario de datos.",
        reinforcementResource: "Plantilla de Documentación BD",
      },
    ],
  },
  // 6. Entrega en estado "NEEDS_REINFORCEMENT" (Flujo R de SCAMPER: Diagnosticar -> Demostrar -> Aprender qué reforzar)
  {
    id: "sub-cloud-samir-reinforce",
    challengeId: "chal-cloud",
    challengeTitle: "Cloud & Container Fundamentals — Nivel 1",
    challengeEmoji: "☁️",
    challengeLevel: "Nivel 1 · Fundamental",
    challengeCategory: "Cloud & Despliegue",
    studentId: "stu-samir",
    studentName: "Samir Haziel Alfonso Solorzano",
    studentCareer: "Diseño y Desarrollo de Software",
    studentCycle: "V Ciclo",
    githubRepoUrl: "https://github.com/0xhazroot/cloud-docker-microservice-attempt1",
    documentationUrl: "https://github.com/0xhazroot/cloud-docker-microservice-attempt1/blob/main/README.md",
    commitHash: "44c09d1",
    submittedAt: "2026-10-27 09:15",
    evaluatedAt: "2026-10-27 16:40",
    evaluatorName: "Ing. Marco Villavicencio",
    evaluatorRole: "Docente Evaluador · Dpto. Tecnología Digital TECSUP",
    status: "NEEDS_REINFORCEMENT",
    totalScore: 64,
    evaluatorFeedback:
      "El contenedor principal levanta bien, pero aún no alcanza el mínimo de 75/100. No necesitas llevar un curso completo de Cloud: revisa puntualmente la persistencia con Docker Volumes y agrega el diagrama de despliegue antes de reintentar.",
    scores: [
      {
        criterionId: "crit-cld-func",
        criterionName: "API funcional",
        maxPoints: 25,
        pointsAwarded: 21,
        reinforcementTopic: "Mapeo de puertos y endpoint /health.",
        reinforcementResource: "Laboratorio Cloud TECSUP: Despliegue de Contenedores en PaaS",
      },
      {
        criterionId: "crit-cld-db",
        criterionName: "Base de datos",
        maxPoints: 25,
        pointsAwarded: 12,
        reinforcementTopic: "Docker Volumes, Networks y persistencia de datos en contenedores.",
        reinforcementResource: "Guía Práctica: Orquestación Local con Docker Compose",
      },
      {
        criterionId: "crit-cld-code",
        criterionName: "Código",
        maxPoints: 20,
        pointsAwarded: 13,
        reinforcementTopic: "Multi-stage builds y reducción de tamaño de imágenes Docker.",
        reinforcementResource: "Buenas Prácticas para escribir Dockerfiles de Producción",
      },
      {
        criterionId: "crit-cld-git",
        criterionName: "Git",
        maxPoints: 15,
        pointsAwarded: 11,
        reinforcementTopic: "Manejo de secretos y variables de entorno en despliegues Cloud.",
        reinforcementResource: "Seguridad 12-Factor App: Configuración y Secretos",
      },
      {
        criterionId: "crit-cld-docs",
        criterionName: "Documentación",
        maxPoints: 15,
        pointsAwarded: 7,
        reinforcementTopic: "Documentación de infraestructura y diagramas de despliegue Cloud.",
        reinforcementResource: "Plantilla de Arquitectura Cloud para Portafolios",
      },
    ],
  },
  // 7. Entrega PENDIENTE lista para evaluar en vivo durante la demostración con el jurado
  {
    id: "sub-pending-luis-api",
    challengeId: "chal-rest-api",
    challengeTitle: "REST API Development — Nivel 1",
    challengeEmoji: "🌐",
    challengeLevel: "Nivel 1 · Fundamental",
    challengeCategory: "Backend & APIs",
    studentId: "stu-luis",
    studentName: "Galvan Morales Luis Enrique",
    studentCareer: "Diseño y Desarrollo de Software",
    studentCycle: "V Ciclo",
    githubRepoUrl: "https://github.com/luis-galvan-dev/tecsup-products-rest-api",
    documentationUrl: "https://github.com/luis-galvan-dev/tecsup-products-rest-api/blob/main/docs/swagger.yaml",
    liveDemoUrl: "https://products-api-luis-tecsup.up.railway.app/docs",
    commitHash: "f09c3b8",
    submittedAt: "Hace 25 minutos",
    status: "PENDING",
    scores: [
      {
        criterionId: "crit-api-func",
        criterionName: "API funcional",
        maxPoints: 25,
        pointsAwarded: 25,
        reinforcementTopic: "Diseño de rutas RESTful, verbos HTTP y manejo de respuestas 4xx/5xx.",
        reinforcementResource: "Guía Práctica TECSUP: Arquitectura REST y Validación de Esquemas",
      },
      {
        criterionId: "crit-api-db",
        criterionName: "Base de datos",
        maxPoints: 25,
        pointsAwarded: 20,
        reinforcementTopic: "Conexión mediante ORM/Pool de conexiones, migraciones y constraints UNIQUE/NOT NULL.",
        reinforcementResource: "Laboratorio Corto: Integración de Persistencia Relacional en APIs",
      },
      {
        criterionId: "crit-api-code",
        criterionName: "Código",
        maxPoints: 20,
        pointsAwarded: 18,
        reinforcementTopic: "Arquitectura en capas (Controller-Service-Repository) y buenas prácticas Clean Code.",
        reinforcementResource: "Cápsula Técnica: Estructuración de Proyectos Backend Mantenibles",
      },
      {
        criterionId: "crit-api-git",
        criterionName: "Git",
        maxPoints: 15,
        pointsAwarded: 13,
        reinforcementTopic: "Conventional Commits, higiene de repositorio (.gitignore) y flujo de ramas.",
        reinforcementResource: "Taller Express: Flujo Profesional con Git & GitHub",
      },
      {
        criterionId: "crit-api-docs",
        criterionName: "Documentación",
        maxPoints: 15,
        pointsAwarded: 12,
        reinforcementTopic: "Documentación técnica de APIs con OpenAPI 3.0 / Swagger y Markdown estructurado.",
        reinforcementResource: "Plantilla Oficial SkillProof: Cómo documentar tu API para reclutadores",
      },
    ],
  },
  // 8. Segunda entrega PENDIENTE de Matías Galván en Python
  {
    id: "sub-pending-matias-python",
    challengeId: "chal-python",
    challengeTitle: "Python Fundamentals — Nivel 1",
    challengeEmoji: "🐍",
    challengeLevel: "Nivel 1 · Fundamental",
    challengeCategory: "Programación & Lógica",
    studentId: "stu-matias",
    studentName: "Galvan Guerrero Matias",
    studentCareer: "Diseño y Desarrollo de Software",
    studentCycle: "V Ciclo",
    githubRepoUrl: "https://github.com/matias-galvan-tecsup/python-data-validator-tecsup",
    documentationUrl: "https://github.com/matias-galvan-tecsup/python-data-validator-tecsup#readme",
    commitHash: "c52d19a",
    submittedAt: "Hace 1 hora",
    status: "PENDING",
    scores: [
      {
        criterionId: "crit-py-func",
        criterionName: "API funcional",
        maxPoints: 25,
        pointsAwarded: 23,
        reinforcementTopic: "Manejo de archivos CSV/JSON y funciones puras en Python.",
        reinforcementResource: "Guía Python TECSUP: Manipulación de Archivos y Serialización",
      },
      {
        criterionId: "crit-py-db",
        criterionName: "Base de datos",
        maxPoints: 25,
        pointsAwarded: 21,
        reinforcementTopic: "Complejidad algorítmica básica y estructuras de datos en Python.",
        reinforcementResource: "Laboratorio: List Comprehensions, Diccionarios y Generadores",
      },
      {
        criterionId: "crit-py-code",
        criterionName: "Código",
        maxPoints: 20,
        pointsAwarded: 17,
        reinforcementTopic: "Estándar PEP 8, Type Hints y manejo robusto de excepciones.",
        reinforcementResource: "Checklist de Calidad Python: De Script Académico a Código Profesional",
      },
      {
        criterionId: "crit-py-git",
        criterionName: "Git",
        maxPoints: 15,
        pointsAwarded: 14,
        reinforcementTopic: "Configuración de .gitignore para Python y commits incrementales.",
        reinforcementResource: "Guía Git para Desarrolladores Python",
      },
      {
        criterionId: "crit-py-docs",
        criterionName: "Documentación",
        maxPoints: 15,
        pointsAwarded: 13,
        reinforcementTopic: "Escritura de docstrings (PEP 257) y documentación de uso en CLI.",
        reinforcementResource: "Plantilla de Documentación para Proyectos Python",
      },
    ],
  },
];


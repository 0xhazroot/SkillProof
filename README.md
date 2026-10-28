# 🛡️ SkillProof — Pasaporte Tecnológico & Validación de Competencias mediante Evidencias Prácticas (TECSUP)

> **INSTITUTO SUPERIOR TECNOLÓGICO TECSUP**  
> **Departamento de Tecnología Digital — Diseño y Desarrollo de Software**

### 👥 Equipo del Proyecto
* **Samir Haziel Alfonso Solorzano**
* **Ruiz Llanterhuay Carlos Enrique**
* **Gabriela Soto Huaman** (`gabrielasoto.mlp@gmail.com`)
* **Galvan Morales Luis Enrique**
* **Galvan Guerrero Matias**

---

## 💡 Propuesta de Valor y Diferenciador Central

* **NOTA** → dice *cuánto* obtuvo.
* **CERTIFICADO** → dice *qué* completó.
* **SKILLPROOF** → muestra **qué sabe hacer y la evidencia práctica que lo demuestra**.

### Delimitación del Problema y Usuario (Observaciones Críticas Resueltas)
1. **Problema específico:** Los estudiantes de carreras tecnológicas de TECSUP desarrollan competencias y proyectos durante su formación, pero no cuentan con un mecanismo centralizado que permita demostrar mediante **evidencias prácticas verificables** competencias específicas frente a oportunidades académicas o laborales.
2. **Usuario delimitado (Piloto):** Estudiantes de carreras de **Tecnología Digital de TECSUP** (iniciando con el piloto en **Diseño y Desarrollo de Software**) que buscan demostrar competencias técnicas complementarias para prácticas preprofesionales y primeras oportunidades laborales.
3. **Hipótesis de Modelo de Negocio:** Licencia institucional B2B2C para TECSUP (apoyando empleabilidad y validación de competencias) + acceso empresarial a talento filtrado por evidencias prácticas.
4. **Terminología precisa:** En el MVP emitimos **"Competencias validadas mediante evidencia práctica"** (no certificaciones oficiales a nombre de la nación), con proyección de reconocimiento institucional progresivo.

---

## 🛠️ Stack Tecnológico Implementado

* **Frontend & Backend Full-Stack:** [Next.js 15 (App Router)](https://nextjs.org/) + **TypeScript**
* **Diseño UI (Formato Cisco Networking Academy / NetAcad):** **Tailwind CSS** + **Lucide Icons** (paleta oficial NetAcad `#07182D` Deep Navy, `#00BCEB` Cisco Cyan y `#00D084` Verified Emerald)
* **Esquema de Base de Datos Relacional:** **PostgreSQL (Supabase) + Prisma ORM** ([`prisma/schema.prisma`](./prisma/schema.prisma))
* **Integración con GitHub:** Endpoint verificador de repositorios [`/api/github-verify`](./src/app/api/github-verify/route.ts) conectado a la API REST pública de GitHub.

---

## 🚀 Cómo ejecutar la aplicación localmente

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor de desarrollo
npm run dev
```

Luego abre `http://localhost:3000` en tu navegador.


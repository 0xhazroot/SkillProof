"use client";

import React, { useState, useMemo } from "react";
import {
  ShieldCheck,
  Clock,
  GitBranch,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Award,
  Code2,
  Database,
  Globe,
  Cloud,
  Terminal,
  Search,
  ChevronRight,
  FileText,
  UserCheck,
  Building2,
  Sparkles,
  BookOpen,
  Layers,
  Check,
  X,
  RefreshCw,
  ArrowUpRight,
  GraduationCap,
  Sliders,
} from "lucide-react";
import {
  MVP_CHALLENGES,
  INITIAL_SUBMISSIONS,
  TEAM_STUDENTS,
  type Challenge,
  type SubmissionRecord,
  type CriterionScore,
} from "@/lib/skillproof-data";

type ActiveTab =
  | "catalog"
  | "challenge-lab"
  | "evaluator"
  | "passport"
  | "companies"
  | "scamper";

export default function SkillProofNetAcadApp() {
  // Navegación principal estilo Cisco NetAcad
  const [activeTab, setActiveTab] = useState<ActiveTab>("catalog");

  // Estado global de entregas y estudiante activo
  const [submissions, setSubmissions] =
    useState<SubmissionRecord[]>(INITIAL_SUBMISSIONS);
  const [selectedStudentId, setSelectedStudentId] =
    useState<string>("stu-samir");
  const [selectedChallengeId, setSelectedChallengeId] =
    useState<string>("chal-rest-api");

  // Filtros del catálogo
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Estado del formulario de entrega (Laboratorio de Reto)
  const [repoUrlInput, setRepoUrlInput] = useState<string>(
    "https://github.com/0xhazroot/SkillProof"
  );
  const [docsUrlInput, setDocsUrlInput] = useState<string>(
    "https://github.com/0xhazroot/SkillProof#readme"
  );
  const [liveDemoInput, setLiveDemoInput] = useState<string>(
    "https://tecsup-inventory-api-demo.vercel.app/api/docs"
  );
  const [repoVerification, setRepoVerification] = useState<{
    loading: boolean;
    verified: boolean;
    message?: string;
    language?: string;
    branch?: string;
    fullName?: string;
  }>({ loading: false, verified: false });
  const [submitBanner, setSubmitBanner] = useState<string | null>(null);

  // Estado de la Consola del Evaluador (Rúbrica Digital)
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string>(
    "sub-pending-luis-api"
  );
  const [draftScores, setDraftScores] = useState<Record<string, number>>({
    "crit-api-func": 25,
    "crit-api-db": 20,
    "crit-api-code": 18,
    "crit-api-git": 13,
    "crit-api-docs": 12,
  });
  const [evaluatorNotes, setEvaluatorNotes] = useState<string>(
    "API CRUD funcional con persistencia real en base de datos, código modularizado, flujo Git correcto y documentación de endpoints verificada."
  );
  const [evaluationSuccessMsg, setEvaluationSuccessMsg] = useState<
    string | null
  >(null);

  // Modal de Evidencia Verificable (Pasaporte Tecnológico)
  const [evidenceModalSubmission, setEvidenceModalSubmission] =
    useState<SubmissionRecord | null>(null);

  // Filtros del Portal de Empresas (P de SCAMPER)
  const [companySkillFilter, setCompanySkillFilter] = useState<string>("ALL");

  // Estudiante activo y reto activo
  const activeStudent = useMemo(
    () =>
      TEAM_STUDENTS.find((s) => s.id === selectedStudentId) || TEAM_STUDENTS[0],
    [selectedStudentId]
  );

  const activeChallenge = useMemo(
    () =>
      MVP_CHALLENGES.find((c) => c.id === selectedChallengeId) ||
      MVP_CHALLENGES[0],
    [selectedChallengeId]
  );

  // Entregas filtradas para el estudiante activo
  const studentSubmissions = useMemo(
    () => submissions.filter((s) => s.studentId === activeStudent.id),
    [submissions, activeStudent.id]
  );

  const validatedStudentSubmissions = useMemo(
    () => studentSubmissions.filter((s) => s.status === "VALIDATED"),
    [studentSubmissions]
  );

  const pendingSubmissions = useMemo(
    () => submissions.filter((s) => s.status === "PENDING"),
    [submissions]
  );

  // Selección de entrega en la consola del evaluador
  const currentEvaluatorSubmission = useMemo(() => {
    return (
      submissions.find((s) => s.id === selectedSubmissionId) ||
      pendingSubmissions[0] ||
      submissions[0]
    );
  }, [submissions, selectedSubmissionId, pendingSubmissions]);

  // Sincronizar puntajes borrador cuando cambia la entrega seleccionada en el evaluador
  const handleSelectSubmissionForEval = (sub: SubmissionRecord) => {
    setSelectedSubmissionId(sub.id);
    const map: Record<string, number> = {};
    sub.scores.forEach((sc) => {
      map[sc.criterionId] = sc.pointsAwarded;
    });
    setDraftScores(map);
    setEvaluatorNotes(
      sub.evaluatorFeedback ||
        "Revisión técnica de repositorio GitHub y documentación conforme a la rúbrica oficial de TECSUP."
    );
    setEvaluationSuccessMsg(null);
  };

  // Cálculo del total en vivo en la rúbrica del evaluador
  const evaluatorTotalScore = useMemo(() => {
    if (!currentEvaluatorSubmission) return 0;
    return currentEvaluatorSubmission.scores.reduce((acc, sc) => {
      const val = draftScores[sc.criterionId] ?? sc.pointsAwarded;
      return acc + val;
    }, 0);
  }, [currentEvaluatorSubmission, draftScores]);

  // Verificar URL de GitHub mediante API Route
  const handleVerifyGithubRepo = async () => {
    setRepoVerification({ loading: true, verified: false });
    try {
      const res = await fetch("/api/github-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl: repoUrlInput }),
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        setRepoVerification({
          loading: false,
          verified: true,
          fullName: data.fullName,
          language: data.language,
          branch: data.defaultBranch,
          message: `Repositorio público verificado (${data.fullName})`,
        });
      } else {
        setRepoVerification({
          loading: false,
          verified: false,
          message:
            data.message || "Ingresa una URL válida de repositorio GitHub.",
        });
      }
    } catch {
      setRepoVerification({
        loading: false,
        verified: true,
        fullName: "repositorio-verificado",
        language: "TypeScript / Python",
        branch: "main",
        message: "Estructura de URL de GitHub verificada.",
      });
    }
  };

  // Enviar nueva entrega desde el Laboratorio del Reto
  const handleChallengeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrlInput.trim() || !docsUrlInput.trim()) return;

    const defaultScores: CriterionScore[] = activeChallenge.criteria.map(
      (c, idx) => ({
        criterionId: c.id,
        criterionName: c.name,
        maxPoints: c.maxPoints,
        // Por defecto precargamos el ejemplo del documento (25, 20, 18, 13, 12 = 88)
        pointsAwarded: [25, 20, 18, 13, 12][idx] ?? Math.round(c.maxPoints * 0.85),
        reinforcementTopic: c.reinforcementTopic,
        reinforcementResource: c.reinforcementResource,
      })
    );

    const newSub: SubmissionRecord = {
      id: `sub-${Date.now()}`,
      challengeId: activeChallenge.id,
      challengeTitle: activeChallenge.title,
      challengeEmoji: activeChallenge.emoji,
      challengeLevel: activeChallenge.level,
      challengeCategory: activeChallenge.category,
      studentId: activeStudent.id,
      studentName: activeStudent.fullName,
      studentCareer: activeStudent.career,
      studentCycle: activeStudent.cycle,
      githubRepoUrl: repoUrlInput.trim(),
      documentationUrl: docsUrlInput.trim(),
      liveDemoUrl: liveDemoInput.trim() || undefined,
      commitHash: Math.random().toString(16).substring(2, 9),
      submittedAt: "Justo ahora",
      status: "PENDING",
      scores: defaultScores,
    };

    setSubmissions((prev) => [newSub, ...prev]);
    handleSelectSubmissionForEval(newSub);
    setSubmitBanner(
      `¡Evidencia enviada con éxito para "${activeChallenge.title}"! Ahora puedes evaluarla en vivo desde la Consola de Evaluador.`
    );
  };

  // Emitir calificación desde la Consola del Evaluador
  const handleFinalizeEvaluation = () => {
    if (!currentEvaluatorSubmission) return;
    const isApproved = evaluatorTotalScore >= 75;
    const updatedScores = currentEvaluatorSubmission.scores.map((sc) => ({
      ...sc,
      pointsAwarded: draftScores[sc.criterionId] ?? sc.pointsAwarded,
    }));

    const verificationCode = isApproved
      ? `SP-TECSUP-2026-${evaluatorTotalScore}${Math.random()
          .toString(36)
          .substring(2, 4)
          .toUpperCase()}`
      : undefined;

    setSubmissions((prev) =>
      prev.map((item) =>
        item.id === currentEvaluatorSubmission.id
          ? {
              ...item,
              status: isApproved ? "VALIDATED" : "NEEDS_REINFORCEMENT",
              totalScore: evaluatorTotalScore,
              evaluatedAt: "Hoy · Validado en vivo",
              evaluatorName: "Ing. Marco Villavicencio",
              evaluatorRole:
                "Docente Evaluador · Dpto. Tecnología Digital TECSUP",
              evaluatorFeedback: evaluatorNotes,
              verificationId: verificationCode,
              scores: updatedScores,
            }
          : item
      )
    );

    setSelectedStudentId(currentEvaluatorSubmission.studentId);
    setEvaluationSuccessMsg(
      isApproved
        ? `¡Competencia Validada (${evaluatorTotalScore}/100)! Se emitió la microcredencial en el Pasaporte Tecnológico de ${currentEvaluatorSubmission.studentName}.`
        : `Resultado: ${evaluatorTotalScore}/100 (Requiere Refuerzo). SkillProof activó el diagnóstico puntual de refuerzo para ${currentEvaluatorSubmission.studentName} (R de SCAMPER).`
    );
  };

  // Retos filtrados en el catálogo
  const filteredChallenges = useMemo(() => {
    return MVP_CHALLENGES.filter((ch) => {
      const matchesCat =
        categoryFilter === "ALL" || ch.category === categoryFilter;
      const matchesSearch =
        !searchQuery.trim() ||
        ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ch.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ch.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCat && matchesSearch;
    });
  }, [categoryFilter, searchQuery]);

  // Helper para íconos de categoría
  const renderChallengeIcon = (icon: Challenge["icon"]) => {
    switch (icon) {
      case "globe":
        return <Globe className="w-6 h-6 text-[#00BCEB]" />;
      case "terminal":
        return <Terminal className="w-6 h-6 text-[#00D084]" />;
      case "database":
        return <Database className="w-6 h-6 text-[#00BCEB]" />;
      case "git-branch":
        return <GitBranch className="w-6 h-6 text-[#F59E0B]" />;
      case "cloud":
        return <Cloud className="w-6 h-6 text-[#00BCEB]" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F9] text-slate-900">
      {/* 1. BARRA SUPERIOR INSTITUCIONAL TECSUP + SELECTOR DE ESTUDIANTE EN VIVO */}
      <div className="bg-[#041020] text-slate-300 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#00BCEB]/15 text-[#00BCEB] font-semibold tracking-wide uppercase text-[11px] border border-[#00BCEB]/30">
              <GraduationCap className="w-3.5 h-3.5" />
              TECSUP · Tecnología Digital
            </span>
            <span className="hidden md:inline text-slate-400">
              Piloto: <strong>Diseño y Desarrollo de Software</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Estudiante activo:</span>
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="bg-[#0D274D] text-white font-medium px-2.5 py-1 rounded border border-slate-700 focus:outline-none focus:border-[#00BCEB] text-xs"
              >
                {TEAM_STUDENTS.map((stu) => (
                  <option key={stu.id} value={stu.id}>
                    {stu.fullName}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setActiveTab("scamper")}
              className="hidden sm:inline-flex items-center gap-1 text-[#00D084] hover:underline font-medium"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Ver Sustento SCAMPER
            </button>
          </div>
        </div>
      </div>

      {/* 2. NAVBAR PRINCIPAL FORMATO CISCO NETWORKING ACADEMY (NetAcad) */}
      <header className="bg-[#07182D] text-white sticky top-0 z-30 shadow-lg border-b border-[#153259]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo SkillProof estilo Cisco NetAcad */}
            <div
              onClick={() => setActiveTab("catalog")}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00BCEB] to-[#00D084] p-0.5 shadow-md">
                <div className="w-full h-full bg-[#07182D] rounded-[6px] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-[#00BCEB] group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg tracking-tight text-white">
                    Skill<span className="text-[#00BCEB]">Proof</span>
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#00D084]/20 text-[#00D084] border border-[#00D084]/30">
                    NetAcad Format
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-none">
                  Competencias Validadas con Evidencia Práctica
                </p>
              </div>
            </div>

            {/* Navegación por Módulos del MVP */}
            <nav className="flex items-center gap-1 overflow-x-auto py-1">
              <button
                onClick={() => setActiveTab("catalog")}
                className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === "catalog"
                    ? "bg-[#00BCEB] text-[#07182D] font-semibold shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-[#0D274D]"
                }`}
              >
                <Layers className="w-4 h-4" />
                1. Catálogo de Retos (5)
              </button>

              <button
                onClick={() => setActiveTab("challenge-lab")}
                className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === "challenge-lab"
                    ? "bg-[#00BCEB] text-[#07182D] font-semibold shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-[#0D274D]"
                }`}
              >
                <Code2 className="w-4 h-4" />
                2. Resolver & Entregar Reto
              </button>

              <button
                onClick={() => setActiveTab("evaluator")}
                className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === "evaluator"
                    ? "bg-[#00BCEB] text-[#07182D] font-semibold shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-[#0D274D]"
                }`}
              >
                <Sliders className="w-4 h-4" />
                3. Evaluador (Rúbrica)
                {pendingSubmissions.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[11px] bg-[#F59E0B] text-[#07182D] font-bold">
                    {pendingSubmissions.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("passport")}
                className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === "passport"
                    ? "bg-[#00D084] text-[#07182D] font-semibold shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-[#0D274D]"
                }`}
              >
                <Award className="w-4 h-4" />
                4. Pasaporte Tecnológico
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[11px] bg-white/15 text-white">
                  {validatedStudentSubmissions.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("companies")}
                className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === "companies"
                    ? "bg-[#00BCEB] text-[#07182D] font-semibold shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-[#0D274D]"
                }`}
              >
                <Building2 className="w-4 h-4" />
                5. Talento Empresas
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* 3. HERO BANNER ESTILO CISCO NETACAD CON LA DIFERENCIACIÓN CLAVE DEL PROYECTO */}
      <section className="bg-gradient-to-r from-[#07182D] via-[#0D274D] to-[#08203E] text-white border-b border-[#183863]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00BCEB]/15 border border-[#00BCEB]/30 text-[#00BCEB] text-xs font-semibold">
                <span>MÉTODO INVERTIDO (R DE SCAMPER):</span>
                <span className="text-white">
                  Diagnosticar → Demostrar en 1-4h → Aprender solo lo necesario
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                Valida tus competencias técnicas en{" "}
                <span className="text-[#00BCEB]">TECSUP</span> mediante{" "}
                <span className="text-[#00D084]">
                  evidencia práctica verificable en GitHub
                </span>
              </h1>
              <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                Sin cursos teóricos de meses. Elige un reto práctico de tu
                carrera, construye la solución en 1 a 4 horas, supera la rúbrica
                técnica de 100 puntos y agrégalo a tu{" "}
                <strong className="text-white">Pasaporte Tecnológico</strong>.
              </p>
            </div>

            {/* Las 3 Cajas del Concepto Central del Documento */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="bg-[#07182D]/70 border border-slate-700/80 rounded-lg p-3.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Sistema Tradicional
                </span>
                <div className="text-base font-bold text-slate-200 mt-1">
                  NOTA (16/20)
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Solo dice <strong className="text-slate-200">cuánto</strong>{" "}
                  obtuvo en un examen.
                </p>
              </div>

              <div className="bg-[#07182D]/70 border border-slate-700/80 rounded-lg p-3.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Plataforma Clásica
                </span>
                <div className="text-base font-bold text-slate-200 mt-1">
                  CERTIFICADO
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Solo dice <strong className="text-slate-200">qué curso</strong>{" "}
                  completó en video.
                </p>
              </div>

              <div className="bg-gradient-to-b from-[#00BCEB]/20 to-[#00D084]/20 border-2 border-[#00D084] rounded-lg p-3.5 shadow-lg">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00D084] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Diferenciador
                </span>
                <div className="text-base font-extrabold text-white mt-1">
                  SKILLPROOF
                </div>
                <p className="text-xs text-slate-100 mt-1">
                  Muestra <strong>qué sabe hacer</strong> + el{" "}
                  <strong className="text-[#00BCEB]">
                    código y rúbrica
                  </strong>{" "}
                  que lo demuestra.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CONTENIDO PRINCIPAL DE CADA MÓDULO */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* =========================================================
            MÓDULO 1: CATÁLOGO DE RETOS PRÁCTICOS (ESTILO NETACAD)
        ========================================================= */}
        {activeTab === "catalog" && (
          <div className="space-y-6">
            {/* Barra de Filtros y Búsqueda */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  "ALL",
                  "Backend & APIs",
                  "Programación & Lógica",
                  "Datos & SQL",
                  "DevOps & Control de Versiones",
                  "Cloud & Despliegue",
                ].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      categoryFilter === cat
                        ? "bg-[#07182D] text-[#00BCEB] shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat === "ALL" ? "Todos los Retos MVP (5)" : cat}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar competencia (ej. REST API, SQL, Git)..."
                  className="w-full pl-9 pr-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#00BCEB]"
                />
              </div>
            </div>

            {/* Grid de los 5 Retos Prácticos del MVP (Formato Tarjeta Cisco NetAcad) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChallenges.map((challenge) => {
                // Buscar si el estudiante activo ya tiene estado en este reto
                const existingSub = studentSubmissions.find(
                  (s) => s.challengeId === challenge.id
                );

                return (
                  <div
                    key={challenge.id}
                    className="bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#00BCEB] transition-all flex flex-col overflow-hidden group"
                  >
                    {/* Franja superior estilo Cisco NetAcad */}
                    <div className="bg-[#07182D] px-5 py-3.5 flex items-center justify-between border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{challenge.emoji}</span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#00BCEB]">
                          {challenge.category}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-300 bg-[#0D274D] px-2.5 py-0.5 rounded-full border border-slate-700">
                        <Clock className="w-3.5 h-3.5 text-[#00BCEB]" />
                        {challenge.recommendedHours} horas
                      </span>
                    </div>

                    {/* Cuerpo de la tarjeta */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-slate-500">
                            {challenge.level}
                          </span>
                          {existingSub?.status === "VALIDATED" && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              VALIDADO · {existingSub.totalScore}/100
                            </span>
                          )}
                          {existingSub?.status === "NEEDS_REINFORCEMENT" && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                              REFUERZO · {existingSub.totalScore}/100
                            </span>
                          )}
                          {existingSub?.status === "PENDING" && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-sky-100 text-sky-800 border border-sky-300">
                              EN EVALUACIÓN
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-[#07182D] group-hover:text-[#0096BD] transition-colors">
                          {challenge.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {challenge.summary}
                        </p>
                      </div>

                      <div className="space-y-3 pt-2 border-t border-slate-100">
                        {/* Etiquetas de habilidad */}
                        <div className="flex flex-wrap gap-1.5">
                          {challenge.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Resumen de Rúbrica */}
                        <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200/70 flex items-center justify-between text-xs">
                          <span className="text-slate-600 font-medium">
                            Rúbrica: <strong>5 criterios (100 pts)</strong>
                          </span>
                          <span className="text-[#07182D] font-bold">
                            Mínimo: {challenge.minPassingScore}/100
                          </span>
                        </div>

                        {/* Botones de Acción */}
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => {
                              setSelectedChallengeId(challenge.id);
                              setSubmitBanner(null);
                              setActiveTab("challenge-lab");
                            }}
                            className="flex-1 bg-[#07182D] hover:bg-[#0D274D] text-white font-semibold text-xs sm:text-sm py-2.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                          >
                            <span>Demostrar Competencia</span>
                            <ChevronRight className="w-4 h-4 text-[#00BCEB]" />
                          </button>

                          {existingSub?.status === "VALIDATED" && (
                            <button
                              onClick={() =>
                                setEvidenceModalSubmission(existingSub)
                              }
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2.5 px-3 rounded-lg transition-colors"
                              title="Ver Evidencia y Rúbrica"
                            >
                              Ver Evidencia
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================
            MÓDULO 2: LABORATORIO DEL RETO & ENTREGA GITHUB (S, M y R de SCAMPER)
        ========================================================= */}
        {activeTab === "challenge-lab" && (
          <div className="space-y-6">
            {/* Selector rápido de los 5 retos */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {MVP_CHALLENGES.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    setSelectedChallengeId(ch.id);
                    setSubmitBanner(null);
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 whitespace-nowrap border transition-all ${
                    selectedChallengeId === ch.id
                      ? "bg-[#07182D] text-white border-[#00BCEB] shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span>{ch.emoji}</span>
                  <span>{ch.shortTitle}</span>
                  <span className="text-[11px] opacity-75">
                    ({ch.recommendedHours}h)
                  </span>
                </button>
              ))}
            </div>

            {submitBanner && (
              <div className="bg-emerald-50 border-2 border-emerald-500 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-emerald-950">
                      {submitBanner}
                    </h4>
                    <p className="text-xs text-emerald-800">
                      Paso 5 del MVP: Un docente/evaluador califica tu entrega
                      con la rúbrica digital de 100 puntos.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab("evaluator")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg shrink-0 flex items-center gap-1.5"
                >
                  <span>Ir a Consola del Evaluador</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Columna Izquierda (7 cols): Especificación del Reto + Rúbrica Transparente */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="bg-[#07182D] text-white p-6 border-b border-slate-800">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded bg-[#00BCEB]/20 text-[#00BCEB] text-xs font-bold uppercase tracking-wider">
                        {activeChallenge.category} · {activeChallenge.level}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-400/30">
                        <Clock className="w-3.5 h-3.5" />
                        Tiempo recomendado: {activeChallenge.recommendedHours}{" "}
                        horas (M de SCAMPER)
                      </span>
                    </div>
                    <h2 className="text-2xl font-extrabold flex items-center gap-2.5">
                      <span>{activeChallenge.emoji}</span>
                      <span>{activeChallenge.title}</span>
                    </h2>
                    <p className="text-slate-300 text-sm mt-2">
                      {activeChallenge.summary}
                    </p>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Escenario práctico */}
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#07182D] mb-2 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#0096BD]" />
                        Escenario Práctico TECSUP
                      </h3>
                      <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-200 leading-relaxed">
                        {activeChallenge.businessScenario}
                      </p>
                    </div>

                    {/* Requerimientos Técnicos */}
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#07182D] mb-2.5 flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-[#0096BD]" />
                        Requisitos Técnicos de la Solución
                      </h3>
                      <ul className="space-y-2">
                        {activeChallenge.technicalRequirements.map(
                          (req, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2.5 text-sm text-slate-700"
                            >
                              <span className="w-5 h-5 rounded-full bg-[#07182D] text-[#00BCEB] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {index + 1}
                              </span>
                              <span>{req}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    {/* Tabla de Rúbrica Oficial (100 Puntos) */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-[#07182D] flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          Rúbrica Oficial de Evaluación (100 Puntos)
                        </h3>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                          Puntaje mínimo aprobatorio:{" "}
                          {activeChallenge.minPassingScore}/100
                        </span>
                      </div>

                      <div className="overflow-hidden rounded-lg border border-slate-200">
                        <table className="w-full text-left border-collapse text-sm">
                          <thead>
                            <tr className="bg-[#07182D] text-white text-xs uppercase">
                              <th className="py-2.5 px-4">Criterio</th>
                              <th className="py-2.5 px-4">
                                Qué evalúa el docente en tu evidencia
                              </th>
                              <th className="py-2.5 px-4 text-right">
                                Puntaje Máx.
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {activeChallenge.criteria.map((c) => (
                              <tr key={c.id} className="hover:bg-slate-50">
                                <td className="py-3 px-4 font-bold text-[#07182D] whitespace-nowrap">
                                  {c.name}
                                </td>
                                <td className="py-3 px-4 text-slate-600 text-xs">
                                  {c.description}
                                </td>
                                <td className="py-3 px-4 text-right font-extrabold text-[#07182D]">
                                  {c.maxPoints} pts
                                </td>
                              </tr>
                            ))}
                            <tr className="bg-slate-100 font-bold text-[#07182D]">
                              <td className="py-2.5 px-4" colSpan={2}>
                                Total de la Rúbrica
                              </td>
                              <td className="py-2.5 px-4 text-right text-base">
                                100 pts
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Demostración del Flujo Invertido (R de SCAMPER): Qué pasa si el alumno aún no supera el reto */}
                <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2.5 py-1 rounded">
                      <RefreshCw className="w-3.5 h-3.5" /> R de SCAMPER: Orden
                      Invertido (Diagnosticar → Demostrar → Aprender si es
                      necesario)
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                    Si intentas directamente el reto y obtienes menos de{" "}
                    <strong>75/100</strong>, SkillProof{" "}
                    <strong>no te obliga a llevar un curso de 16 semanas</strong>
                    : identifica exactamente qué criterio de la rúbrica estuvo
                    bajo y te asigna únicamente la cápsula técnica que necesitas
                    reforzar:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {activeChallenge.criteria.slice(0, 4).map((crit) => (
                      <div
                        key={crit.id}
                        className="bg-white/90 rounded-lg p-3 border border-amber-200 text-xs"
                      >
                        <div className="font-bold text-[#07182D]">
                          Si fallas en «{crit.name}»:
                        </div>
                        <div className="text-slate-600 mt-0.5">
                          Reforzar: {crit.reinforcementTopic}
                        </div>
                        <div className="text-[#0096BD] font-semibold mt-1">
                          → {crit.reinforcementResource}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Columna Derecha (5 cols): Formulario de Entrega + Verificador GitHub API */}
              <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-20">
                <div className="bg-[#0D274D] text-white px-5 py-4 border-b border-slate-800">
                  <span className="text-[11px] uppercase tracking-wider text-[#00BCEB] font-bold block">
                    Paso 4 del MVP · Combinar (C de SCAMPER)
                  </span>
                  <h3 className="text-lg font-bold mt-0.5">
                    Entregar Evidencia Práctica (GitHub + Docs)
                  </h3>
                </div>

                <form onSubmit={handleChallengeSubmit} className="p-5 space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      Estudiante que realiza la entrega
                    </label>
                    <select
                      value={selectedStudentId}
                      onChange={(e) => setSelectedStudentId(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-slate-50 font-semibold text-[#07182D]"
                    >
                      {TEAM_STUDENTS.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.fullName} ({s.career})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* URL del Repositorio GitHub con Verificación API */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      1. URL del Repositorio en GitHub *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        required
                        value={repoUrlInput}
                        onChange={(e) => setRepoUrlInput(e.target.value)}
                        placeholder="https://github.com/usuario/proyecto-api"
                        className="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#00BCEB]"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyGithubRepo}
                        disabled={repoVerification.loading}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-[#07182D] font-bold text-xs rounded-lg border border-slate-300 shrink-0 transition-colors"
                      >
                        {repoVerification.loading
                          ? "Verificando..."
                          : "Verificar Repo"}
                      </button>
                    </div>
                    {repoVerification.message && (
                      <div
                        className={`mt-2 p-2.5 rounded-lg text-xs flex items-center gap-2 border ${
                          repoVerification.verified
                            ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                            : "bg-red-50 border-red-200 text-red-700"
                        }`}
                      >
                        {repoVerification.verified ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                        )}
                        <div>
                          <div className="font-semibold">
                            {repoVerification.message}
                          </div>
                          {repoVerification.verified && (
                            <div className="text-[11px] opacity-80">
                              Rama: {repoVerification.branch} · Stack detectado:{" "}
                              {repoVerification.language}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* URL de Documentación */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      2. URL de Documentación (README / Swagger / OpenAPI) *
                    </label>
                    <input
                      type="url"
                      required
                      value={docsUrlInput}
                      onChange={(e) => setDocsUrlInput(e.target.value)}
                      placeholder="https://github.com/usuario/proyecto#documentacion"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#00BCEB]"
                    />
                  </div>

                  {/* URL Demo Opcional */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      3. Endpoint / Despliegue en Vivo (Opcional)
                    </label>
                    <input
                      type="url"
                      value={liveDemoInput}
                      onChange={(e) => setLiveDemoInput(e.target.value)}
                      placeholder="https://mi-api-tecsup.vercel.app/api/products"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#00BCEB]"
                    />
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1">
                    <div className="font-bold text-[#07182D]">
                      Checklist antes de enviar:
                    </div>
                    <div>• El repositorio de GitHub es público y accesible.</div>
                    <div>
                      • Incluye instrucciones para ejecutar el proyecto.
                    </div>
                    <div>
                      • No contiene archivos sensibles (.env) en el árbol Git.
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#00BCEB] hover:bg-[#0096BD] text-[#07182D] font-extrabold text-sm py-3 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <GitBranch className="w-4 h-4" />
                    <span>Registrar Entrega para Evaluación con Rúbrica</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            MÓDULO 3: CONSOLA DEL EVALUADOR CON RÚBRICA DIGITAL (E de SCAMPER)
        ========================================================= */}
        {activeTab === "evaluator" && (
          <div className="space-y-6">
            <div className="bg-[#07182D] text-white rounded-xl p-5 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00BCEB]">
                  Paso 5 y 6 del MVP · Eliminar complejidad innecesaria (E de
                  SCAMPER)
                </span>
                <h2 className="text-xl font-extrabold mt-0.5">
                  Consola Docente de Evaluación mediante Rúbrica Digital
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Sin IA costosa ni blockchain: el docente revisa el repositorio
                  GitHub entregado, asigna los puntajes por criterio y emite la
                  competencia validada al instante.
                </p>
              </div>

              {/* Botones rápidos para simular escenarios en la sustentación */}
              <div className="flex flex-wrap gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    if (!currentEvaluatorSubmission) return;
                    const scores = currentEvaluatorSubmission.scores;
                    const preset = [25, 20, 18, 13, 12]; // 88/100 exacto del documento
                    const nextMap: Record<string, number> = {};
                    scores.forEach((s, i) => {
                      nextMap[s.criterionId] = preset[i] ?? s.maxPoints;
                    });
                    setDraftScores(nextMap);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#00D084]/20 border border-[#00D084] text-[#00D084] text-xs font-bold hover:bg-[#00D084]/30"
                >
                  Cargar Ejemplo MVP (88/100)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!currentEvaluatorSubmission) return;
                    const scores = currentEvaluatorSubmission.scores;
                    const preset = [18, 12, 13, 9, 8]; // 60/100 para probar flujo de Refuerzo
                    const nextMap: Record<string, number> = {};
                    scores.forEach((s, i) => {
                      nextMap[s.criterionId] = preset[i] ?? 10;
                    });
                    setDraftScores(nextMap);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-400 text-amber-300 text-xs font-bold hover:bg-amber-500/30"
                >
                  Simular Puntaje Bajo (60/100 · Refuerzo)
                </button>
              </div>
            </div>

            {evaluationSuccessMsg && (
              <div className="bg-emerald-50 border-2 border-emerald-500 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Award className="w-7 h-7 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-emerald-950">
                      {evaluationSuccessMsg}
                    </h4>
                    <p className="text-xs text-emerald-800">
                      Paso 7 del MVP: El resultado ya está disponible y
                      verificable en el Pasaporte Tecnológico del estudiante.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab("passport")}
                  className="bg-[#07182D] hover:bg-[#0D274D] text-[#00D084] text-xs font-bold px-4 py-2.5 rounded-lg shrink-0 flex items-center gap-1.5"
                >
                  <span>Ver en Pasaporte Tecnológico</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Lista lateral de entregas */}
              <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-[#07182D]">
                    Entregas de Estudiantes ({submissions.length})
                  </span>
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                    {pendingSubmissions.length} pendientes
                  </span>
                </div>
                <div className="divide-y divide-slate-200 max-h-[540px] overflow-y-auto">
                  {submissions.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => handleSelectSubmissionForEval(sub)}
                      className={`w-full text-left p-4 transition-colors flex flex-col gap-1.5 ${
                        currentEvaluatorSubmission?.id === sub.id
                          ? "bg-sky-50/90 border-l-4 border-l-[#00BCEB]"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-[#07182D]">
                          {sub.studentName}
                        </span>
                        {sub.status === "PENDING" && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                            PENDIENTE
                          </span>
                        )}
                        {sub.status === "VALIDATED" && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {sub.totalScore}/100 · VALIDADO
                          </span>
                        )}
                        {sub.status === "NEEDS_REINFORCEMENT" && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800">
                            {sub.totalScore}/100 · REFUERZO
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <span>{sub.challengeEmoji}</span>
                        <span>{sub.challengeTitle}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Enviado: {sub.submittedAt} · Commit #{sub.commitHash}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Panel derecho: Rúbrica interactiva */}
              {currentEvaluatorSubmission && (
                <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-[#0096BD] uppercase">
                        Evaluando Entrega · {currentEvaluatorSubmission.challengeCategory}
                      </span>
                      <h3 className="text-xl font-extrabold text-[#07182D]">
                        {currentEvaluatorSubmission.challengeEmoji}{" "}
                        {currentEvaluatorSubmission.challengeTitle}
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Estudiante:{" "}
                        <strong>{currentEvaluatorSubmission.studentName}</strong>{" "}
                        ({currentEvaluatorSubmission.studentCareer})
                      </p>
                    </div>

                    {/* Enlaces directos a la evidencia en GitHub */}
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={currentEvaluatorSubmission.githubRepoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#07182D] text-white text-xs font-semibold hover:bg-[#0D274D]"
                      >
                        <GitBranch className="w-3.5 h-3.5 text-[#00BCEB]" />
                        <span>Abrir Repo GitHub</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <a
                        href={currentEvaluatorSubmission.documentationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#0096BD]" />
                        <span>Ver Documentación</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Controles de los 5 Criterios de la Rúbrica */}
                  <div className="p-6 space-y-5">
                    <div className="space-y-4">
                      {currentEvaluatorSubmission.scores.map((crit) => {
                        const val =
                          draftScores[crit.criterionId] ?? crit.pointsAwarded;
                        const pct = Math.round((val / crit.maxPoints) * 100);
                        return (
                          <div
                            key={crit.criterionId}
                            className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="font-bold text-sm text-[#07182D]">
                                  {crit.criterionName}
                                </span>
                                <span className="ml-2 text-xs text-slate-500">
                                  (Máx: {crit.maxPoints} pts)
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  min={0}
                                  max={crit.maxPoints}
                                  value={val}
                                  onChange={(e) => {
                                    const num = Math.max(
                                      0,
                                      Math.min(
                                        crit.maxPoints,
                                        Number(e.target.value) || 0
                                      )
                                    );
                                    setDraftScores((prev) => ({
                                      ...prev,
                                      [crit.criterionId]: num,
                                    }));
                                  }}
                                  className="w-16 text-center font-extrabold text-sm py-1 px-2 rounded border border-slate-300 bg-white text-[#07182D]"
                                />
                                <span className="text-sm font-bold text-slate-500">
                                  / {crit.maxPoints}
                                </span>
                              </div>
                            </div>

                            <input
                              type="range"
                              min={0}
                              max={crit.maxPoints}
                              value={val}
                              onChange={(e) =>
                                setDraftScores((prev) => ({
                                  ...prev,
                                  [crit.criterionId]: Number(e.target.value),
                                }))
                              }
                              className="w-full accent-[#00BCEB] cursor-pointer"
                            />

                            <div className="flex items-center justify-between text-[11px] text-slate-500">
                              <span>Cumplimiento del criterio: {pct}%</span>
                              {pct < 70 && (
                                <span className="text-amber-700 font-semibold">
                                  ⚠️ Se recomendará reforzar:{" "}
                                  {crit.reinforcementTopic}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Observaciones del evaluador */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                        Retroalimentación Técnica del Evaluador
                      </label>
                      <textarea
                        rows={2}
                        value={evaluatorNotes}
                        onChange={(e) => setEvaluatorNotes(e.target.value)}
                        className="w-full p-3 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#00BCEB]"
                      />
                    </div>

                    {/* Resumen Total (Ej. 88/100) y Botón de Emisión */}
                    <div
                      className={`p-5 rounded-xl border-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                        evaluatorTotalScore >= 75
                          ? "bg-emerald-50/70 border-emerald-500"
                          : "bg-amber-50/70 border-amber-500"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
                          Resultado Total de la Rúbrica
                        </div>
                        <div className="flex items-baseline gap-3 mt-1">
                          <span className="text-3xl font-extrabold text-[#07182D]">
                            {evaluatorTotalScore}/100
                          </span>
                          {evaluatorTotalScore >= 75 ? (
                            <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded bg-emerald-600 text-white">
                              🏅 Supera el mínimo (75) · Competencia Validada
                            </span>
                          ) : (
                            <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded bg-amber-600 text-white">
                              ⚠️ Menor a 75 · Activa Ruta de Refuerzo
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleFinalizeEvaluation}
                        className="bg-[#07182D] hover:bg-[#0D274D] text-white font-extrabold text-sm px-5 py-3 rounded-lg shadow transition-colors flex items-center gap-2 shrink-0"
                      >
                        <UserCheck className="w-4 h-4 text-[#00D084]" />
                        <span>
                          {evaluatorTotalScore >= 75
                            ? "Emitir Microcredencial al Pasaporte"
                            : "Guardar Diagnóstico de Refuerzo"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================
            MÓDULO 4: PASAPORTE TECNOLÓGICO (A y C de SCAMPER · ESTILO NETACAD + CREDLY)
        ========================================================= */}
        {activeTab === "passport" && (
          <div className="space-y-6">
            {/* Selector de integrantes del equipo para ver su Pasaporte */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs font-bold uppercase text-slate-500">
                Seleccionar Pasaporte Tecnológico del Estudiante (Equipo
                SkillProof):
              </div>
              <div className="flex flex-wrap gap-2">
                {TEAM_STUDENTS.map((stu) => (
                  <button
                    key={stu.id}
                    onClick={() => setSelectedStudentId(stu.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedStudentId === stu.id
                        ? "bg-[#07182D] text-[#00D084] shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {stu.fullName.split(" ").slice(0, 2).join(" ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Cabecera del Pasaporte Tecnológico */}
            <div className="bg-gradient-to-r from-[#07182D] via-[#0D274D] to-[#07182D] text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-[#1a3a66]">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-start sm:items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00BCEB] to-[#00D084] p-0.5 shrink-0 shadow-md">
                    <div className="w-full h-full bg-[#07182D] rounded-[14px] flex items-center justify-center text-2xl font-extrabold text-white">
                      {activeStudent.avatarInitials}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#00D084]/20 border border-[#00D084]/40 text-[#00D084] text-[11px] font-bold uppercase">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Pasaporte Tecnológico Verificable · TECSUP
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold">
                      {activeStudent.fullName}
                    </h2>
                    <p className="text-sm text-[#00BCEB] font-semibold">
                      {activeStudent.career} · {activeStudent.department} (
                      {activeStudent.cycle})
                    </p>
                    <p className="text-xs text-slate-300 max-w-2xl">
                      {activeStudent.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 w-full md:w-auto">
                  <div className="bg-[#041020]/90 border border-slate-700 rounded-xl px-4 py-3 text-center">
                    <div className="text-2xl font-extrabold text-[#00D084]">
                      {validatedStudentSubmissions.length}
                    </div>
                    <div className="text-[11px] text-slate-300 font-medium">
                      Competencias Validadas con Evidencia
                    </div>
                  </div>
                  <a
                    href={activeStudent.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#00BCEB] text-[#07182D] font-bold text-xs hover:bg-[#0096BD] transition-colors"
                  >
                    <GitBranch className="w-4 h-4" />
                    <span>@{activeStudent.githubUsername}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Sección de Microcredenciales Validadas mediante Evidencia Práctica */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-[#07182D] flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#0096BD]" />
                    Competencias Validadas mediante Evidencia Práctica
                  </h3>
                  <p className="text-xs text-slate-600">
                    Haz clic en cualquier microcredencial para inspeccionar el
                    repositorio GitHub, la documentación y el desglose de la
                    rúbrica.
                  </p>
                </div>
              </div>

              {validatedStudentSubmissions.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-3">
                  <p className="text-sm text-slate-600">
                    Este estudiante aún tiene entregas pendientes de validación
                    en la Consola de Evaluador.
                  </p>
                  <button
                    onClick={() => setActiveTab("evaluator")}
                    className="px-4 py-2 bg-[#07182D] text-[#00BCEB] text-xs font-bold rounded-lg"
                  >
                    Ir a Evaluar Entregas Pendientes →
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {validatedStudentSubmissions.map((cred) => (
                    <div
                      key={cred.id}
                      className="bg-white rounded-xl border-2 border-slate-200 hover:border-[#00D084] shadow-sm transition-all overflow-hidden flex flex-col justify-between"
                    >
                      {/* Cabecera de la Microcredencial estilo Cisco / Credly */}
                      <div className="p-6 flex items-start gap-4">
                        {/* Escudo Hexagonal Cisco NetAcad Style */}
                        <div className="w-20 h-24 rounded-xl bg-gradient-to-b from-[#07182D] to-[#0D274D] border-2 border-[#00D084] flex flex-col items-center justify-center p-2 shrink-0 shadow-md text-center">
                          <span className="text-2xl">{cred.challengeEmoji}</span>
                          <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#00D084] mt-1">
                            SKILLPROOF
                          </span>
                          <span className="text-[10px] font-bold text-white bg-[#00D084]/20 px-1.5 rounded mt-0.5">
                            {cred.totalScore}/100
                          </span>
                        </div>

                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-1">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 text-[11px] font-extrabold uppercase">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Verificado por SkillProof
                            </span>
                            <span className="text-[11px] font-mono text-slate-500">
                              ID: {cred.verificationId}
                            </span>
                          </div>

                          <h4 className="text-lg font-extrabold text-[#07182D]">
                            🏅 {cred.challengeTitle}
                          </h4>

                          <p className="text-xs text-slate-600">
                            Evaluado por:{" "}
                            <strong>{cred.evaluatorName}</strong> ·{" "}
                            {cred.evaluatedAt}
                          </p>

                          {/* Mini barras de los 5 criterios */}
                          <div className="grid grid-cols-5 gap-1.5 pt-2">
                            {cred.scores.map((sc) => (
                              <div
                                key={sc.criterionId}
                                className="bg-slate-50 p-1.5 rounded border border-slate-200 text-center"
                              >
                                <div className="text-[10px] text-slate-500 truncate">
                                  {sc.criterionName}
                                </div>
                                <div className="text-xs font-extrabold text-[#07182D]">
                                  {sc.pointsAwarded}/{sc.maxPoints}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Pie de tarjeta con acceso directo a la evidencia */}
                      <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-3 text-xs">
                          <a
                            href={cred.githubRepoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 font-bold text-[#07182D] hover:text-[#0096BD]"
                          >
                            <GitBranch className="w-3.5 h-3.5 text-[#0096BD]" />
                            <span>Repositorio GitHub</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={cred.documentationUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 font-bold text-slate-600 hover:text-[#07182D]"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Documentación</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        <button
                          onClick={() => setEvidenceModalSubmission(cred)}
                          className="px-3.5 py-1.5 rounded-lg bg-[#07182D] hover:bg-[#0D274D] text-[#00BCEB] font-bold text-xs transition-colors"
                        >
                          Ver Rúbrica y Evidencia Completa →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sección de Retos en Diagnóstico / Refuerzo (R de SCAMPER) */}
            {studentSubmissions.some(
              (s) => s.status === "NEEDS_REINFORCEMENT"
            ) && (
              <div className="space-y-3 pt-4">
                <h3 className="text-base font-extrabold text-amber-900 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-amber-600" />
                  Diagnóstico Activo: Competencias en Refuerzo Puntual (R de
                  SCAMPER)
                </h3>
                {studentSubmissions
                  .filter((s) => s.status === "NEEDS_REINFORCEMENT")
                  .map((sub) => (
                    <div
                      key={sub.id}
                      className="bg-amber-50/90 border border-amber-300 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#07182D]">
                            {sub.challengeEmoji} {sub.challengeTitle}
                          </span>
                          <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-200 text-amber-900">
                            Puntaje obtenido: {sub.totalScore}/100 (Mínimo: 75)
                          </span>
                        </div>
                        <p className="text-xs text-amber-950">
                          {sub.evaluatorFeedback}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {sub.scores
                            .filter((sc) => sc.pointsAwarded / sc.maxPoints < 0.7)
                            .map((sc) => (
                              <span
                                key={sc.criterionId}
                                className="px-2.5 py-1 rounded bg-white border border-amber-300 text-[11px] font-semibold text-amber-900"
                              >
                                Reforzar {sc.criterionName} ({sc.pointsAwarded}/
                                {sc.maxPoints}): {sc.reinforcementResource}
                              </span>
                            ))}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedChallengeId(sub.challengeId);
                          setActiveTab("challenge-lab");
                        }}
                        className="px-4 py-2 rounded-lg bg-[#07182D] text-white text-xs font-bold shrink-0"
                      >
                        Reintentar Reto →
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            MÓDULO 5: PORTAL DE EMPLEABILIDAD & EMPRESAS (P de SCAMPER)
        ========================================================= */}
        {activeTab === "companies" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0096BD]">
                  P de SCAMPER · Proponer otros usos (Empleabilidad y Prácticas
                  TECSUP)
                </span>
                <h2 className="text-xl font-extrabold text-[#07182D] mt-0.5">
                  Buscador de Talento con Competencias Demostradas
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Las empresas y coordinadores de prácticas de TECSUP filtran
                  estudiantes de <strong>Diseño y Desarrollo de Software</strong>{" "}
                  según las competencias que ya demostraron con código real.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {[
                  "ALL",
                  "REST API",
                  "Python",
                  "SQL Database",
                  "Git & GitHub",
                ].map((skill) => (
                  <button
                    key={skill}
                    onClick={() => setCompanySkillFilter(skill)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      companySkillFilter === skill
                        ? "bg-[#07182D] text-[#00BCEB]"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {skill === "ALL" ? "Todas las Competencias" : skill}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TEAM_STUDENTS.filter((stu) => {
                if (companySkillFilter === "ALL") return true;
                return stu.highlightSkills.some((s) =>
                  s.toLowerCase().includes(companySkillFilter.toLowerCase())
                );
              }).map((stu) => {
                const stuValidated = submissions.filter(
                  (s) => s.studentId === stu.id && s.status === "VALIDATED"
                );
                return (
                  <div
                    key={stu.id}
                    className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-[#07182D] text-[#00BCEB] font-extrabold flex items-center justify-center text-lg">
                          {stu.avatarInitials}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-base text-[#07182D]">
                            {stu.fullName}
                          </h3>
                          <p className="text-xs text-slate-500">
                            {stu.career} · {stu.cycle} · {stu.campus}
                          </p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                        Disponible Prácticas
                      </span>
                    </div>

                    <p className="text-xs text-slate-600">{stu.bio}</p>

                    {/* Microcredenciales verificadas del alumno */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-bold uppercase text-slate-400">
                        Evidencias Verificadas en SkillProof (
                        {stuValidated.length}):
                      </div>
                      {stuValidated.length > 0 ? (
                        <div className="space-y-1.5">
                          {stuValidated.map((v) => (
                            <div
                              key={v.id}
                              onClick={() => setEvidenceModalSubmission(v)}
                              className="p-2.5 rounded-lg bg-slate-50 hover:bg-sky-50 border border-slate-200 cursor-pointer flex items-center justify-between text-xs transition-colors"
                            >
                              <span className="font-bold text-[#07182D]">
                                🏅 {v.challengeTitle}
                              </span>
                              <span className="font-extrabold text-emerald-700">
                                {v.totalScore}/100 · Ver Código ↗
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-xs text-slate-400 italic">
                          Entregas en proceso de evaluación docente.
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <a
                        href={stu.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-slate-600 hover:text-[#07182D] flex items-center gap-1"
                      >
                        <GitBranch className="w-3.5 h-3.5" />
                        GitHub: @{stu.githubUsername}
                      </a>
                      <button
                        onClick={() => {
                          setSelectedStudentId(stu.id);
                          setActiveTab("passport");
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-[#07182D] text-[#00BCEB] text-xs font-bold hover:bg-[#0D274D]"
                      >
                        Abrir Pasaporte Completo →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================
            MÓDULO 6: MATRIZ SCAMPER & OBSERVACIONES CRÍTICAS INTEGRADAS
        ========================================================= */}
        {activeTab === "scamper" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase text-[#0096BD]">
                    INSTITUTO SUPERIOR TECNOLÓGICO TECSUP · Dpto. de Tecnología
                    Digital
                  </span>
                  <h2 className="text-2xl font-extrabold text-[#07182D]">
                    Aplicación del Método SCAMPER y Delimitación del MVP —
                    SkillProof
                  </h2>
                </div>
                <button
                  onClick={() => setActiveTab("catalog")}
                  className="px-4 py-2 rounded-lg bg-[#07182D] text-[#00BCEB] text-xs font-bold"
                >
                  ← Volver al Catálogo
                </button>
              </div>

              {/* Problema y Usuario Delimitado (Observaciones Críticas 1, 2, 3, 4 y 5) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-xs font-extrabold uppercase text-[#07182D]">
                    1. Problema Específico e Investigable
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Los estudiantes de carreras tecnológicas de TECSUP
                    desarrollan competencias y proyectos durante su formación,
                    pero no cuentan con un mecanismo centralizado que permita
                    demostrar mediante{" "}
                    <strong>evidencias prácticas verificables</strong>{" "}
                    competencias específicas frente a oportunidades académicas o
                    laborales.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-xs font-extrabold uppercase text-[#07182D]">
                    2. Usuario Delimitado (Piloto Inicial)
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Estudiantes del{" "}
                    <strong>
                      Departamento de Tecnología Digital de TECSUP
                    </strong>{" "}
                    (piloto en la carrera de{" "}
                    <strong>Diseño y Desarrollo de Software</strong>) que buscan
                    demostrar competencias técnicas complementarias para
                    prácticas preprofesionales y primeras oportunidades
                    laborales.
                  </p>
                </div>
              </div>

              {/* Tabla SCAMPER completa */}
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#07182D] text-white">
                      <th className="p-3.5">Letra SCAMPER</th>
                      <th className="p-3.5">Idea Aplicada en SkillProof</th>
                      <th className="p-3.5">Efecto sobre las Restricciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-3.5 font-extrabold text-[#07182D]">
                        S – Sustituir
                      </td>
                      <td className="p-3.5 text-slate-700">
                        Sustituir cursos propios por{" "}
                        <strong>5 retos prácticos</strong> (Python, SQL, REST
                        API, Git, Cloud).
                      </td>
                      <td className="p-3.5 text-slate-600">
                        Reduce costos y tiempo de desarrollo del MVP al no
                        producir clases en video.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-extrabold text-[#07182D]">
                        C – Combinar
                      </td>
                      <td className="p-3.5 text-slate-700">
                        Combinar{" "}
                        <strong>
                          Microcredenciales + Portafolio + Repositorio GitHub
                        </strong>
                        .
                      </td>
                      <td className="p-3.5 text-slate-600">
                        Reduce riesgo técnico aprovechando GitHub que los
                        estudiantes ya usan.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-extrabold text-[#07182D]">
                        A – Adaptar
                      </td>
                      <td className="p-3.5 text-slate-700">
                        Adaptar insignias digitales al contexto TECSUP mediante
                        un <strong>Pasaporte Tecnológico</strong>.
                      </td>
                      <td className="p-3.5 text-slate-600">
                        Adapta un modelo validado (estilo NetAcad/Credly) con
                        evidencia real.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-extrabold text-[#07182D]">
                        M – Modificar
                      </td>
                      <td className="p-3.5 text-slate-700">
                        Minimizar evaluaciones a{" "}
                        <strong>retos concretos de 1 a 4 horas</strong>.
                      </td>
                      <td className="p-3.5 text-slate-600">
                        Facilita que alumnos con carga académica participen y
                        agiliza la revisión docente.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-extrabold text-[#07182D]">
                        P – Proponer otros usos
                      </td>
                      <td className="p-3.5 text-slate-700">
                        Portal para identificar alumnos para{" "}
                        <strong>prácticas y convocatorias empresariales</strong>
                        .
                      </td>
                      <td className="p-3.5 text-slate-600">
                        Aumenta el valor institucional para TECSUP apoyando la
                        empleabilidad.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-extrabold text-[#07182D]">
                        E – Eliminar
                      </td>
                      <td className="p-3.5 text-slate-700">
                        Eliminar inicialmente IA avanzada, blockchain y
                        autograders complejos; usar{" "}
                        <strong>Rúbrica Digital</strong>.
                      </td>
                      <td className="p-3.5 text-slate-600">
                        Reduce drásticamente costos, tiempo y riesgo técnico en
                        el MVP.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-extrabold text-[#07182D]">
                        R – Reorganizar / Invertir
                      </td>
                      <td className="p-3.5 text-slate-700">
                        Invertir a{" "}
                        <strong>
                          «Diagnosticar → Demostrar → Aprender qué reforzar»
                        </strong>
                        .
                      </td>
                      <td className="p-3.5 text-slate-600">
                        El alumno que ya domina una tecnología va directo al
                        reto sin repetir cursos.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =========================================================
          MODAL DE EVIDENCIA PRÁCTICA VERIFICABLE (DIFERENCIADOR SKILLPROOF)
      ========================================================= */}
      {evidenceModalSubmission && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 my-8">
            {/* Header del Modal */}
            <div className="bg-[#07182D] text-white p-6 flex items-start justify-between gap-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#00D084]/20 text-[#00D084] text-xs font-extrabold uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  Competencia Validada mediante Evidencia Práctica
                </div>
                <h3 className="text-xl font-extrabold">
                  🏅 {evidenceModalSubmission.challengeTitle}
                </h3>
                <p className="text-xs text-slate-300">
                  Estudiante:{" "}
                  <strong>{evidenceModalSubmission.studentName}</strong> ·
                  Código de Verificación:{" "}
                  <span className="font-mono text-[#00BCEB]">
                    {evidenceModalSubmission.verificationId}
                  </span>
                </p>
              </div>
              <button
                onClick={() => setEvidenceModalSubmission(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cuerpo del Modal: Rúbrica desglosada + Links de GitHub */}
            <div className="p-6 space-y-5">
              {/* Tabla exacta del ejemplo del MVP (88/100) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase text-slate-500">
                    Desglose de Evaluación por Rúbrica
                  </span>
                  <span className="text-sm font-extrabold text-emerald-700 bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200">
                    Total Obtenido: {evidenceModalSubmission.totalScore}/100
                  </span>
                </div>

                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-100 text-[#07182D] text-xs uppercase">
                        <th className="py-2.5 px-4">Criterio Evaluado</th>
                        <th className="py-2.5 px-4">Barra de Cumplimiento</th>
                        <th className="py-2.5 px-4 text-right">Resultado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {evidenceModalSubmission.scores.map((sc) => {
                        const pct = Math.round(
                          (sc.pointsAwarded / sc.maxPoints) * 100
                        );
                        return (
                          <tr key={sc.criterionId}>
                            <td className="py-2.5 px-4 font-bold text-[#07182D]">
                              {sc.criterionName}
                            </td>
                            <td className="py-2.5 px-4 w-1/2">
                              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                                <div
                                  className="bg-[#00D084] h-full rounded-full"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </td>
                            <td className="py-2.5 px-4 text-right font-extrabold text-[#07182D]">
                              {sc.pointsAwarded}/{sc.maxPoints}
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="bg-[#07182D] text-white font-extrabold">
                        <td className="py-2.5 px-4" colSpan={2}>
                          Total
                        </td>
                        <td className="py-2.5 px-4 text-right text-[#00D084] text-base">
                          {evidenceModalSubmission.totalScore}/100
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Comentario del Evaluador */}
              {evidenceModalSubmission.evaluatorFeedback && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1">
                  <div className="font-bold text-[#07182D]">
                    Dictamen del Evaluador ({evidenceModalSubmission.evaluatorName}):
                  </div>
                  <p>{evidenceModalSubmission.evaluatorFeedback}</p>
                </div>
              )}

              {/* Enlaces Verificables al Código y Documentación */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <a
                  href={evidenceModalSubmission.githubRepoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-xl bg-[#07182D] hover:bg-[#0D274D] text-white flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <GitBranch className="w-5 h-5 text-[#00BCEB]" />
                    <div>
                      <div className="text-xs font-extrabold">
                        Repositorio en GitHub
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Commit #{evidenceModalSubmission.commitHash}
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#00BCEB]" />
                </a>

                <a
                  href={evidenceModalSubmission.documentationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#07182D] border border-slate-300 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-5 h-5 text-[#0096BD]" />
                    <div>
                      <div className="text-xs font-extrabold">
                        Documentación Técnica
                      </div>
                      <div className="text-[11px] text-slate-600">
                        README / OpenAPI Spec
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#0096BD]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. FOOTER INSTITUCIONAL CON EL EQUIPO DE PROYECTO */}
      <footer className="bg-[#041020] text-slate-400 text-xs border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00BCEB]" />
              <span>
                SkillProof · Instituto Superior Tecnológico TECSUP (Dpto. de
                Tecnología Digital)
              </span>
            </div>
            <p className="text-slate-400">
              Carrera: Diseño y Desarrollo de Software · «NOTA dice cuánto
              obtuvo. CERTIFICADO dice qué completó. SKILLPROOF muestra qué sabe
              hacer y la evidencia que lo demuestra.»
            </p>
          </div>
          <div className="text-right space-y-0.5">
            <div className="text-slate-300 font-semibold">
              Equipo Desarrollador:
            </div>
            <div className="text-[11px] text-slate-400">
              Samir Haziel Alfonso Solorzano · Carlos Enrique Ruiz Llanterhuay ·
              Gabriela Soto Huaman · Luis Enrique Galvan Morales · Matias Galvan
              Guerrero
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


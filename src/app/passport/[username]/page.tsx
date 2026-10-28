import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  GitBranch,
  FileText,
  ExternalLink,
  CheckCircle2,
  ArrowLeft,
  GraduationCap,
} from "lucide-react";
import {
  TEAM_STUDENTS,
  INITIAL_SUBMISSIONS,
} from "@/lib/skillproof-data";

export default async function PublicStudentPassportPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const student =
    TEAM_STUDENTS.find((s) => s.username === username) || TEAM_STUDENTS[0];

  const validatedCredentials = INITIAL_SUBMISSIONS.filter(
    (s) => s.studentId === student.id && s.status === "VALIDATED"
  );

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-900">
      {/* Top Bar */}
      <header className="bg-[#07182D] text-white border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-7 h-7 text-[#00BCEB]" />
            <div>
              <span className="font-bold text-lg">
                Skill<span className="text-[#00BCEB]">Proof</span>
              </span>
              <span className="ml-2 text-xs text-slate-400">
                Pasaporte Tecnológico Público · TECSUP
              </span>
            </div>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg bg-[#0D274D] text-[#00BCEB] hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a la Plataforma</span>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Card Principal del Estudiante */}
        <div className="bg-gradient-to-r from-[#07182D] to-[#0D274D] text-white rounded-2xl p-6 sm:p-8 shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00D084]/20 text-[#00D084] text-xs font-bold uppercase">
                <GraduationCap className="w-3.5 h-3.5" />
                {student.department} · TECSUP
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold">
                {student.fullName}
              </h1>
              <p className="text-sm text-[#00BCEB] font-semibold">
                {student.career} ({student.cycle})
              </p>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                {student.bio}
              </p>
            </div>

            <div className="bg-[#041020] border border-slate-700 rounded-xl p-4 text-center shrink-0">
              <div className="text-3xl font-extrabold text-[#00D084]">
                {validatedCredentials.length}
              </div>
              <div className="text-xs text-slate-300">
                Competencias Validadas
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Evidencias y Rúbricas */}
        <div className="space-y-4">
          <h2 className="text-lg font-extrabold text-[#07182D] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#0096BD]" />
            Evidencias Prácticas y Desglose de Rúbricas
          </h2>

          {validatedCredentials.map((cred) => (
            <div
              key={cred.id}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 text-xs font-extrabold uppercase">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Verificado por SkillProof · ID {cred.verificationId}
                  </span>
                  <h3 className="text-xl font-extrabold text-[#07182D] mt-1">
                    {cred.challengeEmoji} {cred.challengeTitle}
                  </h3>
                </div>
                <div className="text-2xl font-extrabold text-emerald-700">
                  {cred.totalScore}/100
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {cred.scores.map((sc) => (
                  <div
                    key={sc.criterionId}
                    className="p-2.5 rounded-lg bg-slate-50 border border-slate-200"
                  >
                    <div className="text-xs text-slate-500">
                      {sc.criterionName}
                    </div>
                    <div className="text-sm font-extrabold text-[#07182D]">
                      {sc.pointsAwarded}/{sc.maxPoints}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-100 text-xs font-bold">
                <a
                  href={cred.githubRepoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#07182D] hover:text-[#0096BD]"
                >
                  <GitBranch className="w-4 h-4 text-[#0096BD]" />
                  <span>Repositorio GitHub ({cred.githubRepoUrl})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={cred.documentationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-600 hover:text-[#07182D]"
                >
                  <FileText className="w-4 h-4" />
                  <span>Documentación Técnica</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}


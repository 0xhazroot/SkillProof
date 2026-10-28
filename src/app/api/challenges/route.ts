import { NextResponse } from "next/server";
import { MVP_CHALLENGES } from "@/lib/skillproof-data";

export async function GET() {
  return NextResponse.json({
    platform: "SkillProof · TECSUP",
    department: "Departamento de Tecnología Digital",
    careerScope: "Diseño y Desarrollo de Software",
    totalChallenges: MVP_CHALLENGES.length,
    challenges: MVP_CHALLENGES,
  });
}


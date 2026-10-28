import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillProof · Pasaporte Tecnológico & Validación de Competencias | TECSUP",
  description:
    "Plataforma de validación de competencias mediante evidencias prácticas en GitHub y rúbricas transparentes para Diseño y Desarrollo de Software - TECSUP.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased selection:bg-[#00BCEB] selection:text-[#07182D]">
        {children}
      </body>
    </html>
  );
}


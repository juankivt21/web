import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Navbar } from "@/components/layout/navbar"
import "@/styles/globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "360 Vision Experience | Experiencias Únicas para Eventos Inolvidables",
  description:
    "Transforma tu evento en una experiencia inolvidable con nuestra plataforma 360° y teléfono audiolibro. Bodas, cumpleaños y eventos corporativos con un toque único y personalizado. ¡Crea momentos mágicos que tus invitados nunca olvidarán!",
  keywords:
    "plataforma 360, eventos únicos, experiencias inmersivas, bodas, eventos corporativos, teléfono audiolibro, decoración temática, fotografía eventos, experiencias personalizadas, 360 Vision Experience",
  openGraph: {
    title: "360 Vision Experience | Experiencias Únicas para Eventos",
    description:
      "Transforma tu evento en una experiencia inolvidable con nuestra plataforma 360° y teléfono audiolibro. ¡Crea momentos mágicos!",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4740-x8hZVtZULWVoMwUogqfDyA1pLxl7Re.png",
        width: 1200,
        height: 630,
        alt: "360 Vision Experience - Experiencias únicas para eventos",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        {/* Base href para asegurar que las rutas relativas funcionen correctamente */}
        <base href="/" />
      </head>
      <body className={montserrat.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}


"use client"

import { useState } from "react"
import { Calendar, DollarSign, Settings, Sun, Moon } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import AgendamentoTab from "@/components/agendamento-tab"
import CaixaTab from "@/components/caixa-tab"
import ServicosTab from "@/components/servicos-tab"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"agendamentos" | "caixa" | "servicos">("agendamentos")
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-3 py-3 sm:px-4 sm:py-6">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4">
              <img
                src="/logo.jpg"
                alt="Vera Depil Logo"
                className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"
              />
              <div>
                <h1 className="text-lg font-bold text-foreground sm:text-2xl">Vera Depil</h1>
                <p className="text-xs text-muted-foreground sm:text-sm">Sistema de Agendamento e Caixa</p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-accent hover:text-accent-foreground sm:h-10 sm:w-10"
              aria-label="Alternar tema"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-yellow-400 sm:h-5 sm:w-5" />
              ) : (
                <Moon className="h-4 w-4 text-indigo-600 sm:h-5 sm:w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-2 sm:px-4">
          <nav className="flex gap-0 sm:gap-1">
            <button
              onClick={() => setActiveTab("agendamentos")}
              className={`flex flex-1 items-center justify-center gap-1 px-2 py-3 text-xs font-medium transition-colors sm:flex-initial sm:gap-2 sm:px-6 sm:py-4 sm:text-sm ${
                activeTab === "agendamentos"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Agendamentos</span>
              <span className="sm:hidden">Agenda</span>
            </button>
            <button
              onClick={() => setActiveTab("caixa")}
              className={`flex flex-1 items-center justify-center gap-1 px-2 py-3 text-xs font-medium transition-colors sm:flex-initial sm:gap-2 sm:px-6 sm:py-4 sm:text-sm ${
                activeTab === "caixa"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Controle de Caixa</span>
              <span className="sm:hidden">Caixa</span>
            </button>
            <button
              onClick={() => setActiveTab("servicos")}
              className={`flex flex-1 items-center justify-center gap-1 px-2 py-3 text-xs font-medium transition-colors sm:flex-initial sm:gap-2 sm:px-6 sm:py-4 sm:text-sm ${
                activeTab === "servicos"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Gerenciar Serviços</span>
              <span className="sm:hidden">Serviços</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-3 py-4 sm:px-4 sm:py-8">
        {activeTab === "agendamentos" && <AgendamentoTab />}
        {activeTab === "caixa" && <CaixaTab />}
        {activeTab === "servicos" && <ServicosTab />}
      </main>

      {/* Footer */}
      <footer className="mt-8 border-t border-border bg-card py-4 sm:mt-16 sm:py-6">
        <div className="container mx-auto px-3 text-center text-xs text-muted-foreground sm:px-4 sm:text-sm">
          © 2025 Vera Depil. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"

type Servico = { servico: string; valor: number }
type Cliente = { cliente: string; servicos: Servico[]; meioPagamento: string }
type Agendamentos = Record<string, Record<string, Cliente[]>>

export function useAgendamentos() {
  const [agendamentos, setAgendamentos] = useState<Agendamentos>({})

  useEffect(() => {
    const stored = localStorage.getItem("agendamentos")
    if (stored) {
      setAgendamentos(JSON.parse(stored))
    }
  }, [])

  const salvar = (novos: Agendamentos) => {
    setAgendamentos(novos)
    localStorage.setItem("agendamentos", JSON.stringify(novos))
  }

  const adicionarAgendamento = (
    data: string,
    hora: string,
    cliente: string,
    servico: string,
    valor: number,
    meioPagamento: string,
  ) => {
    const novos = { ...agendamentos }
    if (!novos[data]) novos[data] = {}
    if (!novos[data][hora]) novos[data][hora] = []

    const clienteIndex = novos[data][hora].findIndex((c) => c.cliente === cliente)

    if (clienteIndex === -1) {
      if (novos[data][hora].length >= 2) {
        return { sucesso: false, mensagem: "Horário já tem 2 clientes!" }
      }
      novos[data][hora].push({ cliente, servicos: [{ servico, valor }], meioPagamento })
    } else {
      if (novos[data][hora][clienteIndex].servicos.length >= 3) {
        return { sucesso: false, mensagem: "Cliente já tem 3 serviços neste horário!" }
      }
      novos[data][hora][clienteIndex].servicos.push({ servico, valor })
    }

    salvar(novos)
    return { sucesso: true, mensagem: "" }
  }

  const removerAgendamento = (data: string, hora: string) => {
    const novos = { ...agendamentos }
    if (novos[data]?.[hora]) {
      delete novos[data][hora]
      salvar(novos)
    }
  }

  return { agendamentos, adicionarAgendamento, removerAgendamento }
}

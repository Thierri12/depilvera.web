"use client"

import { useState, useEffect } from "react"

type Categoria = "geral" | "pacotes" | "feminina" | "masculina"
type Servicos = Record<Categoria, [string, number][]>

const servicosPadrao: Servicos = {
  geral: [
    ["Unhas (Manicure e Pedicure)", 50.0],
    ["Manicure", 25.0],
    ["Pedicure", 28.0],
    ["SPA dos Pés e Mãos (sem cutilar)", 30.0],
    ["Desbastador de Calosidade", 25.0],
    ["Banho de Lua", 70.0],
    ["Esfoliação Corporal", 50.0],
    ["Limpeza de Pele Facial (com aplicação de ácidos)", 170.0],
    ["Limpeza de Pele Completa (s/ aplicação de ácidos)", 150.0],
    ["Clareamento de Virilha (sessão)", 35.0],
    ["Clareamento entre Coxas (sessão)", 30.0],
    ["Clareamento de Axilas (sessão)", 20.0],
    ["Escalda Pés com Flores e Sais (ofurô)", 35.0],
  ],
  pacotes: [
    ["Pacote 01", 100.0],
    ["Pacote 02", 170.0],
    ["Pacote 03", 200.0],
  ],
  feminina: [
    ["Sobrancelha de Pinça", 30.0],
    ["Sobrancelha de Cera", 28.0],
    ["Sobrancelha de Henna", 50.0],
    ["Buço", 15.0],
    ["Nariz", 15.0],
    ["Queixo", 15.0],
    ["Rosto Completo", 30.0],
    ["Axilas", 20.0],
    ["Braços Completos", 38.0],
    ["Virilha Contorno", 35.0],
    ["Virilha Cavada", 43.0],
    ["Virilha Total", 48.0],
    ["Perna Interna", 60.0],
    ["Meia Perna", 40.0],
    ["Coxa", 48.0],
    ["Nádegas", 48.0],
  ],
  masculina: [
    ["Sobrancelha", 30.0],
    ["Bigode", 15.0],
    ["Nariz", 15.0],
    ["Barba Completa", 38.0],
    ["Meia Barba", 28.0],
    ["Axilas", 20.0],
    ["Braços completos", 45.0],
    ["Peito", 48.0],
    ["Peito e Barriga", 85.0],
    ["Virilha", 55.0],
    ["Pernas Inteiras", 70.0],
    ["Meia Perna", 45.0],
  ],
}

export function useServicos() {
  const [servicos, setServicos] = useState<Servicos>(servicosPadrao)

  useEffect(() => {
    const stored = localStorage.getItem("servicos")
    if (stored) {
      setServicos(JSON.parse(stored))
    } else {
      localStorage.setItem("servicos", JSON.stringify(servicosPadrao))
    }
  }, [])

  const salvar = (novosServicos: Servicos) => {
    setServicos(novosServicos)
    localStorage.setItem("servicos", JSON.stringify(novosServicos))
  }

  const adicionarServico = (cat: Categoria, nome: string, preco: number) => {
    if (servicos[cat].some(([n]) => n === nome)) {
      return { sucesso: false, mensagem: "Serviço já existe na categoria!" }
    }
    const novos = { ...servicos, [cat]: [...servicos[cat], [nome, preco] as [string, number]] }
    salvar(novos)
    return { sucesso: true, mensagem: "" }
  }

  const editarServico = (cat: Categoria, index: number, nome: string, preco: number) => {
    const novos = { ...servicos }
    novos[cat][index] = [nome, preco]
    salvar(novos)
  }

  const removerServico = (cat: Categoria, index: number) => {
    const novos = { ...servicos }
    novos[cat].splice(index, 1)
    salvar(novos)
  }

  const getPrecoServico = (nome: string): number => {
    for (const cat in servicos) {
      const found = servicos[cat as Categoria].find(([n]) => n === nome)
      if (found) return found[1]
    }
    return 0
  }

  return { servicos, adicionarServico, editarServico, removerServico, getPrecoServico }
}

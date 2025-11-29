"use client"

import { useState, useEffect } from "react"

type Caixa = Record<string, number>

export function useCaixa() {
  const [caixa, setCaixa] = useState<Caixa>({})

  useEffect(() => {
    const stored = localStorage.getItem("caixa")
    if (stored) {
      setCaixa(JSON.parse(stored))
    }
  }, [])

  const salvar = (novo: Caixa) => {
    setCaixa(novo)
    localStorage.setItem("caixa", JSON.stringify(novo))
  }

  const adicionarGanho = (data: string, valor: number) => {
    const novo = { ...caixa }
    if (!novo[data]) novo[data] = 0
    novo[data] += valor
    salvar(novo)
  }

  const editarGanho = (data: string, valor: number) => {
    const novo = { ...caixa, [data]: valor }
    salvar(novo)
  }

  const removerGanho = (data: string) => {
    const novo = { ...caixa }
    delete novo[data]
    salvar(novo)
  }

  const getTotalMes = (mesAno: string): number => {
    return Object.keys(caixa)
      .filter((data) => data.startsWith(mesAno))
      .reduce((total, data) => total + caixa[data], 0)
  }

  return { caixa, adicionarGanho, editarGanho, removerGanho, getTotalMes }
}

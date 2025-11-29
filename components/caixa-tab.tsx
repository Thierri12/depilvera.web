"use client"

import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCaixa } from "@/hooks/use-caixa"
import { useDialog } from "@/hooks/use-dialog"
import CustomDialog from "@/components/custom-dialog"

export default function CaixaTab() {
  const [dataAdd, setDataAdd] = useState("")
  const [ganho, setGanho] = useState("")
  const [mesAno, setMesAno] = useState("")

  const { caixa, adicionarGanho, editarGanho, removerGanho, getTotalMes } = useCaixa()
  const { dialogState, showAlert, showConfirm, showPrompt, closeDialog } = useDialog()

  useEffect(() => {
    const hoje = new Date().toISOString().split("T")[0]
    setDataAdd(hoje)
    const mes = new Date().toISOString().slice(0, 7)
    setMesAno(mes)
  }, [])

  const handleAdicionar = () => {
    if (!dataAdd || !ganho || isNaN(Number.parseFloat(ganho)) || Number.parseFloat(ganho) <= 0) {
      showAlert("Selecione uma data e insira um valor válido!")
      return
    }
    adicionarGanho(dataAdd, Number.parseFloat(ganho))
    setGanho("")
  }

  const totalMes = getTotalMes(mesAno)
  const ganhosMes = Object.keys(caixa)
    .filter((data) => data.startsWith(mesAno))
    .sort()

  return (
    <div className="space-y-4 sm:space-y-6">
      <CustomDialog
        isOpen={dialogState.isOpen}
        onClose={closeDialog}
        onConfirm={dialogState.onConfirm}
        title={dialogState.title}
        message={dialogState.message}
        type={dialogState.type}
        defaultValue={dialogState.defaultValue}
        onPromptSubmit={dialogState.onPromptSubmit}
      />

      <Card className="border border-border bg-card p-4 sm:p-6">
        <div className="mb-4 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground sm:text-xl">Controle de Caixa</h2>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Registre os ganhos diários</p>
          </div>
          <div className="rounded-lg bg-primary/10 p-3 text-center sm:text-right">
            <p className="text-xs text-muted-foreground sm:text-sm">Total do Mês</p>
            <p className="text-2xl font-bold text-primary sm:text-3xl">R$ {totalMes.toFixed(2)}</p>
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <label className="mb-2 block text-xs font-medium text-foreground sm:text-sm">Visualizar Mês</label>
          <input
            type="month"
            value={mesAno}
            onChange={(e) => setMesAno(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground sm:max-w-xs"
          />
        </div>

        <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-xs font-medium text-foreground sm:text-sm">Data</label>
            <input
              type="date"
              value={dataAdd}
              onChange={(e) => setDataAdd(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-foreground sm:text-sm">Valor (R$)</label>
            <input
              type="number"
              value={ganho}
              onChange={(e) => setGanho(e.target.value)}
              placeholder="0.00"
              step="0.01"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex items-end">
            <Button onClick={handleAdicionar} className="w-full">
              <Plus className="mr-2 h-4 w-4 text-primary-foreground" />
              <span className="text-sm">Adicionar Ganho</span>
            </Button>
          </div>
        </div>
      </Card>

      <Card className="border border-border bg-card p-4 sm:p-6">
        <h3 className="mb-3 text-base font-semibold text-foreground sm:mb-4 sm:text-lg">Histórico Mensal</h3>
        <div className="space-y-2">
          {ganhosMes.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Nenhum registro para este mês</p>
          ) : (
            <>
              {ganhosMes.map((data) => (
                <div
                  key={data}
                  className="flex flex-col gap-2 rounded-lg border border-border bg-secondary/50 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground sm:text-base">{data}</p>
                    <p className="text-xs text-muted-foreground sm:text-sm">
                      {new Date(data + "T00:00:00").toLocaleDateString("pt-BR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <p className="text-lg font-bold text-primary">R$ {caixa[data].toFixed(2)}</p>
                    <div className="flex gap-1 sm:gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          showPrompt(
                            `Novo valor para ${data}:`,
                            (novoValor) => {
                              if (!isNaN(Number.parseFloat(novoValor)) && Number.parseFloat(novoValor) >= 0) {
                                editarGanho(data, Number.parseFloat(novoValor))
                              }
                            },
                            caixa[data].toString(),
                            "Editar Ganho",
                          )
                        }}
                        className="h-8 w-8 p-0"
                      >
                        <Edit2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          showConfirm(`Remover ganho do dia ${data}?`, () => {
                            removerGanho(data)
                          })
                        }}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-4 rounded-lg bg-primary p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-primary-foreground sm:text-base">Total do Mês</p>
                  <p className="text-xl font-bold text-primary-foreground sm:text-2xl">R$ {totalMes.toFixed(2)}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}

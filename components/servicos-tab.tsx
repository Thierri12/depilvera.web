"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useServicos } from "@/hooks/use-servicos"
import { useDialog } from "@/hooks/use-dialog"
import CustomDialog from "@/components/custom-dialog"

export default function ServicosTab() {
  const [categoria, setCategoria] = useState<"geral" | "pacotes" | "feminina" | "masculina">("geral")
  const [nomeServico, setNomeServico] = useState("")
  const [precoServico, setPrecoServico] = useState("")

  const { servicos, adicionarServico, editarServico, removerServico } = useServicos()
  const { dialogState, showAlert, showConfirm, showPrompt, closeDialog } = useDialog()

  const handleAdicionar = () => {
    if (!nomeServico || !precoServico || isNaN(Number.parseFloat(precoServico))) {
      showAlert("Preencha nome e preço válido!")
      return
    }

    const resultado = adicionarServico(categoria, nomeServico, Number.parseFloat(precoServico))
    if (resultado.sucesso) {
      setNomeServico("")
      setPrecoServico("")
    } else {
      showAlert(resultado.mensagem)
    }
  }

  const categorias = {
    geral: "Serviços Gerais",
    pacotes: "Pacotes",
    feminina: "Depilação Feminina",
    masculina: "Depilação Masculina",
  }

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
        <h2 className="mb-3 text-lg font-semibold text-foreground sm:mb-4 sm:text-xl">Adicionar Novo Serviço</h2>

        <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-xs font-medium text-foreground sm:text-sm">Categoria</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value as any)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            >
              <option value="geral">Geral</option>
              <option value="pacotes">Pacotes</option>
              <option value="feminina">Depilação Feminina</option>
              <option value="masculina">Depilação Masculina</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-foreground sm:text-sm">Nome do Serviço</label>
            <input
              type="text"
              value={nomeServico}
              onChange={(e) => setNomeServico(e.target.value)}
              placeholder="Ex: Virilha"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-foreground sm:text-sm">Preço (R$)</label>
            <input
              type="number"
              value={precoServico}
              onChange={(e) => setPrecoServico(e.target.value)}
              placeholder="0.00"
              step="0.01"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <Button onClick={handleAdicionar} className="mt-3 w-full sm:mt-4 sm:w-auto">
          <Plus className="mr-2 h-4 w-4 text-primary-foreground" />
          <span className="text-sm">Adicionar Serviço</span>
        </Button>
      </Card>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {Object.entries(categorias).map(([cat, titulo]) => (
          <Card key={cat} className="border border-border bg-card p-4 sm:p-6">
            <h3 className="mb-3 text-base font-semibold text-foreground sm:mb-4 sm:text-lg">{titulo}</h3>
            <div className="space-y-2">
              {servicos[cat as keyof typeof servicos]?.length === 0 ? (
                <p className="py-4 text-center text-sm text-muted-foreground">Nenhum serviço cadastrado</p>
              ) : (
                servicos[cat as keyof typeof servicos]?.map(([nome, preco], index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground sm:text-base">{nome}</p>
                      <p className="text-xs font-semibold text-primary sm:text-sm">R$ {preco.toFixed(2)}</p>
                    </div>
                    <div className="flex shrink-0 gap-1 sm:gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          showPrompt(
                            "Novo nome:",
                            (novoNome) => {
                              if (!novoNome) return
                              showPrompt(
                                "Novo preço:",
                                (novoPreco) => {
                                  if (!novoPreco || isNaN(Number.parseFloat(novoPreco))) return
                                  editarServico(cat as any, index, novoNome, Number.parseFloat(novoPreco))
                                },
                                preco.toString(),
                                "Editar Preço",
                              )
                            },
                            nome,
                            "Editar Serviço",
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
                          showConfirm("Remover este serviço?", () => {
                            removerServico(cat as any, index)
                          })
                        }}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

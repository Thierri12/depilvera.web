"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useServicos } from "@/hooks/use-servicos"
import { useAgendamentos } from "@/hooks/use-agendamentos"
import { useDialog } from "@/hooks/use-dialog"
import CustomDialog from "@/components/custom-dialog"

const horariosFixos = []
for (let hora = 9; hora <= 21; hora++) {
  for (let min = 0; min < 60; min += 30) {
    horariosFixos.push(`${hora.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`)
  }
}

type FiltroAgenda = "depilacao" | "manicure" | "outros"

export default function AgendamentoTab() {
  const [data, setData] = useState("")
  const [hora, setHora] = useState("")
  const [cliente, setCliente] = useState("")
  const [servico, setServico] = useState("")
  const [meioPagamento, setMeioPagamento] = useState("")
  const [filtroAgenda, setFiltroAgenda] = useState<FiltroAgenda>("depilacao")

  const { servicos, getPrecoServico } = useServicos()
  const { agendamentos, adicionarAgendamento, removerAgendamento } = useAgendamentos()
  const { dialogState, showAlert, showConfirm, closeDialog } = useDialog()

  useEffect(() => {
    const hoje = new Date().toISOString().split("T")[0]
    setData(hoje)
  }, [])

  const isServicoDepilacao = (nomeServico: string): boolean => {
    const depilacaoFeminina = servicos.feminina.map(([nome]) => nome)
    const depilacaoMasculina = servicos.masculina.map(([nome]) => nome)
    return depilacaoFeminina.includes(nomeServico) || depilacaoMasculina.includes(nomeServico)
  }

  const isServicoManicure = (nomeServico: string): boolean => {
    const servicosManicure = [
      "Unhas (Manicure e Pedicure)",
      "Manicure",
      "Pedicure",
      "SPA dos Pés e Mãos (sem cutilar)",
      "Desbastador de Calosidade",
    ]
    return servicosManicure.includes(nomeServico)
  }

  const getCategoriaServico = (nomeServico: string): FiltroAgenda => {
    if (isServicoDepilacao(nomeServico)) return "depilacao"
    if (isServicoManicure(nomeServico)) return "manicure"
    return "outros"
  }

  const deveExibirAgendamento = (servicosCliente: { servico: string; valor: number }[]): boolean => {
    const categoriaAgendamento = getCategoriaServico(servicosCliente[0]?.servico)
    return categoriaAgendamento === filtroAgenda
  }

  const handleAdicionar = () => {
    if (!data || !hora || !cliente || !servico || !meioPagamento) {
      showAlert("Preencha todos os campos!")
      return
    }

    const categoriaServico = getCategoriaServico(servico)
    if (categoriaServico !== filtroAgenda) {
      showAlert(
        `Este serviço pertence à categoria "${categoriaServico}". Selecione a agenda correta antes de adicionar.`,
      )
      return
    }

    const valor = getPrecoServico(servico)
    const resultado = adicionarAgendamento(data, hora, cliente, servico, valor, meioPagamento)

    if (resultado.sucesso) {
      setHora("")
      setCliente("")
      setServico("")
      setMeioPagamento("")
    } else {
      showAlert(resultado.mensagem)
    }
  }

  const agsDia = agendamentos[data] || {}
  const horariosDisponiveis = horariosFixos.filter((h) => {
    const ags = agsDia[h] || []
    return ags.length < 2
  })

  return (
    <div className="space-y-4 sm:space-y-6">
      <CustomDialog
        isOpen={dialogState.isOpen}
        onClose={closeDialog}
        onConfirm={dialogState.onConfirm}
        title={dialogState.title}
        message={dialogState.message}
        type={dialogState.type}
      />

      <h2 className="text-lg font-semibold text-foreground sm:text-xl">Novo Agendamento</h2>

      <Card className="border border-border bg-card p-4 sm:p-6">
        <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="mb-2 block text-xs font-medium text-foreground sm:text-sm">Data</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-foreground sm:text-sm">Horário</label>
            <select
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            >
              <option value="">Selecione</option>
              {horariosDisponiveis.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-foreground sm:text-sm">Cliente</label>
            <input
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              placeholder="Nome do cliente"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-foreground sm:text-sm">Serviço</label>
            <select
              value={servico}
              onChange={(e) => setServico(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            >
              <option value="">Selecione</option>
              {Object.entries(servicos).map(([cat, items]) => (
                <optgroup
                  key={cat}
                  label={
                    cat === "geral"
                      ? "Geral"
                      : cat === "pacotes"
                        ? "Pacotes"
                        : cat === "feminina"
                          ? "Feminina"
                          : "Masculina"
                  }
                >
                  {items.map(([nome]) => (
                    <option key={nome} value={nome}>
                      {nome}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-foreground sm:text-sm">Pagamento</label>
            <select
              value={meioPagamento}
              onChange={(e) => setMeioPagamento(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            >
              <option value="">Selecione</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de Débito">Cartão de Débito</option>
              <option value="Cartão de Crédito">Cartão de Crédito</option>
              <option value="PIX">PIX</option>
            </select>
          </div>

          <div className="flex items-end">
            <Button onClick={handleAdicionar} className="w-full">
              <Plus className="mr-2 h-4 w-4 text-primary-foreground" />
              <span className="text-sm">Adicionar</span>
            </Button>
          </div>
        </div>
      </Card>

      <Card className="border border-border bg-card p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-foreground sm:text-xl">Agendamentos do Dia</h2>
          <div className="flex gap-2">
            <Button
              variant={filtroAgenda === "depilacao" ? "default" : "outline"}
              size="sm"
              onClick={() => setFiltroAgenda("depilacao")}
              className="text-xs sm:text-sm"
            >
              Depilação
            </Button>
            <Button
              variant={filtroAgenda === "manicure" ? "default" : "outline"}
              size="sm"
              onClick={() => setFiltroAgenda("manicure")}
              className="text-xs sm:text-sm"
            >
              Manicure/Pedicure
            </Button>
            <Button
              variant={filtroAgenda === "outros" ? "default" : "outline"}
              size="sm"
              onClick={() => setFiltroAgenda("outros")}
              className="text-xs sm:text-sm"
            >
              Outros
            </Button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Horário</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Cliente 1</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Serviços 1</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Total 1</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Pagamento 1</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Cliente 2</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Serviços 2</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Total 2</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Pagamento 2</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {horariosFixos.map((h) => {
                const ags = agsDia[h] || []
                const cliente1 = ags[0] && deveExibirAgendamento(ags[0].servicos) ? ags[0] : null
                const cliente2 = ags[1] && deveExibirAgendamento(ags[1].servicos) ? ags[1] : null

                if (!cliente1 && !cliente2 && ags.length > 0) return null

                return (
                  <tr key={h} className="border-b border-border hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium text-foreground">{h}</td>
                    <td className="px-4 py-3 text-foreground">{cliente1?.cliente || "Livre"}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {cliente1 ? cliente1.servicos.map((s) => `${s.servico}`).join(", ") : "-"}
                    </td>
                    <td className="px-4 py-3 font-medium text-primary">
                      {cliente1 ? `R$ ${cliente1.servicos.reduce((sum, s) => sum + s.valor, 0).toFixed(2)}` : "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{cliente1?.meioPagamento || "-"}</td>
                    <td className="px-4 py-3 text-foreground">{cliente2?.cliente || "Livre"}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {cliente2 ? cliente2.servicos.map((s) => `${s.servico}`).join(", ") : "-"}
                    </td>
                    <td className="px-4 py-3 font-medium text-primary">
                      {cliente2 ? `R$ ${cliente2.servicos.reduce((sum, s) => sum + s.valor, 0).toFixed(2)}` : "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{cliente2?.meioPagamento || "-"}</td>
                    <td className="px-4 py-3">
                      {ags.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            showConfirm("Remover todos os agendamentos deste horário?", () => {
                              removerAgendamento(data, h)
                            })
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                        </Button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="space-y-3 lg:hidden">
          {horariosFixos.map((h) => {
            const ags = agsDia[h] || []
            const agsFiltrados = ags.filter((ag) => deveExibirAgendamento(ag.servicos))
            if (agsFiltrados.length === 0) return null

            return (
              <div key={h} className="rounded-lg border border-border bg-secondary/30 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-primary">{h}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      showConfirm("Remover todos os agendamentos deste horário?", () => {
                        removerAgendamento(data, h)
                      })
                    }}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </Button>
                </div>

                {agsFiltrados.map((ag, idx) => (
                  <div key={idx} className="mb-2 rounded border border-border bg-background p-2 last:mb-0">
                    <div className="mb-1 flex items-start justify-between">
                      <p className="text-sm font-semibold text-foreground">{ag.cliente}</p>
                      <span className="text-xs text-muted-foreground">Cliente {ags.indexOf(ag) + 1}</span>
                    </div>
                    <p className="mb-1 text-xs text-muted-foreground">{ag.servicos.map((s) => s.servico).join(", ")}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{ag.meioPagamento}</span>
                      <span className="text-sm font-bold text-primary">
                        R$ {ag.servicos.reduce((sum, s) => sum + s.valor, 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )
          })}

          {horariosFixos.every((h) => {
            const ags = agsDia[h] || []
            const agsFiltrados = ags.filter((ag) => deveExibirAgendamento(ag.servicos))
            return agsFiltrados.length === 0
          }) && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              {`Nenhum agendamento de ${
                filtroAgenda === "depilacao"
                  ? "depilação"
                  : filtroAgenda === "manicure"
                    ? "manicure/pedicure"
                    : "outros serviços"
              } para esta data`}
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}

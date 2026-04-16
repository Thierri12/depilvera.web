<div align="center">

# 💜 Depilvera Web

**Site institucional da Depilvera — agendamentos, serviços e presença digital.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

</div>


## 📋 Sobre o Projeto

A **Depilvera Web** é um sistema para funcionários, desenvolvido para apresentar os serviços, facilitar o agendamento de clientes e controle financeiro. Construído com Next.js e componentes modernos, oferece uma experiência fluida e responsiva em qualquer dispositivo.


## ✨ Funcionalidades

- **Página de serviços** com apresentação visual dos tratamentos oferecidos
- **Agendamento online** integrado à interface do site
- **Design responsivo** adaptado para mobile, tablet e desktop
- **Tema e identidade visual** consistentes com a marca Depilvera
- **Componentes acessíveis** baseados em Radix UI e shadcn/ui
- **Analytics integrado** via Vercel para monitoramento de acessos


## 🚀 Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- [pnpm](https://pnpm.io/) (recomendado) ou npm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Thierri12/depilvera.web.git
cd depilvera.web

# Instale as dependências
pnpm install
```

### Desenvolvimento

```bash
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build para Produção

```bash
pnpm build
pnpm start
```


## 📁 Estrutura do Projeto

```
depilvera-web/
├── app/              # Rotas e páginas (Next.js App Router)
├── components/       # Componentes reutilizáveis
│   └── ui/           # Componentes shadcn/ui
├── hooks/            # Custom hooks React
├── styles/           # Estilos globais
├── public/           # Imagens e arquivos estáticos
├── components.json   # Configuração shadcn/ui
├── tsconfig.json     # Configuração TypeScript
└── package.json      # Dependências e scripts
```


## 🌐 Tecnologias

| Tecnologia | Uso |
|---|---|
| **Next.js 16** | Framework principal com App Router |
| **React 19** | Biblioteca de interface |
| **TypeScript** | Tipagem estática |
| **Tailwind CSS 4** | Estilização utilitária |
| **shadcn/ui** | Componentes de interface acessíveis |


## 📜 Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `pnpm dev` | Inicia o servidor de desenvolvimento |
| `pnpm build` | Gera o build de produção |
| `pnpm start` | Inicia o servidor de produção |
| `pnpm lint` | Verifica problemas de código com ESLint |


## 🌍 Deploy

Projeto configurado para deploy na **Vercel**. Cada push na branch principal dispara um novo deploy automaticamente.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Thierri12/depilvera.web)


<div align="center">
  Feito com 💜 para a <strong>Depilvera</strong>
</div>

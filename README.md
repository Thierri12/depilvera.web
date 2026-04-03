<div align="center">

# 💜 Depilvera Web

**Site institucional da Depilvera — estética profissional, experiência suave.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-new--york-000?style=flat-square)](https://ui.shadcn.com/)

</div>

---

## 📋 Sobre o Projeto

Site oficial da **Depilvera**, desenvolvido com tecnologias modernas para oferecer uma experiência de navegação elegante e responsiva. A aplicação utiliza o ecossistema Next.js com componentes acessíveis do shadcn/ui e estilização com Tailwind CSS.

---

## 🚀 Tecnologias

| Tecnologia | Versão | Finalidade |
|---|---|---|
| **Next.js** | 16 | Framework principal (App Router) |
| **React** | 19 | Biblioteca de UI |
| **TypeScript** | 5 | Tipagem estática |
| **Tailwind CSS** | 4 | Estilização utilitária |
| **shadcn/ui** | New York | Componentes de interface |
| **Radix UI** | latest | Primitivos de UI acessíveis |
| **Lucide React** | 0.454 | Ícones |
| **React Hook Form** | latest | Gerenciamento de formulários |
| **Zod** | 3.25 | Validação de schemas |
| **Recharts** | latest | Gráficos e visualizações |
| **Vercel Analytics** | latest | Monitoramento de performance |

---

## 📁 Estrutura do Projeto

```
depilvera-web/
├── app/                    # App Router do Next.js (rotas e páginas)
├── components/             # Componentes reutilizáveis
│   └── ui/                 # Componentes shadcn/ui
├── hooks/                  # Custom hooks React
├── styles/                 # Estilos globais
├── public/                 # Arquivos estáticos (imagens, fontes)
├── components.json         # Configuração shadcn/ui
├── next-env.d.ts           # Tipos do Next.js
├── tsconfig.json           # Configuração TypeScript
├── postcss.config.mjs      # Configuração PostCSS
├── package.json            # Dependências e scripts
└── server.js               # Servidor Express auxiliar
```

---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- [npm](https://www.npmjs.com/) ou [pnpm](https://pnpm.io/)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Thierri12/depilvera.web.git
cd depilvera.web

# Instale as dependências
npm install
# ou
pnpm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build para Produção

```bash
npm run build
npm start
```

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm start` | Inicia o servidor de produção |
| `npm run lint` | Verifica problemas de código com ESLint |

---

## 🌐 Deploy

Este projeto está configurado para deploy na **Vercel**. Basta conectar o repositório GitHub à Vercel e o deploy ocorre automaticamente a cada push na branch principal.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Thierri12/depilvera.web)

---

## 📄 Licença

Distribuído sob a licença **ISC**. Veja o arquivo `LICENSE` para mais detalhes.

---

<div align="center">
  Feito com 💜 para a <strong>Depilvera</strong>
</div>

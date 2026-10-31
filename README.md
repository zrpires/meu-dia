# Meu Dia — Personal OS

Aplicação pessoal em React + TypeScript para organizar rotina, calendário, foco, vestibular UEM, biblioteca, academia, esportes, alimentação, sono, projetos, carreira, finanças, metas, XP/streaks, dashboard anual e revisão semanal.

## Rodar

```bash
npm install
npm run dev
```

## Recursos externos

- Livros: Open Library Search/Covers, com fallback de busca para Google Books.
- Exercícios: catálogo público da API wger.
- Nuvem: Supabase opcional. Sem configuração, o app continua funcional em `localStorage`.
- PWA: `vite-plugin-pwa` configurado para build e instalação quando publicado em HTTPS.

## Supabase

1. Crie um projeto no Supabase.
2. Rode `supabase/schema.sql` no SQL Editor.
3. Copie `.env.example` para `.env.local`.
4. Preencha `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY`.
5. Reinicie `npm run dev`.

A tabela `app_state` usa RLS e cada usuário só lê/escreve a própria linha.

## O que a V3 inclui

- Dashboard diário, agenda e hábitos.
- Calendário recorrente e exportação `.ics`.
- Pomodoro/foco com histórico.
- Estudos por matéria e horas semanais.
- Módulo UEM: conteúdos, questões, acertos, redações e simulados.
- Biblioteca com busca externa e capas reais.
- Academia com fichas, busca externa de exercícios, imagens e histórico de cargas.
- Corrida, bike, futebol e distância acumulada.
- Nutrição, água, refeições, proteína e calorias opcionais.
- Sono, duração e qualidade.
- Projetos de portfólio, tarefas, tecnologias e horas.
- Pipeline de candidaturas e entrevistas.
- Finanças pessoais.
- Metas e hábitos customizáveis.
- XP, níveis e streaks.
- Dashboard anual estilo “Wrapped”.
- Revisão semanal.
- Backup/importação JSON.
- PWA e sincronização opcional via Supabase.

## Build

```bash
npm run build
npm run preview
```

## Privacidade

Não comite `.env.local`. Dados locais ficam no navegador; o envio ao Supabase é manual pela tela Configurações.

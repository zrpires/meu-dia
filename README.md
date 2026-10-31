# Meu Dia — Personal OS

Aplicação pessoal para organizar rotina, estudos, leitura, treinos, metas, hábitos e agenda em um único lugar.

## Recursos da V2

- Dashboard diário com progresso e hábitos
- Calendário mensal com eventos e recorrência
- Biblioteca de livros com páginas lidas e histórico
- Estudos por disciplina, meta semanal e sessões
- Fichas de treino, exercícios, cargas e histórico
- Metas e hábitos com acompanhamento semanal
- Estatísticas dos últimos dias
- Notas diárias
- Backup e restauração em JSON
- Exportação do calendário em `.ics`
- Layout responsivo para desktop e celular
- Persistência local via `localStorage`

## Rodar localmente

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente `http://localhost:5173`.

## Atualizar uma cópia já clonada

```bash
git pull origin main
npm install
npm run dev
```

## Build de produção

```bash
npm run build
npm run preview
```

## Dados

A V2 usa novas chaves de `localStorage` iniciadas por `meu-dia-v2-`, portanto os dados antigos da V1 não são apagados automaticamente. Em **Configurações** você pode exportar um backup completo da V2.

## Próximos passos sugeridos

- Supabase para autenticação e sincronização entre dispositivos
- PWA instalável com notificações
- Pomodoro integrado às sessões de estudo
- Sincronização bidirecional com Google Calendar por backend seguro
- Nutrição, hidratação e planejamento de refeições
- Projetos, carreira e candidaturas

## Stack

React · TypeScript · Vite · Lucide React

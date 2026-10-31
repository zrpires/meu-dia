import { Book, CalendarEvent, Goal, Habit, StudySubject, WorkoutPlan } from './types';

export const isoToday = () => {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60_000).toISOString().slice(0, 10);
};

export const seedEvents = (): CalendarEvent[] => {
  const date = isoToday();
  return [
    { id: 'wake', title: 'Acordar e higiene', date, start: '07:00', end: '07:30', category: 'personal', repeat: 'daily' },
    { id: 'breakfast', title: 'Café da manhã', date, start: '07:30', end: '08:00', category: 'meal', repeat: 'daily' },
    { id: 'study-1', title: 'Estudo — bloco 1', date, start: '08:00', end: '11:00', category: 'study', repeat: 'daily' },
    { id: 'gym', title: 'Academia', date, start: '11:00', end: '12:00', category: 'workout', repeat: 'daily' },
    { id: 'lunch', title: 'Almoço', date, start: '12:00', end: '12:30', category: 'meal', repeat: 'daily' },
    { id: 'study-2', title: 'Estudo — bloco 2', date, start: '12:30', end: '15:30', category: 'study', repeat: 'daily' },
    { id: 'cardio', title: 'Bike / corrida / futebol', date, start: '15:30', end: '16:00', category: 'workout', repeat: 'daily' },
    { id: 'snack', title: 'Lanche', date, start: '16:00', end: '16:30', category: 'meal', repeat: 'daily' },
    { id: 'study-3', title: 'Estudo — bloco 3', date, start: '16:30', end: '18:30', category: 'study', repeat: 'daily' },
    { id: 'flex', title: 'Trabalho / projetos / tempo livre', date, start: '18:30', end: '20:30', category: 'work', repeat: 'daily' },
    { id: 'dinner', title: 'Jantar', date, start: '20:30', end: '21:00', category: 'meal', repeat: 'daily' },
    { id: 'reading', title: 'Leitura', date, start: '21:00', end: '22:00', category: 'reading', repeat: 'daily' },
    { id: 'wind-down', title: 'Desacelerar e planejar amanhã', date, start: '22:00', end: '23:00', category: 'personal', repeat: 'daily' },
  ];
};

export const seedBooks: Book[] = [];

export const seedWorkoutPlans: WorkoutPlan[] = [
  {
    id: 'treino-a',
    name: 'Treino A',
    days: ['Seg', 'Qui'],
    exercises: [
      { id: 'supino', name: 'Supino reto', sets: 4, reps: '8–12', load: '', restSeconds: 90 },
      { id: 'remada', name: 'Remada', sets: 4, reps: '8–12', load: '', restSeconds: 90 },
    ],
  },
];

export const seedSubjects: StudySubject[] = [
  { id: 'vestibular', name: 'Vestibular / UEM', weeklyGoalMinutes: 2400 },
  { id: 'programacao', name: 'Programação', weeklyGoalMinutes: 600 },
];

export const seedHabits: Habit[] = [
  { id: 'sleep', name: 'Dormir 8 horas', targetPerWeek: 7, category: 'sleep' },
  { id: 'meals', name: 'Fazer 4 refeições', targetPerWeek: 7, category: 'meal' },
  { id: 'reading-habit', name: 'Ler 1 hora', targetPerWeek: 7, category: 'reading' },
  { id: 'exercise-habit', name: 'Treinar / cardio', targetPerWeek: 6, category: 'workout' },
];

export const seedGoals: Goal[] = [
  { id: 'study-week', title: 'Estudar 40 horas por semana', current: 0, target: 40, unit: 'h' },
  { id: 'books-year', title: 'Livros concluídos', current: 0, target: 12, unit: 'livros' },
];

export type Page = 'today' | 'calendar' | 'library' | 'training' | 'goals' | 'analytics';

export type Category = 'routine' | 'meal' | 'study' | 'work' | 'training' | 'cardio' | 'reading' | 'sleep' | 'personal';

export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  start: string;
  end: string;
  category: Category;
  done: boolean;
  notes?: string;
};

export type BookStatus = 'planned' | 'reading' | 'finished';

export type Book = {
  id: string;
  title: string;
  author: string;
  totalPages: number;
  currentPage: number;
  status: BookStatus;
  minutesRead: number;
  sessions: number;
};

export type Exercise = {
  id: string;
  name: string;
  muscle: string;
  sets: number;
  reps: number;
  load: number;
  done: boolean;
};

export type Workout = {
  id: string;
  name: string;
  date: string;
  duration: number;
  done: boolean;
  exercises: Exercise[];
};

export type Goal = {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: string;
  deadline: string;
};

export type Habit = {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
};

export type AppData = {
  events: CalendarEvent[];
  books: Book[];
  workouts: Workout[];
  goals: Goal[];
  habits: Habit[];
  dailyNotes: Record<string, string>;
};

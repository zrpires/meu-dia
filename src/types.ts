export type View = 'today' | 'calendar' | 'study' | 'library' | 'workouts' | 'goals' | 'stats' | 'settings';

export type EventCategory = 'study' | 'workout' | 'reading' | 'meal' | 'work' | 'personal' | 'sleep';
export type RepeatRule = 'none' | 'daily' | 'weekdays' | 'weekly';

export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  start: string;
  end: string;
  category: EventCategory;
  repeat: RepeatRule;
  notes?: string;
};

export type BookStatus = 'quero-ler' | 'lendo' | 'concluido';
export type Book = {
  id: string;
  title: string;
  author: string;
  totalPages: number;
  currentPage: number;
  status: BookStatus;
  targetDate?: string;
  rating?: number;
  notes?: string;
};

export type ReadingLog = {
  id: string;
  bookId: string;
  date: string;
  pages: number;
  minutes: number;
};

export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: string;
  load: string;
  restSeconds: number;
};

export type WorkoutPlan = {
  id: string;
  name: string;
  days: string[];
  exercises: Exercise[];
};

export type WorkoutLog = {
  id: string;
  workoutId: string;
  date: string;
  duration: number;
  notes?: string;
};

export type StudySubject = {
  id: string;
  name: string;
  weeklyGoalMinutes: number;
};

export type StudyLog = {
  id: string;
  subjectId: string;
  date: string;
  minutes: number;
  topic: string;
  notes?: string;
};

export type Habit = {
  id: string;
  name: string;
  targetPerWeek: number;
  category: EventCategory;
};

export type Goal = {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: string;
  deadline?: string;
};

export type AppBackup = {
  version: 2;
  exportedAt: string;
  events: CalendarEvent[];
  eventCompletions: Record<string, boolean>;
  books: Book[];
  readingLogs: ReadingLog[];
  workoutPlans: WorkoutPlan[];
  workoutLogs: WorkoutLog[];
  subjects: StudySubject[];
  studyLogs: StudyLog[];
  habits: Habit[];
  habitCompletions: Record<string, boolean>;
  goals: Goal[];
  dailyNotes: Record<string, string>;
};

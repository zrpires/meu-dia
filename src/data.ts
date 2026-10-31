import type {AppState,CalendarEvent,UemTopic,WorkoutPlan} from './types';

export const DAY=86400000;
export const isoDate=(d=new Date())=>{const x=new Date(d.getTime()-d.getTimezoneOffset()*60000);return x.toISOString().slice(0,10)};
export const isoToday=()=>isoDate(new Date());
export const localDate=(s:string)=>new Date(`${s}T12:00:00`);
export const addDays=(s:string,n:number)=>isoDate(new Date(localDate(s).getTime()+n*DAY));
export const uid=(prefix='id')=>`${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;

const today=isoToday();
const schedule:CalendarEvent[]=[
{id:'wake',title:'Acordar e higiene',date:today,start:'07:00',end:'07:30',category:'personal',repeat:'daily'},
{id:'breakfast',title:'Café da manhã',date:today,start:'07:30',end:'08:00',category:'meal',repeat:'daily'},
{id:'study1',title:'Estudo — bloco 1',date:today,start:'08:00',end:'11:00',category:'study',repeat:'weekdays',notes:'3h de foco profundo'},
{id:'gym',title:'Academia',date:today,start:'11:00',end:'12:00',category:'workout',repeat:'weekdays'},
{id:'lunch',title:'Almoço',date:today,start:'12:00',end:'12:30',category:'meal',repeat:'daily'},
{id:'study2',title:'Estudo — bloco 2',date:today,start:'12:30',end:'15:30',category:'study',repeat:'weekdays'},
{id:'cardio',title:'Corrida / Bike',date:today,start:'15:30',end:'16:00',category:'sport',repeat:'weekdays'},
{id:'snack',title:'Lanche',date:today,start:'16:00',end:'16:30',category:'meal',repeat:'daily'},
{id:'study3',title:'Estudo — bloco 3',date:today,start:'16:30',end:'18:30',category:'study',repeat:'weekdays'},
{id:'career',title:'Carreira / trabalho',date:today,start:'18:30',end:'20:00',category:'work',repeat:'weekdays'},
{id:'dinner',title:'Jantar',date:today,start:'20:00',end:'20:30',category:'meal',repeat:'daily'},
{id:'reading',title:'Leitura',date:today,start:'20:30',end:'21:30',category:'reading',repeat:'daily'},
{id:'shutdown',title:'Revisão do dia / desacelerar',date:today,start:'21:30',end:'23:00',category:'personal',repeat:'daily'},
{id:'sleep',title:'Dormir',date:today,start:'23:00',end:'07:00',category:'sleep',repeat:'daily'}
];

const workoutPlans:WorkoutPlan[]=[{
 id:'push',name:'Treino A — Peito / Tríceps',days:['Seg','Qui'],exercises:[
 {id:'supino',name:'Supino reto',sets:4,reps:'8–12',load:'',restSeconds:90,muscle:'Peito'},
 {id:'inclinado',name:'Supino inclinado',sets:3,reps:'8–12',load:'',restSeconds:90,muscle:'Peito'},
 {id:'triceps',name:'Tríceps na polia',sets:3,reps:'10–15',load:'',restSeconds:60,muscle:'Tríceps'}
 ]
},{id:'pull',name:'Treino B — Costas / Bíceps',days:['Ter','Sex'],exercises:[]},{id:'legs',name:'Treino C — Pernas',days:['Qua'],exercises:[]}];

const uemSeed:UemTopic[]=[
 ['Matemática','Funções e gráficos',3],['Matemática','Geometria plana e espacial',3],['Matemática','Probabilidade e estatística',2],['Física','Mecânica',3],['Física','Eletricidade',3],['Química','Estequiometria',3],['Português','Interpretação de texto',3],['Português','Gramática e sintaxe',2],['Literatura','Obras e escolas literárias',2],['Redação','Estrutura e repertório',3],['Biologia','Genética e ecologia',2],['História','Brasil República',2]
].map((x,i)=>({id:`uem-${i}`,subject:String(x[0]),topic:String(x[1]),status:'nao-iniciado' as const,questions:0,correct:0,priority:Number(x[2]) as 1|2|3}));

export const seedState:AppState={
 version:3,
 events:schedule,eventCompletions:{},
 books:[],readingLogs:[],
 workoutPlans,workoutLogs:[],
 subjects:[{id:'mat',name:'Matemática',weeklyGoalMinutes:600},{id:'fis',name:'Física',weeklyGoalMinutes:420},{id:'port',name:'Português / Redação',weeklyGoalMinutes:420},{id:'prog',name:'Programação',weeklyGoalMinutes:600}],studyLogs:[],focusLogs:[],
 habits:[{id:'h-study',name:'Estudar',targetPerWeek:7,category:'study',xp:40},{id:'h-gym',name:'Treinar',targetPerWeek:5,category:'workout',xp:30},{id:'h-read',name:'Ler 1h',targetPerWeek:7,category:'reading',xp:20},{id:'h-sleep',name:'Dormir 8h',targetPerWeek:7,category:'sleep',xp:20},{id:'h-food',name:'4 refeições',targetPerWeek:7,category:'meal',xp:15}],habitCompletions:{},
 goals:[{id:'g-study',title:'Estudar 40h por semana',current:0,target:40,unit:'h'},{id:'g-books',title:'Ler 12 livros',current:0,target:12,unit:'livros'},{id:'g-uem',title:'Passar no vestibular da UEM',current:0,target:100,unit:'% preparação'}],dailyNotes:{},
 sports:[],meals:[],water:[],sleep:[],projects:[],applications:[],finances:[],uemTopics:uemSeed,essays:[],mocks:[],weeklyReviews:[]
};

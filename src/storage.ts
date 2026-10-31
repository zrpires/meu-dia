import {useEffect,useState} from 'react';
import type {AppState} from './types';
import {seedState} from './data';

export const STORAGE_KEY='meu-dia-v3-state';

function read<T>(key:string,fallback:T):T{try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw) as T:fallback}catch{return fallback}}

export function loadInitialState():AppState{
 const saved=read<AppState|null>(STORAGE_KEY,null);
 if(saved?.version===3)return {...seedState,...saved};
 const migrated:AppState={...seedState,
  events:read('meu-dia-v2-events',seedState.events),
  eventCompletions:read('meu-dia-v2-event-completions',{}),
  books:read('meu-dia-v2-books',[]),readingLogs:read('meu-dia-v2-reading-logs',[]),
  workoutPlans:read('meu-dia-v2-workout-plans',seedState.workoutPlans),workoutLogs:read('meu-dia-v2-workout-logs',[]),
  subjects:read('meu-dia-v2-subjects',seedState.subjects),studyLogs:read('meu-dia-v2-study-logs',[]),
  habits:read('meu-dia-v2-habits',seedState.habits),habitCompletions:read('meu-dia-v2-habit-completions',{}),
  goals:read('meu-dia-v2-goals',seedState.goals),dailyNotes:read('meu-dia-v2-daily-notes',{})
 };
 return migrated;
}

export function useAppState(){
 const[state,setState]=useState<AppState>(()=>loadInitialState());
 useEffect(()=>{localStorage.setItem(STORAGE_KEY,JSON.stringify(state))},[state]);
 return[state,setState] as const;
}

export function downloadTextFile(filename:string,content:string,type='application/json'){
 const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url);
}

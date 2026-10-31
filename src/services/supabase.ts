import {createClient,type Session,type SupabaseClient} from '@supabase/supabase-js';
import type {AppState} from '../types';

type Env=ImportMeta & {env?:Record<string,string|undefined>};
const env=(import.meta as Env).env||{};
const url=env.VITE_SUPABASE_URL;const key=env.VITE_SUPABASE_PUBLISHABLE_KEY||env.VITE_SUPABASE_ANON_KEY;
export const cloudEnabled=Boolean(url&&key);
export const supabase:SupabaseClient|null=cloudEnabled?createClient(url!,key!):null;

export async function getSession():Promise<Session|null>{if(!supabase)return null;return (await supabase.auth.getSession()).data.session}
export async function signIn(email:string,password:string){if(!supabase)throw new Error('Supabase não configurado');const {error}=await supabase.auth.signInWithPassword({email,password});if(error)throw error}
export async function signUp(email:string,password:string){if(!supabase)throw new Error('Supabase não configurado');const {error}=await supabase.auth.signUp({email,password});if(error)throw error}
export async function signOut(){if(supabase)await supabase.auth.signOut()}
export async function pullCloud(userId:string):Promise<AppState|null>{if(!supabase)return null;const {data,error}=await supabase.from('app_state').select('data').eq('user_id',userId).maybeSingle();if(error)throw error;return (data?.data as AppState)||null}
export async function pushCloud(userId:string,data:AppState){if(!supabase)return;const {error}=await supabase.from('app_state').upsert({user_id:userId,data,updated_at:new Date().toISOString()},{onConflict:'user_id'});if(error)throw error}

import type {BookSearchResult,ExerciseSearchResult} from '../types';

const safe=(value:unknown)=>typeof value==='string'?value:'';

export async function searchBooks(query:string):Promise<BookSearchResult[]>{
 const q=query.trim();if(q.length<2)return[];
 try{
  const fields='key,title,author_name,cover_i,first_publish_year,number_of_pages_median,isbn';
  const res=await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=12&fields=${encodeURIComponent(fields)}`);
  if(!res.ok)throw new Error('Open Library unavailable');
  const json=await res.json() as {docs?:Array<Record<string,unknown>>};
  const docs=json.docs||[];
  if(docs.length)return docs.map((d,i)=>{
   const cover=Number(d.cover_i||0);const isbns=Array.isArray(d.isbn)?d.isbn as string[]:[];
   return {externalId:safe(d.key)||`ol-${i}`,title:safe(d.title)||'Sem título',author:Array.isArray(d.author_name)?String(d.author_name[0]||''):'',pages:Number(d.number_of_pages_median||0)||0,coverUrl:cover?`https://covers.openlibrary.org/b/id/${cover}-M.jpg`:undefined,isbn:isbns[0],year:Number(d.first_publish_year||0)||undefined};
  });
 }catch{/* fallback below */}
 try{
  const res=await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&maxResults=12`);if(!res.ok)return[];
  const json=await res.json() as {items?:Array<{id:string;volumeInfo?:{title?:string;authors?:string[];pageCount?:number;publishedDate?:string;industryIdentifiers?:Array<{type:string;identifier:string}>;imageLinks?:{thumbnail?:string}}}>};
  return (json.items||[]).map(x=>({externalId:`gb:${x.id}`,title:x.volumeInfo?.title||'Sem título',author:x.volumeInfo?.authors?.[0]||'',pages:x.volumeInfo?.pageCount||0,coverUrl:x.volumeInfo?.imageLinks?.thumbnail?.replace('http:','https:'),isbn:x.volumeInfo?.industryIdentifiers?.find(i=>i.type.includes('ISBN'))?.identifier,year:Number(x.volumeInfo?.publishedDate?.slice(0,4))||undefined}));
 }catch{return[]}
}

const fallbackExercises:ExerciseSearchResult[]=[
 {externalId:'fallback-supino',name:'Supino reto',muscle:'Peitoral',equipment:'Barra'},
 {externalId:'fallback-agachamento',name:'Agachamento',muscle:'Quadríceps / Glúteos',equipment:'Barra'},
 {externalId:'fallback-remada',name:'Remada curvada',muscle:'Costas',equipment:'Barra'},
 {externalId:'fallback-terra',name:'Levantamento terra',muscle:'Posterior / Costas',equipment:'Barra'},
 {externalId:'fallback-desenvolvimento',name:'Desenvolvimento',muscle:'Ombros',equipment:'Halteres'}
];

export async function searchExercises(query:string):Promise<ExerciseSearchResult[]>{
 const q=query.trim().toLowerCase();if(q.length<2)return[];
 try{
  const res=await fetch('https://wger.de/api/v2/exerciseinfo/?limit=200');if(!res.ok)throw new Error('wger unavailable');
  const json=await res.json() as {results?:Array<any>};
  const mapped=(json.results||[]).map((x:any):ExerciseSearchResult=>{
   const translations=Array.isArray(x.translations)?x.translations:[];
   const pt=translations.find((t:any)=>t.language===2)||translations.find((t:any)=>String(t.name||'').toLowerCase().includes(q))||translations[0]||{};
   const images=Array.isArray(x.images)?x.images:[];const raw=images.find((im:any)=>im.is_main)?.image||images[0]?.image;
   const imageUrl=raw?(String(raw).startsWith('http')?String(raw):`https://wger.de${raw}`):undefined;
   const muscles=[...(x.muscles||[]),...(x.muscles_secondary||[])].map((m:any)=>m.name_en||m.name||'').filter(Boolean).join(', ');
   const equipment=(x.equipment||[]).map((e:any)=>e.name||'').filter(Boolean).join(', ');
   return {externalId:String(x.id),name:String(pt.name||`Exercício ${x.id}`),muscle:muscles||String(x.category?.name||''),equipment,description:String(pt.description||'').replace(/<[^>]+>/g,' '),imageUrl};
  }).filter(x=>`${x.name} ${x.muscle} ${x.equipment}`.toLowerCase().includes(q)).slice(0,20);
  if(mapped.length)return mapped;
 }catch{/* local fallback */}
 return fallbackExercises.filter(x=>`${x.name} ${x.muscle}`.toLowerCase().includes(q));
}

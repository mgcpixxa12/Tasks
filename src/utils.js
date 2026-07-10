export function uid(prefix="id"){
  const cryptoObj = globalThis.crypto;
  if (cryptoObj?.randomUUID) return `${prefix}_${cryptoObj.randomUUID().replaceAll("-","").slice(0,18)}`;
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,10)}`;
}
export function esc(value){
  return String(value ?? "").replace(/[&<>'"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[ch]));
}
export function clamp(n,min,max){ return Math.max(min, Math.min(max, Number(n)||0)); }
export function mondayOf(date){
  const d = new Date(date);
  d.setHours(0,0,0,0);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1 - day);
  d.setDate(d.getDate()+diff);
  return d;
}
export function isoDate(date){
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,"0");
  const day = String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}`;
}
export function addDays(date, days){ const d = new Date(date); d.setDate(d.getDate()+days); return d; }
export function prettyDate(iso){
  if (!iso) return "";
  const [y,m,d] = iso.split("-").map(Number);
  return new Date(y,m-1,d).toLocaleDateString(undefined,{month:"short",day:"numeric"});
}
export function bySortThenName(a,b){ return (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || String(a.name||"").localeCompare(String(b.name||"")); }
export function nowISO(){ return new Date().toISOString(); }
export function debounce(fn, wait=250){
  let t; return (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn(...args), wait); };
}
export function downloadJson(name, data){
  const blob = new Blob([JSON.stringify(data,null,2)], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = name; a.click();
  setTimeout(()=>URL.revokeObjectURL(url), 1000);
}

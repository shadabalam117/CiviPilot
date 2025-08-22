'use client'
import { useState, useEffect } from 'react'
export default function Diary(){
  const [entries, setEntries] = useState(()=> JSON.parse(localStorage.getItem('civipilot:diary')||'null') || []);
  useEffect(()=> localStorage.setItem('civipilot:diary', JSON.stringify(entries)),[entries])
  const add = (e)=>{ e.preventDefault(); const f = e.target; const it = {id:Date.now().toString(), date: f.date.value, work: f.work.value, manpower: f.man.value, issues: f.issues.value }; if(!it.work) return; setEntries([it,...entries]); f.reset(); }
  const del = id => setEntries(entries.filter(x=>x.id!==id))
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Site Diary</h2>
      <div className="bg-white p-4 rounded shadow">
        <form onSubmit={add} className="grid md:grid-cols-2 gap-3">
          <input name="date" type="date" defaultValue={new Date().toISOString().slice(0,10)} className="p-2 border rounded" />
          <input name="work" placeholder="Work done" className="p-2 border rounded md:col-span-2" />
          <input name="man" placeholder="Manpower" className="p-2 border rounded" />
          <textarea name="issues" placeholder="Issues / notes" className="p-2 border rounded" />
          <div className="md:col-span-2"><button className="btn">Add Entry</button> <button type="button" onClick={()=>{ if(entries.length===0) return alert('No entries'); const csv = ['Date,Work,Manpower,Issues', ...entries.map(e=>`${csvSafe(e.date)},${csvSafe(e.work)},${csvSafe(e.manpower)},${csvSafe(e.issues)}`)].join('\n'); const blob = new Blob([csv],{type:'text/csv'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='diary.csv'; a.click(); URL.revokeObjectURL(url); }} className="btn-ghost">Export CSV</button></div>
        </form>
        <div className="mt-4 space-y-2">
          {entries.length===0 && <div className="text-sm text-slate-500">No entries yet.</div>}
          {entries.map(e=> <div key={e.id} className="p-3 bg-slate-50 rounded flex justify-between items-start"><div><b>{e.date}</b><div className="text-sm">{e.work}</div><div className="text-xs text-slate-500">Manpower: {e.manpower}</div></div><div><button onClick={()=>del(e.id)} className="text-red-600">Delete</button></div></div>)}
        </div>
      </div>
    </div>
  )
}

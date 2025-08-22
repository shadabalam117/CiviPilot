'use client'
import { useState, useMemo } from 'react'
export default function ConcretePage(){
  const [shape, setShape] = useState('Slab')
  const [L,setL] = useState(5); const [W,setW] = useState(3); const [T,setT] = useState(0.15)
  const [B,setB] = useState(0.3); const [H,setH] = useState(0.45)
  const volume = useMemo(()=>{
    if(shape==='Slab') return L*W*T
    if(shape==='Beam') return L*B*H
    if(shape==='Column') return B*B*H
    return 0
  },[shape,L,W,T,B,H])
  const withWaste = volume*1.02; const bags = withWaste*7.2
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Concrete Volume</h2>
      <div className="bg-white p-4 rounded shadow">
        <label className="block"><span className="text-sm text-slate-600">Shape</span>
          <select value={shape} onChange={e=>setShape(e.target.value)} className="w-full p-2 border rounded mt-1">
            <option>Slab</option><option>Beam</option><option>Column</option>
          </select>
        </label>
        {shape==='Slab' && <div className="grid md:grid-cols-3 gap-2 mt-3"> <input type="number" value={L} onChange={e=>setL(parseFloat(e.target.value||0))} className="p-2 border rounded"/> <input type="number" value={W} onChange={e=>setW(parseFloat(e.target.value||0))} className="p-2 border rounded"/> <input type="number" value={T} onChange={e=>setT(parseFloat(e.target.value||0))} className="p-2 border rounded"/> </div>}
        {shape==='Beam' && <div className="grid md:grid-cols-3 gap-2 mt-3"> <input type="number" value={L} onChange={e=>setL(parseFloat(e.target.value||0))} className="p-2 border rounded"/> <input type="number" value={B} onChange={e=>setB(parseFloat(e.target.value||0))} className="p-2 border rounded"/> <input type="number" value={H} onChange={e=>setH(parseFloat(e.target.value||0))} className="p-2 border rounded"/> </div>}
        {shape==='Column' && <div className="grid md:grid-cols-2 gap-2 mt-3"> <input type="number" value={B} onChange={e=>setB(parseFloat(e.target.value||0))} className="p-2 border rounded"/> <input type="number" value={H} onChange={e=>setH(parseFloat(e.target.value||0))} className="p-2 border rounded"/> </div>}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="p-3 bg-slate-50 rounded">Net: <div className="text-xl font-bold">{volume.toFixed(3)} m³</div></div>
          <div className="p-3 bg-slate-50 rounded">With waste: <div className="text-xl font-bold">{withWaste.toFixed(3)} m³</div></div>
          <div className="p-3 bg-slate-50 rounded">Bags: <div className="text-xl font-bold">{bags.toFixed(1)} bags</div></div>
        </div>
      </div>
    </div>
  )
}

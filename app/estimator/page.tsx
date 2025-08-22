'use client'
import { useState, useEffect } from 'react'
export default function Estimator(){
  const [items, setItems] = useState(()=> JSON.parse(localStorage.getItem('civipilot:estimate')||'null') || [{id:Date.now()+1,item:'Concrete',qty:10,unit:'m³',rate:6500}])
  useEffect(()=> localStorage.setItem('civipilot:estimate', JSON.stringify(items)),[items])
  const subtotal = items.reduce((s,i)=>s + (Number(i.qty)*Number(i.rate)||0),0); const gst = subtotal*0.18; const total = subtotal+gst
  const add = ()=> setItems([{id:Date.now(),item:'',qty:0,unit:'',rate:0},...items])
  const update = (id,field,value)=> setItems(items.map(it=> it.id===id? {...it,[field]: value}:it ))
  const remove = id => setItems(items.filter(i=>i.id!==id))
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Estimator</h2>
      <div className="bg-white p-4 rounded shadow">
        <div className="mb-3"><button onClick={add} className="btn-ghost">Add Item</button> <button onClick={()=>{ const csv = ['Item,Qty,Unit,Rate,Amount', ...items.map(i=>`${i.item},${i.qty},${i.unit},${i.rate},${i.qty*i.rate}`)].join('\n'); const blob=new Blob([csv],{type:'text/csv'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='estimate.csv'; a.click(); URL.revokeObjectURL(url); }} className="btn-ghost">Export CSV</button></div>
        <table className="w-full"><thead><tr><th>Item</th><th>Qty</th><th>Unit</th><th>Rate</th><th>Amount</th><th></th></tr></thead>
          <tbody>
            {items.map(it=> (
              <tr key={it.id}><td><input value={it.item} onChange={e=>update(it.id,'item',e.target.value)} className="p-2 border rounded"/></td>
              <td><input value={it.qty} onChange={e=>update(it.id,'qty',Number(e.target.value))} type="number" className="p-2 border rounded"/></td>
              <td><input value={it.unit} onChange={e=>update(it.id,'unit',e.target.value)} className="p-2 border rounded"/></td>
              <td><input value={it.rate} onChange={e=>update(it.id,'rate',Number(e.target.value))} type="number" className="p-2 border rounded"/></td>
              <td>₹ {((it.qty||0)*(it.rate||0)).toFixed(2)}</td>
              <td><button onClick={()=>remove(it.id)} className="text-red-600">Delete</button></td></tr>
            ))}
          </tbody>
        </table>
        <div className="grid grid-cols-3 gap-2 mt-4"><div>Subtotal<br/><b>₹ {subtotal.toFixed(2)}</b></div><div>GST 18%<br/><b>₹ {gst.toFixed(2)}</b></div><div>Total<br/><b>₹ {total.toFixed(2)}</b></div></div>
      </div>
    </div>
  )
                       }

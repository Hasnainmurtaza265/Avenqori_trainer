import { useState } from 'react';
import { Wallet, CircleDollarSign, CalendarDays, Star, Zap, History, Download, CreditCard, Lightbulb, TrendingUp, Trophy, ArrowDownToLine } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { PageBanner, Panel, Status, Modal, PrimaryButton } from '../components/ui';

export default function Earnings({ data, onWithdraw }) {
  const [range,setRange]=useState('30 Days');
  const [show,setShow]=useState(false);
  const [amount,setAmount]=useState('500');
  const [method,setMethod]=useState('JazzCash');
  const summary=data.summary||{total:2845.50,available:1750.25,month:620.75,payouts:1095.25};
  const money=n=>`$${Number(n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}`;
  const handleSubmit=(e)=>{e.preventDefault();onWithdraw({amount:Number(amount),method});setShow(false)};
  return <>
    <PageBanner icon={Wallet} title="My Earnings" subtitle="Track your earnings, view transactions and withdraw your balance" phrase="Your Hard Work Pays Off!"/>
    <div className="stats-grid earnings-stats">
      {[['Total Earnings',money(summary.total),CircleDollarSign,'purple','+12%'],['Available Balance',money(summary.available),Wallet,'green','+8%'],['This Month',money(summary.month),CalendarDays,'blue','+15%'],['Total Payouts',money(summary.payouts),Star,'orange','']].map(([l,v,I,c,t])=><article className="stat-card" key={l}><div className={`stat-icon ${c}`}><I/></div><div className="stat-copy"><span>{l}</span><strong>{v}</strong></div>{t&&<b className="trend">{t}</b>}</article>)}
    </div>
    <div className="earnings-layout">
      <Panel title="Earnings Overview" icon={TrendingUp} className="earnings-chart-panel" action={<div className="range-tabs">{['7 Days','30 Days','3 Months','1 Year'].map(x=><button className={range===x?'selected':''} onClick={()=>setRange(x)} key={x}>{x}</button>)}</div>}>
        <div className="chart-wrap earnings-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data.chart||[]} margin={{top:10,right:10,left:0,bottom:0}}>
          <defs><linearGradient id="earnFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6920e9" stopOpacity={.3}/><stop offset="100%" stopColor="#6920e9" stopOpacity={.02}/></linearGradient></defs>
          <CartesianGrid stroke="#eeeafa"/><XAxis dataKey="day" tick={{fontSize:11,fill:'#615b85'}} axisLine={false} tickLine={false}/><YAxis tickFormatter={v=>`$${v}`} tick={{fontSize:11,fill:'#615b85'}} axisLine={false} tickLine={false}/><Tooltip formatter={v=>[money(v),'Earnings']}/><Area dataKey="amount" type="monotone" stroke="#641be5" strokeWidth={3} fill="url(#earnFill)" activeDot={{r:6}}/>
        </AreaChart></ResponsiveContainer></div>
      </Panel>
      <Panel title="Quick Actions" icon={Zap} className="earnings-actions">
        <button className="earning-action" onClick={()=>setShow(true)}><Wallet/>Request Withdrawal</button>
        <button className="earning-action" onClick={()=>document.getElementById('transactions')?.scrollIntoView({behavior:'smooth'})}><History/>View Transaction History</button>
        <button className="earning-action" onClick={()=>window.print()}><Download/>Download Statement</button>
        <button className="earning-action" onClick={()=>setShow(true)}><CreditCard/>Update Payment Details</button>
      </Panel>
    </div>
    <div className="earnings-lower">
      <Panel title="Recent Transactions" icon={History} className="transactions-panel" action={<button className="text-link">View All →</button>}>
        <div id="transactions" className="table-scroll"><table><thead><tr><th>#</th><th>Type</th><th>Description</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead><tbody>{(data.transactions||[]).map((t,i)=><tr key={t.id}><td>{i+1}</td><td><span className={`txn-icon ${t.amount<0?'down':'up'}`}>{t.amount<0?'↓':'↑'}</span>{t.type}</td><td>{t.description}</td><td className={t.amount<0?'negative':'positive'}>{t.amount<0?'-':'+'}{money(Math.abs(t.amount))}</td><td>{t.date}</td><td><Status>{t.status}</Status></td></tr>)}</tbody></table></div>
      </Panel>
      <Panel title="Earnings Insights" icon={Lightbulb} className="insights-panel">
        <div className="insight"><span className="insight-icon purple"><TrendingUp/></span><div><strong>Your earnings are up by 15% this month!</strong><small>Keep up the great work.</small></div></div>
        <div className="insight"><span className="insight-icon orange"><Star/></span><div><strong>Top performing course:</strong><small>Python Programming</small></div></div>
        <div className="insight"><span className="insight-icon gold"><Trophy/></span><div><strong>You've earned {money(summary.payouts)} from payouts so far!</strong></div></div>
        <div className="insight-trophy">🏆</div>
      </Panel>
    </div>
    {show&&<Modal title="Request Withdrawal" onClose={()=>setShow(false)}><form className="modal-form" onSubmit={handleSubmit}><label>Withdrawal amount<input type="number" min="1" max={summary.available} value={amount} onChange={e=>setAmount(e.target.value)} required/></label><label>Payment method<select value={method} onChange={e=>setMethod(e.target.value)}><option>JazzCash</option><option>Easypaisa</option><option>Bank Transfer</option></select></label><p className="form-hint">Available balance: {money(summary.available)}</p><PrimaryButton type="submit">Submit Request</PrimaryButton></form></Modal>}
  </>;
}

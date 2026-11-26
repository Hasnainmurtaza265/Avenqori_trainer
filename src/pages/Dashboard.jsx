import { useState } from 'react';
import { GraduationCap, Star, Trophy, Video, Users, CircleDollarSign, CalendarDays, Zap, Plus, Gift, ArrowRight, BarChart3 } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Panel, Status } from '../components/ui';

export default function Dashboard({ data, profile, onNavigate, onAction }) {
  const [range, setRange] = useState('30D');
  const stats = [
    ['Upcoming Classes', data.overview?.upcomingClasses ?? 12, Video, 'purple', '+20%'],
    ['Total Students', data.overview?.students ?? 245, Users, 'green', '+15%'],
    ['This Month Earnings', '$1,280', CircleDollarSign, 'orange', '+28%'],
    ['Your Rating', `${data.overview?.rating ?? 4.9}/5`, Star, 'blue', '']
  ];
  return <>
    <section className="welcome-banner">
      <div className="welcome-copy"><h1>Welcome back, {profile.name.split(' ')[0]}! <span>👋</span></h1><p>Keep inspiring students and help them achieve their goals.</p><button className="white-button" onClick={() => onNavigate('Profile')}>View My Profile <ArrowRight size={16}/></button></div>
      <div className="welcome-metrics">
        <div><GraduationCap/><strong>{data.welcome?.students ?? 500}+</strong><span>Total Students</span></div>
        <div><Star/><strong>{data.welcome?.rating ?? 4.9}</strong><span>Rating</span></div>
        <div><Trophy/><strong>${(data.welcome?.totalEarnings ?? 3250).toLocaleString()}</strong><span>Total Earnings</span></div>
      </div>
      <div className="welcome-person"><img src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=450&auto=format&fit=crop&q=85" alt="Tutor holding a tablet"/></div>
      <div className="welcome-slogan">Teach<br/>Grow<br/>Earn More</div>
    </section>
    <section className="stats-grid">{stats.map(([label,value,Icon,color,trend])=><article className="stat-card" key={label}>
      <div className={`stat-icon ${color}`}><Icon size={24}/></div><div className="stat-copy"><strong>{value}</strong><span>{label}</span></div>{trend && <b className="trend">{trend}</b>}
    </article>)}</section>
    <section className="dashboard-mid">
      <Panel title="Earnings Overview" icon={BarChart3} className="earnings-widget" action={<div className="range-tabs">{['7D','30D','3M','1Y'].map(v=><button key={v} className={range===v?'selected':''} onClick={()=>setRange(v)}>{v}</button>)}</div>}>
        <div className="earnings-total"><strong>$1,280</strong><b>↗ 28%</b></div><p className="muted">This Month Earnings</p>
        <div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data.earnings || []} margin={{top:10,right:5,left:-18,bottom:0}}>
          <defs><linearGradient id="dashFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6420e8" stopOpacity={.32}/><stop offset="100%" stopColor="#6420e8" stopOpacity={.02}/></linearGradient></defs>
          <CartesianGrid stroke="#eeeafa" vertical/><XAxis dataKey="day" tick={{fontSize:10,fill:'#716b91'}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:10,fill:'#716b91'}} axisLine={false} tickLine={false}/><Tooltip formatter={v=>[`$${v}`,'Earnings']}/><Area type="monotone" dataKey="amount" stroke="#641be5" strokeWidth={3} fill="url(#dashFill)" activeDot={{r:5}}/>
        </AreaChart></ResponsiveContainer></div>
      </Panel>
      <Panel title="My Classes Schedule" icon={CalendarDays} action={<button className="text-link" onClick={()=>onNavigate('My Classes')}>View All →</button>}>
        <div className="mini-classes">{(data.classes||[]).filter(c=>c.status==='Upcoming').slice(0,3).map(c=><div className="mini-class" key={c.id}>
          <div className="date-tile"><span>{c.month}</span><b>{c.date}</b><small>{c.day}</small></div><div className="mini-class-info"><strong><i/>{c.title}</strong><span>{c.time}</span></div><button className="join-button" onClick={()=>onAction('Join class')}>Join Now</button>
        </div>)}</div>
      </Panel>
      <Panel title="Quick Actions" icon={Zap} className="quick-panel">
        <div className="quick-grid">{[[Video,'Start Live Class','purple'],[Plus,'Add New Course','blue'],[CalendarDays,'Update Schedule','green'],[Gift,'Share Referral Link','orange']].map(([Icon,label,color])=><button className={`quick-action ${color}`} key={label} onClick={()=>onAction(label)}><Icon size={27}/><strong>{label}</strong></button>)}</div>
      </Panel>
    </section>
    <section className="dashboard-bottom">
      <Panel title="Recent Students" icon={Users} action={<button className="text-link" onClick={()=>onNavigate('Students')}>View All →</button>}>
        <div className="student-strip">{(data.students||[]).slice(0,5).map(s=><div className="student-mini" key={s.id}><img src={s.avatar} alt={s.name}/><strong>{s.name}</strong><span>{s.subject}</span><Status>{s.status}</Status></div>)}</div>
      </Panel>
      <Panel title="Your Top Courses" icon={BarChart3} action={<button className="text-link" onClick={()=>onNavigate('My Courses')}>View All →</button>}>
        <div className="top-course-list">{(data.courses||[]).map(c=><div className="top-course" key={c.id}><div className="course-thumb">{c.icon}</div><div><strong>{c.title}</strong><span>{c.students} Students</span><div className="progress"><i style={{width:`${c.progress}%`}}/></div></div><b>{c.progress}%</b></div>)}</div>
      </Panel>
      <div className="premium-card"><div className="premium-crown">♛</div><h2>Upgrade to Premium</h2><p>Get more earnings, unlock advanced features and grow your teaching career.</p><button onClick={()=>onAction('Premium upgrade')}>Go Premium →</button><div className="premium-trophy">🏆</div></div>
    </section>
  </>;
}

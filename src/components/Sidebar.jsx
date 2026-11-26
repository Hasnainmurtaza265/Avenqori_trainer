import { useState } from 'react';
import {
  LayoutDashboard, CalendarDays, Users, Wallet, Clock3, BookOpen, MessageCircle,
  Star, Award, UserCircle, Settings, Headset, LogOut, Crown, Bell, FolderOpen,
  Menu, X, GraduationCap
} from 'lucide-react';

const groups = [
  [['Dashboard', LayoutDashboard], ['My Classes', CalendarDays], ['Students', Users], ['Earnings', Wallet], ['Schedule', Clock3], ['My Courses', BookOpen]],
  [['Messages', MessageCircle, '2'], ['Notifications', Bell, '3'], ['Resources', FolderOpen], ['Reviews', Star], ['Certificates', Award]],
  [['Profile', UserCircle], ['Settings', Settings], ['Help & Support', Headset]]
];

export default function Sidebar({ active, onNavigate, profile }) {
  const [open, setOpen] = useState(false);
  return <>
    <button className="mobile-menu" aria-label="Open menu" onClick={() => setOpen(true)}><Menu /></button>
    {open && <button className="sidebar-scrim" aria-label="Close menu" onClick={() => setOpen(false)} />}
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <button className="sidebar-close" onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
      <div className="brand"><div className="brand-logo">A</div><strong>AVENQORI</strong><span>Teach · Inspire · Grow</span></div>
      <nav className="nav-groups">
        {groups.map((group, index) => <div className="nav-group" key={index}>
          {group.map(([label, Icon, count]) => <button key={label} className={`nav-item ${active === label ? 'active' : ''}`}
            onClick={() => { onNavigate(label); setOpen(false); }}>
            <Icon size={19} strokeWidth={2.35} /><span>{label}</span>{count && <b className="nav-count">{count}</b>}
          </button>)}
        </div>)}
      </nav>
      <div className="sidebar-premium">
        <Crown size={29} fill="#ffd52e" color="#ffd52e" />
        <strong>Go Premium</strong><span>Unlock more features and earn more!</span>
        <button onClick={() => { onNavigate('Premium'); setOpen(false); }}>Upgrade Now <span>→</span></button>
      </div>
      <div className="sidebar-user">
        <img src={profile?.avatar} alt="" />
        <div><strong>{profile?.name || 'Dr. Ahmed Khan'}</strong><span>{profile?.role || 'Teacher'}</span></div>
        <i />
      </div>
      <button className="logout-button" onClick={() => onNavigate('Logout')}><LogOut size={18} /> Logout</button>
      <div className="sidebar-wave" />
    </aside>
  </>;
}

import { useState } from 'react';
import { Bell, Search, ChevronDown, UserCircle, Settings, LogOut } from 'lucide-react';

export default function Topbar({ profile, onNavigate, onSearch, unread = 3 }) {
  const [menu, setMenu] = useState(false);
  return <header className="topbar">
    <label className="search-box"><Search size={19} /><input onChange={(e) => onSearch(e.target.value)} placeholder="Search for classes, students, or anything..." /></label>
    <div className="topbar-right">
      <button className="notification-button" onClick={() => onNavigate('Notifications')} aria-label="Notifications"><Bell size={20} />{unread > 0 && <b>{unread}</b>}</button>
      <div className="profile-menu-wrap">
        <button className="top-profile" onClick={() => setMenu(!menu)}>
          <img src={profile?.avatar} alt="" /><span><strong>{profile?.name || 'Dr. Ahmed Khan'}</strong><small>{profile?.role || 'Teacher'}</small></span><ChevronDown size={16}/>
        </button>
        {menu && <div className="profile-dropdown">
          <button onClick={() => { onNavigate('Profile'); setMenu(false); }}><UserCircle size={16}/> My Profile</button>
          <button onClick={() => { onNavigate('Settings'); setMenu(false); }}><Settings size={16}/> Settings</button>
          <button onClick={() => { onNavigate('Logout'); setMenu(false); }}><LogOut size={16}/> Logout</button>
        </div>}
      </div>
    </div>
  </header>;
}

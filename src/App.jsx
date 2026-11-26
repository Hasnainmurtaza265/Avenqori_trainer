import { useEffect, useMemo, useState } from 'react';
import { dashboardData, trainer } from './data/mockData';
import { getTrainerDashboard, getTrainerEarnings, getTrainerProfile, getTrainerNotifications, updateTrainerProfile, requestWithdrawal } from './services/trainerService';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Earnings from './pages/Earnings';
import Profile from './pages/Profile';
import Management from './pages/Management';
import { Modal, PrimaryButton } from './components/ui';
import { LoaderCircle, AlertCircle } from 'lucide-react';

const navPages=['Dashboard','My Classes','Students','Earnings','Schedule','My Courses','Messages','Notifications','Resources','Reviews','Certificates','Profile','Settings','Help & Support'];

export default function App() {
  const [active,setActive]=useState('Dashboard');
  const [dash,setDash]=useState(dashboardData);
  const [profile,setProfile]=useState(trainer);
  const [earnings,setEarnings]=useState({summary:{total:2845.5,available:1750.25,month:620.75,payouts:1095.25},chart:dashboardData.earnings,transactions:dashboardData.transactions});
  const [notifications,setNotifications]=useState(dashboardData.notifications);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');
  const [notice,setNotice]=useState('');
  const [globalSearch,setGlobalSearch]=useState('');
  const [logoutOpen,setLogoutOpen]=useState(false);

  useEffect(()=>{
    let mounted=true;
    Promise.all([getTrainerDashboard(),getTrainerProfile(),getTrainerEarnings(),getTrainerNotifications()])
      .then(([d,p,e,n])=>{if(!mounted)return;setDash(d||dashboardData);setProfile(p||trainer);setEarnings(e||earnings);setNotifications(n||[]);})
      .catch(err=>{if(mounted)setError(err.message||'Unable to load dashboard data. Showing saved demo content.');})
      .finally(()=>{if(mounted)setLoading(false)});
    return ()=>{mounted=false};
  },[]);

  const action=(label)=>{
    if(label==='Logout'){setLogoutOpen(true);return;}
    setNotice(`${label} — ready to connect with the backend.`);
    window.clearTimeout(window.__avenqoriToast);
    window.__avenqoriToast=window.setTimeout(()=>setNotice(''),3000);
  };
  const saveProfile=async(payload)=>{
    setProfile(payload);
    try{const updated=await updateTrainerProfile(payload);setProfile(updated||payload);setNotice('Profile updated successfully.');}
    catch(e){setNotice(`Profile saved locally. ${e.message}`);}
    window.setTimeout(()=>setNotice(''),3200);
  };
  const withdraw=async(payload)=>{
    try{const result=await requestWithdrawal(payload);setNotice(result.message||'Withdrawal request submitted.');}
    catch(e){setNotice(e.message);}
    window.setTimeout(()=>setNotice(''),3200);
  };
  const markRead=(id)=>setNotifications(old=>old.map(n=>n.id===id?{...n,unread:false}:n));
  const unread=notifications.filter(n=>n.unread).length;
  const page=useMemo(()=>{
    if(active==='Dashboard')return <Dashboard data={dash} profile={profile} onNavigate={setActive} onAction={action}/>;
    if(active==='Earnings')return <Earnings data={earnings} onWithdraw={withdraw}/>;
    if(active==='Profile')return <Profile profile={profile} onSave={saveProfile} onNavigate={setActive}/>;
    return <Management page={active} data={dash} notifications={notifications} onMarkRead={markRead} onNavigate={setActive} onAction={action}/>;
  },[active,dash,profile,earnings,notifications]);

  return <div className="app-shell">
    <Sidebar active={active} onNavigate={setActive} profile={profile}/>
    <main className="main-area">
      <Topbar profile={profile} onNavigate={setActive} onSearch={setGlobalSearch} unread={unread}/>
      {loading&&<div className="loading-line"/>}
      {error&&<div className="inline-alert"><AlertCircle size={16}/>{error}</div>}
      <div className="page-content">{page}</div>
      {globalSearch.trim()&&<div className="search-feedback">Searching trainer workspace for: <strong>{globalSearch}</strong><button onClick={()=>setGlobalSearch('')}>Clear</button></div>}
    </main>
    {notice&&<div className="toast" role="status">{notice}</div>}
    {logoutOpen&&<Modal title="Sign out?" onClose={()=>setLogoutOpen(false)}><p className="muted">You are viewing the trainer demo workspace. Authentication will be connected in the backend phase.</p><div className="modal-actions"><button className="outline-button" onClick={()=>setLogoutOpen(false)}>Cancel</button><PrimaryButton onClick={()=>{setLogoutOpen(false);setNotice('Demo sign-out action.')}}>Confirm</PrimaryButton></div></Modal>}
  </div>;
}

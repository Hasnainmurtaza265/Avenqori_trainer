import { useState } from 'react';
import { UserCircle, CreditCard, Pencil, GraduationCap, Mail, MapPin, CalendarDays, BriefcaseBusiness, Lock, Phone, Bell, ShieldCheck, Trophy, Camera, ArrowRight, Globe, Zap, Star } from 'lucide-react';
import { PageBanner, Panel, Modal, PrimaryButton } from '../components/ui';

export default function Profile({ profile, onSave, onNavigate }) {
  const [editing,setEditing]=useState(false);
  const [form,setForm]=useState({...profile});
  const change=(key,value)=>setForm(p=>({...p,[key]:value}));
  const save=e=>{e.preventDefault();onSave(form);setEditing(false)};
  return <>
    <PageBanner icon={CalendarDays} title="My Profile" subtitle="Manage your profile, update your information and settings" phrase="Keep Inspiring Your Students!"/>
    <div className="profile-top-grid">
      <Panel title="Profile Overview" icon={UserCircle} action={<button className="outline-button" onClick={()=>{setForm({...profile});setEditing(true)}}><Pencil size={15}/> Edit Profile</button>}>
        <div className="profile-overview">
          <div className="profile-photo-wrap"><img src={profile.avatar} alt={profile.name}/><button onClick={()=>{setForm({...profile});setEditing(true)}} aria-label="Change photo"><Camera size={17}/></button></div>
          <div className="profile-main-info"><h2>{profile.name} <ShieldCheck size={18} fill="#6820e8" color="#6820e8"/></h2><span className="role-pill"><GraduationCap size={15}/>{profile.role}</span><p><Mail/>{profile.email}</p><p><MapPin/>{profile.location}</p><p><CalendarDays/>Joined: {profile.joined}</p></div>
        </div>
        <div className="profile-stats"><div><BookOpenIcon/><strong>{profile.totalClasses}</strong><span>Total Classes</span></div><div><UserCircle/><strong>{profile.totalStudents}</strong><span>Total Students</span></div><div><Star/><strong>{profile.rating}</strong><span>Rating</span></div><div><Trophy/><strong>#1</strong><span>Top Teacher</span></div></div>
      </Panel>
      <Panel title="Personal Information" icon={CreditCard}>
        <div className="personal-info"><div className="info-lines">
          {[['Full Name',profile.name],['Email Address',profile.email],['Phone Number',profile.phone],['Location',profile.location],['Bio',profile.bio]].map(([k,v])=><div key={k}><span>{k}:</span><strong>{v}</strong></div>)}
        </div><div className="profile-picture-card"><strong>Profile Picture</strong><img src={profile.avatar} alt={profile.name}/><button className="soft-button" onClick={()=>{setForm({...profile});setEditing(true)}}><Camera size={14}/> Change Photo</button></div></div>
      </Panel>
    </div>
    <div className="profile-bottom-grid">
      <Panel title="Professional Information" icon={BriefcaseBusiness}>
        <div className="professional-info"><div className="professional-lines">
          <div><strong>Expertise:</strong><span className="chips">{(profile.expertise||[]).map(x=><i key={x}>{x}</i>)}</span></div>
          <div><strong>Experience:</strong><span><CalendarDays/>{profile.experience}</span></div>
          <div><strong>Education:</strong><span><GraduationCap/>{profile.education}</span></div>
          <div><strong>Languages:</strong><span><Globe/>{(profile.languages||[]).join(', ')}</span></div>
          <div><strong>Teaching Style:</strong><span><Zap/>{profile.teachingStyle}</span></div>
          <div><strong>Hourly Fee:</strong><span>${profile.hourlyFee} / hour</span></div>
        </div><div className="impact-card"><Trophy size={31}/><strong>Your Teaching Impact</strong><span>Inspiring learners worldwide</span><div>▂ ▄ ▆ ▇</div></div></div>
      </Panel>
      <Panel title="Account Settings" icon={ShieldCheck}>
        <div className="settings-shortcuts">{[['Change Password',Lock],['Update Email',Mail],['Update Phone Number',Phone],['Notification Preferences',Bell],['Privacy Settings',ShieldCheck]].map(([label,Icon])=><button key={label} onClick={()=>onNavigate('Settings')}><Icon size={17}/><strong>{label}</strong><ArrowRight size={16}/></button>)}</div>
      </Panel>
    </div>
    {editing&&<Modal title="Edit Trainer Profile" onClose={()=>setEditing(false)}><form className="modal-form" onSubmit={save}>
      {['name','email','phone','location','avatar','bio','experience','education','hourlyFee'].map(key=><label key={key}>{key==='hourlyFee'?'Hourly fee':key[0].toUpperCase()+key.slice(1)}{key==='bio'?<textarea value={form[key]||''} onChange={e=>change(key,e.target.value)}/>:<input type={key==='email'?'email':key==='hourlyFee'?'number':'text'} value={form[key]||''} onChange={e=>change(key,e.target.value)}/>}</label>)}
      <PrimaryButton type="submit">Save Changes</PrimaryButton>
    </form></Modal>}
  </>;
}
function BookOpenIcon(){return <GraduationCap/>}

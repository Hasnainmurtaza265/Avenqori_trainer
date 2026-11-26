import { useMemo, useState } from 'react';
import { CalendarDays, Users, BookOpen, Clock3, MessageCircle, Bell, FolderOpen, Star, Award, Settings, Headset, Plus, Filter, Download, Send, FileText, Video, Search, Check, X, MoreHorizontal } from 'lucide-react';
import { PageBanner, Panel, SectionTitle, SearchInput, Status, EmptyState, Modal, PrimaryButton } from '../components/ui';

const config = {
  'My Classes': {icon:CalendarDays,sub:'Manage your upcoming, completed and pending lessons.',phrase:'Every Lesson Builds a Future.'},
  'Students': {icon:Users,sub:'View your learners, monitor progress and stay connected.',phrase:'Grow Together. Learn Together.'},
  'Schedule': {icon:Clock3,sub:'Manage your teaching availability and weekly calendar.',phrase:'Make Time for Great Learning.'},
  'My Courses': {icon:BookOpen,sub:'Create, organize and manage your learning content.',phrase:'Share Knowledge with the World.'},
  'Messages': {icon:MessageCircle,sub:'Communicate with students and manage conversations.',phrase:'Better Communication, Better Learning.'},
  'Notifications': {icon:Bell,sub:'Stay up to date with your classes, students and earnings.',phrase:'Never Miss an Update.'},
  'Resources': {icon:FolderOpen,sub:'Organize lesson materials, notes and shared resources.',phrase:'Everything for Your Next Lesson.'},
  'Reviews': {icon:Star,sub:'Read student feedback and track your teaching reputation.',phrase:'Your Impact, Their Words.'},
  'Certificates': {icon:Award,sub:'Manage your verified teaching credentials and certificates.',phrase:'Showcase Your Expertise.'},
  'Settings': {icon:Settings,sub:'Manage account preferences, security and notifications.',phrase:'Your Account, Your Control.'},
  'Help & Support': {icon:Headset,sub:'Find help and contact the AVENQORI support team.',phrase:'We’re Here to Help.'}
};
export default function Management({page,data,onAction,onNavigate,notifications,onMarkRead}) {
  const [query,setQuery]=useState('');
  const [filter,setFilter]=useState('All');
  const [modal,setModal]=useState(false);
  const [selected,setSelected]=useState(null);
  const [draft,setDraft]=useState('');
  const [tab,setTab]=useState('Overview');
  const cfg=config[page]||config['My Classes'];
  const rows=useMemo(()=>{
    const list=page==='My Classes'?data.classes:page==='Students'?data.students:page==='My Courses'?data.courses:page==='Notifications'?notifications:[];
    return list.filter(x=>JSON.stringify(x).toLowerCase().includes(query.toLowerCase()) && (filter==='All'||x.status===filter));
  },[page,data,notifications,query,filter]);
  const openAction=(label,item=null)=>{setSelected(item);setDraft('');setModal(true)};
  const renderTable=()=>{
    if(page==='My Classes')return <div className="table-scroll"><table><thead><tr><th>Class</th><th>Student</th><th>Date & Time</th><th>Type</th><th>Status</th><th>Action</th></tr></thead><tbody>{rows.map(x=><tr key={x.id}><td><strong>{x.title}</strong><small>{x.subject}</small></td><td>{x.student}</td><td>{x.month} {x.date}, 2025<br/><small>{x.time}</small></td><td>{x.mode}</td><td><Status>{x.status}</Status></td><td><button className="icon-action" onClick={()=>openAction('Class details',x)}><MoreHorizontal/></button></td></tr>)}</tbody></table></div>;
    if(page==='Students')return <div className="table-scroll"><table><thead><tr><th>Student</th><th>Subject</th><th>Classes</th><th>Progress</th><th>Status</th><th>Action</th></tr></thead><tbody>{rows.map(x=><tr key={x.id}><td><div className="table-person"><img src={x.avatar}/><span><strong>{x.name}</strong><small>{x.email}</small></span></div></td><td>{x.subject}</td><td>{x.classes}</td><td><div className="table-progress"><i style={{width:`${x.progress}%`}}/></div>{x.progress}%</td><td><Status>{x.status}</Status></td><td><button className="icon-action" onClick={()=>openAction('Student details',x)}><MoreHorizontal/></button></td></tr>)}</tbody></table></div>;
    if(page==='My Courses')return <div className="management-courses">{rows.map(x=><div className="management-course" key={x.id}><div className="course-thumb">{x.icon}</div><div><strong>{x.title}</strong><span>{x.category} · {x.students} enrolled students</span><div className="progress"><i style={{width:`${x.progress}%`}}/></div></div><Status>{x.status}</Status><button className="icon-action" onClick={()=>openAction('Course details',x)}><MoreHorizontal/></button></div>)}</div>;
    if(page==='Notifications')return <div className="notification-list">{rows.map(x=><div className={`notification-row ${x.unread?'unread':''}`} key={x.id}><div className="notification-dot"><Bell/></div><div><strong>{x.title}</strong><p>{x.detail}</p><small>{x.time}</small></div><button className="text-link" onClick={()=>onMarkRead(x.id)}>Mark read</button></div>)}</div>;
    return null;
  };
  return <>
    <PageBanner icon={cfg.icon} title={page} subtitle={cfg.sub} phrase={cfg.phrase}/>
    {page==='Schedule'?<ScheduleContent onAction={openAction}/>:null}
    {page==='Messages'?<MessagesContent onAction={openAction}/>:null}
    {page==='Resources'?<ResourcesContent onAction={openAction}/>:null}
    {page==='Reviews'?<ReviewsContent/>:null}
    {page==='Certificates'?<CertificatesContent onAction={openAction}/>:null}
    {page==='Settings'?<SettingsContent onAction={openAction}/>:null}
    {page==='Help & Support'?<SupportContent onAction={openAction}/>:null}
    {['My Classes','Students','My Courses','Notifications'].includes(page)&&<>
      <div className="content-toolbar"><SearchInput value={query} onChange={setQuery} placeholder={`Search ${page.toLowerCase()}...`}/><div className="toolbar-right">
        <select value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option>{(page==='My Classes'?['Upcoming','Completed','Pending']:page==='Students'?['Active','Inactive']:page==='My Courses'?['Published','Draft']:[]).map(x=><option key={x}>{x}</option>)}</select>
        {page!=='Notifications'&&<button className="primary-button" onClick={()=>openAction(page==='My Classes'?'Create class':page==='Students'?'Invite student':'Add new course')}><Plus size={16}/>{page==='My Classes'?'Create Class':page==='Students'?'Invite Student':'Add New'}</button>}
      </div></div>
      <Panel title={`${page} Overview`} icon={cfg.icon} className="management-panel" action={<span className="muted">{rows.length} records</span>}>{rows.length?renderTable():<EmptyState title={`No ${page.toLowerCase()} found`} text="Try changing your search or filter."/>}</Panel>
    </>}
    {modal&&<Modal title={selected?.title||selected?.name||'Create new item'} onClose={()=>setModal(false)}>
      <div className="modal-form">{selected?<><p className="form-hint">Review this record and choose an action. Live updates will be connected to the trainer API.</p><pre className="record-preview">{JSON.stringify(selected,null,2)}</pre></>:<><label>Title<input value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Enter a title"/></label><label>Details<textarea placeholder="Add a short description..."/></label></>}
      <PrimaryButton onClick={()=>{onAction(selected?'Record action':'Create item');setModal(false)}}>{selected?'Confirm':'Save'}</PrimaryButton></div>
    </Modal>}
  </>;
}

function ScheduleContent({onAction}) {
  const days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  return <div className="schedule-layout"><Panel title="Weekly Availability" icon={Clock3} action={<button className="outline-button" onClick={()=>onAction('Edit availability')}>Edit Availability</button>}>
    <div className="availability-grid">{days.map((d,i)=><div className="availability-day" key={d}><strong>{d}</strong><span>{i===5||i===6?'Unavailable':i===2?'02:00 PM – 08:00 PM':'09:00 AM – 06:00 PM'}</span><Status>{i===5||i===6?'Off':'Available'}</Status></div>)}</div>
  </Panel><Panel title="Upcoming Sessions" icon={CalendarDays}><div className="session-list">{[['Nov 16','Mathematics Fundamentals','10:00 AM'],['Nov 17','Python Programming','08:00 PM'],['Nov 19','Web Development Basics','07:00 PM']].map(x=><div className="session-row" key={x[0]}><b>{x[0]}</b><span>{x[1]}</span><small>{x[2]}</small></div>)}</div></Panel></div>;
}
function MessagesContent({onAction}) {
  const [active,setActive]=useState(0);const [message,setMessage]=useState('');
  const chats=[['Ayesha Malik','Hi Dr. Ahmed, can we move tomorrow’s class?','10:42 AM'],['Usman Ahmed','Thank you for the Python notes!','Yesterday'],['Fatima Noor','I have submitted my homework.','Mon']];
  return <Panel title="Your Conversations" icon={MessageCircle} className="chat-panel"><div className="chat-layout"><div className="chat-list">{chats.map((c,i)=><button className={active===i?'chat-active':''} onClick={()=>setActive(i)} key={c[0]}><img src={`https://i.pravatar.cc/80?img=${47+i}`}/><span><strong>{c[0]}</strong><small>{c[1]}</small></span><em>{c[2]}</em></button>)}</div><div className="chat-window"><div className="chat-head"><strong>{chats[active][0]}</strong><Status>Online</Status></div><div className="chat-messages"><p className="chat-bubble">{chats[active][1]}</p><p className="chat-bubble mine">Sure, let me check my schedule and get back to you.</p></div><form className="chat-compose" onSubmit={e=>{e.preventDefault();if(message.trim()){onAction('Send message');setMessage('')}}}><input value={message} onChange={e=>setMessage(e.target.value)} placeholder="Write a message..."/><button><Send size={18}/></button></form></div></div></Panel>;
}
function ResourcesContent({onAction}) {
  const items=[['Python lesson notes.pdf','PDF · 2.4 MB','Shared with 18 students'],['HTML & CSS practice.zip','ZIP · 5.1 MB','Shared with 12 students'],['Data Science slides.pptx','PPTX · 8.2 MB','Private resource']];
  return <><div className="content-toolbar"><span className="muted">Your teaching materials</span><button className="primary-button" onClick={()=>onAction('Upload resource')}><Plus size={16}/>Upload Resource</button></div><div className="resource-grid">{items.map(x=><div className="resource-card" key={x[0]}><div className="resource-file"><FileText size={27}/></div><strong>{x[0]}</strong><span>{x[1]}</span><small>{x[2]}</small><button className="text-link" onClick={()=>onAction('Open resource')}>Open resource →</button></div>)}</div></>;
}
function ReviewsContent() {
  return <div className="reviews-layout"><Panel title="Your Rating" icon={Star}><div className="rating-summary"><strong>4.8</strong><span>★★★★★</span><small>Based on 128 verified student reviews</small></div></Panel><Panel title="Recent Student Reviews" icon={MessageCircle}><div className="review-list">{[['Ayesha Malik','Excellent teaching style. Complex topics are explained very clearly.','5.0'],['Usman Ahmed','Very practical Python lessons. I have improved a lot.','5.0'],['Fatima Noor','Helpful notes and supportive instructor.','4.5']].map(x=><div className="review-item" key={x[0]}><div><strong>{x[0]}</strong><span>★★★★★ <small>{x[2]}</small></span></div><p>{x[1]}</p></div>)}</div></Panel></div>;
}
function CertificatesContent({onAction}) {
  return <Panel title="Teaching Credentials" icon={Award} action={<button className="primary-button" onClick={()=>onAction('Upload certificate')}><Plus size={16}/>Upload Certificate</button>}><div className="certificate-grid">{[['MS Computer Science','University of Karachi','Verified'],['Python Professional Certificate','Global Skills Institute','Verified'],['Data Science Specialization','Online Learning Academy','Under Review']].map(x=><div className="certificate-card" key={x[0]}><Award size={33}/><strong>{x[0]}</strong><span>{x[1]}</span><Status>{x[2]}</Status></div>)}</div></Panel>;
}
function SettingsContent({onAction}) {
  const rows=[['Account Security','Change password and manage active sessions','Password'],['Email & Phone','Update your contact information','Contact details'],['Notification Preferences','Choose which updates you receive','Preferences'],['Privacy Settings','Control profile visibility and data','Privacy'],['Language & Region','Set language, currency and time zone','Regional settings']];
  return <Panel title="Account Preferences" icon={Settings}><div className="settings-list">{rows.map(x=><button key={x[0]} onClick={()=>onAction(x[2])}><div><strong>{x[0]}</strong><span>{x[1]}</span></div><span>{x[2]} →</span></button>)}</div></Panel>;
}
function SupportContent({onAction}) {
  return <div className="support-grid"><Panel title="How can we help?" icon={Headset}><p className="muted">Browse help topics or send a message to our support team.</p>{['Getting started as a trainer','Managing classes and students','Payments and withdrawals','Profile verification'].map(x=><button className="help-topic" key={x} onClick={()=>onAction(x)}>{x}<span>→</span></button>)}</Panel><Panel title="Contact Support" icon={MessageCircle}><form className="modal-form" onSubmit={e=>{e.preventDefault();onAction('Support ticket submitted')}}><label>Subject<input required placeholder="How can we help?"/></label><label>Message<textarea required placeholder="Describe your issue..."/></label><button className="primary-button"><Send size={16}/>Submit Ticket</button></form></Panel></div>;
}

import { Search, Plus, ArrowRight, X } from 'lucide-react';

export function PageBanner({ icon: Icon, title, subtitle, phrase = 'Teach. Inspire. Grow.' }) {
  return <section className="page-banner">
    <div className="page-banner-icon">{Icon && <Icon size={48}/>}</div>
    <div className="page-banner-copy"><h1>{title}</h1><p>{subtitle}</p></div>
    <div className="page-banner-phrase">{phrase}</div>
    <div className="banner-decoration">✦</div>
  </section>;
}
export function Panel({ title, icon: Icon, action, children, className = '' }) {
  return <section className={`panel ${className}`}><div className="panel-heading">
    <h2>{Icon && <Icon className="heading-icon" size={21}/>} {title}</h2>{action}
  </div>{children}</section>;
}
export function SectionTitle({ title, subtitle, action }) {
  return <div className="section-title"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action}</div>;
}
export function EmptyState({ title = 'Nothing here yet', text = 'New updates will appear here.' }) {
  return <div className="empty-state"><div>✦</div><strong>{title}</strong><span>{text}</span></div>;
}
export function SearchInput({ value, onChange, placeholder = 'Search...' }) {
  return <label className="table-search"><Search size={17}/><input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}/></label>;
}
export function Modal({ title, onClose, children }) {
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal" onMouseDown={e => e.stopPropagation()}>
    <div className="modal-head"><h2>{title}</h2><button onClick={onClose} aria-label="Close"><X size={19}/></button></div>{children}
  </div></div>;
}
export function PrimaryButton({ children, onClick, type = 'button' }) {
  return <button type={type} className="primary-button" onClick={onClick}>{children}</button>;
}
export function Status({ children }) {
  const cls = String(children).toLowerCase().replaceAll(' ', '-');
  return <span className={`status status-${cls}`}>{children}</span>;
}

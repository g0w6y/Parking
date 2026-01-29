
import React, { useState, useEffect } from 'react';
import { ActivityLog, UserProfile } from '../types';
import { STORAGE_KEYS } from '../constants';
import { LogOut, Filter, Download, Trash2, Users, List, ShieldCheck, Activity } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [view, setView] = useState<'logs' | 'users'>('users');

  useEffect(() => {
    const savedLogs = localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOGS);
    if (savedLogs) setLogs(JSON.parse(savedLogs));

    const savedUsers = localStorage.getItem(STORAGE_KEYS.ALL_USERS);
    if (savedUsers) setUsers(JSON.parse(savedUsers));
  }, []);

  const clearLogs = () => {
    if (window.confirm('Clear activity logs? User accounts will remain.')) {
      localStorage.removeItem(STORAGE_KEYS.ACTIVITY_LOGS);
      setLogs([]);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Admin Header */}
      <div className="bg-slate-950 p-6 text-white shrink-0">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500 rounded-2xl flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight">Admin Console</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Garvasis Security</p>
            </div>
          </div>
          <button onClick={onLogout} className="p-3 bg-slate-900 rounded-2xl text-slate-400 active:scale-90 transition-transform">
            <LogOut size={20} />
          </button>
        </div>

        <div className="flex bg-slate-900 p-1.5 rounded-2xl">
          <button 
            onClick={() => setView('users')}
            className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-wider transition-all ${view === 'users' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:text-white'}`}
          >
            <Users size={14} /> Registered Users
          </button>
          <button 
            onClick={() => setView('logs')}
            className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-wider transition-all ${view === 'logs' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:text-white'}`}
          >
            <Activity size={14} /> Activity Stream
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">
            {view === 'logs' ? `Logs Recorded (${logs.length})` : `User Directory (${users.length})`}
          </h2>
          {view === 'logs' && (
            <button 
              onClick={clearLogs}
              className="px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-[9px] font-black uppercase flex items-center gap-1.5"
            >
              <Trash2 size={12} /> Clear Logs
            </button>
          )}
        </div>

        {view === 'logs' ? (
          <div className="space-y-4">
            {logs.length > 0 ? logs.map(log => (
              <div key={log.id} className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-black text-slate-600 tracking-tighter uppercase">
                    {log.action}
                  </span>
                  <span className="text-[9px] text-slate-300 font-mono">{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
                <p className="font-bold text-slate-800 text-xs mb-1">{log.userName}</p>
                <p className="text-[10px] text-slate-400 leading-relaxed italic">{log.details}</p>
              </div>
            )) : (
              <div className="text-center py-24 opacity-20">
                <List size={48} className="mx-auto mb-4" />
                <p className="text-xs font-black uppercase">Stream empty</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {users.map(u => (
              <div key={u.id} className="p-5 bg-white rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between animate-in fade-in slide-in-from-bottom-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-black text-slate-900 text-sm uppercase tracking-tight">{u.vehicleNumber}</p>
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[8px] font-black uppercase">{u.semester}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium mb-1">{u.name}</p>
                  <p className="text-[9px] text-slate-400 uppercase tracking-wide font-bold">{u.department}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-indigo-600 font-bold mb-1">{u.phone}</p>
                  <p className="text-[8px] text-slate-300">Reg: {new Date(u.registeredAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            {users.length === 0 && (
              <div className="text-center py-24 opacity-20">
                <Users size={48} className="mx-auto mb-4" />
                <p className="text-xs font-black uppercase">Registry empty</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-100 flex gap-3">
        <button className="flex-1 py-4 bg-slate-50 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all">
          <Download size={14} /> Export CSV
        </button>
        <button className="flex-1 py-4 bg-slate-50 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all">
          <Filter size={14} /> Filter List
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;

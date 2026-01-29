
import React, { useState } from 'react';
import { ADMIN_CREDENTIALS } from '../constants';
import { Lock, ShieldAlert, ArrowLeft } from 'lucide-react';
import { AppRoute } from '../types';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === ADMIN_CREDENTIALS.user && pass === ADMIN_CREDENTIALS.pass) {
      onLogin();
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="flex-1 flex flex-col p-8 bg-slate-950 text-white overflow-y-auto min-h-screen">
      <div className="mb-10 text-center mt-10">
        <div className="w-20 h-20 bg-red-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-red-900/40 transform rotate-12 transition-transform hover:rotate-0 duration-500">
          <ShieldAlert size={40} />
        </div>
        <h1 className="text-3xl font-black mb-2 tracking-tight uppercase">Admin Core</h1>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Identity Verification Required</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6 max-w-sm mx-auto w-full">
        <div className="space-y-4">
          <div className="group">
             <label className="text-[10px] font-black text-slate-600 uppercase mb-2 block tracking-widest ml-4">Authorized User</label>
             <input 
              type="text" 
              placeholder="Username"
              className="w-full py-5 px-8 bg-slate-900 rounded-[2rem] border border-slate-800 outline-none focus:border-red-600 focus:bg-slate-800 transition-all text-sm font-bold placeholder:text-slate-700"
              value={user}
              onChange={e => setUser(e.target.value)}
            />
          </div>
          <div className="group">
             <label className="text-[10px] font-black text-slate-600 uppercase mb-2 block tracking-widest ml-4">Access Key</label>
             <input 
              type="password" 
              placeholder="••••••••"
              className="w-full py-5 px-8 bg-slate-900 rounded-[2rem] border border-slate-800 outline-none focus:border-red-600 focus:bg-slate-800 transition-all text-sm font-bold placeholder:text-slate-700"
              value={pass}
              onChange={e => setPass(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-[10px] text-center font-black uppercase tracking-widest animate-pulse">{error}</p>}

        <button 
          type="submit"
          className="w-full py-6 bg-red-600 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-2xl shadow-red-900/30 active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <Lock size={18} /> Authenticate
        </button>
      </form>

      <button 
        onClick={() => window.location.hash = AppRoute.HOME}
        className="mt-12 py-4 text-slate-600 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} /> Exit Secure Portal
      </button>
    </div>
  );
};

export default AdminLogin;

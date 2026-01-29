
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
    <div className="flex-1 flex flex-col p-8 bg-slate-900 text-white overflow-y-auto">
      <div className="mb-10 text-center">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-red-900/20">
          <ShieldAlert size={32} />
        </div>
        <h1 className="text-2xl font-bold mb-2">Admin Portal</h1>
        <p className="text-slate-400 text-sm font-medium">Restricted Access Area</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Username"
            className="w-full py-4 px-6 bg-slate-800 rounded-2xl border border-slate-700 outline-none focus:border-red-500 transition-all text-sm"
            value={user}
            onChange={e => setUser(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Secret Key"
            className="w-full py-4 px-6 bg-slate-800 rounded-2xl border border-slate-700 outline-none focus:border-red-500 transition-all text-sm"
            value={pass}
            onChange={e => setPass(e.target.value)}
          />
        </div>

        {error && <p className="text-red-400 text-xs text-center font-bold">{error}</p>}

        <button 
          type="submit"
          className="w-full py-5 bg-red-500 text-white rounded-2xl font-bold active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <Lock size={18} /> Authenticate
        </button>
      </form>

      <button 
        onClick={() => window.location.hash = AppRoute.HOME}
        className="mt-auto py-4 text-slate-500 text-sm flex items-center justify-center gap-2"
      >
        <ArrowLeft size={16} /> Back to Student App
      </button>
    </div>
  );
};

export default AdminLogin;

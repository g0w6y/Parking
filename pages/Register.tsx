
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { STORAGE_KEYS } from '../constants';
import { Smartphone, Car, User, Building2, ShieldCheck, ArrowRight, GraduationCap, Sparkles } from 'lucide-react';

interface RegisterProps {
  onRegister: (user: UserProfile) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicleNumber: '',
    department: '',
    semester: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.vehicleNumber || !formData.semester) return;

    const newUser: UserProfile = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      registeredAt: Date.now()
    };

    const allUsersStr = localStorage.getItem(STORAGE_KEYS.ALL_USERS) || '[]';
    const allUsers = JSON.parse(allUsersStr);
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify([...allUsers, newUser]));

    onRegister(newUser);
  };

  return (
    <div className="flex-1 flex flex-col p-8 bg-[#f8fafc] overflow-y-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 relative" style={{ perspective: '1200px' }}>
      {/* 3D Decorative Blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mb-12 text-center relative z-10">
        <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center text-indigo-600 mx-auto mb-8 shadow-[0_20px_50px_rgba(79,70,229,0.15)] transform rotate-[5deg] hover:rotate-0 transition-transform duration-500 relative group">
           <div className="absolute inset-0 bg-indigo-600 rounded-[2.5rem] opacity-0 group-hover:opacity-10 transition-opacity" />
           <ShieldCheck size={48} className="relative z-10" />
           <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse">
             <Sparkles size={16} />
           </div>
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tighter">Register</h1>
        <p className="text-slate-400 font-medium px-4">Initialize your secure parking identity for the campus ecosystem.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="space-y-5">
          <div className="group" style={{ transformStyle: 'preserve-3d' }}>
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-2 block tracking-[0.25em]">Full Identity</label>
            <div className="flex items-center bg-white rounded-[1.5rem] px-6 border border-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] group-focus-within:shadow-[0_20px_40px_rgba(79,70,229,0.08)] group-focus-within:-translate-y-1 transition-all duration-500 ease-out">
              <User size={20} className="text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                required
                type="text" 
                placeholder="Ex: David Miller"
                className="w-full py-5 bg-transparent outline-none text-slate-800 text-sm font-bold pl-4 placeholder:text-slate-300"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="group">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-2 block tracking-[0.25em]">Mobile Number</label>
            <div className="flex items-center bg-white rounded-[1.5rem] px-6 border border-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] group-focus-within:shadow-[0_20px_40px_rgba(79,70,229,0.08)] group-focus-within:-translate-y-1 transition-all duration-500 ease-out">
              <Smartphone size={20} className="text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                required
                type="tel" 
                placeholder="Ex: 9876543210"
                className="w-full py-5 bg-transparent outline-none text-slate-800 text-sm font-bold pl-4 placeholder:text-slate-300"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="group">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-2 block tracking-[0.25em]">Dept</label>
              <div className="flex items-center bg-white rounded-[1.5rem] px-6 border border-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] group-focus-within:shadow-[0_20px_40px_rgba(79,70,229,0.08)] group-focus-within:-translate-y-1 transition-all duration-500 ease-out">
                <Building2 size={20} className="text-slate-300 group-focus-within:text-indigo-600 transition-colors shrink-0" />
                <input 
                  required
                  type="text" 
                  placeholder="IMCA"
                  className="w-full py-5 bg-transparent outline-none text-slate-800 text-sm font-bold pl-4 placeholder:text-slate-300"
                  value={formData.department}
                  onChange={e => setFormData({...formData, department: e.target.value})}
                />
              </div>
            </div>
            <div className="group">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-2 block tracking-[0.25em]">Semester</label>
              <div className="flex items-center bg-white rounded-[1.5rem] px-6 border border-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] group-focus-within:shadow-[0_20px_40px_rgba(79,70,229,0.08)] group-focus-within:-translate-y-1 transition-all duration-500 ease-out">
                <GraduationCap size={20} className="text-slate-300 group-focus-within:text-indigo-600 transition-colors shrink-0" />
                <input 
                  required
                  type="text" 
                  placeholder="S2"
                  className="w-full py-5 bg-transparent outline-none text-slate-800 text-sm font-bold pl-4 placeholder:text-slate-300"
                  value={formData.semester}
                  onChange={e => setFormData({...formData, semester: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="group">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-2 block tracking-[0.25em]">Vehicle Plate</label>
            <div className="flex items-center bg-white rounded-[1.5rem] px-6 border border-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] group-focus-within:shadow-[0_20px_40px_rgba(79,70,229,0.08)] group-focus-within:-translate-y-1 transition-all duration-500 ease-out">
              <Car size={20} className="text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                required
                type="text" 
                placeholder="Ex: KL-01-AB-1234"
                className="w-full py-5 bg-transparent outline-none text-slate-800 text-sm font-black uppercase pl-4 placeholder:text-slate-300"
                value={formData.vehicleNumber}
                onChange={e => setFormData({...formData, vehicleNumber: e.target.value.toUpperCase()})}
              />
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full relative py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-base uppercase tracking-[0.15em] shadow-[0_20px_40px_rgba(79,70,229,0.3)] hover:shadow-[0_25px_50px_rgba(79,70,229,0.4)] hover:-translate-y-1 active:translate-y-1 active:shadow-inner transition-all duration-300 flex items-center justify-center gap-4 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          Join Network <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      <div className="mt-12 text-center pb-8 relative z-10">
        <p className="text-[11px] font-bold text-slate-400 leading-relaxed uppercase tracking-[0.05em] px-10">
          Campus Verified • End-to-End Encryption • Instant Access
        </p>
      </div>
    </div>
  );
};

export default Register;

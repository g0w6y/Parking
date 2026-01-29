
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { STORAGE_KEYS } from '../constants';
import { Smartphone, Car, User, Building2, ShieldCheck, ArrowRight, GraduationCap } from 'lucide-react';

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

    // Store in "all users" for mock search capability
    const allUsersStr = localStorage.getItem(STORAGE_KEYS.ALL_USERS) || '[]';
    const allUsers = JSON.parse(allUsersStr);
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify([...allUsers, newUser]));

    onRegister(newUser);
  };

  return (
    <div className="flex-1 flex flex-col p-8 bg-white overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10 text-center">
        <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white mx-auto mb-6 shadow-2xl shadow-indigo-200">
          <ShieldCheck size={40} />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Registration</h1>
        <p className="text-slate-400 text-sm">Create your parking profile to continue.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div className="group">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1.5 block tracking-widest">Student Name</label>
            <div className="flex items-center bg-slate-50 rounded-2xl px-5 border border-slate-100 focus-within:border-indigo-600 focus-within:bg-white focus-within:shadow-lg focus-within:shadow-indigo-50 transition-all duration-300">
              <User size={18} className="text-slate-400 mr-3" />
              <input 
                required
                type="text" 
                placeholder="Ex: Alan Walker"
                className="w-full py-4 bg-transparent outline-none text-slate-700 text-sm font-medium"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="group">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1.5 block tracking-widest">Phone Number</label>
            <div className="flex items-center bg-slate-50 rounded-2xl px-5 border border-slate-100 focus-within:border-indigo-600 focus-within:bg-white focus-within:shadow-lg focus-within:shadow-indigo-50 transition-all duration-300">
              <Smartphone size={18} className="text-slate-400 mr-3" />
              <input 
                required
                type="tel" 
                placeholder="Ex: 9087654321"
                className="w-full py-4 bg-transparent outline-none text-slate-700 text-sm font-medium"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="group">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1.5 block tracking-widest">Department</label>
              <div className="flex items-center bg-slate-50 rounded-2xl px-5 border border-slate-100 focus-within:border-indigo-600 focus-within:bg-white focus-within:shadow-lg focus-within:shadow-indigo-50 transition-all duration-300">
                <Building2 size={18} className="text-slate-400 mr-3" />
                <input 
                  required
                  type="text" 
                  placeholder="IMCA"
                  className="w-full py-4 bg-transparent outline-none text-slate-700 text-sm font-medium"
                  value={formData.department}
                  onChange={e => setFormData({...formData, department: e.target.value})}
                />
              </div>
            </div>
            <div className="group">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1.5 block tracking-widest">Semester</label>
              <div className="flex items-center bg-slate-50 rounded-2xl px-5 border border-slate-100 focus-within:border-indigo-600 focus-within:bg-white focus-within:shadow-lg focus-within:shadow-indigo-50 transition-all duration-300">
                <GraduationCap size={18} className="text-slate-400 mr-3" />
                <input 
                  required
                  type="text" 
                  placeholder="S2"
                  className="w-full py-4 bg-transparent outline-none text-slate-700 text-sm font-medium"
                  value={formData.semester}
                  onChange={e => setFormData({...formData, semester: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="group">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1.5 block tracking-widest">Vehicle Plate Number</label>
            <div className="flex items-center bg-slate-50 rounded-2xl px-5 border border-slate-100 focus-within:border-indigo-600 focus-within:bg-white focus-within:shadow-lg focus-within:shadow-indigo-50 transition-all duration-300">
              <Car size={18} className="text-slate-400 mr-3" />
              <input 
                required
                type="text" 
                placeholder="KL 01 AB 1234"
                className="w-full py-4 bg-transparent outline-none text-slate-700 text-sm font-bold uppercase"
                value={formData.vehicleNumber}
                onChange={e => setFormData({...formData, vehicleNumber: e.target.value.toUpperCase()})}
              />
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-5 bg-indigo-600 text-white rounded-3xl font-bold shadow-xl shadow-indigo-100 active:scale-95 transition-all flex items-center justify-center gap-3 mt-8"
        >
          Create Account <ArrowRight size={20} />
        </button>
      </form>

      <p className="mt-8 text-[11px] text-center text-slate-400 leading-relaxed max-w-[200px] mx-auto">
        Safe & Secure. Only verified students can access the logbook.
      </p>
    </div>
  );
};

export default Register;

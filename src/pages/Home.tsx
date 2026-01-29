
import React, { useState, useEffect } from 'react';
import { UserProfile, ActivityLog, AppRoute } from '../types';
import { STORAGE_KEYS } from '../constants';
import { Search, Phone, AlertCircle, User, X, Loader2, Sparkles, ShieldCheck, Sun, Moon } from 'lucide-react';

interface HomeProps {
  user: UserProfile;
  navigateTo: (route: AppRoute) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Home: React.FC<HomeProps> = ({ user, navigateTo, isDarkMode, toggleDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const timeoutId = setTimeout(() => performSearch(), 300);
      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const performSearch = () => {
    setIsSearching(true);
    const allUsersStr = localStorage.getItem(STORAGE_KEYS.ALL_USERS) || '[]';
    const allUsers: UserProfile[] = JSON.parse(allUsersStr);
    
    const results = allUsers.filter(u => 
      u.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(results);
    setIsSearching(false);

    if (results.length > 0) {
      logActivity('SEARCH', `Searched for: ${searchQuery}`);
    }
  };

  const logActivity = (action: string, details: string) => {
    const logsStr = localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOGS) || '[]';
    const logs: ActivityLog[] = JSON.parse(logsStr);
    const newLog: ActivityLog = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userName: user.name,
      action,
      details,
      timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify([newLog, ...logs]));
  };

  const handleCall = (phone: string, resultName: string) => {
    logActivity('CALL_ACTION', `Attempted to call owner: ${resultName}`);
    window.open(`tel:${phone}`);
  };

  return (
    <div className={`flex-1 flex flex-col p-6 transition-colors duration-500 overflow-y-auto overflow-x-hidden relative ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-[#f8fafc] text-slate-900'}`} style={{ perspective: '1200px' }}>
      {/* Dynamic 3D Floating Orbs */}
      <div className={`absolute -top-10 -right-10 w-48 h-48 rounded-full blur-[80px] opacity-30 animate-pulse pointer-events-none transition-colors duration-700 ${isDarkMode ? 'bg-indigo-900' : 'bg-indigo-200'}`} />
      <div className={`absolute bottom-1/4 -left-20 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none transition-colors duration-700 ${isDarkMode ? 'bg-blue-900' : 'bg-blue-200'}`} />

      {/* Header */}
      <div className="flex justify-between items-center mb-10 z-10">
        <div className="animate-in fade-in slide-in-from-left-6 duration-700">
          <div className="flex items-center gap-2">
             <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_10px_30px_rgba(79,70,229,0.3)] transform hover:rotate-12 transition-transform duration-500">
                <Sparkles size={20} className="text-white" />
             </div>
             <div>
               <h1 className={`text-3xl font-black tracking-tight leading-none transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Garvasis</h1>
               <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-[0.25em] mt-1.5">Elite Parking Hub</p>
             </div>
          </div>
        </div>
        <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-6 duration-700">
          <div className="text-right hidden xs:block">
            <p className={`text-sm font-bold transition-colors ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{user.name}</p>
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{user.semester} • {user.department}</p>
          </div>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-indigo-600 shadow-xl border transform hover:scale-105 transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-white'}`}>
            <User size={24} />
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="mb-6 px-1">
          <h2 className={`text-2xl font-black mb-2 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Find Vehicle Owner</h2>
          <p className="text-sm text-slate-400 font-medium leading-relaxed">Resolve parking blocks instantly with our smart search.</p>
        </div>

        {/* PERFECT 3D SEARCH BAR */}
        <div className="relative group z-20">
          {/* Neon Glow Background */}
          <div className={`absolute -inset-1 rounded-[2.2rem] blur-xl transition-opacity duration-700 ${isFocused ? 'opacity-30' : 'opacity-0'} ${isDarkMode ? 'bg-indigo-500' : 'bg-indigo-600'}`} />
          
          <div className={`relative flex items-center backdrop-blur-2xl rounded-[2rem] px-6 border transition-all duration-500 ease-out overflow-hidden transform-gpu ${isFocused ? '-translate-y-2 shadow-[0_25px_60px_-15px_rgba(79,70,229,0.4)]' : 'shadow-[0_15px_45px_-10px_rgba(0,0,0,0.1)]'} ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-white'}`}>
            
            <div className={`transition-all duration-700 ${isFocused ? 'scale-125 rotate-[15deg] text-indigo-500' : 'text-slate-300'}`}>
              <Search size={24} />
            </div>
            
            <input
              type="text"
              placeholder="Search Plate Number..."
              className={`w-full py-8 pl-5 pr-12 bg-transparent outline-none text-xl font-black placeholder:font-bold focus:placeholder:opacity-0 transition-all ${isDarkMode ? 'text-white placeholder:text-slate-700' : 'text-slate-800 placeholder:text-slate-200'}`}
              value={searchQuery}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            {searchQuery && (
              <button 
                onClick={() => {setSearchQuery(''); setSearchResults([]);}}
                className={`absolute right-6 p-2 rounded-full transition-all active:scale-90 ${isDarkMode ? 'bg-slate-800 text-slate-400 hover:text-indigo-400' : 'bg-slate-100/80 text-slate-400 hover:text-indigo-600'}`}
              >
                <X size={18} />
              </button>
            )}
            
            {/* Animated Bottom Line */}
            <div className={`absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-transparent via-indigo-600 to-transparent w-full transition-transform duration-1000 ${isFocused ? 'scale-x-100' : 'scale-x-0'}`} />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="flex-1 z-10 pb-20">
        <div className="space-y-5">
          {searchResults.map((result, idx) => (
            <div 
              key={result.id} 
              className={`group relative p-6 backdrop-blur-md rounded-[2.5rem] border flex items-center justify-between animate-in slide-in-from-bottom-8 duration-700 fill-mode-both hover:-translate-y-2 transition-all duration-500 ease-out shadow-lg ${isDarkMode ? 'bg-slate-900/60 border-slate-800 hover:bg-slate-900 hover:border-indigo-900' : 'bg-white/80 border-white hover:bg-white hover:border-indigo-50'}`}
              style={{ 
                animationDelay: `${idx * 150}ms`,
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="flex items-center gap-6 relative" style={{ transform: 'translateZ(30px)' }}>
                <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center shadow-inner transition-all duration-500 overflow-hidden relative ${isDarkMode ? 'bg-slate-800 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white' : 'bg-slate-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'}`}>
                   <div className="relative z-10 flex flex-col items-center">
                    <span className="text-[9px] font-black uppercase leading-none opacity-60">Sem</span>
                    <span className="text-xl font-black leading-tight tracking-tighter">{result.semester}</span>
                   </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className={`font-black uppercase text-lg tracking-tight group-hover:text-indigo-500 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{result.vehicleNumber}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className={`text-xs font-bold uppercase tracking-wide transition-colors ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>{result.name}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{result.department}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleCall(result.phone, result.name)}
                className="relative w-16 h-16 bg-emerald-500 text-white rounded-3xl active:scale-90 hover:bg-emerald-600 hover:shadow-[0_15px_30px_rgba(16,185,129,0.4)] transition-all duration-300 flex items-center justify-center overflow-hidden"
                style={{ transform: 'translateZ(50px)' }}
              >
                <Phone size={28} fill="currentColor" />
              </button>
            </div>
          ))}

          {isSearching && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="relative w-16 h-16">
                <div className={`absolute inset-0 border-4 rounded-full transition-colors ${isDarkMode ? 'border-slate-800' : 'border-indigo-100'}`} />
                <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-500 animate-pulse">Syncing Network</p>
            </div>
          )}

          {searchQuery && searchResults.length === 0 && !isSearching && (
            <div className="text-center py-24 animate-in fade-in zoom-in-95 duration-700">
              <div className={`w-24 h-24 rounded-[3rem] flex items-center justify-center mx-auto mb-8 shadow-xl relative overflow-hidden transition-colors ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-white'}`}>
                <AlertCircle size={40} className={`relative z-10 transition-colors ${isDarkMode ? 'text-slate-700' : 'text-slate-300'}`} />
              </div>
              <h3 className={`font-black text-xl mb-2 tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>No Matches Found</h3>
              <p className="text-sm text-slate-500 font-medium px-12 leading-relaxed">Ensure the plate number is exactly as registered on the student portal.</p>
            </div>
          )}

          {!searchQuery && (
             <div className="text-center py-20 animate-in fade-in slide-in-from-bottom-12 duration-1000">
               <div className="relative w-32 h-32 mx-auto mb-10">
                  <div className={`absolute inset-0 rounded-[3.5rem] rotate-[8deg] opacity-10 animate-pulse transition-colors ${isDarkMode ? 'bg-indigo-400' : 'bg-indigo-600'}`} />
                  <div className={`absolute inset-0 rounded-[3.5rem] -rotate-[4deg] opacity-10 transition-colors ${isDarkMode ? 'bg-indigo-400' : 'bg-indigo-600'}`} />
                  <div className={`relative w-full h-full rounded-[3.5rem] flex items-center justify-center transition-all border ${isDarkMode ? 'bg-slate-900 border-slate-800 text-indigo-900' : 'bg-white border-white text-indigo-100'}`}>
                    <Search size={56} />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg animate-bounce duration-[3000ms]">
                    <ShieldCheck size={24} />
                  </div>
               </div>
               <h3 className={`font-black text-2xl mb-3 tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Ready to Search</h3>
               <p className="text-sm text-slate-500 px-14 font-medium leading-relaxed">Enter a student's vehicle number to clear your way instantly.</p>
             </div>
          )}
        </div>
      </div>

      {/* DARK MODE TOGGLE - Bottom Docked */}
      <div className="sticky bottom-4 w-full flex justify-center z-50">
        <button 
          onClick={toggleDarkMode}
          className={`px-8 py-4 rounded-[2rem] flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl transform active:scale-95 transition-all duration-500 border-2 ${isDarkMode ? 'bg-slate-900 border-indigo-900 text-indigo-400' : 'bg-white border-white text-slate-500'}`}
        >
          {isDarkMode ? (
            <>
              <Sun size={18} className="animate-spin-slow" />
              Switch to Light Mode
            </>
          ) : (
            <>
              <Moon size={18} />
              Switch to Dark Mode
            </>
          )}
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}} />
    </div>
  );
};

export default Home;

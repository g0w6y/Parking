
import React, { useState, useEffect } from 'react';
import { UserProfile, ActivityLog, AppRoute } from '../types';
import { STORAGE_KEYS } from '../constants';
import { Search, Phone, MessageCircle, AlertCircle, User, X, Loader2, Info } from 'lucide-react';
import { getParkingAssistantResponse } from '../services/geminiService';

interface HomeProps {
  user: UserProfile;
  navigateTo: (route: AppRoute) => void;
}

const Home: React.FC<HomeProps> = ({ user, navigateTo }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

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
    
    // Simple filter
    const results = allUsers.filter(u => 
      u.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(results);
    setIsSearching(false);

    // Log the search action
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

  const askAi = async () => {
    if (!searchQuery) return;
    setIsLoadingAi(true);
    const response = await getParkingAssistantResponse(searchQuery, { 
      currentUser: user,
      activity: "Searching for owner"
    });
    setAiResponse(response);
    setIsLoadingAi(false);
    logActivity('AI_CONSULT', `Asked AI about: ${searchQuery}`);
  };

  const handleCall = (phone: string, resultName: string) => {
    logActivity('CALL_ACTION', `Attempted to call owner: ${resultName}`);
    window.open(`tel:${phone}`);
  };

  return (
    <div className="flex-1 flex flex-col p-6 bg-slate-50 overflow-y-auto overflow-x-hidden relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div className="animate-in fade-in slide-in-from-left-4 duration-500">
          <h1 className="text-3xl font-black text-indigo-600 tracking-tight">Garvasis</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Parking Portal</p>
        </div>
        <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="text-right hidden xs:block">
            <p className="text-xs font-bold text-slate-700">{user.name}</p>
            <p className="text-[9px] text-slate-400 font-medium">{user.semester} • {user.department}</p>
          </div>
          <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
            <User size={24} />
          </div>
        </div>
      </div>

      {/* Hero Search Area */}
      <div className="mb-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-800 mb-1">Find Vehicle Owner</h2>
          <p className="text-xs text-slate-400 font-medium">Is a vehicle blocking your way? Search here.</p>
        </div>

        <div className="relative group z-10">
          <div className="absolute inset-0 bg-indigo-400 rounded-3xl blur-2xl opacity-10 group-focus-within:opacity-20 transition-opacity" />
          <div className="relative flex items-center bg-white rounded-[1.5rem] px-6 border-none shadow-xl shadow-slate-200/50 focus-within:ring-2 focus-within:ring-indigo-600 transition-all duration-300">
            <Search className={`text-slate-300 transition-colors ${searchQuery ? 'text-indigo-600' : ''}`} size={22} />
            <input
              type="text"
              placeholder="Search Plate Number..."
              className="w-full py-6 pl-4 pr-10 bg-transparent outline-none text-base font-semibold text-slate-700 placeholder:text-slate-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => {setSearchQuery(''); setSearchResults([]); setAiResponse(null);}}
                className="absolute right-6 p-1 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
        
        <div className="mt-4 flex gap-2">
          <button 
            onClick={askAi}
            disabled={!searchQuery || isLoadingAi}
            className="flex-1 py-3.5 text-xs font-bold text-indigo-600 bg-indigo-50 rounded-2xl border border-indigo-100 hover:bg-indigo-100 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {isLoadingAi ? <Loader2 size={16} className="animate-spin" /> : <MessageCircle size={16} />}
            AI Assistant Help
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="flex-1">
        {aiResponse && (
          <div className="p-5 bg-indigo-600 rounded-3xl mb-6 shadow-xl shadow-indigo-100 animate-in zoom-in-95 duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-20"><Info size={40} className="text-white" /></div>
            <p className="text-xs text-indigo-50 font-medium leading-relaxed italic pr-8">"{aiResponse}"</p>
          </div>
        )}

        <div className="space-y-4">
          {searchResults.map((result, idx) => (
            <div 
              key={result.id} 
              className="p-5 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between animate-in slide-in-from-bottom-4 duration-500 fill-mode-both"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-indigo-600 text-xs uppercase">
                  {result.semester}
                </div>
                <div>
                  <p className="font-black text-slate-800 uppercase text-sm tracking-tight">{result.vehicleNumber}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{result.name} • {result.department}</p>
                </div>
              </div>
              <button
                onClick={() => handleCall(result.phone, result.name)}
                className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl active:scale-90 hover:bg-emerald-100 transition-all"
              >
                <Phone size={22} fill="currentColor" />
              </button>
            </div>
          ))}

          {isSearching && (
            <div className="flex flex-col items-center justify-center py-10 gap-3 opacity-30">
              <Loader2 size={32} className="animate-spin text-slate-400" />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Searching...</p>
            </div>
          )}

          {searchQuery && searchResults.length === 0 && !isSearching && !aiResponse && (
            <div className="text-center py-16 animate-in fade-in duration-500">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <AlertCircle size={32} />
              </div>
              <p className="text-sm font-bold text-slate-400">No vehicle found.</p>
              <p className="text-xs text-slate-300">Check the plate number again.</p>
            </div>
          )}

          {!searchQuery && !aiResponse && (
             <div className="text-center py-20 animate-in fade-in duration-700">
               <div className="w-20 h-20 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 text-indigo-200">
                 <Search size={40} />
               </div>
               <h3 className="text-slate-800 font-bold mb-1">Ready to search</h3>
               <p className="text-xs text-slate-400 px-10">Enter a vehicle number to find the owner's contact info immediately.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

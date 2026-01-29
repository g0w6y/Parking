
import React, { useState, useEffect } from 'react';
// Removed non-existent ParkingLog member from import as it is not exported by types.ts nor used in this file.
import { AppRoute, UserProfile } from './types';
import { STORAGE_KEYS } from './constants';
import Home from './pages/Home';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.HOME);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Load local storage data
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedAdmin = localStorage.getItem(STORAGE_KEYS.IS_ADMIN);
    if (savedAdmin === 'true') {
      setIsAdmin(true);
    }

    // Handle initial hash routing for admin access
    const hash = window.location.hash.replace('#', '');
    if (hash === AppRoute.ADMIN_LOGIN) {
      setCurrentRoute(AppRoute.ADMIN_LOGIN);
    }
  }, []);

  const navigateTo = (route: AppRoute) => {
    setCurrentRoute(route);
    window.location.hash = route;
  };

  const handleRegister = (newUser: UserProfile) => {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(newUser));
    setUser(newUser);
    navigateTo(AppRoute.HOME);
  };

  const handleAdminLogin = () => {
    localStorage.setItem(STORAGE_KEYS.IS_ADMIN, 'true');
    setIsAdmin(true);
    navigateTo(AppRoute.ADMIN_DASHBOARD);
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.IS_ADMIN);
    setIsAdmin(false);
    navigateTo(AppRoute.HOME);
  };

  const renderRoute = () => {
    if (!user && currentRoute !== AppRoute.ADMIN_LOGIN && currentRoute !== AppRoute.ADMIN_DASHBOARD) {
      return <Register onRegister={handleRegister} />;
    }

    switch (currentRoute) {
      case AppRoute.ADMIN_LOGIN:
        return <AdminLogin onLogin={handleAdminLogin} />;
      case AppRoute.ADMIN_DASHBOARD:
        return isAdmin ? <AdminDashboard onLogout={handleLogout} /> : <AdminLogin onLogin={handleAdminLogin} />;
      case AppRoute.REGISTER:
        return <Register onRegister={handleRegister} />;
      case AppRoute.HOME:
      default:
        return user ? <Home user={user} navigateTo={navigateTo} /> : <Register onRegister={handleRegister} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white shadow-xl relative overflow-hidden">
      {renderRoute()}
      
      <footer className="py-4 text-center text-[10px] text-slate-400 border-t border-slate-100 bg-white">
        Powered By Garvasis | S2 IMCA2030
      </footer>
    </div>
  );
};

export default App;

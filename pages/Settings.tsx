import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Moon, Sun, Globe, Bell, Shield } from 'lucide-react';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Appearance</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Customize how PrimeFlow looks on your device.</p>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Dark Mode</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Reduce eye strain in low-light environments</p>
              </div>
            </div>
            
            <button 
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${theme === 'dark' ? 'bg-blue-600' : 'bg-slate-200'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">General Preferences</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage your system preferences.</p>
        </div>
        
        <div className="divide-y divide-slate-100 dark:divide-slate-700">
          <div className="p-6 flex items-center justify-between opacity-50 cursor-not-allowed">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-400">
                <Globe size={20} />
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Language</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">English (US)</p>
              </div>
            </div>
            <span className="text-sm text-slate-400">Fixed</span>
          </div>

          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
                <Bell size={20} />
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Notifications</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Email alerts for low stock</p>
              </div>
            </div>
             <button className="text-blue-600 font-medium text-sm hover:underline">Configure</button>
          </div>

          {user?.role === 'ADMIN' && (
             <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
                    <Shield size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">System Logs</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">View activity history</p>
                  </div>
                </div>
                 <button className="text-blue-600 font-medium text-sm hover:underline">View Logs</button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
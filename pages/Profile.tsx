import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Calendar } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Profile</h1>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <img 
              src={user?.avatar} 
              alt={user?.name} 
              className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 object-cover shadow-lg bg-white"
            />
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-bold border border-blue-200 dark:border-blue-800">
              {user?.role}
            </span>
          </div>

          <div className="space-y-1 mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{user?.name}</h2>
            <p className="text-slate-500 dark:text-slate-400">Product Management Team</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-white dark:bg-slate-700 rounded-lg shadow-sm text-blue-500">
                  <Mail size={20} />
                </div>
                <div>
                   <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Email Address</p>
                   <p className="text-slate-900 dark:text-white font-medium">{user?.email}</p>
                </div>
             </div>

             <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-white dark:bg-slate-700 rounded-lg shadow-sm text-purple-500">
                  <Shield size={20} />
                </div>
                <div>
                   <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Access Level</p>
                   <p className="text-slate-900 dark:text-white font-medium">{user?.role}</p>
                </div>
             </div>

             <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-white dark:bg-slate-700 rounded-lg shadow-sm text-emerald-500">
                  <Calendar size={20} />
                </div>
                <div>
                   <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Member Since</p>
                   <p className="text-slate-900 dark:text-white font-medium">October 2023</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
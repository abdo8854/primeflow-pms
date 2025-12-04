import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User, ArrowRight } from 'lucide-react';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('admin@primeflow.com');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isRegistering) {
      if (!name || !email) {
        setError('Please fill all fields');
        return;
      }
      register(name, email);
      setIsRegistering(false);
      setError('Account created! Please login.');
      return;
    }

    if (login(email)) {
      navigate('/');
    } else {
      setError('Invalid credentials. Try admin@primeflow.com');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden z-10">
        <div className="p-8 text-center border-b border-white/10">
          <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-xl mx-auto flex items-center justify-center mb-4 shadow-lg">
             <span className="font-bold text-2xl text-white">P</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">PrimeFlow PMS</h1>
          <p className="text-blue-200">Enterprise Resource Planning</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && <div className={`p-3 rounded-lg text-sm text-center ${error.includes('created') ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>{error}</div>}
          
          {isRegistering && (
             <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-slate-500 transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-slate-500 transition-all"
                placeholder="name@company.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="password" 
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-slate-500 transition-all"
                placeholder="••••••••"
                defaultValue="password" 
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
            {isRegistering ? 'Create Account' : 'Sign In'} <ArrowRight size={18} />
          </button>
          
          <div className="text-center">
            <button type="button" onClick={() => setIsRegistering(!isRegistering)} className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
              {isRegistering ? 'Already have an account? Sign In' : "Don't have an account? Register"}
            </button>
          </div>
          
          {!isRegistering && (
            <div className="text-center text-xs text-slate-500 mt-4 border-t border-white/10 pt-4">
              <p>Demo Accounts:</p>
              <div className="flex justify-center gap-2 mt-1">
                 <button type="button" onClick={() => setEmail('admin@primeflow.com')} className="hover:text-blue-400">Admin</button>
                 <span>•</span>
                 <button type="button" onClick={() => setEmail('manager@primeflow.com')} className="hover:text-blue-400">Manager</button>
                 <span>•</span>
                 <button type="button" onClick={() => setEmail('staff@primeflow.com')} className="hover:text-blue-400">Staff</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
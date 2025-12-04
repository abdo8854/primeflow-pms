import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, 
  BarChart2, Settings, LogOut, PackageSearch,
  Menu, X, User as UserIcon
} from 'lucide-react';

const SidebarItem = ({ to, icon: Icon, label, active, onClick }: any) => (
  <Link 
    to={to} 
    onClick={onClick}
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      active 
        ? 'bg-blue-600 text-white' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;

  const isAdmin = user?.role === 'ADMIN';

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden transition-colors">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="font-bold text-lg text-white">P</span>
            </div>
            <span className="text-xl font-bold tracking-tight">PrimeFlow</span>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-80px)]">
          <SidebarItem to="/" icon={LayoutDashboard} label="Dashboard" active={isActive('/')} onClick={() => setMobileMenuOpen(false)} />
          <SidebarItem to="/products" icon={Package} label="Products" active={isActive('/products')} onClick={() => setMobileMenuOpen(false)} />
          <SidebarItem to="/orders" icon={ShoppingCart} label="Orders" active={isActive('/orders')} onClick={() => setMobileMenuOpen(false)} />
          <SidebarItem to="/inventory" icon={PackageSearch} label="Inventory" active={isActive('/inventory')} onClick={() => setMobileMenuOpen(false)} />
          <SidebarItem to="/suppliers" icon={Users} label="Suppliers" active={isActive('/suppliers')} onClick={() => setMobileMenuOpen(false)} />
          
          {isAdmin && (
            <SidebarItem to="/users" icon={UserIcon} label="Users" active={isActive('/users')} onClick={() => setMobileMenuOpen(false)} />
          )}

          <SidebarItem to="/reports" icon={BarChart2} label="Reports" active={isActive('/reports')} onClick={() => setMobileMenuOpen(false)} />
          <SidebarItem to="/settings" icon={Settings} label="Settings" active={isActive('/settings')} onClick={() => setMobileMenuOpen(false)} />
          
          <div className="pt-8 border-t border-slate-800 mt-4">
             <SidebarItem to="/profile" icon={UserIcon} label="My Profile" active={isActive('/profile')} onClick={() => setMobileMenuOpen(false)} />
            <button 
              onClick={logout}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-slate-800 hover:text-red-300 w-full transition-colors mt-2"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 shadow-sm z-10 transition-colors">
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-slate-500 dark:text-slate-400">
            <Menu size={24} />
          </button>

          <div className="flex items-center space-x-4 ml-auto">
             <div className="text-right hidden sm:block">
               <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{user?.name}</p>
               <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user?.role?.toLowerCase()}</p>
             </div>
             <Link to="/profile">
               <img 
                 src={user?.avatar} 
                 alt="Profile" 
                 className="w-10 h-10 rounded-full border-2 border-slate-200 dark:border-slate-600 object-cover hover:border-blue-500 transition-colors" 
               />
             </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-900 p-6 transition-colors">
          <div className="max-w-7xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
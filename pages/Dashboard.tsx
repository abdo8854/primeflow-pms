import React from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { DollarSign, ShoppingBag, AlertTriangle, Box, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const StatCard = ({ title, value, icon: Icon, color, subValue }: any) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-start justify-between transition-colors">
    <div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</h3>
      {subValue && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{subValue}</p>}
    </div>
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon className="text-white" size={24} />
    </div>
  </div>
);

const Dashboard = () => {
  const { products, orders, isLoading } = useData();
  const { user } = useAuth();

  if (isLoading) return <div className="p-8 text-center text-slate-500 dark:text-slate-400">Loading dashboard...</div>;

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const lowStockProducts = products.filter(p => p.stockQuantity <= p.lowStockThreshold);
  const activeProducts = products.filter(p => p.status === 'ACTIVE').length;
  
  // Data for charts
  const revenueData = orders.slice(0, 7).map(o => ({
    name: new Date(o.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    amount: o.totalAmount
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">Welcome back, {user?.name}</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
           <TrendingUp size={16} />
           <span>System Operational</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} icon={DollarSign} color="bg-emerald-500" />
        <StatCard title="Total Orders" value={orders.length} icon={ShoppingBag} color="bg-blue-500" />
        <StatCard title="Low Stock Alerts" value={lowStockProducts.length} icon={AlertTriangle} color="bg-amber-500" subValue="Items needing attention" />
        <StatCard title="Active Products" value={activeProducts} icon={Box} color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Recent Revenue Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.3} />
                <XAxis dataKey="name" fontSize={12} stroke="#64748b" />
                <YAxis fontSize={12} stroke="#64748b" />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                   itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Stock Overview</h3>
           <div className="h-64 overflow-y-auto custom-scrollbar">
             <table className="w-full text-sm text-left">
               <thead className="bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-300 sticky top-0">
                 <tr>
                   <th className="px-4 py-2 rounded-l-lg">Product</th>
                   <th className="px-4 py-2">Stock</th>
                   <th className="px-4 py-2 rounded-r-lg">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                 {products.slice(0, 5).map(p => (
                   <tr key={p.id} className="border-b border-slate-50 last:border-0 dark:border-slate-700">
                     <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-200">{p.name}</td>
                     <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{p.stockQuantity}</td>
                     <td className="px-4 py-3">
                       <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                         p.stockQuantity <= p.lowStockThreshold 
                           ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' 
                           : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                       }`}>
                         {p.stockQuantity <= p.lowStockThreshold ? 'Low' : 'OK'}
                       </span>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React from 'react';
import { useData } from '../context/DataContext';
import { AlertTriangle, PackageCheck } from 'lucide-react';

const Inventory = () => {
  const { products } = useData();

  const lowStock = products.filter(p => p.stockQuantity <= p.lowStockThreshold);
  const goodStock = products.filter(p => p.stockQuantity > p.lowStockThreshold);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Inventory Management</h1>

      {lowStock.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-start gap-4 transition-colors">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg text-amber-600 dark:text-amber-400">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="font-bold text-amber-900 dark:text-amber-400">Low Stock Alert</h3>
            <p className="text-amber-800 dark:text-amber-500 text-sm">There are {lowStock.length} items below the stock threshold level. Please restock soon.</p>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Product</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Code</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Current Stock</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Value</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {[...lowStock, ...goodStock].map(product => (
                <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900 dark:text-white">{product.name}</td>
                  <td className="p-4 text-slate-500 dark:text-slate-400">{product.code}</td>
                  <td className="p-4 font-mono text-slate-700 dark:text-slate-300">{product.stockQuantity} / {product.lowStockThreshold}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">${(product.price * product.stockQuantity).toLocaleString()}</td>
                  <td className="p-4">
                     <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                       product.stockQuantity <= product.lowStockThreshold 
                       ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' 
                       : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                     }`}>
                       {product.stockQuantity <= product.lowStockThreshold ? <AlertTriangle size={12}/> : <PackageCheck size={12}/>}
                       {product.stockQuantity <= product.lowStockThreshold ? 'Low Stock' : 'In Stock'}
                     </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
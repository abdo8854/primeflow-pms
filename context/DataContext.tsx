import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, Supplier, Order, ActivityLog, User } from '../types';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_SUPPLIERS, MOCK_ORDERS } from '../services/mockData';

interface DataContextType {
  products: Product[];
  categories: Category[];
  suppliers: Supplier[];
  orders: Order[];
  logs: ActivityLog[];
  addProduct: (product: Product, user: User) => void;
  updateProduct: (product: Product, user: User) => void;
  deleteProduct: (id: string, user: User) => void;
  addOrder: (order: Order, user: User) => void;
  updateOrderStatus: (id: string, status: any, user: User) => void;
  addCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from local storage or fallback to mock data
  useEffect(() => {
    const loadData = () => {
      try {
        const storedProds = localStorage.getItem('primeflow_products');
        const storedCats = localStorage.getItem('primeflow_categories');
        const storedSups = localStorage.getItem('primeflow_suppliers');
        const storedOrds = localStorage.getItem('primeflow_orders');
        const storedLogs = localStorage.getItem('primeflow_logs');

        setProducts(storedProds ? JSON.parse(storedProds) : MOCK_PRODUCTS);
        setCategories(storedCats ? JSON.parse(storedCats) : MOCK_CATEGORIES);
        setSuppliers(storedSups ? JSON.parse(storedSups) : MOCK_SUPPLIERS);
        setOrders(storedOrds ? JSON.parse(storedOrds) : MOCK_ORDERS);
        setLogs(storedLogs ? JSON.parse(storedLogs) : []);
      } catch (error) {
        console.error("Failed to load data", error);
        // Fallback to mocks if error
        setProducts(MOCK_PRODUCTS);
        setCategories(MOCK_CATEGORIES);
        setSuppliers(MOCK_SUPPLIERS);
        setOrders(MOCK_ORDERS);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Persistence Helper
  const save = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const addLog = (action: string, entity: string, entityId: string, user: User) => {
    const newLog: ActivityLog = {
      id: Date.now().toString(),
      action,
      entity,
      entityId,
      userId: user.id,
      userName: user.name,
      timestamp: new Date().toISOString()
    };
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    save('primeflow_logs', updatedLogs);
  };

  const addProduct = (product: Product, user: User) => {
    const updated = [...products, product];
    setProducts(updated);
    save('primeflow_products', updated);
    addLog('Created', 'Product', product.name, user);
  };

  const updateProduct = (product: Product, user: User) => {
    const updated = products.map(p => p.id === product.id ? product : p);
    setProducts(updated);
    save('primeflow_products', updated);
    addLog('Updated', 'Product', product.name, user);
  };

  const deleteProduct = (id: string, user: User) => {
    const prodName = products.find(p => p.id === id)?.name || id;
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    save('primeflow_products', updated);
    addLog('Deleted', 'Product', prodName, user);
  };

  const addOrder = (order: Order, user: User) => {
    const updated = [order, ...orders];
    setOrders(updated);
    save('primeflow_orders', updated);
    addLog('Created', 'Order', order.id, user);

    // Deduct stock on new order
    const newProducts = [...products];
    order.items.forEach(item => {
      const pIndex = newProducts.findIndex(p => p.id === item.productId);
      if (pIndex > -1) {
        newProducts[pIndex].stockQuantity = Math.max(0, newProducts[pIndex].stockQuantity - item.quantity);
      }
    });
    setProducts(newProducts);
    save('primeflow_products', newProducts);
  };

  const updateOrderStatus = (id: string, status: any, user: User) => {
    const updated = orders.map(o => o.id === id ? { ...o, status } : o);
    setOrders(updated);
    save('primeflow_orders', updated);
    addLog(`Status changed to ${status}`, 'Order', id, user);
  };

  const addCategory = (category: Category) => {
    const updated = [...categories, category];
    setCategories(updated);
    save('primeflow_categories', updated);
  };

  const deleteCategory = (id: string) => {
    const updated = categories.filter(c => c.id !== id);
    setCategories(updated);
    save('primeflow_categories', updated);
  };

  return (
    <DataContext.Provider value={{
      products, categories, suppliers, orders, logs,
      addProduct, updateProduct, deleteProduct,
      addOrder, updateOrderStatus,
      addCategory, deleteCategory,
      isLoading
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within DataProvider");
  return context;
};
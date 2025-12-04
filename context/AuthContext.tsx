import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { MOCK_USERS } from '../services/mockData';

interface AuthContextType {
  user: User | null;
  usersList: User[];
  login: (email: string) => boolean;
  logout: () => void;
  register: (name: string, email: string) => void;
  deleteUser: (id: string) => void;
  updateUserRole: (id: string, role: UserRole) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [usersList, setUsersList] = useState<User[]>([]);

  useEffect(() => {
    // Initialize users list
    const storedUsers = localStorage.getItem('primeflow_users_list');
    if (storedUsers) {
      setUsersList(JSON.parse(storedUsers));
    } else {
      setUsersList(MOCK_USERS);
      localStorage.setItem('primeflow_users_list', JSON.stringify(MOCK_USERS));
    }

    // Initialize current user
    const storedUser = localStorage.getItem('primeflow_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const saveUsers = (newList: User[]) => {
    setUsersList(newList);
    localStorage.setItem('primeflow_users_list', JSON.stringify(newList));
  };

  const login = (email: string) => {
    const foundUser = usersList.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('primeflow_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('primeflow_user');
  };

  const register = (name: string, email: string) => {
    if (usersList.some(u => u.email === email)) return; // Prevent duplicates

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: UserRole.STAFF, // Default role
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
    };
    
    const updatedList = [...usersList, newUser];
    saveUsers(updatedList);
  };

  const deleteUser = (id: string) => {
    const updatedList = usersList.filter(u => u.id !== id);
    saveUsers(updatedList);
    // If self-delete (rare but possible), logout
    if (user?.id === id) logout();
  };

  const updateUserRole = (id: string, role: UserRole) => {
    const updatedList = usersList.map(u => u.id === id ? { ...u, role } : u);
    saveUsers(updatedList);
  };

  return (
    <AuthContext.Provider value={{ user, usersList, login, logout, register, deleteUser, updateUserRole, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
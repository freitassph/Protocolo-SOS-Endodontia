import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ViewState } from '../types';

interface AppContextType {
  currentView: ViewState;
  selectedProtocolId: string | null;
  isDark: boolean;
  checkedItems: Record<string, boolean>;
  isSearchOpen: boolean;
  navigate: (view: ViewState, protocolId?: string) => void;
  toggleTheme: () => void;
  toggleCheck: (id: string) => void;
  resetChecks: () => void;
  toggleSearch: (isOpen?: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // --- Theme State (Persisted) ---
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  // --- Navigation State ---
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProtocolId, setSelectedProtocolId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // --- Checklist State (Persisted) ---
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('checkedItems');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  // --- Effects ---
  
  // Apply Theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Save Checklists
  useEffect(() => {
    localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
  }, [checkedItems]);

  // --- Actions ---

  const navigate = (view: ViewState, protocolId?: string) => {
    if (protocolId) setSelectedProtocolId(protocolId);
    setCurrentView(view);
    setIsSearchOpen(false);
    window.scrollTo(0, 0);
  };

  const toggleTheme = () => setIsDark(prev => !prev);

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const resetChecks = () => setCheckedItems({});

  const toggleSearch = (isOpen?: boolean) => {
    setIsSearchOpen(prev => isOpen !== undefined ? isOpen : !prev);
  };

  return (
    <AppContext.Provider value={{
      currentView,
      selectedProtocolId,
      isDark,
      checkedItems,
      isSearchOpen,
      navigate,
      toggleTheme,
      toggleCheck,
      resetChecks,
      toggleSearch
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
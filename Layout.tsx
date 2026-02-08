import React, { useState } from 'react';
import { Home, Activity, FileText, MessageSquare, Menu, X, Moon, Sun, Search, Book, Compass } from 'lucide-react';
import { ViewState } from './types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  isDark: boolean;
  toggleTheme: () => void;
  onSearch: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onChangeView, isDark, toggleTheme, onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'manifesto', label: 'Sobre o Guia', icon: Compass },
    { id: 'diagnosis', label: 'Diagnóstico', icon: Activity },
    { id: 'protocols', label: 'Protocolos', icon: FileText },
    { id: 'prescriptions', label: 'Prescrições', icon: FileText },
    { id: 'scripts', label: 'Scripts', icon: MessageSquare },
    { id: 'references', label: 'Ferramentas & FAQ', icon: Book },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 fixed h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 z-50">
        <div className="p-6">
          <div className="font-bold text-xl text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-primary-900 font-serif font-black text-lg">S</div>
            SOS Endo
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id as ViewState)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentView === item.id || (currentView === 'protocol-detail' && item.id === 'protocols')
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-900 dark:text-primary-100 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <item.icon className={`w-5 h-5 ${currentView === item.id ? 'text-accent-500' : 'text-slate-400'}`} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
           <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
           </button>
           <button onClick={onSearch} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 text-xs font-bold border border-slate-200 dark:border-slate-700">
              CMD+K
           </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 h-16">
        <div className="font-bold text-lg text-slate-900 dark:text-white">SOS Endo</div>
        <div className="flex gap-2">
            <button onClick={onSearch} className="p-2">
                <Search className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
            {isMobileMenuOpen ? <X className="w-6 h-6 text-slate-900 dark:text-white" /> : <Menu className="w-6 h-6 text-slate-900 dark:text-white" />}
            </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white dark:bg-slate-950 pt-20 px-6">
           <nav className="space-y-4">
             {navItems.map((item) => (
                <button
                key={item.id}
                onClick={() => {
                    onChangeView(item.id as ViewState);
                    setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-4 py-4 border-b border-slate-100 dark:border-slate-800 text-lg font-medium text-slate-800 dark:text-slate-200"
                >
                <item.icon className="w-6 h-6 text-accent-500" />
                {item.label}
                </button>
             ))}
             <div className="flex items-center justify-between pt-4">
                <span className="text-slate-500">Tema Escuro</span>
                <button onClick={toggleTheme} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full">
                    {isDark ? <Sun className="w-6 h-6 text-amber-400" /> : <Moon className="w-6 h-6 text-slate-600" />}
                </button>
             </div>
           </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 w-full pt-20 md:pt-8 pb-24 md:pb-8">
         {children}
      </main>

      {/* Mobile Bottom Bar for Quick Access */}
      <div className="md:hidden fixed bottom-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-safe z-50 flex justify-around py-3">
          <button onClick={() => onChangeView('home')} className={`flex flex-col items-center gap-1 ${currentView === 'home' ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400'}`}>
              <Home className="w-6 h-6" />
              <span className="text-[10px] font-medium">Início</span>
          </button>
          <button onClick={() => onChangeView('diagnosis')} className={`flex flex-col items-center gap-1 ${currentView === 'diagnosis' ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400'}`}>
              <div className="bg-primary-600 dark:bg-primary-500 text-white p-2 rounded-full -mt-6 shadow-lg border-4 border-white dark:border-slate-900">
                  <Activity className="w-6 h-6" />
              </div>
          </button>
          <button onClick={() => onChangeView('protocols')} className={`flex flex-col items-center gap-1 ${currentView === 'protocols' ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400'}`}>
              <FileText className="w-6 h-6" />
              <span className="text-[10px] font-medium">Protocolos</span>
          </button>
      </div>
    </div>
  );
};
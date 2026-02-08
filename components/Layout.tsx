import React, { useState, useEffect } from 'react';
import { Home, Activity, FileText, MessageSquare, Menu, X, Moon, Sun, Search, Book, Compass, ChevronRight } from 'lucide-react';
import { ViewState } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentView, navigate, isDark, toggleTheme, toggleSearch } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when view changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentView]);

  const navItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'manifesto', label: 'Sobre o Guia', icon: Compass },
    { id: 'diagnosis', label: 'Diagnóstico', icon: Activity },
    { id: 'protocols', label: 'Protocolos', icon: FileText },
    { id: 'prescriptions', label: 'Prescrições', icon: FileText },
    { id: 'scripts', label: 'Scripts', icon: MessageSquare },
    { id: 'references', label: 'Ferramentas & FAQ', icon: Book },
  ];

  const SidebarItem: React.FC<{ item: typeof navItems[0], isMobile?: boolean }> = ({ item, isMobile = false }) => {
     const isActive = currentView === item.id || (item.id === 'protocols' && currentView === 'protocol-detail');
     return (
        <button
            onClick={() => navigate(item.id as ViewState)}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none touch-manipulation ${
            isActive
                ? 'bg-primary-50 dark:bg-primary-900/40 text-primary-900 dark:text-primary-100 shadow-sm border border-primary-100 dark:border-primary-800'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
        >
            <item.icon className={`w-5 h-5 ${isActive ? 'text-accent-500' : 'text-slate-400'}`} />
            <span className={isMobile ? 'text-base font-semibold' : ''}>{item.label}</span>
            {isMobile && <ChevronRight className="w-4 h-4 ml-auto text-slate-300 dark:text-slate-600" />}
        </button>
     );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 fixed h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 z-50">
        <div className="p-6">
          <div className="font-bold text-xl text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-primary-900 font-serif font-black text-lg shadow-lg shadow-primary-900/20">S</div>
            SOS Endo
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => <SidebarItem key={item.id} item={item} />)}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
           <button onClick={toggleTheme} className="p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400" aria-label="Toggle Theme">
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
           </button>
           <button onClick={() => toggleSearch(true)} className="flex-1 px-3 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 text-xs font-bold border border-slate-200 dark:border-slate-700 focus:outline-none flex justify-between items-center group">
              <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400">Busca</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-600 text-[10px] text-slate-400">⌘K</kbd>
           </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 h-[60px] pt-safe transition-all duration-300">
        <div className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2" onClick={() => navigate('home')}>
            <div className="w-7 h-7 bg-primary-900 dark:bg-white rounded-md flex items-center justify-center text-white dark:text-primary-900 font-serif font-black text-sm">S</div>
            <span>SOS Endo</span>
        </div>
        <div className="flex gap-1">
            <button onClick={() => toggleSearch(true)} className="p-2.5 rounded-full active:bg-slate-100 dark:active:bg-slate-800 transition-colors" aria-label="Search">
                <Search className="w-6 h-6 text-slate-600 dark:text-slate-300" />
            </button>
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2.5 rounded-full active:bg-slate-100 dark:active:bg-slate-800 transition-colors" aria-label="Menu">
                <Menu className="w-6 h-6 text-slate-900 dark:text-white" />
            </button>
        </div>
      </div>

      {/* Mobile Menu Drawer (Slide Over) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <>
                {/* Backdrop */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="md:hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm"
                />
                {/* Drawer */}
                <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    exit={{ x: '-100%' }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="md:hidden fixed inset-y-0 left-0 z-50 w-[85%] max-w-[300px] bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col"
                >
                    <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between pt-safe mt-2">
                         <div className="font-bold text-xl text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-primary-900 font-serif font-black text-lg">S</div>
                            SOS Endo
                        </div>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {navItems.map((item) => <SidebarItem key={item.id} item={item} isMobile />)}
                    </div>

                    <div className="p-5 border-t border-slate-200 dark:border-slate-800 pb-safe">
                        <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 p-4 rounded-xl">
                            <span className="text-slate-600 dark:text-slate-300 font-medium">Modo Escuro</span>
                            <button 
                                onClick={toggleTheme} 
                                className={`w-12 h-7 rounded-full transition-colors relative ${isDark ? 'bg-primary-900' : 'bg-slate-300'}`}
                            >
                                <motion.div 
                                    animate={{ x: isDark ? 22 : 2 }}
                                    className="absolute top-1 left-0 w-5 h-5 bg-white rounded-full shadow-sm flex items-center justify-center"
                                >
                                    {isDark ? <Moon className="w-3 h-3 text-primary-900" /> : <Sun className="w-3 h-3 text-amber-500" />}
                                </motion.div>
                            </button>
                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-xs text-slate-400">Versão 1.0 Mobile • @SOS_Endo</p>
                        </div>
                    </div>
                </motion.div>
            </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 w-full pt-[60px] md:pt-8 pb-[80px] md:pb-8 min-h-screen">
         {children}
      </main>

      {/* Mobile Bottom Bar - Floating above Safe Area */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 z-40 pb-safe transition-all duration-300 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div className="flex justify-around items-center h-[60px]">
              <NavIcon 
                icon={Home} 
                label="Início" 
                isActive={currentView === 'home'} 
                onClick={() => navigate('home')} 
              />
              <NavIcon 
                icon={Activity} 
                label="Diagnóstico" 
                isActive={currentView === 'diagnosis'} 
                onClick={() => navigate('diagnosis')}
                isSpecial
              />
              <NavIcon 
                icon={FileText} 
                label="Protocolos" 
                isActive={currentView === 'protocols' || currentView === 'protocol-detail'} 
                onClick={() => navigate('protocols')} 
              />
          </div>
      </div>
    </div>
  );
};

const NavIcon = ({ icon: Icon, label, isActive, onClick, isSpecial }: any) => {
    return (
        <button 
            onClick={onClick} 
            className={`relative flex flex-col items-center justify-center w-full h-full touch-manipulation active:scale-95 transition-transform ${isSpecial ? '-mt-6' : ''}`}
        >
            {isSpecial ? (
                <div className="relative">
                    <div className={`absolute inset-0 rounded-full blur-md ${isActive ? 'bg-accent-500/50' : 'bg-primary-900/30 dark:bg-white/10'}`} />
                    <div className={`relative w-14 h-14 rounded-full flex items-center justify-center border-4 border-slate-50 dark:border-slate-950 shadow-xl ${isActive ? 'bg-accent-500 text-white' : 'bg-primary-900 dark:bg-white text-white dark:text-primary-900'}`}>
                        <Icon className="w-7 h-7" />
                    </div>
                </div>
            ) : (
                <>
                    <div className={`p-1.5 rounded-xl transition-colors ${isActive ? 'bg-primary-50 dark:bg-primary-900/40 text-primary-900 dark:text-primary-100' : 'text-slate-400 dark:text-slate-500'}`}>
                        <Icon className={`w-6 h-6 stroke-[2px]`} />
                    </div>
                    <span className={`text-[10px] font-bold mt-1 ${isActive ? 'text-primary-900 dark:text-primary-100' : 'text-slate-400'}`}>
                        {label}
                    </span>
                </>
            )}
        </button>
    )
}
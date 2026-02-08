import React, { useState, useEffect, useMemo } from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { DiagnosisWizard } from './components/DiagnosisWizard';
import { ProtocolView } from './components/ProtocolView';
import { PrescriptionList } from './components/PrescriptionList';
import { ScriptList } from './components/ScriptList';
import { ReferenceView } from './components/ReferenceView';
import { ManifestoView } from './components/ManifestoView';
import { PROTOCOLS, PRESCRIPTIONS, FAQS } from './data';
import { AppProvider, useApp } from './context/AppContext';
import { ToastProvider } from './hooks/useToast';
import { Card } from './components/ui/Card';
import { Activity, Pill, HelpCircle, ChevronRight, Search } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Global Search Component
const SearchOverlay = () => {
    const { isSearchOpen, toggleSearch, navigate } = useApp();
    const [query, setQuery] = useState('');

    const filteredResults = useMemo(() => {
        if (!query || query.length < 2) return [];
        const lowerQ = query.toLowerCase();
        
        const protocols = PROTOCOLS.filter(p => 
            p.title.toLowerCase().includes(lowerQ) || 
            p.description.toLowerCase().includes(lowerQ)
        ).map(p => ({ type: 'Protocolo', label: p.title, id: p.id, target: 'protocol' }));

        const prescriptions = PRESCRIPTIONS.filter(p => 
            p.title.toLowerCase().includes(lowerQ) || 
            p.condition.toLowerCase().includes(lowerQ) ||
            p.medications.some(m => m.name.toLowerCase().includes(lowerQ))
        ).map(p => ({ type: 'Prescrição', label: p.title, id: 'prescriptions', target: 'view' }));

        const faqs = FAQS.filter(f => 
            f.question.toLowerCase().includes(lowerQ) || 
            f.answer.toLowerCase().includes(lowerQ)
        ).map(f => ({ type: 'FAQ', label: f.question, id: 'faq', target: 'view' }));

        return [...protocols, ...prescriptions, ...faqs].slice(0, 6);
    }, [query]);

    useEffect(() => {
        if (isSearchOpen) setQuery('');
    }, [isSearchOpen]);

    // Handle Keyboard Shortcut inside the component to toggle visibility logic globally
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
          if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            toggleSearch();
          }
          if (e.key === 'Escape') toggleSearch(false);
        }
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [toggleSearch]);

    if (!isSearchOpen) return null;

    const handleSelect = (item: any) => {
        if (item.id === 'prescriptions') navigate('prescriptions');
        else if (item.id === 'faq') navigate('faq');
        else if (item.id.startsWith('p')) navigate('protocol-detail', item.id);
        else navigate('home');
    };

    return (
        <div className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4 transition-all duration-200" onClick={() => toggleSearch(false)}>
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-xl bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 flex flex-col max-h-[70vh]" 
                onClick={e => e.stopPropagation()}
            >
                <div className="p-4 border-b border-slate-800 flex items-center gap-3">
                    <Search className="w-5 h-5 text-slate-400" />
                    <input 
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar protocolo, medicação, sintoma..." 
                        className="flex-1 text-lg bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 outline-none"
                    />
                    <div className="hidden md:block text-xs font-bold text-slate-500 bg-slate-800 px-2 py-1 rounded">ESC</div>
                </div>
                
                <div className="overflow-y-auto">
                    {query.length < 2 ? (
                         <div className="p-4">
                            <div className="text-xs font-bold text-slate-500 px-2 py-2 uppercase tracking-wider mb-2">Sugestões Rápidas</div>
                            <button onClick={() => navigate('protocol-detail', 'p1')} className="w-full text-left px-4 py-3 hover:bg-slate-800 rounded-lg text-slate-300 flex items-center justify-between group">
                                <span className="flex items-center gap-3"><Activity className="w-4 h-4 text-accent-500"/> Pulpite Irreversível</span>
                                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-slate-500"/>
                            </button>
                            <button onClick={() => navigate('prescriptions')} className="w-full text-left px-4 py-3 hover:bg-slate-800 rounded-lg text-slate-300 flex items-center justify-between group">
                                <span className="flex items-center gap-3"><Pill className="w-4 h-4 text-accent-500"/> Amoxicilina (Prescrições)</span>
                                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-slate-500"/>
                            </button>
                            <button onClick={() => navigate('protocol-detail', 'p3')} className="w-full text-left px-4 py-3 hover:bg-slate-800 rounded-lg text-slate-300 flex items-center justify-between group">
                                <span className="flex items-center gap-3"><Activity className="w-4 h-4 text-accent-500"/> Drenagem de Abscesso</span>
                                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-slate-500"/>
                            </button>
                         </div>
                    ) : filteredResults.length > 0 ? (
                        <div className="p-2">
                             {filteredResults.map((item, idx) => (
                                <button 
                                    key={idx} 
                                    onClick={() => handleSelect(item)}
                                    className="w-full text-left px-4 py-3 hover:bg-slate-800 rounded-xl flex items-center gap-3 group transition-colors"
                                >
                                    <div className="p-2 bg-slate-800 rounded-lg text-slate-500 group-hover:text-accent-500 group-hover:bg-accent-900/20 transition-colors">
                                        {item.id === 'prescriptions' ? <Pill className="w-5 h-5"/> : item.id === 'faq' ? <HelpCircle className="w-5 h-5"/> : <Activity className="w-5 h-5"/>}
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-white">{item.label}</div>
                                        <div className="text-xs text-slate-500">{item.type}</div>
                                    </div>
                                </button>
                             ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center text-slate-500">
                            Nenhum resultado encontrado para "{query}"
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    )
}

const MainAppContent = () => {
    const { currentView, selectedProtocolId, navigate } = useApp();

    const renderContent = () => {
        switch (currentView) {
          case 'home':
            return <Hero />;
          case 'manifesto':
            return <ManifestoView />;
          case 'diagnosis':
            return <DiagnosisWizard />;
          case 'protocols':
            return (
              <div className="max-w-4xl mx-auto px-4">
                 <motion.h2 
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-slate-900 dark:text-white mb-8"
                 >
                    Protocolos Clínicos
                 </motion.h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {PROTOCOLS.map((p, index) => (
                       <motion.div
                          key={p.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                       >
                           <Card onClick={() => navigate('protocol-detail', p.id)} className="hover:border-accent-400 group h-full">
                              <div className={`w-12 h-12 rounded-xl mb-4 ${p.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                                {p.id.replace('p', '')}
                              </div>
                              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-accent-500 transition-colors">{p.title}</h3>
                              <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">{p.description}</p>
                           </Card>
                       </motion.div>
                    ))}
                 </div>
              </div>
            );
          case 'protocol-detail':
            const protocol = PROTOCOLS.find(p => p.id === selectedProtocolId);
            if (!protocol) return <div>Protocolo não encontrado</div>;
            return <ProtocolView protocol={protocol} />;
          case 'prescriptions':
            return <PrescriptionList />;
          case 'scripts':
            return <ScriptList />;
          case 'references':
          case 'faq':
            return <ReferenceView />;
          default:
            return <Hero />;
        }
    };

    return (
        <Layout>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentView}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full"
                >
                    {renderContent()}
                </motion.div>
            </AnimatePresence>
            <AnimatePresence>
                <SearchOverlay />
            </AnimatePresence>
        </Layout>
    );
};

function App() {
  return (
    <AppProvider>
        <ToastProvider>
            <MainAppContent />
        </ToastProvider>
    </AppProvider>
  );
}

export default App;
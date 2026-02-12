import React from 'react';
import { Activity, BookOpen, FileText, ChevronRight, Zap, Shield, Search, Calculator, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Card } from './ui/Card';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const Hero: React.FC = () => {
  const { navigate, toggleSearch } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4"
      >
        <div>
          <h2 className="text-slate-500 dark:text-slate-400 font-medium mb-1">Bem-vindo, Doutor(a)</h2>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Painel de Controle
          </h1>
        </div>
        <div className="flex items-center gap-2">
           <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Sistema Operacional v1.0</span>
        </div>
      </motion.div>

      {/* Bento Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-auto md:h-[600px]"
      >
        
        {/* Main Action - Diagnosis (Large Block) */}
        <motion.div variants={item} className="md:col-span-2 md:row-span-2 relative group">
          <button 
             onClick={() => navigate('diagnosis')}
             className="w-full h-full text-left"
          >
             <Card className="h-full !bg-slate-900 dark:!bg-white text-white dark:text-slate-900 border-none shadow-2xl shadow-slate-900/20 relative overflow-hidden" noPadding>
                {/* Abstract Background Animation */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/30 rounded-full blur-[80px] -mr-16 -mt-16 group-hover:bg-accent-500/50 transition-colors duration-500"></div>
                
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                   <div className="flex justify-between items-start">
                      <div className="p-3 bg-white/10 dark:bg-slate-900/10 backdrop-blur-md rounded-2xl">
                         <Activity className="w-8 h-8 text-emerald-400 dark:text-emerald-600" />
                      </div>
                      <div className="bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold text-emerald-300 dark:text-emerald-700 uppercase tracking-wide">
                        Início Rápido
                      </div>
                   </div>

                   <div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">Paciente com Dor?</h2>
                      <p className="text-slate-300 dark:text-slate-600 text-lg mb-6 max-w-sm">
                        Inicie o fluxo de decisão clínica guiada para diagnóstico preciso e conduta imediata.
                      </p>
                      <div className="inline-flex items-center gap-2 font-bold bg-white/10 dark:bg-slate-900/5 hover:bg-white/20 dark:hover:bg-slate-900/10 px-6 py-3 rounded-xl transition-all group-hover:pl-8">
                         Iniciar Diagnóstico <ChevronRight className="w-5 h-5" />
                      </div>
                   </div>
                </div>
             </Card>
          </button>
        </motion.div>

        {/* Protocols (Medium Vertical) */}
        <motion.div variants={item} className="md:col-span-1 md:row-span-2">
            <Card onClick={() => navigate('protocols')} className="h-full hover:bg-slate-50 dark:hover:bg-slate-800/50 group" noPadding>
               <div className="p-6 h-full flex flex-col">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Protocolos Clínicos</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-1">
                     Acesse diretamente os guias de tratamento passo-a-passo.
                  </p>
                  
                  <div className="space-y-2">
                     {['Pulpite Irreversível', 'Abscesso Agudo', 'Traumatismo'].map((p, i) => (
                        <div key={i} className="text-xs font-medium text-slate-600 dark:text-slate-300 p-2 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-between">
                           {p} <ChevronRight className="w-3 h-3 text-slate-400" />
                        </div>
                     ))}
                  </div>
               </div>
            </Card>
        </motion.div>

        {/* Quick Search (Small) */}
        <motion.div variants={item} className="md:col-span-1 md:row-span-1">
             <Card onClick={() => toggleSearch(true)} className="h-full !bg-slate-100 dark:!bg-slate-800 border-none group">
                <div className="flex flex-col justify-center h-full items-center text-center gap-3">
                    <Search className="w-8 h-8 text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                    <div className="text-sm font-bold text-slate-600 dark:text-slate-300">Buscar (Cmd+K)</div>
                </div>
             </Card>
        </motion.div>

        {/* Prescriptions (Small) */}
        <motion.div variants={item} className="md:col-span-1 md:row-span-1">
            <Card onClick={() => navigate('prescriptions')} className="h-full group">
               <div className="flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                     <FileText className="w-6 h-6 text-indigo-500" />
                     <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                  </div>
                  <div>
                     <div className="font-bold text-slate-900 dark:text-white">Receituário</div>
                     <div className="text-xs text-slate-500">Copie e cole</div>
                  </div>
               </div>
            </Card>
        </motion.div>

        {/* Bottom Row - Tools & Stats */}
        <motion.div variants={item} className="md:col-span-1 md:row-span-1">
             <Card onClick={() => navigate('references')} className="h-full group !bg-gradient-to-br !from-amber-50 !to-orange-50 dark:!from-amber-950/30 dark:!to-orange-950/30 border-amber-100 dark:border-amber-900/50">
                 <div className="flex items-center gap-3 h-full">
                    <div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
                       <Calculator className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                       <div className="font-bold text-amber-900 dark:text-amber-100">Calculadora</div>
                       <div className="text-xs text-amber-700 dark:text-amber-300">Custos & Lucro</div>
                    </div>
                 </div>
             </Card>
        </motion.div>

        <motion.div variants={item} className="md:col-span-1 md:row-span-1">
            <Card onClick={() => navigate('manifesto')} className="h-full group">
                 <div className="flex items-center gap-3 h-full">
                    <div className="p-2 bg-primary-50 dark:bg-primary-900/50 rounded-lg text-primary-600 dark:text-primary-400">
                       <Shield className="w-5 h-5" />
                    </div>
                    <div>
                       <div className="font-bold text-slate-900 dark:text-white">O Manifesto</div>
                       <div className="text-xs text-slate-500">Filosofia SOS</div>
                    </div>
                 </div>
            </Card>
        </motion.div>

        <motion.div variants={item} className="md:col-span-2 md:row-span-1">
            <Card onClick={() => navigate('scripts')} className="h-full !bg-slate-900 dark:!bg-slate-800 text-white group overflow-hidden relative" noPadding>
                 <div className="absolute right-0 top-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                 <div className="p-6 flex items-center justify-between h-full relative z-10">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                           <Zap className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                           <div className="font-bold text-lg">Scripts de Comunicação</div>
                           <div className="text-sm text-slate-400">O que falar para acalmar o paciente.</div>
                        </div>
                     </div>
                     <div className="bg-white/10 p-2 rounded-full group-hover:bg-white/20 transition-colors">
                        <ChevronRight className="w-5 h-5 text-white" />
                     </div>
                 </div>
            </Card>
        </motion.div>

      </motion.div>
    </div>
  );
};
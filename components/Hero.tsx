import React from 'react';
import { Activity, ArrowRight, BookOpen, FileText } from 'lucide-react';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

export const Hero: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] md:min-h-[85vh] text-center px-4 md:px-6 max-w-4xl mx-auto pt-4 md:pt-0">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <div className="mb-6 flex justify-center">
             <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] md:text-xs font-bold tracking-wide uppercase border border-slate-200 dark:border-slate-700 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Sistema de Decisão Clínica v1.0
             </span>
        </div>
        
        {/* Adjusted Typography for Mobile */}
        <h1 className="text-4xl xs:text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1] md:leading-[1.1]">
          Protocolo SOS <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-900 to-accent-600 dark:from-white dark:to-slate-400">
            Endodontia
          </span>
        </h1>
        
        <p className="text-base xs:text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto font-serif-text leading-relaxed px-2">
          O guia definitivo para urgências.
          <br className="hidden xs:block" /> Diagnóstico preciso, anestesia que funciona e protocolos à prova de falha.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full max-w-md space-y-4"
      >
        <button
          onClick={() => navigate('diagnosis')}
          className="group relative w-full flex items-center justify-between p-1 bg-gradient-to-r from-primary-900 to-slate-800 rounded-2xl shadow-xl shadow-primary-900/20 hover:shadow-2xl active:scale-[0.98] transition-all duration-300 overflow-hidden touch-manipulation"
        >
          <div className="w-full h-full bg-slate-900 rounded-xl px-5 py-5 xs:px-6 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent-500/10 rounded-xl border border-accent-500/20 shrink-0">
                  <Activity className="w-7 h-7 md:w-8 md:h-8 text-accent-400 animate-pulse" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-white text-lg leading-tight">Paciente com Dor?</div>
                  <div className="text-slate-400 text-sm">Iniciar Diagnóstico</div>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-slate-500 group-hover:text-white transition-colors" />
          </div>
        </button>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-auto py-4 md:py-5 flex flex-col gap-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 border-slate-200 dark:border-slate-600 group active:scale-[0.98] transition-transform" onClick={() => navigate('protocols')}>
            <BookOpen className="w-6 h-6 text-slate-400 group-hover:text-accent-500 transition-colors" />
            <span className="font-semibold text-sm md:text-base text-slate-900 dark:text-white">Protocolos</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 md:py-5 flex flex-col gap-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 border-slate-200 dark:border-slate-600 group active:scale-[0.98] transition-transform" onClick={() => navigate('prescriptions')}>
            <FileText className="w-6 h-6 text-slate-400 group-hover:text-accent-500 transition-colors" />
            <span className="font-semibold text-sm md:text-base text-slate-900 dark:text-white">Prescrições</span>
          </Button>
        </div>
      </motion.div>
      
      <div className="mt-12 md:mt-16 opacity-40 hover:opacity-100 transition-opacity pb-8">
        <p className="text-[10px] md:text-xs font-medium text-slate-500 uppercase tracking-widest">
          Desenvolvido para Clínicos Gerais
        </p>
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { Protocol } from '../types';
import { ArrowLeft, CheckSquare, Square, Clock, AlertOctagon, Info, FileText, TrendingUp, Lightbulb, Skull, Briefcase, ChevronDown, Play, RotateCcw, Pause, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useApp } from '../context/AppContext';

interface ProtocolViewProps {
  protocol: Protocol;
}

// -- FLOATING TIMER COMPONENT --
const FloatingTimer: React.FC<{ 
  duration: string;
  stepTitle: string; 
  onClose: () => void; 
}> = ({ 
  duration, 
  stepTitle, 
  onClose 
}) => {
  const parseDuration = (str: string) => {
    const match = str.match(/(\d+)/);
    return match ? parseInt(match[0]) * 60 : 300; 
  };

  const initialTime = parseDuration(duration);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progress = ((initialTime - timeLeft) / initialTime) * 100;

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50 w-[calc(100%-32px)] md:w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-2xl rounded-2xl p-4 text-slate-900 dark:text-white overflow-hidden"
    >
      {/* Progress Background */}
      <div className="absolute bottom-0 left-0 h-1 bg-accent-600 transition-all duration-1000 ease-linear" style={{ width: `${progress}%` }} />
      
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Cronômetro Ativo</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors">
            <X className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      <div className="flex items-center justify-between">
         <div>
             <div className="text-3xl font-mono font-bold tabular-nums leading-none mb-1">
                 {formatTime(timeLeft)}
             </div>
             <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[180px]">{stepTitle}</div>
         </div>
         
         <div className="flex gap-2">
            <button 
                onClick={() => setTimeLeft(initialTime)} 
                className="p-3 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
                title="Reiniciar"
            >
                <RotateCcw className="w-5 h-5" />
            </button>
            <button 
                onClick={() => setIsActive(!isActive)} 
                className={`p-3 rounded-full transition-colors ${isActive ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}`}
            >
                {isActive ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            </button>
         </div>
      </div>
    </motion.div>
  );
};

export const ProtocolView: React.FC<ProtocolViewProps> = ({ protocol }) => {
  const { navigate, checkedItems, toggleCheck } = useApp();
  const [showMaterials, setShowMaterials] = React.useState(false);
  
  // Floating Timer State
  const [activeTimer, setActiveTimer] = useState<{ duration: string, stepTitle: string } | null>(null);

  // Scroll Progress (Framer Motion)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  return (
    <div className="max-w-3xl mx-auto px-4 pb-32 relative">
      
      {/* Sticky Header - Functional Progress Bar */}
      <div className="sticky top-[60px] md:top-0 z-30 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 -mx-4 px-4 py-3 md:mb-8 shadow-sm transition-all duration-200">
        <div className="flex items-center justify-between gap-3">
          <button 
            onClick={() => navigate('protocols')} 
            className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors active:scale-95"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
          
          <div className="flex-1 min-w-0">
             <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
                {protocol.shortTitle}
             </h2>
             {/* Progress Bar Visual - Now controlled by scrollProgress */}
             <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-1.5">
                <motion.div 
                    className={`h-full ${protocol.color} origin-left`} 
                    style={{ scaleX }}
                />
             </div>
          </div>
          
          <div className={`w-3 h-3 rounded-full ${protocol.color} shadow-sm shrink-0`} />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-6 md:pt-0"
      >
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${protocol.color} bg-opacity-10 text-[10px] md:text-xs font-bold tracking-wide mb-4 ${protocol.color.replace('bg-', 'text-')}`}>
          PROTOCOLO CLÍNICO
        </div>
        <h1 className="text-2xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6 leading-tight tracking-tight">
          {protocol.title}
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-serif-text leading-relaxed mb-8 border-l-4 border-slate-300 dark:border-slate-700 pl-4 md:pl-6 italic">
          "{protocol.description}"
        </p>

        {/* Materials Accordion */}
        {protocol.materials && (
           <div className="mb-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
              <button 
                onClick={() => setShowMaterials(!showMaterials)}
                className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:bg-slate-200"
              >
                  <div className="flex items-center gap-3 font-bold text-slate-700 dark:text-slate-200 text-sm md:text-base">
                     <Briefcase className="w-5 h-5 text-accent-500" />
                     Materiais Necessários
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${showMaterials ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {showMaterials && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-slate-100 dark:border-slate-800"
                    >
                        <div className="p-4 grid grid-cols-1 gap-3">
                            {protocol.materials.map((m, i) => (
                                <div key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2 shrink-0" />
                                    <span className="leading-snug">{m}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
              </AnimatePresence>
           </div>
        )}

        {/* Steps */}
        <div className="space-y-8 md:space-y-12 mb-12">
          {protocol.steps.map((step, index) => (
            <div key={index} className="relative pl-6 md:pl-8 border-l-2 border-slate-200 dark:border-slate-800 pb-10 last:pb-0 last:border-0">
              <div className={`absolute -left-[19px] md:-left-[20px] top-0 flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-50 dark:bg-slate-950 border-2 ${index === protocol.steps.length - 1 ? 'border-emerald-500 text-emerald-500' : 'border-slate-300 dark:border-slate-700 text-slate-500'} font-bold shadow-sm z-10 text-sm md:text-base`}>
                {index + 1}
              </div>
              
              <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
                <h3 className="text-lg md:text-2xl font-bold text-slate-800 dark:text-slate-100 leading-tight">{step.title}</h3>
                {step.duration && (
                  <span className="self-start md:self-auto inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wide">
                    <Clock className="w-3 h-3" /> {step.duration}
                  </span>
                )}
              </div>

              <div className={`p-5 md:p-6 rounded-2xl transition-all shadow-sm ${
                step.type === 'alert' ? 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900' : 
                step.type === 'critical' ? 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900' :
                step.type === 'prescription' ? 'bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900' :
                step.type === 'tip' ? 'bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900' :
                'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800'
              }`}>
                {/* Content Logic */}
                <div className="space-y-4">
                    {/* Checklist Logic */}
                    {(step.type === 'checklist' || step.type === 'text') && (
                        <ul className="space-y-4">
                            {step.content.map((item, i) => {
                                const itemId = `protocol-${protocol.id}-step-${index}-item-${i}`;
                                const isChecked = checkedItems[itemId];
                                return (
                                    <li 
                                        key={i} 
                                        onClick={() => toggleCheck(itemId)}
                                        className={`flex items-start gap-4 cursor-pointer group select-none transition-all touch-manipulation p-1 -m-1 rounded-lg active:bg-black/5 dark:active:bg-white/5 ${isChecked ? 'opacity-50' : 'opacity-100'}`}
                                    >
                                        {isChecked ? (
                                            <CheckSquare className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5 transition-transform scale-110" />
                                        ) : (
                                            <Square className="w-6 h-6 text-slate-300 dark:text-slate-600 shrink-0 mt-0.5 group-hover:text-accent-500 transition-colors" />
                                        )}
                                        <span className={`text-base md:text-lg leading-snug transition-all ${isChecked ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>
                                            {item}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    {step.type === 'tip' && (
                        <div className="space-y-3">
                             <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold uppercase text-xs tracking-wider mb-2">
                                    <Lightbulb className="w-4 h-4" /> Dica de Ouro
                             </div>
                            {step.content.map((item, i) => (
                                <p key={i} className="text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed font-serif-text">{item}</p>
                            ))}
                        </div>
                    )}

                    {(step.type === 'info') && (
                        <div className="flex gap-4">
                            <Info className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                            <div className="space-y-2 text-slate-700 dark:text-slate-300">
                                {step.content.map((item, i) => <p key={i} className="text-base md:text-lg">{item}</p>)}
                            </div>
                        </div>
                    )}

                    {(step.type === 'alert' || step.type === 'critical') && (
                        <div className="flex gap-4">
                            {step.type === 'alert' ? <Skull className="w-8 h-8 text-red-500 shrink-0" /> : <AlertOctagon className="w-8 h-8 text-amber-500 shrink-0" />}
                            <div>
                                <h4 className={`font-bold mb-2 uppercase text-xs md:text-sm tracking-wider ${step.type === 'alert' ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                    {step.type === 'alert' ? 'Perigo Iminente' : 'Atenção Crítica'}
                                </h4>
                                <div className="space-y-2 text-slate-800 dark:text-slate-200 font-medium">
                                    {step.content.map((item, i) => <p key={i} className="text-base md:text-lg">{item}</p>)}
                                </div>
                            </div>
                        </div>
                    )}

                    {step.type === 'prescription' && (
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4">
                                <FileText className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                                <div className="space-y-2 text-slate-700 dark:text-slate-300">
                                {step.content.map((item, i) => <p key={i} className="font-medium text-base md:text-lg">{item}</p>)}
                                </div>
                            </div>
                            <button 
                                onClick={() => navigate('prescriptions')}
                                className="self-start mt-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors shadow-lg shadow-blue-500/20 active:scale-95 touch-manipulation"
                            >
                                Abrir Receituário &rarr;
                            </button>
                        </div>
                    )}

                    {/* Integrated Timer Trigger */}
                    {step.duration && (step.content.some(c => c.toLowerCase().includes('espere') || c.toLowerCase().includes('aguarde'))) && (
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <button 
                                onClick={() => setActiveTimer({ duration: step.duration!, stepTitle: step.title })}
                                className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group border border-slate-200 dark:border-slate-700"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-200 dark:bg-slate-900 rounded-lg text-slate-600 dark:text-slate-400 group-hover:text-accent-500 transition-colors">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-xs font-bold text-slate-500 uppercase">Iniciar Cronômetro</div>
                                        <div className="font-bold text-slate-900 dark:text-white">Tempo sugerido: {step.duration}</div>
                                    </div>
                                </div>
                                <Play className="w-5 h-5 text-accent-500" />
                            </button>
                        </div>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Outcomes */}
        {protocol.outcome && (
          <div className="mt-8 pt-10 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              Resultados Esperados
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {protocol.outcome.map((item, index) => (
                <div key={index} className="bg-slate-50 dark:bg-slate-900 p-4 md:p-5 rounded-2xl text-center border border-slate-100 dark:border-slate-800 shadow-sm">
                   <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wide font-bold mb-2">{item.label}</div>
                   <div className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Floating Global Timer */}
      <AnimatePresence>
        {activeTimer && (
            <FloatingTimer 
                key={activeTimer.stepTitle} // Reset timer if step changes
                duration={activeTimer.duration} 
                stepTitle={activeTimer.stepTitle} 
                onClose={() => setActiveTimer(null)} 
            />
        )}
      </AnimatePresence>
    </div>
  );
};
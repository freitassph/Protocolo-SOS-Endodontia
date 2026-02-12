import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Stethoscope, ArrowRight, ClipboardList, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Card } from './ui/Card';
import { DIAGNOSIS_STEPS, PROTOCOLS } from '../data';
import { useApp } from '../context/AppContext';

export const DiagnosisWizard: React.FC = () => {
  const { navigate } = useApp();
  const [currentStepId, setCurrentStepId] = useState<string>('start');
  const [history, setHistory] = useState<string[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [direction, setDirection] = useState(0); 
  const [summaryInfo, setSummaryInfo] = useState<{
      diagnosisName: string;
      symptoms: string[];
      alert?: string;
      protocolId?: string;
  } | null>(null);

  const currentStep = DIAGNOSIS_STEPS[currentStepId];

  // Logic to determine "Heat" level for UI coloring based on history/current step
  const getIntensityColor = () => {
    if (['swelling', 'spontaneous'].includes(currentStepId)) return 'from-rose-500/20 to-orange-500/20'; // High urgency
    if (['trauma', 'biting'].includes(currentStepId)) return 'from-amber-500/20 to-yellow-500/20'; // Medium
    return 'from-blue-500/20 to-indigo-500/20'; // Standard/Start
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      filter: 'blur(10px)'
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)'
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      filter: 'blur(10px)'
    })
  };

  const handleAnswer = (answer: 'yes' | 'no') => {
    const nextStepId = answer === 'yes' ? currentStep.yesNext : currentStep.noNext;
    setDirection(1);
    
    if (nextStepId === 'result' || !nextStepId) {
        let finalResultId = currentStep.resultId;
        let finalSymptoms = currentStep.clinicalSigns || [];
        let finalAlert = currentStep.alert;
        let finalTitle = '';

        if (currentStepId === 'uncertain' && answer === 'no') {
            finalResultId = 'p6'; 
            finalTitle = 'Diagnóstico Inconclusivo';
            finalSymptoms = [
                'Nenhum dos quadros anteriores foi confirmado.',
                'Sintomas não correspondem a Pulpite ou Abscesso clássicos.',
                'Provável etiologia não-endodôntica ou DTM.'
            ];
            finalAlert = 'Recomendamos tratamento conservador (Protocolo 6) e reavaliação em 7 dias.';
        } else {
             const protocol = PROTOCOLS.find(p => p.id === finalResultId);
             finalTitle = protocol?.title || 'Diagnóstico Sugerido';
        }

        setSummaryInfo({
            diagnosisName: finalTitle,
            symptoms: finalSymptoms,
            alert: finalAlert,
            protocolId: finalResultId
        });
        setShowSummary(true);
    } else {
        setHistory([...history, currentStepId]);
        setCurrentStepId(nextStepId);
    }
  };

  const handleBack = () => {
      if (showSummary) {
          setShowSummary(false);
          setSummaryInfo(null);
          setDirection(-1);
          return;
      }
      const prev = history[history.length - 1];
      if(prev) {
          setDirection(-1);
          setHistory(history.slice(0, -1));
          setCurrentStepId(prev);
      } else {
          navigate('home');
      }
  };

  // Progress logic
  const totalStepsEstimate = 7; 

  if (showSummary && summaryInfo) {
      return (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950"
        >
            <div className="max-w-xl w-full">
                <div className="text-center mb-8">
                    <motion.div 
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/30"
                    >
                        <ClipboardList className="w-10 h-10 text-white" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Diagnóstico Concluído</h2>
                    <p className="text-slate-500 dark:text-slate-400">Aqui está o resultado da análise clínica.</p>
                </div>

                <Card className="p-8 border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-900/10 mb-6">
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">Resultado</div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{summaryInfo.diagnosisName}</h3>

                    <div className="space-y-4">
                        {summaryInfo.symptoms.slice(0, 3).map((s, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{s}</span>
                            </li>
                        ))}
                    </div>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                     <button
                        onClick={handleBack}
                        className="px-6 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        Revisar
                    </button>
                    <button
                        onClick={() => summaryInfo.protocolId && navigate('protocol-detail', summaryInfo.protocolId)}
                        className="px-6 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg shadow-xl shadow-slate-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        Ver Protocolo <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </motion.div>
      );
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-50 dark:bg-slate-950">
        
        {/* Dynamic Background Aura */}
        <motion.div 
            animate={{ 
                background: `radial-gradient(circle at 50% 50%, var(--tw-gradient-from), transparent 70%)` 
            }}
            className={`absolute inset-0 opacity-30 pointer-events-none bg-gradient-to-r ${getIntensityColor()}`}
        />

        {/* Cinematic Header (No Nav) */}
        <div className="relative z-10 px-6 py-6 flex justify-between items-center max-w-4xl mx-auto w-full">
            <button onClick={handleBack} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-300" />
            </button>
            <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Modo Foco</span>
                <div className="flex gap-1 mt-1">
                    {Array.from({ length: totalStepsEstimate }).map((_, i) => (
                        <motion.div 
                            key={i}
                            initial={{ height: 4, opacity: 0.3 }}
                            animate={{ 
                                height: i === history.length ? 8 : 4,
                                opacity: i <= history.length ? 1 : 0.3,
                                backgroundColor: i <= history.length ? (isDarkMode() ? '#fff' : '#0f172a') : '#94a3b8'
                            }}
                            className="w-4 rounded-full transition-all duration-300"
                        />
                    ))}
                </div>
            </div>
        </div>

        {/* Main Content Area - Centered & Focused */}
        <div className="flex-1 flex flex-col justify-center px-4 md:px-6 max-w-2xl mx-auto w-full relative z-10 pb-20">
            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={currentStepId}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <div className="mb-8">
                        <motion.h2 
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-6"
                        >
                            {currentStep.question}
                        </motion.h2>
                        <motion.p 
                             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-serif-text leading-relaxed"
                        >
                            {currentStep.description}
                        </motion.p>
                    </div>

                    {/* Context Cards */}
                    <div className="grid grid-cols-1 gap-4 mb-10">
                        {currentStep.clinicalSigns && currentStep.clinicalSigns.length > 0 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-800"
                            >
                                <div className="flex items-center gap-2 mb-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                    <Stethoscope className="w-4 h-4" /> Sinais para confirmar
                                </div>
                                <ul className="space-y-3">
                                    {currentStep.clinicalSigns.map((sign, i) => (
                                    <li key={i} className="text-base text-slate-800 dark:text-slate-200 flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0 mt-2" />
                                        <span className="leading-snug">{sign}</span>
                                    </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                        {currentStep.alert && (
                             <motion.div 
                             initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
                             className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20 flex items-start gap-3"
                         >
                             <AlertTriangle className="w-6 h-6 text-rose-500 shrink-0" />
                             <p className="text-sm font-bold text-rose-600 dark:text-rose-400">{currentStep.alert}</p>
                         </motion.div>
                        )}
                    </div>

                    {/* Big Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                            onClick={() => handleAnswer('yes')}
                            className="group relative overflow-hidden rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-6 flex flex-col items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all active:scale-[0.98]"
                        >
                            <span className="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <CheckCircle2 className="w-8 h-8 text-emerald-400 dark:text-emerald-600" />
                            <span className="text-xl font-bold">{currentStep.yesLabel || "Sim, corresponde"}</span>
                        </button>

                        <button
                            onClick={() => handleAnswer('no')}
                            className="group rounded-2xl bg-white dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 p-6 flex flex-col items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-[0.98]"
                        >
                             <XCircle className="w-8 h-8 text-slate-400 group-hover:text-slate-500" />
                            <span className="text-xl font-bold">{currentStep.noLabel || "Não, próximo"}</span>
                        </button>
                    </div>

                </motion.div>
            </AnimatePresence>
        </div>
    </div>
  );
};

// Helper to detect dark mode for inline styles
const isDarkMode = () => {
    if (typeof window === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
}
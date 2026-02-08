import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RefreshCw, Stethoscope, ScanLine, ArrowRight, ClipboardList, AlertTriangle } from 'lucide-react';
import { Card } from './ui/Card';
import { DIAGNOSIS_STEPS, PROTOCOLS } from '../data';
import { useApp } from '../context/AppContext';

export const DiagnosisWizard: React.FC = () => {
  const { navigate } = useApp();
  const [currentStepId, setCurrentStepId] = useState<string>('start');
  const [history, setHistory] = useState<string[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for back
  const [summaryInfo, setSummaryInfo] = useState<{
      diagnosisName: string;
      symptoms: string[];
      alert?: string;
      protocolId?: string;
  } | null>(null);

  const currentStep = DIAGNOSIS_STEPS[currentStepId];

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  const handleAnswer = (answer: 'yes' | 'no') => {
    const nextStepId = answer === 'yes' ? currentStep.yesNext : currentStep.noNext;
    setDirection(1);
    
    // Logic: If nextStepId is explicitly 'result' OR if there is no next step (undefined), treat as end of flow.
    if (nextStepId === 'result' || !nextStepId) {
        let finalResultId = currentStep.resultId;
        let finalSymptoms = currentStep.clinicalSigns || [];
        let finalAlert = currentStep.alert;
        let finalTitle = '';

        // Special Case: Finished sequence with NO on Uncertain step (Inconclusive)
        if (currentStepId === 'uncertain' && answer === 'no') {
            finalResultId = 'p6'; // Conservative/Reversible as safe default for monitoring
            finalTitle = 'Diagnóstico Inconclusivo';
            finalSymptoms = [
                'Nenhum dos quadros anteriores foi confirmado.',
                'Sintomas não correspondem a Pulpite ou Abscesso clássicos.',
                'Provável etiologia não-endodôntica ou DTM.'
            ];
            finalAlert = 'Recomendamos tratamento conservador (Protocolo 6) e reavaliação em 7 dias, ou encaminhamento para especialista.';
        } else {
             // Standard YES confirmation (or result step)
             const protocol = PROTOCOLS.find(p => p.id === finalResultId);
             finalTitle = protocol?.title || 'Diagnóstico Sugerido';
             
             // If we arrived here via YES, the current step symptoms are the confirmed ones.
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
      }
  };

  if (showSummary && summaryInfo) {
      return (
        <div className="max-w-2xl mx-auto px-4 py-8 min-h-[60vh] flex flex-col justify-center">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-emerald-50 dark:border-emerald-900">
                        <ClipboardList className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">Resumo Clínico</h2>
                    <p className="text-slate-500 dark:text-slate-400">Confirme o resultado para acessar o protocolo.</p>
                </div>

                <Card className="p-6 md:p-8 border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-900/10 mb-8">
                    <div className="mb-6 pb-6 border-b border-emerald-100 dark:border-emerald-900/50">
                        <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">Resultado da Análise</div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{summaryInfo.diagnosisName}</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
                            <Stethoscope className="w-4 h-4" /> Observações:
                        </div>
                        <ul className="space-y-3">
                            {summaryInfo.symptoms.map((s, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>{s}</span>
                                </li>
                            ))}
                        </ul>
                        {summaryInfo.alert && (
                            <div className="mt-4 p-4 bg-rose-100 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 rounded-lg flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                                <span className="text-sm font-medium text-rose-800 dark:text-rose-200">{summaryInfo.alert}</span>
                            </div>
                        )}
                    </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <button
                        onClick={handleBack}
                        className="px-6 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                        Revisar
                    </button>
                    <button
                        onClick={() => summaryInfo.protocolId && navigate('protocol-detail', summaryInfo.protocolId)}
                        className="px-6 py-4 rounded-xl bg-primary-900 dark:bg-emerald-600 text-white font-bold text-lg shadow-xl shadow-primary-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        Ver Protocolo <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </motion.div>
        </div>
      );
  }

  // Calculate Progress (Visual Dots)
  const totalStepsEstimate = 7; 
  const progressPercent = Math.min(100, ((history.length + 1) / totalStepsEstimate) * 100);

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 md:py-8 min-h-[60vh] flex flex-col justify-center overflow-hidden">
      
      {/* Visual Progress Bar */}
      <div className="mb-6 md:mb-10">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">Diagnóstico Guiado</h2>
            <span className="text-xs font-bold text-slate-400">Passo {history.length + 1} de {totalStepsEstimate}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-accent-500"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5 }}
              />
          </div>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStepId}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "tween", duration: 0.3 }}
        >
          <Card className="p-6 md:p-10 border-t-4 border-t-accent-500 shadow-xl dark:shadow-slate-900/20">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
              {currentStep.question}
            </h3>
            
            {/* Context/Description */}
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 mb-8 font-serif-text leading-relaxed">
              {currentStep.description}
            </p>

            {/* Clinical Signs Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
              {currentStep.clinicalSigns && currentStep.clinicalSigns.length > 0 && (
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 md:p-5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-3 text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                    <Stethoscope className="w-4 h-4" /> Sinais Clínicos
                  </div>
                  <ul className="space-y-3">
                    {currentStep.clinicalSigns.map((sign, i) => (
                      <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                        <span className="leading-snug">{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {currentStep.radiography && currentStep.radiography.length > 0 && (
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 md:p-5 rounded-xl border border-slate-100 dark:border-slate-800">
                   <div className="flex items-center gap-2 mb-3 text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                    <ScanLine className="w-4 h-4" /> Raio-X
                  </div>
                  <ul className="space-y-3">
                    {currentStep.radiography.map((item, i) => (
                      <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                         <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                         <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Actions - Vertically Stacked on Mobile for Thumb Zone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswer('yes')}
                className="order-1 md:order-none flex items-center justify-center gap-3 p-5 md:p-5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all shadow-lg hover:shadow-xl active:scale-[0.98] font-semibold text-lg touch-manipulation min-h-[64px]"
              >
                <CheckCircle2 className="w-6 h-6 text-emerald-400 dark:text-emerald-100" />
                {currentStep.yesLabel || "SIM, corresponde"}
              </button>
              <button
                onClick={() => handleAnswer('no')}
                className="order-2 md:order-none flex items-center justify-center gap-3 p-5 md:p-5 rounded-xl bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 active:scale-[0.98] transition-all font-semibold text-lg touch-manipulation min-h-[64px]"
              >
                <XCircle className="w-6 h-6 text-slate-400" />
                {currentStep.noLabel || "NÃO, próximo"}
              </button>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-center pb-safe">
        {history.length > 0 && (
            <button 
                onClick={handleBack}
                className="px-6 py-3 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 text-sm font-medium flex items-center gap-2 active:bg-slate-100 dark:active:bg-slate-800 rounded-full transition-colors"
            >
                <RefreshCw className="w-4 h-4" /> Voltar ao passo anterior
            </button>
        )}
      </div>
    </div>
  );
};
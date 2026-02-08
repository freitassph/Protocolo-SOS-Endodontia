import React from 'react';
import { PRESCRIPTIONS } from '../data';
import { Copy, Pill, AlertCircle, Clock } from 'lucide-react';
import { useToast } from '../hooks/useToast';

export const PrescriptionList: React.FC = () => {
  const { addToast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    addToast("Receita copiada para área de transferência", "success");
  };

  const formatForClipboard = (p: typeof PRESCRIPTIONS[0]) => {
    let text = `RECEITUÁRIO - ${p.title.toUpperCase()}\n\n`;
    p.medications.forEach((m, i) => {
        text += `${i+1}) ${m.name} ${m.dose}\n`;
        text += `   Tomar ${m.frequency} por ${m.duration}\n`;
        if(m.observation) text += `   Obs: ${m.observation}\n`;
        text += '\n';
    });
    if(p.instructions && p.instructions.length > 0) {
        text += 'ORIENTAÇÕES:\n';
        p.instructions.forEach(inst => text += `- ${inst}\n`);
    }
    return text;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Prescrições Blindadas</h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 font-serif-text">Copie e cole. Modelos prontos calculados para máxima eficácia e segurança.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {PRESCRIPTIONS.map((prescription) => (
          <div key={prescription.id} className="relative group perspective-1000">
             {/* Paper Effect */}
             <div className="absolute inset-0 bg-slate-900/5 dark:bg-white/5 translate-y-2 translate-x-2 rounded-2xl -z-10" />
             
             {/* Custom Card Div to control padding fully */}
             <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 border-t-8 border-t-slate-900 dark:border-t-accent-500 shadow-xl h-full flex flex-col overflow-hidden transition-all duration-200 hover:shadow-2xl">
                 {/* Header */}
                 <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-900 dark:bg-accent-500 rounded-lg text-white shrink-0">
                                <Pill className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{prescription.title}</h3>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{prescription.condition}</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleCopy(formatForClipboard(prescription))}
                            className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-accent-500 hover:text-accent-500 transition-all shadow-sm active:scale-95 shrink-0"
                            title="Copiar receita completa"
                        >
                            <Copy className="w-5 h-5" />
                        </button>
                    </div>
                 </div>

                 {/* Content */}
                 <div className="p-6 flex-1 space-y-6">
                    {prescription.medications.map((med, idx) => (
                        <div key={idx} className="pl-4 border-l-2 border-slate-200 dark:border-slate-700">
                            <div className="flex justify-between items-start mb-1 gap-3">
                                <div className="font-bold text-lg text-slate-900 dark:text-white flex flex-wrap items-center gap-2">
                                    <span>{idx + 1}. {med.name}</span>
                                    {med.isAntibiotic && (
                                        <span className="text-[10px] font-bold bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded-full uppercase tracking-wide whitespace-nowrap">
                                            Antibiótico
                                        </span>
                                    )}
                                </div>
                                <div className="font-mono text-slate-500 dark:text-slate-400 font-bold shrink-0 text-right">
                                    {med.dose}
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600 dark:text-slate-300">
                                <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded whitespace-nowrap">
                                    <Clock className="w-3 h-3" /> {med.frequency}
                                </span>
                                <span className="font-medium text-slate-400 whitespace-nowrap">por {med.duration}</span>
                            </div>
                            {med.observation && (
                                <div className="mt-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                                    ⚠ {med.observation}
                                </div>
                            )}
                        </div>
                    ))}
                 </div>

                 {/* Footer / Warnings */}
                 <div className="p-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 text-sm">
                    {prescription.warning && (
                        <div className="flex items-start gap-2 text-rose-600 dark:text-rose-400 font-medium mb-3">
                            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                            {prescription.warning}
                        </div>
                    )}
                    {prescription.instructions && prescription.instructions.length > 0 && (
                        <div className="space-y-1">
                            {prescription.instructions.map((inst, i) => (
                                <p key={i} className="text-slate-500 dark:text-slate-400 text-xs flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-slate-400 shrink-0" /> {inst}
                                </p>
                            ))}
                        </div>
                    )}
                 </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

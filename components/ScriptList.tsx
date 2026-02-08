import React from 'react';
import { SCRIPTS } from '../data';
import { Quote } from 'lucide-react';
import { Card } from './ui/Card';

export const ScriptList: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Scripts de Comunicação</h2>
        <p className="text-slate-500 dark:text-slate-400">O que falar para tranquilizar e orientar o paciente.</p>
      </div>

      <div className="space-y-8">
        {SCRIPTS.map((script) => (
          <div key={script.id} className="relative pl-6 md:pl-0">
             <div className="md:hidden absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-transparent rounded-full" />
             
             <div className="mb-4">
                <div className="text-sm font-bold text-accent-600 dark:text-accent-400 uppercase tracking-wider mb-1">
                  {script.scenario}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                   {script.title}
                </h3>
             </div>

             <Card className="bg-slate-50 dark:bg-slate-800/50 border-none shadow-none relative mb-4">
                <Quote className="absolute top-4 left-4 w-8 h-8 text-slate-200 dark:text-slate-700 -z-0" />
                <p className="relative z-10 text-lg md:text-xl font-serif-text text-slate-700 dark:text-slate-200 italic leading-relaxed">
                  "{script.content}"
                </p>
             </Card>

             <div className="flex flex-wrap gap-2">
                {script.whyItWorks.map((reason, idx) => (
                   <span key={idx} className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold">
                     ✓ {reason}
                   </span>
                ))}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
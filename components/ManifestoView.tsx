import React from 'react';
import { MANIFESTO_INTRO, PAIN_POINTS } from '../data';
import { Card } from './ui/Card';
import { BrainCircuit, Lightbulb, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export const ManifestoView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Intro Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary-900 rounded-xl text-white shadow-lg shadow-primary-900/20">
                <Target className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
               {MANIFESTO_INTRO.title}
            </h1>
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none font-serif-text text-slate-700 dark:text-slate-300 leading-relaxed">
            {MANIFESTO_INTRO.content.map((para, i) => (
                <p key={i} className="mb-4">{para}</p>
            ))}
        </div>
      </motion.div>

      {/* Pain Points Section */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
             <BrainCircuit className="w-6 h-6 text-accent-500" />
             As 7 Maiores Dores Clínicas (Resolvidas)
        </h2>

        <div className="grid gap-8">
            {PAIN_POINTS.map((pain, index) => (
                <motion.div 
                    key={pain.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <Card className="border-l-4 border-l-slate-300 dark:border-l-slate-700 hover:border-l-accent-500 dark:hover:border-l-accent-500 transition-colors">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                            {pain.title}
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-rose-50 dark:bg-rose-900/10 p-4 rounded-lg">
                                <div className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase mb-2">Seu Sofrimento</div>
                                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                                    "{pain.problem}"
                                </p>
                            </div>
                            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-lg">
                                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase mb-2 flex items-center gap-2">
                                    <Lightbulb className="w-3 h-3" /> Solução deste Guia
                                </div>
                                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-medium">
                                    {pain.solution}
                                </p>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};
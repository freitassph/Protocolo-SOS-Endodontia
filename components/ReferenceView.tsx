import React, { useState, useMemo } from 'react';
import { REFERENCE_TABLES, PRE_PROCEDURE_CHECKLIST, FAQS } from '../data';
import { Card } from './ui/Card';
import { CheckCircle2, HelpCircle, Table as TableIcon, ClipboardCheck, Circle, Calculator, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

type TabType = 'decision' | 'operational' | 'checklist' | 'faq';

export const ReferenceView: React.FC = () => {
  const { checkedItems, toggleCheck } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('decision');
  const [faqSearch, setFaqSearch] = useState('');

  // Cost Calculator State
  const [costInputs, setCostInputs] = useState({
      materials: 20,
      medication: 10,
      provisional: 5,
      operational: 120, // Overhead
      price: 400
  });

  const profit = costInputs.price - (costInputs.materials + costInputs.medication + costInputs.provisional + costInputs.operational);
  const margin = Math.round((profit / costInputs.price) * 100);

  const filteredFaqs = useMemo(() => {
    if (!faqSearch) return FAQS;
    return FAQS.filter(f => 
        f.question.toLowerCase().includes(faqSearch.toLowerCase()) || 
        f.answer.toLowerCase().includes(faqSearch.toLowerCase()) ||
        f.category?.toLowerCase().includes(faqSearch.toLowerCase())
    );
  }, [faqSearch]);

  const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
      { id: 'decision', label: 'Decisão Clínica', icon: TableIcon },
      { id: 'operational', label: 'Operacional & Custos', icon: Calculator },
      { id: 'checklist', label: 'Checklists', icon: ClipboardCheck },
      { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20">
      
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Ferramentas & Referências</h2>
        <p className="text-slate-500 dark:text-slate-400">Tabelas de apoio, calculadoras e respostas rápidas.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex overflow-x-auto pb-4 gap-2 mb-6 no-scrollbar">
          {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id 
                    ? 'bg-accent-600 text-white shadow-lg shadow-accent-900/20' 
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
              </button>
          ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
        >
            {/* DECISION TABLES */}
            {activeTab === 'decision' && (
                <div className="space-y-8">
                    {REFERENCE_TABLES.filter(t => ['t1', 't2', 't5'].includes(t.id)).map((table) => (
                        <Card key={table.id} className="overflow-hidden p-0 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                        <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-5 border-b border-slate-200 dark:border-slate-800">
                            <h3 className="font-bold text-xl text-slate-900 dark:text-white">{table.title}</h3>
                            {table.description && <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{table.description}</p>}
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 dark:bg-slate-950/30 text-slate-500 border-b border-slate-200 dark:border-slate-800">
                                    {table.headers.map((h, i) => (
                                    <th key={i} className="px-6 py-4 font-bold uppercase tracking-wider text-xs">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {table.rows.map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    {row.map((cell, j) => (
                                        <td key={j} className={`px-6 py-4 text-slate-700 dark:text-slate-300 ${j===0 ? 'font-bold text-slate-900 dark:text-white' : ''} ${cell.includes('HOSPITAL') || cell.includes('REFERIR') ? 'text-rose-600 dark:text-rose-400 font-bold' : ''}`}>
                                            {cell}
                                        </td>
                                    ))}
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* OPERATIONAL & COST */}
            {activeTab === 'operational' && (
                <div className="space-y-8">
                     {/* Cost Calculator Tool */}
                     <Card className="border-accent-500/30 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-3 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                            <div className="p-3 bg-accent-500/10 rounded-lg text-accent-500">
                                <Calculator className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Calculadora de Margem</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Simule a rentabilidade do procedimento de urgência.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Custo Materiais (R$)</label>
                                    <input type="number" value={costInputs.materials} onChange={e => setCostInputs({...costInputs, materials: Number(e.target.value)})} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-slate-900 dark:text-white focus:border-accent-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Custo Medicação (R$)</label>
                                    <input type="number" value={costInputs.medication} onChange={e => setCostInputs({...costInputs, medication: Number(e.target.value)})} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-slate-900 dark:text-white focus:border-accent-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Custo Operacional/Hora (R$)</label>
                                    <input type="number" value={costInputs.operational} onChange={e => setCostInputs({...costInputs, operational: Number(e.target.value)})} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-slate-900 dark:text-white focus:border-accent-500 outline-none" />
                                </div>
                                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <label className="block text-xs font-bold text-emerald-600 dark:text-emerald-500 uppercase mb-1">Preço Cobrado (R$)</label>
                                    <input type="number" value={costInputs.price} onChange={e => setCostInputs({...costInputs, price: Number(e.target.value)})} className="w-full bg-slate-50 dark:bg-slate-950 border border-emerald-500/30 rounded-lg p-3 text-emerald-600 dark:text-emerald-400 font-bold text-lg focus:border-emerald-500 outline-none" />
                                </div>
                            </div>

                            <div className="bg-slate-100 dark:bg-slate-950 rounded-xl p-6 flex flex-col justify-center space-y-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 dark:text-slate-400 font-medium">Custo Total:</span>
                                    <span className="text-slate-900 dark:text-white font-bold text-lg">R$ {costInputs.materials + costInputs.medication + costInputs.provisional + costInputs.operational}</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
                                    <span className="text-slate-500 dark:text-slate-400 font-medium">Lucro Líquido:</span>
                                    <span className={`font-bold text-xl ${profit > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                                        R$ {profit}
                                    </span>
                                </div>
                                <div className="text-center">
                                    <div className="text-slate-500 text-xs uppercase font-bold mb-1">Margem de Lucro</div>
                                    <div className={`text-4xl font-black ${margin > 50 ? 'text-emerald-500' : margin > 20 ? 'text-amber-500' : 'text-rose-500'}`}>
                                        {margin}%
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                                        {margin > 50 ? 'Excelente rentabilidade' : margin > 20 ? 'Margem saudável' : 'Cuidado: Margem baixa'}
                                    </p>
                                </div>
                            </div>
                        </div>
                     </Card>

                     {REFERENCE_TABLES.filter(t => ['t3', 't4'].includes(t.id)).map((table) => (
                        <Card key={table.id} className="overflow-hidden p-0 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                            <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-5 border-b border-slate-200 dark:border-slate-800">
                                <h3 className="font-bold text-xl text-slate-900 dark:text-white">{table.title}</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 dark:bg-slate-950/30 text-slate-500 border-b border-slate-200 dark:border-slate-800">
                                        {table.headers.map((h, i) => (
                                        <th key={i} className="px-6 py-4 font-bold uppercase tracking-wider text-xs">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {table.rows.map((row, i) => (
                                        <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                        {row.map((cell, j) => (
                                            <td key={j} className={`px-6 py-4 text-slate-700 dark:text-slate-300 ${j===0 ? 'font-bold text-slate-900 dark:text-white' : ''}`}>
                                                {cell}
                                            </td>
                                        ))}
                                        </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* CHECKLISTS */}
            {activeTab === 'checklist' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PRE_PROCEDURE_CHECKLIST.map((section, sectionIdx) => (
                    <Card key={sectionIdx} className="bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30 transition-colors">
                        <h3 className="font-bold text-emerald-800 dark:text-emerald-100 mb-6 text-lg border-b border-emerald-100 dark:border-emerald-800 pb-2 flex justify-between items-center">
                            {section.title}
                            <span className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                                {section.items.filter((_, i) => checkedItems[`checklist-${sectionIdx}-${i}`]).length} / {section.items.length}
                            </span>
                        </h3>
                        <ul className="space-y-4">
                            {section.items.map((item, itemIdx) => {
                                const id = `checklist-${sectionIdx}-${itemIdx}`;
                                const isChecked = !!checkedItems[id];
                                
                                return (
                                <li 
                                    key={itemIdx} 
                                    onClick={() => toggleCheck(id)}
                                    className={`flex items-start gap-3 cursor-pointer group select-none transition-all duration-200 ${isChecked ? 'opacity-50' : 'opacity-100'}`}
                                >
                                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-200 ${
                                        isChecked 
                                        ? 'bg-emerald-500 border-emerald-500' 
                                        : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 group-hover:border-emerald-400'
                                    }`}>
                                        {isChecked ? (
                                        <CheckCircle2 className="w-4 h-4 text-white" />
                                        ) : (
                                        <Circle className="w-4 h-4 text-transparent" />
                                        )}
                                    </div>
                                    <span className={`text-slate-700 dark:text-slate-200 font-medium transition-all ${isChecked ? 'line-through text-slate-400' : ''}`}>
                                        {item}
                                    </span>
                                </li>
                                );
                            })}
                        </ul>
                    </Card>
                    ))}
                </div>
            )}

            {/* FAQ */}
            {activeTab === 'faq' && (
                <div className="space-y-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                        <input 
                            type="text" 
                            placeholder="Pesquisar nas perguntas frequentes..." 
                            value={faqSearch}
                            onChange={(e) => setFaqSearch(e.target.value)}
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-accent-500 outline-none transition-all shadow-sm"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((faq, idx) => (
                                <Card key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors border-l-4 border-l-slate-300 dark:border-l-slate-700 hover:border-l-accent-500 bg-white dark:bg-slate-900/50 border-y border-r border-slate-200 dark:border-slate-800">
                                    <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">{faq.category || 'Geral'}</span>
                                    </div>
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-lg">
                                    {faq.question}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-serif-text">
                                    "{faq.answer}"
                                    </p>
                                </Card>
                            ))
                        ) : (
                            <div className="col-span-2 text-center py-10 text-slate-500">
                                Nenhuma pergunta encontrada para "{faqSearch}".
                            </div>
                        )}
                    </div>
                </div>
            )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
};
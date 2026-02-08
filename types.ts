
export type ViewState = 'home' | 'manifesto' | 'diagnosis' | 'protocols' | 'protocol-detail' | 'prescriptions' | 'scripts' | 'faq' | 'references';

export type StepType = 'text' | 'checklist' | 'alert' | 'info' | 'prescription' | 'tip' | 'critical';

export interface ProtocolStep {
  title: string;
  content: string[]; 
  type: StepType;
  duration?: string;
  substeps?: string[];
}

export interface Protocol {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  color: string;
  iconName: string;
  materials?: string[]; // New: List of materials needed specific to this protocol
  steps: ProtocolStep[];
  outcome?: {
    label: string;
    value: string;
  }[];
}

export interface Prescription {
  id: string;
  title: string;
  condition: string;
  medications: Medication[];
  instructions: string[];
  warning?: string;
}

export interface Medication {
  name: string;
  dose: string;
  frequency: string;
  duration: string;
  observation?: string;
  isAntibiotic?: boolean;
}

export interface Script {
  id: string;
  title: string;
  scenario: string;
  content: string;
  whyItWorks: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface ReferenceTable {
  id: string;
  title: string;
  headers: string[];
  rows: string[][];
  description?: string;
}

export interface ChecklistSection {
  title: string;
  items: string[];
}

export interface PainPoint {
  id: string;
  title: string;
  problem: string;
  solution: string;
}

export interface DiagnosisStep {
  id: string;
  question: string;
  description: string;
  clinicalSigns: string[]; 
  radiography?: string[]; 
  yesNext?: string;
  noNext?: string;
  resultId?: string;
  alert?: string;
  yesLabel?: string;
  noLabel?: string;
}
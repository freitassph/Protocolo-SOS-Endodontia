

import { Protocol, Prescription, Script, FAQItem, ReferenceTable, ChecklistSection, PainPoint, DiagnosisStep } from './types';

export const MANIFESTO_INTRO = {
  title: "Introdução: Por que você está aqui",
  content: [
    "Você está lendo isso porque provavelmente já passou por uma dessas situações:",
    "✓ Paciente chega gritando de dor. Você tira a anestesia. Coloca mais. Ele AINDA grita.",
    "✓ Você abre o dente, procura o canal... e desaparece. Calcificação.",
    "✓ Tira a polpa toda, irriga, e nada sai. O pus tá congelado lá dentro.",
    "✓ Você fica com medo. Encaminha. Perde o paciente. Perde a confiança.",
    "Aqui está o problema: Você NÃO é mau profissional. Você só não tem protocolo.",
    "Protocolo é isso: saber exatamente o que fazer, em qual ordem, usando qual material, para que sempre funcione. Quando você tem protocolo, você não pensa. Você age com precisão."
  ]
};

export const PAIN_POINTS: PainPoint[] = [
  {
    id: 'pain1',
    title: 'Dor #1: Incerteza do Diagnóstico',
    problem: 'Você atende o paciente, pergunta "isso demora?", ele não sabe. Você fica em dúvida entre agendar ou tratar agora.',
    solution: 'Fluxograma de decisão binária. 3 perguntas definem exatamente: Urgência hoje, Importante esta semana ou Pode esperar.'
  },
  {
    id: 'pain2',
    title: 'Dor #2: Falha na Anestesia',
    problem: 'Você coloca anestesia e o paciente AINDA grita. Você estressa, o paciente assusta.',
    solution: '3 técnicas alternativas (Intraligamentar, Intrapulpar). Se a primeira falhar, a próxima resolve em 2 minutos.'
  },
  {
    id: 'pain3',
    title: 'Dor #3: Canal Calcificado',
    problem: 'Você abre o dente e o canal desaparece. Você perde 40min procurando e corre risco de perfurar.',
    solution: 'Estratégia de Busca Inteligente. Em 10min você acha ou sabe que precisa referir.'
  },
  {
    id: 'pain4',
    title: 'Dor #4: Abscesso que não drena',
    problem: 'Você abre, irriga, mas não sai nada. O medo de piorar o inchaço bate.',
    solution: '4 técnicas em sequência. Se uma não funcionar, próxima em 2-3 minutos.'
  },
  {
    id: 'pain5',
    title: 'Dor #5: Insegurança na Prescrição',
    problem: 'Qual antibiótico? Qual dose? Alergia? O medo de errar a receita.',
    solution: 'Tabelas prontas (Copie e Cole) para cada cenário: Pulpite, Abscesso, Alergia.'
  },
  {
    id: 'pain6',
    title: 'Dor #6: Paciente em Pânico',
    problem: 'O paciente chora ou treme. Você tenta explicar mas parece inseguro.',
    solution: 'Scripts prontos para acalmar o pânico, preparar para retorno e justificar o preço.'
  },
  {
    id: 'pain7',
    title: 'Dor #7: Perguntas Difíceis',
    problem: '"Quanto tempo dura?", "Quanto custa?", "Posso comer?". Você improvisa a resposta.',
    solution: 'Timeline completa, cronograma e tabela de custos para responder com autoridade.'
  }
];

export const DIAGNOSIS_STEPS: Record<string, DiagnosisStep> = {
  start: {
    id: 'start',
    question: "O dente foi tratado ou mexido recentemente (últimos 7 dias)?",
    description: "Verifique se é um caso de agudização (Flare-up) pós-tratamento endodôntico ou restaurador recente.",
    clinicalSigns: [
      "Histórico: Paciente relata 'mexeram no dente e inchou/doeu depois'.",
      "Sintoma: Dor severa e contínua após o efeito da anestesia passar.",
      "Sintoma: Sensação de 'dente crescido' pós-instrumentação.",
      "Sinal: Edema que iniciou 24-48h após a consulta."
    ],
    yesNext: 'result',
    resultId: 'p5', // Flare-up
    noNext: 'trauma'
  },
  trauma: {
    id: 'trauma',
    question: "Houve acidente, queda ou pancada recente?",
    description: "Traumatismo dentário requer ação imediata baseada no tempo decorrido.",
    clinicalSigns: [
      "Histórico: Queda, acidente esportivo, briga.",
      "Visual: Fratura de coroa com ponto sanguíneo (exposição).",
      "Visual: Dente deslocado (luxação) ou com mobilidade excessiva.",
      "Sintoma: Dor ao toque após o impacto."
    ],
    yesNext: 'result',
    resultId: 'p4', // Trauma
    noNext: 'swelling'
  },
  swelling: {
    id: 'swelling',
    question: "Há INCHAÇO visível, TRISMO ou FEBRE?",
    description: "Sinais de infecção disseminada ou abscesso agudo em fase evoluída.",
    clinicalSigns: [
      "Visual: Edema facial (assimetria no rosto).",
      "Visual: Fundo de sulco 'apagado' ou com bolha (flutuação).",
      "Sistêmico: Febre (> 37.8°C), mal-estar, linfadenopatia.",
      "Funcional: Trismo (dificuldade de abrir a boca)."
    ],
    radiography: [
      "Pode haver lesão periapical difusa ou bem definida.",
      "Espessura do ligamento periodontal muito aumentada."
    ],
    yesNext: 'result',
    resultId: 'p3', // Abscesso Agudo
    noNext: 'spontaneous',
    alert: "Se houver dificuldade respiratória ou deglutição, encaminhar ao HOSPITAL imediatamente."
  },
  spontaneous: {
    id: 'spontaneous',
    question: "A dor é ESPONTÂNEA, PULSÁTIL e INTENSA?",
    description: "A dor característica de pulpite irreversível: o paciente não consegue dormir e analgésicos comuns não resolvem.",
    clinicalSigns: [
      "Anamnese: 'Dói com o coração', 'Acorda a noite'.",
      "Teste Térmico (Frio): Dor EXACERBADA que persiste por >10 segundos após remover o estímulo.",
      "Teste Térmico (Calor): Pode piorar a dor (fase avançada).",
      "Posição: Piora ao deitar (aumento da pressão cefálica)."
    ],
    radiography: [
      "Geralmente sem alterações periapicais visíveis.",
      "Pode haver cárie profunda ou restauração extensa próxima à polpa."
    ],
    yesNext: 'result',
    resultId: 'p1', // Pulpite Irreversível
    noNext: 'biting'
  },
  biting: {
    id: 'biting',
    question: "A dor é PRINCIPALMENTE ao morder ou tocar no dente?",
    description: "Indica inflamação no ligamento periodontal (Pericementite) ou Abscesso Crônico/Fênix.",
    clinicalSigns: [
      "Percussão Vertical: DOR INTENSA (+++). É o sinal patognomônico.",
      "Sensação: 'Dente crescido' ou 'alto'.",
      "Teste Térmico: NEGATIVO (Necrose) ou Leve (Se for apenas trauma oclusal).",
      "Palpação: Dor na gengiva na região do ápice da raiz."
    ],
    radiography: [
      "Espaço ligamentar periodontal espessado (linha preta grossa ao redor da raiz).",
      "Lesão radiolúcida (bolinha preta) no ápice."
    ],
    yesNext: 'result',
    resultId: 'p2', // Pericementite / Abscesso Crônico
    noNext: 'provoked'
  },
  provoked: {
    id: 'provoked',
    question: "A dor é SÓ provocada (frio/doce) e PASSA RÁPIDO?",
    description: "Diferenciação crucial para não tratar canal desnecessariamente (Pulpite Reversível).",
    clinicalSigns: [
      "Estímulo: Água gelada, sorvete, doces.",
      "Resposta: Dor aguda (choque) imediata.",
      "Duração: Cessa em < 5-10 segundos após remover o estímulo.",
      "Sem dor espontânea. Sem dor à percussão."
    ],
    yesNext: 'result',
    resultId: 'p6', // Pulpite Reversível
    noNext: 'uncertain'
  },
  uncertain: {
    id: 'uncertain',
    question: "Os sintomas permanecem difusos ou inconclusivos?",
    description: "Se nenhuma das situações anteriores descreveu o quadro, considere diagnósticos não-endodônticos (DTM, Sinusite) ou monitore como tratamento conservador.",
    clinicalSigns: [
      "Ausência de sinais claros de Pulpite ou Abscesso.",
      "Dor difusa ou reflexa.",
      "Dúvida no dente causal."
    ],
    yesNext: 'result',
    resultId: 'p6', // Redireciona para Reversível/Conservador como falha segura
    noNext: 'result',
    yesLabel: 'Sim, inconclusivo',
    noLabel: 'Finalizar Diagnóstico'
  },
  result: {
    id: 'result',
    question: '',
    description: '',
    clinicalSigns: []
  }
};

export const PROTOCOLS: Protocol[] = [
  {
    id: 'p1',
    title: 'Pulpite Irreversível Sintomática',
    shortTitle: 'P1: Pulpite (Drenagem Pressão)',
    description: 'Polpa inflamada e viva. Pressão interna altíssima. Anestesia é difícil. Objetivo: Analgesia imediata via descompressão.',
    color: 'bg-emerald-600',
    iconName: 'Activity',
    materials: [
      'Articaína 4% c/ Epinefrina', 
      'Agulha 30G Curta (Intraligamentar)',
      'Broca 1014 HL (Diamantada)',
      'Limas K-File #10, #15, #20',
      'Hipoclorito de Sódio 2.5% (Seringa 3ml)',
      'Hidróxido de Cálcio (Pasta)',
      'IRM ou Resina Provisória'
    ],
    steps: [
      {
        title: 'Passo 1: A Anestesia "Blindada"',
        type: 'text',
        content: [
          'A polpa inflamada resiste à lidocaína. Siga esta ordem exata:',
          '1. Infiltrativa/Bloqueio: Articaína 4% (1.8mL). Aguarde 5 minutos cronometrados.',
          '2. Falhou? Intraligamentar: Agulha 30G curta no sulco gengival (45°). 0.2mL sob pressão. Efeito imediato.',
          '3. Falhou? Intrapulpar: Acesso direto à polpa. Injete 0.2mL dentro do canal. Dói por 3s, depois silêncio total.'
        ],
        duration: '5-10 min'
      },
      {
        title: 'Passo 2: Acesso e Remoção de Teto',
        type: 'checklist',
        content: [
          'Remova TODA cárie e restaurações antigas antes de abrir (evita levar bactéria para dentro).',
          'Use Broca 1014 HL com refrigeração abundante.',
          'Aprofunde até sentir o "vazio" da câmara.',
          'Dente posterior: Remova todo o teto (divergência das paredes).'
        ],
        duration: '5 min'
      },
      {
        title: 'Passo 3: Exploração e Drenagem Inicial',
        type: 'text',
        content: [
          'Use lima K-file #10 (fina).',
          'Localize a entrada dos canais. Remova a polpa coronária.',
          'DICA: Se sair sangue vivo e pulsante, é ÓTIMO. Deixe sangrar por 1-2 min. Isso reduz a pressão interna.'
        ],
        duration: '3 min'
      },
      {
        title: 'Passo 4: Instrumentação de Alívio',
        type: 'critical',
        content: [
          'Objetivo: Cortar a polpa e ventilar, NÃO limpar tudo.',
          'Sequência: Lima #10, depois #15, depois #20.',
          'Movimento: Oscilatório (meia-volta) suave.',
          'Limite: Trabalhe 1mm AQUÉM do ápice aparente. Não force a lima para fora do dente.'
        ],
        duration: '5-10 min'
      },
      {
        title: 'Passo 5: Irrigação e Medicação',
        type: 'text',
        content: [
          'Irrigue com Hipoclorito 2.5% (5mL total). Use agulha fina sem travar no canal.',
          'Aspire e seque a câmara (não o canal) com bolinha de algodão estéril.',
          'Aplique Hidróxido de Cálcio (Pasta) com Lentulo ou própria seringa. Preencha a câmara.'
        ],
        duration: '5 min'
      },
      {
        title: 'Passo 6: Fechamento Provisório',
        type: 'info',
        content: [
          'Feche hermeticamente com IRM ou Resina Fluida sobre o curativo.',
          'Cheque a oclusão com papel carbono (deixe infra-oclusão).',
          'AVISO: Se o paciente mastigar alto, a dor voltará em 12h (Pericementite secundária).'
        ],
        duration: '2 min'
      },
      {
        title: 'Orientações de Alta',
        type: 'prescription',
        content: [
          'Prescrição Padrão: Ibuprofeno 600mg (6/6h) + Dipirona.',
          'Antibiótico NÃO é necessário (a infecção é interna).',
          'Avisar: "Sensação de pressão passa em 24h. Volte em 7 dias."'
        ]
      }
    ],
    outcome: [
      { label: 'Dor inicial', value: '10/10' },
      { label: 'Pós-procedimento', value: '2/10' },
      { label: 'Alívio 24h', value: 'Total' },
      { label: 'Prognóstico', value: 'Excelente' }
    ]
  },
  {
    id: 'p2',
    title: 'Pericementite / Abscesso Crônico',
    shortTitle: 'P2: Necrose/Abscesso (Drenagem Apical)',
    description: 'A infecção saiu do dente e está no osso. Dor ao toque (percussão). Objetivo: Limpar o canal e drenar via ápice.',
    color: 'bg-amber-500',
    iconName: 'AlertTriangle',
    materials: [
      'Articaína 4%', 
      'Limas K #10, #15, #20', 
      'Hipoclorito 2.5% (Alto Volume)', 
      'Hidróxido de Cálcio + Iodofórmio',
      'Seringa 5mL ou 10mL'
    ],
    steps: [
      {
        title: 'Diferença Fundamental',
        type: 'critical',
        content: [
          'Ao contrário da Pulpite (P1), aqui a infecção está FORA.',
          'Você DEVE passar a lima através do ápice (Patência Foraminal).',
          'Se não passar o ápice, o pus não sai e a dor não passa.'
        ]
      },
      {
        title: 'Passo 1: Acesso',
        type: 'text',
        content: [
          'Anestesia Articaína 4% (mesmo se dente "morto", o ligamento dói).',
          'Acesse a câmara. Se for retratamento, remova guta-percha velha (use solvente ou broca Gates se necessário).'
        ],
        duration: '5 min'
      },
      {
        title: 'Passo 2: Instrumentação (A Chave do Sucesso)',
        type: 'text',
        content: [
          'Encha a câmara de Hipoclorito.',
          'Introduza Lima #10 delicadamente até sentir que passou a ponta da raiz.',
          'Suba para Lima #15 e depois #20, sempre ultrapassando o ápice (1mm além).',
          'O "AHA MOMENT": Quando sair exsudato (pus ou líquido claro) pelo canal.'
        ],
        duration: '10-15 min'
      },
      {
        title: 'Passo 3: Irrigação Agressiva',
        type: 'tip',
        content: [
          'Use MUITO Hipoclorito (10-15mL).',
          'A agulha deve ir fundo (sem travar).',
          'O fluxo de líquido "lava" as bactérias para fora.',
          'Aspire vigorosamente.'
        ],
        duration: '5 min'
      },
      {
        title: 'Passo 4: Medicação Intracanal',
        type: 'checklist',
        content: [
          'Seque o canal com pontas de papel.',
          'Misture Hidróxido de Cálcio com Iodofórmio (pó amarelo) e soro/anestésico.',
          'O Iodofórmio é potente bactericida e deixa a pasta radiopaca.',
          'Preencha bem o canal.'
        ],
        duration: '3 min'
      },
      {
        title: 'Passo 5: Decisão de Fechamento',
        type: 'text',
        content: [
          'CENÁRIO A (Pouco pus): Feche com IRM.',
          'CENÁRIO B (Muito pus/Drenagem ativa): NÃO FECHE completamente. Coloque bolinha de algodão na entrada e deixe drenar por 24h. Paciente retorna amanhã.'
        ],
        duration: '2 min'
      },
      {
        title: 'Prescrição Obrigatória',
        type: 'prescription',
        content: [
          'Amoxicilina 500mg (8/8h por 10 dias). Sem falhas.',
          'Se alérgico: Clindamicina 300mg (6/6h) ou Azitromicina.',
          'Ibuprofeno + Dipirona para dor residual.'
        ]
      }
    ],
    outcome: [
      { label: 'Dor inicial', value: '8/10' },
      { label: 'Percussão', value: 'Zera em 3d' },
      { label: 'Inchaço', value: 'Reduz 48h' },
      { label: 'Retorno', value: '98% Sucesso' }
    ]
  },
  {
    id: 'p3',
    title: 'Abscesso Agudo com Edema',
    shortTitle: 'P3: Abscesso Agudo (Risco Sistêmico)',
    description: 'Rosto inchado, possível febre, trismo. A infecção é agressiva. Prioridade total: DRENAGEM (via dente ou incisão).',
    color: 'bg-rose-600',
    iconName: 'Siren',
    materials: ['Bisturi Lâmina 15', 'Pinça Hemostática', 'Dreno de Penrose ou Tira de Dique', 'Amoxicilina Dose Alta'],
    steps: [
      {
        title: '🚨 CRITÉRIOS DE HOSPITAL (Não toque)',
        type: 'alert',
        content: [
          '1. Edema Bilateral (Angina de Ludwig - Risco de asfixia).',
          '2. Dificuldade de respirar ou engolir.',
          '3. Febre > 39°C com taquicardia.',
          '4. Paciente letárgico ou confuso.',
          'AÇÃO: Encaminhar para emergência hospitalar imediatamente.'
        ]
      },
      {
        title: 'Passo 1: Anestesia (O Desafio)',
        type: 'text',
        content: [
          'O pH ácido do pus anula o anestésico local.',
          'Não injete DENTRO do inchaço (espalha infecção).',
          'Faça bloqueios regionais à distância.',
          'Faça perilesional (em volta do inchaço) superficialmente.',
          'Avise o paciente: "Vai aliviar, mas não vai zerar a dor agora".'
        ],
        duration: '10 min'
      },
      {
        title: 'Passo 2: Drenagem Cirúrgica (Se flutuar)',
        type: 'checklist',
        content: [
          'Toque o inchaço. Tem ponto mole (flutuação)? Se SIM -> INCISÃO.',
          'Incisão na base da flutuação (parte mais baixa) com Lâmina 15.',
          'Divulsione com pinça hemostática fechada, abra dentro da lesão.',
          'Deixe o pus sair. Instale dreno (tira de luva estéril ou dique) por 24h.'
        ],
        duration: '5-10 min'
      },
      {
        title: 'Passo 3: Drenagem via Dente',
        type: 'text',
        content: [
          'Se não flutuar (duro), a drenagem deve ser pelo canal.',
          'Acesse o dente e use Lima #15/#20 além do ápice (igual Protocolo 2).',
          'Deixe o dente ABERTO (sem curativo) por 24h para drenagem contínua.'
        ],
        duration: '20 min'
      },
      {
        title: 'Passo 4: Prescrição de Ataque',
        type: 'prescription',
        content: [
          'Amoxicilina 500mg de 6/6 horas (Dose aumentada). 14 dias.',
          'Se grave: Associar Metronidazol 400mg.',
          'Monitorar febre a cada 4h. Se subir -> HOSPITAL.'
        ]
      },
      {
        title: 'Orientações Pós-Drenagem',
        type: 'info',
        content: [
          'Compressas: Frias nas primeiras 24h, mornas depois.',
          'Hidratação abundante.',
          'Retorno OBRIGATÓRIO em 24h para avaliar evolução.'
        ]
      }
    ],
    outcome: [
      { label: 'Febre', value: 'Baixa 24h' },
      { label: 'Edema', value: 'Piora 12h, depois cai' },
      { label: 'Risco', value: 'Alto' },
      { label: 'Retorno', value: '24h (Obrig.)' }
    ]
  },
  {
    id: 'p4',
    title: 'Trauma com Exposição Pulpar',
    shortTitle: 'P4: Trauma (O Relógio Corre)',
    description: 'Dente quebrado com "sangue no meio". O tempo entre o acidente e o atendimento define a vida do dente.',
    color: 'bg-blue-600',
    iconName: 'Zap',
    materials: ['Clorexidina 2%', 'MTA ou Biodentine', 'Cimento de Ionômero de Vidro', 'Resina', 'Broca Esférica Diamantada'],
    steps: [
      {
        title: 'A REGRA DE OURO DO TEMPO',
        type: 'critical',
        content: [
          '< 30 minutos: 95% chance de manter polpa viva (Capeamento).',
          '30 min a 2 horas: 80% chance (Pulpotomia Parcial).',
          '2 a 6 horas: Risco elevado (Pulpotomia Total).',
          '> 24 horas: Considere necrose (Tratamento de Canal convencional - P2).'
        ]
      },
      {
        title: 'Passo 1: Lavagem e Anestesia',
        type: 'text',
        content: [
          'Lave suavemente com soro fisiológico ou água.',
          'NÃO use jato de ar direto na polpa exposta.',
          'Anestesia sem vasoconstritor excessivo na área direta (para manter sangramento diagnóstico).'
        ],
        duration: '5 min'
      },
      {
        title: 'CENÁRIO A: Exposição pequena (<1mm) e recente (<2h)',
        type: 'checklist',
        content: [
          'Técnica: Capeamento Pulpar Direto.',
          'Limpe com Clorexidina 2% (bolinha de algodão).',
          'Aplique MTA ou Hidróxido de Cálcio (Pasta) suavemente sobre o ponto vermelho.',
          'Sele com Cimento de Ionômero de Vidro.',
          'Restaure com Resina por cima.'
        ],
        duration: '15 min'
      },
      {
        title: 'CENÁRIO B: Exposição maior (>1mm) ou tempo (2-6h)',
        type: 'checklist',
        content: [
          'Técnica: Pulpotomia (Cvek).',
          'Use broca esférica diamantada nova, alta rotação, refrigeração máxima.',
          'Remova 2mm de polpa superficial (tecido inflamado).',
          'Lave até parar de sangrar (hemostasia em 2-3 min).',
          'Se parar de sangrar: Cubra com MTA -> Ionômero -> Resina.',
          'Se NÃO parar de sangrar: Inflamação é profunda -> Vá para Protocolo 1 (Canal).'
        ],
        duration: '25 min'
      },
      {
        title: 'Orientações Cruciais',
        type: 'alert',
        content: [
          'Dieta pastosa por 14 dias (não morder nada duro).',
          'Teste de vitalidade em 15, 30 e 90 dias.',
          'Se o dente escurecer (ficar cinza), a polpa morreu -> Retornar.'
        ]
      }
    ],
    outcome: [
      { label: 'Sucesso <30m', value: '95%' },
      { label: 'Sucesso 2h+', value: '70%' },
      { label: 'Vitalidade', value: 'Monitorar' },
      { label: 'Retorno', value: '15 dias' }
    ]
  },
  {
    id: 'p5',
    title: 'Agudização (Flare-up)',
    shortTitle: 'P5: Flare-up (Dor Pós-Op)',
    description: 'Paciente tratou o canal há 1 ou 2 dias e voltou com dor insuportável e inchaço. Pânico comum.',
    color: 'bg-orange-600',
    iconName: 'Activity',
    materials: ['Papel de Articulação', 'Limas K', 'Hipoclorito 2.5%', 'Corticóide (Dexametasona)', 'Otosporin (Opcional)'],
    steps: [
      {
        title: 'Acalme o Paciente (e você)',
        type: 'info',
        content: [
          'Isso acontece por extrusão de debris ou mudança na flora bacteriana.',
          'É reversível. Não significa que o tratamento falhou, apenas complicou.'
        ]
      },
      {
        title: 'Passo 1: Ajuste Oclusal (Obrigatório)',
        type: 'critical',
        content: [
          'O dente extruiu (saiu do alvéolo) pela inflamação.',
          'Ao fechar a boca, ele toca primeiro e apanha a cada mordida.',
          'Desgaste a restauração até deixar em INFRA-OCLUSÃO (sem toque).',
          'Isso remove 50% da dor mecânica imediatamente.'
        ]
      },
      {
        title: 'Passo 2: Reintervenção (Se houver edema)',
        type: 'text',
        content: [
          'Remova o curativo.',
          'Irrigue abundantemente com Hipoclorito.',
          'Repasse a lima de patência (#15) além do ápice para drenar exsudato.',
          'Seque e troque a medicação.'
        ],
        duration: '15 min'
      },
      {
        title: 'Passo 3: Medicação Intra e Extra',
        type: 'prescription',
        content: [
          'Intracanal: Associe Corticóide (ex: Otosporin gotas) ao Hidróxido de Cálcio.',
          'Sistêmico: Dexametasona 4mg (1cp ao dia por 3 dias) - Potente anti-inflamatório.',
          'Mantenha ou inicie Antibiótico se houver sinais de infecção (pus).'
        ]
      }
    ],
    outcome: [
      { label: 'Alívio', value: '12-24h' },
      { label: 'Edema', value: 'Reduz 48h' },
      { label: 'Retorno', value: '48h' }
    ]
  },
  {
    id: 'p6',
    title: 'Pulpite Reversível (Tratamento Conservador)',
    shortTitle: 'P6: Reversível (Não fazer Canal)',
    description: 'Dor provocada (frio/doce) que passa rápido (<10s). A polpa está sadia, só irritada. O tratamento é RESTAURADOR, não endodôntico.',
    color: 'bg-teal-600',
    iconName: 'Shield',
    materials: ['Brocas Esféricas', 'Cimento de Hidróxido de Cálcio (Dycal)', 'Cimento Ionômero de Vidro', 'Resina', 'Papel Carbono'],
    steps: [
      {
        title: 'O Teste Definitivo',
        type: 'critical',
        content: [
          'Coloque gelo. Conte os segundos após tirar.',
          'Dor passou em 5 segundos? -> REVERSÍVEL.',
          'Dor continua latejando por 30s+? -> IRREVERSÍVEL (Vá para Protocolo 1).'
        ]
      },
      {
        title: 'Passo 1: Remoção do Irritante',
        type: 'text',
        content: [
          'Anestesia (conforto).',
          'Remova toda a restauração antiga infiltrada ou tecido cariado.',
          'Use brocas em baixa rotação perto da polpa para não aquecer.'
        ],
        duration: '10 min'
      },
      {
        title: 'Passo 2: Proteção Pulpar',
        type: 'checklist',
        content: [
          'Lave com Clorexidina 2%. Não resseque a dentina.',
          'Cavidade profunda? Aplique forramento de Hidróxido de Cálcio (Dycal) no ponto mais fundo.',
          'Cubra o Dycal com Cimento de Ionômero de Vidro (base).'
        ],
        duration: '5 min'
      },
      {
        title: 'Passo 3: Restauração Definitiva',
        type: 'text',
        content: [
          'Não use provisório (infiltra). Faça a restauração definitiva em Resina/Amálgama agora.',
          'O selamento perfeito é o que cura a polpa.',
          'Ajuste oclusal minucioso.'
        ],
        duration: '20 min'
      },
      {
        title: 'Prognóstico',
        type: 'tip',
        content: [
          'Avise: "Pode ficar sensível ao frio por alguns dias, é normal (pós-operatório)".',
          'Se começar a doer espontaneamente (sozinho), ligue (virou canal).'
        ]
      }
    ],
    outcome: [
      { label: 'Custo', value: 'Restauração' },
      { label: 'Tempo', value: '40min' },
      { label: 'Vitalidade', value: 'Mantida' }
    ]
  }
];

export const PRESCRIPTIONS: Prescription[] = [
  {
    id: 'rx1',
    title: 'Pulpite Irreversível (Padrão)',
    condition: 'Dor espontânea, sem inchaço, sem febre.',
    medications: [
      { name: 'Ibuprofeno', dose: '600mg', frequency: 'A cada 6 horas', duration: '5 a 7 dias', observation: 'Tomar após refeições. Máx 4cp/dia.' },
      { name: 'Dipirona Sódica', dose: '500mg ou 1g', frequency: 'A cada 4 ou 6 horas', duration: 'Enquanto houver dor', observation: 'Intercalar com Ibuprofeno se necessário.' },
      { name: 'Omeprazol', dose: '20mg', frequency: '1x ao dia (Manhã)', duration: '7 dias', observation: 'Em jejum, para proteção estomacal.' }
    ],
    instructions: [
      'Não mastigue sobre o dente tratado por pelo menos 5 dias.',
      'Prefira alimentos pastosos e mornos (evite temperaturas extremas).',
      'Se houver aumento de volume (inchaço) no rosto, entre em contato imediatamente.',
      'O alívio da dor deve ser significativo em 24h. Se piorar, ligue.'
    ]
  },
  {
    id: 'rx2',
    title: 'Abscesso / Pericementite',
    condition: 'Dor ao morder, inchaço leve localizado, presença de pus.',
    medications: [
      { name: 'Amoxicilina', dose: '500mg', frequency: 'A cada 8 horas', duration: '10 dias COMPLETOS', observation: 'Horários rígidos (ex: 7h, 15h, 23h). Não pular.', isAntibiotic: true },
      { name: 'Ibuprofeno', dose: '600mg', frequency: 'A cada 6 horas', duration: '5 a 7 dias', observation: 'Anti-inflamatório principal.' },
      { name: 'Dipirona Sódica', dose: '500mg', frequency: 'A cada 4 horas', duration: '3 a 5 dias', observation: 'Para dor residual.' },
      { name: 'Omeprazol', dose: '20mg', frequency: '1x ao dia', duration: '10 dias', observation: 'Proteção gástrica obrigatória.' }
    ],
    warning: 'O paciente DEVE terminar os 10 dias de antibiótico para evitar resistência bacteriana.',
    instructions: [
      'Inicie o antibiótico imediatamente.',
      'Não interrompa o tratamento mesmo que a dor suma no 3º dia.',
      'Se tiver diarreia intensa, consumir iogurte natural ou probióticos.',
      'Compressas mornas externas podem ajudar se houver inchaço leve.'
    ]
  },
  {
    id: 'rx3',
    title: 'Abscesso Sistêmico (Grave)',
    condition: 'Febre > 37.8°C, Trismo, Edema facial visível/difuso.',
    medications: [
      { name: 'Amoxicilina', dose: '500mg', frequency: 'A cada 6 horas', duration: '14 dias', observation: 'DOSE AUMENTADA. Rigor absoluto no horário.', isAntibiotic: true },
      { name: 'Metronidazol', dose: '400mg', frequency: 'A cada 8 horas', duration: '7 dias', observation: 'Adicionar APENAS se houver cheiro fétido/anaeróbios.', isAntibiotic: true },
      { name: 'Ibuprofeno', dose: '600mg', frequency: 'A cada 6 horas', duration: '7 dias', observation: 'Reduz inflamação e dor.' },
      { name: 'Dipirona', dose: '1g', frequency: 'A cada 4 horas', duration: 'Enquanto houver febre/dor', observation: 'Controle térmico.' },
      { name: 'Omeprazol', dose: '20mg', frequency: '1x ao dia', duration: '14 dias', observation: 'Jejum.' }
    ],
    warning: 'RISCO DE VIDA. Se houver dificuldade respiratória: HOSPITAL IMEDIATO.',
    instructions: [
      'Monitorar temperatura a cada 4 horas. Se > 38.5°C após 24h de antibiótico -> HOSPITAL.',
      'Repouso absoluto por 48 horas.',
      'Hidratação forçada (3 litros de água/dia).',
      'Alimentação líquida nutritiva.'
    ]
  },
  {
    id: 'rx4',
    title: 'Alergia a Penicilina (Opção A)',
    condition: 'Paciente alérgico - Opção de adesão fácil (1x dia).',
    medications: [
      { name: 'Azitromicina', dose: '500mg', frequency: '1x ao dia', duration: '5 dias', observation: 'Dose única diária. 1 hora antes de comer.', isAntibiotic: true },
      { name: 'Ibuprofeno', dose: '600mg', frequency: 'A cada 6 horas', duration: '5 dias', observation: 'Anti-inflamatório.' },
      { name: 'Dipirona', dose: '500mg', frequency: 'A cada 4 horas', duration: 'Se dor', observation: 'Analgésico.' }
    ],
    instructions: [
      'A Azitromicina tem efeito prolongado, tomar apenas 5 dias é suficiente.',
      'Se houver desconforto gástrico severo, suspender e contatar dentista.'
    ]
  },
  {
    id: 'rx5',
    title: 'Alergia a Penicilina (Opção B)',
    condition: 'Paciente alérgico - Infecção óssea/persistente.',
    medications: [
      { name: 'Clindamicina', dose: '300mg', frequency: 'A cada 6 horas', duration: '7 a 10 dias', observation: 'Excelente penetração óssea.', isAntibiotic: true },
      { name: 'Ibuprofeno', dose: '600mg', frequency: 'A cada 6 horas', duration: '5 dias', observation: '' },
      { name: 'Omeprazol', dose: '20mg', frequency: '1x ao dia', duration: '10 dias', observation: 'Obrigatório.' }
    ],
    warning: 'Risco alto de gastrite/esofagite. Beber com muita água.',
    instructions: [
      'NUNCA tome Clindamicina e deite em seguida (risco de queimação no esôfago).',
      'Fique em pé/sentado por 30min após tomar.',
      'Se tiver diarreia, suspenda e ligue.'
    ]
  },
  {
    id: 'rx6',
    title: 'Traumatismo Dentário',
    condition: 'Queda/Pancada. Luxação ou Fratura. Sem infecção visível.',
    medications: [
      { name: 'Ibuprofeno', dose: '600mg', frequency: 'A cada 6 horas', duration: '7 dias', observation: 'Fundamental para desinflamar ligamento.' },
      { name: 'Dipirona', dose: '500mg', frequency: 'A cada 4 horas', duration: '3 dias', observation: 'Apenas se dor.' },
      { name: 'Omeprazol', dose: '20mg', frequency: '1x ao dia', duration: '7 dias', observation: 'Proteção.' }
    ],
    instructions: [
      'DIETA LÍQUIDA/PASTOSA por 14 dias (sem mastigar nada sólido).',
      'Não morder com os dentes da frente (nem pão macio).',
      'Higienizar a área suavemente com cotonete e enxaguante sem álcool (Clorexidina 0.12%) se a escova doer.'
    ]
  },
  {
    id: 'rx7',
    title: 'Flare-up (Dor Pós-Canal)',
    condition: 'Paciente tratou canal ontem e hoje está inchado/com dor forte.',
    medications: [
      { name: 'Dexametasona', dose: '4mg', frequency: '1x ao dia', duration: '3 dias', observation: 'Tomar pela manhã. Potente anti-inflamatório.', isAntibiotic: false },
      { name: 'Dipirona', dose: '1g', frequency: 'A cada 6 horas', duration: '3 dias', observation: 'Dose máxima para dor aguda.' },
      { name: 'Antibiótico', dose: 'Manter anterior', frequency: '-', duration: '-', observation: 'Se já estava tomando, continue. Se não, avaliar necessidade.', isAntibiotic: true }
    ],
    warning: 'Dexametasona: Cuidado com diabéticos (aumenta glicose) e hipertensos.',
    instructions: [
      'Fazer bochecho com água morna e sal para ajudar drenagem se houver ponto de pus.',
      'Dormir com travesseiro alto (cabeça elevada) hoje.'
    ]
  }
];

export const SCRIPTS: Script[] = [
  {
    id: 's1',
    title: 'Acalmando o Pânico',
    scenario: 'Paciente chega gritando ou chorando de dor.',
    content: "Olha só, você está com dor porque tem uma inflamação DENTRO do dente criando pressão. Essa pressão é que dói. A gente vai fazer um procedimento simples que leva uns 30 minutos. Neste procedimento, a gente VAI TIRAR essa pressão. Assim que abrirmos, a dor vai cair drasticamente. Pode doer 3 segundos na anestesia, mas depois passa. Confia em mim, você vai sair daqui respirando aliviado.",
    whyItWorks: ['Explica a causa sem jargão', 'Promete prazo curto (30min)', 'Pede confiança explicitamente']
  },
  {
    id: 's2',
    title: 'Preparando o Retorno',
    scenario: 'Paciente melhorou e acha que acabou.',
    content: "Terminamos! Você já tá melhor. Mas deixa eu explicar: O que fizemos hoje foi URGÊNCIA. Tiramos a dor e a pressão. Mas é como um 'band-aid'. Se você não voltar na próxima semana para fazer o tratamento completo, a bactéria volta e a dor volta pior. Vamos deixar agendado agora para garantir?",
    whyItWorks: ['Analogia do Band-aid', 'Aviso de consequência (dor volta)', 'Compromisso imediato']
  },
  {
    id: 's3',
    title: 'Justificando o Preço',
    scenario: 'Urgência é mais cara que consulta normal.',
    content: "A urgência custa mais porque parei minha agenda, cancelei um horário e usei materiais específicos para resolver sua dor aguda HOJE. Você está pagando pela velocidade e pelo alívio imediato. Num especialista de plantão seria o dobro. Aqui você está pagando para sair sem dor agora.",
    whyItWorks: ['Foca no valor (alívio imediato)', 'Explica custo de oportunidade', 'Ancoragem de preço (especialista é mais caro)']
  }
];

export const FAQS: FAQItem[] = [
  { category: 'Estética', question: "Meu dente pode virar cinzento?", answer: "Pode, especialmente em trauma onde a polpa morre. Não é problema de saúde, é cosmético. Podemos fazer clareamento interno depois que resolve em 90% dos casos." },
  { category: 'Medicação', question: "Preciso de antibiótico?", answer: "Para Pulpite (só inflamação): NÃO. Para Abscesso (infecção/pus): SIM. Para Trauma: NÃO (exceto infecção secundária)." },
  { category: 'Trabalho', question: "Posso trabalhar depois?", answer: "Sim. Em pulpite, vida normal. Em abscesso ou cirurgia, recomendo descanso no dia do procedimento e retorno leve no dia seguinte." },
  { category: 'Clínico', question: "Qual a diferença urgência vs completo?", answer: "Urgência (30min) tira a dor/pressão. Completo (60-90min) limpa, modela e sela permanentemente. Sem o completo, a dor volta." },
  { category: 'Dor', question: "Quanto tempo a dor leva para passar?", answer: "Cai drasticamente em 30min após abrir. Em 24h melhora 60-80%. Em 48h, 90%. Se não melhorar em 24h, ligue." },
  { category: 'Tratamento', question: "Posso pular a próxima sessão?", answer: "Não. Se pular, em 2-3 semanas a bactéria volta, o curativo falha e você corre risco de perder o dente." },
  { category: 'Custo', question: "Qual o gasto total estimado?", answer: "Urgência (R$300-500) + Tratamento Completo (R$800-1500) + Restauração (R$500+). Total R$1700-3000. Implante custaria R$3500-5500." },
  { category: 'Medo', question: "Tenho medo de agulha.", answer: "Usamos anestesia tópica antes, agulha extra-fina (30G) e injeção lenta. A dor dura 3 segundos. Eu conto até 3 com você." },
  { category: 'Clínico', question: "Dente muito destruído salva?", answer: "Se a raiz estiver boa, sim (90% chance). Se a raiz estiver roída ou fraturada verticalmente, não. Hora de pensar em implante." },
  { category: 'Segurança', question: "É seguro? Qual o risco?", answer: "Muito seguro. Risco de falha <5%. Risco de fratura ou perfuração existe mas é baixo com profissional cuidadoso." },
  { category: 'Falha', question: "Se falhar, o que faz?", answer: "Retratamento. Se dor voltar na semana seguinte, a gente abre e limpa de novo. Sem custo adicional na fase de urgência." },
  { category: 'Extração', question: "Pode deixar de existir o dente?", answer: "95% chance de durar 15-30 anos se bem tratado. 5% de falha futura. Ainda assim vale a pena tentar salvar." },
  { category: 'Exames', question: "Preciso de raio-X?", answer: "Sim, sempre. Para ver anatomia, infecção óssea e segurança do procedimento. A radiação é mínima (igual a 1h de sol)." },
  { category: 'Alergia', question: "E se tiver alergia a medicamento?", answer: "Temos alternativas seguras (Azitromicina, Clindamicina). Sempre avise antes da prescrição." },
  { category: 'Gestante', question: "Gestante pode fazer?", answer: "Sim, e DEVE. A infecção gera mais risco ao feto que o tratamento. Usamos anestésico seguro e proteção de chumbo." },
  { category: 'Diabético', question: "Diabético tem mais risco?", answer: "Sim. Cicatrização lenta e risco de infecção maior. Usamos antibiótico mais agressivo e monitoramos febre em 24h." },
  { category: 'Durabilidade', question: "Quanto tempo dura bem feito?", answer: "15 a 30 anos se bem cuidado. Se tiver trauma posterior ou cárie, menos." },
  { category: 'Estética', question: "Clareamento interno funciona?", answer: "Sim, em 90% dos casos. É feito 3-4 meses após o tratamento de canal, se escurecer." },
  { category: 'Cor', question: "Tratamento de canal muda a cor?", answer: "O tratamento em si não. O trauma ou sangue preso na polpa sim. Limpeza bem feita minimiza isso." },
  { category: 'Sintomas', question: "Sinto gosto ruim na boca.", answer: "É normal sair um pouco do medicamento ou curativo. Se o gosto for de pus, volte aqui." }
];

export const REFERENCE_TABLES: ReferenceTable[] = [
  {
    id: 't1',
    title: 'Quando Referir para Especialista',
    description: 'Não tente ser herói se encontrar estas situações.',
    headers: ['Situação', 'Ação', 'Motivo', 'Prazo'],
    rows: [
      ['Canal Calcificado (>10min busca)', 'REFERIR', 'Risco de perfuração', 'Hoje/48h'],
      ['Raiz Perfurada', 'REFERIR', 'Precisa selamento MTA', '48h'],
      ['Fratura Radicular Visível', 'REFERIR', 'Prognóstico ruim', '48h'],
      ['Pino Endodôntico no Dente', 'REFERIR', 'Não remove em urgência', 'Eletivo'],
      ['Abscesso Edema Bilateral', 'HOSPITAL', 'Risco mediastinite', 'IMEDIATO'],
      ['Abscesso com Dificuldade Respiratória', 'HOSPITAL', 'Risco de vida', 'IMEDIATO'],
      ['Paciente Diabético Descompensado', 'REFERIR', 'Risco sistêmico', '24h'],
      ['Febre > 39°C persistente', 'HOSPITAL', 'Sepse possível', 'IMEDIATO'],
      ['Retratamento (3ª tentativa)', 'REFERIR', 'Complexidade alta', 'Eletivo'],
      ['Múltiplos Canais Calcificados', 'REFERIR', 'Sucesso baixo', '48h']
    ]
  },
  {
    id: 't2',
    title: 'Quando Manter no Consultório',
    description: 'Protocolos que você pode executar com segurança.',
    headers: ['Situação', 'Protocolo', 'Sucesso Estimado'],
    rows: [
      ['Pulpite Simples (1ª vez)', 'Protocolo 1', '95%'],
      ['Abscesso Crônico Localizado', 'Protocolo 2', '85%'],
      ['Abscesso Agudo (sem febre alta)', 'Protocolo 3', '90%'],
      ['Trauma Exp. < 2mm (< 2h)', 'Protocolo 4A', '90%'],
      ['Trauma Exp. 1-3mm (< 6h)', 'Protocolo 4B', '70%'],
      ['Reinflamação (Tratado voltou dor)', 'Protocolo 5 (Agudização)', '80%'],
      ['Guta-percha velha (1ª retratamento)', 'Protocolo 2 Modificado', '75%'],
      ['Dor provocada rápida', 'Protocolo 6 (Reversível)', '99%']
    ]
  },
  {
    id: 't3',
    title: 'Cronograma do Procedimento',
    description: 'Tempo médio estimado por etapa.',
    headers: ['Etapa', 'P1 (Pulpite)', 'P2 (Crônico)', 'P3 (Agudo)', 'P4 (Trauma)'],
    rows: [
      ['Anestesia', '5-10 min', '5 min', '5-10 min', '3-5 min'],
      ['Acesso', '3-5 min', '3 min', '3 min', '2-3 min'],
      ['Instrumentação', '5-10 min', '10-15 min', '15-20 min', '5-10 min'],
      ['Irrigação', '3-5 min', '5 min', '5 min', '3 min'],
      ['Medicação', '2 min', '2 min', '2 min', '2 min'],
      ['Drenagem/Incisão', '-', '-', '3-5 min', '-'],
      ['Fechamento', '2 min', '2 min', '2 min', '3 min'],
      ['Prescrição/Orientação', '2 min', '2 min', '2 min', '2 min'],
      ['TOTAL', '25-37 min', '30-40 min', '35-50 min', '20-30 min']
    ]
  },
  {
    id: 't4',
    title: 'Estimativa de Custos',
    description: 'Para base de cálculo e precificação.',
    headers: ['Item', 'Custo Aprox.', 'Sugestão Cobrança'],
    rows: [
      ['Materiais Diretos', 'R$ 15-25', '-'],
      ['Medicação (Hidróxido)', 'R$ 5-10', '-'],
      ['Provisório', 'R$ 3-5', '-'],
      ['Custo Direto', 'R$ 23-40', '-'],
      ['Custo Operacional', 'R$ 77-160', '-'],
      ['CUSTO TOTAL', 'R$ 100-200', '-'],
      ['Preço Sugerido', '-', 'R$ 300 - 500'],
      ['Margem', '-', '150% - 300%']
    ]
  },
  {
    id: 't5',
    title: 'Follow-up (Acompanhamento)',
    description: 'Sequência lógica de retorno do paciente.',
    headers: ['Momento', 'O que avaliar', 'Ação'],
    rows: [
      ['24 horas', 'Dor/Edema', 'Se piorou: Retorno imediato'],
      ['48 horas', 'Febre/Medicação', 'Se febre persiste: Trocar antibiótico'],
      ['5-7 dias', 'Pronto p/ completo?', 'Instrumentação final + Obturação'],
      ['1 semana pós-completo', 'Dor ao morder?', 'Agenda restauração final'],
      ['2 semanas pós-completo', 'Vitalidade (Trauma)', 'Teste térmico'],
      ['1 mês pós-completo', 'Dor crônica?', 'RX acompanhamento'],
      ['3 meses', 'Evolução apical?', 'RX periapical (reparo ósseo)']
    ]
  }
];

export const PRE_PROCEDURE_CHECKLIST: ChecklistSection[] = [
  {
    title: 'Antes de Anestesiar',
    items: [
      'Cadeira limpa e desinfetada',
      'Luz ajustada (visibilidade clara)',
      'Sugador funcionando',
      'Perguntou: "Tem medo de agulha?"',
      'Perguntou: "Tem alergia?"',
      'Perguntou: "Tomou remédio hoje?"',
      'Paciente confortável e ciente'
    ]
  },
  {
    title: 'Materiais Essenciais',
    items: [
      'Articaína 4% com Epi',
      'Agulhas 27G (Longa) e 30G (Curta)',
      'Brocas: 1014 HL, Redonda #4',
      'Limas K-file #10, #15, #20',
      'Hipoclorito de Sódio 2.5% + Seringa',
      'Hidróxido de Cálcio (Pasta)',
      'IRM ou Cimento Provisório',
      'Fio de algodão (para drenagem)'
    ]
  },
  {
    title: 'Documentação',
    items: [
      'Prontuário atualizado',
      'Receita pronta',
      'Instruções impressas',
      'Consentimento informado'
    ]
  }
];
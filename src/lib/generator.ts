export type AgentInput = {
  produto: string;
  valor: string;
  segmento: string;
  cargo: string;
  objetivo: string;
  dor: string;
  tom: ToneOption;
  diferenciais: string;
  etapa: StageOption;
};

export type ToneOption = "consultivo" | "entusiasmado" | "direto";

export type StageOption =
  | "mapeamento"
  | "descoberta"
  | "qualificacao"
  | "negociacao";

export type AgentOutput = {
  posicionamento: string;
  gatilhos: string[];
  headline: string;
  email: EmailPlay;
  linkedin: LinkedInPlay[];
  descoberta: DiscoveryPlay[];
  ligacao: CallScriptSection[];
  followUp: string[];
  plano90Dias: string[];
  objections: ObjectionHandler[];
};

export type EmailPlay = {
  assunto: string;
  abertura: string;
  meio: string;
  fechamento: string;
};

export type LinkedInPlay = {
  titulo: string;
  mensagem: string;
};

export type DiscoveryPlay = {
  foco: string;
  perguntas: string[];
};

export type CallScriptSection = {
  etapa: string;
  pontos: string[];
};

export type ObjectionHandler = {
  objecao: string;
  resposta: string;
  proximaAcao: string;
};

const tonePresets: Record<
  ToneOption,
  { saudacao: string; intensidade: string; callToAction: string }
> = {
  consultivo: {
    saudacao: "Olá",
    intensidade: "abordagem consultiva e orientada a valor",
    callToAction: "Podemos reservar 20 minutos na próxima semana?",
  },
  entusiasmado: {
    saudacao: "Ei",
    intensidade: "tom energético e otimista",
    callToAction: "Que tal um papo rápido para te mostrar isso na prática?",
  },
  direto: {
    saudacao: "Olá",
    intensidade: "comunicação objetiva e pragmática",
    callToAction: "Topa uma conversa de 15 minutos para avançarmos?",
  },
};

const stageFocus: Record<
  StageOption,
  { headline: string; perguntaChave: string; proximaAcao: string }
> = {
  mapeamento: {
    headline:
      "Priorize contas com maior fit e sinal de intenção para otimizar sua lista de prospecção.",
    perguntaChave:
      "Como vocês identificam contas com sinais de compra antes dos concorrentes?",
    proximaAcao:
      "Compartilhar um mini playbook com microsegmentos prioritários.",
  },
  descoberta: {
    headline:
      "Conduza conversas de descoberta que revelem urgência real e facilitam próximos passos.",
    perguntaChave:
      "Quais sinais te mostram hoje que vale avançar com uma oportunidade?",
    proximaAcao:
      "Agendar call de 30 minutos para co-construir o mapa de decisão.",
  },
  qualificacao: {
    headline:
      "Crie critérios claros de qualificação para acelerar o handoff com sucesso.",
    perguntaChave:
      "Quais requisitos mínimos o time precisa validar antes de envolver decisores?",
    proximaAcao:
      "Enviar checklist de qualificação junto a casos relevantes do segmento.",
  },
  negociacao: {
    headline:
      "Monitore o comitê e antecipe objeções para encurtar o ciclo de negociação.",
    perguntaChave:
      "Qual é o principal fator que pode segurar o processo neste trimestre?",
    proximaAcao:
      "Marcar sessão rápida para mapear aprovadores e riscos de inércia.",
  },
};

const capitalize = (value: string) => {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const sentence = (value: string) => {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  const withEnd = /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
  return capitalize(withEnd);
};

const formatValue = (value: string, fallback: string) =>
  value.trim() ? value.trim() : fallback;

const buildGatilhos = (input: AgentInput): string[] => {
  const diferencial = formatValue(
    input.diferenciais,
    "redução de custo operacional e previsibilidade de pipeline"
  );

  return [
    `Empresas ${input.segmento} que procuram ${sentence(
      input.objetivo
    ).slice(0, -1).toLowerCase()} com ${diferencial}.`,
    `Contas onde profissionais de ${input.cargo} mencionam desafios relacionados a ${input.dor}.`,
    `Organizações em crescimento que investem em ${input.produto} para destravar ${input.valor.toLowerCase()}.`,
  ];
};

const buildEmail = (input: AgentInput): EmailPlay => {
  const tone = tonePresets[input.tom];

  return {
    assunto: `Como ${input.produto} tem acelerado ${input.objetivo} em ${input.segmento}`,
    abertura: `${tone.saudacao} ${input.cargo.split(" ")[0]}, percebi que ${formatValue(
      input.segmento,
      "empresas como a sua"
    )} estão buscando ${input.objetivo.toLowerCase()} enquanto lidam com ${input.dor.toLowerCase()}.`,
    meio: `Estamos ajudando times com o mesmo cenário a ${input.valor.toLowerCase()}, combinando ${formatValue(
      input.diferenciais,
      "um onboarding guiado"
    )} com um framework exclusivo de prospecção (${tone.intensidade}).`,
    fechamento: `${tone.callToAction} Posso te mandar uma agenda com dois horários?`,
  };
};

const buildLinkedInPlay = (input: AgentInput): LinkedInPlay[] => {
  const foco = stageFocus[input.etapa];

  return [
    {
      titulo: "Dia 1 • Pedido de conexão",
      mensagem: `Oi ${capitalize(
        input.cargo.split(" ")[0]
      )}, tenho acompanhado ${input.segmento} que buscam ${input.objetivo.toLowerCase()}. Curto trocar aprendizados rápidos sobre ${input.produto.toLowerCase()}. Vamos conectar?`,
    },
    {
      titulo: "Dia 3 • Follow up consultivo",
      mensagem: `Valeu pela conexão! Vi que ${input.dor.toLowerCase()} é pauta recorrente no segmento. Posso te enviar um micro playbook com 3 alavancas que estamos usando para ${input.valor.toLowerCase()}?`,
    },
    {
      titulo: "Dia 6 • Convite para conversa",
      mensagem: `Estamos ajudando ${input.segmento} a ${input.objetivo.toLowerCase()} com ${formatValue(
        input.diferenciais,
        "uma abordagem multicanal pronta"
      )}. ${foco.proximaAcao}`,
    },
  ];
};

const buildDiscovery = (input: AgentInput): DiscoveryPlay[] => [
  {
    foco: "Contexto atual",
    perguntas: [
      `Como você está estruturando ${input.objetivo.toLowerCase()} hoje?`,
      `Quais indicadores mostram que ${input.dor.toLowerCase()} virou prioridade?`,
      `Existe alguma iniciativa rodando que concorra com ${input.produto.toLowerCase()}?`,
    ],
  },
  {
    foco: "Impacto e urgência",
    perguntas: [
      `O que acontece se ${input.dor.toLowerCase()} continuar nos próximos 3 meses?`,
      `Quais metas o time de ${input.cargo.toLowerCase()} precisa alcançar no trimestre?`,
      `Quem mais sentiria os efeitos se resolvêssemos ${input.dor.toLowerCase()} rapidamente?`,
    ],
  },
  {
    foco: "Decisão e próximos passos",
    perguntas: [
      "Quais critérios definem se vale avançar para uma prova de valor?",
      "Quem precisa estar envolvido na avaliação da solução?",
      "Qual janela ideal para implementar uma iniciativa deste tipo?",
    ],
  },
];

const buildCallScript = (input: AgentInput): CallScriptSection[] => {
  const focus = stageFocus[input.etapa];
  return [
    {
      etapa: "Abertura",
      pontos: [
        "Reforçar o contexto da conversa e validar agenda de 30 min.",
        `Compartilhar insight específico sobre ${input.segmento} e o desafio ${input.dor.toLowerCase()}.`,
      ],
    },
    {
      etapa: "Diagnóstico",
      pontos: [
        focus.perguntaChave,
        `Investigar processo atual para ${input.objetivo.toLowerCase()} e mapear gaps.`,
        `Quantificar impacto de ${input.dor.toLowerCase()} nas metas do time.`,
      ],
    },
    {
      etapa: "Recomendação",
      pontos: [
        `Apresentar como ${input.produto} resolve ${input.dor.toLowerCase()} com ${formatValue(
          input.diferenciais,
          "um playbook personalizado"
        )}.`,
        `Trazer caso rápido de ${input.segmento} com métricas de ${input.valor.toLowerCase()}.`,
      ],
    },
    {
      etapa: "Compromisso",
      pontos: [
        `Validar próxima ação: ${focus.proximaAcao}`,
        "Combinar materiais que serão compartilhados após a call.",
      ],
    },
  ];
};

const buildFollowUp = (input: AgentInput): string[] => {
  const focus = stageFocus[input.etapa];
  return [
    "Enviar resumo da conversa com métricas e próximos passos acordados.",
    `Encaminhar assets: estudo de caso ${input.segmento} + checklist de implementação.`,
    focus.proximaAcao,
  ];
};

const build90Days = (input: AgentInput): string[] => [
  "Dias 0-30 • Validar ICP, configurar cadência multicanal e treinar pitch.",
  `Dias 31-60 • Executar experimentos focados em ${input.objetivo.toLowerCase()} com acompanhamento semanal.`,
  `Dias 61-90 • Escalar táticas vencedoras e alinhar transição para CS com base em ${input.valor.toLowerCase()}.`,
];

const buildObjections = (input: AgentInput): ObjectionHandler[] => [
  {
    objecao: "Já temos algo parecido",
    resposta: `Ótimo ouvir isso. Onde você sente que a solução atual ainda deixa brechas quando o assunto é ${input.objetivo.toLowerCase()}? Temos atuado justamente nesses pontos.`,
    proximaAcao: "Propor benchmark com indicadores para comparar resultados.",
  },
  {
    objecao: "Não é prioridade agora",
    resposta: `Entendo. Costumamos ver esse cenário quando ${input.dor.toLowerCase()} ainda não impactou metas visíveis. Posso compartilhar sinais de alerta que outros ${input.cargo.toLowerCase()} monitoram?`,
    proximaAcao: "Enviar checklist de impacto com convite para revisão em 30 dias.",
  },
  {
    objecao: "Sem orçamento disponível",
    resposta: `Super comum. Ajudamos clientes a mostrar o ROI de ${input.produto.toLowerCase()} comparando custo de inação versus ganhos com ${input.valor.toLowerCase()}. Posso te mandar a calculadora?`,
    proximaAcao: "Agendar call rápida para preencher a calculadora com dados reais.",
  },
];

export const buildAgentOutput = (input: AgentInput): AgentOutput => {
  const cleanedInput: AgentInput = {
    ...input,
    produto: formatValue(input.produto, "solução de prospecção"),
    valor: formatValue(
      input.valor,
      "gerar reuniões qualificadas de maneira previsível"
    ),
    segmento: formatValue(input.segmento, "empresas B2B em crescimento"),
    cargo: formatValue(input.cargo, "diretor(a) comercial"),
    objetivo: formatValue(
      input.objetivo,
      "aumentar a geração de pipeline qualificado"
    ),
    dor: formatValue(input.dor, "baixa conversão de cadências"),
    diferenciais: formatValue(
      input.diferenciais,
      "suporte estratégico + automações inteligentes"
    ),
  };

  const focus = stageFocus[cleanedInput.etapa];

  return {
    posicionamento: `Sou seu agente de prospecção especializado em ${cleanedInput.segmento}. Minha missão é ${cleanedInput.objetivo.toLowerCase()} mostrando como ${cleanedInput.produto.toLowerCase()} elimina ${cleanedInput.dor.toLowerCase()}.`,
    gatilhos: buildGatilhos(cleanedInput),
    headline: focus.headline,
    email: buildEmail(cleanedInput),
    linkedin: buildLinkedInPlay(cleanedInput),
    descoberta: buildDiscovery(cleanedInput),
    ligacao: buildCallScript(cleanedInput),
    followUp: buildFollowUp(cleanedInput),
    plano90Dias: build90Days(cleanedInput),
    objections: buildObjections(cleanedInput),
  };
};

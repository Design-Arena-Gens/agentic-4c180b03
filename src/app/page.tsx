"use client";

import { FormEvent, ReactNode, useMemo, useState } from "react";
import {
  AgentInput,
  StageOption,
  ToneOption,
  buildAgentOutput,
} from "@/lib/generator";

const toneOptions: { value: ToneOption; label: string; description: string }[] =
  [
    {
      value: "consultivo",
      label: "Consultivo",
      description: "Equilíbrio entre empatia e objetividade.",
    },
    {
      value: "entusiasmado",
      label: "Entusiasmado",
      description: "Energia alta para despertar interesse imediato.",
    },
    {
      value: "direto",
      label: "Direto",
      description: "Sem rodeios, focado no resultado.",
    },
  ];

const stageOptions: {
  value: StageOption;
  label: string;
}[] = [
  { value: "mapeamento", label: "Mapeamento" },
  { value: "descoberta", label: "Descoberta" },
  { value: "qualificacao", label: "Qualificação" },
  { value: "negociacao", label: "Negociação" },
];

const defaultInput: AgentInput = {
  produto: "Plataforma de prospecção outbound",
  valor: "gerar pipeline previsível com inteligência comercial",
  segmento: "scale-ups B2B brasileiras",
  cargo: "Head de Vendas",
  objetivo: "acelerar geração de reuniões qualificadas",
  dor: "baixa taxa de resposta nas cadências atuais",
  tom: "consultivo",
  diferenciais: "diagnóstico guiado + cadência multicanal pronta em 7 dias",
  etapa: "descoberta",
};

export default function Home() {
  const [form, setForm] = useState<AgentInput>(defaultInput);
  const [output, setOutput] = useState(() => buildAgentOutput(defaultInput));
  const [isDirty, setIsDirty] = useState(false);

  const formIsValid = useMemo(
    () => form.produto.trim().length > 0 && form.valor.trim().length > 0,
    [form.produto, form.valor]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOutput(buildAgentOutput(form));
    setIsDirty(false);
  };

  const handleReset = () => {
    setForm(defaultInput);
    setOutput(buildAgentOutput(defaultInput));
    setIsDirty(false);
  };

  const handleChange =
    (field: keyof AgentInput) => (value: string | ToneOption | StageOption) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setIsDirty(true);
    };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.12),transparent_55%)]" />
      <header className="border-b border-white/5 bg-black/30 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-sky-500">
              Prospecta AI
            </p>
            <h1 className="mt-1 text-3xl font-semibold sm:text-4xl">
              Agente de Vendas Especialista em Prospecção
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
              Estruture abordagens certeiras em segundos. Preencha os campos,
              gere o playbook e receba e-mails, cadências multicanal, roteiro de
              discovery e plano de follow-up alinhados ao seu ICP.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-slate-300">
            <span className="rounded-full border border-slate-700/80 px-4 py-1">
              Inteligência de pipeline
            </span>
            <span className="rounded-full border border-slate-700/80 px-4 py-1">
              Cadência multicanal
            </span>
            <span className="rounded-full border border-slate-700/80 px-4 py-1">
              Conversas de alta qualidade
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-10">
        <section className="h-fit rounded-3xl border border-white/5 bg-black/30 p-6 shadow-xl shadow-blue-500/5 backdrop-blur">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">
                Briefing do ICP
              </h2>
              <p className="text-sm text-slate-400">
                Quanto mais contexto, mais preciso o playbook.
              </p>
            </div>

            <div className="space-y-4">
              <Field
                label="Produto / Solução"
                description="Como você apresenta o que vende?"
              >
                <Input
                  value={form.produto}
                  onChange={(event) => handleChange("produto")(event.target.value)}
                  placeholder="Ex: Plataforma de automação outbound"
                />
              </Field>

              <Field
                label="Proposta de valor"
                description="Benefício principal percebido pelo cliente."
              >
                <Textarea
                  value={form.valor}
                  onChange={(event) => handleChange("valor")(event.target.value)}
                  rows={2}
                  placeholder="Ex: aumentar o número de reuniões qualificadas sem crescer o time"
                />
              </Field>

              <Field
                label="Segmento / ICP"
                description="Tipo de empresa que você aborda."
              >
                <Input
                  value={form.segmento}
                  onChange={(event) =>
                    handleChange("segmento")(event.target.value)
                  }
                  placeholder="Ex: empresas SaaS série A/B no Brasil"
                />
              </Field>

              <Field
                label="Cargo do decisor"
                description="Quem recebe sua abordagem?"
              >
                <Input
                  value={form.cargo}
                  onChange={(event) => handleChange("cargo")(event.target.value)}
                  placeholder="Ex: VP Sales, CRO, Diretor Comercial"
                />
              </Field>

              <Field
                label="Objetivo da abordagem"
                description="O que você quer destravar para esse ICP?"
              >
                <Input
                  value={form.objetivo}
                  onChange={(event) =>
                    handleChange("objetivo")(event.target.value)
                  }
                  placeholder="Ex: agendar uma primeira conversa exploratória"
                />
              </Field>

              <Field
                label="Principal dor percebida"
                description="Qual desafio abre portas para você?"
              >
                <Textarea
                  value={form.dor}
                  onChange={(event) => handleChange("dor")(event.target.value)}
                  rows={2}
                  placeholder="Ex: leads não respondem às cadências atuais"
                />
              </Field>

              <Field
                label="Diferenciais estratégicos"
                description="O que torna sua proposta única?"
              >
                <Textarea
                  value={form.diferenciais}
                  onChange={(event) =>
                    handleChange("diferenciais")(event.target.value)
                  }
                  rows={2}
                  placeholder="Ex: squad dedicado de implementação e inteligência de mercado proprietária"
                />
              </Field>

              <Field
                label="Tom de voz"
                description="Escolha a energia da abordagem."
              >
                <div className="grid gap-3">
                  {toneOptions.map((tone) => (
                    <label
                      key={tone.value}
                      className={`flex cursor-pointer flex-col rounded-2xl border px-4 py-3 transition ${
                        form.tom === tone.value
                          ? "border-sky-400 bg-sky-500/10"
                          : "border-slate-700/60 hover:border-slate-500"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">
                          {tone.label}
                        </span>
                        <input
                          type="radio"
                          name="tone"
                          value={tone.value}
                          checked={form.tom === tone.value}
                          onChange={() => handleChange("tom")(tone.value)}
                          className="h-4 w-4"
                        />
                      </div>
                      <p className="mt-1 text-xs text-slate-300">
                        {tone.description}
                      </p>
                    </label>
                  ))}
                </div>
              </Field>

              <Field
                label="Estágio da oportunidade"
                description="Personaliza as táticas sugeridas."
              >
                <div className="grid gap-2 sm:grid-cols-2">
                  {stageOptions.map((stage) => (
                    <button
                      key={stage.value}
                      type="button"
                      onClick={() => handleChange("etapa")(stage.value)}
                      className={`rounded-xl border px-3 py-2 text-sm transition ${
                        form.etapa === stage.value
                          ? "border-sky-400 bg-sky-500/20 text-white"
                          : "border-slate-700/60 text-slate-200 hover:border-slate-500"
                      }`}
                    >
                      {stage.label}
                    </button>
                  ))}
                </div>
              </Field>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                type="submit"
                className="flex-1 rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:shadow-none"
                disabled={!formIsValid}
              >
                Gerar playbook
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl border border-slate-600 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-400 hover:text-white"
              >
                Resetar campos
              </button>
            </div>
            {isDirty && (
              <p className="text-xs text-slate-400">
                Modificações pendentes. Clique em “Gerar playbook” para
                atualizar as recomendações.
              </p>
            )}
          </form>
        </section>

        <section className="space-y-6">
          <div className="rounded-3xl border border-white/5 bg-black/20 p-6 shadow-lg shadow-blue-500/10 backdrop-blur">
            <h2 className="text-lg font-semibold text-sky-300">
              Posicionamento do Agente
            </h2>
            <p className="mt-2 text-sm text-slate-200">{output.posicionamento}</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {output.gatilhos.map((gatilho, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-700/70 bg-slate-900/50 p-4 text-xs text-slate-200"
                >
                  <span className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-widest text-sky-400">
                    Gatilho {index + 1}
                  </span>
                  {gatilho}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/5 bg-black/30 p-6 shadow-lg shadow-blue-500/10 backdrop-blur">
            <h2 className="text-lg font-semibold text-white">Mensagem-chave</h2>
            <p className="mt-2 text-sm text-slate-200">{output.headline}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="Cold Email" highlight="Assunto + Corpo">
              <ContentBlock title="Assunto">
                <p>{output.email.assunto}</p>
              </ContentBlock>
              <ContentBlock title="Abertura">
                <p>{output.email.abertura}</p>
              </ContentBlock>
              <ContentBlock title="Valor">
                <p>{output.email.meio}</p>
              </ContentBlock>
              <ContentBlock title="Fechamento">
                <p>{output.email.fechamento}</p>
              </ContentBlock>
            </Card>

            <Card title="Playbook LinkedIn" highlight="Cadência multicanal">
              <div className="space-y-4">
                {output.linkedin.map((step) => (
                  <div
                    key={step.titulo}
                    className="rounded-xl border border-slate-700/60 bg-slate-900/50 p-4 text-xs text-slate-100"
                  >
                    <p className="text-[0.75rem] font-semibold uppercase tracking-widest text-sky-400">
                      {step.titulo}
                    </p>
                    <p className="mt-1 text-sm text-slate-200">{step.mensagem}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card title="Discovery de Valor" highlight="Perguntas por foco">
            <div className="space-y-5">
              {output.descoberta.map((section) => (
                <div key={section.foco} className="space-y-2">
                  <p className="text-sm font-semibold text-sky-300">
                    {section.foco}
                  </p>
                  <ul className="space-y-2 text-sm text-slate-200">
                    {section.perguntas.map((pergunta) => (
                      <li
                        key={pergunta}
                        className="rounded-lg border border-slate-700/60 bg-slate-900/40 px-3 py-2 text-slate-100"
                      >
                        {pergunta}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Roteiro de Ligação" highlight="Estrutura em 4 etapas">
            <div className="space-y-4">
              {output.ligacao.map((section) => (
                <div key={section.etapa} className="rounded-xl bg-slate-900/40">
                  <p className="rounded-t-xl border-b border-slate-800 bg-slate-900/60 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-sky-400">
                    {section.etapa}
                  </p>
                  <ul className="space-y-2 px-4 py-3 text-sm text-slate-200">
                    {section.pontos.map((ponto) => (
                      <li key={ponto} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-400" />
                        <span>{ponto}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="Follow-up Inteligente" highlight="3 passos alinhados">
              <ol className="space-y-3 text-sm text-slate-200">
                {output.followUp.map((item, index) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-slate-700/60 bg-slate-900/40 px-4 py-3"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </Card>

            <Card title="Plano de 90 dias" highlight="Escala com previsibilidade">
              <ul className="space-y-3 text-sm text-slate-200">
                {output.plano90Dias.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-slate-700/60 bg-slate-900/40 px-4 py-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card title="Objeções críticas" highlight="Resposta + Próxima ação">
            <div className="space-y-4">
              {output.objections.map((item) => (
                <div
                  key={item.objecao}
                  className="rounded-2xl border border-slate-700/60 bg-slate-900/40 p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">
                    {item.objecao}
                  </p>
                  <p className="mt-2 text-sm text-slate-100">
                    <span className="font-semibold text-white">Resposta:</span>{" "}
                    {item.resposta}
                  </p>
                  <p className="mt-2 text-sm text-slate-100">
                    <span className="font-semibold text-white">
                      Próxima ação:
                    </span>{" "}
                    {item.proximaAcao}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-black/30">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Prospecta AI • Agente especializado em prospecção e geração de
            pipeline.
          </p>
          <p className="text-slate-500">
            Ajuste o briefing acima para gerar novas cadências em segundos.
          </p>
        </div>
      </footer>
    </div>
  );
}

type FieldProps = {
  label: string;
  description?: string;
  children: ReactNode;
};

const Field = ({ label, description, children }: FieldProps) => (
  <label className="block space-y-2">
    <div>
      <span className="text-sm font-medium text-white">{label}</span>
      {description && (
        <p className="text-xs text-slate-400">{description}</p>
      )}
    </div>
    {children}
  </label>
);

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className = "", ...props }: InputProps) => (
  <input
    {...props}
    className={`w-full rounded-xl border border-slate-700/60 bg-slate-900/40 px-3 py-2 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/30 ${className}`}
  />
);

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = ({ className = "", ...props }: TextareaProps) => (
  <textarea
    {...props}
    className={`w-full rounded-xl border border-slate-700/60 bg-slate-900/40 px-3 py-2 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/30 ${className}`}
  />
);

type CardProps = {
  title: string;
  highlight: string;
  children: ReactNode;
};

const Card = ({ title, highlight, children }: CardProps) => (
  <div className="rounded-3xl border border-white/5 bg-black/30 p-6 shadow-lg shadow-blue-500/10 backdrop-blur">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <span className="rounded-full border border-slate-700/60 px-3 py-1 text-[0.65rem] uppercase tracking-widest text-sky-300">
        {highlight}
      </span>
    </div>
    <div className="mt-4 space-y-3 text-sm text-slate-200">{children}</div>
  </div>
);

type ContentBlockProps = {
  title: string;
  children: ReactNode;
};

const ContentBlock = ({ title, children }: ContentBlockProps) => (
  <div className="space-y-2 rounded-2xl border border-slate-700/60 bg-slate-900/40 p-4">
    <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">
      {title}
    </p>
    <div className="text-sm text-slate-200">{children}</div>
  </div>
);

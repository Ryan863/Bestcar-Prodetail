"use client";

/* ============================================================================
   BESTCAR - ESTÉTICA AUTOMOTIVA | Landing Page
   Next.js (App Router) + Tailwind v4 + GSAP (ScrollTrigger / @gsap/react)
   ============================================================================ */

import { useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Armchair,
  Award,
  BadgeCheck,
  Check,
  Clock,
  Droplets,
  Eye,
  FlaskConical,
  Menu,
  MessageCircle,
  MapPin,
  Navigation,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Warehouse,
  X,
  type LucideIcon,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ------------------------------ CONSTANTES -------------------------------- */

const BUSINESS = {
  name: "BestCar - Estética Automotiva",
  shortName: "BEST CAR",
  tagline: "PRO DETAIL • MAFRA - SC",
  phoneLabel: "(47) 99251-2394",
  phoneTel: "+5547992512394",
  whatsappNumber: "5547992512394",
  instagramHandle: "@bestcarriomafra",
  instagramUrl: "https://www.instagram.com/bestcarriomafra",
  facebookLabel: "BestCar - Estética Automotiva",
  facebookUrl: "https://www.facebook.com/search/top?q=BestCar%20Est%C3%A9tica%20Automotiva%20Mafra",
  addressLine1: "Av. Cel. Severiano Maia, 1289",
  addressLine2: "Vila Buenos Aires, Mafra - SC, CEP 89300-000",
  addressFull: "Av. Cel. Severiano Maia, 1289 - Vila Buenos Aires, Mafra - SC, 89300-000",
} as const;

const WHATSAPP_DEFAULT_MESSAGE =
  "Olá, visitei o site da BestCar e gostaria de agendar um serviço para o meu veículo.";

const waLink = (message: string = WHATSAPP_DEFAULT_MESSAGE) =>
  `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message).replace(/%20/g, "+")}`;

const serviceWaLink = (service: string) =>
  waLink(`Olá, visitei o site da BestCar e gostaria de solicitar o serviço: ${service}.`);

const MAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(BUSINESS.addressFull)}`;
const WAZE_URL = `https://waze.com/ul?q=${encodeURIComponent(BUSINESS.addressFull)}&navigate=yes`;
const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(BUSINESS.addressFull)}&z=16&output=embed`;

const NAV_LINKS = [
  { href: "#planos", label: "Tabela de Preços" },
  { href: "#servicos", label: "Serviços" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "Dúvidas" },
  { href: "#localizacao", label: "Localização" },
] as const;

const HERO = {
  eyebrow: "ESTÉTICA AUTOMOTIVA PREMIUM • MAFRA & RIO NEGRO",
  titleLines: ["Detailing &", "cuidado automotivo", "de alto nível."],
  subtitle:
    "Da lavação detalhada à vitrificação cerâmica. Cuidado minucioso que devolve o aspecto de carro zero com brilho espelhado e proteção real.",
  cta: "Agendar pelo WhatsApp",
  proof: "5.0 no Google • Clientes 100% Satisfeitos",
};

/* Planos e Tabela Oficial BestCar */
const WASH_TIERS = [
  {
    level: "NÍVEL 1",
    name: "MANUTENÇÃO",
    subtitle: "LAVAGEM PARA MANUTENÇÃO DO SEU VEÍCULO.",
    popular: false,
    badge: "Essencial",
    items: [
      { text: "Lavagem da pintura", check: true },
      { text: "Lavagem das rodas", check: true },
      { text: "Limpeza do painel", check: true },
      { text: "Aspiração interna", check: true },
      { text: "Limpeza dos vidros", check: true },
      { text: "Pretinho nos pneus", check: true },
      { text: "Cera na pintura", check: false },
      { text: "Selante nos pneus", check: false },
    ],
    prices: [
      { size: "P", label: "Pequeno", price: "R$ 70" },
      { size: "M", label: "Médio", price: "R$ 80" },
      { size: "G", label: "Grande", price: "R$ 100" },
    ],
    note: "A partir de. Sujeito às condições e ao nível de sujeira.",
    cta: "Agendar Nível 1",
  },
  {
    level: "NÍVEL 2",
    name: "PROTEÇÃO",
    subtitle: "LAVAGEM + PROTEÇÃO E ACABAMENTO.",
    popular: true,
    badge: "Mais Escolhido",
    highlight: "A cera e o selante protegem a pintura e mantêm o carro limpo por muito mais tempo.",
    items: [
      { text: "Lavagem da pintura", check: true },
      { text: "Lavagem das rodas", check: true },
      { text: "Limpeza e acabamento do painel", check: true },
      { text: "Aspiração interna", check: true },
      { text: "Limpeza dos vidros", check: true },
      { text: "Cera na pintura", check: true },
      { text: "Selante nos pneus", check: true },
    ],
    prices: [
      { size: "P", label: "Pequeno", price: "R$ 90" },
      { size: "M", label: "Médio", price: "R$ 100" },
      { size: "G", label: "Grande", price: "R$ 120" },
    ],
    note: "A partir de. Sujeito às condições e ao nível de sujeira.",
    cta: "Agendar Nível 2",
  },
];

const ADDONS = [
  {
    category: "Proteção & Brilho",
    icon: Sparkles,
    items: [
      { title: "Cera Premium", desc: "Mais brilho, proteção e acabamento para a pintura." },
      { title: "Cristalização do Para-brisa", desc: "Tratamento hidrofóbico que repele chuva e melhora a visibilidade." },
      { title: "Revitalização de Plásticos", desc: "Recupera o aspecto original dos plásticos pretos e foscos." },
      { title: "Vitrificação de Plásticos", desc: "Proteção de longa duração contra raios UV e ressecamento." },
    ],
  },
  {
    category: "Detalhamento Interno",
    icon: Armchair,
    items: [
      { title: "Painel Detalhado com APC", desc: "Limpeza profunda e acabamento minucioso no painel e consoles." },
      { title: "Carpete Detalhado", desc: "Limpeza profunda de carpetes e tapetes com extração técnica." },
      { title: "Higienização dos Bancos", desc: "Higienização profunda em tecido ou hidratação de couro." },
    ],
  },
  {
    category: "Detalhamento Externo",
    icon: Droplets,
    items: [
      { title: "Lavagem do Motor", desc: "Limpeza detalhada e segura do cofre do motor." },
      { title: "Lavagem + Proteção do Motor", desc: "Limpeza minuciosa com aplicação de verniz protetor." },
    ],
  },
];

type Service = {
  id?: string;
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  featured?: boolean;
};

const SERVICES: Service[] = [
  {
    title: "Lavação Detalhada / Premium",
    description:
      "O serviço carro-chefe da casa. Limpeza técnica minuciosa que devolve a sensação de carro zero, protegendo plásticos, borrachas e caixas de rodas.",
    icon: Droplets,
    badge: "Carro-chefe",
    featured: true,
  },
  {
    id: "polimento",
    title: "Polimento Comercial & Técnico",
    description:
      "Correção precisa do verniz, eliminação de riscos, swirls e marcas de lavagem, restaurando o brilho profundo.",
    icon: Sparkles,
  },
  {
    id: "vitrificacao",
    title: "Proteção Cerâmica & Vitrificação",
    description:
      "Tecnologia de nano-proteção que sela os poros da pintura contra raios UV, seiva e intempéries com efeito hidrofóbico e brilho intenso.",
    icon: ShieldCheck,
  },
  {
    title: "Higienização Interna Completa",
    description:
      "Limpeza e desinfecção profunda de estofados, forros de porta, painel e carpetes, eliminando fungos, bactérias e odores.",
    icon: Armchair,
  },
  {
    title: "Pacotes para Veículos de Grande Porte",
    description:
      "Cuidados sob medida para picapes (Ram, S10, Hilux), SUVs e veículos esportivos.",
    icon: Truck,
  },
];

const PILLARS = [
  {
    icon: Award,
    title: "Educação e Atendimento Nota Mil",
    description:
      "Respeito, zelo e transparência com o cliente desde a recepção até a entrega do veículo.",
  },
  {
    icon: FlaskConical,
    title: "Produtos e Químicos de Nível Internacional",
    description:
      "Produtos biodegradáveis de pH neutro e compostos polidores de alta tecnologia, para um resultado seguro e duradouro.",
  },
  {
    icon: Warehouse,
    title: "Estrutura Ampla na Severiano Maia",
    description:
      "Espaço preparado para atender com segurança desde carros compactos até picapes gigantes.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Os rapazes muito educados e gentis... o trabalho simplesmente perfeito... com certeza no meu carro só eles que farão o trabalho de limpeza a partir de hoje.",
    author: "Cliente verificado do Google",
    meta: "Avaliação no Google",
  },
  {
    quote:
      "Os meninos trabalham muito bem, um serviço de qualidade, lugar bom, tratamento ótimo, uma ótima educação. Só vou levar carro lá.",
    author: "Oscar De Lima Santos",
    meta: "Local Guide • Google",
  },
  {
    quote:
      "Piazada gente boa demais... Quando falam que o trabalho é Premium... não mentiram... os caras são bons mesmo.",
    author: "Ilandir Alves da Rocha",
    meta: "Avaliação no Google",
  },
  {
    quote:
      "Serviços diferenciados, lavação detalhada/premium. Atendimento excelente, zelo com seu veículo e preços compatíveis...",
    author: "Renan Martins Moreira",
    meta: "Avaliação no Google",
  },
];

const FAQ = [
  {
    q: "Qual é a diferença entre a lavagem Nível 1 e Nível 2?",
    a: "O Nível 1 (Manutenção) é voltado para manter o carro limpo no dia a dia. Já o Nível 2 (Proteção) adiciona aplicação de Cera na Pintura, Selante nos Pneus e acabamento técnico no painel, garantindo brilho espelhado e fazendo a limpeza durar muito mais tempo.",
  },
  {
    q: "Qual é o tempo médio de execução de uma lavação premium ou polimento técnico?",
    a: "A lavação normalmente é concluída no mesmo dia. Já o polimento técnico depende do estado da pintura e do porte do veículo. Ao avaliar o carro, informamos o prazo exato antes de iniciar.",
  },
  {
    q: "A vitrificação cerâmica substitui a necessidade de encerar o carro?",
    a: "Sim. A vitrificação forma uma camada cerâmica de nano-proteção extremamente durável, com efeito hidrofóbico contra água, poeira e raios UV, dispensando o encerar frequente.",
  },
  {
    q: "Vocês atendem caminhonetes de grande porte como Ram e Hilux?",
    a: "Sim! Nossa estrutura na Av. Severiano Maia é ampla e preparada para picapes de grande porte, SUVs e veículos comerciais, com pacotes específicos para porte G.",
  },
  {
    q: "É necessário agendar horário com antecedência?",
    a: "Recomendamos agendar pelo WhatsApp para garantir o seu horário exclusivo e atendimento pontual sem filas.",
  },
];

const HOURS = [
  { day: "Segunda a Sexta", time: "08:30 às 12:00 e 13:00 às 18:00" },
  { day: "Sábado", time: "08:00 às 13:00" },
  { day: "Domingo", time: "Fechado", closed: true },
] as const;

const FOOTER = {
  title: "Pronto para devolver o aspecto de zero quilômetro ao seu carro?",
  subtitle: "Chame no WhatsApp e agende seu horário. Atendimento gentil, pontual e cuidado minucioso.",
  cta: "Agendar agora no WhatsApp",
  credits: `© ${new Date().getFullYear()} BestCar - Estética Automotiva (PRO detail | BEST CAR). Todos os direitos reservados.`,
};

/* ------------------------------ UI ATOMS ---------------------------------- */

const Wrap = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-3 flex items-center gap-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
    <span aria-hidden className="h-px w-6 sm:w-8 bg-red-600 shrink-0" />
    <span>{children}</span>
  </p>
);

const SectionTitle = ({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) => (
  <div data-reveal className="mb-8 sm:mb-12 max-w-3xl">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold uppercase leading-tight tracking-tight text-zinc-100">
      {title}
    </h2>
    {intro && <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-zinc-400">{intro}</p>}
  </div>
);

const GoogleStars = ({ className = "size-3.5 sm:size-4" }: { className?: string }) => (
  <span className="flex items-center gap-0.5" aria-label="5 de 5 estrelas">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`${className} fill-yellow-400 text-yellow-400`} aria-hidden />
    ))}
  </span>
);

const InstagramIcon = ({ className = "size-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

const FacebookIcon = ({ className = "size-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

/* ------------------------------ NAVBAR ------------------------------------ */

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header
      id="site-nav"
      className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-zinc-950/85 backdrop-blur-md transition-colors duration-300"
    >
      <Wrap className="flex h-16 sm:h-20 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5 sm:gap-3 py-1" aria-label="BestCar - início">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/estetica/logo-bestcar.png"
            alt="BestCar Pro Detail"
            width={987}
            height={491}
            className="h-8 sm:h-11 w-auto drop-shadow-[0_2px_12px_rgba(255,255,255,0.08)]"
          />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-base font-bold tracking-tight text-zinc-100">{BUSINESS.shortName}</span>
            <span className="mt-1 text-[10px] font-medium tracking-[0.2em] text-zinc-400">{BUSINESS.tagline}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-zinc-300 transition-colors duration-300 hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 sm:h-11 items-center gap-2 rounded-full bg-zinc-100 px-4 sm:px-5 text-xs sm:text-sm font-bold text-zinc-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
          >
            <MessageCircle className="size-3.5 sm:size-4" aria-hidden />
            <span>Agendar Horário</span>
          </a>
          <button
            type="button"
            className="inline-flex size-9 sm:size-11 items-center justify-center rounded-full border border-white/10 text-zinc-200 lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4 sm:size-5" /> : <Menu className="size-4 sm:size-5" />}
          </button>
        </div>
      </Wrap>

      {open && (
        <nav className="border-t border-white/5 bg-zinc-950/98 backdrop-blur-xl lg:hidden" aria-label="Menu mobile">
          <Wrap className="flex flex-col py-3">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-between border-b border-white/5 text-sm font-medium text-zinc-200 last:border-0"
              >
                {l.label}
                <ArrowRight className="size-4 text-red-500" aria-hidden />
              </a>
            ))}
          </Wrap>
        </nav>
      )}
    </header>
  );
}

/* ------------------------------ HERO -------------------------------------- */

function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[92dvh] sm:min-h-[100dvh] w-full items-center overflow-hidden bg-zinc-950">
      {/* Background adaptado: mobile e desktop */}
      <picture>
        <source media="(min-width: 768px)" srcSet="/estetica/hero-desktop.jpg" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/estetica/hero-mobile.jpg"
          alt="Carro esportivo preto com acabamento espelhado em estúdio de estética automotiva"
          fetchPriority="high"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-bottom md:object-center opacity-80 md:opacity-100"
        />
      </picture>
      
      {/* Camada de degradê para legibilidade absoluta */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/60 md:bg-gradient-to-r md:from-zinc-950 md:via-zinc-950/85 md:to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-zinc-950 to-transparent" />

      <Wrap className="relative pt-24 pb-12 sm:pt-32 sm:pb-24 w-full">
        <div className="max-w-2xl">
          <p data-hero className="mb-3 sm:mb-4 flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
            <span aria-hidden className="h-px w-6 sm:w-8 bg-red-600 shrink-0" />
            <span>{HERO.eyebrow}</span>
          </p>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-7xl font-extrabold uppercase leading-[1.08] tracking-tight text-zinc-100">
            {HERO.titleLines.map((line, i) => (
              <span key={line} data-hero className={`block ${i === 1 ? "text-red-600" : ""}`}>
                {line}
              </span>
            ))}
          </h1>

          <p data-hero className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-lg leading-relaxed text-zinc-300">
            {HERO.subtitle}
          </p>

          <div data-hero className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-pulse-ring group inline-flex h-12 sm:h-14 items-center justify-center gap-2.5 rounded-full bg-red-600 px-6 sm:px-8 text-sm sm:text-base font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-red-500"
            >
              <MessageCircle className="size-4 sm:size-5" aria-hidden />
              <span>{HERO.cta}</span>
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </a>
            <a
              href="#planos"
              className="inline-flex h-12 sm:h-14 items-center justify-center rounded-full border border-white/20 bg-black/40 px-6 sm:px-8 text-sm sm:text-base font-semibold text-zinc-200 backdrop-blur-sm transition-all duration-300 hover:border-red-600/50 hover:bg-white/10"
            >
              Ver Tabela de Preços
            </a>
          </div>

          <div data-hero className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-zinc-300">
            <GoogleStars />
            <span className="font-medium">{HERO.proof}</span>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ----------------------- TABELA DE PREÇOS OFICIAL -------------------------- */

function PricingSection({ onOpenPoster }: { onOpenPoster: () => void }) {
  return (
    <section id="planos" className="relative py-14 sm:py-24 border-b border-white/5 bg-[#0b0b0e]">
      <Wrap>
        <div data-reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="max-w-2xl">
            <Eyebrow>Tabela Oficial de Lavagens</Eyebrow>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold uppercase leading-tight tracking-tight text-zinc-100">
              Seu carro sempre no seu melhor estado
            </h2>
            <p className="mt-2 sm:mt-4 text-xs sm:text-base leading-relaxed text-zinc-400">
              Escolha o nível de cuidado ideal para o seu veículo. Valores transparentes por categoria de porte.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenPoster}
            className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-yellow-300 transition-all duration-300 hover:bg-yellow-500/20 hover:border-yellow-500/50 self-start md:self-end"
          >
            <Eye className="size-4" aria-hidden />
            Ver Cartaz Oficial em Alta Resolução
          </button>
        </div>

        {/* Nível 1 e Nível 2 */}
        <div data-stagger className="grid gap-6 lg:grid-cols-2">
          {WASH_TIERS.map((tier) => (
            <div
              key={tier.level}
              data-item
              className={`relative flex flex-col rounded-3xl border p-5 sm:p-8 transition-all duration-300 ${
                tier.popular
                  ? "border-yellow-500/40 bg-gradient-to-b from-yellow-500/[0.08] via-card to-card shadow-2xl shadow-yellow-950/20"
                  : "border-white/10 bg-card hover:border-white/20"
              }`}
            >
              {tier.popular && (
                <span className="self-start sm:absolute sm:-top-3.5 sm:right-8 mb-3 sm:mb-0 rounded-full border border-yellow-400/50 bg-gradient-to-r from-yellow-500 to-amber-600 px-3 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-black shadow-md">
                  {tier.badge}
                </span>
              )}

              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-red-500">{tier.level}</span>
                <h3 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-zinc-100 mt-0.5">
                  {tier.name}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-zinc-400 mt-1">{tier.subtitle}</p>
              </div>

              {tier.highlight && (
                <div className="mt-4 sm:mt-6 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-3 sm:p-4">
                  <p className="flex items-start gap-2 text-xs sm:text-sm font-medium text-yellow-200/90 leading-relaxed">
                    <ShieldCheck className="size-4 sm:size-5 shrink-0 text-yellow-400 mt-0.5" aria-hidden />
                    <span>{tier.highlight}</span>
                  </p>
                </div>
              )}

              {/* Lista de itens inclusos */}
              <ul className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3 border-y border-white/10 py-5 sm:py-6">
                {tier.items.map((it) => (
                  <li key={it.text} className="flex items-center gap-2.5 text-xs sm:text-sm">
                    {it.check ? (
                      <span className="inline-flex size-4 sm:size-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
                        <Check className="size-3 stroke-[3]" />
                      </span>
                    ) : (
                      <span className="inline-flex size-4 sm:size-5 items-center justify-center rounded-full bg-zinc-800 text-zinc-500 shrink-0">
                        <X className="size-3 stroke-[3]" />
                      </span>
                    )}
                    <span className={it.check ? "text-zinc-200" : "text-zinc-500 line-through"}>{it.text}</span>
                  </li>
                ))}
              </ul>

              {/* Valores por categoria P, M, G */}
              <div className="mt-5 sm:mt-6">
                <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 text-center mb-3">
                  Valores por Categoria
                </p>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {tier.prices.map((p) => (
                    <div
                      key={p.size}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-2.5 sm:p-3 text-center"
                    >
                      <span className="font-display text-xs sm:text-sm font-bold text-red-500">{p.size}</span>
                      <p className="text-[10px] sm:text-[11px] text-zinc-400">{p.label}</p>
                      <p className="font-display text-base sm:text-xl font-extrabold text-zinc-100 mt-0.5">{p.price}</p>
                      <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase">a partir de</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] sm:text-[11px] text-zinc-500 text-center mt-2.5 leading-relaxed">{tier.note}</p>
              </div>

              {/* Botão de conversão */}
              <a
                href={waLink(`Olá, visitei a tabela no site da BestCar e gostaria de agendar a lavagem ${tier.level} (${tier.name}) para o meu carro.`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 sm:mt-8 inline-flex h-11 sm:h-12 w-full items-center justify-center gap-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 ${
                  tier.popular
                    ? "bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-950/40"
                    : "bg-white text-zinc-950 hover:bg-zinc-200"
                }`}
              >
                <MessageCircle className="size-4" aria-hidden />
                <span>{tier.cta}</span>
                <ArrowRight className="size-3.5" aria-hidden />
              </a>
            </div>
          ))}
        </div>

        {/* Adicionais & Detalhamentos */}
        <div data-reveal className="mt-10 sm:mt-16 rounded-3xl border border-white/10 bg-card p-5 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 sm:gap-4 mb-6 sm:mb-8 border-b border-white/10 pb-4 sm:pb-6">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-red-500">Personalize seu Cuidado</span>
              <h3 className="font-display text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-zinc-100 mt-0.5">
                Serviços Adicionais
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
              Combine estes itens com sua lavagem para uma restauração completa.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {ADDONS.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.category} className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-zinc-200">
                    <Icon className="size-4 sm:size-5 text-red-500" aria-hidden />
                    <h4 className="font-display text-sm sm:text-base font-bold uppercase tracking-tight">{cat.category}</h4>
                  </div>
                  <div className="space-y-2.5">
                    {cat.items.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-colors hover:border-white/15"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="font-semibold text-xs sm:text-sm text-zinc-100">{item.title}</h5>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 bg-white/5 px-1.5 py-0.5 rounded shrink-0">
                            Sob Consulta
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-zinc-400 mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-6 text-center sm:text-left">
            <div>
              <p className="font-semibold text-zinc-100 text-xs sm:text-sm">Dúvidas sobre o porte do seu carro ou valores adicionais?</p>
              <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">Nossa equipe informa na hora o orçamento exato pelo WhatsApp.</p>
            </div>
            <a
              href={waLink("Olá, gostaria de tirar uma dúvida sobre a tabela de preços e serviços adicionais da BestCar.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-xs sm:text-sm font-semibold text-zinc-100 transition-all duration-300 hover:border-red-600/40 hover:bg-white/5 shrink-0"
            >
              <MessageCircle className="size-4 text-red-500" aria-hidden />
              <span>Consultar Orçamento</span>
            </a>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* Modal do Cartaz Original em Alta Resolução */
function PosterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] max-w-xl overflow-auto rounded-3xl border border-white/15 bg-zinc-950 p-2 sm:p-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar cartaz"
          className="absolute right-3 top-3 z-10 inline-flex size-9 items-center justify-center rounded-full bg-zinc-900/90 text-white border border-white/20 hover:bg-red-600 transition-colors"
        >
          <X className="size-4" />
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/estetica/tabela-precos-web.jpg"
          alt="Cartaz Oficial de Preços BestCar Pro Detail"
          className="w-full h-auto rounded-2xl"
        />
      </div>
    </div>
  );
}

/* ------------------------------ SERVIÇOS ---------------------------------- */

function Services() {
  return (
    <section id="servicos" className="relative py-14 sm:py-24">
      <Wrap>
        <SectionTitle
          eyebrow="Cardápio de Detailing"
          title="Serviços para quem exige acabamento espelhado"
          intro="Cada etapa é executada com técnica, produtos certificados e atenção a cada detalhe do seu veículo."
        />
        <div data-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.title}
                id={s.id}
                data-item
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-card p-5 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-red-600/40 ${
                  s.featured ? "sm:col-span-2 lg:col-span-2 bg-gradient-to-br from-card via-card to-red-950/20" : ""
                }`}
              >
                <div>
                  <div className="mb-4 sm:mb-6 flex items-start justify-between gap-4">
                    <span className="inline-flex size-11 sm:size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-metal">
                      <Icon className="size-5 sm:size-6" aria-hidden />
                    </span>
                    {s.badge && (
                      <span className="rounded-full border border-red-600/40 bg-red-600/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-red-400">
                        {s.badge}
                      </span>
                    )}
                  </div>
                  <h3 className={`font-display font-bold uppercase leading-tight tracking-tight text-zinc-100 ${s.featured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"}`}>
                    {s.title}
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-zinc-400 text-xs sm:text-sm">
                    {s.description}
                  </p>
                </div>
                <a
                  href={serviceWaLink(s.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex h-10 w-fit items-center gap-2 rounded-full border border-white/15 px-4 text-xs font-semibold text-zinc-100 transition-all duration-300 hover:border-red-600/60 hover:bg-red-600 hover:text-white"
                >
                  Solicitar este serviço
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              </article>
            );
          })}
        </div>
      </Wrap>
    </section>
  );
}

/* ------------------------------ DIFERENCIAIS ------------------------------ */

function Pillars() {
  return (
    <section id="diferenciais" className="relative border-y border-white/5 bg-[#0c0c0f] py-14 sm:py-24">
      <Wrap>
        <SectionTitle eyebrow="Método PRO Detail" title="Por que a BestCar?" />
        <div data-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                data-item
                className="group rounded-3xl border border-white/10 bg-card p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-red-600/40"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-red-600/10 text-red-500 ring-1 ring-red-600/30">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <span className="font-display text-4xl font-extrabold text-white/5">0{i + 1}</span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold uppercase leading-tight tracking-tight text-zinc-100">{p.title}</h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-zinc-400">{p.description}</p>
              </div>
            );
          })}
        </div>
      </Wrap>
    </section>
  );
}

/* ------------------------------ DEPOIMENTOS ------------------------------- */

function Testimonials() {
  return (
    <section id="depoimentos" className="relative py-14 sm:py-24">
      <Wrap>
        <div data-reveal className="mb-8 sm:mb-12 flex flex-col justify-between gap-4 sm:gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Prova social real</Eyebrow>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold uppercase leading-tight tracking-tight text-zinc-100">
              Quem leva o carro, volta.
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-card px-4 py-3 self-start md:self-auto">
            <span className="font-display text-3xl font-extrabold text-zinc-100">5.0</span>
            <div>
              <GoogleStars />
              <p className="mt-0.5 text-[11px] text-zinc-400">Avaliações no Google</p>
            </div>
          </div>
        </div>

        <div data-stagger className="grid gap-4 sm:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.author + t.quote.slice(0, 12)}
              data-item
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-card p-5 sm:p-7 transition-all duration-300 hover:border-red-600/40"
            >
              <div>
                <GoogleStars />
                <blockquote className="mt-3.5 text-sm sm:text-base leading-relaxed text-zinc-200">“{t.quote}”</blockquote>
              </div>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-metal shrink-0">
                  {t.author.charAt(0)}
                </span>
                <span className="flex flex-col">
                  <span className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-100">
                    {t.author}
                    <BadgeCheck className="size-3.5 text-red-500" aria-label="Verificado" />
                  </span>
                  <span className="text-[10px] sm:text-xs text-zinc-500">{t.meta}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

/* ------------------------------ FAQ --------------------------------------- */

function FaqItem({ q, a, open, onToggle, index }: { q: string; a: string; open: boolean; onToggle: () => void; index: number }) {
  return (
    <div data-item className={`rounded-2xl border bg-card transition-colors duration-300 ${open ? "border-red-600/40" : "border-white/10 hover:border-white/20"}`}>
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`faq-panel-${index}`}
          id={`faq-btn-${index}`}
          className="flex min-h-14 w-full items-center justify-between gap-3 px-5 py-3.5 text-left text-sm sm:text-base font-semibold text-zinc-100"
        >
          <span>{q}</span>
          <Plus className={`size-4 shrink-0 text-red-500 transition-transform duration-300 ${open ? "rotate-45" : ""}`} aria-hidden />
        </button>
      </h3>
      <div
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-btn-${index}`}
        className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-xs sm:text-sm leading-relaxed text-zinc-400">{a}</p>
        </div>
      </div>
    </div>
  );
}

function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="faq" className="relative border-t border-white/5 bg-[#0c0c0f] py-14 sm:py-24">
      <Wrap className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div data-reveal>
          <Eyebrow>Dúvidas frequentes</Eyebrow>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold uppercase leading-tight tracking-tight text-zinc-100">
            Tire suas dúvidas antes de agendar
          </h2>
          <p className="mt-3 text-xs sm:text-base text-zinc-400">Não achou o que procurava? Chame a equipe no WhatsApp.</p>
          <a
            href={waLink("Olá, visitei o site da BestCar e tenho uma dúvida sobre os serviços.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-xs sm:text-sm font-semibold text-zinc-100 transition-all duration-300 hover:border-red-600/40 hover:bg-white/5"
          >
            <MessageCircle className="size-4 text-red-500" aria-hidden />
            Falar com a equipe
          </a>
        </div>
        <div data-stagger className="flex flex-col gap-2.5">
          {FAQ.map((f, i) => (
            <FaqItem key={f.q} index={i} q={f.q} a={f.a} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? null : i)} />
          ))}
        </div>
      </Wrap>
    </section>
  );
}

/* ------------------------------ LOCALIZAÇÃO ------------------------------- */

function Location() {
  return (
    <section id="localizacao" className="relative py-14 sm:py-24">
      <Wrap>
        <SectionTitle eyebrow="Localização, horários & contato" title="Venha conhecer a BestCar" />
        <div data-reveal className="grid overflow-hidden rounded-3xl border border-white/10 bg-card lg:grid-cols-2">
          <div className="flex flex-col gap-6 sm:gap-8 p-5 sm:p-8">
            <div className="flex gap-3 sm:gap-4">
              <MapPin className="mt-0.5 size-5 sm:size-6 shrink-0 text-red-500" aria-hidden />
              <div>
                <h3 className="font-display text-base sm:text-lg font-bold uppercase tracking-tight">Endereço</h3>
                <p className="mt-1 text-xs sm:text-sm text-zinc-300">{BUSINESS.addressLine1}</p>
                <p className="text-xs sm:text-sm text-zinc-400">{BUSINESS.addressLine2}</p>
                <div className="mt-3.5 flex flex-wrap gap-2.5">
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-full bg-red-600 px-4 text-xs sm:text-sm font-bold text-white transition-all duration-300 hover:bg-red-500"
                  >
                    <Navigation className="size-3.5" aria-hidden />
                    Google Maps
                  </a>
                  <a
                    href={WAZE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-xs sm:text-sm font-semibold text-zinc-100 transition-all duration-300 hover:border-red-600/40 hover:bg-white/5"
                  >
                    Waze
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <Clock className="mt-0.5 size-5 sm:size-6 shrink-0 text-red-500" aria-hidden />
              <div className="w-full">
                <h3 className="font-display text-base sm:text-lg font-bold uppercase tracking-tight">Horário de atendimento</h3>
                <ul className="mt-2 divide-y divide-white/10 text-xs sm:text-sm">
                  {HOURS.map((h) => (
                    <li key={h.day} className="flex flex-col gap-0.5 py-2 sm:flex-row sm:justify-between">
                      <span className="font-medium text-zinc-200">{h.day}</span>
                      <span className={"closed" in h ? "text-red-400 font-medium" : "text-zinc-400"}>{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <Phone className="mt-0.5 size-5 sm:size-6 shrink-0 text-red-500" aria-hidden />
              <div>
                <h3 className="font-display text-base sm:text-lg font-bold uppercase tracking-tight">Contato</h3>
                <a href={`tel:${BUSINESS.phoneTel}`} className="mt-1 block text-xs sm:text-sm text-zinc-300 transition-colors hover:text-white">
                  {BUSINESS.phoneLabel}
                </a>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 px-3 text-xs font-semibold hover:border-red-600/40 hover:bg-white/5">
                    <MessageCircle className="size-3.5 text-red-500" aria-hidden /> WhatsApp
                  </a>
                  <a href={BUSINESS.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 px-3 text-xs font-semibold hover:border-red-600/40 hover:bg-white/5">
                    <InstagramIcon className="size-3.5 text-red-500" /> {BUSINESS.instagramHandle}
                  </a>
                  <a href={BUSINESS.facebookUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 px-3 text-xs font-semibold hover:border-red-600/40 hover:bg-white/5">
                    <FacebookIcon className="size-3.5 text-red-500" /> Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="min-h-64 sm:min-h-80 border-t border-white/10 lg:border-l lg:border-t-0">
            <iframe
              title="Mapa - BestCar Estética Automotiva em Mafra/SC"
              src={MAPS_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-64 sm:min-h-80 w-full grayscale invert-[0.92] contrast-[0.9]"
            />
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ------------------------------ FOOTER ------------------------------------ */

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#0c0c0f]">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-64 w-[30rem] sm:w-[40rem] -translate-x-1/2 rounded-full bg-red-600/15 blur-[120px]" />
      <Wrap className="relative py-14 sm:py-24 text-center">
        <div data-reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/estetica/logo-bestcar.png"
            alt=""
            width={987}
            height={491}
            className="mx-auto mb-6 h-14 sm:h-20 w-auto drop-shadow-[0_4px_20px_rgba(255,255,255,0.06)]"
            loading="lazy"
          />
          <h2 className="mx-auto max-w-2xl font-display text-2xl sm:text-4xl lg:text-5xl font-bold uppercase leading-tight tracking-tight text-zinc-100">
            {FOOTER.title}
          </h2>
          <p className="mx-auto mt-3 sm:mt-4 max-w-xl text-xs sm:text-base text-zinc-400">{FOOTER.subtitle}</p>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="animate-pulse-ring group mt-6 sm:mt-8 inline-flex h-12 sm:h-14 items-center justify-center gap-2.5 rounded-full bg-red-600 px-6 sm:px-8 text-sm sm:text-base font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-red-500"
          >
            <MessageCircle className="size-4 sm:size-5" aria-hidden />
            <span>{FOOTER.cta}</span>
          </a>
        </div>
        <div className="mt-12 sm:mt-16 flex flex-col items-center gap-4 border-t border-white/10 pt-6 sm:pt-8 text-xs text-zinc-500">
          <div className="flex items-center gap-3">
            <a href={BUSINESS.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram da BestCar" className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition-all duration-300 hover:border-red-600/40 hover:text-white">
              <InstagramIcon />
            </a>
            <a href={BUSINESS.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook da BestCar" className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition-all duration-300 hover:border-red-600/40 hover:text-white">
              <FacebookIcon />
            </a>
            <a href={`tel:${BUSINESS.phoneTel}`} aria-label="Ligar para a BestCar" className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition-all duration-300 hover:border-red-600/40 hover:text-white">
              <Phone className="size-4" />
            </a>
          </div>
          <p>{BUSINESS.addressFull}</p>
          <p>{FOOTER.credits}</p>
        </div>
      </Wrap>
    </footer>
  );
}

/* ------------------------------ FLOATING CTA ------------------------------ */

function FloatingWhatsApp() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar pelo WhatsApp"
      className="animate-pulse-ring fixed bottom-4 right-4 z-40 inline-flex size-12 sm:size-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-950/50 transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 md:hidden"
    >
      <MessageCircle className="size-5 sm:size-6" aria-hidden />
    </a>
  );
}

/* ------------------------------ PÁGINA ------------------------------------ */

export default function Landing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [posterOpen, setPosterOpen] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to("#site-nav", {
          backgroundColor: "rgba(9,9,11,0.95)",
          borderBottomColor: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
          ease: "none",
          scrollTrigger: { start: 10, end: 120, scrub: true },
        });

        gsap.from("[data-hero]", { y: 20, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.08, delay: 0.1 });

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((grid) => {
          gsap.from(grid.querySelectorAll("[data-item]"), {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: grid, start: "top 88%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative overflow-x-clip bg-zinc-950 text-zinc-100">
      <Navbar />
      <main>
        <Hero />
        <PricingSection onOpenPoster={() => setPosterOpen(true)} />
        <Services />
        <Pillars />
        <Testimonials />
        <Faq />
        <Location />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <PosterModal open={posterOpen} onClose={() => setPosterOpen(false)} />
    </div>
  );
}

"use client";

/* ============================================================================
   BESTCAR - ESTÃ‰TICA AUTOMOTIVA | Landing Page
   Next.js (App Router) + Tailwind v4 + GSAP (ScrollTrigger / @gsap/react)
   ----------------------------------------------------------------------------
   Toda a manutenÃ§Ã£o de conteÃºdo (textos, links, horÃ¡rios, serviÃ§os, depoimentos)
   fica nas constantes abaixo. Os componentes mais abaixo sÃ³ renderizam.
   ============================================================================ */

import { useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Armchair,
  Award,
  BadgeCheck,
  Clock,
  Droplets,
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
  name: "BestCar - EstÃ©tica Automotiva",
  shortName: "BEST CAR",
  tagline: "PRO DETAIL â€¢ MAFRA - SC",
  phoneLabel: "(47) 99251-2394",
  phoneTel: "+5547992512394",
  whatsappNumber: "5547992512394",
  instagramHandle: "@bestcarriomafra",
  instagramUrl: "https://www.instagram.com/bestcarriomafra",
  facebookLabel: "BestCar - EstÃ©tica Automotiva",
  // Troque pelo link da pÃ¡gina oficial quando disponÃ­vel:
  facebookUrl: "https://www.facebook.com/search/top?q=BestCar%20Est%C3%A9tica%20Automotiva%20Mafra",
  addressLine1: "Av. Cel. Severiano Maia, 1289",
  addressLine2: "Vila Buenos Aires, Mafra - SC, CEP 89300-000",
  addressFull: "Av. Cel. Severiano Maia, 1289 - Vila Buenos Aires, Mafra - SC, 89300-000",
} as const;

const WHATSAPP_DEFAULT_MESSAGE =
  "OlÃ¡, visitei o site da BestCar e gostaria de agendar um serviÃ§o para o meu veÃ­culo.";

const waLink = (message: string = WHATSAPP_DEFAULT_MESSAGE) =>
  `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message).replace(/%20/g, "+")}`;

const serviceWaLink = (service: string) =>
  waLink(`OlÃ¡, visitei o site da BestCar e gostaria de solicitar o serviÃ§o: ${service}.`);

const MAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(BUSINESS.addressFull)}`;
const WAZE_URL = `https://waze.com/ul?q=${encodeURIComponent(BUSINESS.addressFull)}&navigate=yes`;
const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(BUSINESS.addressFull)}&z=16&output=embed`;

const NAV_LINKS = [
  { href: "#servicos", label: "ServiÃ§os" },
  { href: "#polimento", label: "Polimento" },
  { href: "#vitrificacao", label: "VitrificaÃ§Ã£o" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#localizacao", label: "LocalizaÃ§Ã£o" },
] as const;

const HERO = {
  eyebrow: "ESTÃ‰TICA AUTOMOTIVA PREMIUM â€¢ MAFRA - SC & RIO NEGRO - PR",
  titleLines: ["Detailing &", "cuidado automotivo", "de alto nÃ­vel."],
  subtitle:
    "Da lavaÃ§Ã£o detalhada Ã  vitrificaÃ§Ã£o cerÃ¢mica de alta durabilidade. Tratamento exclusivo para quem busca acabamento espelhado, proteÃ§Ã£o real e zelo absoluto pelo veÃ­culo.",
  cta: "Agendar pelo WhatsApp",
  proof: "5.0 no Google â€¢ Clientes 100% Satisfeitos em Mafra e RegiÃ£o",
};

type Service = {
  id?: string;
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  featured?: boolean;
  span: string; // classes de grid (bento)
};

const SERVICES: Service[] = [
  {
    title: "LavaÃ§Ã£o Detalhada / Premium",
    description:
      "O serviÃ§o carro-chefe da casa. Limpeza tÃ©cnica minuciosa que devolve a sensaÃ§Ã£o de carro zero, protegendo plÃ¡sticos, borrachas e caixas de rodas.",
    icon: Droplets,
    badge: "Carro-chefe da casa",
    featured: true,
    span: "lg:col-span-4",
  },
  {
    id: "polimento",
    title: "Polimento Comercial & TÃ©cnico",
    description:
      "CorreÃ§Ã£o precisa do verniz, eliminaÃ§Ã£o de riscos, swirls e marcas de lavagem, restaurando o brilho profundo.",
    icon: Sparkles,
    span: "lg:col-span-2",
  },
  {
    id: "vitrificacao",
    title: "ProteÃ§Ã£o CerÃ¢mica & VitrificaÃ§Ã£o",
    description:
      "Tecnologia de nano-proteÃ§Ã£o que sela os poros da pintura contra raios UV, seiva e intempÃ©ries com efeito hidrofÃ³bico e brilho intenso.",
    icon: ShieldCheck,
    span: "lg:col-span-2",
  },
  {
    title: "HigienizaÃ§Ã£o Interna Completa",
    description:
      "Limpeza e desinfecÃ§Ã£o profunda de estofados, forros de porta, painel e carpetes, eliminando fungos, bactÃ©rias e odores.",
    icon: Armchair,
    span: "lg:col-span-2",
  },
  {
    title: "Pacotes para VeÃ­culos de Grande Porte",
    description:
      "Pacotes especiais com cuidados sob medida para caminhonetes (Ram, S10, Hilux), utilitÃ¡rios e esportivos.",
    icon: Truck,
    span: "lg:col-span-2 md:col-span-2",
  },
];

const PILLARS = [
  {
    icon: Award,
    title: "EducaÃ§Ã£o e Atendimento Nota Mil",
    description:
      "Respeito, zelo e transparÃªncia com o cliente desde a recepÃ§Ã£o atÃ© a entrega do veÃ­culo.",
  },
  {
    icon: FlaskConical,
    title: "Produtos e QuÃ­micos de NÃ­vel Internacional",
    description:
      "Produtos biodegradÃ¡veis de pH neutro e compostos polidores de alta tecnologia, para um resultado seguro e duradouro.",
  },
  {
    icon: Warehouse,
    title: "Estrutura Ampla na Severiano Maia",
    description:
      "EspaÃ§o preparado para atender com seguranÃ§a desde carros compactos atÃ© picapes gigantes.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Os rapazes muito educados e gentis... o trabalho simplesmente perfeito... com certeza no meu carro sÃ³ eles que farÃ£o o trabalho de limpeza a partir de hoje.",
    author: "Cliente verificado do Google",
    meta: "AvaliaÃ§Ã£o no Google",
  },
  {
    quote:
      "Os meninos trabalham muito bem, um serviÃ§o de qualidade, lugar bom, tratamento Ã³timo, uma Ã³tima educaÃ§Ã£o. SÃ³ vou levar carro lÃ¡.",
    author: "Oscar De Lima Santos",
    meta: "Local Guide â€¢ Google",
  },
  {
    quote:
      "Piazada gente boa demais... Quando falam que o trabalho Ã© Premium... nÃ£o mentiram... os caras sÃ£o bons mesmo.",
    author: "Ilandir Alves da Rocha",
    meta: "AvaliaÃ§Ã£o no Google",
  },
  {
    quote:
      "ServiÃ§os diferenciados, lavaÃ§Ã£o detalhada/premium. Atendimento excelente, zelo com seu veÃ­culo e preÃ§os compatÃ­veis...",
    author: "Renan Martins Moreira",
    meta: "AvaliaÃ§Ã£o no Google",
  },
];

const FAQ = [
  {
    q: "Qual Ã© o tempo mÃ©dio de execuÃ§Ã£o de uma lavaÃ§Ã£o premium ou polimento tÃ©cnico?",
    a: "A lavaÃ§Ã£o detalhada/premium normalmente Ã© concluÃ­da no mesmo dia. JÃ¡ o polimento tÃ©cnico depende do estado da pintura e do porte do veÃ­culo, podendo levar mais tempo. ApÃ³s avaliar o carro, informamos o prazo exato antes de comeÃ§ar.",
  },
  {
    q: "A vitrificaÃ§Ã£o cerÃ¢mica substitui a necessidade de encerar o carro?",
    a: "Sim. A vitrificaÃ§Ã£o forma uma camada de nano-proteÃ§Ã£o mais durÃ¡vel que a cera comum, com efeito hidrofÃ³bico e proteÃ§Ã£o contra raios UV, seiva e intempÃ©ries. Com a manutenÃ§Ã£o correta, vocÃª dispensa o encerar frequente.",
  },
  {
    q: "VocÃªs atendem caminhonetes de grande porte como Ram e F-250?",
    a: "Sim! Nossa estrutura na Av. Severiano Maia foi adaptada para receber com seguranÃ§a desde carros compactos atÃ© picapes e utilitÃ¡rios de grande porte, com pacotes sob medida.",
  },
  {
    q: "Ã‰ necessÃ¡rio agendar horÃ¡rio com antecedÃªncia para os serviÃ§os?",
    a: "Recomendamos agendar pelo WhatsApp para garantir o seu horÃ¡rio e a pontualidade do atendimento. Ã‰ rÃ¡pido: basta chamar e informar o veÃ­culo e o serviÃ§o desejado.",
  },
];

const HOURS = [
  { day: "Segunda a Sexta", time: "08:30 Ã s 12:00 e 13:00 Ã s 18:00" },
  { day: "SÃ¡bado", time: "08:00 Ã s 13:00" },
  { day: "Domingo", time: "Fechado", closed: true },
] as const;

const FOOTER = {
  title: "Pronto para devolver o aspecto de zero quilÃ´metro ao seu carro?",
  subtitle: "Chame no WhatsApp e agende seu horÃ¡rio. Atendimento gentil, pontual e cuidado minucioso.",
  cta: "Agendar agora no WhatsApp",
  credits: `Â© ${new Date().getFullYear()} BestCar - EstÃ©tica Automotiva (PRO detail | BEST CAR). Todos os direitos reservados.`,
};

/* ------------------------------ UI ATOMS ---------------------------------- */

const Wrap = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>
);

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-red-500 sm:text-xs">
    <span aria-hidden className="h-px w-8 bg-red-600" />
    {children}
  </p>
);

const SectionTitle = ({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) => (
  <div data-reveal className="mb-12 max-w-3xl">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight text-zinc-100 sm:text-5xl">
      {title}
    </h2>
    {intro && <p className="mt-5 text-base leading-relaxed text-zinc-400 sm:text-lg">{intro}</p>}
  </div>
);

const GoogleStars = ({ className = "size-4" }: { className?: string }) => (
  <span className="flex items-center gap-0.5" aria-label="5 de 5 estrelas">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`${className} fill-yellow-400 text-yellow-400`} aria-hidden />
    ))}
  </span>
);

// Lucide v1 nÃ£o inclui logos de marcas, entÃ£o usamos SVGs inline.
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
      className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-zinc-950/0 backdrop-blur-[2px]"
    >
      <Wrap className="flex h-16 items-center justify-between gap-4 sm:h-20">
        <a href="#top" className="flex items-center gap-3" aria-label="BestCar - inÃ­cio">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/estetica/logo-bestcar.png"
            alt="BestCar Pro Detail"
            width={900}
            height={467}
            className="h-9 w-auto sm:h-11"
          />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-base font-bold tracking-tight text-zinc-100">{BUSINESS.shortName}</span>
            <span className="mt-1 text-[10px] font-medium tracking-[0.2em] text-zinc-400">{BUSINESS.tagline}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
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
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-zinc-100 px-5 text-sm font-bold text-zinc-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
          >
            <MessageCircle className="size-4" aria-hidden />
            <span className="hidden sm:inline">Agendar HorÃ¡rio</span>
            <span className="sm:hidden">Agendar</span>
          </a>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 text-zinc-200 lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Wrap>

      {open && (
        <nav className="border-t border-white/5 bg-zinc-950/95 backdrop-blur-md lg:hidden" aria-label="Menu mobile">
          <Wrap className="flex flex-col py-3">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-between border-b border-white/5 text-base font-medium text-zinc-200 last:border-0"
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
    <section id="top" className="relative isolate flex min-h-[100dvh] w-full items-start overflow-hidden bg-zinc-950 md:items-center">
      {/* Imagem adaptada: mobile (retrato 9:16) e desktop (widescreen) */}
      <picture>
        <source media="(min-width: 768px)" srcSet="/estetica/hero-desktop.jpg" />
        <img
          src="/estetica/hero-mobile.jpg"
          alt="Carro esportivo preto com farol LED aceso em estÃºdio de detailing"
          fetchPriority="high"
          className="absolute inset-0 -z-10 h-full min-h-[100dvh] w-full object-cover object-bottom-right md:object-center"
        />
      </picture>
      {/* DegradÃª: topo no mobile, esquerda no desktop */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-zinc-950 via-zinc-950/70 to-transparent md:bg-gradient-to-r md:from-zinc-950 md:via-zinc-950/80 md:to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />

      <Wrap className="relative pb-16 pt-28 sm:pt-32 md:py-32">
        <div className="max-w-2xl">
          <p data-hero className="mb-5 flex items-start gap-3 text-[11px] font-semibold uppercase leading-relaxed tracking-[0.2em] text-red-500 sm:text-xs">
            <span aria-hidden className="mt-2 h-px w-8 shrink-0 bg-red-600" />
            {HERO.eyebrow}
          </p>

          <h1 className="font-display text-[2.35rem] font-extrabold uppercase leading-[1.02] tracking-tight text-zinc-100 sm:text-6xl lg:text-7xl">
            {HERO.titleLines.map((line, i) => (
              <span key={line} data-hero className={`block ${i === 1 ? "text-red-600" : ""}`}>
                {line}
              </span>
            ))}
          </h1>

          <p data-hero className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {HERO.subtitle}
          </p>

          <div data-hero className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-pulse-ring group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-red-600 px-8 text-base font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-red-500"
            >
              <MessageCircle className="size-5" aria-hidden />
              {HERO.cta}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </a>
            <a
              href="#servicos"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/15 px-8 text-base font-semibold text-zinc-200 transition-all duration-300 hover:border-red-600/40 hover:bg-white/5"
            >
              Ver serviÃ§os
            </a>
          </div>

          <p data-hero className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-zinc-300">
            <GoogleStars />
            <span>{HERO.proof}</span>
          </p>
        </div>
      </Wrap>
    </section>
  );
}

/* ------------------------------ SERVIÃ‡OS ---------------------------------- */

function ServiceCard({ s }: { s: Service }) {
  const Icon = s.icon;
  return (
    <article
      id={s.id}
      data-item
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-600/40 sm:p-8 ${s.span} ${
        s.featured ? "md:col-span-2" : ""
      }`}
    >
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-red-600/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="mb-6 flex items-start justify-between gap-4">
        <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-metal">
          <Icon className="size-6" aria-hidden />
        </span>
        {s.badge && (
          <span className="rounded-full border border-red-600/40 bg-red-600/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-red-400">
            {s.badge}
          </span>
        )}
      </div>
      <h3 className={`font-display font-bold uppercase leading-tight tracking-tight text-zinc-100 ${s.featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
        {s.title}
      </h3>
      <p className={`mt-3 leading-relaxed text-zinc-400 ${s.featured ? "max-w-xl text-base sm:text-lg" : "text-[15px]"}`}>
        {s.description}
      </p>
      <a
        href={serviceWaLink(s.title)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-zinc-100 transition-all duration-300 hover:border-red-600/60 hover:bg-red-600 hover:text-white sm:mt-auto"
      >
        Solicitar este serviÃ§o
        <ArrowUpRight className="size-4" aria-hidden />
      </a>
    </article>
  );
}

function Services() {
  return (
    <section id="servicos" className="relative py-20 sm:py-28">
      <Wrap>
        <SectionTitle
          eyebrow="CardÃ¡pio de Detailing"
          title="ServiÃ§os para quem exige acabamento espelhado"
          intro="Cada etapa Ã© executada com tÃ©cnica, produtos certificados e atenÃ§Ã£o a cada detalhe do seu veÃ­culo."
        />
        <div data-stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} s={s} />
          ))}
        </div>
      </Wrap>
    </section>
  );
}

/* ------------------------------ DIFERENCIAIS ------------------------------ */

function Pillars() {
  return (
    <section id="diferenciais" className="relative border-y border-white/5 bg-[#0c0c0f] py-20 sm:py-28">
      <Wrap>
        <SectionTitle eyebrow="MÃ©todo PRO Detail" title="Por que a BestCar?" />
        <div data-stagger className="grid gap-4 md:grid-cols-3">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                data-item
                className="group rounded-3xl border border-white/10 bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-red-600/40"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-red-600/10 text-red-500 ring-1 ring-red-600/30">
                    <Icon className="size-7" aria-hidden />
                  </span>
                  <span className="font-display text-5xl font-extrabold text-white/5">0{i + 1}</span>
                </div>
                <h3 className="font-display text-xl font-bold uppercase leading-tight tracking-tight text-zinc-100">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-zinc-400">{p.description}</p>
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
    <section id="depoimentos" className="relative py-20 sm:py-28">
      <Wrap>
        <div data-reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <Eyebrow>Prova social real</Eyebrow>
            <h2 className="font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight text-zinc-100 sm:text-5xl">
              Quem leva o carro, volta.
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-card px-5 py-4">
            <span className="font-display text-4xl font-extrabold text-zinc-100">5.0</span>
            <div>
              <GoogleStars />
              <p className="mt-1 text-xs text-zinc-400">AvaliaÃ§Ãµes no Google</p>
            </div>
          </div>
        </div>

        <div data-stagger className="grid gap-4 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.author + t.quote.slice(0, 12)}
              data-item
              className="flex flex-col rounded-3xl border border-white/10 bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-red-600/40 sm:p-8"
            >
              <GoogleStars />
              <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-zinc-200">â€œ{t.quote}â€</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-zinc-800 text-sm font-bold text-metal">
                  {t.author.charAt(0)}
                </span>
                <span className="flex flex-col">
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-zinc-100">
                    {t.author}
                    <BadgeCheck className="size-4 text-red-500" aria-label="Verificado" />
                  </span>
                  <span className="text-xs text-zinc-500">{t.meta}</span>
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
          className="flex min-h-16 w-full items-center justify-between gap-4 px-6 py-4 text-left text-base font-semibold text-zinc-100 sm:text-lg"
        >
          {q}
          <Plus className={`size-5 shrink-0 text-red-500 transition-transform duration-300 ${open ? "rotate-45" : ""}`} aria-hidden />
        </button>
      </h3>
      <div
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-btn-${index}`}
        className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 leading-relaxed text-zinc-400">{a}</p>
        </div>
      </div>
    </div>
  );
}

function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="faq" className="relative border-t border-white/5 bg-[#0c0c0f] py-20 sm:py-28">
      <Wrap className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div data-reveal>
          <Eyebrow>DÃºvidas frequentes</Eyebrow>
          <h2 className="font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight text-zinc-100 sm:text-5xl">
            Tire suas dÃºvidas antes de agendar
          </h2>
          <p className="mt-5 text-zinc-400">NÃ£o achou o que procurava? Chame a equipe no WhatsApp.</p>
          <a
            href={waLink("OlÃ¡, visitei o site da BestCar e tenho uma dÃºvida sobre os serviÃ§os.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold text-zinc-100 transition-all duration-300 hover:border-red-600/40 hover:bg-white/5"
          >
            <MessageCircle className="size-4 text-red-500" aria-hidden />
            Falar com a equipe
          </a>
        </div>
        <div data-stagger className="flex flex-col gap-3">
          {FAQ.map((f, i) => (
            <FaqItem key={f.q} index={i} q={f.q} a={f.a} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? null : i)} />
          ))}
        </div>
      </Wrap>
    </section>
  );
}

/* ------------------------------ LOCALIZAÃ‡ÃƒO ------------------------------- */

function Location() {
  return (
    <section id="localizacao" className="relative py-20 sm:py-28">
      <Wrap>
        <SectionTitle eyebrow="LocalizaÃ§Ã£o, horÃ¡rios & contato" title="Venha conhecer a BestCar" />
        <div data-reveal className="grid overflow-hidden rounded-3xl border border-white/10 bg-card lg:grid-cols-2">
          <div className="flex flex-col gap-8 p-7 sm:p-10">
            <div className="flex gap-4">
              <MapPin className="mt-1 size-6 shrink-0 text-red-500" aria-hidden />
              <div>
                <h3 className="font-display text-lg font-bold uppercase tracking-tight">EndereÃ§o</h3>
                <p className="mt-2 text-zinc-300">{BUSINESS.addressLine1}</p>
                <p className="text-zinc-400">{BUSINESS.addressLine2}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-red-600 px-5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500"
                  >
                    <Navigation className="size-4" aria-hidden />
                    TraÃ§ar Rota no Google Maps
                  </a>
                  <a
                    href={WAZE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-zinc-100 transition-all duration-300 hover:border-red-600/40 hover:bg-white/5"
                  >
                    Waze
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="mt-1 size-6 shrink-0 text-red-500" aria-hidden />
              <div className="w-full">
                <h3 className="font-display text-lg font-bold uppercase tracking-tight">HorÃ¡rio de atendimento</h3>
                <ul className="mt-3 divide-y divide-white/10">
                  {HOURS.map((h) => (
                    <li key={h.day} className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:justify-between">
                      <span className="font-medium text-zinc-200">{h.day}</span>
                      <span className={"closed" in h ? "text-red-400" : "text-zinc-400"}>{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone className="mt-1 size-6 shrink-0 text-red-500" aria-hidden />
              <div>
                <h3 className="font-display text-lg font-bold uppercase tracking-tight">Contato</h3>
                <a href={`tel:${BUSINESS.phoneTel}`} className="mt-2 block text-zinc-300 transition-colors hover:text-white">
                  {BUSINESS.phoneLabel}
                </a>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-semibold transition-all duration-300 hover:border-red-600/40 hover:bg-white/5">
                    <MessageCircle className="size-4 text-red-500" aria-hidden /> WhatsApp
                  </a>
                  <a href={BUSINESS.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-semibold transition-all duration-300 hover:border-red-600/40 hover:bg-white/5">
                    <InstagramIcon className="size-4 text-red-500" /> {BUSINESS.instagramHandle}
                  </a>
                  <a href={BUSINESS.facebookUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-semibold transition-all duration-300 hover:border-red-600/40 hover:bg-white/5">
                    <FacebookIcon className="size-4 text-red-500" /> Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="min-h-80 border-t border-white/10 lg:border-l lg:border-t-0">
            <iframe
              title="Mapa - BestCar EstÃ©tica Automotiva em Mafra/SC"
              src={MAPS_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-80 w-full grayscale invert-[0.92] contrast-[0.9]"
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
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-red-600/15 blur-[120px]" />
      <Wrap className="relative py-20 text-center sm:py-28">
        <div data-reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/estetica/logo-bestcar.png" alt="" width={900} height={467} className="mx-auto mb-8 h-20 w-auto" loading="lazy" />
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight text-zinc-100 sm:text-5xl">
            {FOOTER.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-zinc-400 sm:text-lg">{FOOTER.subtitle}</p>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="animate-pulse-ring group mt-9 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-red-600 px-8 text-base font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-red-500"
          >
            <MessageCircle className="size-5" aria-hidden />
            {FOOTER.cta}
          </a>
        </div>
        <div className="mt-16 flex flex-col items-center gap-5 border-t border-white/10 pt-8 text-sm text-zinc-500">
          <div className="flex items-center gap-4">
            <a href={BUSINESS.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram da BestCar" className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition-all duration-300 hover:border-red-600/40 hover:text-white">
              <InstagramIcon />
            </a>
            <a href={BUSINESS.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook da BestCar" className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition-all duration-300 hover:border-red-600/40 hover:text-white">
              <FacebookIcon />
            </a>
            <a href={`tel:${BUSINESS.phoneTel}`} aria-label="Ligar para a BestCar" className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition-all duration-300 hover:border-red-600/40 hover:text-white">
              <Phone className="size-5" />
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
      className="animate-pulse-ring fixed bottom-5 right-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-950/50 transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 md:hidden"
    >
      <MessageCircle className="size-6" aria-hidden />
    </a>
  );
}

/* ------------------------------ PÃGINA ------------------------------------ */

export default function Landing() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Navbar: transparente -> bg-zinc-950/90 + blur + borda, suavemente na rolagem
        gsap.to("#site-nav", {
          backgroundColor: "rgba(9,9,11,0.9)",
          borderBottomColor: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          ease: "none",
          scrollTrigger: { start: 10, end: 140, scrub: true },
        });

        // Hero: entrada
        gsap.from("[data-hero]", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.1, delay: 0.1 });

        // TÃ­tulos / blocos soltos
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        // Grids (serviÃ§os, pilares, depoimentos, FAQ): stagger
        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((grid) => {
          gsap.from(grid.querySelectorAll("[data-item]"), {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: grid, start: "top 85%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative overflow-x-clip">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Pillars />
        <Testimonials />
        <Faq />
        <Location />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

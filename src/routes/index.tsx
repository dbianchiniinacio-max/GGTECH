import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useRef, type FormEvent } from "react";
import {
  Menu, X, Zap, ArrowRight, Shield, Truck, Star, ShoppingCart, Eye, TrendingUp,
  MessageSquare, CheckCircle, Package, Sparkles, Clock, CreditCard, Headphones,
  RotateCcw, Trophy, Instagram, Mail, MessageCircle, MapPin, User, Phone, Home, FileText,
} from "lucide-react";
import logo from "@/assets/ggtech-logo.png";
import heroBg from "@/assets/hero-bg.jpg";
import foneM25 from "@/assets/fone-m25-gamer.jpg";
import foneI12 from "@/assets/fone-bluetooth-i12.jpg";
import tecladoRgb from "@/assets/teclado-rgb-pro.jpg";
import tecladoWireless from "@/assets/teclado-wireless.jpg";
import mouseBlack from "@/assets/mouse-gamer-black.jpg";
import attackShark from "@/assets/attack-shark-x11.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

// ─── Constants ───────────────────────────────────────────────────────────────
const STORE_URL = "https://dbianchiniinacio-max.github.io/GGTECH/";

// ─── Hook: useScrollReveal ───────────────────────────────────────────────────
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// ─── Product Types & Data ────────────────────────────────────────────────────
type Product = {
  name: string; price: string; priceNum: number; oldPrice: string;
  rating: number; reviews: number; image: string; tag: string;
  stock: number; viewers: number; description: string; specs: string[];
  paymentLink: string;
  customerReviews: { name: string; stars: number; text: string; date: string }[];
};

const products: Product[] = [
  {
    name: "Fone Gamer M25", price: "R$ 69,00", priceNum: 69, oldPrice: "R$ 99,90",
    rating: 5, reviews: 47, image: foneM25, tag: "Mais Vendido", stock: 8, viewers: 15,
    description: "O Fone M25 possui baixa latência para jogos competitivos, som surround 7.1 e microfone com cancelamento de ruído. Ideal para longas sessões de gameplay.",
    specs: ["Surround 7.1", "Baixa Latência", "Mic c/ Cancelamento", "Até 6h de bateria"],
    paymentLink: "https://deflow.exchange/pay/ef094af0be50cda7",
    customerReviews: [
      { name: "Lucas", stars: 5, text: "Muito bom para o preço, o som é limpo.", date: "02/04/2026" },
      { name: "Ana", stars: 5, text: "Chegou rápido e a bateria dura muito.", date: "28/03/2026" },
      { name: "Rafael S.", stars: 4, text: "Ótimo custo-benefício, recomendo!", date: "15/03/2026" },
    ],
  },
  {
    name: "Fone Bluetooth i12 TWS", price: "R$ 35,00", priceNum: 35, oldPrice: "R$ 59,90",
    rating: 4, reviews: 83, image: foneI12, tag: "-42%", stock: 12, viewers: 9,
    description: "Fones compactos com conexão Bluetooth 5.0 estável. Perfeitos para ouvir música no dia a dia com praticidade e leveza.",
    specs: ["Bluetooth 5.0", "Auto Power-On", "Até 4h de bateria", "Case carregador incluso"],
    paymentLink: "https://deflow.exchange/pay/d3882585f2883052",
    customerReviews: [
      { name: "Carla", stars: 4, text: "Simples e funcional. Vale o custo benefício.", date: "05/04/2026" },
      { name: "Pedro H.", stars: 5, text: "Pareamento rápido e som limpo. Recomendo!", date: "01/04/2026" },
      { name: "Juliana F.", stars: 4, text: "Muito bom, pelo preço vale muito.", date: "20/03/2026" },
    ],
  },
  {
    name: "Teclado RGB Pro", price: "R$ 159,00", priceNum: 159, oldPrice: "R$ 219,90",
    rating: 5, reviews: 64, image: tecladoRgb, tag: "-32%", stock: 10, viewers: 18,
    description: "Teclado mecânico com switches azuis, iluminação RGB customizável e tecnologia anti-ghosting completa.",
    specs: ["Switches Azuis", "RGB Customizável", "Anti-Ghosting", "Layout ABNT2"],
    paymentLink: "https://deflow.exchange/pay/9cbb582f13915724",
    customerReviews: [
      { name: "Gamer99", stars: 5, text: "Clique bem satisfatório e cores lindas!", date: "03/04/2026" },
      { name: "Carla B.", stars: 5, text: "Ótima qualidade de construção.", date: "25/03/2026" },
      { name: "Diego M.", stars: 4, text: "Bom teclado, pelo preço é excelente.", date: "18/03/2026" },
    ],
  },
  {
    name: "Teclado Wireless", price: "R$ 219,00", priceNum: 219, oldPrice: "R$ 299,90",
    rating: 5, reviews: 31, image: tecladoWireless, tag: "-38%", stock: 6, viewers: 5,
    description: "Liberdade sem fios! Teclado ultra fino com bateria recarregável e resposta instantânea sem lag.",
    specs: ["Wireless 2.4GHz", "Ultra Fino", "Bateria Recarregável", "Resposta Instantânea"],
    paymentLink: "https://deflow.exchange/pay/a68d25a13ae56484",
    customerReviews: [
      { name: "Roberto", stars: 5, text: "Excelente para produtividade e clean setup.", date: "08/04/2026" },
      { name: "Bianca T.", stars: 5, text: "Lindo demais, combinou perfeito com meu setup.", date: "30/03/2026" },
      { name: "Gustavo N.", stars: 5, text: "Wireless sem delay nenhum.", date: "22/03/2026" },
    ],
  },
  {
    name: "Mouse Gamer Black", price: "R$ 99,00", priceNum: 99, oldPrice: "R$ 149,90",
    rating: 4, reviews: 56, image: mouseBlack, tag: "-34%", stock: 9, viewers: 12,
    description: "Mouse ergonômico com 7 botões programáveis e ajuste de DPI até 7200. Precisão cirúrgica para seus jogos.",
    specs: ["Sensor 7200 DPI", "7 Botões Programáveis", "Ergonômico", "Cabo trançado 1.8m"],
    paymentLink: "https://deflow.exchange/pay/f72d5ac01b9e55ea",
    customerReviews: [
      { name: "Vitor", stars: 4, text: "Peso ideal e pegada muito boa.", date: "06/04/2026" },
      { name: "Isabela R.", stars: 5, text: "Ergonômico e bonito, o RGB é show de bola.", date: "29/03/2026" },
      { name: "André L.", stars: 4, text: "Bom mouse, cabo de boa qualidade.", date: "21/03/2026" },
    ],
  },
  {
    name: "Attack Shark X11", price: "R$ 149,00", priceNum: 149, oldPrice: "R$ 219,90",
    rating: 5, reviews: 38, image: attackShark, tag: "-41%", stock: 7, viewers: 8,
    description: "Mouse super leve (63g) com sensor PixArt PAW3311 de alta performance. O queridinho dos pro-players.",
    specs: ["Sensor PAW3311", "63g ultraleve", "Tri-mode Wireless", "Dock RGB incluso"],
    paymentLink: "https://deflow.exchange/pay/91a34b8a07b028ee",
    customerReviews: [
      { name: "Felipe", stars: 5, text: "Incrível, muito leve mesmo. Mudou meu jogo.", date: "07/04/2026" },
      { name: "Larissa D.", stars: 5, text: "Levíssimo e super preciso, vale cada centavo.", date: "31/03/2026" },
      { name: "Bruno P.", stars: 5, text: "Nível de mouse caro por metade do preço. Insano!", date: "24/03/2026" },
    ],
  },
];

const offers = [
  { name: "Fone Gamer M25", from: "R$ 99,90", to: "R$ 69,00", save: "R$ 30,90", discount: "31%", image: foneM25, link: "https://deflow.exchange/pay/ef094af0be50cda7" },
  { name: "Mouse Gamer Black", from: "R$ 119,90", to: "R$ 79,00", save: "R$ 40,90", discount: "34%", image: mouseBlack, link: "https://deflow.exchange/pay/f72d5ac01b9e55ea" },
  { name: "Teclado RGB Pro", from: "R$ 219,90", to: "R$ 149,00", save: "R$ 70,90", discount: "32%", image: tecladoRgb, link: "https://deflow.exchange/pay/9cbb582f13915724" },
];

const combos = [
  { name: "Kit Setup Completo", desc: "Teclado Wireless + Attack Shark X11 + Fone Gamer M25", from: "R$ 257,00", to: "R$ 229,90", save: "Economize R$ 27,10", image: tecladoWireless, link: "https://deflow.exchange/pt/pay/c54420ae8ab0f0ca" },
  { name: "Kit Precisão & Áudio", desc: "Attack Shark X11 + Fone Bluetooth i12 TWS", from: "R$ 124,00", to: "R$ 109,90", save: "Economize R$ 14,10", image: attackShark, link: "https://deflow.exchange/pt/pay/1a339c9d046edd1b" },
];

const benefits = [
  { icon: Truck, title: "Frete Nacional", desc: "Entrega para todo o Brasil em até 90 dias úteis." },
  { icon: Shield, title: "Garantia Estendida", desc: "Proteção completa contra defeitos de fabricação." },
  { icon: CreditCard, title: "Pagamento Seguro", desc: "Compra 100% segura via Pix." },
  { icon: Headphones, title: "Suporte 24/7", desc: "Atendimento dedicado sempre disponível." },
  { icon: RotateCcw, title: "Reembolso em 15 dias", desc: "Devolução fácil com reembolso garantido em até 15 dias." },
  { icon: Trophy, title: "Qualidade Premium", desc: "Produtos testados e certificados." },
];

const socialReviews = [
  { name: "Lucas A.", avatar: "LA", rating: 5, text: "Embalagem impecável, tudo funcionando 100%. Produto de qualidade!", product: "Teclado RGB Pro" },
  { name: "Marcos R.", avatar: "MR", rating: 5, text: "Melhor preço que encontrei no mercado atual. Recomendo demais.", product: "Fone Bluetooth i12" },
  { name: "João P.", avatar: "JP", rating: 5, text: "O teclado mecânico mudou minha gameplay. Top! Switches magnéticos muito bons.", product: "Teclado Wireless" },
  { name: "Beatriz W.", avatar: "BW", rating: 5, text: "Comprei o i12 e a bateria dura o dia todo. Ótimo custo-benefício.", product: "Fone Bluetooth i12" },
  { name: "Daniel M.", avatar: "DM", rating: 5, text: "Site confiável, compra rápida via Pix. Chegou certinho.", product: "Mouse Gamer Black" },
  { name: "Vitor R.", avatar: "VR", rating: 5, text: "GGTech é a melhor descoberta do ano. Produtos excelentes!", product: "Attack Shark X11" },
  { name: "Felipe T.", avatar: "FT", rating: 5, text: "Design dos fones é muito bonito ao vivo. Qualidade surpreendente.", product: "Fone M25 Gamer" },
  { name: "Pedro S.", avatar: "PS", rating: 5, text: "O teclado sem fio e o attack shark x11 é muito bom. Switches magnéticos e delay curtíssimo. Recomendo!", product: "Kit Gamer" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function generateOrderId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "GG-";
  for (let i = 0; i < 8; i++) id += chars.charAt(Math.floor(Math.random() * chars.length));
  return id;
}

// ─── CheckoutForm ────────────────────────────────────────────────────────────
type CheckoutFormData = { nome: string; cpf: string; telefone: string; cep: string; endereco: string };

function formatCPF(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function formatCEP(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

function CheckoutForm({ paymentLink, onBack }: { paymentLink: string; onBack: () => void }) {
  const [form, setForm] = useState<CheckoutFormData>({ nome: "", cpf: "", telefone: "", cep: "", endereco: "" });
  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});

  const validate = () => {
    const e: Partial<CheckoutFormData> = {};
    if (!form.nome.trim() || form.nome.trim().length < 3) e.nome = "Nome completo é obrigatório";
    if (form.cpf.replace(/\D/g, "").length !== 11) e.cpf = "CPF inválido";
    if (form.telefone.replace(/\D/g, "").length < 10) e.telefone = "Telefone inválido";
    if (form.cep.replace(/\D/g, "").length !== 8) e.cep = "CEP inválido";
    if (!form.endereco.trim() || form.endereco.trim().length < 5) e.endereco = "Endereço é obrigatório";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (validate()) {
      window.open(paymentLink, "_blank", "noopener,noreferrer");
    }
  };

  const inputClass = (field: keyof CheckoutFormData) =>
    `w-full rounded-xl bg-secondary/50 border ${errors[field] ? "border-red-500" : "border-border"} px-4 py-3 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h4 className="text-lg font-bold text-foreground flex items-center gap-2 mb-2">
        <FileText className="h-5 w-5 text-primary" />Dados para Entrega
      </h4>

      <div>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Nome Completo" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className={inputClass("nome")} maxLength={100} />
        </div>
        {errors.nome && <p className="text-xs text-red-500 mt-1">{errors.nome}</p>}
      </div>

      <div>
        <div className="relative">
          <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="CPF (000.000.000-00)" value={form.cpf} onChange={(e) => setForm({ ...form, cpf: formatCPF(e.target.value) })} className={inputClass("cpf")} />
        </div>
        {errors.cpf && <p className="text-xs text-red-500 mt-1">{errors.cpf}</p>}
      </div>

      <div>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Telefone (00) 00000-0000" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: formatPhone(e.target.value) })} className={inputClass("telefone")} />
        </div>
        {errors.telefone && <p className="text-xs text-red-500 mt-1">{errors.telefone}</p>}
      </div>

      <div>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="CEP (00000-000)" value={form.cep} onChange={(e) => setForm({ ...form, cep: formatCEP(e.target.value) })} className={inputClass("cep")} />
        </div>
        {errors.cep && <p className="text-xs text-red-500 mt-1">{errors.cep}</p>}
      </div>

      <div>
        <div className="relative">
          <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Endereço completo (rua, número, bairro, cidade)" value={form.endereco} onChange={(e) => setForm({ ...form, endereco: e.target.value })} className={inputClass("endereco")} maxLength={200} />
        </div>
        {errors.endereco && <p className="text-xs text-red-500 mt-1">{errors.endereco}</p>}
      </div>

      <button type="submit" className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-primary py-4 text-sm font-bold text-primary-foreground hover:shadow-glow transition-all duration-300 hover:scale-[1.02]">
        <ShoppingCart className="h-4 w-4" />Ir para Pagamento
      </button>
      <button type="button" onClick={onBack} className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors">
        ← Voltar
      </button>
    </form>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Início", href: "#hero" },
    { label: "Produtos", href: "#produtos" },
    { label: "Ofertas", href: "#ofertas" },
    { label: "Combos", href: "#combos" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg shadow-background/50" : "bg-transparent"}`}>
      <div className="bg-primary/10 border-b border-primary/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-2 py-1.5">
          <Zap className="h-3 w-3 text-primary" />
          <span className="text-xs font-medium text-primary">🚚 FRETE GRÁTIS para todo o Brasil</span>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <img src={logo} alt="GGTECH" className="h-10 w-auto" />
          </a>
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:shadow-glow transition-all duration-300 hover:scale-105">
              Comprar Agora
            </a>
            <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg text-foreground hover:bg-card transition-colors">
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background/98 backdrop-blur-2xl animate-fade-up">
          <div className="px-4 py-5 space-y-1">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-card transition-all">
                {l.label}
              </a>
            ))}
            <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-4 py-3 text-sm font-bold text-primary-foreground mt-3">
              Ir para a Loja
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── HeroSection ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Setup gamer" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 pt-40">
        <div className="max-w-2xl animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">Promoção ativa — Estoque limitado</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            <span className="text-foreground">Setup gamer</span><br />
            <span className="text-foreground">de verdade </span>
            <span className="text-gradient-primary">começa aqui.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg">
            Periféricos premium com os melhores preços. Entrega para todo o Brasil em até 90 dias e reembolso garantido em até 15 dias.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105">
              Ver Produtos
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#ofertas" className="inline-flex items-center justify-center rounded-2xl border border-border/60 px-8 py-4 text-base font-bold text-foreground hover:bg-card hover:border-primary/30 transition-all duration-300">
              Ofertas do Dia
            </a>
          </div>
          <div className="mt-14 flex flex-wrap items-center gap-6 sm:gap-10">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"><Star className="h-5 w-5 text-primary fill-primary" /></div>
              <div><p className="text-lg font-black text-foreground">4.9★</p><p className="text-xs text-muted-foreground">Avaliação média</p></div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-border" />
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"><Truck className="h-5 w-5 text-primary" /></div>
              <div><p className="text-lg font-black text-foreground">Brasil</p><p className="text-xs text-muted-foreground">Entrega nacional</p></div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-border" />
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"><Shield className="h-5 w-5 text-primary" /></div>
              <div><p className="text-lg font-black text-foreground">500+</p><p className="text-xs text-muted-foreground">Clientes satisfeitos</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ProductDetailModal ──────────────────────────────────────────────────────
function ProductDetailModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderId] = useState(generateOrderId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card border border-border shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 rounded-full bg-background/80 p-2 hover:bg-primary/20 transition-colors">
          <X className="h-5 w-5 text-foreground" />
        </button>

        {!showCheckout ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="aspect-square overflow-hidden bg-secondary/30 rounded-tl-2xl md:rounded-bl-2xl">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col">
                {product.tag && <span className="self-start rounded-full bg-gradient-primary px-3 py-1 text-xs font-bold text-primary-foreground mb-3">{product.tag}</span>}
                <h3 className="text-2xl font-black text-foreground" style={{ fontFamily: "'Orbitron', sans-serif" }}>{product.name}</h3>
                <div className="flex items-center gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className={`h-4 w-4 ${idx < product.rating ? "text-primary fill-primary" : "text-muted-foreground"}`} />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">({product.reviews} avaliações)</span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.specs.map((spec) => (
                    <span key={spec} className="rounded-lg bg-secondary/50 border border-border px-2.5 py-1 text-xs text-foreground">{spec}</span>
                  ))}
                </div>
                <div className="mt-6">
                  <span className="text-sm text-muted-foreground line-through">{product.oldPrice}</span>
                  <p className="text-3xl font-black text-primary">{product.price}</p>
                </div>
                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{product.viewers} vendo agora</span>
                  <span className="text-primary font-semibold">⚠️ {product.stock} em estoque</span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-green-500 font-semibold">
                  <Truck className="h-3.5 w-3.5" />Frete Grátis
                </div>
                <button onClick={() => setShowCheckout(true)} className="mt-6 flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-primary py-3.5 text-sm font-bold text-primary-foreground hover:shadow-glow transition-all duration-300 hover:scale-[1.02]">
                  <ShoppingCart className="h-4 w-4" />Comprar Agora
                </button>
                <div className="mt-3 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Truck className="h-3 w-3" />Entrega em até 90 dias</span>
                  <span className="flex items-center gap-1"><Shield className="h-3 w-3" />Reembolso em até 15 dias</span>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-border">
              <h4 className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
                <MessageSquare className="h-5 w-5 text-primary" />Avaliações dos Clientes
              </h4>
              <div className="space-y-4">
                {product.customerReviews.map((review) => (
                  <div key={review.name} className="rounded-xl bg-secondary/30 border border-border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">{review.name.charAt(0)}</div>
                        <span className="font-semibold text-foreground text-sm">{review.name}</span>
                        <span className="text-xs text-green-500 flex items-center gap-0.5"><CheckCircle className="h-3 w-3" />Compra verificada</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5 mb-2">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star key={idx} className={`h-3 w-3 ${idx < review.stars ? "text-primary fill-primary" : "text-muted-foreground"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="p-8">
            <h3 className="text-2xl font-black text-foreground mb-6" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Finalizar <span className="text-gradient-primary">Pedido</span>
            </h3>
            <div className="rounded-xl bg-secondary/30 border border-border p-5 mb-6">
              <div className="flex items-center gap-4">
                <img src={product.image} alt={product.name} className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-1">
                  <h4 className="font-bold text-foreground">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">Quantidade: 1</p>
                </div>
                <p className="text-xl font-black text-primary">{product.price}</p>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">ID do Pedido</span><span className="font-mono font-bold text-primary">{orderId}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">{product.price}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Frete</span><span className="text-green-500 font-semibold">Grátis</span></div>
              <div className="border-t border-border pt-3 flex justify-between"><span className="font-bold text-foreground">Total</span><span className="text-2xl font-black text-primary">{product.price}</span></div>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-6">
              <span className="flex items-center gap-1"><Truck className="h-3 w-3" />Entrega em até 90 dias</span>
              <span className="flex items-center gap-1"><Shield className="h-3 w-3" />Reembolso em até 15 dias</span>
            </div>
            <CheckoutForm paymentLink={product.paymentLink} onBack={() => setShowCheckout(false)} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ProductsSection ─────────────────────────────────────────────────────────
function ProductsSection() {
  const { ref, isVisible } = useScrollReveal();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const generateViewers = useCallback(() =>
    products.map((p) => Math.max(3, p.viewers + Math.floor(Math.random() * 11) - 5)), []
  );
  const [liveViewers, setLiveViewers] = useState(generateViewers);

  useEffect(() => {
    const interval = setInterval(() => setLiveViewers(generateViewers()), 3000);
    return () => clearInterval(interval);
  }, [generateViewers]);

  return (
    <>
      <section id="produtos" className="py-20 sm:py-28 relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
        <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 mb-4">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-primary">Em Alta</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Nossos <span className="text-gradient-primary">Produtos</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">Periféricos selecionados para elevar sua gameplay ao próximo nível</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <button key={p.name} onClick={() => setSelectedProduct(p)} className={`group rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-glow text-left ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: isVisible ? `${i * 100}ms` : "0ms" }}>
                <div className="relative aspect-square overflow-hidden bg-secondary/50">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" width={800} height={800} />
                  {p.tag && <span className="absolute top-3 left-3 rounded-full bg-gradient-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-lg">{p.tag}</span>}
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold shadow-glow">Ver Detalhes</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star key={idx} className={`h-3.5 w-3.5 ${idx < p.rating ? "text-primary fill-primary" : "text-muted-foreground"}`} />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">({p.reviews})</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-lg">{p.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{p.description}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{liveViewers[i]} vendo agora</span>
                    <span className="text-primary font-semibold">⚠️ {p.stock} em estoque</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-muted-foreground line-through">{p.oldPrice}</span>
                      <p className="text-2xl font-black text-primary">{p.price}</p>
                    </div>
                    <span className="flex items-center gap-1.5 rounded-xl bg-gradient-primary px-4 py-2.5 text-xs font-bold text-primary-foreground group-hover:shadow-glow transition-all duration-300 group-hover:scale-105">
                      <ShoppingCart className="h-4 w-4" />Comprar
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
      {selectedProduct && <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </>
  );
}

// ─── OffersSection ───────────────────────────────────────────────────────────
function OffersSection() {
  const { ref, isVisible } = useScrollReveal();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleViewDetails = (offerName: string) => {
    const match = products.find((p) => p.name === offerName);
    if (match) setSelectedProduct(match);
  };

  return (
    <>
      <section id="ofertas" className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-card" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 mb-4 animate-glow-pulse">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-primary">Ofertas Limitadas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Ofertas <span className="text-gradient-primary">Imperdíveis</span>
            </h2>
            <div className="mt-4 inline-flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" /><span className="text-sm">Promoção por tempo limitado — aproveite!</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map((o, i) => (
              <div key={o.name} className={`group relative rounded-2xl border-2 border-primary/20 bg-background overflow-hidden hover:border-primary transition-all duration-500 hover:-translate-y-2 hover:shadow-glow ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: isVisible ? `${i * 120}ms` : "0ms" }}>
                <div className="absolute top-4 right-4 z-10"><div className="rounded-2xl bg-gradient-primary px-4 py-2 shadow-glow"><span className="text-sm font-black text-primary-foreground">-{o.discount}</span></div></div>
                <div className="absolute top-4 left-4 z-10 rounded-full bg-background/80 backdrop-blur-sm px-3 py-1 border border-primary/30"><span className="text-xs font-bold text-primary">Economize {o.save}</span></div>
                <div className="aspect-square overflow-hidden"><img src={o.image} alt={o.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" width={800} height={800} /></div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-foreground">{o.name}</h3>
                  <div className="mt-3 flex items-end gap-3">
                    <span className="text-sm text-muted-foreground line-through">{o.from}</span>
                    <span className="text-3xl font-black text-primary">{o.to}</span>
                  </div>
                  <div className="mt-5 flex gap-3">
                    <button onClick={() => handleViewDetails(o.name)} className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-primary/40 py-3.5 text-sm font-bold text-primary hover:bg-primary/10 transition-all duration-300">
                      <Eye className="h-4 w-4" />Ver Detalhes
                    </button>
                    <a href={o.link} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-primary py-3.5 text-sm font-bold text-primary-foreground hover:shadow-glow transition-all duration-300">
                      Comprar<ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {selectedProduct && <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </>
  );
}

// ─── ComboDetailModal ────────────────────────────────────────────────────────
function ComboDetailModal({ combo, onClose }: { combo: typeof combos[0]; onClose: () => void }) {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-card border border-border shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 rounded-full bg-background/80 p-2 hover:bg-primary/20 transition-colors">
          <X className="h-5 w-5 text-foreground" />
        </button>
        <div className="aspect-video overflow-hidden rounded-t-2xl">
          <img src={combo.image} alt={combo.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-black text-foreground" style={{ fontFamily: "'Orbitron', sans-serif" }}>{combo.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{combo.desc}</p>
          <div className="mt-4 rounded-xl bg-primary/5 border border-primary/20 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-primary">{combo.save}</span>
            </div>
            <div className="flex items-end gap-3">
              <span className="text-sm text-muted-foreground line-through">{combo.from}</span>
              <span className="text-3xl font-black text-primary">{combo.to}</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Truck className="h-3.5 w-3.5" /><span>Frete Grátis</span>
            <span className="mx-1">•</span>
            <Shield className="h-3.5 w-3.5" /><span>Reembolso em até 15 dias</span>
          </div>
          {!showForm ? (
            <button onClick={() => setShowForm(true)} className="mt-6 flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-primary py-3.5 text-sm font-bold text-primary-foreground hover:shadow-glow transition-all duration-300 hover:scale-[1.02]">
              <ShoppingCart className="h-4 w-4" />Comprar Agora
            </button>
          ) : (
            <div className="mt-6">
              <CheckoutForm paymentLink={combo.link} onBack={() => setShowForm(false)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── CombosSection ───────────────────────────────────────────────────────────
function CombosSection() {
  const { ref, isVisible } = useScrollReveal();
  const [selectedCombo, setSelectedCombo] = useState<typeof combos[0] | null>(null);
  return (
    <>
    <section id="combos" className="py-20 sm:py-28 relative">
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 mb-4">
            <Package className="h-4 w-4 text-primary" /><span className="text-sm font-bold text-primary">Combos Especiais</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Kits <span className="text-gradient-primary">Gamer</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Monte seu setup completo e economize comprando em combo</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {combos.map((c, i) => (
            <div key={c.name} className={`group relative rounded-2xl border-2 border-primary/20 bg-card overflow-hidden hover:border-primary transition-all duration-500 hover:-translate-y-2 hover:shadow-glow ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: isVisible ? `${i * 150}ms` : "0ms" }}>
              <div className="aspect-[16/9] overflow-hidden">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" width={800} height={600} />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-gradient-primary px-3 py-1.5 shadow-glow">
                <Sparkles className="h-3.5 w-3.5 text-primary-foreground" /><span className="text-xs font-bold text-primary-foreground">{c.save}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl sm:text-2xl font-black text-foreground">{c.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground line-through">{c.from}</span>
                    <p className="text-3xl sm:text-4xl font-black text-primary">{c.to}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setSelectedCombo(c)} className="flex items-center gap-2 rounded-xl border border-primary/40 px-4 py-3 text-sm font-bold text-primary hover:bg-primary/10 transition-all duration-300">
                      <Eye className="h-4 w-4" />Detalhes
                    </button>
                    <a href={c.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-3 text-sm font-bold text-primary-foreground group-hover:shadow-glow transition-all duration-300 group-hover:scale-105">
                      Comprar<ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    {selectedCombo && <ComboDetailModal combo={selectedCombo} onClose={() => setSelectedCombo(null)} />}
    </>
  );
}

// ─── BenefitsSection ─────────────────────────────────────────────────────────
function BenefitsSection() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="py-20 sm:py-28 relative">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Por Que Escolher <span className="text-gradient-primary">GGTECH</span>?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">Compromisso com qualidade, segurança e a melhor experiência de compra</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div key={b.title} className={`group rounded-2xl border border-border bg-card p-7 hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: isVisible ? `${i * 80}ms` : "0ms" }}>
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-gradient-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:shadow-glow group-hover:scale-110">
                <b.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-foreground text-lg">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SocialProof ─────────────────────────────────────────────────────────────
function SocialProof() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-card" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            O que nossos <span className="text-gradient-primary">clientes</span> dizem
          </h2>
          <p className="mt-4 text-muted-foreground">Avaliações reais de quem já comprou na GGTECH</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {socialReviews.map((r, i) => (
            <div key={r.name} className={`rounded-2xl border border-border bg-background p-5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: isVisible ? `${i * 60}ms` : "0ms" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground text-sm font-bold shrink-0">{r.avatar}</div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground">{r.name}</p>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-500 shrink-0" />
                    <p className="text-[10px] font-bold text-green-500 uppercase tracking-wider">Compra verificada</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className={`h-3.5 w-3.5 ${idx < r.rating ? "text-primary fill-primary" : "text-muted-foreground"}`} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">"{r.text}"</p>
              <p className="mt-3 text-xs text-primary/70 font-medium">{r.product}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer id="contato" className="border-t border-border bg-card relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[150px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <img src={logo} alt="GGTECH" className="h-12 w-auto mb-4" loading="lazy" />
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              A GGTECH é referência em periféricos gamer e tecnologia. Produtos premium com preço justo, entrega em até 90 dias para todo o Brasil e reembolso em até 15 dias.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5 rounded-lg bg-background border border-border px-3 py-1.5">
                <Shield className="h-3.5 w-3.5 text-primary" /><span className="text-xs font-medium text-muted-foreground">Compra Segura</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg bg-background border border-border px-3 py-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" /><span className="text-xs font-medium text-muted-foreground">Reembolso 15 dias</span>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-muted-foreground hover:bg-gradient-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:shadow-glow"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-muted-foreground hover:bg-gradient-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:shadow-glow"><MessageCircle className="h-5 w-5" /></a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-muted-foreground hover:bg-gradient-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:shadow-glow"><Mail className="h-5 w-5" /></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-4">Links Rápidos</h4>
            <ul className="space-y-2.5">
              {["Início", "Produtos", "Ofertas", "Combos"].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">{l}</a></li>
              ))}
              <li><a href={STORE_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Loja Online →</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-4">Atendimento</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-primary shrink-0" />Segunda a Sexta: 9h - 18h</li>
              <li className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-primary shrink-0" />Sábados: 9h - 13h</li>
              <li className="flex items-center gap-2 pt-2"><Mail className="h-3.5 w-3.5 text-primary shrink-0" /><a href="mailto:contato@ggtech.com.br" className="hover:text-primary transition-colors">contato@ggtech.com.br</a></li>
              <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary shrink-0" />Brasil — Entrega nacional</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2026 GGTECH. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="font-medium text-primary">Pix</span><span>•</span><span>Cartão de Crédito</span><span>•</span><span>Boleto</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <HeroSection />
      <ProductsSection />
      <OffersSection />
      <CombosSection />
      <BenefitsSection />
      <SocialProof />
      <Footer />
    </div>
  );
}

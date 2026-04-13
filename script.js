// ─── SVG Icons ───────────────────────────────────────────────────────────────
const icons = {
  menu: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>',
  x: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  zap: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>',
  arrowRight: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
  star: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  starEmpty: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  truck: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>',
  shield: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>',
  shoppingCart: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>',
  eye: '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>',
  trendingUp: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
  package: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"/><path d="m7.5 4.27 9 5.15"/></svg>',
  sparkles: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>',
  clock: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  creditCard: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>',
  headphones: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>',
  rotateCcw: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',
  trophy: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
  instagram: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>',
  messageCircle: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>',
  mail: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  mapPin: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>',
  checkCircle: '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>',
  msgSquare: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
};

function starIcons(count, size) {
  let s = '';
  const sz = size || 14;
  for (let i = 0; i < 5; i++) {
    s += i < count
      ? icons.star.replace(/width="\d+"/, `width="${sz}"`).replace(/height="\d+"/, `height="${sz}"`)
      : icons.starEmpty.replace(/width="\d+"/, `width="${sz}"`).replace(/height="\d+"/, `height="${sz}"`);
  }
  return s;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const STORE_URL = "https://dbianchiniinacio-max.github.io/GGTECH/";

const products = [
  { name:"Fone Gamer M25", price:"R$ 69,00", priceNum:69, oldPrice:"R$ 99,90", rating:5, reviews:47, image:"assets/fone-m25-gamer.jpg", tag:"Mais Vendido", stock:8, viewers:15, description:"O Fone M25 possui baixa latência para jogos competitivos, som surround 7.1 e microfone com cancelamento de ruído. Ideal para longas sessões de gameplay.", specs:["Surround 7.1","Baixa Latência","Mic c/ Cancelamento","Até 6h de bateria"], paymentLink:"https://deflow.exchange/pay/ef094af0be50cda7", customerReviews:[{name:"Lucas",stars:5,text:"Muito bom para o preço, o som é limpo.",date:"02/04/2026"},{name:"Ana",stars:5,text:"Chegou rápido e a bateria dura muito.",date:"28/03/2026"},{name:"Rafael S.",stars:4,text:"Ótimo custo-benefício, recomendo!",date:"15/03/2026"}] },
  { name:"Fone Bluetooth i12 TWS", price:"R$ 35,00", priceNum:35, oldPrice:"R$ 59,90", rating:4, reviews:83, image:"assets/fone-bluetooth-i12.jpg", tag:"-42%", stock:12, viewers:9, description:"Fones compactos com conexão Bluetooth 5.0 estável. Perfeitos para ouvir música no dia a dia com praticidade e leveza.", specs:["Bluetooth 5.0","Auto Power-On","Até 4h de bateria","Case carregador incluso"], paymentLink:"https://deflow.exchange/pay/d3882585f2883052", customerReviews:[{name:"Carla",stars:4,text:"Simples e funcional. Vale o custo benefício.",date:"05/04/2026"},{name:"Pedro H.",stars:5,text:"Pareamento rápido e som limpo. Recomendo!",date:"01/04/2026"},{name:"Juliana F.",stars:4,text:"Muito bom, pelo preço vale muito.",date:"20/03/2026"}] },
  { name:"Teclado RGB Pro", price:"R$ 159,00", priceNum:159, oldPrice:"R$ 219,90", rating:5, reviews:64, image:"assets/teclado-rgb-pro.jpg", tag:"-32%", stock:10, viewers:18, description:"Teclado mecânico com switches azuis, iluminação RGB customizável e tecnologia anti-ghosting completa.", specs:["Switches Azuis","RGB Customizável","Anti-Ghosting","Layout ABNT2"], paymentLink:"https://deflow.exchange/pay/9cbb582f13915724", customerReviews:[{name:"Gamer99",stars:5,text:"Clique bem satisfatório e cores lindas!",date:"03/04/2026"},{name:"Carla B.",stars:5,text:"Ótima qualidade de construção.",date:"25/03/2026"},{name:"Diego M.",stars:4,text:"Bom teclado, pelo preço é excelente.",date:"18/03/2026"}] },
  { name:"Teclado Wireless", price:"R$ 219,00", priceNum:219, oldPrice:"R$ 299,90", rating:5, reviews:31, image:"assets/teclado-wireless.jpg", tag:"-38%", stock:6, viewers:5, description:"Liberdade sem fios! Teclado ultra fino com bateria recarregável e resposta instantânea sem lag.", specs:["Wireless 2.4GHz","Ultra Fino","Bateria Recarregável","Resposta Instantânea"], paymentLink:"https://deflow.exchange/pay/a68d25a13ae56484", customerReviews:[{name:"Roberto",stars:5,text:"Excelente para produtividade e clean setup.",date:"08/04/2026"},{name:"Bianca T.",stars:5,text:"Lindo demais, combinou perfeito com meu setup.",date:"30/03/2026"},{name:"Gustavo N.",stars:5,text:"Wireless sem delay nenhum.",date:"22/03/2026"}] },
  { name:"Mouse Gamer Black", price:"R$ 99,00", priceNum:99, oldPrice:"R$ 149,90", rating:4, reviews:56, image:"assets/mouse-gamer-black.jpg", tag:"-34%", stock:9, viewers:12, description:"Mouse ergonômico com 7 botões programáveis e ajuste de DPI até 7200. Precisão cirúrgica para seus jogos.", specs:["Sensor 7200 DPI","7 Botões Programáveis","Ergonômico","Cabo trançado 1.8m"], paymentLink:"https://deflow.exchange/pay/f72d5ac01b9e55ea", customerReviews:[{name:"Vitor",stars:4,text:"Peso ideal e pegada muito boa.",date:"06/04/2026"},{name:"Isabela R.",stars:5,text:"Ergonômico e bonito, o RGB é show de bola.",date:"29/03/2026"},{name:"André L.",stars:4,text:"Bom mouse, cabo de boa qualidade.",date:"21/03/2026"}] },
  { name:"Attack Shark X11", price:"R$ 149,00", priceNum:149, oldPrice:"R$ 219,90", rating:5, reviews:38, image:"assets/attack-shark-x11.jpg", tag:"-41%", stock:7, viewers:8, description:"Mouse super leve (63g) com sensor PixArt PAW3311 de alta performance. O queridinho dos pro-players.", specs:["Sensor PAW3311","63g ultraleve","Tri-mode Wireless","Dock RGB incluso"], paymentLink:"https://deflow.exchange/pay/91a34b8a07b028ee", customerReviews:[{name:"Felipe",stars:5,text:"Incrível, muito leve mesmo. Mudou meu jogo.",date:"07/04/2026"},{name:"Larissa D.",stars:5,text:"Levíssimo e super preciso, vale cada centavo.",date:"31/03/2026"},{name:"Bruno P.",stars:5,text:"Nível de mouse caro por metade do preço. Insano!",date:"24/03/2026"}] },
];

const offers = [
  { name:"Fone Gamer M25", from:"R$ 99,90", to:"R$ 69,00", save:"R$ 30,90", discount:"31%", image:"assets/fone-m25-gamer.jpg", link:"https://deflow.exchange/pay/ef094af0be50cda7" },
  { name:"Mouse Gamer Black", from:"R$ 119,90", to:"R$ 79,00", save:"R$ 40,90", discount:"34%", image:"assets/mouse-gamer-black.jpg", link:"https://deflow.exchange/pay/f72d5ac01b9e55ea" },
  { name:"Teclado RGB Pro", from:"R$ 219,90", to:"R$ 149,00", save:"R$ 70,90", discount:"32%", image:"assets/teclado-rgb-pro.jpg", link:"https://deflow.exchange/pay/9cbb582f13915724" },
];

const combos = [
  { name:"Kit Setup Completo", desc:"Teclado Wireless + Attack Shark X11 + Fone Gamer M25", from:"R$ 257,00", to:"R$ 229,90", save:"Economize R$ 27,10", image:"assets/teclado-wireless.jpg", link:STORE_URL },
  { name:"Kit Precisão & Áudio", desc:"Attack Shark X11 + Fone Bluetooth i12 TWS", from:"R$ 124,00", to:"R$ 109,90", save:"Economize R$ 14,10", image:"assets/attack-shark-x11.jpg", link:STORE_URL },
];

const benefits = [
  { icon:"truck", title:"Frete Nacional", desc:"Entrega para todo o Brasil em até 90 dias úteis." },
  { icon:"shield", title:"Garantia Estendida", desc:"Proteção completa contra defeitos de fabricação." },
  { icon:"creditCard", title:"Pagamento Seguro", desc:"Compra 100% segura via Pix." },
  { icon:"headphones", title:"Suporte 24/7", desc:"Atendimento dedicado sempre disponível." },
  { icon:"rotateCcw", title:"Reembolso em 15 dias", desc:"Devolução fácil com reembolso garantido em até 15 dias." },
  { icon:"trophy", title:"Qualidade Premium", desc:"Produtos testados e certificados." },
];

const socialReviews = [
  { name:"Lucas A.", avatar:"LA", rating:5, text:"Embalagem impecável, tudo funcionando 100%. Produto de qualidade!", product:"Teclado RGB Pro" },
  { name:"Marcos R.", avatar:"MR", rating:5, text:"Melhor preço que encontrei no mercado atual. Recomendo demais.", product:"Fone Bluetooth i12" },
  { name:"João P.", avatar:"JP", rating:5, text:"O teclado mecânico mudou minha gameplay. Top! Switches magnéticos muito bons.", product:"Teclado Wireless" },
  { name:"Beatriz W.", avatar:"BW", rating:5, text:"Comprei o i12 e a bateria dura o dia todo. Ótimo custo-benefício.", product:"Fone Bluetooth i12" },
  { name:"Daniel M.", avatar:"DM", rating:5, text:"Site confiável, compra rápida via Pix. Chegou certinho.", product:"Mouse Gamer Black" },
  { name:"Vitor R.", avatar:"VR", rating:5, text:"GGTech é a melhor descoberta do ano. Produtos excelentes!", product:"Attack Shark X11" },
  { name:"Felipe T.", avatar:"FT", rating:5, text:"Design dos fones é muito bonito ao vivo. Qualidade surpreendente.", product:"Fone M25 Gamer" },
  { name:"Pedro S.", avatar:"PS", rating:5, text:"O teclado sem fio e o attack shark x11 é muito bom. Switches magnéticos e delay curtíssimo. Recomendo!", product:"Kit Gamer" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function generateOrderId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "GG-";
  for (let i = 0; i < 8; i++) id += chars.charAt(Math.floor(Math.random() * chars.length));
  return id;
}

// ─── Scroll reveal ──────────────────────────────────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ─── Navbar scroll ──────────────────────────────────────────────────────────
function initNavbar() {
  const nav = document.getElementById('navbar');
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.innerHTML = open ? icons.x : icons.menu;
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.innerHTML = icons.menu;
  }));
}

// ─── Live viewers ────────────────────────────────────────────────────────────
function initLiveViewers() {
  setInterval(() => {
    document.querySelectorAll('[data-viewers]').forEach(el => {
      const base = parseInt(el.dataset.viewers);
      el.textContent = Math.max(3, base + Math.floor(Math.random() * 11) - 5) + ' vendo agora';
    });
  }, 3000);
}

// ─── Modal ───────────────────────────────────────────────────────────────────
function openProductModal(index) {
  const p = products[index];
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  const orderId = generateOrderId();

  function renderProduct() {
    content.innerHTML = `
      <button class="modal-close" onclick="closeModal()">${icons.x}</button>
      <div class="modal-product">
        <div class="modal-img"><img src="${p.image}" alt="${p.name}"></div>
        <div class="modal-details">
          ${p.tag ? `<span class="modal-tag bg-gradient">${p.tag}</span>` : ''}
          <h3 class="modal-pname orbitron">${p.name}</h3>
          <div class="modal-rating">${starIcons(p.rating)}<span class="rcount">(${p.reviews} avaliações)</span></div>
          <p class="modal-pdesc">${p.description}</p>
          <div class="modal-specs">${p.specs.map(s => `<span class="modal-spec">${s}</span>`).join('')}</div>
          <div class="modal-price-block">
            <span class="modal-old-price">${p.oldPrice}</span>
            <p class="modal-price">${p.price}</p>
          </div>
          <div class="modal-meta">
            <span>${icons.eye} ${p.viewers} vendo agora</span>
            <span class="stock">⚠️ ${p.stock} em estoque</span>
          </div>
          <div class="modal-frete">${icons.truck} Frete Grátis</div>
          <button class="modal-buy-btn bg-gradient" onclick="showCheckout()">${icons.shoppingCart} Comprar Agora</button>
          <div class="modal-guarantees">
            <span>${icons.truck} Entrega em até 90 dias</span>
            <span>${icons.shield} Reembolso em até 15 dias</span>
          </div>
        </div>
      </div>
      <div class="modal-reviews">
        <h4>${icons.msgSquare} Avaliações dos Clientes</h4>
        ${p.customerReviews.map(r => `
          <div class="modal-review-item">
            <div class="modal-review-top">
              <div class="modal-review-user">
                <div class="modal-review-avatar">${r.name.charAt(0)}</div>
                <span class="modal-review-name">${r.name}</span>
                <span class="modal-review-verified">${icons.checkCircle} Compra verificada</span>
              </div>
              <span class="modal-review-date">${r.date}</span>
            </div>
            <div class="modal-review-stars">${starIcons(r.stars, 12)}</div>
            <p class="modal-review-text">${r.text}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  window.showCheckout = function() {
    content.innerHTML = `
      <button class="modal-close" onclick="closeModal()">${icons.x}</button>
      <div class="checkout-wrap">
        <h3 class="checkout-title orbitron">Finalizar <span class="text-gradient">Pedido</span></h3>
        <div class="checkout-product">
          <img src="${p.image}" alt="${p.name}">
          <div class="checkout-product-info">
            <h4>${p.name}</h4>
            <p>Quantidade: 1</p>
          </div>
          <span class="checkout-product-price">${p.price}</span>
        </div>
        <div class="checkout-lines">
          <div class="checkout-line"><span class="label">ID do Pedido</span><span class="value mono">${orderId}</span></div>
          <div class="checkout-line"><span class="label">Subtotal</span><span class="value">${p.price}</span></div>
          <div class="checkout-line"><span class="label">Frete</span><span class="value green">Grátis</span></div>
          <div class="checkout-total"><span class="label">Total</span><span class="value">${p.price}</span></div>
        </div>
        <div class="checkout-guarantees">
          <span>${icons.truck} Entrega em até 90 dias</span>
          <span>${icons.shield} Reembolso em até 15 dias</span>
        </div>
        <a href="${p.paymentLink}" target="_blank" rel="noopener noreferrer" class="checkout-pay-btn bg-gradient">${icons.shoppingCart} Ir para Pagamento</a>
        <button class="checkout-back" onclick="backToProduct()">← Voltar ao produto</button>
      </div>
    `;
  };

  window.backToProduct = renderProduct;

  renderProduct();
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('modal-overlay').addEventListener('click', function(e) {
  if (e.target === this || e.target.classList.contains('modal-backdrop')) closeModal();
});

// ─── Init ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initReveal();
  initLiveViewers();
});

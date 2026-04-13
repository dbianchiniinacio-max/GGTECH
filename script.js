// ─── Data ────────────────────────────────────────────────────────────────────
const STORE_URL = "https://dbianchiniinacio-max.github.io/GGTECH/";

const products = [
  {name:"Fone Gamer M25",price:"R$ 69,00",priceNum:69,oldPrice:"R$ 99,90",rating:5,reviews:47,image:"assets/fone-m25-gamer.jpg",tag:"Mais Vendido",stock:8,viewers:15,description:"O Fone M25 possui baixa latência para jogos competitivos, som surround 7.1 e microfone com cancelamento de ruído. Ideal para longas sessões de gameplay.",specs:["Surround 7.1","Baixa Latência","Mic c/ Cancelamento","Até 6h de bateria"],paymentLink:"https://deflow.exchange/pay/ef094af0be50cda7",customerReviews:[{name:"Lucas",stars:5,text:"Muito bom para o preço, o som é limpo.",date:"02/04/2026"},{name:"Ana",stars:5,text:"Chegou rápido e a bateria dura muito.",date:"28/03/2026"},{name:"Rafael S.",stars:4,text:"Ótimo custo-benefício, recomendo!",date:"15/03/2026"}]},
  {name:"Fone Bluetooth i12 TWS",price:"R$ 35,00",priceNum:35,oldPrice:"R$ 59,90",rating:4,reviews:83,image:"assets/fone-bluetooth-i12.jpg",tag:"-42%",stock:12,viewers:9,description:"Fones compactos com conexão Bluetooth 5.0 estável. Perfeitos para ouvir música no dia a dia com praticidade e leveza.",specs:["Bluetooth 5.0","Auto Power-On","Até 4h de bateria","Case carregador incluso"],paymentLink:"https://deflow.exchange/pay/d3882585f2883052",customerReviews:[{name:"Carla",stars:4,text:"Simples e funcional. Vale o custo benefício.",date:"05/04/2026"},{name:"Pedro H.",stars:5,text:"Pareamento rápido e som limpo. Recomendo!",date:"01/04/2026"},{name:"Juliana F.",stars:4,text:"Muito bom, pelo preço vale muito.",date:"20/03/2026"}]},
  {name:"Teclado RGB Pro",price:"R$ 149,00",priceNum:149,oldPrice:"R$ 219,90",rating:5,reviews:64,image:"assets/teclado-rgb-pro.jpg",tag:"-32%",stock:10,viewers:18,description:"Teclado mecânico com switches azuis, iluminação RGB customizável e tecnologia anti-ghosting completa.",specs:["Switches Azuis","RGB Customizável","Anti-Ghosting","Layout ABNT2"],paymentLink:"https://deflow.exchange/pay/9cbb582f13915724",customerReviews:[{name:"Gamer99",stars:5,text:"Clique bem satisfatório e cores lindas!",date:"03/04/2026"},{name:"Carla B.",stars:5,text:"Ótima qualidade de construção.",date:"25/03/2026"},{name:"Diego M.",stars:4,text:"Bom teclado, pelo preço é excelente.",date:"18/03/2026"}]},
  {name:"Teclado Wireless",price:"R$ 99,00",priceNum:99,oldPrice:"R$ 159,90",rating:5,reviews:31,image:"assets/teclado-wireless.jpg",tag:"-38%",stock:6,viewers:5,description:"Liberdade sem fios! Teclado ultra fino com bateria recarregável e resposta instantânea sem lag.",specs:["Wireless 2.4GHz","Ultra Fino","Bateria Recarregável","Resposta Instantânea"],paymentLink:"https://deflow.exchange/pay/a68d25a13ae56484",customerReviews:[{name:"Roberto",stars:5,text:"Excelente para produtividade e clean setup.",date:"08/04/2026"},{name:"Bianca T.",stars:5,text:"Lindo demais, combinou perfeito com meu setup.",date:"30/03/2026"},{name:"Gustavo N.",stars:5,text:"Wireless sem delay nenhum.",date:"22/03/2026"}]},
  {name:"Mouse Gamer Black",price:"R$ 79,00",priceNum:79,oldPrice:"R$ 119,90",rating:4,reviews:56,image:"assets/mouse-gamer-black.jpg",tag:"-34%",stock:9,viewers:12,description:"Mouse ergonômico com 7 botões programáveis e ajuste de DPI até 7200. Precisão cirúrgica para seus jogos.",specs:["Sensor 7200 DPI","7 Botões Programáveis","Ergonômico","Cabo trançado 1.8m"],paymentLink:"https://deflow.exchange/pay/f72d5ac01b9e55ea",customerReviews:[{name:"Vitor",stars:4,text:"Peso ideal e pegada muito boa.",date:"06/04/2026"},{name:"Isabela R.",stars:5,text:"Ergonômico e bonito, o RGB é show de bola.",date:"29/03/2026"},{name:"André L.",stars:4,text:"Bom mouse, cabo de boa qualidade.",date:"21/03/2026"}]},
  {name:"Attack Shark X11",price:"R$ 89,00",priceNum:89,oldPrice:"R$ 149,90",rating:5,reviews:38,image:"assets/attack-shark-x11.jpg",tag:"-41%",stock:7,viewers:8,description:"Mouse super leve (63g) com sensor PixArt PAW3311 de alta performance. O queridinho dos pro-players.",specs:["Sensor PAW3311","63g ultraleve","Tri-mode Wireless","Dock RGB incluso"],paymentLink:"https://deflow.exchange/pay/91a34b8a07b028ee",customerReviews:[{name:"Felipe",stars:5,text:"Incrível, muito leve mesmo. Mudou meu jogo.",date:"07/04/2026"},{name:"Larissa D.",stars:5,text:"Levíssimo e super preciso, vale cada centavo.",date:"31/03/2026"},{name:"Bruno P.",stars:5,text:"Nível de mouse caro por metade do preço. Insano!",date:"24/03/2026"}]}
];

const offers = [
  {name:"Fone Gamer M25",from:"R$ 99,90",to:"R$ 69,00",save:"R$ 30,90",discount:"31%",image:"assets/fone-m25-gamer.jpg",link:"https://deflow.exchange/pay/ef094af0be50cda7"},
  {name:"Mouse Gamer Black",from:"R$ 119,90",to:"R$ 79,00",save:"R$ 40,90",discount:"34%",image:"assets/mouse-gamer-black.jpg",link:"https://deflow.exchange/pay/f72d5ac01b9e55ea"},
  {name:"Teclado RGB Pro",from:"R$ 219,90",to:"R$ 149,00",save:"R$ 70,90",discount:"32%",image:"assets/teclado-rgb-pro.jpg",link:"https://deflow.exchange/pay/9cbb582f13915724"}
];

const combos = [
  {name:"Kit Setup Completo",desc:"Teclado Wireless + Attack Shark X11 + Fone Gamer M25",from:"R$ 257,00",to:"R$ 229,90",save:"Economize R$ 27,10",image:"assets/teclado-wireless.jpg",link:STORE_URL},
  {name:"Kit Precisão & Áudio",desc:"Attack Shark X11 + Fone Bluetooth i12 TWS",from:"R$ 124,00",to:"R$ 109,90",save:"Economize R$ 14,10",image:"assets/attack-shark-x11.jpg",link:STORE_URL}
];

const benefits = [
  {icon:"🚚",title:"Frete Nacional",desc:"Entrega para todo o Brasil em até 90 dias úteis."},
  {icon:"🛡️",title:"Garantia Estendida",desc:"Proteção completa contra defeitos de fabricação."},
  {icon:"💳",title:"Pagamento Seguro",desc:"Compra 100% segura via Pix."},
  {icon:"🎧",title:"Suporte 24/7",desc:"Atendimento dedicado sempre disponível."},
  {icon:"🔄",title:"Reembolso em 15 dias",desc:"Devolução fácil com reembolso garantido em até 15 dias."},
  {icon:"🏆",title:"Qualidade Premium",desc:"Produtos testados e certificados."}
];

const socialReviews = [
  {name:"Lucas A.",avatar:"LA",rating:5,text:"Embalagem impecável, tudo funcionando 100%. Produto de qualidade!",product:"Teclado RGB Pro"},
  {name:"Marcos R.",avatar:"MR",rating:5,text:"Melhor preço que encontrei no mercado atual. Recomendo demais.",product:"Fone Bluetooth i12"},
  {name:"João P.",avatar:"JP",rating:5,text:"O teclado mecânico mudou minha gameplay. Top! Switches magnéticos muito bons.",product:"Teclado Wireless"},
  {name:"Beatriz W.",avatar:"BW",rating:5,text:"Comprei o i12 e a bateria dura o dia todo. Ótimo custo-benefício.",product:"Fone Bluetooth i12"},
  {name:"Daniel M.",avatar:"DM",rating:5,text:"Site confiável, compra rápida via Pix. Chegou certinho.",product:"Mouse Gamer Black"},
  {name:"Vitor R.",avatar:"VR",rating:5,text:"GGTech é a melhor descoberta do ano. Produtos excelentes!",product:"Attack Shark X11"},
  {name:"Felipe T.",avatar:"FT",rating:5,text:"Design dos fones é muito bonito ao vivo. Qualidade surpreendente.",product:"Fone M25 Gamer"},
  {name:"Pedro S.",avatar:"PS",rating:5,text:"O teclado sem fio e o attack shark x11 é muito bom. Switches magnéticos e delay curtíssimo. Recomendo!",product:"Kit Gamer"}
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function stars(n) { return "★".repeat(n) + "☆".repeat(5-n); }
function generateOrderId() { const c="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; let id="GG-"; for(let i=0;i<8;i++) id+=c[Math.floor(Math.random()*c.length)]; return id; }

// ─── Live viewers ────────────────────────────────────────────────────────────
let liveViewers = products.map(p => p.viewers);
function updateViewers() {
  liveViewers = products.map(p => Math.max(3, p.viewers + Math.floor(Math.random()*11) - 5));
  document.querySelectorAll('.viewer-count').forEach((el, i) => {
    el.textContent = liveViewers[i] + " vendo agora";
  });
}
setInterval(updateViewers, 3000);

// ─── Render Products ─────────────────────────────────────────────────────────
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = products.map((p, i) => `
    <div class="product-card" onclick="openModal(${i})">
      <div class="card-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy" width="800" height="800">
        ${p.tag ? `<span class="card-tag">${p.tag}</span>` : ''}
        <div class="card-hover"><span>Ver Detalhes</span></div>
      </div>
      <div class="card-body">
        <div class="card-stars"><span class="stars">${stars(p.rating)}</span><span class="count">(${p.reviews})</span></div>
        <h3 class="card-name">${p.name}</h3>
        <p class="card-desc-text">${p.description}</p>
        <div class="card-meta">
          <span class="viewer-count">👁️ ${liveViewers[i]} vendo agora</span>
          <span class="stock">⚠️ ${p.stock} em estoque</span>
        </div>
        <div class="card-price-row">
          <div><span class="card-old-price">${p.oldPrice}</span><p class="card-price">${p.price}</p></div>
          <span class="card-buy">🛒 Comprar</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ─── Render Offers ───────────────────────────────────────────────────────────
function renderOffers() {
  const grid = document.getElementById('offersGrid');
  grid.innerHTML = offers.map(o => `
    <a href="${o.link}" target="_blank" rel="noopener noreferrer" class="offer-card">
      <div class="offer-discount">-${o.discount}</div>
      <div class="offer-save">Economize ${o.save}</div>
      <div class="card-img"><img src="${o.image}" alt="${o.name}" loading="lazy" width="800" height="800"></div>
      <div class="card-body">
        <h3 class="offer-name">${o.name}</h3>
        <div class="offer-prices"><span class="old">${o.from}</span><span class="new">${o.to}</span></div>
        <div class="offer-cta">Aproveitar Oferta →</div>
      </div>
    </a>
  `).join('');
}

// ─── Render Combos ───────────────────────────────────────────────────────────
function renderCombos() {
  const grid = document.getElementById('combosGrid');
  grid.innerHTML = combos.map(c => `
    <a href="${c.link}" target="_blank" rel="noopener noreferrer" class="combo-card">
      <div class="card-img"><img src="${c.image}" alt="${c.name}" loading="lazy" width="800" height="600"></div>
      <div class="combo-save">✨ ${c.save}</div>
      <div class="combo-info">
        <h3 class="combo-name">${c.name}</h3>
        <p class="combo-desc">${c.desc}</p>
        <div class="combo-price-row">
          <div><span class="combo-old">${c.from}</span><p class="combo-new">${c.to}</p></div>
          <span class="combo-buy">Comprar →</span>
        </div>
      </div>
    </a>
  `).join('');
}

// ─── Render Benefits ─────────────────────────────────────────────────────────
function renderBenefits() {
  const grid = document.getElementById('benefitsGrid');
  grid.innerHTML = benefits.map(b => `
    <div class="benefit-card">
      <div class="benefit-icon">${b.icon}</div>
      <h3 class="benefit-title">${b.title}</h3>
      <p class="benefit-desc">${b.desc}</p>
    </div>
  `).join('');
}

// ─── Render Reviews ──────────────────────────────────────────────────────────
function renderReviews() {
  const grid = document.getElementById('reviewsGrid');
  grid.innerHTML = socialReviews.map(r => `
    <div class="review-card">
      <div class="review-header">
        <div style="display:flex;align-items:center;gap:12px">
          <div class="review-avatar">${r.avatar}</div>
          <div>
            <p class="review-name">${r.name}</p>
            <p class="review-verified">✅ Compra verificada</p>
          </div>
        </div>
      </div>
      <div class="review-stars">${stars(r.rating)}</div>
      <p class="review-text">"${r.text}"</p>
      <p class="review-product">${r.product}</p>
    </div>
  `).join('');
}

// ─── Modal ───────────────────────────────────────────────────────────────────
let currentProduct = null;
function openModal(idx) {
  currentProduct = products[idx];
  showProductView();
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function showProductView() {
  const p = currentProduct;
  document.getElementById('modalContent').innerHTML = `
    <div class="modal-grid">
      <div class="modal-img"><img src="${p.image}" alt="${p.name}"></div>
      <div class="modal-info">
        ${p.tag ? `<span class="modal-tag">${p.tag}</span>` : ''}
        <h3 class="modal-title">${p.name}</h3>
        <div class="modal-rating"><span class="stars">${stars(p.rating)}</span><span class="count">(${p.reviews} avaliações)</span></div>
        <p class="modal-desc">${p.description}</p>
        <div class="modal-specs">${p.specs.map(s => `<span>${s}</span>`).join('')}</div>
        <div class="modal-price-block">
          <span class="modal-old-price">${p.oldPrice}</span>
          <p class="modal-price">${p.price}</p>
        </div>
        <div class="modal-meta">
          <span>👁️ ${p.viewers} vendo agora</span>
          <span class="stock">⚠️ ${p.stock} em estoque</span>
        </div>
        <div class="modal-shipping">🚚 Frete Grátis</div>
        <button class="modal-buy-btn" onclick="showCheckoutView()">🛒 Comprar Agora</button>
        <div class="modal-guarantees">
          <span>🚚 Entrega em até 90 dias</span>
          <span>🛡️ Reembolso em até 15 dias</span>
        </div>
      </div>
    </div>
    <div class="modal-reviews">
      <h4>💬 Avaliações dos Clientes</h4>
      ${p.customerReviews.map(r => `
        <div class="modal-review-item">
          <div class="modal-review-header">
            <div class="modal-review-user">
              <div class="modal-review-avatar">${r.name.charAt(0)}</div>
              <span class="modal-review-name">${r.name}</span>
              <span class="modal-review-verified">✅ Compra verificada</span>
            </div>
            <span class="modal-review-date">${r.date}</span>
          </div>
          <div class="modal-review-stars">${stars(r.stars)}</div>
          <p class="modal-review-text">${r.text}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function showCheckoutView() {
  const p = currentProduct;
  const orderId = generateOrderId();
  document.getElementById('modalContent').innerHTML = `
    <div class="checkout">
      <h3 class="checkout-title">Finalizar <span class="text-gradient">Pedido</span></h3>
      <div class="checkout-product">
        <img src="${p.image}" alt="${p.name}">
        <div>
          <h4 class="checkout-product-name">${p.name}</h4>
          <p class="checkout-product-qty">Quantidade: 1</p>
        </div>
        <span class="checkout-product-price">${p.price}</span>
      </div>
      <div class="checkout-lines">
        <div class="checkout-line"><span class="label">ID do Pedido</span><span class="value mono">${orderId}</span></div>
        <div class="checkout-line"><span class="label">Subtotal</span><span class="value">${p.price}</span></div>
        <div class="checkout-line"><span class="label">Frete</span><span class="value green">Grátis</span></div>
      </div>
      <div class="checkout-total"><span class="label">Total</span><span class="value">${p.price}</span></div>
      <div class="checkout-guarantees" style="margin-top:16px">
        <span>🚚 Entrega em até 90 dias</span>
        <span>🛡️ Reembolso em até 15 dias</span>
      </div>
      <a href="${p.paymentLink}" target="_blank" rel="noopener noreferrer" class="checkout-pay-btn" style="margin-top:24px">🛒 Ir para Pagamento</a>
      <button class="checkout-back" onclick="showProductView()">← Voltar ao produto</button>
    </div>
  `;
}

// ─── Mobile Menu ─────────────────────────────────────────────────────────────
function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('menuIcon').style.display = '';
  document.getElementById('closeIcon').style.display = 'none';
}
document.getElementById('menuToggle').addEventListener('click', () => {
  const menu = document.getElementById('mobileMenu');
  const isOpen = menu.classList.toggle('open');
  document.getElementById('menuIcon').style.display = isOpen ? 'none' : '';
  document.getElementById('closeIcon').style.display = isOpen ? '' : 'none';
});

// ─── Navbar scroll ───────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ─── Scroll Reveal ───────────────────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ─── Init ────────────────────────────────────────────────────────────────────
renderProducts();
renderOffers();
renderCombos();
renderBenefits();
renderReviews();

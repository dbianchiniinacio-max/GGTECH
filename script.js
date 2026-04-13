
// ─── Data ────────────────────────────────────────────────────────────────────
const STORE_URL = "https://dbianchiniinacio-max.github.io/GGTECH/";

const products = [
  { name:"Fone Gamer M25", price:"R$ 69,00", priceNum:69, oldPrice:"R$ 99,90", rating:5, reviews:47, image:"images/fone-m25-gamer.jpg", tag:"Mais Vendido", stock:8, viewers:15,
    description:"O Fone M25 possui baixa latência para jogos competitivos, som surround 7.1 e microfone com cancelamento de ruído.",
    specs:["Surround 7.1","Baixa Latência","Mic c/ Cancelamento","Até 6h de bateria"],
    paymentLink:"https://deflow.exchange/pay/ef094af0be50cda7",
    customerReviews:[{name:"Lucas",stars:5,text:"Muito bom para o preço, o som é limpo.",date:"02/04/2026"},{name:"Ana",stars:5,text:"Chegou rápido e a bateria dura muito.",date:"28/03/2026"},{name:"Rafael S.",stars:4,text:"Ótimo custo-benefício, recomendo!",date:"15/03/2026"}]},
  { name:"Fone Bluetooth i12 TWS", price:"R$ 35,00", priceNum:35, oldPrice:"R$ 59,90", rating:4, reviews:83, image:"images/fone-bluetooth-i12.jpg", tag:"-42%", stock:12, viewers:9,
    description:"Fones compactos com conexão Bluetooth 5.0 estável. Perfeitos para ouvir música no dia a dia.",
    specs:["Bluetooth 5.0","Auto Power-On","Até 4h de bateria","Case carregador incluso"],
    paymentLink:"https://deflow.exchange/pay/d3882585f2883052",
    customerReviews:[{name:"Carla",stars:4,text:"Simples e funcional. Vale o custo benefício.",date:"05/04/2026"},{name:"Pedro H.",stars:5,text:"Pareamento rápido e som limpo.",date:"01/04/2026"},{name:"Juliana F.",stars:4,text:"Muito bom, pelo preço vale muito.",date:"20/03/2026"}]},
  { name:"Teclado RGB Pro", price:"R$ 159,00", priceNum:159, oldPrice:"R$ 219,90", rating:5, reviews:64, image:"images/teclado-rgb-pro.jpg", tag:"-32%", stock:10, viewers:18,
    description:"Teclado mecânico com switches azuis, iluminação RGB customizável e anti-ghosting.",
    specs:["Switches Azuis","RGB Customizável","Anti-Ghosting","Layout ABNT2"],
    paymentLink:"https://deflow.exchange/pay/9cbb582f13915724",
    customerReviews:[{name:"Gamer99",stars:5,text:"Clique satisfatório e cores lindas!",date:"03/04/2026"},{name:"Carla B.",stars:5,text:"Ótima qualidade de construção.",date:"25/03/2026"},{name:"Diego M.",stars:4,text:"Bom teclado, excelente pelo preço.",date:"18/03/2026"}]},
  { name:"Teclado Wireless", price:"R$ 219,00", priceNum:219, oldPrice:"R$ 299,90", rating:5, reviews:31, image:"images/teclado-wireless.jpg", tag:"-38%", stock:6, viewers:5,
    description:"Liberdade sem fios! Teclado ultra fino com bateria recarregável e resposta instantânea.",
    specs:["Wireless 2.4GHz","Ultra Fino","Bateria Recarregável","Resposta Instantânea"],
    paymentLink:"https://deflow.exchange/pay/a68d25a13ae56484",
    customerReviews:[{name:"Roberto",stars:5,text:"Excelente para produtividade e clean setup.",date:"08/04/2026"},{name:"Bianca T.",stars:5,text:"Lindo, combinou perfeito com meu setup.",date:"30/03/2026"},{name:"Gustavo N.",stars:5,text:"Wireless sem delay nenhum.",date:"22/03/2026"}]},
  { name:"Mouse Gamer Black", price:"R$ 99,00", priceNum:99, oldPrice:"R$ 149,90", rating:4, reviews:56, image:"images/mouse-gamer-black.jpg", tag:"-34%", stock:9, viewers:12,
    description:"Mouse ergonômico com 7 botões programáveis e ajuste de DPI até 7200.",
    specs:["Sensor 7200 DPI","7 Botões Programáveis","Ergonômico","Cabo trançado 1.8m"],
    paymentLink:"https://deflow.exchange/pay/f72d5ac01b9e55ea",
    customerReviews:[{name:"Vitor",stars:4,text:"Peso ideal e pegada muito boa.",date:"06/04/2026"},{name:"Isabela R.",stars:5,text:"Ergonômico e bonito, RGB show de bola.",date:"29/03/2026"},{name:"André L.",stars:4,text:"Bom mouse, cabo de boa qualidade.",date:"21/03/2026"}]},
  { name:"Attack Shark X11", price:"R$ 149,00", priceNum:149, oldPrice:"R$ 219,90", rating:5, reviews:38, image:"images/attack-shark-x11.jpg", tag:"-41%", stock:7, viewers:8,
    description:"Mouse super leve (63g) com sensor PixArt PAW3311 de alta performance.",
    specs:["Sensor PAW3311","63g ultraleve","Tri-mode Wireless","Dock RGB incluso"],
    paymentLink:"https://deflow.exchange/pay/91a34b8a07b028ee",
    customerReviews:[{name:"Felipe",stars:5,text:"Incrível, muito leve. Mudou meu jogo.",date:"07/04/2026"},{name:"Larissa D.",stars:5,text:"Levíssimo e super preciso.",date:"31/03/2026"},{name:"Bruno P.",stars:5,text:"Nível de mouse caro por metade do preço!",date:"24/03/2026"}]},
];

const offers = [
  { name:"Fone Gamer M25", from:"R$ 99,90", to:"R$ 69,00", save:"R$ 30,90", discount:"31%", image:"images/fone-m25-gamer.jpg", link:"https://deflow.exchange/pay/ef094af0be50cda7" },
  { name:"Mouse Gamer Black", from:"R$ 119,90", to:"R$ 79,00", save:"R$ 40,90", discount:"34%", image:"images/mouse-gamer-black.jpg", link:"https://deflow.exchange/pay/f72d5ac01b9e55ea" },
  { name:"Teclado RGB Pro", from:"R$ 219,90", to:"R$ 149,00", save:"R$ 70,90", discount:"32%", image:"images/teclado-rgb-pro.jpg", link:"https://deflow.exchange/pay/9cbb582f13915724" },
];

const combos = [
  { name:"Kit Setup Completo", desc:"Teclado Wireless + Attack Shark X11 + Fone Gamer M25", from:"R$ 318,00", to:"R$ 229,90", save:"Economize R$ 88,10", image:"images/teclado-wireless.jpg", link:"https://deflow.exchange/pt/pay/c54420ae8ab0f0ca" },
  { name:"Kit Precisão & Áudio", desc:"Attack Shark X11 + Fone Bluetooth i12 TWS", from:"R$ 240,00", to:"R$ 152,90", save:"Economize R$ 87,10", image:"images/attack-shark-x11.jpg", link:"https://deflow.exchange/pt/pay/1a339c9d046edd1b" },
];

const benefits = [
  { icon:"🚚", title:"Frete Nacional", desc:"Entrega para todo o Brasil em até 90 dias úteis." },
  { icon:"🛡️", title:"Garantia Estendida", desc:"Proteção completa contra defeitos de fabricação." },
  { icon:"💳", title:"Pagamento Seguro", desc:"Compra 100% segura via Pix." },
  { icon:"🎧", title:"Suporte 24/7", desc:"Atendimento dedicado sempre disponível." },
  { icon:"🔄", title:"Reembolso em 15 dias", desc:"Devolução fácil com reembolso garantido em até 15 dias." },
  { icon:"🏆", title:"Qualidade Premium", desc:"Produtos testados e certificados." },
];

const socialReviews = [
  { name:"Lucas A.", avatar:"LA", rating:5, text:"Embalagem impecável, tudo funcionando 100%!", product:"Teclado RGB Pro" },
  { name:"Marcos R.", avatar:"MR", rating:5, text:"Melhor preço que encontrei. Recomendo demais.", product:"Fone Bluetooth i12" },
  { name:"João P.", avatar:"JP", rating:5, text:"O teclado mecânico mudou minha gameplay. Top!", product:"Teclado Wireless" },
  { name:"Beatriz W.", avatar:"BW", rating:5, text:"Comprei o i12 e a bateria dura o dia todo.", product:"Fone Bluetooth i12" },
  { name:"Daniel M.", avatar:"DM", rating:5, text:"Site confiável, compra rápida via Pix.", product:"Mouse Gamer Black" },
  { name:"Vitor R.", avatar:"VR", rating:5, text:"GGTech é a melhor descoberta do ano!", product:"Attack Shark X11" },
  { name:"Felipe T.", avatar:"FT", rating:5, text:"Design dos fones é muito bonito ao vivo.", product:"Fone M25 Gamer" },
  { name:"Pedro S.", avatar:"PS", rating:5, text:"O teclado sem fio e o attack shark x11 é muito bom!", product:"Kit Gamer" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function starsHTML(count, size = 14) {
  let s = '';
  for (let i = 0; i < 5; i++) s += `<span style="font-size:${size}px;color:${i < count ? 'var(--primary)' : 'var(--fg-muted)'}">★</span>`;
  return s;
}
function generateOrderId() {
  const c = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "GG-";
  for (let i = 0; i < 8; i++) id += c.charAt(Math.floor(Math.random() * c.length));
  return id;
}

// ─── Modal Functions ─────────────────────────────────────────────────────────
function openProductModal(product) {
  const existing = document.querySelector('.modal-backdrop');
  if (existing) existing.remove();

  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.onclick = (e) => { if (e.target === backdrop) backdrop.remove(); };

  backdrop.innerHTML = `
    <div class="modal" onclick="event.stopPropagation()">
      <button class="modal-close" onclick="this.closest('.modal-backdrop').remove()">✕</button>
      <div id="modal-content">
        <div class="modal-grid">
          <div class="modal-img"><img src="${product.image}" alt="${product.name}"></div>
          <div class="modal-details">
            ${product.tag ? `<span class="modal-tag">${product.tag}</span>` : ''}
            <h3>${product.name}</h3>
            <div class="modal-rating">${starsHTML(product.rating, 16)}<span>(${product.reviews} avaliações)</span></div>
            <p class="modal-desc">${product.description}</p>
            <div class="modal-specs">${product.specs.map(s => `<span>${s}</span>`).join('')}</div>
            <div class="modal-price-block">
              <span class="old">${product.oldPrice}</span>
              <p class="current">${product.price}</p>
            </div>
            <div class="modal-meta">
              <span>👁️ ${product.viewers} vendo agora</span>
              <span class="stock">⚠️ ${product.stock} em estoque</span>
            </div>
            <div class="modal-shipping">🚚 Frete Grátis</div>
            <button class="modal-buy-btn" onclick="showCheckout(this)">🛒 Comprar Agora</button>
            <div class="modal-guarantees">
              <span>🚚 Entrega em até 90 dias</span>
              <span>🛡️ Reembolso em até 15 dias</span>
            </div>
          </div>
        </div>
        <div class="modal-reviews">
          <h4>💬 Avaliações dos Clientes</h4>
          ${product.customerReviews.map(r => `
            <div class="modal-review-item">
              <div class="modal-review-top">
                <div class="modal-review-user">
                  <div class="modal-review-avatar">${r.name.charAt(0)}</div>
                  <span class="modal-review-name">${r.name}</span>
                  <span class="modal-review-verified">✅ Compra verificada</span>
                </div>
                <span class="modal-review-date">${r.date}</span>
              </div>
              <div class="modal-review-stars">${starsHTML(r.stars, 12)}</div>
              <p class="modal-review-text">${r.text}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Store product data for checkout
  backdrop.querySelector('.modal').__product = product;
  document.body.appendChild(backdrop);
}

function showCheckout(btn) {
  const modal = btn.closest('.modal');
  const product = modal.__product;
  const orderId = generateOrderId();
  const content = modal.querySelector('#modal-content');

  content.innerHTML = `
    <div class="checkout">
      <h3>Finalizar <span class="text-gradient">Pedido</span></h3>
      <div class="checkout-product">
        <img src="${product.image}" alt="${product.name}">
        <div>
          <h4>${product.name}</h4>
          <p class="qty">Quantidade: 1</p>
        </div>
        <span class="cp-price">${product.price}</span>
      </div>
      <div class="checkout-lines">
        <div class="checkout-line"><span class="label">ID do Pedido</span><span class="val mono">${orderId}</span></div>
        <div class="checkout-line"><span class="label">Subtotal</span><span class="val">${product.price}</span></div>
        <div class="checkout-line"><span class="label">Frete</span><span class="val green">Grátis</span></div>
      </div>
      <div class="checkout-total"><span class="label">Total</span><span class="val">${product.price}</span></div>
      <div class="modal-guarantees" style="margin-bottom:24px">
        <span>🚚 Entrega em até 90 dias</span>
        <span>🛡️ Reembolso em até 15 dias</span>
      </div>
      <a href="${product.paymentLink}" target="_blank" rel="noopener noreferrer" class="modal-buy-btn" style="text-decoration:none">🛒 Ir para Pagamento</a>
      <button class="checkout-back" onclick="openProductModal(this.closest('.modal').__product)">← Voltar ao produto</button>
    </div>
  `;
}

function openComboModal(combo) {
  const existing = document.querySelector('.modal-backdrop');
  if (existing) existing.remove();

  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.onclick = (e) => { if (e.target === backdrop) backdrop.remove(); };

  backdrop.innerHTML = `
    <div class="modal combo-modal" onclick="event.stopPropagation()">
      <button class="modal-close" onclick="this.closest('.modal-backdrop').remove()">✕</button>
      <div class="combo-modal-img"><img src="${combo.image}" alt="${combo.name}"></div>
      <div class="combo-modal-body">
        <h3>${combo.name}</h3>
        <p class="desc">${combo.desc}</p>
        <div class="combo-modal-box">
          <div class="save-label">✨ ${combo.save}</div>
          <div class="prices">
            <span class="from">${combo.from}</span>
            <span class="to">${combo.to}</span>
          </div>
        </div>
        <div class="combo-modal-meta">
          <span>🚚 Frete Grátis</span>
          <span>•</span>
          <span>🛡️ Reembolso em até 15 dias</span>
        </div>
        <a href="${combo.link}" target="_blank" rel="noopener noreferrer" class="modal-buy-btn" style="text-decoration:none;margin-top:24px">🛒 Comprar Agora</a>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);
}

// ─── Render ──────────────────────────────────────────────────────────────────
function render() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <!-- Navbar -->
    <nav id="navbar">
      <div class="topbar">🚚 FRETE GRÁTIS para todo o Brasil</div>
      <div class="container">
        <div class="nav-inner">
          <a href="${STORE_URL}" target="_blank" rel="noopener noreferrer">
            <img src="images/ggtech-logo.png" alt="GGTECH" class="nav-logo">
          </a>
          <div class="nav-links">
            <a href="#hero">Início</a>
            <a href="#produtos">Produtos</a>
            <a href="#ofertas">Ofertas</a>
            <a href="#combos">Combos</a>
            <a href="#contato">Contato</a>
          </div>
          <div style="display:flex;align-items:center;gap:12px">
            <a href="${STORE_URL}" target="_blank" rel="noopener noreferrer" class="btn-primary hide-mobile">Comprar Agora</a>
            <button class="hamburger" onclick="document.getElementById('mobile-menu').classList.toggle('open')">☰</button>
          </div>
        </div>
      </div>
      <div class="mobile-menu" id="mobile-menu">
        <a href="#hero" onclick="this.parentElement.classList.remove('open')">Início</a>
        <a href="#produtos" onclick="this.parentElement.classList.remove('open')">Produtos</a>
        <a href="#ofertas" onclick="this.parentElement.classList.remove('open')">Ofertas</a>
        <a href="#combos" onclick="this.parentElement.classList.remove('open')">Combos</a>
        <a href="#contato" onclick="this.parentElement.classList.remove('open')">Contato</a>
        <a href="${STORE_URL}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="margin-top:12px;justify-content:center">Ir para a Loja</a>
      </div>
    </nav>

    <!-- Hero -->
    <section id="hero" class="hero">
      <div class="hero-bg"><img src="images/hero-bg.jpg" alt="Setup gamer" width="1920" height="1080"></div>
      <div class="container">
        <div class="hero-content">
          <div class="badge"><span class="dot"></span> Promoção ativa — Estoque limitado</div>
          <h1>Setup gamer<br>de verdade <span class="text-gradient">começa aqui.</span></h1>
          <p>Periféricos premium com os melhores preços. Entrega para todo o Brasil em até 90 dias e reembolso garantido em até 15 dias.</p>
          <div class="hero-btns">
            <a href="${STORE_URL}" target="_blank" rel="noopener noreferrer" class="btn-primary">Ver Produtos →</a>
            <a href="#ofertas" class="btn-outline">Ofertas do Dia</a>
          </div>
          <div class="hero-stats">
            <div class="stat"><div class="stat-icon">⭐</div><div><div class="stat-val">4.9★</div><div class="stat-label">Avaliação média</div></div></div>
            <div class="stat-div"></div>
            <div class="stat"><div class="stat-icon">🚚</div><div><div class="stat-val">Brasil</div><div class="stat-label">Entrega nacional</div></div></div>
            <div class="stat-div"></div>
            <div class="stat"><div class="stat-icon">🛡️</div><div><div class="stat-val">500+</div><div class="stat-label">Clientes satisfeitos</div></div></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Products -->
    <section id="produtos" class="section">
      <div class="container">
        <div class="section-title reveal">
          <div class="section-badge">📈 Em Alta</div>
          <h2>Nossos <span class="text-gradient">Produtos</span></h2>
          <p>Periféricos selecionados para elevar sua gameplay ao próximo nível</p>
        </div>
        <div class="products-grid">
          ${products.map((p, i) => `
            <div class="product-card reveal" style="transition-delay:${i * 100}ms" onclick="openProductModal(products[${i}])">
              <div class="product-img">
                <img src="${p.image}" alt="${p.name}" loading="lazy" width="800" height="800">
                ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ''}
                <div class="product-overlay"><span>Ver Detalhes</span></div>
              </div>
              <div class="product-info">
                <div class="stars">${starsHTML(p.rating)}<span class="count">(${p.reviews})</span></div>
                <h3>${p.name}</h3>
                <p class="desc">${p.description}</p>
                <div class="product-meta">
                  <span>👁️ ${p.viewers} vendo agora</span>
                  <span class="stock">⚠️ ${p.stock} em estoque</span>
                </div>
                <div class="product-bottom">
                  <div><span class="old-price">${p.oldPrice}</span><p class="price">${p.price}</p></div>
                  <span class="buy-badge">🛒 Comprar</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Offers -->
    <section id="ofertas" class="section section-alt">
      <div class="container">
        <div class="section-title reveal">
          <div class="section-badge" style="animation:glow-pulse 2s ease-in-out infinite">⚡ Ofertas Limitadas</div>
          <h2>Ofertas <span class="text-gradient">Imperdíveis</span></h2>
          <p>🕐 Promoção por tempo limitado — aproveite!</p>
        </div>
        <div class="offers-grid">
          ${offers.map((o, i) => `
            <div class="offer-card reveal" style="transition-delay:${i * 120}ms">
              <div class="offer-discount">-${o.discount}</div>
              <div class="offer-save">Economize ${o.save}</div>
              <div class="product-img"><img src="${o.image}" alt="${o.name}" loading="lazy" width="800" height="800"></div>
              <div class="offer-info">
                <h3>${o.name}</h3>
                <div class="offer-prices"><span class="from">${o.from}</span><span class="to">${o.to}</span></div>
                <div class="offer-btns">
                  <button class="btn-outline" onclick="openProductModal(products.find(p=>p.name==='${o.name}'))">👁️ Ver Detalhes</button>
                  <a href="${o.link}" target="_blank" rel="noopener noreferrer" class="btn-primary">Comprar →</a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Combos -->
    <section id="combos" class="section">
      <div class="container">
        <div class="section-title reveal">
          <div class="section-badge">📦 Combos Especiais</div>
          <h2>Kits <span class="text-gradient">Gamer</span></h2>
          <p>Monte seu setup completo e economize comprando em combo</p>
        </div>
        <div class="combos-grid">
          ${combos.map((c, i) => `
            <div class="combo-card reveal" style="transition-delay:${i * 150}ms">
              <div class="combo-img"><img src="${c.image}" alt="${c.name}" loading="lazy" width="800" height="600"></div>
              <div class="combo-save">✨ ${c.save}</div>
              <div class="combo-content">
                <h3>${c.name}</h3>
                <p class="combo-desc">${c.desc}</p>
                <div class="combo-bottom">
                  <div><span class="from">${c.from}</span><p class="to">${c.to}</p></div>
                  <div class="combo-btns">
                    <button class="btn-outline" onclick="event.stopPropagation();openComboModal(combos[${i}])">👁️ Detalhes</button>
                    <a href="${c.link}" target="_blank" rel="noopener noreferrer" class="btn-primary" onclick="event.stopPropagation()">Comprar →</a>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Benefits -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-title reveal">
          <h2>Por Que Escolher <span class="text-gradient">GGTECH</span>?</h2>
          <p>Compromisso com qualidade, segurança e a melhor experiência de compra</p>
        </div>
        <div class="benefits-grid">
          ${benefits.map((b, i) => `
            <div class="benefit-card reveal" style="transition-delay:${i * 80}ms">
              <div class="benefit-icon">${b.icon}</div>
              <h3>${b.title}</h3>
              <p>${b.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Social Proof -->
    <section class="section">
      <div class="container">
        <div class="section-title reveal">
          <h2>O que nossos <span class="text-gradient">clientes</span> dizem</h2>
          <p>Avaliações reais de quem já comprou na GGTECH</p>
        </div>
        <div class="reviews-grid">
          ${socialReviews.map((r, i) => `
            <div class="review-card reveal" style="transition-delay:${i * 60}ms">
              <div class="review-header">
                <div class="review-avatar">${r.avatar}</div>
                <div>
                  <p class="review-name">${r.name}</p>
                  <div class="review-verified">✅ Compra verificada</div>
                </div>
              </div>
              <div class="review-stars">${starsHTML(r.rating)}</div>
              <p class="review-text">"${r.text}"</p>
              <p class="review-product">${r.product}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer id="contato">
      <div class="container">
        <div class="footer-grid">
          <div>
            <img src="images/ggtech-logo.png" alt="GGTECH" class="footer-logo" loading="lazy">
            <p class="footer-desc">A GGTECH é referência em periféricos gamer e tecnologia. Produtos premium com preço justo, entrega em até 90 dias para todo o Brasil e reembolso em até 15 dias.</p>
            <div class="footer-badges">
              <div class="footer-badge"><span class="icon">🛡️</span> Compra Segura</div>
              <div class="footer-badge"><span class="icon">🕐</span> Reembolso 15 dias</div>
            </div>
            <div class="footer-socials">
              <a href="#">📸</a>
              <a href="#">💬</a>
              <a href="#">📧</a>
            </div>
          </div>
          <div>
            <h4>Links Rápidos</h4>
            <ul>
              <li><a href="#hero">Início</a></li>
              <li><a href="#produtos">Produtos</a></li>
              <li><a href="#ofertas">Ofertas</a></li>
              <li><a href="#combos">Combos</a></li>
              <li><a href="${STORE_URL}" target="_blank" rel="noopener noreferrer">Loja Online →</a></li>
            </ul>
          </div>
          <div>
            <h4>Atendimento</h4>
            <ul>
              <li><span>🕐 Segunda a Sexta: 9h - 18h</span></li>
              <li><span>🕐 Sábados: 9h - 13h</span></li>
              <li><a href="mailto:contato@ggtech.com.br">📧 contato@ggtech.com.br</a></li>
              <li><span>📍 Brasil — Entrega nacional</span></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2026 GGTECH. Todos os direitos reservados.</p>
          <div class="footer-payments"><span class="pix">Pix</span><span>•</span><span>Cartão de Crédito</span><span>•</span><span>Boleto</span></div>
        </div>
      </div>
    </footer>
  `;

  // Navbar scroll
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Hide mobile elements
const style = document.createElement('style');
style.textContent = '@media(max-width:639px){.hide-mobile{display:none!important}}';
document.head.appendChild(style);

render();

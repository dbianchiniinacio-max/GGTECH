// GGTECH - script.js

// Navbar scroll
window.addEventListener('scroll', function() {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile menu
function toggleMobileMenu() {
  var m = document.getElementById('mobile-menu');
  m.style.display = m.style.display === 'none' ? 'block' : 'none';
}
function closeMobileMenu() {
  document.getElementById('mobile-menu').style.display = 'none';
}

// Products data (embedded)
var products = [
  {name:"Fone Gamer M25",price:"R$ 69,00",oldPrice:"R$ 99,90",rating:5,reviews:47,stock:8,viewers:15,desc:"O Fone M25 possui baixa latência para jogos competitivos, som surround 7.1 e microfone com cancelamento de ruído.",specs:["Surround 7.1","Baixa Latência","Mic c/ Cancelamento","Até 6h de bateria"],link:"https://deflow.exchange/pay/ef094af0be50cda7",customerReviews:[{name:"Lucas",stars:5,text:"Muito bom para o preço, o som é limpo.",date:"02/04/2026"},{name:"Ana",stars:5,text:"Chegou rápido e a bateria dura muito.",date:"28/03/2026"},{name:"Rafael S.",stars:4,text:"Ótimo custo-benefício, recomendo!",date:"15/03/2026"}]},
  {name:"Fone Bluetooth i12 TWS",price:"R$ 35,00",oldPrice:"R$ 59,90",rating:4,reviews:83,stock:12,viewers:9,desc:"Fones compactos com conexão Bluetooth 5.0 estável.",specs:["Bluetooth 5.0","Auto Power-On","Até 4h de bateria","Case carregador incluso"],link:"https://deflow.exchange/pay/d3882585f2883052",customerReviews:[{name:"Carla",stars:4,text:"Simples e funcional.",date:"05/04/2026"},{name:"Pedro H.",stars:5,text:"Pareamento rápido e som limpo.",date:"01/04/2026"},{name:"Juliana F.",stars:4,text:"Muito bom, pelo preço vale muito.",date:"20/03/2026"}]},
  {name:"Teclado RGB Pro",price:"R$ 159,00",oldPrice:"R$ 219,90",rating:5,reviews:64,stock:10,viewers:18,desc:"Teclado mecânico com switches azuis, RGB customizável e anti-ghosting.",specs:["Switches Azuis","RGB Customizável","Anti-Ghosting","Layout ABNT2"],link:"https://deflow.exchange/pay/9cbb582f13915724",customerReviews:[{name:"Gamer99",stars:5,text:"Clique satisfatório e cores lindas!",date:"03/04/2026"},{name:"Carla B.",stars:5,text:"Ótima qualidade de construção.",date:"25/03/2026"},{name:"Diego M.",stars:4,text:"Bom teclado, excelente.",date:"18/03/2026"}]},
  {name:"Teclado Wireless",price:"R$ 219,00",oldPrice:"R$ 299,90",rating:5,reviews:31,stock:6,viewers:5,desc:"Teclado ultra fino com bateria recarregável e resposta instantânea.",specs:["Wireless 2.4GHz","Ultra Fino","Bateria Recarregável","Resposta Instantânea"],link:"https://deflow.exchange/pay/a68d25a13ae56484",customerReviews:[{name:"Roberto",stars:5,text:"Excelente para produtividade.",date:"08/04/2026"},{name:"Bianca T.",stars:5,text:"Lindo, combinou com meu setup.",date:"30/03/2026"},{name:"Gustavo N.",stars:5,text:"Wireless sem delay.",date:"22/03/2026"}]},
  {name:"Mouse Gamer Black",price:"R$ 99,00",oldPrice:"R$ 149,90",rating:4,reviews:56,stock:9,viewers:12,desc:"Mouse ergonômico com 7 botões programáveis e DPI até 7200.",specs:["Sensor 7200 DPI","7 Botões","Ergonômico","Cabo trançado 1.8m"],link:"https://deflow.exchange/pay/f72d5ac01b9e55ea",customerReviews:[{name:"Vitor",stars:4,text:"Peso ideal e pegada boa.",date:"06/04/2026"},{name:"Isabela R.",stars:5,text:"Ergonômico e bonito.",date:"29/03/2026"},{name:"André L.",stars:4,text:"Bom mouse, cabo de qualidade.",date:"21/03/2026"}]},
  {name:"Attack Shark X11",price:"R$ 149,00",oldPrice:"R$ 219,90",rating:5,reviews:38,stock:7,viewers:8,desc:"Mouse super leve (63g) com sensor PAW3311 de alta performance.",specs:["Sensor PAW3311","63g ultraleve","Tri-mode Wireless","Dock RGB incluso"],link:"https://deflow.exchange/pay/91a34b8a07b028ee",customerReviews:[{name:"Felipe",stars:5,text:"Incrível, muito leve. Mudou meu jogo.",date:"07/04/2026"},{name:"Larissa D.",stars:5,text:"Levíssimo e super preciso.",date:"31/03/2026"},{name:"Bruno P.",stars:5,text:"Nível de mouse caro por metade do preço.",date:"24/03/2026"}]}
];

var combos = [
  {name:"Kit Setup Completo",desc:"Teclado Wireless + Attack Shark X11 + Fone Gamer M25",from:"R$ 257,00",to:"R$ 229,90",save:"Economize R$ 27,10",link:"https://deflow.exchange/pt/pay/c54420ae8ab0f0ca"},
  {name:"Kit Precisão & Áudio",desc:"Attack Shark X11 + Fone Bluetooth i12 TWS",from:"R$ 124,00",to:"R$ 109,90",save:"Economize R$ 14,10",link:"https://deflow.exchange/pt/pay/1a339c9d046edd1b"}
];

// Stars HTML helper
function starsHTML(n) {
  var s = '';
  for (var i = 0; i < 5; i++) {
    s += '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="' + (i<n?'currentColor':'none') + '" stroke="currentColor" stroke-width="2" style="color:' + (i<n?'var(--primary)':'var(--muted-fg)') + '"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  }
  return s;
}

function generateOrderId() {
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var id = "GG-";
  for (var i = 0; i < 8; i++) id += chars.charAt(Math.floor(Math.random() * chars.length));
  return id;
}

// Format helpers
function formatCPF(v) {
  var d = v.replace(/\D/g,'').slice(0,11);
  if(d.length<=3)return d;if(d.length<=6)return d.slice(0,3)+'.'+d.slice(3);if(d.length<=9)return d.slice(0,3)+'.'+d.slice(3,6)+'.'+d.slice(6);return d.slice(0,3)+'.'+d.slice(3,6)+'.'+d.slice(6,9)+'-'+d.slice(9);
}
function formatPhone(v) {
  var d = v.replace(/\D/g,'').slice(0,11);
  if(d.length<=2)return d;if(d.length<=7)return'('+d.slice(0,2)+') '+d.slice(2);return'('+d.slice(0,2)+') '+d.slice(2,7)+'-'+d.slice(7);
}
function formatCEP(v) {
  var d = v.replace(/\D/g,'').slice(0,8);
  if(d.length<=5)return d;return d.slice(0,5)+'-'+d.slice(5);
}

// Get product image from DOM
function getProductImage(idx) {
  var cards = document.querySelectorAll('#produtos .card');
  if (cards[idx]) {
    var img = cards[idx].querySelector('img');
    return img ? img.src : '';
  }
  return '';
}

function getComboImage(idx) {
  var cards = document.querySelectorAll('#combos .card');
  if (cards[idx]) {
    var img = cards[idx].querySelector('img');
    return img ? img.src : '';
  }
  return '';
}

// Open product modal
function openProduct(idx) {
  var p = products[idx];
  var imgSrc = getProductImage(idx);
  var orderId = generateOrderId();
  var modal = document.getElementById('product-modal');
  var body = document.getElementById('modal-body');
  
  body.innerHTML = '<button onclick="closeModal()" style="position:absolute;top:1rem;right:1rem;z-index:10;border-radius:9999px;background:rgba(13,15,20,0.8);padding:0.5rem">' +
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>' +
    '<div id="modal-view">' + buildProductView(p, imgSrc, orderId, idx) + '</div>';
  
  modal.style.display = 'flex';
}

function buildProductView(p, imgSrc, orderId, idx) {
  var specs = p.specs.map(function(s){return '<span style="border-radius:0.5rem;background:rgba(30,34,46,0.5);border:1px solid var(--border);padding:0.25rem 0.625rem;font-size:0.75rem;color:var(--fg)">'+s+'</span>';}).join('');
  var reviews = p.customerReviews.map(function(r){return '<div style="border-radius:1rem;background:rgba(30,34,46,0.3);border:1px solid var(--border);padding:1rem"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem"><div style="display:flex;align-items:center;gap:0.5rem"><div style="width:2rem;height:2rem;border-radius:9999px;background:rgba(255,102,0,0.2);display:flex;align-items:center;justify-content:center;color:var(--primary);font-size:0.875rem;font-weight:700">'+r.name.charAt(0)+'</div><span style="font-weight:600;color:var(--fg);font-size:0.875rem">'+r.name+'</span><span style="font-size:0.75rem;color:#22c55e;display:flex;align-items:center;gap:0.125rem"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>Verificada</span></div><span style="font-size:0.75rem;color:var(--muted-fg)">'+r.date+'</span></div><div style="display:flex;gap:0.125rem;margin-bottom:0.5rem">'+starsHTML(r.stars)+'</div><p style="font-size:0.875rem;color:var(--muted-fg)">'+r.text+'</p></div>';}).join('');
  
  return '<div style="display:grid;grid-template-columns:1fr;gap:0" class="md-grid-2">' +
    '<div style="aspect-ratio:1;overflow:hidden;background:rgba(30,34,46,0.3)"><img src="'+imgSrc+'" alt="'+p.name+'" style="width:100%;height:100%;object-fit:cover"></div>' +
    '<div style="padding:1.5rem;display:flex;flex-direction:column">' +
    (p.rating?'<span style="align-self:flex-start;border-radius:9999px;background:linear-gradient(135deg,#ff6600,#cc4400);padding:0.25rem 0.75rem;font-size:0.75rem;font-weight:700;color:var(--primary-fg);margin-bottom:0.75rem">⭐ Popular</span>':'') +
    '<h3 style="font-size:1.5rem;font-weight:900;color:var(--fg);font-family:Orbitron,sans-serif">'+p.name+'</h3>' +
    '<div style="display:flex;align-items:center;gap:0.25rem;margin-top:0.5rem">'+starsHTML(p.rating)+'<span style="font-size:0.875rem;color:var(--muted-fg);margin-left:0.25rem">('+p.reviews+' avaliações)</span></div>' +
    '<p style="margin-top:1rem;font-size:0.875rem;color:var(--muted-fg);line-height:1.625">'+p.desc+'</p>' +
    '<div style="margin-top:1rem;display:flex;flex-wrap:wrap;gap:0.5rem">'+specs+'</div>' +
    '<div style="margin-top:1.5rem"><span style="font-size:0.875rem;color:var(--muted-fg);text-decoration:line-through">'+p.oldPrice+'</span><p style="font-size:1.875rem;font-weight:900;color:var(--primary)">'+p.price+'</p></div>' +
    '<div style="margin-top:0.5rem;display:flex;align-items:center;gap:1rem;font-size:0.75rem;color:var(--muted-fg)"><span>👀 '+p.viewers+' vendo agora</span><span style="color:var(--primary);font-weight:600">⚠️ '+p.stock+' em estoque</span></div>' +
    '<div style="margin-top:1rem;display:flex;align-items:center;gap:0.5rem;font-size:0.75rem;color:#22c55e;font-weight:600">🚚 Frete Grátis</div>' +
    '<button onclick="showCheckout('+idx+')" class="btn btn-primary" style="margin-top:1.5rem;width:100%;padding:0.875rem">🛒 Comprar Agora</button>' +
    '<div style="margin-top:0.75rem;display:flex;align-items:center;justify-content:center;gap:1rem;font-size:0.75rem;color:var(--muted-fg)"><span>🚚 Entrega em até 90 dias</span><span>🛡️ Reembolso em até 15 dias</span></div>' +
    '</div></div>' +
    '<div style="padding:1.5rem;border-top:1px solid var(--border)"><h4 style="display:flex;align-items:center;gap:0.5rem;font-size:1.125rem;font-weight:700;color:var(--fg);margin-bottom:1rem">💬 Avaliações dos Clientes</h4><div style="display:flex;flex-direction:column;gap:1rem">'+reviews+'</div></div>';
}

function showCheckout(idx) {
  var p = products[idx];
  var imgSrc = getProductImage(idx);
  var orderId = generateOrderId();
  var view = document.getElementById('modal-view');
  
  view.innerHTML = '<div style="padding:2rem">' +
    '<h3 style="font-size:1.5rem;font-weight:900;color:var(--fg);font-family:Orbitron,sans-serif;margin-bottom:1.5rem">Finalizar <span class="text-gradient">Pedido</span></h3>' +
    '<div style="border-radius:1rem;background:rgba(30,34,46,0.3);border:1px solid var(--border);padding:1.25rem;margin-bottom:1.5rem"><div style="display:flex;align-items:center;gap:1rem"><img src="'+imgSrc+'" alt="'+p.name+'" style="width:5rem;height:5rem;border-radius:0.5rem;object-fit:cover"><div style="flex:1"><h4 style="font-weight:700;color:var(--fg)">'+p.name+'</h4><p style="font-size:0.875rem;color:var(--muted-fg)">Quantidade: 1</p></div><p style="font-size:1.25rem;font-weight:900;color:var(--primary)">'+p.price+'</p></div></div>' +
    '<div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1.5rem">' +
    '<div style="display:flex;justify-content:space-between;font-size:0.875rem"><span style="color:var(--muted-fg)">ID do Pedido</span><span style="font-family:monospace;font-weight:700;color:var(--primary)">'+orderId+'</span></div>' +
    '<div style="display:flex;justify-content:space-between;font-size:0.875rem"><span style="color:var(--muted-fg)">Subtotal</span><span style="color:var(--fg)">'+p.price+'</span></div>' +
    '<div style="display:flex;justify-content:space-between;font-size:0.875rem"><span style="color:var(--muted-fg)">Frete</span><span style="color:#22c55e;font-weight:600">Grátis</span></div>' +
    '<div style="border-top:1px solid var(--border);padding-top:0.75rem;display:flex;justify-content:space-between"><span style="font-weight:700;color:var(--fg)">Total</span><span style="font-size:1.5rem;font-weight:900;color:var(--primary)">'+p.price+'</span></div>' +
    '</div>' +
    buildCheckoutForm(p.link, idx) +
    '</div>';
}

function buildCheckoutForm(paymentLink, backIdx) {
  return '<form onsubmit="return handleCheckout(event, \''+paymentLink+'\')" id="checkout-form">' +
    '<h4 style="font-size:1.125rem;font-weight:700;color:var(--fg);display:flex;align-items:center;gap:0.5rem;margin-bottom:0.75rem">📋 Dados para Entrega</h4>' +
    '<div style="display:flex;flex-direction:column;gap:1rem">' +
    '<div><div style="position:relative"><span style="position:absolute;left:0.75rem;top:50%;transform:translateY(-50%);color:var(--muted-fg)">👤</span><input type="text" placeholder="Nome Completo" class="form-input" id="f-nome" maxlength="100"></div><p class="form-error" id="e-nome" style="display:none;font-size:0.75rem;color:#ef4444;margin-top:0.25rem"></p></div>' +
    '<div><div style="position:relative"><span style="position:absolute;left:0.75rem;top:50%;transform:translateY(-50%);color:var(--muted-fg)">📄</span><input type="text" placeholder="CPF (000.000.000-00)" class="form-input" id="f-cpf" oninput="this.value=formatCPF(this.value)"></div><p class="form-error" id="e-cpf" style="display:none;font-size:0.75rem;color:#ef4444;margin-top:0.25rem"></p></div>' +
    '<div><div style="position:relative"><span style="position:absolute;left:0.75rem;top:50%;transform:translateY(-50%);color:var(--muted-fg)">📞</span><input type="text" placeholder="Telefone (00) 00000-0000" class="form-input" id="f-tel" oninput="this.value=formatPhone(this.value)"></div><p class="form-error" id="e-tel" style="display:none;font-size:0.75rem;color:#ef4444;margin-top:0.25rem"></p></div>' +
    '<div><div style="position:relative"><span style="position:absolute;left:0.75rem;top:50%;transform:translateY(-50%);color:var(--muted-fg)">📍</span><input type="text" placeholder="CEP (00000-000)" class="form-input" id="f-cep" oninput="this.value=formatCEP(this.value)"></div><p class="form-error" id="e-cep" style="display:none;font-size:0.75rem;color:#ef4444;margin-top:0.25rem"></p></div>' +
    '<div><div style="position:relative"><span style="position:absolute;left:0.75rem;top:50%;transform:translateY(-50%);color:var(--muted-fg)">🏠</span><input type="text" placeholder="Endereço completo (rua, número, bairro, cidade)" class="form-input" id="f-end" maxlength="200"></div><p class="form-error" id="e-end" style="display:none;font-size:0.75rem;color:#ef4444;margin-top:0.25rem"></p></div>' +
    '</div>' +
    '<button type="submit" class="btn btn-primary" style="width:100%;margin-top:1rem;padding:1rem">🛒 Ir para Pagamento</button>' +
    '<button type="button" onclick="openProduct('+backIdx+')" style="width:100%;text-align:center;font-size:0.875rem;color:var(--muted-fg);margin-top:0.5rem;padding:0.5rem">← Voltar</button>' +
    '</form>';
}

function handleCheckout(evt, link) {
  evt.preventDefault();
  var ok = true;
  var fields = [
    {id:'nome',min:3,msg:'Nome completo é obrigatório'},
    {id:'cpf',digits:11,msg:'CPF inválido'},
    {id:'tel',digits:10,msg:'Telefone inválido'},
    {id:'cep',digits:8,msg:'CEP inválido'},
    {id:'end',min:5,msg:'Endereço é obrigatório'}
  ];
  fields.forEach(function(f) {
    var inp = document.getElementById('f-'+f.id);
    var err = document.getElementById('e-'+f.id);
    var val = inp.value;
    var valid = true;
    if (f.digits) { valid = val.replace(/\D/g,'').length >= f.digits; }
    else if (f.min) { valid = val.trim().length >= f.min; }
    if (!valid) {
      err.textContent = f.msg; err.style.display = 'block'; inp.classList.add('error'); ok = false;
    } else {
      err.style.display = 'none'; inp.classList.remove('error');
    }
  });
  if (ok) window.open(link, '_blank', 'noopener,noreferrer');
  return false;
}

// Open product by name (for offers)
function openProductByName(name) {
  for (var i = 0; i < products.length; i++) {
    if (products[i].name === name) { openProduct(i); return; }
  }
}

// Open combo modal
function openCombo(idx) {
  var c = combos[idx];
  var imgSrc = getComboImage(idx);
  var modal = document.getElementById('product-modal');
  var body = document.getElementById('modal-body');
  
  body.innerHTML = '<button onclick="closeModal()" style="position:absolute;top:1rem;right:1rem;z-index:10;border-radius:9999px;background:rgba(13,15,20,0.8);padding:0.5rem">' +
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>' +
    '<div id="modal-view">' + buildComboView(c, imgSrc, idx) + '</div>';
  
  modal.style.display = 'flex';
}

function buildComboView(c, imgSrc, idx) {
  return '<div style="aspect-ratio:16/9;overflow:hidden;border-radius:1.25rem 1.25rem 0 0"><img src="'+imgSrc+'" alt="'+c.name+'" style="width:100%;height:100%;object-fit:cover"></div>' +
    '<div style="padding:1.5rem">' +
    '<h3 style="font-size:1.5rem;font-weight:900;color:var(--fg);font-family:Orbitron,sans-serif">'+c.name+'</h3>' +
    '<p style="margin-top:0.5rem;font-size:0.875rem;color:var(--muted-fg)">'+c.desc+'</p>' +
    '<div style="margin-top:1rem;border-radius:1rem;background:rgba(255,102,0,0.05);border:1px solid rgba(255,102,0,0.2);padding:1rem">' +
    '<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem"><span style="color:var(--primary)">✨</span><span style="font-size:0.875rem;font-weight:700;color:var(--primary)">'+c.save+'</span></div>' +
    '<div style="display:flex;align-items:flex-end;gap:0.75rem"><span style="font-size:0.875rem;color:var(--muted-fg);text-decoration:line-through">'+c.from+'</span><span style="font-size:1.875rem;font-weight:900;color:var(--primary)">'+c.to+'</span></div>' +
    '</div>' +
    '<div style="margin-top:1rem;display:flex;align-items:center;gap:0.5rem;font-size:0.75rem;color:var(--muted-fg)">🚚 Frete Grátis • 🛡️ Reembolso em até 15 dias</div>' +
    '<div id="combo-action-'+idx+'">' +
    '<button onclick="showComboCheckout('+idx+')" class="btn btn-primary" style="margin-top:1.5rem;width:100%;padding:0.875rem">🛒 Comprar Agora</button>' +
    '</div></div>';
}

function showComboCheckout(idx) {
  var c = combos[idx];
  var el = document.getElementById('combo-action-'+idx);
  el.innerHTML = buildComboCheckoutForm(c.link, idx);
}

function buildComboCheckoutForm(paymentLink, comboIdx) {
  return '<form onsubmit="return handleCheckout(event, \''+paymentLink+'\')" style="margin-top:1.5rem">' +
    '<h4 style="font-size:1.125rem;font-weight:700;color:var(--fg);display:flex;align-items:center;gap:0.5rem;margin-bottom:0.75rem">📋 Dados para Entrega</h4>' +
    '<div style="display:flex;flex-direction:column;gap:1rem">' +
    '<div><div style="position:relative"><span style="position:absolute;left:0.75rem;top:50%;transform:translateY(-50%);color:var(--muted-fg)">👤</span><input type="text" placeholder="Nome Completo" class="form-input" id="f-nome" maxlength="100"></div><p class="form-error" id="e-nome" style="display:none;font-size:0.75rem;color:#ef4444;margin-top:0.25rem"></p></div>' +
    '<div><div style="position:relative"><span style="position:absolute;left:0.75rem;top:50%;transform:translateY(-50%);color:var(--muted-fg)">📄</span><input type="text" placeholder="CPF (000.000.000-00)" class="form-input" id="f-cpf" oninput="this.value=formatCPF(this.value)"></div><p class="form-error" id="e-cpf" style="display:none;font-size:0.75rem;color:#ef4444;margin-top:0.25rem"></p></div>' +
    '<div><div style="position:relative"><span style="position:absolute;left:0.75rem;top:50%;transform:translateY(-50%);color:var(--muted-fg)">📞</span><input type="text" placeholder="Telefone (00) 00000-0000" class="form-input" id="f-tel" oninput="this.value=formatPhone(this.value)"></div><p class="form-error" id="e-tel" style="display:none;font-size:0.75rem;color:#ef4444;margin-top:0.25rem"></p></div>' +
    '<div><div style="position:relative"><span style="position:absolute;left:0.75rem;top:50%;transform:translateY(-50%);color:var(--muted-fg)">📍</span><input type="text" placeholder="CEP (00000-000)" class="form-input" id="f-cep" oninput="this.value=formatCEP(this.value)"></div><p class="form-error" id="e-cep" style="display:none;font-size:0.75rem;color:#ef4444;margin-top:0.25rem"></p></div>' +
    '<div><div style="position:relative"><span style="position:absolute;left:0.75rem;top:50%;transform:translateY(-50%);color:var(--muted-fg)">🏠</span><input type="text" placeholder="Endereço completo (rua, número, bairro, cidade)" class="form-input" id="f-end" maxlength="200"></div><p class="form-error" id="e-end" style="display:none;font-size:0.75rem;color:#ef4444;margin-top:0.25rem"></p></div>' +
    '</div>' +
    '<button type="submit" class="btn btn-primary" style="width:100%;margin-top:1rem;padding:1rem">🛒 Ir para Pagamento</button>' +
    '<button type="button" onclick="openCombo('+comboIdx+')" style="width:100%;text-align:center;font-size:0.875rem;color:var(--muted-fg);margin-top:0.5rem;padding:0.5rem">← Voltar</button>' +
    '</form>';
}

// Close modal
function closeModal() {
  document.getElementById('product-modal').style.display = 'none';
}

// Close on ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

// Live viewers update
setInterval(function() {
  products.forEach(function(p, i) {
    var el = document.getElementById('viewers-' + i);
    if (el) el.textContent = Math.max(3, p.viewers + Math.floor(Math.random() * 11) - 5);
  });
}, 3000);

/* ============ Vendas · PDV ============ */
(function(){
  const m0=v=>fmt.money(v);
  const CATALOG=[
    {n:'Ray-Ban Aviator',c:'Armação',p:890,ic:'glasses'},
    {n:'Oakley Holbrook',c:'Armação',p:990,ic:'glasses'},
    {n:'Chilli Beans Quadr.',c:'Armação',p:299,ic:'glasses'},
    {n:'Prada PR 17WS',c:'Armação',p:1890,ic:'glasses'},
    {n:'Lente Zeiss Blue',c:'Lente',p:1290,ic:'eye'},
    {n:'Varilux X Multif.',c:'Lente',p:1490,ic:'eye'},
    {n:'Hoya Filtro Azul',c:'Lente',p:690,ic:'eye'},
    {n:'Antirreflexo Cristal',c:'Tratamento',p:180,ic:'sparkles'},
    {n:'Acuvue Oasys cx',c:'Contato',p:180,ic:'droplet'},
    {n:'Kit Limpeza',c:'Acessório',p:39.9,ic:'box'},
    {n:'Estojo Rígido',c:'Acessório',p:24.9,ic:'box'},
    {n:'Cordão Esportivo',c:'Acessório',p:19.9,ic:'box'},
  ];
  let cart=[], desconto=0, cliente=null;

  function render(){
    cart=[]; desconto=0; cliente=null;
    const grid=CATALOG.map((p,i)=>`
      <div class="prod-card" onclick="PDV.add(${i})">
        <div class="ph">${icon(p.ic)}</div>
        <b>${p.n}</b><small>${p.c}</small><div class="pp">${m0(p.p)}</div></div>`).join('');
    return `<div class="page">
      ${pageHead('Vendas · PDV','Ponto de venda rápido — monte o pedido, receba e gere a ordem de serviço automaticamente.',{crumbs:['Operação'],actions:`
        <span class="badge success dot">Caixa aberto</span>
        <button class="btn ghost" onclick="App.go('financeiro')">${icon('wallet')}<span class="hide-sm">Caixa</span></button>`})}
      ${aiBanner({text:'Dica da IA: ofereça <b>tratamento antirreflexo</b> no fechamento — eleva o ticket médio em <b>18%</b> nas armações de grau.',cta:'',route:''})}
      <div class="pos">
        <div class="col">
          <div class="card pad reveal">
            <div class="input-ico">${icon('search')}<input class="input" placeholder="Buscar produto ou bipar código de barras..." style="padding-left:40px"></div>
            <div class="row gap-xs fw mt-2">${filterChips(['Todos','Armações','Lentes','Tratamentos','Contato','Acessórios'])}</div>
          </div>
          ${panel({title:'Catálogo rápido',sub:'Clique para adicionar ao pedido',icon:'grid',tone:'primary',body:`<div class="pos-grid">${grid}</div>`})}
        </div>
        <div class="col" style="position:sticky;top:88px">
          <div class="card reveal">
            <div class="card-head"><div class="card-title-ico"><div class="ci t-primary">${icon('shopping-cart')}</div><div><h3>Pedido atual</h3><div class="sub" id="pdv-count">0 itens</div></div></div>
              <button class="icon-btn" onclick="PDV.clear()">${icon('trash')}</button></div>
            <div class="card-body">
              <div class="row gap-xs mb-1">
                <button class="btn ghost sm f-1" onclick="PDV.pickClient()">${icon('user-plus')} <span id="pdv-cliente">Selecionar cliente</span></button>
              </div>
              <button class="btn ghost sm block mb-1" onclick="toast('Vincular médico (demo)','info')">${icon('stethoscope')} Vincular médico / receita</button>
              <div id="pdv-lines" style="min-height:80px"></div>
              <div class="hr mt-2"></div>
              <div id="pdv-totals"></div>
              <button class="btn primary block mt-2" onclick="PDV.checkout()" style="padding:13px">${icon('credit-card')} Receber pagamento</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  const PDV={
    add(i){ const p=CATALOG[i]; const ex=cart.find(x=>x.n===p.n); if(ex) ex.q++; else cart.push({...p,q:1}); this.draw(); toast(p.n+' adicionado','success'); },
    remove(idx){ cart.splice(idx,1); this.draw(); },
    inc(idx,d){ cart[idx].q+=d; if(cart[idx].q<=0) cart.splice(idx,1); this.draw(); },
    clear(){ cart=[]; desconto=0; cliente=null; document.getElementById('pdv-cliente').textContent='Selecionar cliente'; this.draw(); },
    pickClient(){ cliente=DATA.clientes[Math.floor(Math.random()*DATA.clientes.length)]; document.getElementById('pdv-cliente').textContent=cliente.nome.split(' ').slice(0,2).join(' '); toast('Cliente vinculado: '+cliente.nome,'info'); },
    draw(){
      const lines=document.getElementById('pdv-lines'); if(!lines) return;
      document.getElementById('pdv-count').textContent=cart.reduce((a,c)=>a+c.q,0)+' itens';
      if(!cart.length){ lines.innerHTML='<div class="empty" style="padding:24px 0">'+icon('shopping-bag')+'<div>Nenhum item ainda</div></div>'; }
      else lines.innerHTML=cart.map((c,i)=>`
        <div class="cart-line"><div class="av-circ av-sq t-primary" style="width:38px;height:38px;background:var(--primary-soft);color:var(--primary)">${icon(c.ic)}</div>
          <div class="grow"><b style="font-size:13px">${c.n}</b><div class="muted" style="font-size:11.5px">${m0(c.p)} un</div></div>
          <div class="row center gap-xs"><button class="icon-btn" style="width:26px;height:26px" onclick="PDV.inc(${i},-1)">${icon('minus')}</button>
          <b class="num" style="min-width:18px;text-align:center">${c.q}</b>
          <button class="icon-btn" style="width:26px;height:26px" onclick="PDV.inc(${i},1)">${icon('plus')}</button></div>
          <b class="num" style="min-width:66px;text-align:right">${m0(c.p*c.q)}</b></div>`).join('');
      const sub=cart.reduce((a,c)=>a+c.p*c.q,0);
      const desc=sub*desconto;
      const tot=sub-desc;
      document.getElementById('pdv-totals').innerHTML=`
        <div class="row between" style="font-size:13px;margin-bottom:6px"><span class="muted">Subtotal</span><b class="num">${m0(sub)}</b></div>
        <div class="row between" style="font-size:13px;margin-bottom:6px"><span class="muted">Desconto <button class="chip sm" style="padding:2px 8px;font-size:11px" onclick="PDV.disc()">${(desconto*100)||0}%</button></span><b class="num neg-txt">- ${m0(desc)}</b></div>
        <div class="row between center" style="margin-top:8px"><span style="font-weight:700">Total</span><span class="big-num" style="font-size:24px;color:var(--primary)">${m0(tot)}</span></div>`;
    },
    disc(){ const opts=[0,0.05,0.1,0.15]; desconto=opts[(opts.indexOf(desconto)+1)%opts.length]; this.draw(); },
    checkout(){
      if(!cart.length){ toast('Adicione itens ao pedido','warning'); return; }
      const sub=cart.reduce((a,c)=>a+c.p*c.q,0)*(1-desconto);
      openModal(`<div class="modal-head"><h3>Receber pagamento</h3><button class="icon-btn" onclick="closeModal()">${icon('x')}</button></div>
        <div class="card-body">
          <div class="card pad" style="background:var(--brand-grad);color:#fff;text-align:center;margin-bottom:16px">
            <div style="opacity:.85;font-size:12px">Total a receber</div>
            <div class="big-num" style="font-size:34px">${m0(sub)}</div>
            <div style="opacity:.85;font-size:12px">${cliente?cliente.nome:'Consumidor final'} · ${cart.length} itens</div></div>
          <div class="muted mb-1" style="font-size:12px;font-weight:700">Forma de pagamento</div>
          <div class="grid g-3" style="gap:10px">
            ${payBtn('PIX','zap','success')}${payBtn('Dinheiro','dollar-sign','success')}${payBtn('Crédito','credit-card','primary')}
            ${payBtn('Débito','credit-card','info')}${payBtn('Crediário','repeat','violet')}${payBtn('Boleto','file-text','warning')}
          </div>
          <div class="grid g-3 mt-3" style="gap:10px">
            <label class="chip" style="justify-content:center;cursor:pointer"><input type="checkbox" checked> Emitir cupom</label>
            <label class="chip" style="justify-content:center;cursor:pointer"><input type="checkbox" checked> Gerar OS</label>
            <label class="chip" style="justify-content:center;cursor:pointer"><input type="checkbox"> Nota fiscal</label>
          </div>
        </div>
        <div class="modal-head" style="border-top:1px solid var(--border);border-bottom:none;justify-content:flex-end;gap:10px">
          <button class="btn ghost" onclick="closeModal()">Cancelar</button>
          <button class="btn primary" onclick="PDV.finish()">${icon('check')} Finalizar venda</button></div>`,{lg:false});
    },
    finish(){ closeModal(); this.clear(); toast('Venda finalizada! OS #4822 gerada automaticamente.','success'); setTimeout(()=>App.go('os'),900); }
  };
  function payBtn(l,ic,tone){ return `<button class="btn ghost" style="flex-direction:column;height:74px;gap:6px" onclick="this.parentNode.querySelectorAll('.btn').forEach(x=>x.classList.remove('primary'));this.classList.add('primary')">${icon(ic)}<small>${l}</small></button>`; }

  App.register('vendas',{render, onMount(){ PDV.draw(); }});
  window.PDV=PDV;
})();

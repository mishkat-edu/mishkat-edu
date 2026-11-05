/* ===== about.js: أكاديمية مشكاة (كامل) ===== */

var MK={C1:'#0a7ba0',C2:'#0f9bbd',C3:'#0b8cae',GOLD1:'#ffc233',GOLD2:'#ff9f1c',GOLDINK:'#4a3000',GLOW:'rgba(6,120,150,.38)',DEEP:'#086a8c'};

/* ===== أدوات مساعدة ===== */
function $all(sel,root){return [].slice.call((root||document).querySelectorAll(sel));}
function normAr(s){return String(s||'').replace(/[\u064B-\u065F\u0670]/g,'').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/\s+/g,' ').trim();}
function ytIdOf(u){var m=(u||'').match(/(?:youtu\.be\/|[?&]v=)([A-Za-z0-9_-]{6,})/);return m?m[1]:'';}
function setLabel(el,text){
  if(!el) return;
  var tw=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null),first=true,t;
  while((t=tw.nextNode())){
    if(!t.nodeValue.trim()) continue;
    if(first){t.nodeValue=text;first=false;}else{t.nodeValue='';}
  }
}
function tagOf(card){var t=card.querySelector('.vtag');return t?t.textContent:'';}
var toastTm=null;
function say(msg){
  var t=document.getElementById('toast');
  if(!t) return;
  t.textContent=msg;t.classList.add('on');
  clearTimeout(toastTm);
  toastTm=setTimeout(function(){t.classList.remove('on');},2600);
}
function checkFiles(list,done){
  (function next(k){
    if(k>=list.length){done('');return;}
    fetch(list[k],{method:'HEAD',cache:'no-store'}).then(function(r){
      if(r.ok) done(list[k]); else next(k+1);
    }).catch(function(){next(k+1);});
  })(0);
}
function replaceCard(card,label,onclick){
  var n=card.cloneNode(true);
  n.removeAttribute('data-t');
  setLabel(n,label);
  n.addEventListener('click',onclick);
  card.replaceWith(n);
  return n;
}

/* ===== 0) توجيه الشعب والمواد ===== */
(function(){
  var br=localStorage.getItem('mishkat_branch')||'';
  var tp=new URLSearchParams(location.search).get('t');
  if(tp!=='math'&&tp!=='phys') tp=null;

  var subEl=document.querySelector('.wrap > .sub');
  if(tp&&document.querySelector('.b[data-b]')&&subEl){
    subEl.textContent='اختر شعبتك لمتابعة دروس '+(tp==='math'?'الرياضيات':'الفيزياء');
  }

  $all('.b[data-b]').forEach(function(el){
    el.onclick=function(){
      var b=el.dataset.b;
      localStorage.setItem('mishkat_branch',b);
      localStorage.removeItem('mishkat_chapter');
      if(!tp){location.href='subjects.html';return;}
      var s=(tp==='math')?'الرياضيات':((b==='تسيير واقتصاد')?'الاقتصاد':'الفيزياء');
      localStorage.setItem('mishkat_subject',s);
      if(s==='الرياضيات'&&b!=='تسيير واقتصاد'){location.href='math.html';}
      else if(s==='الرياضيات'){location.href='math.html';}
      else if(s==='الفيزياء'){location.href='physics.html';}
      else{location.href='section.html';}
    };
  });

  var phys=document.querySelector('.b[data-s="الفيزياء"]');
  if(phys&&br==='تسيير واقتصاد'){phys.dataset.s='الاقتصاد';phys.innerHTML='<span>📊</span>الاقتصاد';}

  if(phys&&(br==='علوم تجريبية'||br==='رياضيات')&&!document.querySelector('.b[data-s="العلوم"]')){
    var sc=document.createElement('button');
    sc.type='button';sc.className='b';sc.setAttribute('data-s','العلوم');
    sc.innerHTML='<span>🧬</span>العلوم';
    phys.after(sc);
  }

  var gridEl=document.querySelector('.wrap > .grid');
  if(phys&&gridEl&&!document.querySelector('.b[data-s="العلوم الإسلامية"]')){
    var bsList=$all('.b',gridEl);
    var isl=document.createElement('button');
    isl.type='button';isl.className='b';isl.setAttribute('data-s','العلوم الإسلامية');
    isl.innerHTML='<span>🕌</span>العلوم الإسلامية';
    if(bsList.length) bsList[bsList.length-1].after(isl);
    if((bsList.length+1)%2===1){
      isl.classList.add('solo');
      var sst=document.createElement('style');
      sst.textContent='@media (max-width:899px){.grid > .b.solo{grid-column:1/-1;justify-self:center;width:calc(50% - 8px)}}';
      document.head.appendChild(sst);
    }
  }

  $all('[data-s]').forEach(function(el){
    el.onclick=function(){
      var s=el.dataset.s;
      localStorage.setItem('mishkat_subject',s);
      localStorage.removeItem('mishkat_chapter');
      if(s==='الفيزياء'){location.href='physics.html';}
      else if(s==='العلوم'){location.href='science.html';}
      else if(s==='العلوم الإسلامية'){location.href='islamic.html';}
      else if(s==='الرياضيات'){location.href='math.html';}
      else{location.href='section.html';}
    };
  });
})();

/* ===== 1) الأسلوب العام: حواف زرقاء عادية بلا توهج ===== */
(function(){
  var st=document.createElement('style');
  st.textContent=''
  +'.b,.eng{border:2px solid #0a84ff!important;box-shadow:none!important;animation:none!important}'
  +'.b:hover,.b:focus-visible,.eng:hover{border-color:#0a84ff!important;box-shadow:0 8px 18px rgba(10,132,255,.25)!important}'
  +'.pi{display:inline-grid;place-items:center;width:52px;height:52px;border-radius:16px;background:linear-gradient(145deg,#4cc3ff,#0a84ff 55%,#1d57d6);box-shadow:0 8px 16px rgba(10,132,255,.25)}'
  +'.pi svg{width:30px;height:30px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}'
  +'.has-pi{height:auto!important;line-height:1!important;margin-bottom:10px!important}'
  +'.tpill{position:relative;overflow:hidden;display:block;margin:0 auto;max-width:560px;padding:20px 28px 18px;border-radius:46px;background:var(--card);border:3px solid #ff9f1c;box-shadow:0 14px 34px rgba(255,159,28,.28)}'
  +'.tpill>*{position:relative;z-index:1}'
  +'.tpill .logo{margin-bottom:4px}.tpill h1{margin-bottom:4px}.tpill .sub{margin-bottom:0}'
  +'body::before{content:"";position:fixed;top:50%;left:50%;width:min(86vmin,560px);aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:url(logo.jpg) center/cover no-repeat;opacity:.08;z-index:-1;pointer-events:none}'
  +':root[data-theme="dark"] body::before{opacity:.06}';
  document.head.appendChild(st);

  var w=document.querySelector('.wrap');
  if(w&&!w.querySelector('.tpill')){
    var kids=[].slice.call(w.children);
    var logo=kids.filter(function(c){return c.classList.contains('logo');})[0];
    var h=kids.filter(function(c){return c.tagName==='H1';})[0];
    var sub=kids.filter(function(c){return c.classList.contains('sub');})[0];
    if(h){
      var pill=document.createElement('div');
      pill.className='tpill';
      w.insertBefore(pill,logo||h);
      [logo,h,sub].forEach(function(el){if(el)pill.appendChild(el);});
    }
  }

  if(!document.querySelector('link[rel~="icon"]')){
    var l=document.createElement('link');
    l.rel='icon';l.href='logo.jpg';
    document.head.appendChild(l);
  }
})();

/* ===== 2) الأيقونات ===== */
(function(){
  var V='<svg viewBox="0 0 32 32" aria-hidden="true">';
  var ICONS={
    dna:V+'<path d="M10 3C10 10 22 10 22 16C22 22 10 22 10 29"/><path d="M22 3C22 10 10 10 10 16C10 22 22 22 22 29"/><path stroke-width="1.6" opacity=".85" d="M12 7H20M12 12.4H20M12 19.6H20M12 24.9H20"/></svg>',
    calc:V+'<rect x="7" y="3" width="18" height="26" rx="3.5"/><rect x="10" y="6.5" width="12" height="5" rx="1.2" fill="#fff" stroke="none"/><g fill="#fff" stroke="none"><circle cx="11" cy="16.5" r="1.4"/><circle cx="16" cy="16.5" r="1.4"/><circle cx="21" cy="16.5" r="1.4"/><circle cx="11" cy="21" r="1.4"/><circle cx="16" cy="21" r="1.4"/><circle cx="21" cy="21" r="1.4"/></g></svg>',
    gear:V+'<circle cx="16" cy="16" r="8" stroke-width="2.2"/><circle cx="16" cy="16" r="3" stroke-width="2"/><path stroke-width="3.2" d="M16 3.5V6.7M16 25.3V28.5M3.5 16H6.7M25.3 16H28.5M7.2 7.2L9.5 9.5M22.5 22.5L24.8 24.8M24.8 7.2L22.5 9.5M9.5 22.5L7.2 24.8"/></svg>',
    chart:V+'<g fill="#fff" stroke="none"><rect x="5" y="21" width="5" height="7" rx="1.2"/><rect x="13.5" y="17" width="5" height="11" rx="1.2"/><rect x="22" y="13" width="5" height="15" rx="1.2"/></g><path d="M5 15L12 10.5L17 12.5L26 4.5"/><path d="M21 4.5H26V9.5"/></svg>',
    pi:V+'<path stroke-width="2.4" d="M7 9.5H25M12.5 9.5C12.5 14.5 12 18.5 10 22.5M19.5 9.5V21C19.5 23 20.3 24 22.3 24"/></svg>',
    atom:V+'<circle cx="16" cy="16" r="2.6" fill="#fff" stroke="none"/><g stroke-width="1.8"><ellipse cx="16" cy="16" rx="13" ry="5.2"/><ellipse cx="16" cy="16" rx="13" ry="5.2" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="13" ry="5.2" transform="rotate(120 16 16)"/></g></svg>',
    hat:V+'<path d="M6 21A10 10 0 0 1 26 21"/><path stroke-width="1.8" d="M16 11V21M11 12.5V21M21 12.5V21"/><rect x="4" y="21" width="24" height="4.5" rx="2.2" fill="#fff" stroke="none"/></svg>',
    book:V+'<path d="M16 7C13 5 9 4.5 5 5V24C9 23.5 13 24 16 26"/><path d="M16 7C19 5 23 4.5 27 5V24C23 23.5 19 24 16 26"/><path d="M16 7V26"/></svg>',
    quran:V+'<path d="M16 15C13 13 9 12.5 5 13V26C9 25.5 13 26 16 28"/><path d="M16 15C19 13 23 12.5 27 13V26C23 25.5 19 26 16 28"/><path d="M16 15V28"/></svg>',
    pencil:V+'<path d="M5.5 26.5L7.5 20L22 5.5L26.5 10L12 24.5Z"/><path stroke-width="1.8" d="M18.5 9L23 13.5M7.5 20L12 24.5"/></svg>',
    check:V+'<circle cx="16" cy="16" r="11.5"/><path stroke-width="2.4" d="M10.5 16.5L14.5 20.5L21.5 12"/></svg>',
    scale:V+'<path d="M16 5V26M10 26H22M6 10H26"/><path stroke-width="1.8" d="M8 10L5 18M8 10L11 18M24 10L21 18M24 10L27 18"/><path stroke-width="1.8" d="M4 18A4 4 0 0 0 12 18ZM20 18A4 4 0 0 0 28 18Z"/></svg>'
  };
  function swap(sel,key){
    $all(sel).forEach(function(s){
      s.innerHTML='<i class="pi" style="font-style:normal">'+ICONS[key]+'</i>';
      s.classList.add('has-pi');
    });
  }
  swap('.b[data-b="علوم تجريبية"] > span','dna');
  swap('.b[data-b="رياضيات"] > span','calc');
  swap('.b[data-b="تقني رياضي"] > span','gear');
  swap('.b[data-b="تسيير واقتصاد"] > span','chart');
  swap('.b[data-s="الرياضيات"] > span','pi');
  swap('.b[data-s="الفيزياء"] > span','atom');
  swap('.b[data-s="العلوم"] > span','dna');
  swap('.b[data-s="العلوم الإسلامية"] > span','quran');
  swap('.b[data-s="الاقتصاد"] > span','chart');
  swap('.eng .ic','hat');
  swap('.b[data-t="sum"] > span','book');
  swap('.b[data-t="ex"] > span','pencil');
  swap('.b[data-t="cor"] > span','check');
  swap('.b[data-t="ser"] > span','scale');
})();

/* ===== 3) فتح الدرس والملخصات ===== */
(function(){
  $all('.b[data-c]').forEach(function(el){
    el.onclick=function(){
      localStorage.setItem('mishkat_chapter',el.dataset.c);
      location.href='lesson.html';
    };
  });
  var sj=localStorage.getItem('mishkat_subject')||'';
  var sum=document.querySelector('.b[data-t="sum"]');
  if(sum&&sj!=='الاقتصاد'){sum.onclick=function(){location.href='summaries.html';};}
})();

/* ===== 4) بطاقة الفيديوهات في صفحة الدرس ===== */
(function(){
  var grid=document.querySelector('.wrap > .grid');
  if(!grid||!grid.querySelector('.b[data-t]')||document.getElementById('vid-card')) return;
  var st=document.createElement('style');
  st.textContent=''
  +'.vc{direction:rtl;text-align:center;max-width:300px;margin:20px auto 0;padding:16px;border-radius:18px;color:#fff;position:relative;overflow:hidden;background:linear-gradient(135deg,'+MK.C1+','+MK.C2+');box-shadow:0 12px 28px '+MK.GLOW+'}'
  +'.vc-tag{display:inline-block;background:linear-gradient(135deg,'+MK.GOLD1+','+MK.GOLD2+');color:'+MK.GOLDINK+';padding:5px 14px;border-radius:999px;font-weight:800;font-size:13.5px}'
  +'.vc-num{font-size:36px;font-weight:800;line-height:1.1;margin:8px 0 0}'
  +'.vc-num small{font-size:14px;font-weight:700;opacity:.9;margin-right:6px}'
  +'.vc p{color:#fff;font-size:13px;line-height:1.6;margin:6px 0 12px}'
  +'.vc-go{display:inline-block;padding:8px 20px;border:0;border-radius:999px;background:#fff;color:'+MK.DEEP+';font:inherit;font-size:13.5px;font-weight:800;cursor:pointer}';
  document.head.appendChild(st);
  var d=document.createElement('div');
  d.id='vid-card';d.className='vc';
  d.innerHTML='<span class="vc-tag">🎥 الفيديوهات</span><div class="vc-num">24/7<small>متاحة</small></div><p>شاهد الدروس في أي وقت وأعد المشاهدة متى شئت.</p><button type="button" class="vc-go" id="vc-go">شاهد الآن ←</button>';
  grid.after(d);
  var MAP={'الرياضيات':'videos.html','الفيزياء':'physvideos.html','العلوم':'scivideos.html','العلوم الإسلامية':'islvideos.html'};
  document.getElementById('vc-go').onclick=function(){
    var sj=localStorage.getItem('mishkat_subject')||'';
    if(MAP[sj]){location.href=MAP[sj];return;}
    say('قسم «الفيديوهات» قيد الإعداد ✨');
  };
})();

/* ===== 5) بطاقة عن المنصة ===== */
(function(){
  var mock=document.querySelector('.wrap > .mock');
  if(!mock||document.getElementById('about-card')) return;
  var st=document.createElement('style');
  st.textContent=''
  +'.ab{direction:rtl;text-align:right;max-width:420px;margin:22px auto 0;padding:26px 22px;border-radius:22px;color:#fff;background:linear-gradient(120deg,'+MK.C1+','+MK.C2+','+MK.C3+');box-shadow:0 18px 40px '+MK.GLOW+'}'
  +'.ab-tag{display:inline-block;background:linear-gradient(135deg,'+MK.GOLD1+','+MK.GOLD2+');color:'+MK.GOLDINK+';padding:6px 16px;border-radius:999px;font-weight:800;font-size:14px}'
  +'.ab h2{font-size:22px;font-weight:800;margin:12px 0 14px}'
  +'.ab ul{list-style:none;padding:0;margin:0;display:grid;gap:12px}'
  +'.ab li{display:flex;gap:12px;font-size:15px;line-height:1.7}'
  +'.ab li i{flex:none;width:34px;height:34px;border-radius:10px;background:rgba(255,255,255,.25);display:grid;place-items:center;font-style:normal}';
  document.head.appendChild(st);
  var d=document.createElement('section');
  d.id='about-card';d.className='ab';
  d.innerHTML='<span class="ab-tag">✨ عن المنصة</span><h2>أكاديمية مشكاة</h2><ul>'
    +'<li><i>🎓</i><span>أكاديمية مشكاة منصة تعليمية عربية تساعدك على التفوق بخطوات واضحة ومنظمة.</span></li>'
    +'<li><i>📚</i><span>دروس مرتبة حسب شعبتك ومادتك، من الدرس الأول حتى يوم الامتحان.</span></li>'
    +'<li><i>🎥</i><span>شروحات مبسطة وفيديوهات تعيد مشاهدتها في أي وقت ومن أي جهاز.</span></li>'
    +'<li><i>💡</i><span>اسم «مشكاة» مأخوذ من المصباح الذي ينير الطريق.</span></li></ul>';
  mock.after(d);
})();

/* ===== 6) فتح فيديوهات يوتيوب داخل المنصة ===== */
(function(){
  if(/watch\.html$/.test(location.pathname)) return;
  document.addEventListener('click',function(e){
    if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey) return;
    var a=e.target.closest?e.target.closest('a[href]'):null;
    if(!a||a.hasAttribute('data-ext')) return;
    var id=ytIdOf(a.getAttribute('href')||'');
    if(!id) return;
    e.preventDefault();
    var label='';
    var card=a.closest('.vcard');
    if(card){
      label=tagOf(card).replace(/[←→]/g,'').trim();
      var part=a.textContent.replace(/[←→]/g,'').trim();
      if(part&&part!=='شاهد الآن') label+=' — '+part;
    }
    location.href='watch.html?v='+encodeURIComponent(id)+(label?'&t='+encodeURIComponent(label):'');
  });
})();

/* ===== 7) صفحة الدرس: التمارين، حقيبة عكاشة، السلاسل، والعلوم الإسلامية ===== */
(function(){
  if(!/lesson\.html$/.test(location.pathname)) return;
  var sj=localStorage.getItem('mishkat_subject')||'';
  var ch=localStorage.getItem('mishkat_chapter')||'';
  var br=localStorage.getItem('mishkat_branch')||'';
  var grid=document.querySelector('.wrap > .grid');
  if(!grid) return;
  var cards=$all('.b',grid);
  if(cards.length<4) return;

  /* العلوم الإسلامية: كتاب السلسلة الخضراء */
  if(sj==='العلوم الإسلامية'){
    replaceCard(cards[3],'كتاب السلسلة الخضراء',function(){
      checkFiles(['green.pdf'],function(f){
        if(!f){say('كتاب السلسلة الخضراء قيد الإعداد ✨');return;}
        location.href='pdfview.html?f=green.pdf&t='+encodeURIComponent('كتاب السلسلة الخضراء');
      });
    });
    return;
  }
  if(['الرياضيات','الفيزياء','العلوم'].indexOf(sj)<0) return;

  var SJ={'الرياضيات':'math','الفيزياء':'phys','العلوم':'sci'}[sj];
  var CODES={
    math:[['seq','المتتاليات'],['func','العدديه'],['exp','اسيه'],['ln','اللوغاريتميه'],['prob','الاحتمالات'],['complex','المركبه'],['div','القسمه'],['prim','الاصليه']],
    phys:[['ester','استره'],['time','الزمنيه'],['mech','الميكانيك'],['elec','كهرب'],['ph','توازن'],['nucl','النوويه'],['osc','اهتزاز']],
    sci:[['enz','التحفيز'],['photo','الضوئي'],['nerve','العصبي'],['imm','المناعه'],['struct','البنيه'],['prot','تركيب'],['resp','التنفس']]
  };
  var OK={
    sci:{prot:['Lg7awTpB74s'],struct:['hRmKwvYBK0o'],enz:['b-PzhqsxESo'],imm:['MCl6EpL0dWA'],nerve:['Jlho7146fJw'],photo:['sXE2BTy7tsY'],resp:['sXE2BTy7tsY']},
    math:{exp:['PrRJ68feZ_M','V7JrHtM2x8o','mLy_d2dGmo0'],ln:['MGvyXFfEKS0'],seq:['oemNJdoG3ws','uFDphwlVRRE'],prob:['QICDYpPeSjk'],complex:['a5U2BhobNf8','ga8egmIIht4'],div:['Hjz42I9Z7us','oP9Wif9e16Y'],prim:['PrRJ68feZ_M','V7JrHtM2x8o','mLy_d2dGmo0','MGvyXFfEKS0']},
    phys:{}
  };
  var nm=normAr(ch),code='',list=CODES[SJ];
  for(var i=0;i<list.length;i++){if(nm.indexOf(list[i][1])>-1){code=list[i][0];break;}}
  var ids=(OK[SJ]&&OK[SJ][code])||[];

  /* التمارين والتصحيح: تفتح صفحة التمارين */
  replaceCard(cards[1],'التمارين والتصحيح',function(){location.href='sciex.html';});

  /* حقيبة عكاشة بدل التصحيح */
  replaceCard(cards[2],'حقيبة عكاشة (فيديو)',function(){
    if(!ids.length){say('حقيبة عكاشة لدرس «'+ch+'» قيد الإعداد ✨');return;}
    location.href='watch.html?v='+encodeURIComponent(ids[0])
      +(ids.length>1?'&l='+encodeURIComponent(ids.join(',')):'')
      +'&t='+encodeURIComponent('حقيبة عكاشة — '+ch);
  });

  /* البطاقة الرابعة حسب المادة */
  if(SJ==='phys'){
    var BR={'علوم تجريبية':'se','رياضيات':'m','تقني رياضي':'tm','تسيير واقتصاد':'ge'}[br]||'';
    var cands=[];
    if(code){if(BR) cands.push('ser-'+BR+'-phys-'+code+'.pdf');cands.push('ser-phys-'+code+'.pdf');}
    if(BR) cands.push('ser-'+BR+'-phys.pdf');
    cands.push('ser-phys.pdf');
    replaceCard(cards[3],'سلاسل الميزان',function(){
      checkFiles(cands,function(f){
        if(!f){say('سلاسل الميزان لدرس «'+ch+'» قيد الإعداد ✨');return;}
        location.href='pdfview.html?f='+encodeURIComponent(f)+'&t='+encodeURIComponent('سلاسل الميزان — '+ch);
      });
    });
  }else{
    var lbl=(SJ==='math')?'مواضيع أشبال الأمة':'النصوص العلمية';
    replaceCard(cards[3],lbl,function(){say('«'+lbl+'» لدرس «'+ch+'» قيد الإعداد ✨');});
  }
})();

/* ===== 8) صفحة الملخصات ===== */
(function(){
  if(!/summaries\.html$/.test(location.pathname)) return;
  var sj=localStorage.getItem('mishkat_subject')||'';
  var ch=localStorage.getItem('mishkat_chapter')||'';
  var br=localStorage.getItem('mishkat_branch')||'';
  var vg=document.querySelector('.vgrid');
  if(!vg) return;
  var cards=$all('.vcard',vg);

  cards.forEach(function(card){
    if(tagOf(card).indexOf('ملخصات منصة مشكاة')>-1) setLabel(card.querySelector('.vword'),'ملخصاتنا (ملخصات أساتذة)');
  });

  function swapToPdf(card,files,title){
    var btn=card.querySelector('button.vgo');
    if(!btn) return;
    checkFiles(files,function(f){
      if(!f) return;
      var a=document.createElement('a');
      a.className='vgo';
      a.href='pdfview.html?f='+encodeURIComponent(f)+'&t='+encodeURIComponent(title);
      a.textContent='تصفّح الملخصات ←';
      btn.replaceWith(a);
    });
  }

  /* العلوم الإسلامية: الكتابان حسب الدرس، وبدون بطاقة المنصة */
  if(sj==='العلوم الإسلامية'){
    var LESSONS=['العقيدة الإسلامية وأثرها على الفرد والمجتمع','وسائل القرآن الكريم في تثبيت العقيدة الإسلامية','الإسلام والرسالات السماوية','العقل في القرآن الكريم','مقاصد الشريعة الإسلامية','منهج الإسلام في محاربة الانحراف والجريمة','المساواة أمام أحكام الشريعة الإسلامية','الصحة النفسية والجسمية في القرآن الكريم','من مصادر التشريع الإسلامي: الإجماع','من مصادر التشريع الإسلامي: القياس','من مصادر التشريع الإسلامي: المصالح المرسلة','القيم في القرآن الكريم','الوقف في الإسلام','من أحكام الأسرة في الإسلام: مدخل إلى علم الميراث','من أحكام الأسرة في الإسلام: الورثة وطرق ميراثهم','الربا وأحكامه','من المعاملات المالية الجائزة: الصرف - المرابحة - التقسيط','الحرية الشخصية','من أحكام الأسرة في الإسلام: النسب - التبني - الكفالة','العلاقات الاجتماعية بين المسلمين وغيرهم','خطبة حجة الوداع'];
    var idx=-1,nn=normAr(ch);
    for(var i=0;i<LESSONS.length;i++){if(normAr(LESSONS[i])===nn){idx=i;break;}}
    var num=idx>=0?('0'+(idx+1)).slice(-2):'';
    cards.forEach(function(card){
      var t=tagOf(card);
      if(t.indexOf('ملخصات منصة مشكاة')>-1){card.remove();return;}
      var book=null;
      if(t.indexOf('بوسعادي')>-1) book={pre:'bousaadi',all:'bousaadi.pdf',title:'كتاب الأستاذة بوسعادي'};
      else if(t.indexOf('شمس الدين')>-1) book={pre:'shams',all:'shams.pdf',title:'كتاب الأستاذ شمس الدين'};
      if(!book) return;
      var files=num?[book.pre+'-'+num+'.pdf',book.all]:[book.all];
      swapToPdf(card,files,book.title+' — '+ch);
    });
    return;
  }

  /* العلوم: ملخص كل درس */
  if(sj==='العلوم'){
    var MAP={};
    [['تركيب البروتين','protein.pdf'],['العلاقة بين البنية والوظيفة','bonia.pdf'],['دور البروتينات في التحفيز الإنزيمي','inzymes.pdf'],['المناعة','manaa.pdf'],['الاتصال العصبي','itisal.pdf'],['التركيب الضوئي','Photosynthèse.pdf'],['التنفس','La respiration.pdf']].forEach(function(p){MAP[normAr(p[0])]=p[1];});
    var file=MAP[normAr(ch)];
    if(file) cards.forEach(function(card){
      if(tagOf(card).indexOf('ملخصات منصة مشكاة')>-1) swapToPdf(card,[file],'ملخص '+ch);
    });
    return;
  }

  /* الرياضيات والفيزياء: ملخص الفصل من الملفات المرفوعة */
  var SUBJ={
    'الرياضيات':{p:'math',codes:[['seq','المتتاليات'],['func','العدديه'],['exp','اسيه'],['ln','اللوغاريتميه'],['prob','الاحتمالات'],['complex','المركبه'],['div','القسمه'],['prim','الاصليه']]},
    'الفيزياء':{p:'phys',codes:[['ester','استره'],['time','الزمنيه'],['mech','الميكانيك'],['elec','كهرب'],['ph','توازن'],['nucl','النوويه'],['osc','اهتزاز']]}
  }[sj];
  if(!SUBJ) return;
  var BRM={'علوم تجريبية':'se','رياضيات':'m','تقني رياضي':'tm','تسيير واقتصاد':'ge'}[br]||'';
  var code2='',nm2=normAr(ch);
  for(var j=0;j<SUBJ.codes.length;j++){if(nm2.indexOf(SUBJ.codes[j][1])>-1){code2=SUBJ.codes[j][0];break;}}
  if(!code2) return;
  var files2=[];
  if(sj==='الرياضيات'){
    if(BRM) files2.push('math-'+BRM+'-'+code2+'.pdf');
    ['ge','m','se','tm'].forEach(function(b){files2.push('math-'+b+'-'+code2+'.pdf');});
    files2.push('math-'+code2+'.pdf');
  }else{
    if(BRM) files2.push('phys-'+BRM+'-'+code2+'.pdf');
    files2.push('phys-'+code2+'.pdf');
  }
  cards.forEach(function(card){
    if(tagOf(card).indexOf('ملخصات منصة مشكاة')>-1) swapToPdf(card,files2,'ملخص '+ch);
  });
})();

/* ===== 9) صفحة التمارين (sciex.html) ===== */
(function(){
  if(!/sciex\.html$/.test(location.pathname)) return;
  var grid=document.getElementById('grid');
  if(!grid) return;
  var sj=localStorage.getItem('mishkat_subject')||'';
  var ch=localStorage.getItem('mishkat_chapter')||'';

  var exCard=null;
  $all('.vcard',grid).forEach(function(c){
    if(tagOf(c).indexOf('تمارين منصتنا')>-1){
      exCard=c;
      setLabel(c.querySelector('.vword'),'تماريننا (تمارين أساتذة)');
    }
  });

  /* بطاقة تمارين منصة همة */
  if(!grid.querySelector('[data-himma]')){
    var art=document.createElement('article');
    art.className='vcard';art.setAttribute('data-himma','1');
    art.innerHTML='<span class="vtag">🌟 تمارين منصة همة</span><div class="vico"><span style="font-size:26px;line-height:1">⭐</span></div><div class="vword">همة</div><p>تمارين منصة همة</p><div class="vact"><a class="vgo" href="https://himma-sigma.vercel.app/" target="_blank" rel="noopener">فتح الموقع ←</a></div>';
    grid.appendChild(art);
  }

  /* المواضيع كتبويبات داخل بطاقة تمارين منصتنا */
  if(!exCard) return;
  var box=exCard.querySelector('.vact');
  if(!box) return;
  var MAT={
    'العلوم':{p:'ex-sci',codes:[['enz','التحفيز'],['photo','الضوئي'],['nerve','العصبي'],['imm','المناعه'],['struct','البنيه'],['prot','تركيب'],['resp','التنفس']]},
    'الرياضيات':{p:'ex-math',codes:[['seq','المتتاليات'],['func','العدديه'],['exp','اسيه'],['ln','اللوغاريتميه'],['prob','الاحتمالات'],['complex','المركبه'],['div','القسمه'],['prim','الاصليه']]},
    'الفيزياء':{p:'ex-phys',codes:[['ester','استره'],['time','الزمنيه'],['mech','الميكانيك'],['elec','كهرب'],['ph','توازن'],['nucl','النوويه'],['osc','اهتزاز']]}
  };
  var M=MAT[sj];
  if(!M) return;
  var nm=normAr(ch),code='';
  for(var i=0;i<M.codes.length;i++){if(nm.indexOf(M.codes[i][1])>-1){code=M.codes[i][0];break;}}
  if(!code) return;

  box.innerHTML='';
  var wrap=document.createElement('div');
  wrap.style.cssText='display:flex;flex-direction:row;flex-wrap:nowrap;align-items:stretch;justify-content:center;gap:4px;width:100%;padding:4px;box-sizing:border-box;border-radius:999px;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.3);';
  box.appendChild(wrap);
  box.style.cssText='display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;';

  var ORD=['الأول','الثاني','الثالث','الرابع','الخامس','السادس'];
  var base=M.p+'-'+code;
  var names=[base+'.pdf',base+'-2.pdf',base+'-3.pdf',base+'-4.pdf',base+'-5.pdf',base+'-6.pdf'];
  var found=[];

  function tab(label,href,active){
    var el=document.createElement(href?'a':'span');
    if(href){el.href=href;}
    el.textContent=label;
    el.style.cssText='flex:1 1 0;min-width:0;display:block;text-align:center;padding:7px 4px;border-radius:999px;font-size:11.5px;font-weight:800;line-height:1.3;color:#fff;text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'
      +(active?'background:#1d4ed8;box-shadow:0 3px 8px rgba(0,30,90,.35);':'background:transparent;');
    return el;
  }
  function render(){
    wrap.innerHTML='';
    if(!found.length){wrap.appendChild(tab('قيد الإعداد',null,false));return;}
    found.forEach(function(file,k){
      wrap.appendChild(tab('الموضوع '+(ORD[k]||(k+1)),
        'pdfview.html?f='+encodeURIComponent(file)+'&t='+encodeURIComponent('تمارين '+ch+' — الموضوع '+(ORD[k]||(k+1))),
        k===0));
    });
  }
  (function check(k){
    if(k>=names.length){render();return;}
    fetch(names[k],{method:'HEAD',cache:'no-store'}).then(function(r){
      if(r.ok) found.push(names[k]);
      check(k+1);
    }).catch(function(){check(k+1);});
  })(0);
})();

/* ===== 10) الرياضيات: إخفاء بعض الفصول لشعبة تسيير واقتصاد ===== */
(function(){
  if(!/math\.html$/.test(location.pathname)) return;
  if((localStorage.getItem('mishkat_branch')||'')!=='تسيير واقتصاد') return;
  var grid=document.querySelector('.wrap > .grid');
  if(!grid) return;
  var HIDE=['الاحتماله','الاحتمالات','المركبه','الاعداد المركبه','الاصليه','الدوال الاصليه','القسمه'];
  $all('.b',grid).forEach(function(el){
    var name=normAr(el.getAttribute('data-c')||el.textContent);
    for(var i=0;i<HIDE.length;i++){if(name.indexOf(HIDE[i])>-1){el.remove();return;}}
  });
  var left=$all('.b',grid);
  if(left.length%2===1){
    left[left.length-1].classList.add('solo');
    var st=document.createElement('style');
    st.textContent='@media (max-width:899px){.grid > .b.solo{grid-column:1/-1;justify-self:center;width:calc(50% - 8px)}}';
    document.head.appendChild(st);
  }
})();

/* ===== 11) بطاقة BAC STORY في صفحتي الشعب والمواد ===== */
(function(){
  if(!/(branches|subjects)\.html$/.test(location.pathname)) return;
  var bar=document.querySelector('.wrap > .bar');
  if(!bar) return;
  $all('#bs2-card').forEach(function(o){o.remove();});
  var st=document.createElement('style');
  st.textContent=''
  +'.bs2{position:relative;max-width:420px;margin:18px auto 0;padding:16px 16px 22px;border-radius:16px;background:#fff;border:1.5px solid #d0d7e2;box-shadow:0 8px 20px rgba(16,24,40,.08);text-align:center;direction:rtl;overflow:hidden}'
  +'.bs2-note{font-size:13px;font-weight:700;line-height:1.7;color:#101828;margin:0}'
  +'.bs2-btn{display:inline-flex;align-items:center;gap:8px;margin-top:12px;padding:7px 16px 7px 7px;border-radius:999px;background:#0a84ff;color:#fff;font-size:13px;font-weight:800;text-decoration:none;box-shadow:0 6px 14px rgba(10,132,255,.3)}'
  +'.bs2-btn img{width:30px;height:30px;border-radius:8px;object-fit:cover;background:#fff}'
  +'.bs2-edge{position:absolute;left:0;right:0;bottom:0;height:20px;background:#0a84ff}'
  +'.bs2-logo{position:absolute;left:8px;bottom:6px;width:34px;height:34px;border-radius:9px;object-fit:cover;background:#fff;box-shadow:0 3px 8px rgba(0,0,0,.25);z-index:2}';
  document.head.appendChild(st);
  var card=document.createElement('div');
  card.id='bs2-card';card.className='bs2';
  card.innerHTML='<p class="bs2-note">🚨 ملاحظة: الشعب والمواد غير المتوفرة في منصتنا تجدونها في منصة BAC STORY</p>'
    +'<a class="bs2-btn" href="https://www.bac-story.com/" target="_blank" rel="noopener"><img src="bac-story.jpg" alt="" onerror="this.style.display=\'none\'">تصفّح BAC STORY ←</a>'
    +'<div class="bs2-edge"></div>'
    +'<img class="bs2-logo" src="bac-story.jpg" alt="BAC STORY" onerror="this.style.display=\'none\'">';
  bar.insertAdjacentElement('afterend',card);
})();
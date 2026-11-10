(function(){
  if(window.MK2) return;
  var p=function(n){return n<10?'0'+n:''+n;};
  var M=window.MK2={};

  M.user=function(){return localStorage.getItem('mishkat_user')||localStorage.getItem('mishkat_email')||localStorage.getItem('mishkat_name')||'guest';};
  M.key=function(n){return 'mk_'+String(M.user()).replace(/[^\w\u0600-\u06FF@.\-]/g,'_')+'_'+n;};
  M.get=function(n,d){try{var v=localStorage.getItem(M.key(n));return v?JSON.parse(v):d;}catch(e){return d;}};
  M.set=function(n,v){try{localStorage.setItem(M.key(n),JSON.stringify(v));return true;}catch(e){return false;}};
  M.today=function(d){d=d||new Date();return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate());};
  M.fmt=function(min){min=Math.round(min||0);var h=Math.floor(min/60),m=min%60;return h?(h+' س '+m+' د'):(m+' د');};
  M.uid=function(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6);};
  M.esc=function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};
  M.TOTAL=43;

  var ISL=['العقيدة الإسلامية وأثرها على الفرد والمجتمع','وسائل القرآن الكريم في تثبيت العقيدة الإسلامية','الإسلام والرسالات السماوية','العقل في القرآن الكريم','مقاصد الشريعة الإسلامية','منهج الإسلام في محاربة الانحراف والجريمة','المساواة أمام أحكام الشريعة الإسلامية','الصحة النفسية والجسمية في القرآن الكريم','من مصادر التشريع الإسلامي: الإجماع','من مصادر التشريع الإسلامي: القياس','من مصادر التشريع الإسلامي: المصالح المرسلة','القيم في القرآن الكريم','الوقف في الإسلام','من أحكام الأسرة في الإسلام: مدخل إلى علم الميراث','من أحكام الأسرة في الإسلام: الورثة وطرق ميراثهم','الربا وأحكامه','من المعاملات المالية الجائزة: الصرف - المرابحة - التقسيط','الحرية الشخصية','من أحكام الأسرة في الإسلام: النسب - التبني - الكفالة','العلاقات الاجتماعية بين المسلمين وغيرهم','خطبة حجة الوداع'];
  M.SUBJECTS=[
    {k:'math',n:'الرياضيات',u:['الدالة العددية','الدالة الأسية','الدالة اللوغاريتمية','المتتاليات','الاحتمالات','الأعداد المركبة','القسمة في Z','الدوال الأصلية والحساب التكاملي']},
    {k:'phys',n:'الفيزياء',u:['المتابعة الزمنية لتحول كيميائي','الميكانيك','الظواهر الكهربائية','التطور نحو حالة توازن','التحولات النووية','الاسترة والأعمدة','الاهتزازات']},
    {k:'sci',n:'العلوم الطبيعية',u:['تركيب البروتين','العلاقة بين البنية والوظيفة','دور البروتينات في التحفيز الإنزيمي','المناعة','الاتصال العصبي','التركيب الضوئي','التنفس']},
    {k:'isl',n:'العلوم الإسلامية',u:ISL},
    {k:'oth',n:'مادة أخرى',u:['عام']}
  ];

  /* تتبع تلقائي لما يفتحه الطالب (دروس، ملخصات، تمارين، فيديوهات) */
  (function(){
    var f=location.pathname.split('/').pop();
    var q=new URLSearchParams(location.search);
    var a=M.get('act',{lessons:{},sums:{},exs:{},vids:{}});
    a.lessons=a.lessons||{};a.sums=a.sums||{};a.exs=a.exs||{};a.vids=a.vids||{};
    var ch=localStorage.getItem('mishkat_chapter')||'', sj=localStorage.getItem('mishkat_subject')||'';
    var changed=false;
    if(f==='lesson.html'&&ch){a.lessons[sj+'|'+ch]=Date.now();changed=true;}
    else if(f==='pdfview.html'){
      var t=q.get('t')||'';
      if(/^(ملخص|ملخصات)/.test(t)){a.sums[t]=Date.now();changed=true;}
      else if(/^(تمارين|كتاب الأنشطة)/.test(t)){a.exs[t]=Date.now();changed=true;}
    }else if(f==='watch.html'){
      var v=q.get('v');
      if(v){a.vids[v]=Date.now();changed=true;}
    }
    if(changed) M.set('act',a);
  })();

  /* الوضع الليلي وزر الرجوع في صفحات الأدوات فقط */
  function ui(){
    if(!document.body||!document.body.getAttribute('data-mk')) return;
    var root=document.documentElement,m=document.getElementById('mode'),b=document.getElementById('backb');
    function paint(){if(m) m.textContent=root.getAttribute('data-theme')==='dark'?'☀️ الوضع النهاري':'🌙 الوضع الليلي';}
    paint();
    if(m) m.onclick=function(){
      var d=root.getAttribute('data-theme')==='dark';
      if(d){root.removeAttribute('data-theme');}else{root.setAttribute('data-theme','dark');}
      try{localStorage.setItem('mishkat_theme',d?'light':'dark');}catch(e){}
      paint();
    };
    if(b) b.onclick=function(e){e.preventDefault();if(history.length>1){history.back();}else{location.href='index.html';}};
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',ui);}else{ui();}
})();
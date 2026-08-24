/* AL-SHAMAA — Arabic conversion.
   The page is written in English. Pressing the language button converts every
   marked string to Arabic, flips the document to RTL, and remembers the
   choice. Nothing is translated twice: the English original is cached on the
   node the first time it is converted, and restored on the way back. */
(function () {
  'use strict';

  /* Arabic copy, keyed by the English it replaces.
     To edit a translation, change the value. To add a new string, wrap it in
     <span data-i18n> in the markup and add its English text as a key here. */
  var AR = {
    "Engineering Services": "الخدمات الهندسية",
    "About": "عن الشركة",
    "Services": "الخدمات",
    "Capabilities": "الإمكانات",
    "Process": "منهجية العمل",
    "Sectors": "القطاعات",
    "Request a quote": "اطلب عرض سعر",
    "Contact": "تواصل معنا",
    "AL-SHAMAA · ENGINEERING SERVICES AND CONSULTANCY": "الشمّاع · للخدمات والاستشارات الهندسية",
    "Reinforcement detailing · BIM · Structural design": "تفصيل حديد التسليح · نمذجة BIM · التصميم الإنشائي",
    "Precision": "الدقّة",
    "in every": "في كل",
    "single bar.": "قضيب تسليح.",
    "AL-Shamaa turns structural intent into buildable detail — accurate reinforcement shop drawings, coordinated BIM models and dependable design support, from straightforward elements to highly complex geometries.": "تحوّل الشمّاع النية الإنشائية إلى تفاصيل قابلة للتنفيذ — مخططات تنفيذية دقيقة لحديد التسليح، ونماذج BIM منسّقة، ودعم تصميمي موثوق، من العناصر البسيطة إلى الأشكال الهندسية الأشد تعقيداً.",
    "Start a project": "ابدأ مشروعك",
    "Explore services": "استعرض الخدمات",
    "Core service lines": "خطوط الخدمة الأساسية",
    "Drafting & BIM workflows": "أساليب الرسم والنمذجة",
    "Checked before issue": "مُراجَع قبل الإصدار",
    "Construction & Design": "الإنشاءات والتصميم",
    "Scroll": "مرّر",
    "Reinforcement Shop Drawings": "مخططات تنفيذية لحديد التسليح",
    "Bar Bending Schedules": "جداول ثني الحديد",
    "BIM Modelling": "نمذجة معلومات البناء",
    "Clash Detection": "كشف التعارضات",
    "Structural Analysis": "التحليل الإنشائي",
    "Solar Support Systems": "أنظمة دعم الألواح الشمسية",
    "2D Drafting": "الرسم ثنائي الأبعاد",
    "Complex Geometry": "الأشكال الهندسية المعقدة",
    "About the practice": "عن الشركة",
    "A dynamic engineering practice built around": "شركة هندسية ديناميكية قائمة على",
    "accuracy, coordination": "الدقّة والتنسيق",
    "and buildability.": "وقابلية التنفيذ.",
    "We specialise in reinforcement detailing, BIM modelling and structural design services. Our team delivers precise and dependable detailing for a wide range of structures — from straightforward elements to highly complex forms — using both advanced BIM platforms and conventional 2D drafting techniques, depending on what the project actually needs.": "نتخصّص في تفصيل حديد التسليح ونمذجة معلومات البناء وخدمات التصميم الإنشائي. يقدّم فريقنا تفصيلاً دقيقاً وموثوقاً لمجموعة واسعة من المنشآت — من العناصر البسيطة إلى الأشكال شديدة التعقيد — مستخدماً منصات BIM المتقدمة وأساليب الرسم ثنائي الأبعاد التقليدية، وفقاً لما يحتاجه المشروع فعلياً.",
    "Beyond detailing, we provide design services including structural analysis and the design of support systems for solar panels. The goal is always the same: add technical value, reduce on-site conflicts, and streamline construction through coordinated, buildable, cost-effective solutions.": "إلى جانب التفصيل، نقدّم خدمات تصميمية تشمل التحليل الإنشائي وتصميم أنظمة دعم الألواح الشمسية. والهدف واحد دائماً: إضافة قيمة فنية، وتقليل التعارضات في الموقع، وتبسيط التنفيذ عبر حلول منسّقة وقابلة للتنفيذ وفعّالة من حيث التكلفة.",
    "See how we work": "تعرّف على منهجيتنا",
    "Delivery methods": "أساليب التسليم",
    "Independently checked": "مراجعة مستقلة",
    " model : schedule": " نموذج : جدول",
    "Single source of truth": "مصدر واحد للبيانات",
    "Our vision —": "رؤيتنا —",
    "to revolutionise the construction industry by delivering precise, intelligent and integrated engineering solutions that drive efficiency, accuracy and sustainable growth.": "إحداث نقلة في قطاع الإنشاءات عبر تقديم حلول هندسية دقيقة وذكية ومتكاملة تدفع نحو الكفاءة والدقّة والنمو المستدام.",
    "What we deliver": "ما نقدّمه",
    "Three disciplines,": "ثلاثة تخصصات،",
    "one coordinated output.": "ومُخرَج واحد منسّق.",
    "Every deliverable is produced against the project's own standards and checked before it leaves the office — so what reaches site is clear, complete and ready to build.": "يُنتَج كل تسليم وفق معايير المشروع نفسه ويُراجَع قبل مغادرته المكتب — ليصل إلى الموقع واضحاً ومكتملاً وجاهزاً للتنفيذ.",
    "Shop Drawings": "المخططات التنفيذية",
    "Highly accurate reinforcement shop drawings tailored to each project — clear, fully dimensioned and detailed for the people placing the steel.": "مخططات تنفيذية عالية الدقّة لحديد التسليح مُعدّة لكل مشروع على حدة — واضحة، وكاملة الأبعاد، ومفصّلة لمن ينفّذ الحديد في الموقع.",
    "Reinforcement detailing for all structural elements": "تفصيل حديد التسليح لجميع العناصر الإنشائية",
    "Bar bending schedules and quantity take-off": "جداول ثني الحديد وحصر الكميات",
    "Simple structures through to complex geometries": "من المنشآت البسيطة إلى الأشكال المعقدة",
    "2D drafting where it suits the project best": "الرسم ثنائي الأبعاد حين يناسب المشروع",
    "BIM Services": "خدمات نمذجة معلومات البناء",
    "Advanced Building Information Modelling that carries real reinforcement geometry — so conflicts are resolved in the model, not on the slab.": "نمذجة متقدّمة لمعلومات البناء تحمل هندسة حديد التسليح الفعلية — لتُحَلّ التعارضات داخل النموذج لا على البلاطة.",
    "3D reinforcement modelling and rebar coordination": "نمذجة ثلاثية الأبعاد لحديد التسليح وتنسيقه",
    "Clash detection and constructability review": "كشف التعارضات ومراجعة قابلية التنفيذ",
    "Model-driven drawings and schedules": "مخططات وجداول مستخرجة من النموذج",
    "Complex geometry handled natively in 3D": "معالجة الأشكال المعقدة أصلاً في البيئة ثلاثية الأبعاد",
    "Design": "التصميم",
    "Comprehensive design services — structural analysis and the design of support systems for solar panels, grounded in practical engineering judgement.": "خدمات تصميمية شاملة — التحليل الإنشائي وتصميم أنظمة دعم الألواح الشمسية، بخبرة هندسية عملية.",
    "Structural analysis and member design": "التحليل الإنشائي وتصميم العناصر",
    "Solar panel support system design": "تصميم أنظمة دعم الألواح الشمسية",
    "Load path and connection checks": "فحص مسارات الأحمال والوصلات",
    "Cost-effective, buildable solutions": "حلول قابلة للتنفيذ وفعّالة من حيث التكلفة",
    "Why AL-Shamaa": "لماذا الشمّاع",
    "Technical value,": "قيمة فنية",
    "added early.": "تُضاف مبكراً.",
    "Detailing is where design meets reality. We use that position to remove ambiguity before it becomes a delay, a variation, or a crowded bar zone nobody can place.": "التفصيل هو نقطة التقاء التصميم بالواقع. نستثمر هذا الموقع لإزالة الغموض قبل أن يتحوّل إلى تأخير أو أمر تغييري أو منطقة حديد مزدحمة يتعذّر تنفيذها.",
    "Both worlds: advanced BIM and traditional 2D drafting — chosen per project, not per habit.": "العالمان معاً: نمذجة BIM متقدّمة ورسم ثنائي الأبعاد تقليدي — يُختار وفق المشروع لا وفق العادة.",
    "Some projects want a fully modelled rebar environment. Others need fast, clean 2D output against an established site workflow. We are fluent in both and pick the method that serves the programme.": "بعض المشاريع تتطلّب بيئة نمذجة كاملة لحديد التسليح، وأخرى تحتاج مخرجات ثنائية الأبعاد سريعة ونظيفة تتوافق مع سير عمل قائم في الموقع. نتقن الأسلوبين ونختار ما يخدم البرنامج الزمني.",
    "BIM platforms": "منصات BIM",
    "CAD drafting": "الرسم بالحاسب",
    "Coordinated set": "حزمة منسّقة",
    "Complex geometry, resolved": "أشكال معقدة… محلولة",
    "Curved walls, transfer structures, sloping slabs and congested nodes — detailed so the steel actually fits.": "جدران منحنية، ومنشآت تحويلية، وبلاطات مائلة، وعُقد مزدحمة — مفصّلة بحيث يمكن تركيب الحديد فعلياً.",
    "Fewer conflicts on site": "تعارضات أقل في الموقع",
    "Clashes and buildability issues are caught in the model and the check, before they cost programme time.": "تُلتقَط التعارضات ومشكلات قابلية التنفيذ داخل النموذج وأثناء المراجعة، قبل أن تكلّف وقتاً من البرنامج الزمني.",
    "Standards-aligned": "متوافق مع المعايير",
    "Deliverables align with your project requirements, client templates and industry standards.": "تتوافق المخرجات مع متطلبات مشروعك وقوالب العميل ومعايير القطاع.",
    "Sustainable by design": "استدامة بالتصميم",
    "Solar support structures and efficient steel arrangements that reduce waste and rework.": "منشآت دعم للطاقة الشمسية وترتيبات حديد فعّالة تقلّل الهدر وإعادة العمل.",
    "One point of contact": "نقطة تواصل واحدة",
    "A multidisciplinary team that stays with your project from first model to final issue.": "فريق متعدّد التخصصات يرافق مشروعك من النموذج الأول حتى الإصدار النهائي.",
    "How a package runs": "كيف تسير الحزمة",
    "From consultant": "من مخططات",
    "drawings to site.": "الاستشاري إلى الموقع.",
    "A predictable route through every reinforcement package, with the checking built in rather than bolted on at the end.": "مسار واضح لكل حزمة حديد تسليح، بمراجعة مدمجة في العملية لا مضافة في نهايتها.",
    "Brief & review": "الاستلام والمراجعة",
    "We review the consultant's drawings, specification and standards, agree the delivery method — BIM or 2D — and raise technical queries early.": "نراجع مخططات الاستشاري والمواصفات والمعايير، ونتفق على أسلوب التسليم — BIM أو ثنائي الأبعاد — ونرفع الاستفسارات الفنية مبكراً.",
    "Inputs locked": "اعتماد المدخلات",
    "Model or draft": "النمذجة أو الرسم",
    "Reinforcement is modelled in 3D or drafted in 2D against the agreed conventions, element by element, with schedules generated from the same source.": "يُنمذَج حديد التسليح ثلاثي الأبعاد أو يُرسم ثنائي الأبعاد وفق الأعراف المتفق عليها، عنصراً بعنصر، مع استخراج الجداول من المصدر نفسه.",
    "Coordinate & clash": "التنسيق وكشف التعارض",
    "Rebar is checked against embeds, openings, services and adjacent pours so congestion and clashes are resolved before issue.": "يُفحَص الحديد مقابل المدفونات والفتحات والخدمات والصبّات المجاورة لتُحَلّ الازدحامات والتعارضات قبل الإصدار.",
    "Buildability": "قابلية التنفيذ",
    "Check & issue": "المراجعة والإصدار",
    "An independent check covers geometry, laps, covers, bar marks and schedules. Nothing leaves the office unchecked.": "مراجعة مستقلة تغطّي الهندسة والتراكبات والأغطية وعلامات الأسياخ والجداول. لا شيء يغادر المكتب دون مراجعة.",
    "QA gate": "بوابة الجودة",
    "Site support": "الدعم الميداني",
    "We stay available through construction for RFIs, revisions and as-built updates — keeping the drawing set true to what is actually being built.": "نبقى متاحين طوال التنفيذ للاستفسارات الفنية والتعديلات وتحديثات «كما نُفِّذ» — لتبقى حزمة المخططات مطابقة لما يُبنى فعلاً.",
    "Through delivery": "طوال التنفيذ",
    "Where we work": "أين نعمل",
    "Any scale.": "أي حجم.",
    "Any complexity.": "أي تعقيد.",
    "Reinforcement detailing and design support across the structures that make up construction and design programmes.": "تفصيل حديد التسليح ودعم التصميم عبر المنشآت التي تتكوّن منها برامج الإنشاء والتصميم.",
    "Residential & mixed use": "السكني ومتعدّد الاستخدامات",
    "Cores, slabs, shear walls and podium transfers.": "أنوية وبلاطات وجدران قص ومنشآت تحويلية.",
    "Commercial": "التجاري",
    "Frames, basements and long-span floor systems.": "هياكل وبدرومات وأنظمة أسقف كبيرة البحور.",
    "Infrastructure": "البنية التحتية",
    "Retaining walls, culverts, abutments and decks.": "جدران استنادية وعبّارات وركائز وأسطح جسور.",
    "Industrial": "الصناعي",
    "Foundations, pits, machine bases and plant structures.": "أساسات وحُفَر وقواعد معدات ومنشآت مصانع.",
    "Solar & renewables": "الطاقة الشمسية والمتجدّدة",
    "Panel support systems, ballast and pile foundations.": "أنظمة دعم الألواح وقواعد الأثقال والخوازيق.",
    "Complex geometry": "الأشكال المعقدة",
    "Curved, sloping and irregular forms modelled in 3D.": "أشكال منحنية ومائلة وغير منتظمة مُنمذَجة ثلاثياً.",
    "Delivered against your project's standards and templates": "تُسلَّم وفق معايير مشروعك وقوالبه",
    "Reinforcement detailing": "تفصيل حديد التسليح",
    "Bar bending schedules": "جداول ثني الحديد",
    "3D rebar models": "نماذج حديد ثلاثية الأبعاد",
    "Clash reports": "تقارير التعارضات",
    "Structural analysis": "التحليل الإنشائي",
    "Solar support design": "تصميم دعامات الطاقة الشمسية",
    "As-built updates": "تحديثات «كما نُفِّذ»",
    "RFI support": "دعم الاستفسارات الفنية",
    "Start a conversation": "لنبدأ الحديث",
    "Send us the drawings.": "أرسل لنا المخططات.",
    "We'll tell you what it takes.": "وسنخبرك بما يتطلّبه الأمر.",
    "Share a specification, a set of consultant drawings or just a scope outline. We'll come back with the delivery method, programme and a clear price for the package.": "شاركنا مواصفة أو حزمة مخططات استشاري أو حتى وصفاً مبدئياً للنطاق. سنعود إليك بأسلوب التسليم والبرنامج الزمني وسعر واضح للحزمة.",
    "Email the team": "راسل الفريق",
    "Review services": "استعرض الخدمات",
    "Company": "الشركة",
    "AL-Shamaa Engineering Services and Consultancy": "الشمّاع للخدمات والاستشارات الهندسية",
    "Industry": "القطاع",
    "Shop Drawings · BIM · Design": "المخططات التنفيذية · BIM · التصميم",
    "Email": "البريد الإلكتروني",
    "Engineering Services and Consultancy": "للخدمات والاستشارات الهندسية",
    "Precise, intelligent and integrated engineering solutions — reinforcement detailing, BIM expertise and design services for the construction industry.": "حلول هندسية دقيقة وذكية ومتكاملة — تفصيل حديد التسليح، وخبرة BIM، وخدمات التصميم لقطاع الإنشاءات.",
    "AL-SHAMAA ENGINEERING SERVICES AND CONSULTANCY": "الشمّاع للخدمات والاستشارات الهندسية",
    "PRECISION · COORDINATION · BUILDABILITY": "الدقّة · التنسيق · قابلية التنفيذ",
    "WhatsApp": "واتساب",
    "DESIGNED AND DEVELOPED BY": "تصميم وتطوير"
  };

  /* strings that live in attributes rather than text nodes */
  var META = {
    title: '\u0627\u0644\u0634\u0645\u0651\u0627\u0639 \u0644\u0644\u062e\u062f\u0645\u0627\u062a \u0648\u0627\u0644\u0627\u0633\u062a\u0634\u0627\u0631\u0627\u062a \u0627\u0644\u0647\u0646\u062f\u0633\u064a\u0629 \u2014 \u062a\u0641\u0635\u064a\u0644 \u062d\u062f\u064a\u062f \u0627\u0644\u062a\u0633\u0644\u064a\u062d \u0648\u0646\u0645\u0630\u062c\u0629 BIM \u0648\u0627\u0644\u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0625\u0646\u0634\u0627\u0626\u064a',
    home:  '\u0627\u0644\u0634\u0645\u0651\u0627\u0639 \u2014 \u0627\u0644\u0635\u0641\u062d\u0629 \u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629',
    nav:   '\u0627\u0644\u062a\u0646\u0642\u0644 \u0627\u0644\u0631\u0626\u064a\u0633\u064a',
    desc:  '\u062a\u0642\u062f\u0651\u0645 \u0627\u0644\u0634\u0645\u0651\u0627\u0639 \u0645\u062e\u0637\u0637\u0627\u062a \u062a\u0646\u0641\u064a\u0630\u064a\u0629 \u0639\u0627\u0644\u064a\u0629 \u0627\u0644\u062f\u0642\u0651\u0629 \u0644\u062d\u062f\u064a\u062f \u0627\u0644\u062a\u0633\u0644\u064a\u062d\u060c \u0648\u0646\u0645\u0630\u062c\u0629 \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0628\u0646\u0627\u0621\u060c \u0648\u0627\u0644\u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0625\u0646\u0634\u0627\u0626\u064a \u2014 \u0645\u0646 \u0627\u0644\u0645\u0646\u0634\u0622\u062a \u0627\u0644\u0628\u0633\u064a\u0637\u0629 \u0625\u0644\u0649 \u0627\u0644\u0623\u0634\u0643\u0627\u0644 \u0627\u0644\u0645\u0639\u0642\u062f\u0629. \u062a\u0641\u0635\u064a\u0644 \u062f\u0642\u064a\u0642 \u064a\u0642\u0644\u0651\u0644 \u0627\u0644\u062a\u0639\u0627\u0631\u0636\u0627\u062a \u0641\u064a \u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u064a\u062d\u0627\u0641\u0638 \u0639\u0644\u0649 \u0627\u0646\u062a\u0638\u0627\u0645 \u0627\u0644\u062a\u0646\u0641\u064a\u0630.',
    /* the button offers the language you are not currently in */
    toLabel: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629',
    toAria:  '\u0639\u0631\u0636 \u0627\u0644\u0645\u0648\u0642\u0639 \u0628\u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629',
    backLabel: 'English',
    backAria:  'View the site in English'
  };

  var STORE = 'alshamaa-lang';
  var root  = document.documentElement;
  var EN_TITLE = document.title;
  var EN_DESC  = attr('meta[name="description"]', 'content');
  var AR_DESC  = META.desc;

  function attr(sel, name) {
    var el = document.querySelector(sel);
    return el ? el.getAttribute(name) : '';
  }

  function convert(lang) {
    var toArabic = lang === 'ar';

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      if (el.dataset.en === undefined) el.dataset.en = el.textContent;
      if (!toArabic) { el.textContent = el.dataset.en; return; }
      /* exact first — some strings carry meaningful nbsp padding that
         trim() would strip */
      var raw = el.dataset.en;
      var ar  = AR[raw] || AR[raw.trim()];
      if (ar) el.textContent = ar;      // no match: leave the English in place
    });

    root.setAttribute('lang', lang);
    root.setAttribute('dir', toArabic ? 'rtl' : 'ltr');

    document.title = toArabic ? META.title : EN_TITLE;
    var d = document.querySelector('meta[name="description"]');
    if (d) d.setAttribute('content', toArabic ? AR_DESC : EN_DESC);

    var brand = document.querySelector('.brand');
    if (brand) brand.setAttribute('aria-label', toArabic ? META.home : 'AL-Shamaa \u2014 home');
    var nav = document.getElementById('nav');
    if (nav) nav.setAttribute('aria-label', toArabic ? META.nav : 'Primary');

    document.querySelectorAll('[data-langbtn]').forEach(function (b) {
      var label = b.querySelector('.langbtn__label');
      if (label) label.textContent = toArabic ? META.backLabel : META.toLabel;
      if (label) label.setAttribute('lang', toArabic ? 'en' : 'ar');
      b.setAttribute('aria-label', toArabic ? META.backAria : META.toAria);
    });

    try { localStorage.setItem(STORE, lang); } catch (e) {}
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  function set(lang, animate) {
    if (lang === root.getAttribute('lang')) return;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!animate || reduced) { convert(lang); return; }
    document.body.classList.add('i18n-swapping');
    setTimeout(function () {
      convert(lang);
      requestAnimationFrame(function () { document.body.classList.remove('i18n-swapping'); });
    }, 160);
  }

  var saved;
  try { saved = localStorage.getItem(STORE); } catch (e) {}
  if (saved === 'ar') convert('ar');

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-langbtn]');
    if (!btn) return;
    e.preventDefault();
    set(root.getAttribute('lang') === 'ar' ? 'en' : 'ar', true);
  });

  window.AlShamaaLang = { current: function () { return root.getAttribute('lang'); }, set: set };
})();

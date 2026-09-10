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
    "Skip to content": "تخطي إلى المحتوى",
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
    "AL-Shamaa turns structural designs into drawings a site crew can build from: reinforcement shop drawings, coordinated BIM models and design support, for plain footings and raked columns alike.": "تحوّل الشمّاع التصاميم الإنشائية إلى مخططات يبني منها فريق الموقع مباشرة: مخططات تنفيذية لحديد التسليح، ونماذج BIM منسّقة، ودعم تصميمي، للقواعد البسيطة والأعمدة المائلة على حدّ سواء.",
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
    "An engineering practice that checks": "شركة هندسية تتحقّق",
    "whether the steel fits": "من أن الحديد يركب في مكانه",
    "before the site has to.": "قبل أن يضطر الموقع إلى ذلك.",
    "We do reinforcement detailing, BIM modelling and structural design. The detailing covers plain slabs and footings as well as curved walls and raked columns. Some packages we model fully in 3D and some we draft in 2D, depending on what the project and the site team need.": "نعمل في تفصيل حديد التسليح ونمذجة معلومات البناء والتصميم الإنشائي. يشمل التفصيل البلاطات والقواعد البسيطة كما يشمل الجدران المنحنية والأعمدة المائلة. بعض الحزم ننمذجها ثلاثياً بالكامل، وبعضها نرسمه ثنائياً، بحسب ما يحتاجه المشروع وفريق الموقع.",
    "We also do design work: structural analysis, and support structures for solar panels. In both kinds of work the aim is to find clashes and buildability problems on the drawing, where they are cheap to fix, and not on site, where they hold up a pour.": "ونعمل كذلك في التصميم: التحليل الإنشائي، وهياكل حمل الألواح الشمسية. والهدف في الحالتين أن نكتشف التعارضات ومشكلات قابلية التنفيذ على المخطط، حيث يكون إصلاحها رخيصاً، لا في الموقع حيث تؤخّر الصبّ.",
    "See how we work": "تعرّف على منهجيتنا",
    "Delivery methods": "أساليب التسليم",
    "Independently checked": "مراجعة مستقلة",
    " model : schedule": " نموذج : جدول",
    "Single source of truth": "مصدر واحد للبيانات",
    "Our vision:": "رؤيتنا:",
    "a construction industry where the drawings are right the first time, and no site stops work because a bar doesn't fit.": "قطاع إنشاءات تكون فيه المخططات صحيحة من المرة الأولى، ولا يتوقّف فيه أي موقع لأن سيخاً لا يركب في مكانه.",
    "What we deliver": "ما نقدّمه",
    "Three disciplines,": "ثلاثة تخصصات،",
    "one set of drawings.": "وحزمة مخططات واحدة.",
    "Every drawing follows the project's own standards and is checked before it leaves the office, so nobody on site has to ring us to ask what it means.": "يُعَدّ كل مخطط وفق معايير المشروع نفسه ويُراجَع قبل أن يغادر المكتب، فلا يضطر أحد في الموقع إلى الاتصال بنا ليسأل عن المقصود.",
    "Shop Drawings": "المخططات التنفيذية",
    "Reinforcement shop drawings prepared for each project, fully dimensioned and drawn with the steel fixers in mind.": "مخططات تنفيذية لحديد التسليح تُعَدّ لكل مشروع على حدة، كاملة الأبعاد، ومرسومة بما يناسب عمّال تركيب الحديد.",
    "Reinforcement detailing for all structural elements": "تفصيل حديد التسليح لجميع العناصر الإنشائية",
    "Bar bending schedules and quantity take-off": "جداول ثني الحديد وحصر الكميات",
    "Simple structures through to complex geometries": "من المنشآت البسيطة إلى الأشكال المعقدة",
    "2D drafting where it suits the project best": "الرسم ثنائي الأبعاد حين يناسب المشروع",
    "BIM Services": "خدمات نمذجة معلومات البناء",
    "Building Information Models built to real construction geometry, so clashes get sorted out in the model and not on the slab.": "نماذج معلومات بناء مبنية على الهندسة الفعلية للتنفيذ، لتُحَلّ التعارضات داخل النموذج لا على البلاطة.",
    "3D modelling and shop drawings": "النمذجة ثلاثية الأبعاد والمخططات التنفيذية",
    "Clash detection and multidisciplinary coordination": "كشف التعارضات والتنسيق بين التخصصات",
    "BIM management and standards consulting": "إدارة BIM والاستشارات في المعايير",
    "As-built modelling": "نمذجة «كما نُفِّذ»",
    "Design": "التصميم",
    "Analysis and design for structures and solar panel supports, sized for the loads they will see and the way a contractor will build them.": "تحليل وتصميم للمنشآت ولهياكل حمل الألواح الشمسية، بمقاطع محسوبة للأحمال التي ستتعرّض لها فعلاً وللطريقة التي سينفّذها بها المقاول.",
    "Structural analysis and member design": "التحليل الإنشائي وتصميم العناصر",
    "Solar panel support system design": "تصميم أنظمة دعم الألواح الشمسية",
    "Load path and connection checks": "فحص مسارات الأحمال والوصلات",
    "Economical sections that are easy to build": "مقاطع اقتصادية وسهلة التنفيذ",
    "Why AL-Shamaa": "لماذا الشمّاع",
    "Problems solved": "مشكلات تُحَلّ",
    "before the pour.": "قبل الصبّ.",
    "Detailing is the point where someone has to decide exactly where every bar goes. We use it to settle the vague parts of the design before they turn into a delay, a variation, or a crowded bar zone nobody can place.": "التفصيل هو المرحلة التي يجب فيها تحديد موضع كل سيخ بدقّة. نستغلّها لحسم ما هو غامض في التصميم قبل أن يتحوّل إلى تأخير أو أمر تغييري أو منطقة حديد مزدحمة يتعذّر تنفيذها.",
    "We model in 3D or draft in 2D, and the project decides which.": "ننمذج ثلاثياً أو نرسم ثنائياً، والمشروع هو من يحدّد.",
    "Some projects want every bar modelled in 3D. Others need quick, clean 2D sheets that fit the way the site already works. We do both, and we pick whichever keeps the programme on track.": "بعض المشاريع تحتاج نمذجة كل سيخ ثلاثياً، وأخرى تحتاج لوحات ثنائية الأبعاد سريعة ونظيفة تناسب طريقة عمل الموقع القائمة. نعمل بالأسلوبين، ونختار ما يحافظ على البرنامج الزمني.",
    "BIM platforms": "منصات BIM",
    "CAD drafting": "الرسم بالحاسب",
    "Coordinated set": "حزمة منسّقة",
    "Complex geometry, resolved": "أشكال معقدة… محلولة",
    "Curved walls, transfer structures, sloping slabs and congested nodes, all detailed so the steel fits.": "جدران منحنية ومنشآت تحويلية وبلاطات مائلة وعُقد مزدحمة، كلّها مفصّلة بحيث يركب الحديد في مكانه.",
    "Fewer conflicts on site": "تعارضات أقل في الموقع",
    "We catch clashes and buildability problems in the model or at the check, before they cost programme time.": "نلتقط التعارضات ومشكلات قابلية التنفيذ داخل النموذج أو أثناء المراجعة، قبل أن تكلّف وقتاً من البرنامج الزمني.",
    "Your standards, your templates": "معاييرك وقوالبك",
    "We draw to your project specification, your client's templates and the codes the job is designed to.": "نرسم وفق مواصفات مشروعك وقوالب عميلك والكودات التي صُمِّم المشروع على أساسها.",
    "Less waste": "هدر أقل",
    "Tight bar arrangements and accurate schedules cut down on offcuts and rework. We also design support structures for solar plants.": "ترتيبات حديد محكمة وجداول دقيقة تقلّل القصاصات وإعادة العمل. ونصمّم كذلك هياكل حمل لمحطات الطاقة الشمسية.",
    "One point of contact": "نقطة تواصل واحدة",
    "The same team handles your package from the first model to the final issue, so you never have to explain the job again to someone new.": "الفريق نفسه يتولّى حزمتك من النموذج الأول حتى الإصدار النهائي، فلا تضطر إلى شرح المشروع من جديد لشخص آخر.",
    "How a package runs": "كيف تسير الحزمة",
    "From consultant": "من مخططات",
    "drawings to site.": "الاستشاري إلى الموقع.",
    "Every reinforcement package follows the same five steps, and the checking happens throughout, not only at the end.": "تمرّ كل حزمة حديد تسليح بالخطوات الخمس نفسها، والمراجعة تجري طوال العمل لا في نهايته فقط.",
    "Brief & review": "الاستلام والمراجعة",
    "We go through the consultant's drawings, specification and standards, agree whether the package will be modelled in BIM or drafted in 2D, and send over technical queries early.": "نراجع مخططات الاستشاري والمواصفات والمعايير، ونتفق على تنفيذ الحزمة بنمذجة BIM أو برسم ثنائي الأبعاد، ونرسل الاستفسارات الفنية مبكراً.",
    "Inputs locked": "اعتماد المدخلات",
    "Model or draft": "النمذجة أو الرسم",
    "We model the reinforcement in 3D or draft it in 2D to the agreed conventions, one element at a time, and generate the schedules from the same source.": "ننمذج حديد التسليح ثلاثياً أو نرسمه ثنائياً وفق الأعراف المتفق عليها، عنصراً بعنصر، ونستخرج الجداول من المصدر نفسه.",
    "Coordinate & clash": "التنسيق وكشف التعارض",
    "We check the rebar against embeds, openings, services and adjacent pours, and sort out congestion and clashes before anything is issued.": "نفحص الحديد مقابل المدفونات والفتحات والخدمات والصبّات المجاورة، ونعالج الازدحام والتعارضات قبل أي إصدار.",
    "Buildability": "قابلية التنفيذ",
    "Check & issue": "المراجعة والإصدار",
    "Someone who did not draw the package checks its geometry, laps, covers, bar marks and schedules before it leaves the office.": "يراجع الحزمةَ مهندسٌ لم يشارك في رسمها، فيدقّق الهندسة والتراكبات والأغطية وعلامات الأسياخ والجداول قبل أن تغادر المكتب.",
    "QA gate": "بوابة الجودة",
    "Site support": "الدعم الميداني",
    "We stay on through construction to answer RFIs, issue revisions and update the as-builts, so the drawings still match what is on site.": "نبقى مع المشروع طوال التنفيذ للرد على الاستفسارات الفنية وإصدار التعديلات وتحديث مخططات «كما نُفِّذ»، لتبقى المخططات مطابقة لما في الموقع.",
    "Through delivery": "طوال التنفيذ",
    "Where we work": "أين نعمل",
    "Wherever there is steel": "حيثما وُجد حديد",
    "in the concrete.": "داخل الخرسانة.",
    "Reinforcement detailing and design support for most kinds of building and civil structure. If yours isn't listed here, send it over anyway.": "تفصيل حديد التسليح ودعم التصميم لمعظم أنواع المباني والمنشآت المدنية. وإن لم تجد نوع مشروعك هنا، أرسله إلينا على أي حال.",
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
    "Reinforcement shop drawings, BIM models and structural design, checked in the office before they go to site.": "مخططات تنفيذية لحديد التسليح ونماذج BIM وتصميم إنشائي، تُراجَع في المكتب قبل أن تصل إلى الموقع.",
    "AL-SHAMAA ENGINEERING SERVICES AND CONSULTANCY": "الشمّاع للخدمات والاستشارات الهندسية",
    "PRECISION · COORDINATION · BUILDABILITY": "الدقّة · التنسيق · قابلية التنفيذ",
    "WhatsApp": "واتساب",
    "DESIGNED AND DEVELOPED BY": "تصميم وتطوير",

    /* Selected work / Ohana Villas case study */
    "Work": "أعمالنا",
    "Selected work": "مختارات من أعمالنا",
    "Two projects.": "مشروعان.",
    "Nothing standard in either.": "لا شيء نمطي في أي منهما.",
    "One reinforcement package where every column is raked, and one solar plant where the wind rather than the weight decides the steel. Both were modelled before anything was drawn, and both were issued as documents the site could build straight from.": "حزمة حديد تسليح كلّ أعمدتها مائلة، ومحطة طاقة شمسية تحدّد الرياح فيها مقاطع الحديد لا الأوزان. نُمذِج المشروعان قبل رسم أي مخطط، وصدرا وثائق يبني منها الموقع مباشرة.",
    "Case study": "دراسة حالة",
    "Phase I2": "المرحلة I2",
    "Damour · Chouf, Lebanon": "الدامور · الشوف، لبنان",
    "A private villa development where the structure is the architecture: raked reinforced-concrete columns carry the upper floor and the cantilevered roof, so almost nothing about the reinforcement repeats. We modelled the ground-floor-to-first-floor columns in full 3D, worked out the bar arrangement where each inclined shaft lands, and issued a coordinated set of elevations, plans and bar bending schedules.": "مشروع فلل خاصة يكون فيه الهيكل هو العمارة نفسها: أعمدة خرسانية مائلة تحمل الطابق العلوي والسقف الكابولي، فلا يكاد شيء في التسليح يتكرّر. نمذجنا أعمدة الطابق الأرضي حتى الأول ثلاثية الأبعاد بالكامل، وحسمنا ترتيب الأسياخ عند مواضع التقاء كل عمود مائل ببلاطته، وأصدرنا حزمة منسّقة من المساقط والمقاطع وجداول ثني الحديد.",
    "Scope": "النطاق",
    "Reinforcement shop drawings & BBS": "مخططات تنفيذية لحديد التسليح وجداول الثني",
    "Elements": "العناصر",
    "Inclined columns, flat slabs, footings": "أعمدة مائلة، بلاطات مسطّحة، قواعد",
    "Method": "الأسلوب",
    "3D rebar model → model-driven drawings": "نموذج حديد ثلاثي الأبعاد ← مخططات مستخرجة منه",
    "Column 1: 3D reinforcement elevations": "العمود 1: مقاطع تسليح ثلاثية الأبعاد",
    "Columns 2 & 3: 3D reinforcement elevation": "العمودان 2 و3: مقطع تسليح ثلاثي الأبعاد",
    "Reinforcement elevation": "مقطع التسليح",
    "Column plans, two levels": "مساقط الأعمدة على منسوبين",
    "Bar bending schedule": "جدول ثني الحديد",
    "The challenge": "التحدّي",
    "Every column on this elevation is raked, and each one meets its slab at a different angle and a different level. Standard column details applied nowhere.": "كل عمود في هذا المقطع مائل، ويلتقي ببلاطته بزاوية ومنسوب مختلفين. لم تنطبق التفاصيل النمطية للأعمدة في أي موضع.",
    "The approach": "المعالجة",
    "The whole ground-to-first-floor zone was built as a 3D rebar model first, so laps, covers and the congested column-to-slab junctions were settled where they could actually be seen.": "بُنيت المنطقة من الأرضي حتى الأول كنموذج حديد ثلاثي الأبعاد أولاً، فحُسمت التراكبات والأغطية ووصلات العمود بالبلاطة المزدحمة في مكان يمكن رؤيتها فيه فعلاً.",
    "The outcome": "النتيجة",
    "Elevations, plans, 3D views and the bar bending schedule all came off that one model.": "المقاطع والمساقط واللقطات ثلاثية الأبعاد وجدول ثني الحديد خرجت جميعها من النموذج ذاته.",

    /* work.html — the page title and description are looked up here too */
    "Selected Work: Reinforcement and Solar Support Case Studies | AL-Shamaa": "مختارات من أعمالنا: دراسات حالة في تفصيل حديد التسليح وهياكل الطاقة الشمسية | الشمّاع",
    "Two AL-Shamaa case studies in full: the Ohana Villas Phase I2 reinforcement package in Damour, and the Anjar–Kherbet Rouha solar plant support structure in the Bekaa.": "دراستا حالة من أعمال الشمّاع بالتفصيل: حزمة تسليح فلل Ohana في المرحلة I2 بالدامور، وهيكل حمل محطة الطاقة الشمسية في عنجر–خربة روحا بالبقاع.",
    "Home": "الرئيسية",
    "One reinforcement package where every column is raked, and one solar plant where the wind rather than the weight decides the steel. Both are on the work page in full, with the drawing sheets and the analysis.": "حزمة حديد تسليح كلّ أعمدتها مائلة، ومحطة طاقة شمسية تحدّد الرياح فيها مقاطع الحديد لا الأوزان. المشروعان معروضان بالكامل في صفحة الأعمال، مع لوحات المخططات والتحليل.",
    "Read the case study": "اقرأ دراسة الحالة",
    "View both case studies": "استعرض دراستي الحالة",

    /* Anjar–Kherbet Rouha solar plant case study. "Case study", "Scope",
       "Elements", "Method" and the three note headings are shared with the
       Ohana block above — they are keyed once and used by both. */
    "Anjar–Kherbet Rouha Solar Plant": "محطة عنجر–خربة روحا للطاقة الشمسية",
    "Bekaa, Lebanon": "البقاع، لبنان",
    "A ground-mounted PV plant on an exposed ridge, where the panels weigh almost nothing and the wind decides the structure. We set out the array, ran the support tables through a wind simulation, designed the bolted base connections and their anchors against the uplift that came out of it, and sized the spread footings that hold the whole thing down.": "محطة كهروضوئية أرضية على تلّة مكشوفة، لا يكاد وزن الألواح فيها يُذكر، والرياح هي التي تحدّد الهيكل. وضعنا توزيع الألواح، وأخضعنا طاولات الحمل لمحاكاة رياح، وصمّمنا وصلات القواعد المبرشمة ومراسيها في مواجهة قوى الرفع الناتجة عنها، وحدّدنا أبعاد القواعد المنفصلة التي تثبّت المنشأ كلّه.",
    "PV support structure analysis & design": "تحليل وتصميم هيكل حمل الألواح الكهروضوئية",
    "Steel tables, base connections, spread footings": "طاولات حديدية، وصلات قواعد، قواعد منفصلة",
    "3D wind simulation → connection & footing design": "محاكاة رياح ثلاثية الأبعاد ← تصميم الوصلات والقواعد",
    "Array layout: ten strings across the site": "توزيع الألواح: عشر سلاسل على امتداد الموقع",
    "Wind pressure map from a 45 m/s simulation": "خريطة ضغط الرياح من محاكاة عند 45 م/ث",
    "Base connection: members and anchors": "وصلة القاعدة: العناصر والمراسي",
    "Base plate: stress and anchor checks": "لوح القاعدة: الإجهادات وتدقيق المراسي",
    "Spread footing: geometry and materials": "القاعدة المنفصلة: الأبعاد والمواد",
    "The tables as built, on site": "الطاولات بعد التنفيذ في الموقع",
    "The panels are light and the ridge is exposed, so wind governs rather than gravity. It lifts the tables, pulls on the anchors and tries to overturn the pads.": "الألواح خفيفة والتلّة مكشوفة، فالرياح هي الحاكمة لا الجاذبية: ترفع الطاولات، وتشدّ المراسي، وتحاول قلب القواعد.",
    "The tables were simulated in 3D so the pressure they actually see drove the member sizes, instead of a blanket coefficient applied to the whole array.": "حوكيت الطاولات ثلاثية الأبعاد ليقود توزيع الضغط الفعلي عليها اختيار مقاطع العناصر، بدل معامل واحد يُعمَّم على المصفوفة كلّها.",
    "Members, base connections, anchors and footings all sized off one set of load cases, with the governing anchor left at 77 % of capacity.": "حُدّدت مقاطع العناصر ووصلات القواعد والمراسي والقواعد جميعها من مجموعة حالات تحميل واحدة، وبقيت المرساة الحاكمة عند 77 % من طاقتها."
  };

  /* strings that live in attributes rather than text nodes */
  var META = {
    title: '\u0627\u0644\u0634\u0645\u0651\u0627\u0639 \u0644\u0644\u062e\u062f\u0645\u0627\u062a \u0648\u0627\u0644\u0627\u0633\u062a\u0634\u0627\u0631\u0627\u062a \u0627\u0644\u0647\u0646\u062f\u0633\u064a\u0629 | \u062a\u0641\u0635\u064a\u0644 \u062d\u062f\u064a\u062f \u0627\u0644\u062a\u0633\u0644\u064a\u062d \u0648\u0646\u0645\u0630\u062c\u0629 BIM \u0648\u0627\u0644\u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0625\u0646\u0634\u0627\u0626\u064a',
    nav:   '\u0627\u0644\u062a\u0646\u0642\u0644 \u0627\u0644\u0631\u0626\u064a\u0633\u064a',
    desc:  '\u062a\u064f\u0639\u0650\u062f\u0651 \u0627\u0644\u0634\u0645\u0651\u0627\u0639 \u0645\u062e\u0637\u0637\u0627\u062a \u062a\u0646\u0641\u064a\u0630\u064a\u0629 \u0644\u062d\u062f\u064a\u062f \u0627\u0644\u062a\u0633\u0644\u064a\u062d \u0648\u062c\u062f\u0627\u0648\u0644 \u062b\u0646\u064a \u0627\u0644\u062d\u062f\u064a\u062f \u0648\u0646\u0645\u0627\u0630\u062c BIM \u0648\u062a\u0635\u0627\u0645\u064a\u0645 \u0625\u0646\u0634\u0627\u0626\u064a\u0629 \u0644\u0644\u0645\u0646\u0634\u0622\u062a \u0627\u0644\u0628\u0633\u064a\u0637\u0629 \u0648\u0627\u0644\u0645\u0639\u0642\u062f\u0629\u060c \u0648\u062a\u0631\u0627\u062c\u0639 \u0643\u0644 \u062d\u0632\u0645\u0629 \u0642\u0628\u0644 \u0623\u0646 \u062a\u0635\u0644 \u0625\u0644\u0649 \u0627\u0644\u0645\u0648\u0642\u0639.',
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

    /* The title and the description are keyed by their English the same way
       every other string is, so a second page translates by adding two keys
       rather than by carrying its own copy of this file. META.title/desc stay
       as the landing page's, and as the fallback for a page with neither. */
    document.title = toArabic ? (AR[EN_TITLE] || META.title) : EN_TITLE;
    var d = document.querySelector('meta[name="description"]');
    if (d) d.setAttribute('content', toArabic ? (AR[EN_DESC] || META.desc) : EN_DESC);

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

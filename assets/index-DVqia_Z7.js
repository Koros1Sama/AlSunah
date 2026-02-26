(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();const Ae="modulepreload",De=function(e){return"/AlSunah/"+e},ce={},F=function(t,s,a){let n=Promise.resolve();if(s&&s.length>0){let p=function(c){return Promise.all(c.map(f=>Promise.resolve(f).then(x=>({status:"fulfilled",value:x}),x=>({status:"rejected",reason:x}))))};var d=p;document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),r=i?.nonce||i?.getAttribute("nonce");n=p(s.map(c=>{if(c=De(c),c in ce)return;ce[c]=!0;const f=c.endsWith(".css"),x=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${x}`))return;const b=document.createElement("link");if(b.rel=f?"stylesheet":Ae,f||(b.as="script"),b.crossOrigin="",b.href=c,r&&b.setAttribute("nonce",r),document.head.appendChild(b),f)return new Promise((v,y)=>{b.addEventListener("load",v),b.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(i){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=i,window.dispatchEvent(r),!r.defaultPrevented)throw i}return n.then(i=>{for(const r of i||[])r.status==="rejected"&&o(r.reason);return t().catch(o)})},W={};let U=null;function T(e,t){W[e]=t}function Y(e,t={}){const s=t&&Object.keys(t).length?`#${e}?${new URLSearchParams(t).toString()}`:`#${e}`;window.location.hash=s}function Te(){const e=window.location.hash.slice(1),[,t]=e.split("?");return t?Object.fromEntries(new URLSearchParams(t)):{}}function ve(){return window.location.hash.slice(1).split("?")[0]||"home"}async function de(){const e=document.getElementById("app"),t=ve(),s=Te(),a=W[t]||W.home;if(!a)return;U&&(U(),U=null);const n=e.querySelector(".screen");n&&(n.classList.add("screen-exit"),await new Promise(i=>setTimeout(i,150)));const o=a(s);e.innerHTML=o.html;const d=e.querySelector(".screen");d&&d.classList.add("screen-enter"),o.mount&&(U=o.mount()||null)}function Be(){window.addEventListener("hashchange",de),window.location.hash?de():window.location.hash="#home"}const O=[{id:"food",name:"سنن الطعام والشراب",icon:"🍽️",description:"آداب الأكل والشرب من هدي النبي ﷺ",color:"#FF8A65",units:["food-basics","food-before","food-during","food-after"]},{id:"sleep",name:"سنن النوم والاستيقاظ",icon:"🌙",description:"هدي النبي ﷺ عند النوم والاستيقاظ",color:"#7E57C2",units:["sleep-before","sleep-adhkar","sleep-wakeup"]},{id:"wudu",name:"سنن الوضوء",icon:"💧",description:"سنن الوضوء والطهارة من هدي النبي ﷺ",color:"#42A5F5",units:["wudu-basics","wudu-steps","wudu-after"]}],q={"food-basics":{id:"food-basics",categoryId:"food",name:"أساسيات آداب الطعام",icon:"🥄",order:1,lessons:["food-1","food-2","food-3"]},"food-before":{id:"food-before",categoryId:"food",name:"سنن قبل الطعام",icon:"🤲",order:2,lessons:["food-4","food-5"]},"food-during":{id:"food-during",categoryId:"food",name:"سنن أثناء الطعام",icon:"🍽️",order:3,lessons:["food-6","food-7","food-8"]},"food-after":{id:"food-after",categoryId:"food",name:"سنن بعد الطعام",icon:"✨",order:4,lessons:["food-9","food-10"]},"sleep-before":{id:"sleep-before",categoryId:"sleep",name:"سنن قبل النوم",icon:"🛏️",order:1,lessons:["sleep-1","sleep-2","sleep-3"]},"sleep-adhkar":{id:"sleep-adhkar",categoryId:"sleep",name:"أذكار النوم",icon:"📿",order:2,lessons:["sleep-4","sleep-5"]},"sleep-wakeup":{id:"sleep-wakeup",categoryId:"sleep",name:"سنن الاستيقاظ",icon:"🌅",order:3,lessons:["sleep-6","sleep-7"]},"wudu-basics":{id:"wudu-basics",categoryId:"wudu",name:"أساسيات الوضوء",icon:"💧",order:1,lessons:["wudu-1","wudu-2"]},"wudu-steps":{id:"wudu-steps",categoryId:"wudu",name:"سنن خطوات الوضوء",icon:"🚿",order:2,lessons:["wudu-3","wudu-4","wudu-5"]},"wudu-after":{id:"wudu-after",categoryId:"wudu",name:"سنن بعد الوضوء",icon:"🤲",order:3,lessons:["wudu-6","wudu-7"]}},N={"food-1":{id:"food-1",unitId:"food-basics",name:"التسمية قبل الأكل",explanation:'يُسن قول "بسم الله" قبل البدء بالأكل. فإن نسيَ في أوله قال: "بسم الله أوله وآخره".',whenToApply:"قبل كل وجبة",benefit:"للبركة في الطعام وطرد الشيطان عنه",spiritualBenefit:"ذكر الله على النعم يزرع الشكر في القلب ويطرد الغفلة",evidence:{id:"ev-food-1",type:"hadith",text:"يَا غُلَامُ، سَمِّ اللَّهَ، وَكُلْ بِيَمِينِكَ، وَكُلْ مِمَّا يَلِيكَ",narrator:"عمر بن أبي سلمة رضي الله عنه",source:"متفق عليه",grade:"muttafaq",book:"البخاري (٥٣٧٦) ومسلم (٢٠٢٢)"},exercises:[{type:"mcq",question:"ماذا يُسن أن يقول المسلم قبل الأكل؟",options:["بسم الله","الحمد لله","لا إله إلا الله","سبحان الله"],correct:0},{type:"truefalse",question:"إذا نسي المسلم التسمية في أول الطعام، لا يُسَنّ أن يقولها بعد ذلك.",correct:!1,explanation:'بل يقول: "بسم الله أوله وآخره"'},{type:"fill",question:"يا غلام، ___ الله، وكل بيمينك",answer:"سمِّ",options:["سمِّ","اذكر","قل","نادِ"]},{type:"evidence",question:"ما هو الدليل على سنة التسمية قبل الأكل؟",options:["يَا غُلَامُ، سَمِّ اللَّهَ، وَكُلْ بِيَمِينِكَ","كان النبي ﷺ يحب الحلوى والعسل","إذا أكل أحدكم فليأكل بيمينه"],correct:0}]},"food-2":{id:"food-2",unitId:"food-basics",name:"الأكل باليمين",explanation:"يُسن الأكل والشرب باليد اليمنى، ويُكره الأكل بالشمال.",whenToApply:"عند كل أكل وشرب",benefit:"اتباع سنة النبي ﷺ ومخالفة الشيطان",spiritualBenefit:"مخالفة الشيطان في أفعاله طريق لتزكية النفس",evidence:{id:"ev-food-2",type:"hadith",text:"لا يَأْكُلَنَّ أحَدٌ مِنكُم بشِمالِهِ، ولا يَشْرَبَنَّ بها، فإنَّ الشَّيْطانَ يَأْكُلُ بشِمالِهِ ويَشْرَبُ بها",narrator:"عبد الله بن عمر رضي الله عنهما",source:"صحيح مسلم",grade:"sahih",book:"مسلم (٢٠٢٠)"},exercises:[{type:"mcq",question:"بأي يد يُسن الأكل؟",options:["اليمنى","اليسرى","كلتا اليدين","لا فرق"],correct:0},{type:"truefalse",question:"الشيطان يأكل ويشرب بشماله.",correct:!0,explanation:"كما جاء في صحيح مسلم"},{type:"mcq",question:"ما حكم الأكل بالشمال؟",options:["مكروه","حرام","مباح","واجب"],correct:0}]},"food-3":{id:"food-3",unitId:"food-basics",name:"الأكل مما يلي",explanation:"يُسن أن يأكل الإنسان مما يليه ولا يأكل من وسط الطعام أو من أمام غيره.",whenToApply:"عند الأكل الجماعي",benefit:"من أدب الطعام ومراعاة الآخرين",spiritualBenefit:"مراعاة الآخرين من أخلاق النبي ﷺ وتهذيب النفس",evidence:{id:"ev-food-3",type:"hadith",text:"يَا غُلَامُ، سَمِّ اللَّهَ، وَكُلْ بِيَمِينِكَ، وَكُلْ مِمَّا يَلِيكَ",narrator:"عمر بن أبي سلمة رضي الله عنه",source:"متفق عليه",grade:"muttafaq",book:"البخاري (٥٣٧٦) ومسلم (٢٠٢٢)"},exercises:[{type:"mcq",question:"من أين يُسن أن يأكل المسلم؟",options:["مما يليه","من وسط الطعام","من أي مكان","من طرف الصحن فقط"],correct:0},{type:"truefalse",question:"يجوز الأكل من وسط الطعام المشترك.",correct:!1,explanation:"السنة الأكل مما يلي الشخص"}]},"food-4":{id:"food-4",unitId:"food-before",name:"غسل اليدين قبل الطعام",explanation:"يُستحب غسل اليدين قبل الطعام وبعده للنظافة.",whenToApply:"قبل كل وجبة",benefit:"النظافة واتباع هدي النبي ﷺ",spiritualBenefit:"النظافة من الإيمان وتعظيم نعمة الطعام",evidence:{id:"ev-food-4",type:"hadith",text:"بَرَكَةُ الطَّعَامِ الوُضُوءُ قَبْلَهُ وَالوُضُوءُ بَعْدَهُ",narrator:"سلمان الفارسي رضي الله عنه",source:"رواه الترمذي",grade:"hasan",book:"الترمذي (١٨٤٦)"},exercises:[{type:"mcq",question:"ما هي بركة الطعام كما ورد في الحديث؟",options:["الوضوء قبله وبعده","التسمية","الأكل جماعة","الدعاء"],correct:0},{type:"fill",question:"بركة الطعام ___ قبله والوضوء بعده",answer:"الوضوء",options:["الوضوء","التسمية","الصلاة","الذكر"]}]},"food-5":{id:"food-5",unitId:"food-before",name:"الجلوس للأكل",explanation:"كان النبي ﷺ يكره أن يأكل وهو متكئ. والسنة الأكل جالساً.",whenToApply:"عند الجلوس للطعام",benefit:"أدب الطعام وصحة الجسم",spiritualBenefit:"التواضع في الأكل من صفات الصالحين",evidence:{id:"ev-food-5",type:"hadith",text:"لا آكُلُ مُتَّكِئًا",narrator:"أبو جحيفة رضي الله عنه",source:"صحيح البخاري",grade:"sahih",book:"البخاري (٥٣٩٩)"},exercises:[{type:"truefalse",question:"كان النبي ﷺ يأكل متكئاً.",correct:!1,explanation:"قال ﷺ: لا آكل متكئاً"},{type:"evidence",question:"ما دليل كراهة الأكل متكئاً؟",options:["لا آكُلُ مُتَّكِئًا","كلوا واشربوا ولا تسرفوا","سمِّ الله وكل بيمينك"],correct:0}]},"food-6":{id:"food-6",unitId:"food-during",name:"الأكل بثلاث أصابع",explanation:"كان النبي ﷺ يأكل بثلاث أصابع ويلعقها بعد الفراغ.",whenToApply:"أثناء الأكل",benefit:"اتباع سنة النبي ﷺ والتقليل من الإسراف",spiritualBenefit:"اقتداء بالنبي ﷺ في أدق التفاصيل",evidence:{id:"ev-food-6",type:"hadith",text:"كانَ رسولُ اللهِ ﷺ يأكلُ بثلاثِ أصابعَ، فإذا فرغَ لعِقَها",narrator:"كعب بن مالك رضي الله عنه",source:"صحيح مسلم",grade:"sahih",book:"مسلم (٢٠٣٢)"},exercises:[{type:"mcq",question:"بكم إصبع كان النبي ﷺ يأكل؟",options:["ثلاث","أربع","خمس","اثنتين"],correct:0}]},"food-7":{id:"food-7",unitId:"food-during",name:"عدم عيب الطعام",explanation:"لم يكن النبي ﷺ يعيب طعاماً قط. إن اشتهاه أكله وإن كرهه تركه.",whenToApply:"عند تقديم الطعام",benefit:"حسن الخلق ومراعاة مشاعر الآخرين",spiritualBenefit:"حسن الخلق مع الناس أثقل ما في الميزان",evidence:{id:"ev-food-7",type:"hadith",text:"ما عابَ رسولُ اللهِ ﷺ طعامًا قطُّ، إنِ اشتَهاهُ أكلَهُ، وإنْ كرِهَهُ ترَكَهُ",narrator:"أبو هريرة رضي الله عنه",source:"متفق عليه",grade:"muttafaq",book:"البخاري (٥٤٠٩) ومسلم (٢٠٦٤)"},exercises:[{type:"truefalse",question:"كان النبي ﷺ إذا لم يعجبه طعام ذمّه وعابه.",correct:!1,explanation:"ما عاب رسول الله ﷺ طعاماً قط"},{type:"mcq",question:"ماذا كان يفعل النبي ﷺ إذا كره طعاماً؟",options:["تركه","عابه","ألقاه","أعطاه غيره"],correct:0}]},"food-8":{id:"food-8",unitId:"food-during",name:"لعق الأصابع والصحفة",explanation:"يُسن لعق الأصابع ولعق الصحفة (تنظيف الإناء) بعد الأكل لأن البركة في آخر الطعام.",whenToApply:"بعد الانتهاء من الأكل",benefit:"عدم إضاعة النعمة والبركة في آخر الطعام",spiritualBenefit:"حفظ النعمة من الضياع شكر عملي لله تعالى",evidence:{id:"ev-food-8",type:"hadith",text:"إذا أكَلَ أحَدُكُمْ فلا يَمْسَحْ يَدَهُ حتَّى يَلْعَقَها أوْ يُلْعِقَها",narrator:"عبد الله بن عباس رضي الله عنهما",source:"متفق عليه",grade:"muttafaq",book:"البخاري (٥٤٥٦) ومسلم (٢٠٣١)"},exercises:[{type:"mcq",question:"لماذا يُسن لعق الأصابع بعد الأكل؟",options:["لأن البركة في آخر الطعام","للنظافة فقط","عادة عربية","لا سبب محدد"],correct:0}]},"food-9":{id:"food-9",unitId:"food-after",name:"حمد الله بعد الأكل",explanation:'يُسن حمد الله بعد الفراغ من الطعام بقول: "الحمد لله الذي أطعمني هذا ورزقنيه من غير حول مني ولا قوة".',whenToApply:"بعد كل وجبة",benefit:"شكر النعمة وغفران الذنوب",spiritualBenefit:"شكر النعم يقرب العبد من ربه ويزيد الخير",evidence:{id:"ev-food-9",type:"hadith",text:"مَن أكَلَ طَعامًا ثمَّ قال: الحمدُ للهِ الَّذي أطعَمَني هذا الطَّعامَ ورزَقَنيه من غيرِ حَولٍ مِنِّي ولا قُوَّةٍ، غُفِرَ له ما تَقَدَّمَ من ذَنبِه",narrator:"معاذ بن أنس رضي الله عنه",source:"رواه الترمذي",grade:"hasan",book:"الترمذي (٣٤٥٨)"},exercises:[{type:"fill",question:"الحمد لله الذي أطعمني هذا _____ من غير حول مني ولا قوة",answer:"ورزقنيه",options:["ورزقنيه","وأعطانيه","وباركه","ويسّره"]},{type:"mcq",question:"ما ثواب من حمد الله بعد الطعام بالدعاء المأثور؟",options:["غُفِر له ما تقدم من ذنبه","كُتبت له حسنات","رُفعت درجته","بُنيَ له بيت في الجنة"],correct:0}]},"food-10":{id:"food-10",unitId:"food-after",name:"الدعاء لصاحب الطعام",explanation:'يُسن الدعاء لمن أطعمك بقول: "اللهم أطعم من أطعمني واسقِ من سقاني" أو "اللهم بارك لهم فيما رزقتهم واغفر لهم وارحمهم".',whenToApply:"عند الأكل عند أحد",benefit:"شكر المعروف والدعاء بالخير",spiritualBenefit:"الدعاء للغير من أعظم صور الجود والإحسان",evidence:{id:"ev-food-10",type:"hadith",text:"اللَّهُمَّ أَطْعِمْ مَنْ أَطْعَمَنِي وَاسْقِ مَنْ سَقَانِي",narrator:"المقداد بن الأسود رضي الله عنه",source:"صحيح مسلم",grade:"sahih",book:"مسلم (٢٠٥٥)"},exercises:[{type:"mcq",question:"ما الدعاء المسنون لصاحب الطعام؟",options:["اللهم أطعم من أطعمني واسقِ من سقاني","جزاك الله خيراً","بارك الله فيك","شكراً لك"],correct:0}]},"sleep-1":{id:"sleep-1",unitId:"sleep-before",name:"الوضوء قبل النوم",explanation:"يُستحب أن يتوضأ المسلم قبل النوم ولو كان على وضوء.",whenToApply:"قبل النوم",benefit:"النوم على طهارة",evidence:{id:"ev-sleep-1",type:"hadith",text:"إذا أتَيْتَ مَضْجَعَكَ فَتَوَضَّأْ وُضُوءَكَ للصَّلاةِ",narrator:"البراء بن عازب رضي الله عنه",source:"متفق عليه",grade:"muttafaq",book:"البخاري (٢٤٧) ومسلم (٢٧١٠)"},exercises:[{type:"mcq",question:"ماذا يُسن فعله قبل النوم؟",options:["الوضوء","الغسل","التيمم","لا شيء"],correct:0},{type:"truefalse",question:"يُسن الوضوء قبل النوم وإن كان الشخص متوضئاً.",correct:!0,explanation:"لأن الحديث أطلق الأمر بالوضوء عند المضجع"}]},"sleep-2":{id:"sleep-2",unitId:"sleep-before",name:"نفض الفراش",explanation:"يُسن نفض الفراش قبل النوم ثلاث مرات.",whenToApply:"قبل النوم مباشرة",benefit:"تنظيف الفراش مما قد يكون فيه",evidence:{id:"ev-sleep-2",type:"hadith",text:"إذا أوَى أحَدُكُمْ إلى فِراشِهِ فَلْيَنْفُضْ فِراشَهُ بداخِلَةِ إزارِهِ، فإنَّه لا يدري ما خلَفَهُ عليه",narrator:"أبو هريرة رضي الله عنه",source:"متفق عليه",grade:"muttafaq",book:"البخاري (٦٣٢٠) ومسلم (٢٧١٤)"},exercises:[{type:"mcq",question:"لماذا يُسن نفض الفراش قبل النوم؟",options:["لأنه لا يدري ما خلفه عليه","للتبرك","عادة عربية","لطرد الجن"],correct:0},{type:"fill",question:"إذا أوى أحدكم إلى فراشه ___ فراشه بداخلة إزاره",answer:"فلينفض",options:["فلينفض","فليغسل","فليطهر","فليمسح"]}]},"sleep-3":{id:"sleep-3",unitId:"sleep-before",name:"النوم على الشق الأيمن",explanation:"يُسن النوم على الجنب الأيمن ووضع اليد اليمنى تحت الخد.",whenToApply:"عند النوم",benefit:"اتباع سنة النبي ﷺ",evidence:{id:"ev-sleep-3",type:"hadith",text:"ثُمَّ اضْطَجِعْ على شِقِّكَ الأيمنِ",narrator:"البراء بن عازب رضي الله عنه",source:"متفق عليه",grade:"muttafaq",book:"البخاري (٢٤٧) ومسلم (٢٧١٠)"},exercises:[{type:"mcq",question:"على أي جنب يُسن النوم؟",options:["الأيمن","الأيسر","البطن","الظهر"],correct:0},{type:"truefalse",question:"يُسن النوم على البطن.",correct:!1,explanation:"السنة النوم على الشق الأيمن"}]},"sleep-4":{id:"sleep-4",unitId:"sleep-adhkar",name:"قراءة آية الكرسي",explanation:"يُسن قراءة آية الكرسي عند النوم، فمن قرأها لا يزال عليه حافظ من الله.",whenToApply:"عند النوم",benefit:"الحفظ من الله ولا يقربه شيطان حتى يصبح",evidence:{id:"ev-sleep-4",type:"hadith",text:"إذا أوَيْتَ إلى فِراشِكَ فاقرَأْ آيةَ الكُرسِيِّ، فإنَّه لا يزالُ عليكَ من اللهِ حافِظٌ، ولا يقرَبُكَ شيطانٌ حتى تُصبِحَ",narrator:"أبو هريرة رضي الله عنه",source:"صحيح البخاري",grade:"sahih",book:"البخاري (٢٣١١)"},exercises:[{type:"mcq",question:"ما ثواب قراءة آية الكرسي عند النوم؟",options:["لا يقربه شيطان حتى يصبح","يُغفر له ذنوبه","يُرفع في الجنة","يرى رؤيا صالحة"],correct:0},{type:"evidence",question:"ما الدليل على قراءة آية الكرسي عند النوم؟",options:["إذا أويتَ إلى فراشِك فاقرأ آية الكرسي...","اقرأ باسم ربك الذي خلق","من قرأ سورة البقرة في بيته لم يدخله شيطان"],correct:0}]},"sleep-5":{id:"sleep-5",unitId:"sleep-adhkar",name:"قراءة المعوذات",explanation:"يُسن قراءة سورة الإخلاص والمعوذتين (الفلق والناس) ثلاث مرات والنفث في اليدين ومسح الجسد بهما.",whenToApply:"عند النوم",benefit:"الحفظ والرقية",evidence:{id:"ev-sleep-5",type:"hadith",text:"كانَ النبيُّ ﷺ إذا أوَى إلى فِراشِهِ كلَّ لَيْلَةٍ جمَعَ كَفَّيه ثمَّ نفَثَ فيهما فقرَأَ فيهما: قُلْ هُو اللَّهُ أَحَدٌ، وقُلْ أَعُوذُ بِرَبِّ الفَلَقِ، وقُلْ أَعُوذُ بِرَبِّ النَّاسِ، ثمَّ يمسَحُ بهما ما استطاعَ من جَسَدِه",narrator:"عائشة رضي الله عنها",source:"صحيح البخاري",grade:"sahih",book:"البخاري (٥٠١٧)"},exercises:[{type:"mcq",question:"كم مرة تُقرأ المعوذات عند النوم؟",options:["ثلاث مرات","مرة واحدة","سبع مرات","عشر مرات"],correct:0},{type:"order",question:"رتّب خطوات سنة المعوذات عند النوم:",items:["جمع الكفين","النفث فيهما","قراءة الإخلاص والمعوذتين","مسح الجسد بهما"],correctOrder:[0,1,2,3]}]},"sleep-6":{id:"sleep-6",unitId:"sleep-wakeup",name:"دعاء الاستيقاظ",explanation:'يُسن عند الاستيقاظ قول: "الحمد لله الذي أحيانا بعدما أماتنا وإليه النشور".',whenToApply:"عند الاستيقاظ",benefit:"شكر الله على نعمة الحياة",evidence:{id:"ev-sleep-6",type:"hadith",text:"الحمدُ للهِ الذي أحْيانا بعدَ ما أماتَنا، وإليهِ النُّشورُ",narrator:"حذيفة بن اليمان رضي الله عنه",source:"صحيح البخاري",grade:"sahih",book:"البخاري (٦٣١٤)"},exercises:[{type:"fill",question:"الحمد لله الذي ___ بعد ما أماتنا وإليه النشور",answer:"أحيانا",options:["أحيانا","بعثنا","أيقظنا","نبّهنا"]},{type:"mcq",question:"متى يُقال هذا الدعاء؟",options:["عند الاستيقاظ","قبل النوم","بعد الصلاة","في الصباح"],correct:0}]},"sleep-7":{id:"sleep-7",unitId:"sleep-wakeup",name:"غسل اليدين عند الاستيقاظ",explanation:"يُسن غسل اليدين ثلاثاً عند الاستيقاظ من النوم قبل إدخالهما في الإناء.",whenToApply:"عند الاستيقاظ",benefit:"النظافة لأن اليد تبيت على أماكن مختلفة",evidence:{id:"ev-sleep-7",type:"hadith",text:"إذا استيقظَ أحدُكم من نومِه فلا يغمِس يدَه في الإناءِ حتى يغسلَها ثلاثًا، فإنَّه لا يدري أين باتتْ يدُه",narrator:"أبو هريرة رضي الله عنه",source:"متفق عليه",grade:"muttafaq",book:"البخاري (١٦٢) ومسلم (٢٧٨)"},exercises:[{type:"mcq",question:"كم مرة يُسن غسل اليدين عند الاستيقاظ؟",options:["ثلاث مرات","مرة واحدة","مرتين","سبع مرات"],correct:0},{type:"truefalse",question:"يجوز غمس اليد في الإناء مباشرة بعد الاستيقاظ.",correct:!1,explanation:"السنة غسلها ثلاثاً أولاً"}]},"wudu-1":{id:"wudu-1",unitId:"wudu-basics",name:"التسمية عند الوضوء",explanation:'يُسن قول "بسم الله" عند بداية الوضوء.',whenToApply:"عند بداية الوضوء",benefit:"البركة في الوضوء",evidence:{id:"ev-wudu-1",type:"hadith",text:"لا وُضُوءَ لمَن لمْ يَذْكُرِ اسمَ اللهِ عليهِ",narrator:"أبو هريرة رضي الله عنه",source:"رواه أحمد والترمذي",grade:"hasan",book:"الترمذي (٢٥)"},exercises:[{type:"mcq",question:"ماذا يُسن قوله عند بداية الوضوء؟",options:["بسم الله","الحمد لله","لا إله إلا الله","الله أكبر"],correct:0}]},"wudu-2":{id:"wudu-2",unitId:"wudu-basics",name:"السواك عند الوضوء",explanation:"يُستحب استعمال السواك عند كل وضوء.",whenToApply:"قبل أو أثناء الوضوء",benefit:"تطهير الفم وإرضاء الرب",evidence:{id:"ev-wudu-2",type:"hadith",text:"لَوْلا أنْ أشُقَّ على أُمَّتي لأمَرْتُهُم بالسِّواكِ عندَ كلِّ وُضوءٍ",narrator:"أبو هريرة رضي الله عنه",source:"متفق عليه",grade:"muttafaq",book:"البخاري (٨٨٧) ومسلم (٢٥٢)"},exercises:[{type:"mcq",question:"لماذا لم يأمر النبي ﷺ بالسواك عند كل وضوء؟",options:["حتى لا يشق على أمته","لأنه ليس سنة","لأنه واجب فقط في الصلاة","لأنه غير مهم"],correct:0},{type:"truefalse",question:"السواك مستحب عند كل وضوء.",correct:!0,explanation:'لحديث "لولا أن أشق على أمتي لأمرتهم بالسواك عند كل وضوء"'}]},"wudu-3":{id:"wudu-3",unitId:"wudu-steps",name:"غسل الكفين ثلاثاً",explanation:"يُسن البدء بغسل الكفين ثلاث مرات قبل الشروع في الوضوء.",whenToApply:"في بداية الوضوء",benefit:"اتباع سنة النبي ﷺ في الوضوء",evidence:{id:"ev-wudu-3",type:"hadith",text:"كانَ رسولُ اللهِ ﷺ إذا توضَّأَ غسَلَ يدَيهِ ثلاثًا",narrator:"عثمان بن عفان رضي الله عنه",source:"صحيح مسلم",grade:"sahih",book:"مسلم (٢٢٦)"},exercises:[{type:"mcq",question:"بماذا يبدأ الوضوء سنةً؟",options:["غسل الكفين","المضمضة","غسل الوجه","غسل اليدين إلى المرفقين"],correct:0}]},"wudu-4":{id:"wudu-4",unitId:"wudu-steps",name:"المضمضة والاستنشاق",explanation:"يُسن المضمضة والاستنشاق ثلاث مرات والمبالغة فيهما لغير الصائم.",whenToApply:"في الوضوء بعد غسل الكفين",benefit:"تنظيف الفم والأنف",evidence:{id:"ev-wudu-4",type:"hadith",text:"وبالِغْ في الاستنشاقِ إلَّا أن تكونَ صائمًا",narrator:"لقيط بن صبرة رضي الله عنه",source:"رواه أبو داوود والترمذي",grade:"sahih",book:"أبو داود (١٤٢)"},exercises:[{type:"truefalse",question:"يُسن المبالغة في الاستنشاق حتى للصائم.",correct:!1,explanation:'قال ﷺ: "وبالغ في الاستنشاق إلا أن تكون صائماً"'},{type:"mcq",question:"كم مرة تُسن المضمضة والاستنشاق؟",options:["ثلاث مرات","مرة واحدة","مرتين","سبع مرات"],correct:0}]},"wudu-5":{id:"wudu-5",unitId:"wudu-steps",name:"تخليل اللحية والأصابع",explanation:"يُسن تخليل اللحية الكثيفة بالماء وتخليل أصابع اليدين والرجلين.",whenToApply:"أثناء الوضوء",benefit:"إيصال الماء لكل الأعضاء",evidence:{id:"ev-wudu-5",type:"hadith",text:"خَلِّلوا بينَ أصابعِكم لا تُخَلِّلُها النَّارُ",narrator:"أبو هريرة رضي الله عنه",source:"رواه الترمذي",grade:"hasan",book:"الترمذي (٣٩)"},exercises:[{type:"mcq",question:"ما الحكمة من تخليل الأصابع في الوضوء؟",options:["إيصال الماء لكل الأعضاء","التبرك","للتبريد","عادة فقط"],correct:0}]},"wudu-6":{id:"wudu-6",unitId:"wudu-after",name:"الذكر بعد الوضوء",explanation:'يُسن بعد الوضوء قول: "أشهد أن لا إله إلا الله وحده لا شريك له وأشهد أن محمداً عبده ورسوله".',whenToApply:"بعد الوضوء مباشرة",benefit:"فُتحت له أبواب الجنة الثمانية",evidence:{id:"ev-wudu-6",type:"hadith",text:"ما مِنكُم مِن أحَدٍ يتوضَّأُ فيُبلِغُ الوُضوءَ ثمَّ يقولُ: أشهدُ أن لا إلهَ إلَّا اللهُ وحدَه لا شريكَ له وأشهدُ أنَّ محمَّدًا عبدُه ورسولُه، إلَّا فُتِحَتْ له أبوابُ الجنَّةِ الثَّمانيةُ يدخُلُ مِن أيِّها شاءَ",narrator:"عقبة بن عامر رضي الله عنه",source:"صحيح مسلم",grade:"sahih",book:"مسلم (٢٣٤)"},exercises:[{type:"mcq",question:"ما ثواب الذكر بعد الوضوء؟",options:["فُتحت له أبواب الجنة الثمانية","غُفرت ذنوبه","كُتبت له حسنات","رُفعت درجته"],correct:0},{type:"fill",question:"أشهد أن لا إله إلا الله وحده لا شريك له وأشهد أن محمداً ___ ورسوله",answer:"عبده",options:["عبده","نبيه","حبيبه","خليله"]}]},"wudu-7":{id:"wudu-7",unitId:"wudu-after",name:"صلاة ركعتين بعد الوضوء",explanation:"يُستحب صلاة ركعتين بعد الوضوء مباشرة.",whenToApply:"بعد الوضوء",benefit:"وجبت له الجنة",evidence:{id:"ev-wudu-7",type:"hadith",text:"مَن توضَّأَ نحوَ وُضوئي هذا، ثمَّ صلَّى ركعتينِ لا يُحَدِّثُ فيهما نفسَه، غُفِرَ له ما تقدَّمَ من ذنبِه",narrator:"عثمان بن عفان رضي الله عنه",source:"متفق عليه",grade:"muttafaq",book:"البخاري (١٥٩) ومسلم (٢٢٦)"},exercises:[{type:"mcq",question:"ما شرط ركعتي الوضوء للحصول على الأجر الكامل؟",options:["ألا يحدّث فيهما نفسه","أن تكون في المسجد","أن تكون جماعة","أن تكون قبل الفجر"],correct:0},{type:"truefalse",question:"يُستحب صلاة ركعتين بعد كل وضوء.",correct:!0,explanation:"كما جاء في حديث عثمان رضي الله عنه"}]}};function Pe(){return Object.values(N).map(e=>({...e.evidence,sunnahName:e.name,sunnahId:e.id,categoryId:q[e.unitId]?.categoryId}))}function ze(){return Object.keys(N).length}const ee="alsunah_data",z={profile:{name:"مستخدم",icon:"🌙",frame:"default",title:"مبتدئ"},xp:0,level:1,hasanat:0,streak:{current:0,longest:0,lastActiveDate:null,shields:0,fridayExemption:!0},completedLessons:{},unitMastery:{},categoryProgress:{},achievements:{},habitLog:{},favoriteEvidence:[],stats:{totalLessons:0,totalCorrect:0,totalQuestions:0,totalTimeMs:0,perfectLessons:0,startDate:null},dailyQuests:{date:null,quests:[]},settings:{theme:"classic",fontSize:"medium",showTashkeel:!0,dailyGoal:10,notifications:!0,streakFridayExemption:!0},sunnahPractice:{},hasOnboarded:!1};function me(){try{const e=localStorage.getItem(ee);if(!e)return{...z,stats:{...z.stats,startDate:new Date().toISOString()}};const t=JSON.parse(e);return te(z,t)}catch(e){return console.error("Failed to load state:",e),{...z}}}function fe(e){try{localStorage.setItem(ee,JSON.stringify(e))}catch(t){console.error("Failed to save state:",t)}}function Oe(){return localStorage.removeItem(ee),{...z,stats:{...z.stats,startDate:new Date().toISOString()}}}function Ce(){const e=me(),t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),s=URL.createObjectURL(t),a=document.createElement("a");a.href=s,a.download=`alsunah-backup-${new Date().toISOString().slice(0,10)}.json`,a.click(),URL.revokeObjectURL(s)}function _e(e){return new Promise((t,s)=>{const a=new FileReader;a.onload=n=>{try{const o=JSON.parse(n.target.result),d=te(z,o);fe(d),t(d)}catch(o){s(o)}},a.onerror=s,a.readAsText(e)})}function te(e,t){const s={...e};for(const a of Object.keys(t))t[a]&&typeof t[a]=="object"&&!Array.isArray(t[a])?s[a]=te(e[a]||{},t[a]):s[a]=t[a];return s}let D=null;const Z=new Set;function w(){return D||(D=me()),D}function L(e){const t=w();return typeof e=="function"?D=e(t):D={...t,...e},fe(D),Fe(),D}function je(e){return Z.add(e),()=>Z.delete(e)}function Fe(){Z.forEach(e=>e(D))}function Me(e){return L(t=>{const s=t.xp+e,a=se(s),n=a>t.level;return{...t,xp:s,level:a,profile:{...t.profile,title:ae(a)},_leveledUp:n,_prevLevel:t.level}})}function Ne(e){return L(t=>({...t,hasanat:t.hasanat+e}))}function Re(e){const t=w();return t.hasanat<e?!1:(L({hasanat:t.hasanat-e}),!0)}function ge(e,t,s,a){return L(n=>{const o=Ue(t,s,a),d=a?10:5,i=n.xp+o,r=se(i);return{...n,xp:i,level:r,hasanat:n.hasanat+d,profile:{...n.profile,title:ae(r)},completedLessons:{...n.completedLessons,[e]:{completedAt:new Date().toISOString(),score:t,total:s,perfect:a}},stats:{...n.stats,totalLessons:n.stats.totalLessons+1,totalCorrect:n.stats.totalCorrect+t,totalQuestions:n.stats.totalQuestions+s,perfectLessons:n.stats.perfectLessons+(a?1:0)},_xpEarned:o,_hasanatEarned:d,_leveledUp:r>n.level}})}function he(e){return L(t=>{const s=t.favoriteEvidence||[],a=s.indexOf(e);return{...t,favoriteEvidence:a>=0?s.filter(n=>n!==e):[...s,e]}})}function He(e){const t=new Date().toISOString().slice(0,10);return L(s=>{const a={...s.habitLog};return a[t]||(a[t]=[]),a[t].includes(e)||(a[t]=[...a[t],e]),{...s,habitLog:a}})}function ye(e,t){return L(s=>({...s,sunnahPractice:{...s.sunnahPractice,[e]:t}}))}function Ue(e,t,s){const a=e*10,n=s?t*5:0;return a+n+50}const R=[0,100,250,450,700,1e3,1400,1900,2500,3200,4e3,5e3,6200,7600,9200,11e3,13e3,15500,18500,22e3,26e3,30500,35500,41e3,47e3,54e3,62e3,71e3,81e3,92e3,104e3,118e3,134e3,152e3,172e3,195e3,22e4,25e4,285e3,325e3,37e4,42e4,48e4,55e4,63e4,72e4,82e4,94e4,108e4,125e4];function se(e){for(let t=R.length-1;t>=0;t--)if(e>=R[t])return t+1;return 1}function Xe(e){return e>=R.length?1/0:R[e]}function ne(){const e=w(),t=R[e.level-1]||0,s=R[e.level]||t+1e3,a=e.xp-t,n=s-t;return{progress:a,needed:n,percentage:Math.min(100,a/n*100)}}function ae(e){return e<=5?"مبتدئ":e<=10?"طالب":e<=15?"متعلم":e<=20?"ممارس":e<=25?"حافظ":e<=30?"مُحيي":e<=35?"قدوة":e<=40?"عالم بالسنة":"إمام السنن"}const M=Object.freeze(Object.defineProperty({__proto__:null,addHasanat:Ne,addXP:Me,calculateLevel:se,completeLesson:ge,getLevelTitle:ae,getState:w,getXPForNextLevel:Xe,getXPProgress:ne,logHabit:He,setState:L,setSunnahPractice:ye,spendHasanat:Re,subscribe:je,toggleFavoriteEvidence:he},Symbol.toStringTag,{value:"Module"}));function Ve(){const e=w(),t=ie(),s=xe(),a=e.streak.lastActiveDate;if(a===t||a===s)return e.streak;if(e.streak.fridayExemption&&Ye(a?new Date(a):null)){const n=Je();if(a===n)return e.streak}if(a&&a!==t&&a!==s){if(e.streak.shields>0)return L(n=>({...n,streak:{...n.streak,shields:n.streak.shields-1}})),w().streak;e.streak.current>0&&L(n=>({...n,streak:{...n.streak,current:0}}))}return w().streak}function Ge(){const e=ie(),t=w();if(t.streak.lastActiveDate===e)return t.streak;const s=xe(),n=!t.streak.lastActiveDate||t.streak.lastActiveDate===s?t.streak.current+1:1,o=Math.max(n,t.streak.longest),d=n>0&&n%7===0?Math.min(3,t.streak.shields+1):t.streak.shields;return L(i=>({...i,streak:{...i.streak,current:n,longest:o,lastActiveDate:e,shields:d}})),w().streak}function Qe(e){return e>=365?{name:"سنة كاملة",icon:"👑",tier:"legendary"}:e>=180?{name:"إحياء",icon:"⭐",tier:"epic"}:e>=90?{name:"استقامة",icon:"🌙",tier:"rare"}:e>=40?{name:"هداية",icon:"🌟",tier:"rare"}:e>=21?{name:"نور",icon:"☀️",tier:"uncommon"}:e>=14?{name:"لهب",icon:"🔥",tier:"uncommon"}:e>=7?{name:"جمرة",icon:"🔥",tier:"common"}:{name:"شرارة",icon:"🔥",tier:"common"}}function be(){const e=w(),t=Qe(e.streak.current);return{days:e.streak.current,longest:e.streak.longest,shields:e.streak.shields,milestone:t,isActive:e.streak.lastActiveDate===ie()}}function ie(){return new Date().toISOString().slice(0,10)}function xe(){const e=new Date;return e.setDate(e.getDate()-1),e.toISOString().slice(0,10)}function Je(){const e=new Date;return e.setDate(e.getDate()-2),e.toISOString().slice(0,10)}function Ye(e){return e&&e.getDay()===5}const Ke=[{route:"home",icon:"🏠",label:"الرئيسية"},{route:"evidence",icon:"📖",label:"الأدلة"},{route:"habits",icon:"📅",label:"سجل العمل"},{route:"achievements",icon:"🏅",label:"الإنجازات"},{route:"profile",icon:"👤",label:"حسابي"}];function C(){const e=ve();return`
    <nav class="bottom-nav" id="bottomNav">
      ${Ke.map(t=>`
        <a href="#${t.route}" class="nav-item ${e===t.route?"active":""}" data-route="${t.route}">
          <span class="nav-item-icon">${t.icon}</span>
          <span>${t.label}</span>
        </a>
      `).join("")}
    </nav>
  `}function We(){const e=w(),t=ne(),s=be();return{html:`
    <div class="screen screen-padded">
      <!-- Header -->
      <div class="home-header">
        <div class="home-header-top">
          <div class="home-logo">
            <span class="home-logo-icon">☪️</span>
            <span class="home-logo-text">السُّنَّة</span>
          </div>
          <div class="home-header-stats">
            <div class="streak-display" id="streakDisplay">
              <span class="streak-fire">${s.milestone.icon}</span>
              <span style="color: var(--streak-fire)">${s.days}</span>
            </div>
            <div class="xp-display">
              <span class="level-badge">${e.level}</span>
            </div>
          </div>
        </div>
        
        <!-- XP Progress -->
        <div class="home-xp-section">
          <div class="flex justify-between items-center mb-sm">
            <span class="text-muted" style="font-size: var(--fs-xs)">المستوى ${e.level} — ${e.profile.title}</span>
            <span class="text-gold" style="font-size: var(--fs-xs)">${Math.floor(t.progress)} / ${t.needed} XP</span>
          </div>
          <div class="progress-bar">
            <div class="progress-bar-fill" style="width: ${t.percentage}%"></div>
          </div>
        </div>

        <!-- Hasanat -->
        <div class="home-hasanat">
          <span>💰</span>
          <span style="color: var(--gold); font-weight: 700">${e.hasanat}</span>
          <span class="text-muted" style="font-size: var(--fs-xs)">نقطة</span>
        </div>
      </div>

      <!-- Sunnah Tree Banner -->
      <a href="#profile" class="tree-banner" id="treeBanner" style="text-decoration: none; color: inherit; -webkit-tap-highlight-color: transparent">
        <div class="tree-visual" id="treeVisual">
          ${et(e)}
        </div>
        <div class="tree-info">
          <div style="font-size: var(--fs-lg); font-weight: 700">🌳 شجرة السنن</div>
          <div class="text-muted" style="font-size: var(--fs-sm)">
            تعلّمت ${we(e)} من ${$e()} سنة
          </div>
          <div class="progress-bar progress-bar-sm mt-sm">
            <div class="progress-bar-fill" style="width: ${ke(e)}%"></div>
          </div>
          <div class="text-muted" style="font-size: var(--fs-xs); margin-top: 4px">اضغط لعرض التقدم الكامل ←</div>
        </div>
      </a>

      <!-- Categories -->
      <h2 class="section-title">مسار التعلّم</h2>
      <div class="categories-list">
        ${O.map((n,o)=>Ze(n,e,o)).join("")}
      </div>

      <!-- Quick Review -->
      ${tt(e)?`
        <div class="review-banner mt-xl stagger-item" style="animation-delay: ${O.length*80}ms">
          <div class="review-banner-icon">🔄</div>
          <div class="review-banner-text">
            <div style="font-weight: 700">مراجعة مطلوبة!</div>
            <div class="text-muted" style="font-size: var(--fs-sm)">بعض الوحدات تحتاج مراجعة</div>
          </div>
          <a href="#review" class="btn btn-sm btn-secondary">مراجعة</a>
        </div>
      `:""}
    </div>
    ${C()}
  `,mount(){const n=document.getElementById("treeBanner");n&&n.addEventListener("click",()=>{const o=n.querySelector(".tree-emoji");o&&(o.style.animation="none",requestAnimationFrame(()=>{o.style.animation="bounceIn 0.5s ease"})),F(()=>Promise.resolve().then(()=>M),void 0).then(d=>{d.setState(i=>({...i,stats:{...i.stats,treeClicks:(i.stats.treeClicks||0)+1}}))})})}}}function Ze(e,t,s){const a=e.units.map(r=>q[r]).filter(Boolean),n=a.reduce((r,p)=>r+p.lessons.length,0),o=a.reduce((r,p)=>r+p.lessons.filter(c=>t.completedLessons[c]).length,0),d=n>0?o/n*100:0,i=d===100;return`
    <a href="#category?id=${e.id}" class="category-card stagger-item" style="animation-delay: ${s*80}ms">
      <div class="category-icon" style="background: ${e.color}15; color: ${e.color}">
        ${e.icon}
      </div>
      <div class="category-info">
        <div class="category-name">${e.name} ${i?"✅":""}</div>
        <div class="category-desc">${e.description}</div>
        <div class="progress-bar progress-bar-sm">
          <div class="progress-bar-fill" style="width: ${d}%"></div>
        </div>
        <div class="text-muted" style="font-size: var(--fs-xs); margin-top: 4px">
          ${o}/${n} درس
        </div>
      </div>
      <div style="font-size: 20px; color: var(--text-muted)">‹</div>
    </a>
  `}function et(e){const t=ke(e);let s;return t===0?s="🌱":t<25?s="🌿":t<50?s="🌲":t<75?s="🌳":t<100?s="🌸":s="✨🌳✨",`<div class="tree-emoji animate-float">${s}</div>`}function we(e){return Object.keys(e.completedLessons).length}function $e(){return Object.values(q).reduce((e,t)=>e+t.lessons.length,0)}function ke(e){const t=$e();return t===0?0:we(e)/t*100}function tt(e){const t=Date.now();return Object.values(e.completedLessons).some(s=>t-new Date(s.completedAt).getTime()>10080*60*1e3)}function st(e){const t=e.id,s=O.find(d=>d.id===t);if(!s)return{html:'<div class="screen"><p>الفئة غير موجودة</p></div>',mount(){}};const a=w(),n=s.units.map(d=>q[d]).filter(Boolean).sort((d,i)=>d.order-i.order);return{html:`
    <div class="screen">
      <div class="screen-header">
        <a href="#home" class="screen-header-back">›</a>
        <span class="screen-header-title">${s.icon} ${s.name}</span>
        <div></div>
      </div>

      <div class="screen-padded">
        <!-- Category Progress -->
        <div class="card card-gold mb-lg animate-fade-in">
          <div class="flex items-center gap-md mb-md">
            <div class="category-icon" style="background: ${s.color}20; color: ${s.color}; font-size: 48px; width: 64px; height: 64px">
              ${s.icon}
            </div>
            <div>
              <div style="font-size: var(--fs-lg); font-weight: 700">${s.name}</div>
              <div class="text-muted" style="font-size: var(--fs-sm)">${s.description}</div>
            </div>
          </div>
          <div class="progress-bar">
            <div class="progress-bar-fill" style="width: ${at(s,a)}%"></div>
          </div>
          <div class="text-muted mt-sm" style="font-size: var(--fs-xs); text-align: center">
            ${Le(s,a)} / ${Ee(s)} درس مكتمل
          </div>
        </div>

        <!-- Learning Path (Units) -->
        <div class="learning-path">
          ${n.map((d,i)=>nt(d,a,i,n)).join("")}
        </div>
      </div>
    </div>
    ${C()}
  `,mount(){}}}function nt(e,t,s,a){const n=e.lessons,o=n.filter(y=>t.completedLessons[y]).length,d=n.length,i=o===d,r=s>0?a[s-1]:null,p=!r||r.lessons.every(y=>t.completedLessons[y]),c=s>0&&!p,x=i?"completed":!c&&!i?"current":"locked",b=n.find(y=>!t.completedLessons[y])||n[0],v=s<a.length-1?`
    <div class="path-connector ${i?"path-connector-done":""}"></div>
  `:"";return`
    <div class="unit-path-item stagger-item" style="animation-delay: ${s*100}ms">
      <div class="unit-node ${x}" ${c?"":`onclick="location.hash='#lesson?id=${b}'"`}>
        <div class="unit-circle">
          ${i?"✅":c?"🔒":e.icon}
        </div>
        <div class="unit-label">${e.name}</div>
        ${!c&&!i?`
          <div class="unit-progress-ring">
            <span class="text-muted" style="font-size: var(--fs-xs)">${o}/${d}</span>
          </div>
        `:""}
      </div>
      ${v}
    </div>
  `}function at(e,t){const s=Ee(e);return s===0?0:Le(e,t)/s*100}function Le(e,t){return e.units.reduce((s,a)=>{const n=q[a];return s+(n?n.lessons.filter(o=>t.completedLessons[o]).length:0)},0)}function Ee(e){return e.units.reduce((t,s)=>{const a=q[s];return t+(a?a.lessons.length:0)},0)}let m={phase:"exercise",exerciseIndex:0,score:0,total:0,answers:[]};function it(e){const t=e.id,s=N[t];if(!s)return{html:'<div class="screen"><p>السنة غير موجودة</p></div>',mount(){}};const a=q[s.unitId],n=O.find(d=>d.id===a?.categoryId);return m={sunnahId:t,phase:"exercise",exerciseIndex:0,score:0,total:s.exercises.length,answers:[],startTime:Date.now()},{html:`
    <div class="screen lesson-screen" id="lessonScreen">
      <!-- Lesson Header -->
      <div class="lesson-header">
        <button class="btn-icon btn-ghost" id="lessonClose" onclick="location.hash='#category?id=${n?.id||"food"}'">✕</button>
        <div class="lesson-progress-container">
          <div style="text-align: center; flex-shrink: 0">
            <div style="font-weight: 700; font-size: var(--fs-sm)">${n?.name||""}</div>
            <div class="text-muted" style="font-size: var(--fs-xs)" id="lessonProgressText">السؤال 1 من ${s.exercises.length}</div>
          </div>
          <div class="progress-bar" style="flex: 1">
            <div class="progress-bar-fill" id="lessonProgressFill" style="width: 0%"></div>
          </div>
          <div style="display: flex; align-items: center; gap: 4px; flex-shrink: 0">
            <span id="lessonScoreText" style="font-weight: 700; color: var(--gold)">0</span>
            <span style="font-size: 16px">⭐</span>
          </div>
        </div>
      </div>

      <!-- Dynamic Content Area -->
      <div class="lesson-content" id="lessonContent"></div>

      <!-- Bottom Action Area -->
      <div class="lesson-action" id="lessonAction">
        <button class="btn btn-primary btn-block btn-lg" id="lessonActionBtn" disabled>
          تحقق ✓
        </button>
      </div>
    </div>
  `,mount(){const d=document.getElementById("lessonContent");document.getElementById("lessonAction");function i(){return document.getElementById("lessonActionBtn")}function r(l){const u=i();if(!u)return null;const g=u.cloneNode(!0);return g.id="lessonActionBtn",u.parentNode.replaceChild(g,u),l&&g.addEventListener("click",l),g}c();function p(){if(m.phase==="feedback")m.exerciseIndex++,m.exerciseIndex>=m.total?V():(m.phase="exercise",c());else if(m.phase==="results"){const l=q[s.unitId];Y("category",{id:l?.categoryId||"food"})}}function c(){const l=s.exercises[m.exerciseIndex];d.innerHTML=ot(l,m.exerciseIndex),H();const u=r(null);u.textContent="تحقق ✓",u.disabled=!0,u.classList.remove("btn-success","btn-error"),u.classList.add("btn-primary"),f(l)}function f(l){l.type==="mcq"||l.type==="evidence"||l.type==="fill"?document.querySelectorAll(".option-btn").forEach(u=>{u.addEventListener("click",()=>{document.querySelectorAll(".option-btn").forEach(h=>h.classList.remove("selected")),u.classList.add("selected");const g=r(()=>{const h=parseInt(u.dataset.index);x(l,h)});g.disabled=!1})}):l.type==="truefalse"?document.querySelectorAll(".tf-btn").forEach(u=>{u.addEventListener("click",()=>{document.querySelectorAll(".tf-btn").forEach(h=>h.classList.remove("selected")),u.classList.add("selected");const g=r(()=>{const h=u.dataset.value==="true";b(l,h)});g.disabled=!1})}):l.type==="order"&&E(l)}function x(l,u){const g=l.correct??0,h=u===g;m.answers.push({exerciseIndex:m.exerciseIndex,isCorrect:h,selected:u}),h&&m.score++,v(h,l,u)}function b(l,u){const g=u===l.correct;m.answers.push({exerciseIndex:m.exerciseIndex,isCorrect:g,selected:u}),g&&m.score++,y(g,l)}function v(l,u,g){m.phase="feedback";const h=u.correct??0;document.querySelectorAll(".option-btn").forEach((_,G)=>{G===h&&_.classList.add("correct"),G===g&&!l&&_.classList.add("wrong"),_.style.pointerEvents="none"});const $=s.evidence?`
          <div class="feedback-evidence">
            <div class="evidence-card" style="margin-top: var(--space-md)">
              <div class="evidence-text" style="font-size: var(--fs-sm); line-height: 1.8">${s.evidence.text}</div>
              <div class="evidence-source">
                <span class="evidence-grade grade-${s.evidence.grade}">${X(s.evidence.grade)}</span>
                <span>${s.evidence.source}</span>
              </div>
            </div>
          </div>
        `:"";l&&K("+15 XP");const k=document.createElement("div");k.className=`lesson-feedback animate-slide-up ${l?"feedback-correct":"feedback-wrong"}`,k.innerHTML=`
          <div class="feedback-title">${l?"✅ أحسنت!":"❌ إجابة خاطئة"}</div>
          ${l?"":`<div class="feedback-text">الإجابة الصحيحة: ${ct(u)}</div>`}
          ${$}
        `,d.appendChild(k),k.scrollIntoView({behavior:"smooth"});const I=r(p);I.textContent=m.exerciseIndex<m.total-1?"التالي ←":"النتائج 🎉",I.disabled=!1,I.classList.remove("btn-primary"),I.classList.add(l?"btn-success":"btn-error")}function y(l,u){m.phase="feedback",document.querySelectorAll(".tf-btn").forEach(k=>{const I=k.dataset.value==="true";I===u.correct&&k.classList.add("correct"),I!==u.correct&&k.classList.contains("selected")&&k.classList.add("wrong"),k.style.pointerEvents="none"});const g=s.evidence?`
          <div class="evidence-card" style="margin-top: var(--space-md)">
            <div class="evidence-text" style="font-size: var(--fs-sm); line-height: 1.8">${s.evidence.text}</div>
            <div class="evidence-source">
              <span class="evidence-grade grade-${s.evidence.grade}">${X(s.evidence.grade)}</span>
              <span>${s.evidence.source}</span>
            </div>
          </div>
        `:"";l&&K("+15 XP");const h=document.createElement("div");h.className=`lesson-feedback animate-slide-up ${l?"feedback-correct":"feedback-wrong"}`,h.innerHTML=`
          <div class="feedback-title">${l?"✅ أحسنت!":"❌ إجابة خاطئة"}</div>
          ${u.explanation?`<div class="feedback-text">${u.explanation}</div>`:""}
          ${g}
        `,d.appendChild(h),h.scrollIntoView({behavior:"smooth"});const $=r(p);$.textContent=m.exerciseIndex<m.total-1?"التالي ←":"النتائج 🎉",$.disabled=!1,$.classList.remove("btn-primary"),$.classList.add(l?"btn-success":"btn-error")}function E(l){const u=document.querySelectorAll(".order-item");let g=[];u.forEach(h=>{h.addEventListener("click",()=>{const $=parseInt(h.dataset.index);if(g.includes($)?(g=g.filter(k=>k!==$),h.classList.remove("selected"),h.querySelector(".order-number").textContent=""):(g.push($),h.classList.add("selected"),h.querySelector(".order-number").textContent=g.length),g.length===l.items.length){const k=r(()=>{const I=JSON.stringify(g)===JSON.stringify(l.correctOrder);m.answers.push({exerciseIndex:m.exerciseIndex,isCorrect:I,selected:g}),I&&m.score++,B(I,l)});k.disabled=!1}})})}function B(l,u){m.phase="feedback",l&&K("+15 XP");const g=document.createElement("div");g.className=`lesson-feedback animate-slide-up ${l?"feedback-correct":"feedback-wrong"}`,g.innerHTML=`
          <div class="feedback-title">${l?"✅ ترتيب صحيح!":"❌ ترتيب خاطئ"}</div>
          ${l?"":`<div class="feedback-text">الترتيب الصحيح: ${u.correctOrder.map($=>u.items[$]).join(" ← ")}</div>`}
        `,d.appendChild(g),g.scrollIntoView({behavior:"smooth"});const h=r(p);h.textContent=m.exerciseIndex<m.total-1?"التالي ←":"النتائج 🎉",h.disabled=!1,h.classList.remove("btn-primary"),h.classList.add(l?"btn-success":"btn-error")}function V(){m.phase="results";const l=m.score===m.total,u=Math.round(m.score/m.total*100),g=ge(t,m.score,m.total,l);Ge();const h=new Date().getHours();h<5&&F(()=>Promise.resolve().then(()=>M),void 0).then(A=>{A.setState(S=>({...S,stats:{...S.stats,earlyMorning:(S.stats.earlyMorning||0)+1}}))}),h>=21&&F(()=>Promise.resolve().then(()=>M),void 0).then(A=>{A.setState(S=>({...S,stats:{...S.stats,lateNight:(S.stats.lateNight||0)+1}}))}),new Date().getDay()===5&&F(()=>Promise.resolve().then(()=>M),void 0).then(A=>{A.setState(S=>({...S,stats:{...S.stats,fridayLessons:(S.stats.fridayLessons||0)+1}}))});const $=l?"🎉":u>=70?"👏":"💪",k=l?"درس مثالي!":u>=70?"أحسنت!":"حاول مرة ثانية!",I=l?"ما شاء الله، أجبت على كل الأسئلة بشكل صحيح":"راجع السنن وحاول مرة ثانية";d.innerHTML=`
          <div class="results-screen animate-scale-in">
            <div class="results-emoji">${$}</div>
            <div class="results-title">${k}</div>
            <div class="results-subtitle text-muted">${I}</div>

            <!-- Score Card -->
            <div class="card" style="text-align: center; margin-top: var(--space-lg)">
              <div style="font-size: var(--fs-4xl); font-weight: 800; color: var(--gold)">${u}%</div>
              <div class="text-muted" style="margin-bottom: var(--space-md)">${m.score} إجابة صحيحة من ${m.total}</div>
              <div class="progress-bar progress-bar-lg">
                <div class="progress-bar-fill" style="width: ${u}%; background: ${u>=70?"var(--success)":"var(--error)"}"></div>
              </div>
              <div class="results-stats" style="margin-top: var(--space-md)">
                <div class="results-stat">
                  <div class="results-stat-value" style="color: var(--error)">${m.total-m.score}</div>
                  <div class="results-stat-label">خطأ</div>
                </div>
                <div style="width: 1px; background: rgba(255,255,255,0.1); align-self: stretch"></div>
                <div class="results-stat">
                  <div class="results-stat-value" style="color: var(--success)">${m.score}</div>
                  <div class="results-stat-label">صحيح</div>
                </div>
              </div>
            </div>

            <div class="results-rewards">
              <div class="reward-item animate-slide-up" style="animation-delay: 200ms">
                <span>⭐</span>
                <span>+${g._xpEarned||0} XP</span>
              </div>
              <div class="reward-item animate-slide-up" style="animation-delay: 400ms">
                <span>💰</span>
                <span>+${g._hasanatEarned||0} نقطة</span>
              </div>
              ${l?'<div class="reward-item animate-bounce-in" style="animation-delay: 600ms"><span>🏆</span><span>درس مثالي!</span></div>':""}
            </div>

            <!-- Full Lesson Summary (shown AFTER quiz) -->
            <div style="margin-top: var(--space-xl)">
              <div style="font-size: var(--fs-lg); font-weight: 700; margin-bottom: var(--space-md); text-align: center">📖 ما تعلمناه</div>
              <div class="card" style="margin-bottom: var(--space-md)">
                <h3 style="color: var(--gold); margin-bottom: var(--space-sm)">${s.name}</h3>
                <p style="color: var(--text-secondary); line-height: 1.8">${s.explanation}</p>
                <div class="learn-meta" style="margin-top: var(--space-md)">
                  <div class="learn-meta-item">
                    <span class="learn-meta-icon">⏰</span>
                    <span>${s.whenToApply}</span>
                  </div>
                  <div class="learn-meta-item">
                    <span class="learn-meta-icon">💡</span>
                    <span>${s.benefit}</span>
                  </div>
                </div>
                ${s.spiritualBenefit?`
                  <div class="spiritual-note">
                    <span>🤲</span>
                    <span>${s.spiritualBenefit}</span>
                  </div>
                `:""}
              </div>

              <!-- Evidence -->
              <div class="evidence-card">
                <div style="font-size: var(--fs-sm); color: var(--gold); margin-bottom: var(--space-sm); font-weight: 700">📜 الدليل</div>
                <div class="evidence-text" style="font-size: var(--fs-sm)">${s.evidence.text}</div>
                <div class="evidence-source mt-sm">
                  <span class="evidence-grade grade-${s.evidence.grade}">${X(s.evidence.grade)}</span>
                  <span>${s.evidence.source} — ${s.evidence.narrator}</span>
                </div>
                <div class="text-muted mt-sm" style="font-size: var(--fs-xs)">${s.evidence.book}</div>
              </div>

              <!-- Practice Survey (New Feature) -->
              <div class="practice-survey card" style="margin-top: var(--space-lg); border: 1px solid var(--border)">
                <div style="text-align: center; margin-bottom: var(--space-md)">
                  <div style="font-size: var(--fs-lg); font-weight: 700; color: var(--gold)">هل تطبق هذه السنة؟</div>
                  <div class="text-muted" style="font-size: var(--fs-sm); margin-top: 4px">تقييمك الذاتي يساعدك في التذكر وتحسين تطبيقك</div>
                </div>
                
                <div class="practice-options" id="practiceSurveyOptions">
                  <button class="practice-option" data-level="always">
                    <span class="po-icon">✅</span>
                    <span class="po-text">دائماً</span>
                  </button>
                  <button class="practice-option" data-level="often">
                    <span class="po-icon">🟢</span>
                    <span class="po-text">غالباً</span>
                  </button>
                  <button class="practice-option" data-level="sometimes">
                    <span class="po-icon">🟡</span>
                    <span class="po-text">أحياناً</span>
                  </button>
                  <button class="practice-option" data-level="rarely">
                    <span class="po-icon">🟠</span>
                    <span class="po-text">نادراً</span>
                  </button>
                  <button class="practice-option" data-level="never">
                    <span class="po-icon">❌</span>
                    <span class="po-text">لا أطبقها</span>
                  </button>
                </div>
                <div id="practiceSurveyThanks" style="display: none; text-align: center; color: var(--success); font-weight: bold; margin-top: var(--space-md); animation: fadeIn 0.3s">
                  تم حفظ إجابتك! سنذكرك بها في سجل العمل
                </div>
              </div>

            </div>
          </div>
        `;const _=document.getElementById("lessonAction");_&&(_.innerHTML=`
            <button class="btn ${u>=70,"btn-primary"} btn-block btn-lg" id="lessonActionBtn">
              ${u>=70?"متابعة ←":"🔄 أعد المحاولة"}
            </button>
            ${u<70?'<button class="btn btn-secondary btn-block" id="lessonSkipBtn" style="margin-top: var(--space-sm)">رجوع للقائمة</button>':""}
          `),F(async()=>{const{getState:A,setSunnahPractice:S}=await Promise.resolve().then(()=>M);return{getState:A,setSunnahPractice:S}},void 0).then(({getState:A,setSunnahPractice:S})=>{const re=A().sunnahPractice?.[t],Q=document.querySelectorAll(".practice-option");re&&Q.forEach(j=>{j.dataset.level===re&&j.classList.add("selected")}),Q.forEach(j=>{j.addEventListener("click",()=>{Q.forEach(qe=>qe.classList.remove("selected")),j.classList.add("selected"),S(t,j.dataset.level);const J=document.getElementById("practiceSurveyThanks");J&&(J.style.display="block",setTimeout(()=>J.style.display="none",3e3))})})}),document.getElementById("lessonActionBtn").addEventListener("click",()=>{u>=70?Y("category",{id:n?.id||"food"}):location.hash=`#lesson?id=${t}`});const oe=document.getElementById("lessonSkipBtn");oe&&oe.addEventListener("click",()=>{Y("category",{id:n?.id||"food"})}),l&&rt(),H()}function H(){const l=document.getElementById("lessonProgressFill"),u=document.getElementById("lessonProgressText"),g=document.getElementById("lessonScoreText"),h=m.exerciseIndex+(m.phase==="results"?1:0);if(l){const $=h/m.total*100;l.style.width=`${$}%`}u&&(u.textContent=`السؤال ${Math.min(h+1,m.total)} من ${m.total}`),g&&(g.textContent=m.score)}}}}function ot(e,t){switch(e.type){case"mcq":case"evidence":case"fill":return`
        <div class="exercise animate-slide-up">
          <div class="exercise-icon-wrapper">❓</div>
          <div class="exercise-type-badge badge badge-gold">
            ${e.type==="mcq"?"اختيار من متعدد":e.type==="evidence"?"اختر الدليل":"أكمل الفراغ"}
          </div>
          <h3 class="exercise-question">${e.question}</h3>
          <div class="options-list">
            ${e.options.map((a,n)=>`
              <button class="option-btn" data-index="${n}">
                <span class="option-letter">${n+1}</span>
                <span class="option-text">${a}</span>
              </button>
            `).join("")}
          </div>
        </div>
      `;case"truefalse":return`
        <div class="exercise animate-slide-up">
          <div class="exercise-type-badge badge badge-gold">صح أو خطأ</div>
          <h3 class="exercise-question">${e.question}</h3>
          <div class="tf-options">
            <button class="tf-btn tf-true" data-value="true">
              <span class="tf-icon">✓</span>
              <span>صح</span>
            </button>
            <button class="tf-btn tf-false" data-value="false">
              <span class="tf-icon">✕</span>
              <span>خطأ</span>
            </button>
          </div>
        </div>
      `;case"order":const s=e.items.map((a,n)=>({item:a,origIdx:n}));for(let a=s.length-1;a>0;a--){const n=Math.floor(Math.random()*(a+1));[s[a],s[n]]=[s[n],s[a]]}return`
        <div class="exercise animate-slide-up">
          <div class="exercise-type-badge badge badge-gold">رتّب الخطوات</div>
          <h3 class="exercise-question">${e.question}</h3>
          <div class="order-list">
            ${s.map(({item:a,origIdx:n})=>`
              <button class="order-item" data-index="${n}">
                <span class="order-number"></span>
                <span class="order-text">${a}</span>
              </button>
            `).join("")}
          </div>
        </div>
      `;default:return'<div class="exercise"><p>نوع تمرين غير مدعوم</p></div>'}}function X(e){switch(e){case"muttafaq":return"🟢 متفق عليه";case"sahih":return"🔵 صحيح";case"hasan":return"🟡 حسن";case"quran":return"📖 آية قرآنية";default:return e}}function K(e){const t=document.createElement("div");t.className="xp-popup",t.textContent=e,t.style.top="40%",t.style.left="50%",t.style.transform="translateX(-50%)",document.body.appendChild(t),setTimeout(()=>t.remove(),1e3)}function rt(){const e=["#D4AF37","#F5D061","#FFD700","#FF6B35","#00C853","#448AFF"];for(let t=0;t<30;t++){const s=document.createElement("div");s.className="confetti-piece",s.style.left=`${Math.random()*100}%`,s.style.backgroundColor=e[Math.floor(Math.random()*e.length)],s.style.animationDelay=`${Math.random()*500}ms`,s.style.animationDuration=`${1.5+Math.random()*1}s`,document.body.appendChild(s),setTimeout(()=>s.remove(),3e3)}}function ct(e){return e.type==="fill"?e.answer||e.options[0]:e.type==="truefalse"?e.correct?"صحيح":"خطأ":e.options?.[e.correct]||""}function dt(){const e=w(),t=ne(),s=be(),a=e.stats.totalQuestions>0?Math.round(e.stats.totalCorrect/e.stats.totalQuestions*100):0,n=ze(),o=Object.keys(e.completedLessons).length;return{html:`
    <div class="screen screen-padded">
      <div class="screen-header" style="padding: 0; margin-bottom: var(--space-lg)">
        <span class="screen-header-title">حسابي</span>
        <a href="#settings" class="btn-icon btn-ghost">⚙️</a>
      </div>

      <!-- Profile Card -->
      <div class="card card-gold mb-lg animate-fade-in" style="text-align: center; padding: var(--space-2xl)">
        <div class="profile-avatar">${e.profile.icon}</div>
        <div style="font-size: var(--fs-xl); font-weight: 800; margin-top: var(--space-md)">${e.profile.name}</div>
        <div class="badge badge-level mt-sm">${e.profile.title} — المستوى ${e.level}</div>
        
        <!-- XP Bar -->
        <div class="mt-lg">
          <div class="flex justify-between items-center mb-sm">
            <span class="text-muted" style="font-size: var(--fs-xs)">المستوى ${e.level}</span>
            <span class="text-gold" style="font-size: var(--fs-xs)">${e.xp} XP</span>
          </div>
          <div class="progress-bar">
            <div class="progress-bar-fill" style="width: ${t.percentage}%"></div>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="stats-grid mb-lg">
        <div class="stat-card stagger-item">
          <div class="stat-value">${s.days}</div>
          <div class="stat-label">${s.milestone.icon} سلسلة يومية</div>
        </div>
        <div class="stat-card stagger-item">
          <div class="stat-value">${e.hasanat}</div>
          <div class="stat-label">💰 نقطة</div>
        </div>
        <div class="stat-card stagger-item">
          <div class="stat-value">${o}</div>
          <div class="stat-label">📚 سنة تعلّمتها</div>
        </div>
        <div class="stat-card stagger-item">
          <div class="stat-value">${a}%</div>
          <div class="stat-label">🎯 دقة الإجابات</div>
        </div>
      </div>

      <!-- Detailed Stats -->
      <h3 class="section-title">📊 الإحصائيات التفصيلية</h3>
      <div class="card mb-lg">
        <div class="detail-stat">
          <span class="text-muted">إجمالي الدروس</span>
          <span class="text-gold" style="font-weight: 700">${e.stats.totalLessons}</span>
        </div>
        <div class="divider"></div>
        <div class="detail-stat">
          <span class="text-muted">الدروس المثالية</span>
          <span style="font-weight: 700; color: var(--success)">${e.stats.perfectLessons} 🏆</span>
        </div>
        <div class="divider"></div>
        <div class="detail-stat">
          <span class="text-muted">إجمالي الأسئلة</span>
          <span style="font-weight: 700">${e.stats.totalQuestions}</span>
        </div>
        <div class="divider"></div>
        <div class="detail-stat">
          <span class="text-muted">الإجابات الصحيحة</span>
          <span style="font-weight: 700; color: var(--success)">${e.stats.totalCorrect}</span>
        </div>
        <div class="divider"></div>
        <div class="detail-stat">
          <span class="text-muted">أطول سلسلة</span>
          <span style="font-weight: 700; color: var(--streak-fire)">${s.longest} 🔥</span>
        </div>
        <div class="divider"></div>
        <div class="detail-stat">
          <span class="text-muted">دروع السلسلة</span>
          <span style="font-weight: 700">${s.shields} 🛡️</span>
        </div>
        <div class="divider"></div>
        <div class="detail-stat">
          <span class="text-muted">بداية الرحلة</span>
          <span class="text-muted">${e.stats.startDate?new Date(e.stats.startDate).toLocaleDateString("ar-SA"):"—"}</span>
        </div>
      </div>

      <!-- Sunnah Progress Overview -->
      <h3 class="section-title">🌳 تقدم السنن</h3>
      <div class="card mb-xl">
        <div class="progress-bar progress-bar-lg mb-sm">
          <div class="progress-bar-fill" style="width: ${n>0?o/n*100:0}%"></div>
        </div>
        <div class="text-center text-muted" style="font-size: var(--fs-sm)">
          ${o} / ${n} سنة
        </div>
      </div>
    </div>
    ${C()}
  `,mount(){}}}function lt(){const e=w(),t=Pe();return{html:`
    <div class="screen screen-padded">
      <div class="screen-header" style="padding: 0; margin-bottom: var(--space-lg)">
        <span class="screen-header-title">📖 مكتبة الأدلة</span>
        <span class="badge badge-gold">${t.length} دليل</span>
      </div>

      <!-- Filter Tabs -->
      <div class="filter-tabs mb-lg" id="filterTabs">
        <button class="filter-tab active" data-filter="all">الكل</button>
        ${O.map(a=>`
          <button class="filter-tab" data-filter="${a.id}">${a.icon} ${a.name.split(" ").pop()}</button>
        `).join("")}
        <button class="filter-tab" data-filter="favorites">⭐ المفضلة</button>
      </div>

      <!-- Search -->
      <div class="search-box mb-lg">
        <span class="search-icon">🔍</span>
        <input type="text" id="evidenceSearch" class="search-input" placeholder="ابحث في الأحاديث والآيات..." />
      </div>

      <!-- Evidence List -->
      <div class="evidence-list" id="evidenceList">
        ${le(t,e)}
      </div>
    </div>
    ${C()}
  `,mount(){const a=document.getElementById("evidenceList"),n=document.getElementById("evidenceSearch"),o=document.getElementById("filterTabs");let d="all";o.addEventListener("click",r=>{const p=r.target.closest(".filter-tab");p&&(o.querySelectorAll(".filter-tab").forEach(c=>c.classList.remove("active")),p.classList.add("active"),d=p.dataset.filter,i())}),n.addEventListener("input",()=>i()),a.addEventListener("click",r=>{const p=r.target.closest(".evidence-fav-btn");if(!p)return;const c=p.dataset.id;he(c),i()});function i(){const r=n.value.trim().toLowerCase(),p=w();let c=t;d==="favorites"?c=c.filter(f=>p.favoriteEvidence.includes(f.id)):d!=="all"&&(c=c.filter(f=>f.categoryId===d)),r&&(c=c.filter(f=>f.text.includes(r)||f.narrator?.includes(r)||f.source?.includes(r)||f.sunnahName?.includes(r))),a.innerHTML=c.length>0?le(c,p):'<div class="empty-state"><div class="empty-state-icon">📖</div><div class="empty-state-title">لا توجد نتائج</div></div>'}}}}function le(e,t){return e.map((s,a)=>{const n=t.favoriteEvidence.includes(s.id);return`
      <div class="evidence-card mb-md stagger-item" style="animation-delay: ${a*60}ms">
        <div class="flex justify-between items-center mb-sm">
          <span class="badge badge-gold">${s.sunnahName}</span>
          <button class="evidence-fav-btn" data-id="${s.id}" style="font-size: 20px; background: none; border: none; cursor: pointer">
            ${n?"⭐":"☆"}
          </button>
        </div>
        <div class="evidence-text">${s.text}</div>
        <div class="evidence-source mt-sm">
          <span class="evidence-grade grade-${s.grade}">${X(s.grade)}</span>
          <span>${s.source}</span>
        </div>
        <div class="text-muted mt-sm" style="font-size: var(--fs-xs)">
          الراوي: ${s.narrator} — ${s.book||""}
        </div>
      </div>
    `}).join("")}const ue=[{id:"first-step",name:"الخطوة الأولى",desc:"أكمل أول درس",icon:"👣",category:"progress",condition:e=>e.stats.totalLessons>=1},{id:"curious",name:"الفضولي",desc:"أكمل ١٠ دروس",icon:"🔍",category:"progress",condition:e=>e.stats.totalLessons>=10},{id:"scholar",name:"الباحث",desc:"أكمل ٥٠ درس",icon:"📚",category:"progress",condition:e=>e.stats.totalLessons>=50},{id:"category-master",name:"العالم",desc:"أكمل كل دروس فئة واحدة",icon:"🎓",category:"progress",condition:(e,t)=>t.hasCompletedAnyCategory(e)},{id:"encyclopedic",name:"الموسوعي",desc:"أكمل كل الفئات",icon:"🏛️",category:"progress",condition:(e,t)=>t.hasCompletedAllCategories(e)},{id:"precise",name:"الدقيق",desc:"١٠ دروس Perfect متتالية",icon:"🎯",category:"mastery",condition:e=>e.stats.perfectLessons>=10},{id:"flawless",name:"بلا خطأ",desc:"أكمل اختبار وحدة بدون أخطاء",icon:"✨",category:"mastery",condition:e=>e.stats.perfectLessons>=1},{id:"evidence-keeper",name:"حافظ الأدلة",desc:"أجب على ٥٠ سؤال أدلة صحيحاً",icon:"📜",category:"mastery",condition:e=>(e.stats.evidenceCorrect||0)>=50},{id:"accuracy-90",name:"المتقن",desc:"حقق دقة ٩٠٪ أو أعلى إجمالياً",icon:"🏅",category:"mastery",condition:e=>e.stats.totalQuestions>0&&e.stats.totalCorrect/e.stats.totalQuestions>=.9},{id:"streak-7",name:"المواظب",desc:"ستريك ٧ أيام",icon:"🔥",category:"commitment",condition:e=>e.streak.longest>=7},{id:"streak-30",name:"الثابت",desc:"ستريك ٣٠ يوم",icon:"💪",category:"commitment",condition:e=>e.streak.longest>=30},{id:"streak-90",name:"الصامد",desc:"ستريك ٩٠ يوم",icon:"🏔️",category:"commitment",condition:e=>e.streak.longest>=90},{id:"streak-365",name:"المحيي",desc:"ستريك ٣٦٥ يوم",icon:"👑",category:"commitment",condition:e=>e.streak.longest>=365},{id:"early-bird",name:"البكّير",desc:"تعلّم قبل الفجر ٧ مرات",icon:"🌅",category:"commitment",condition:e=>(e.stats.earlyMorning||0)>=7},{id:"night-owl",name:"الليلي",desc:"تعلّم بعد العشاء ٧ مرات",icon:"🌙",category:"commitment",condition:e=>(e.stats.lateNight||0)>=7},{id:"secret-friday",name:"المُجمِّع",desc:"???",icon:"🕌",category:"hidden",hidden:!0,condition:e=>(e.stats.fridayLessons||0)>=10,revealedDesc:"أكمل درساً يوم الجمعة ١٠ مرات"},{id:"secret-review",name:"المراجع الحكيم",desc:"???",icon:"🔄",category:"hidden",hidden:!0,condition:e=>(e.stats.reviewsAfter30Days||0)>=1,revealedDesc:"راجع سنة بعد ٣٠ يوم من تعلمها"},{id:"secret-tree",name:"البستاني",desc:"???",icon:"🐣",category:"hidden",hidden:!0,condition:e=>(e.stats.treeClicks||0)>=10,revealedDesc:"اضغط على الشجرة ١٠ مرات"},{id:"secret-collector",name:"جامع النقاط",desc:"???",icon:"💎",category:"hidden",hidden:!0,condition:e=>e.hasanat>=1e3,revealedDesc:"اجمع ١٠٠٠ نقطة"},{id:"habit-first",name:"أول تطبيق",desc:"سجّل أول سنة في سجل العمل",icon:"✅",category:"habit",condition:e=>Object.keys(e.habitLog).length>=1},{id:"habit-week",name:"أسبوع عمل",desc:"سجّل سنن ٧ أيام في سجل العمل",icon:"📅",category:"habit",condition:e=>Object.keys(e.habitLog).length>=7},{id:"habit-diverse",name:"المتنوع",desc:"طبّق ١٠ سنن مختلفة",icon:"🌈",category:"habit",condition:e=>{const t=new Set;return Object.values(e.habitLog).forEach(s=>s.forEach(a=>t.add(a))),t.size>=10}}];function ut(){const e=w(),t=Object.keys(e.achievements).length,s=ue.length,a=ue.filter(i=>!i.hidden||e.achievements[i.id]),n={progress:a.filter(i=>i.category==="progress"),mastery:a.filter(i=>i.category==="mastery"),commitment:a.filter(i=>i.category==="commitment"),habit:a.filter(i=>i.category==="habit"),hidden:a.filter(i=>i.category==="hidden")},o={progress:"📈 التقدم",mastery:"🎯 الإتقان",commitment:"🔥 الالتزام",habit:"✅ العادات",hidden:"🔮 المخفية"};return{html:`
    <div class="screen screen-padded">
      <div class="screen-header" style="padding: 0; margin-bottom: var(--space-lg)">
        <span class="screen-header-title">🏅 الإنجازات</span>
        <span class="badge badge-gold">${t}/${s}</span>
      </div>

      <!-- Overview -->
      <div class="card card-gold mb-lg animate-fade-in" style="text-align: center">
        <div style="font-size: 48px; margin-bottom: var(--space-sm)">🏆</div>
        <div style="font-size: var(--fs-lg); font-weight: 700">${t} إنجاز محقق</div>
        <div class="progress-bar mt-md">
          <div class="progress-bar-fill" style="width: ${s>0?t/s*100:0}%"></div>
        </div>
        <div class="text-muted mt-sm" style="font-size: var(--fs-xs)">${t} من ${s}</div>
      </div>

      <!-- Grouped Achievements -->
      ${Object.entries(n).filter(([,i])=>i.length>0).map(([i,r])=>`
        <h3 class="section-title">${o[i]}</h3>
        <div class="achievements-list mb-lg">
          ${r.map((p,c)=>{const f=!!e.achievements[p.id],x=p.hidden&&!f?"???":f&&p.revealedDesc?p.revealedDesc:p.desc;return`
              <div class="achievement-card ${f?"unlocked":"locked"} stagger-item" style="animation-delay: ${c*60}ms">
                <div class="achievement-icon">${f?p.icon:"🔒"}</div>
                <div class="achievement-info">
                  <div class="achievement-name">${f||!p.hidden?p.name:"???"}</div>
                  <div class="achievement-desc">${x}</div>
                </div>
                ${f?'<div style="color: var(--gold); font-size: 20px">✓</div>':""}
              </div>
            `}).join("")}
        </div>
      `).join("")}

      <!-- Hidden hint -->
      <div class="text-center text-muted mb-xl" style="font-size: var(--fs-xs)">
        🔮 هناك إنجازات مخفية تنتظر اكتشافك...
      </div>
    </div>
    ${C()}
  `,mount(){}}}const P={always:{text:"دائماً",icon:"✅",color:"var(--success)"},often:{text:"غالباً",icon:"🟢",color:"#8BC34A"},sometimes:{text:"أحياناً",icon:"🟡",color:"#FFCA28"},rarely:{text:"نادراً",icon:"🟠",color:"#FF9800"},never:{text:"لا أطبقها",icon:"❌",color:"var(--error)"}};function Se(){const e=w(),t=Object.keys(e.completedLessons).map(i=>N[i]).filter(Boolean),s={always:0,often:0,sometimes:0,rarely:0,never:0};let a=!1;t.forEach(i=>{const r=e.sunnahPractice?.[i.id];r&&s[r]!==void 0&&(s[r]++,a=!0)});const n=Object.entries(e.completedLessons).map(([i,r])=>({id:i,...r,sunnah:N[i]})).filter(i=>i.sunnah).sort((i,r)=>new Date(r.completedAt)-new Date(i.completedAt)).slice(0,10),o={};return O.forEach(i=>{const r=t.filter(p=>{const c=Object.values(q).find(f=>f.lessons.includes(p.id));return c&&c.categoryId===i.id});r.length>0&&(o[i.id]={category:i,sunnahs:r})}),{html:`
    <div class="screen screen-padded">
      <div class="screen-header" style="padding: 0; margin-bottom: var(--space-lg)">
        <span class="screen-header-title">📊 سجل العمل</span>
        <span class="badge badge-gold">${t.length} سنة</span>
      </div>

      <!-- Practice Overview Stats -->
      ${a?`
        <div class="practice-overview-grid mb-lg">
          ${Object.entries(s).map(([i,r])=>r>0?`
            <div class="practice-overview-item">
              <span style="font-size: 18px">${P[i].icon}</span>
              <span style="font-size: var(--fs-lg); font-weight: bold; color: ${P[i].color}">${r}</span>
              <span style="font-size: var(--fs-xs); color: var(--text-muted)">${P[i].text}</span>
            </div>
          `:"").join("")}
        </div>
      `:""}

      <!-- GitHub-style Heatmap -->
      <h3 class="section-title">🗓️ نشاطك</h3>
      <div class="card mb-lg" style="overflow-x: auto; padding: var(--space-md)">
        ${pt(e)}
      </div>

      <!-- Day Detail (hidden by default, shown on heatmap click) -->
      <div id="dayDetail" class="card mb-lg" style="display: none">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-sm)">
          <span id="dayDetailTitle" style="font-weight: 700; color: var(--gold)"></span>
          <button id="dayDetailClose" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 18px">✕</button>
        </div>
        <div id="dayDetailContent"></div>
      </div>

      <!-- Browse All Sunnahs -->
      <h3 class="section-title">📋 تصفح السنن</h3>
      ${Object.keys(o).length>0?`
        <div id="sunnahBrowse">
          ${Object.values(o).map(({category:i,sunnahs:r})=>`
            <div class="card mb-md" style="padding: var(--space-md)">
              <div style="display: flex; align-items: center; gap: var(--space-sm); margin-bottom: var(--space-md)">
                <span style="font-size: 20px">${i.icon}</span>
                <span style="font-weight: 700; color: var(--gold)">${i.name}</span>
                <span class="badge" style="background: rgba(255,255,255,0.1); font-size: var(--fs-xs)">${r.length}</span>
              </div>
              ${r.map(p=>{const c=e.sunnahPractice?.[p.id];return`
                  <div class="browse-sunnah-item" data-sunnah-id="${p.id}">
                    <div class="browse-sunnah-info">
                      <div style="font-weight: 600; font-size: var(--fs-sm)">${p.name}</div>
                      <div class="text-muted" style="font-size: var(--fs-xs)">${p.whenToApply}</div>
                    </div>
                    <div class="browse-sunnah-badge" data-current="${c||""}">
                      ${c?`<span style="font-size: 10px; padding: 2px 8px; border-radius: 6px; background: rgba(255,255,255,0.08); color: ${P[c].color}; white-space: nowrap">${P[c].icon} ${P[c].text}</span>`:'<span style="font-size: var(--fs-xs); color: var(--text-muted)">حدد ▾</span>'}
                    </div>
                  </div>
                  <!-- Expandable practice options -->
                  <div class="browse-practice-options" id="practice-${p.id}" style="display: none">
                    ${Object.entries(P).map(([f,x])=>`
                      <button class="browse-practice-btn ${c===f?"active":""}" data-sunnah="${p.id}" data-level="${f}" style="--btn-color: ${x.color}">
                        <span>${x.icon}</span>
                        <span>${x.text}</span>
                      </button>
                    `).join("")}
                  </div>
                `}).join("")}
            </div>
          `).join("")}
        </div>
      `:`
        <div class="empty-state">
          <div class="empty-state-icon">📚</div>
          <div class="empty-state-title">ابدأ بالتعلم أولاً</div>
          <div class="empty-state-text">أكمل بعض الدروس ثم عُد هنا لتتبع تطبيقك للسنن</div>
          <a href="#home" class="btn btn-primary mt-lg">ابدأ التعلم</a>
        </div>
      `}

      <!-- Recent Lessons Timeline -->
      ${n.length>0?`
        <h3 class="section-title" style="margin-top: var(--space-xl)">📜 آخر الدروس</h3>
        <div class="recent-lessons-list mb-xl">
          ${n.map((i,r)=>{const c=new Date(i.completedAt).toLocaleDateString("ar-SA",{day:"numeric",month:"short"}),f=i.total>0?Math.round(i.score/i.total*100):0,x=O.find(b=>{const v=Object.values(q).find(y=>y.lessons.includes(i.id));return v&&v.categoryId===b.id});return`
              <div class="recent-lesson-item stagger-item" style="animation-delay: ${r*50}ms">
                <div class="recent-lesson-icon" style="background: ${x?.color||"var(--gold)"}20; color: ${x?.color||"var(--gold)"}">${x?.icon||"📖"}</div>
                <div class="recent-lesson-info">
                  <div style="font-weight: 600; font-size: var(--fs-sm)">${i.sunnah.name}</div>
                  <div class="text-muted" style="font-size: var(--fs-xs)">${c}</div>
                </div>
                <div style="text-align: left">
                  <span style="font-weight: 700; color: ${f>=70?"var(--success)":"var(--error)"}; font-size: var(--fs-sm)">${f}%</span>
                  ${i.perfect?'<span style="font-size: 12px; margin-right: 4px">🏆</span>':""}
                </div>
              </div>
            `}).join("")}
        </div>
      `:""}
    </div>
    ${C()}
  `,mount(){document.querySelectorAll(".heatmap-cell[data-date]").forEach(i=>{i.addEventListener("click",()=>{const r=i.dataset.date;if(parseInt(i.dataset.count||"0")===0)return;const c=document.getElementById("dayDetail"),f=document.getElementById("dayDetailTitle"),x=document.getElementById("dayDetailContent"),b=Object.entries(e.completedLessons).filter(([,v])=>v.completedAt&&v.completedAt.startsWith(r)).map(([v,y])=>({id:v,...y,sunnah:N[v]})).filter(v=>v.sunnah);f.textContent=`📅 ${new Date(r).toLocaleDateString("ar-SA",{weekday:"long",day:"numeric",month:"long"})}`,x.innerHTML=b.length>0?b.map(v=>{const y=v.total>0?Math.round(v.score/v.total*100):0;return`<div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.05)">
              <span style="font-size: var(--fs-sm)">${v.sunnah.name}</span>
              <span style="font-weight: 700; color: ${y>=70?"var(--success)":"var(--error)"}; font-size: var(--fs-sm)">${y}% ${v.perfect?"🏆":""}</span>
            </div>`}).join(""):'<div class="text-muted" style="font-size: var(--fs-sm)">تم تسجيل نشاط في هذا اليوم</div>',c.style.display="block",c.scrollIntoView({behavior:"smooth",block:"nearest"})})}),document.getElementById("dayDetailClose")?.addEventListener("click",()=>{document.getElementById("dayDetail").style.display="none"}),document.querySelectorAll(".browse-sunnah-item").forEach(i=>{i.addEventListener("click",()=>{const r=i.dataset.sunnahId,p=document.getElementById(`practice-${r}`);if(!p)return;const c=p.style.display!=="none";document.querySelectorAll(".browse-practice-options").forEach(f=>f.style.display="none"),p.style.display=c?"none":"flex"})}),document.querySelectorAll(".browse-practice-btn").forEach(i=>{i.addEventListener("click",r=>{r.stopPropagation();const p=i.dataset.sunnah,c=i.dataset.level;ye(p,c);const f=document.getElementById("app"),x=Se();f.innerHTML=x.html,x.mount()})})}}}function pt(e){const t=new Date,s=16,a=["أحد","","ثلا","","خمي","","سبت"],n={};Object.values(e.completedLessons).forEach(v=>{if(v.completedAt){const y=v.completedAt.slice(0,10);n[y]=(n[y]||0)+1}}),Object.entries(e.habitLog||{}).forEach(([v,y])=>{y.length>0&&(n[v]=(n[v]||0)+y.length)});const o=Math.max(1,...Object.values(n)),d=new Date(t);d.setDate(d.getDate()+(6-d.getDay()));const i=new Date(d);i.setDate(i.getDate()-s*7+1);const r=[],p=[];let c=new Date(i),f=-1;for(let v=0;v<s;v++){const y=[];for(let E=0;E<7;E++){const B=c.toISOString().slice(0,10),V=n[B]||0,H=c>t,l=B===t.toISOString().slice(0,10);if(y.push({date:B,count:V,isFuture:H,isToday:l}),E===0&&c.getMonth()!==f){const u=c.toLocaleDateString("ar-SA",{month:"short"});p.push({week:v,label:u}),f=c.getMonth()}c.setDate(c.getDate()+1)}r.push(y)}function x(v){return v===0?0:v<=o*.25?1:v<=o*.5?2:v<=o*.75?3:4}let b='<div class="heatmap-container">';b+='<div class="heatmap-months">',b+='<div class="heatmap-day-label"></div>';for(let v=0;v<s;v++){const y=p.find(E=>E.week===v);b+=`<div class="heatmap-month-label">${y?y.label:""}</div>`}b+="</div>";for(let v=0;v<7;v++){b+='<div class="heatmap-row">',b+=`<div class="heatmap-day-label">${a[v]}</div>`;for(let y=0;y<s;y++){const E=r[y][v],B=E.isFuture?-1:x(E.count);b+=`<div class="heatmap-cell level-${B} ${E.isToday?"today":""}" 
                    data-date="${E.date}" 
                    data-count="${E.count}"
                    title="${E.date}: ${E.count} نشاط"></div>`}b+="</div>"}return b+=`
    <div class="heatmap-legend">
      <span class="text-muted" style="font-size: var(--fs-xs)">أقل</span>
      <div class="heatmap-cell level-0" style="cursor: default"></div>
      <div class="heatmap-cell level-1" style="cursor: default"></div>
      <div class="heatmap-cell level-2" style="cursor: default"></div>
      <div class="heatmap-cell level-3" style="cursor: default"></div>
      <div class="heatmap-cell level-4" style="cursor: default"></div>
      <span class="text-muted" style="font-size: var(--fs-xs)">أكثر</span>
    </div>
  `,b+="</div>",b}function vt(){const t=w().settings,s=t.theme||"classic";return{html:`
    <div class="screen screen-padded">
      <div class="screen-header" style="padding: 0; margin-bottom: var(--space-lg)">
        <a href="#profile" class="screen-header-back">›</a>
        <span class="screen-header-title">⚙️ الإعدادات</span>
        <div></div>
      </div>

      <!-- Theme Picker -->
      <div class="settings-group">
        <div class="settings-group-title">🎨 المظهر</div>
        <div style="padding: var(--space-sm) 0">
          <div class="theme-picker">
            <button class="theme-option ${s==="classic"?"active":""}" data-theme="classic">
              <div class="theme-option-preview" style="background: linear-gradient(135deg, #111 50%, #FFB800 50%);"></div>
              <div class="theme-option-label">كلاسيكي</div>
              <div class="text-muted" style="font-size: var(--fs-xs)">عنبري + خط عربي</div>
            </button>
            <button class="theme-option ${s==="golden"?"active":""}" data-theme="golden">
              <div class="theme-option-preview" style="background: linear-gradient(135deg, #0D0D0D 50%, #D4AF37 50%);"></div>
              <div class="theme-option-label">ذهبي</div>
              <div class="text-muted" style="font-size: var(--fs-xs)">أزرق داكن + ذهبي</div>
            </button>
          </div>
        </div>
        <div class="settings-item">
          <div class="settings-label">
            <span class="settings-label-icon">🔤</span>
            <span>حجم الخط</span>
          </div>
          <select class="settings-select" id="fontSizeSelect">
            <option value="small" ${t.fontSize==="small"?"selected":""}>صغير</option>
            <option value="medium" ${t.fontSize==="medium"?"selected":""}>متوسط</option>
            <option value="large" ${t.fontSize==="large"?"selected":""}>كبير</option>
            <option value="xlarge" ${t.fontSize==="xlarge"?"selected":""}>كبير جداً</option>
          </select>
        </div>
      </div>

      <!-- Content -->
      <div class="settings-group">
        <div class="settings-group-title">📚 المحتوى</div>
        <div class="settings-item">
          <div class="settings-label">
            <span class="settings-label-icon">📝</span>
            <span>عرض التشكيل على الأحاديث</span>
          </div>
          <label class="toggle">
            <input type="checkbox" id="tashkeelToggle" ${t.showTashkeel?"checked":""} />
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>

      <!-- Goals -->
      <div class="settings-group">
        <div class="settings-group-title">🎯 الأهداف</div>
        <div class="settings-item">
          <div class="settings-label">
            <span class="settings-label-icon">📖</span>
            <span>الهدف اليومي (دقائق)</span>
          </div>
          <select class="settings-select" id="dailyGoalSelect">
            <option value="5" ${t.dailyGoal===5?"selected":""}>٥ دقائق</option>
            <option value="10" ${t.dailyGoal===10?"selected":""}>١٠ دقائق</option>
            <option value="15" ${t.dailyGoal===15?"selected":""}>١٥ دقيقة</option>
            <option value="20" ${t.dailyGoal===20?"selected":""}>٢٠ دقيقة</option>
          </select>
        </div>
        <div class="settings-item">
          <div class="settings-label">
            <span class="settings-label-icon">🕌</span>
            <span>إعفاء يوم الجمعة من الستريك</span>
          </div>
          <label class="toggle">
            <input type="checkbox" id="fridayToggle" ${t.streakFridayExemption?"checked":""} />
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>

      <!-- Data -->
      <div class="settings-group">
        <div class="settings-group-title">💾 البيانات</div>
        <div class="settings-item" style="cursor: pointer" id="exportBtn">
          <div class="settings-label">
            <span class="settings-label-icon">📤</span>
            <span>تصدير التقدم</span>
          </div>
          <span style="color: var(--text-muted)">›</span>
        </div>
        <div class="settings-item" style="cursor: pointer; position: relative" id="importBtn">
          <div class="settings-label">
            <span class="settings-label-icon">📥</span>
            <span>استيراد التقدم</span>
          </div>
          <input type="file" id="importFile" accept=".json" style="position: absolute; inset: 0; opacity: 0; cursor: pointer" />
          <span style="color: var(--text-muted)">›</span>
        </div>
        <div class="settings-item" style="cursor: pointer" id="resetBtn">
          <div class="settings-label">
            <span class="settings-label-icon">🗑️</span>
            <span style="color: var(--error)">إعادة ضبط كل التقدم</span>
          </div>
          <span style="color: var(--text-muted)">›</span>
        </div>
      </div>

      <!-- About -->
      <div class="settings-group">
        <div class="settings-group-title">ℹ️ حول التطبيق</div>
        <div class="settings-item">
          <div class="settings-label">
            <span class="settings-label-icon">📱</span>
            <span>الإصدار</span>
          </div>
          <span class="text-muted">1.0.0 MVP</span>
        </div>
        <div class="settings-item">
          <div class="settings-label">
            <span class="settings-label-icon">📜</span>
            <span>المصادر</span>
          </div>
          <span class="text-muted">البخاري، مسلم، الترمذي، أبو داوود</span>
        </div>
      </div>

      <div class="text-center mt-xl mb-xl" style="font-size: var(--fs-xs); color: var(--text-muted)">
        السُّنَّة — أحيِ سننًا تُحيي أمة 🌙
      </div>
    </div>
    ${C()}
  `,mount(){document.querySelectorAll(".theme-option").forEach(n=>{n.addEventListener("click",()=>{const o=n.dataset.theme;L(d=>({...d,settings:{...d.settings,theme:o}})),Ie(o),document.querySelectorAll(".theme-option").forEach(d=>d.classList.remove("active")),n.classList.add("active")})}),document.getElementById("fontSizeSelect")?.addEventListener("change",n=>{L(o=>({...o,settings:{...o.settings,fontSize:n.target.value}})),mt(n.target.value)}),document.getElementById("tashkeelToggle")?.addEventListener("change",n=>{L(o=>({...o,settings:{...o.settings,showTashkeel:n.target.checked}}))}),document.getElementById("dailyGoalSelect")?.addEventListener("change",n=>{L(o=>({...o,settings:{...o.settings,dailyGoal:parseInt(n.target.value)}}))}),document.getElementById("fridayToggle")?.addEventListener("change",n=>{L(o=>({...o,settings:{...o.settings,streakFridayExemption:n.target.checked},streak:{...o.streak,fridayExemption:n.target.checked}}))}),document.getElementById("exportBtn")?.addEventListener("click",Ce),document.getElementById("importFile")?.addEventListener("change",async n=>{const o=n.target.files[0];if(o)try{await _e(o),location.reload()}catch{alert("فشل استيراد البيانات")}}),document.getElementById("resetBtn")?.addEventListener("click",()=>{confirm("هل أنت متأكد؟ سيتم حذف جميع بياناتك.")&&(Oe(),location.reload())})}}}function mt(e){const t={small:"14px",medium:"16px",large:"18px",xlarge:"20px"};document.documentElement.style.fontSize=t[e]||"16px"}T("home",We);T("category",st);T("lesson",it);T("profile",dt);T("evidence",lt);T("achievements",ut);T("habits",Se);T("settings",vt);function Ie(e){document.documentElement.setAttribute("data-theme",e||"classic")}function pe(){Ve();const e=w();if(Ie(e.settings.theme),e.settings.fontSize){const t={small:"14px",medium:"16px",large:"18px",xlarge:"20px"};document.documentElement.style.fontSize=t[e.settings.fontSize]||"16px"}e.stats.startDate||F(()=>Promise.resolve().then(()=>M),void 0).then(t=>{t.setState(s=>({...s,stats:{...s.stats,startDate:new Date().toISOString()}}))}),Be()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",pe):pe();

// Sathi Japan – life checklists. offset = days from the key date (null = no deadline).
// forms: official forms / online links. Checked 2026-10-03. Re-check every April.
window.CHECKLISTS = [
 {
  "id": "arrival",
  "icon": "✈️",
  "title": {
   "en": "Just arrived in Japan",
   "ne": "भर्खर जापान आउनुभयो"
  },
  "keyDate": {
   "en": "Date you started living at your address",
   "ne": "तपाईं आफ्नो ठेगानामा बस्न थालेको मिति"
  },
  "steps": [
   {
    "id": "addr",
    "offset": 14,
    "en": "Register your address at the city/ward office (区役所). Bring your residence card (or passport if it says the card will be issued later).",
    "ne": "सिटी/वार्ड कार्यालय (区役所) मा आफ्नो ठेगाना दर्ता गर्नुहोस्। रेसिडेन्स कार्ड लैजानुहोस् (कार्ड पछि दिइने भनेर पासपोर्टमा लेखिएको भए पासपोर्ट)।",
    "src": "https://www.moj.go.jp/isa/content/930001396.pdf",
    "forms": [
     {
      "kind": "counter",
      "label": {
       "en": "Form is at the ward office counter – no download needed",
       "ne": "फारम वार्ड कार्यालयको काउन्टरमै पाइन्छ – डाउनलोड गर्नु पर्दैन"
      }
     }
    ]
   },
   {
    "id": "nhi",
    "offset": 14,
    "en": "If you are NOT in company health insurance (e.g. student): join National Health Insurance (国民健康保険) at the same office.",
    "ne": "कम्पनीको स्वास्थ्य बीमामा हुनुहुन्न भने (जस्तै विद्यार्थी): त्यही कार्यालयमा राष्ट्रिय स्वास्थ्य बीमा (国民健康保険) मा भर्ना हुनुहोस्।",
    "src": "https://www.city.niigata.lg.jp/kurashi/hoken/kokuho/konnatoki/todokede.html",
    "forms": [
     {
      "kind": "counter",
      "label": {
       "en": "Form is at the ward office counter – no download needed",
       "ne": "फारम वार्ड कार्यालयको काउन्टरमै पाइन्छ – डाउनलोड गर्नु पर्दैन"
      }
     }
    ]
   },
   {
    "id": "pension",
    "offset": 14,
    "en": "If you are 20–59 and NOT in company pension: join National Pension (国民年金) at the same office. Students can ask about the payment postponement system.",
    "ne": "२०–५९ वर्षका हुनुहुन्छ र कम्पनीको पेन्सनमा हुनुहुन्न भने: त्यही कार्यालयमा राष्ट्रिय पेन्सन (国民年金) मा भर्ना हुनुहोस्। विद्यार्थीले भुक्तानी स्थगन प्रणालीबारे सोध्न सक्नुहुन्छ।",
    "src": "https://www.nenkin.go.jp/service/kokunen/kanyu/20140710-04.html",
    "forms": [
     {
      "kind": "pdf",
      "url": "https://www.nenkin.go.jp/shinsei/kokunen/kanyu/kanyu.files/kankeitodoke.pdf",
      "label": {
       "en": "National Pension form (国民年金被保険者関係届書)",
       "ne": "राष्ट्रिय पेन्सन फारम (国民年金被保険者関係届書)"
      }
     },
     {
      "kind": "pdf",
      "url": "https://www.nenkin.go.jp/shinsei/kokunen/kanyu/kanyu.files/kankeitodoke_rei.pdf",
      "label": {
       "en": "Filled-in example",
       "ne": "भरेको नमुना"
      }
     },
     {
      "kind": "online",
      "url": "https://myna.go.jp/",
      "label": {
       "en": "Online: My Number Portal (needs My Number card)",
       "ne": "अनलाइन: My Number Portal (My Number कार्ड चाहिन्छ)"
      }
     }
    ]
   },
   {
    "id": "garbage",
    "offset": null,
    "en": "Learn your area's garbage days and rules.",
    "ne": "आफ्नो क्षेत्रको फोहोर फाल्ने दिन र नियम सिक्नुहोस्।",
    "link": "./"
   },
   {
    "id": "bank",
    "offset": null,
    "en": "Open a bank account and get a phone contract. Never sell, lend or give away your bank card or account – it is a crime in Japan.",
    "ne": "बैंक खाता खोल्नुहोस् र फोन सम्झौता गर्नुहोस्। आफ्नो बैंक कार्ड वा खाता कहिल्यै नबेच्नुहोस्, नदिनुहोस् – जापानमा यो अपराध हो।",
    "src": "https://www.npa.go.jp/bureau/safetylife/sos47/new-topics/250110/04.html"
   }
  ]
 },
 {
  "id": "moving",
  "icon": "🏠",
  "title": {
   "en": "Moving house",
   "ne": "घर सर्दै"
  },
  "keyDate": {
   "en": "Moving day",
   "ne": "घर सर्ने दिन"
  },
  "steps": [
   {
    "id": "out",
    "offset": -14,
    "before": true,
    "en": "Moving to ANOTHER city: file a moving-out notice (転出届) at your ward office, up to 14 days before moving. Foreign residents must go to the ward office (区役所), not a branch office. You get a moving-out certificate (転出証明書).",
    "ne": "अर्को सिटीमा सर्दै हुनुहुन्छ भने: सर्नुभन्दा १४ दिन अघिदेखि वार्ड कार्यालयमा 転出届 (बाहिर सर्ने सूचना) दिनुहोस्। विदेशीले शाखा कार्यालय होइन, वार्ड कार्यालय (区役所) मै जानुपर्छ। 転出証明書 पाउनुहुन्छ।",
    "src": "https://www.city.niigata.lg.jp/kurashi/todokede/kosekinado/jyuminhyo/tensyutsu.html",
    "forms": [
     {
      "kind": "online",
      "url": "https://myna.go.jp/",
      "label": {
       "en": "Online: My Number Portal (needs My Number card)",
       "ne": "अनलाइन: My Number Portal (My Number कार्ड चाहिन्छ)"
      }
     },
     {
      "kind": "counter",
      "label": {
       "en": "Or fill it in at the ward office counter",
       "ne": "वा वार्ड कार्यालयको काउन्टरमा भर्नुहोस्"
      }
     }
    ]
   },
   {
    "id": "in",
    "offset": 14,
    "en": "Register at your NEW city/ward office within 14 days of moving in. Bring your residence card and 転出証明書 (or My Number card). This also updates your address for Immigration – the new address is written on the back of your card.",
    "ne": "सरेको १४ दिनभित्र नयाँ सिटी/वार्ड कार्यालयमा दर्ता गर्नुहोस्। रेसिडेन्स कार्ड र 転出証明書 (वा My Number कार्ड) लैजानुहोस्। यसले इमिग्रेसनमा पनि ठेगाना अपडेट गर्छ – नयाँ ठेगाना कार्डको पछाडि लेखिन्छ।",
    "src": "https://www.isa.go.jp/en/applications/procedures/nyuukokukanri10_00023.html",
    "forms": [
     {
      "kind": "counter",
      "label": {
       "en": "Form is at the ward office counter – no download needed",
       "ne": "फारम वार्ड कार्यालयको काउन्टरमै पाइन्छ – डाउनलोड गर्नु पर्दैन"
      }
     }
    ]
   },
   {
    "id": "within",
    "offset": 14,
    "en": "Moving inside the SAME city: just file a change-of-address notice at the ward office within 14 days. Bring your residence card.",
    "ne": "उही सिटीभित्र सर्दै हुनुहुन्छ भने: १४ दिनभित्र वार्ड कार्यालयमा ठेगाना परिवर्तन सूचना दिनुहोस्। रेसिडेन्स कार्ड लैजानुहोस्।",
    "src": "https://www.city.niigata.lg.jp/kurashi/todokede/kosekinado/jyuminhyo/jushoido.html",
    "forms": [
     {
      "kind": "counter",
      "label": {
       "en": "Form is at the ward office counter – no download needed",
       "ne": "फारम वार्ड कार्यालयको काउन्टरमै पाइन्छ – डाउनलोड गर्नु पर्दैन"
      }
     }
    ]
   },
   {
    "id": "nhi",
    "offset": 14,
    "en": "If you have National Health Insurance, ask about it at the same counter (it changes when you change city).",
    "ne": "राष्ट्रिय स्वास्थ्य बीमा छ भने, त्यही काउन्टरमा सोध्नुहोस् (सिटी बदल्दा यो पनि बदलिन्छ)।",
    "src": "https://www.city.niigata.lg.jp/kurashi/hoken/kokuho/konnatoki/todokede.html",
    "forms": [
     {
      "kind": "counter",
      "label": {
       "en": "Form is at the ward office counter – no download needed",
       "ne": "फारम वार्ड कार्यालयको काउन्टरमै पाइन्छ – डाउनलोड गर्नु पर्दैन"
      }
     }
    ]
   },
   {
    "id": "post",
    "offset": -7,
    "before": true,
    "en": "Ask the post office to forward your mail to the new address for 1 year (転居届). You can apply online with e-転居.",
    "ne": "हुलाक कार्यालयलाई चिठी १ वर्षसम्म नयाँ ठेगानामा पठाउन भन्नुहोस् (転居届)। e-転居 बाट अनलाइन पनि गर्न सकिन्छ।",
    "src": "https://www.post.japanpost.jp/service/tenkyo/index_en.html",
    "forms": [
     {
      "kind": "online",
      "url": "https://welcometown.post.japanpost.jp/etn/",
      "label": {
       "en": "Online: e-転居 (Japan Post)",
       "ne": "अनलाइन: e-転居 (जापान पोस्ट)"
      }
     }
    ]
   },
   {
    "id": "bulky",
    "offset": -14,
    "before": true,
    "en": "Book bulky garbage pickup early for furniture you will throw away.",
    "ne": "फाल्ने फर्निचरको लागि ठूलो फोहोर संकलन चाँडै बुक गर्नुहोस्।",
    "src": "https://www.sodai.city.niigata.jp/eco/view/niigata/top.html",
    "forms": [
     {
      "kind": "online",
      "url": "https://www.sodai.city.niigata.jp/eco/view/niigata/top.html",
      "label": {
       "en": "Online booking (Niigata City)",
       "ne": "अनलाइन बुकिङ (निगाता सिटी)"
      }
     }
    ]
   },
   {
    "id": "tell",
    "offset": null,
    "en": "Tell your employer or school, bank, phone company and landlord your new address.",
    "ne": "आफ्नो कम्पनी वा स्कूल, बैंक, फोन कम्पनी र घरधनीलाई नयाँ ठेगाना बताउनुहोस्।"
   }
  ]
 },
 {
  "id": "job",
  "icon": "💼",
  "title": {
   "en": "Changing jobs",
   "ne": "जागिर बदल्दै"
  },
  "keyDate": {
   "en": "Last day at your old job",
   "ne": "पुरानो जागिरको अन्तिम दिन"
  },
  "steps": [
   {
    "id": "isa_end",
    "offset": 14,
    "en": "Notify Immigration that your contract ENDED, within 14 days. Required for work visas such as Engineer/Specialist in Humanities/International Services, Skilled Labor and Specified Skilled Worker. Easiest online (e-notification system).",
    "ne": "करार सकिएको १४ दिनभित्र इमिग्रेसनलाई सूचना दिनुहोस्। Engineer/Specialist in Humanities/International Services, Skilled Labor, Specified Skilled Worker जस्ता कामको भिसामा अनिवार्य। अनलाइन (e-notification) सबैभन्दा सजिलो।",
    "src": "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html",
    "forms": [
     {
      "kind": "online",
      "url": "https://rasens-immi.moj.go.jp/rasens-u/",
      "label": {
       "en": "Online: Immigration e-notification system",
       "ne": "अनलाइन: इमिग्रेसन e-notification प्रणाली"
      }
     },
     {
      "kind": "pdf",
      "url": "https://www.moj.go.jp/isa/content/930002827.pdf",
      "label": {
       "en": "Form: contract ended (PDF)",
       "ne": "फारम: करार सकियो (PDF)"
      }
     },
     {
      "kind": "xlsx",
      "url": "https://www.moj.go.jp/isa/content/930004353.xlsx",
      "label": {
       "en": "Same form (Excel)",
       "ne": "उही फारम (Excel)"
      }
     },
     {
      "kind": "pdf",
      "url": "https://www.moj.go.jp/isa/content/930003478.pdf",
      "label": {
       "en": "Filled-in example",
       "ne": "भरेको नमुना"
      }
     },
     {
      "kind": "pdf",
      "url": "https://www.moj.go.jp/isa/content/930002914.pdf",
      "label": {
       "en": "Form: contract ended AND new contract (one form)",
       "ne": "फारम: करार सकियो र नयाँ करार (एउटै फारम)"
      }
     }
    ]
   },
   {
    "id": "isa_new",
    "offset": null,
    "en": "When you sign the NEW contract, notify Immigration again within 14 days of the new contract.",
    "ne": "नयाँ करार गरेपछि, त्यसको १४ दिनभित्र फेरि इमिग्रेसनलाई सूचना दिनुहोस्।",
    "src": "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html",
    "forms": [
     {
      "kind": "online",
      "url": "https://rasens-immi.moj.go.jp/rasens-u/",
      "label": {
       "en": "Online: Immigration e-notification system",
       "ne": "अनलाइन: इमिग्रेसन e-notification प्रणाली"
      }
     },
     {
      "kind": "pdf",
      "url": "https://www.moj.go.jp/isa/content/930002828.pdf",
      "label": {
       "en": "Form: new contract (PDF)",
       "ne": "फारम: नयाँ करार (PDF)"
      }
     },
     {
      "kind": "xlsx",
      "url": "https://www.moj.go.jp/isa/content/930004354.xlsx",
      "label": {
       "en": "Same form (Excel)",
       "ne": "उही फारम (Excel)"
      }
     },
     {
      "kind": "pdf",
      "url": "https://www.moj.go.jp/isa/content/930003479.pdf",
      "label": {
       "en": "Filled-in example",
       "ne": "भरेको नमुना"
      }
     }
    ]
   },
   {
    "id": "docs",
    "offset": null,
    "en": "Get your withholding tax slip (源泉徴収票) and separation notice (離職票) from your old company. You need them for tax, insurance and pension.",
    "ne": "पुरानो कम्पनीबाट 源泉徴収票 (कर कट्टी प्रमाण) र 離職票 (जागिर छोडेको प्रमाण) लिनुहोस्। कर, बीमा र पेन्सनमा चाहिन्छ।",
    "src": "https://www.nenkin.go.jp/service/kokunen/kanyu/20140710-04.html"
   },
   {
    "id": "nhi",
    "offset": 14,
    "en": "If there is a gap before the new job's insurance starts: join National Health Insurance at the ward office within 14 days. If you are late, you pay back premiums and full medical costs in the meantime.",
    "ne": "नयाँ जागिरको बीमा सुरु हुनुअघि खाली समय छ भने: १४ दिनभित्र वार्ड कार्यालयमा राष्ट्रिय स्वास्थ्य बीमामा भर्ना हुनुहोस्। ढिला भए पछाडिको प्रिमियम र बीचको पूरा उपचार खर्च तिर्नुपर्छ।",
    "src": "https://www.city.niigata.lg.jp/kurashi/hoken/kokuho/konnatoki/todokede.html",
    "forms": [
     {
      "kind": "pdf",
      "url": "https://www.city.niigata.lg.jp/kurashi/hoken/kokuho/konnatoki/kadatsu.files/12948_12.pdf",
      "label": {
       "en": "Proof your company insurance ended (連絡票) – your old company fills it",
       "ne": "कम्पनी बीमा सकिएको प्रमाण (連絡票) – पुरानो कम्पनीले भर्छ"
      }
     },
     {
      "kind": "xlsx",
      "url": "https://www.city.niigata.lg.jp/kurashi/hoken/kokuho/konnatoki/kadatsu.files/12948_11.xlsx",
      "label": {
       "en": "Same slip (Excel)",
       "ne": "उही फारम (Excel)"
      }
     },
     {
      "kind": "counter",
      "label": {
       "en": "Join form is at the ward office counter",
       "ne": "भर्ना फारम वार्ड कार्यालयको काउन्टरमा पाइन्छ"
      }
     }
    ]
   },
   {
    "id": "pension",
    "offset": 15,
    "en": "Same gap: join National Pension at the ward office within 14 days from the day after your last day. Bring your 離職票 or similar.",
    "ne": "त्यही खाली समयमा: अन्तिम दिनको भोलिपल्टदेखि १४ दिनभित्र वार्ड कार्यालयमा राष्ट्रिय पेन्सनमा भर्ना हुनुहोस्। 離職票 वा यस्तै कागज लैजानुहोस्।",
    "src": "https://www.nenkin.go.jp/service/kokunen/kanyu/20140710-04.html",
    "forms": [
     {
      "kind": "pdf",
      "url": "https://www.nenkin.go.jp/shinsei/kokunen/kanyu/kanyu.files/kankeitodoke.pdf",
      "label": {
       "en": "National Pension form (国民年金被保険者関係届書)",
       "ne": "राष्ट्रिय पेन्सन फारम (国民年金被保険者関係届書)"
      }
     },
     {
      "kind": "pdf",
      "url": "https://www.nenkin.go.jp/shinsei/kokunen/kanyu/kanyu.files/kankeitodoke_rei.pdf",
      "label": {
       "en": "Filled-in example",
       "ne": "भरेको नमुना"
      }
     },
     {
      "kind": "online",
      "url": "https://myna.go.jp/",
      "label": {
       "en": "Online: My Number Portal (needs My Number card)",
       "ne": "अनलाइन: My Number Portal (My Number कार्ड चाहिन्छ)"
      }
     }
    ]
   },
   {
    "id": "visa",
    "offset": null,
    "en": "Check the new job matches your visa type BEFORE you start. If unsure, ask Immigration or a licensed gyoseishoshi (行政書士).",
    "ne": "काम सुरु गर्नुअघि नयाँ काम तपाईंको भिसा प्रकारसँग मिल्छ कि मिल्दैन जाँच गर्नुहोस्। शंका भए इमिग्रेसन वा लाइसेन्स भएका 行政書士 लाई सोध्नुहोस्।",
    "src": "https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html",
    "forms": [
     {
      "kind": "page",
      "url": "visa.html",
      "label": {
       "en": "If you need a change of status: forms on our Visa page",
       "ne": "भिसा परिवर्तन चाहिए: हाम्रो भिसा पेजमा फारम"
      }
     }
    ]
   }
  ]
 },
 {
  "id": "leaving",
  "icon": "🧳",
  "title": {
   "en": "Leaving Japan",
   "ne": "जापान छोड्दै"
  },
  "keyDate": {
   "en": "Departure day",
   "ne": "जापान छोड्ने दिन"
  },
  "steps": [
   {
    "id": "reentry",
    "offset": null,
    "en": "Coming back within 1 year? At the airport, tick the special re-entry permit box on the departure (ED) card. It ends after 1 year, or earlier if your visa expires first, and cannot be extended from abroad.",
    "ne": "१ वर्षभित्र फर्कनुहुन्छ? एयरपोर्टमा डिपार्चर (ED) कार्डमा special re-entry permit को बाकसमा ठीक लगाउनुहोस्। यो १ वर्षमा (भिसा पहिले सकिए त्यही दिन) सकिन्छ, विदेशबाट थप्न मिल्दैन।",
    "src": "https://www.moj.go.jp/isa/immigration/procedures/minashisainyukoku_00001.html",
    "forms": [
     {
      "kind": "counter",
      "label": {
       "en": "Use the ED card at the airport – no download",
       "ne": "एयरपोर्टमा ED कार्ड भर्नुहोस् – डाउनलोड पर्दैन"
      }
     }
    ]
   },
   {
    "id": "out",
    "offset": -14,
    "before": true,
    "en": "Leaving for good: file a moving-out notice (転出届) at the ward office, up to 14 days before departure. Return your health insurance card there.",
    "ne": "सधैंका लागि जाँदै हुनुहुन्छ भने: जानुभन्दा १४ दिन अघिदेखि वार्ड कार्यालयमा 転出届 दिनुहोस्। स्वास्थ्य बीमा कार्ड त्यहीँ फिर्ता गर्नुहोस्।",
    "src": "https://www.city.niigata.lg.jp/kurashi/todokede/kosekinado/jyuminhyo/tensyutsu.html",
    "forms": [
     {
      "kind": "counter",
      "label": {
       "en": "Form is at the ward office counter – no download needed",
       "ne": "फारम वार्ड कार्यालयको काउन्टरमै पाइन्छ – डाउनलोड गर्नु पर्दैन"
      }
     }
    ]
   },
   {
    "id": "tax",
    "offset": -14,
    "before": true,
    "en": "Resident tax is charged based on where you lived on January 1, so you may still owe tax after leaving. Pay it all before you go, or register a tax agent (納税管理人) at the city tax office.",
    "ne": "नगर कर जनवरी १ मा बसेको ठाउँअनुसार लाग्छ, त्यसैले जापान छोडेपछि पनि कर बाँकी हुन सक्छ। जानुअघि सबै तिर्नुहोस्, वा सिटी कर कार्यालयमा 納税管理人 (कर प्रतिनिधि) दर्ता गर्नुहोस्।",
    "src": "https://www.city.niigata.lg.jp/kurashi/zei/shinkoku_todokede/kojinshiminzei.html",
    "forms": [
     {
      "kind": "online",
      "url": "https://lgpos.task-asp.net/cu/151009/ea/residents/procedures/apply/7c76a437-a202-4493-837c-360a0cae7c9a/start",
      "label": {
       "en": "Online: tax agent notice (e-NIIGATA)",
       "ne": "अनलाइन: कर प्रतिनिधि सूचना (e-NIIGATA)"
      }
     }
    ]
   },
   {
    "id": "bank",
    "offset": -3,
    "before": true,
    "en": "Close your bank account and phone contract. Never sell or give your bank card, account or phone to anyone – it is a crime.",
    "ne": "बैंक खाता र फोन सम्झौता बन्द गर्नुहोस्। आफ्नो बैंक कार्ड, खाता वा फोन कसैलाई नबेच्नुहोस्, नदिनुहोस् – यो अपराध हो।",
    "src": "https://www.npa.go.jp/bureau/safetylife/sos47/new-topics/250110/04.html"
   },
   {
    "id": "card",
    "offset": 0,
    "en": "Not coming back: the immigration officer at the airport takes your residence card. If you leave with a re-entry permit and do not return in time, return the card within 14 days after it expires.",
    "ne": "फर्केर नआउने भए: एयरपोर्टमा इमिग्रेसन अधिकारीले रेसिडेन्स कार्ड लिन्छन्। re-entry permit लिएर गई समयमा नफर्के, कार्ड अमान्य भएको १४ दिनभित्र फिर्ता पठाउनुहोस्।",
    "src": "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html"
   },
   {
    "id": "lumpsum",
    "offset": 730,
    "en": "Pension refund (脱退一時金): after leaving, you can claim part of the pension you paid. Claim within 2 years of no longer having an address in Japan. Form available in Nepali.",
    "ne": "पेन्सन फिर्ता (脱退一時金): जापान छोडेपछि तिर्नुभएको पेन्सनको केही भाग माग्न सक्नुहुन्छ। जापानमा ठेगाना नरहेको २ वर्षभित्र दाबी गर्नुहोस्। नेपाली भाषामा फारम उपलब्ध छ।",
    "src": "https://www.nenkin.go.jp/shinsei/jukyu/sonota-kyufu/20150406.html",
    "forms": [
     {
      "kind": "pdf",
      "url": "https://www.nenkin.go.jp/shinsei/jukyu/sonota-kyufu/20150406.files/M.pdf",
      "label": {
       "en": "Claim form – Nepali (PDF)",
       "ne": "दाबी फारम – नेपाली (PDF)"
      }
     },
     {
      "kind": "xlsx",
      "url": "https://www.nenkin.go.jp/shinsei/jukyu/sonota-kyufu/20150406.files/M.xlsx",
      "label": {
       "en": "Claim form – Nepali (Excel)",
       "ne": "दाबी फारम – नेपाली (Excel)"
      }
     },
     {
      "kind": "pdf",
      "url": "https://www.nenkin.go.jp/shinsei/jukyu/sonota-kyufu/20150406.files/Mex.pdf",
      "label": {
       "en": "Filled-in example – Nepali",
       "ne": "भरेको नमुना – नेपाली"
      }
     },
     {
      "kind": "pdf",
      "url": "https://www.nenkin.go.jp/shinsei/jukyu/sonota-kyufu/20150406.files/A.pdf",
      "label": {
       "en": "Claim form – English (PDF)",
       "ne": "दाबी फारम – अंग्रेजी (PDF)"
      }
     }
    ]
   }
  ]
 }
];

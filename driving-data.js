// Sathi Japan – Driving licence guide data.
// EVERY rule, fee and number here was checked on the official page in SRC on the date shown (`checked`).
// The page shows "Review due" automatically when a source is older than REVIEW_DAYS.
// To update: open the source page, change the fact, and set `checked` to today's date.
// Text: {en, ne}. To add a language later, add another key (e.g. vi) – missing keys fall back to English.
window.DRIVING = {
REVIEW_DAYS: 180,

SRC: {
 npaForeign:{url:"https://www.npa.go.jp/policies/application/license_renewal/have_DL_issed_another_country.html",org:"National Police Agency",t:"外国の運転免許をお持ちの方",checked:"2026-10-11"},
 npaQA:{url:"https://www.npa.go.jp/policies/application/license_renewal/QA.html",org:"National Police Agency",t:"Q&A",checked:"2026-10-11"},
 npaJapan:{url:"https://www.npa.go.jp/policies/application/license_renewal/japan.html",org:"National Police Agency",t:"日本在住で日本の運転免許証をお持ちの方",checked:"2026-10-11"},
 npaMyna:{url:"https://www.npa.go.jp/bureau/traffic/r4kaisei_main.html",org:"National Police Agency",t:"マイナ免許証",checked:"2026-10-11"},
 npaPref:{url:"https://www.npa.go.jp/link/prefectural.html",org:"National Police Agency",t:"都道府県警察本部リンク",checked:"2026-10-11"},
 tokyo2025:{url:"https://www.keishicho.metro.tokyo.lg.jp/menkyo/oshirase/low.html",org:"Tokyo Metropolitan Police",t:"令和7年10月1日施行・改正道路交通法施行規則について",checked:"2026-10-11"},
 osaka2025:{url:"https://www.police.pref.osaka.lg.jp/tetsuduki/untenmenkyo/21927.html",org:"Osaka Prefectural Police",t:"外免切替手続の見直し・概要資料",checked:"2026-10-11"},
 tokyoExchange:{url:"https://www.keishicho.metro.tokyo.lg.jp/menkyo/menkyo/kokugai/kokugai05.html",org:"Tokyo Metropolitan Police",t:"外国で取得した運転免許証を日本の運転免許証に切り替えるには",checked:"2026-10-11"},
 osakaExchange:{url:"https://www.police.pref.osaka.lg.jp/tetsuduki/untenmenkyo/3694.html",org:"Osaka Prefectural Police",t:"外国免許証から日本免許証への切り替え手続",checked:"2026-10-11"},
 niigataExchange:{url:"https://www.pref.niigata.lg.jp/site/kenkei/menkyo-gaikoku-gaikoku.html",org:"Niigata Prefectural Police",t:"外国運転免許証を日本の運転免許証に切り替える場合の手続き",checked:"2026-10-11",note:{en:"This page was last updated on 24 Sep 2025, before the 1 Oct 2025 rule change. Phone the centre to confirm.",ne:"यो पेज २०२५ सेप्टेम्बर २४ मा अपडेट भएको हो, २०२५ अक्टोबर १ को नियम परिवर्तनअघि। केन्द्रमा फोन गरेर पक्का गर्नुहोस्।"}},
 niigataCentre:{url:"https://www.pref.niigata.lg.jp/site/kenkei/menkyo-siken-senta-senta.html",org:"Niigata Prefectural Police",t:"運転免許センター【会場案内】",checked:"2026-10-11"},
 niigataRenewal:{url:"https://www.pref.niigata.lg.jp/site/kenkei/ippann-kousyu2.html",org:"Niigata Prefectural Police",t:"一般講習（更新）",checked:"2026-10-11"},
 niigataFees:{url:"https://www.pref.niigata.lg.jp/site/kenkei/menkyo-siken-kingaku-kingaku.html",org:"Niigata Prefectural Police",t:"運転免許試験等関係手数料",checked:"2026-10-11"},
 niigataExam:{url:"https://www.pref.niigata.lg.jp/site/kenkei/menkyo-siken-sikaku-sikaku.html",org:"Niigata Prefectural Police",t:"運転免許受験の案内（受験資格、必要書類等）",checked:"2026-10-11"},
 law:{url:"https://laws.e-gov.go.jp/law/335CO0000000270",org:"e-Gov (Road Traffic Act Enforcement Order, Art. 43)",t:"道路交通法施行令 第43条",checked:"2026-10-11"},
 tokyoAge:{url:"https://www.keishicho.metro.tokyo.lg.jp/menkyo/oshirase/exam_age.html",org:"Tokyo Metropolitan Police",t:"受験資格年齢要件の見直し",checked:"2026-10-11"},
 naganoVehicles:{url:"https://www.pref.nagano.lg.jp/police/shinsei/koutsu/kakuninshiyou.html",org:"Nagano Prefectural Police",t:"確認しよう、運転免許と運転できる車",checked:"2026-10-11"},
 shizuokaMoped:{url:"https://www.pref.shizuoka.jp/police/shinse/menkyo/oshirase/2007416.html",org:"Shizuoka Prefectural Police",t:"新基準原付について",checked:"2026-10-11"},
 ibarakiSchool:{url:"https://www.pref.ibaraki.jp/kenkei/a03_license/school/about.html",org:"Ibaraki Prefectural Police",t:"教習所について",checked:"2026-10-11"},
 shizuokaCourse:{url:"https://www.pref.shizuoka.jp/police/shinse/menkyo/koshu/shutokukoshu.html",org:"Shizuoka Prefectural Police",t:"取得時講習",checked:"2026-10-11"},
 tokyoPractice:{url:"https://www.keishicho.metro.tokyo.lg.jp/menkyo/menkyo/annai/other/rojorensyu_shinkoku.html",org:"Tokyo Metropolitan Police",t:"路上練習申告書",checked:"2026-10-11"},
 naganoRenewal:{url:"https://www.pref.nagano.lg.jp/police/menkyo/koushin/annai/annai.html",org:"Nagano Prefectural Police",t:"運転免許証等の更新案内",checked:"2026-10-11"},
 yamanashiRenewal:{url:"https://www.pref.yamanashi.jp/police/p_menkyo/menkyo_koushin20250324.html",org:"Yamanashi Prefectural Police",t:"運転免許及びマイナ免許証の更新手続き",checked:"2026-10-11"},
 tokyoIDP:{url:"https://www.keishicho.metro.tokyo.lg.jp/menkyo/menkyo/kokugai/kokusaimenkyo.html",org:"Tokyo Metropolitan Police",t:"国際運転免許証",checked:"2026-10-11"},
 kagawaIDP:{url:"https://www.pref.kagawa.lg.jp/police/menkyo/tetsuzuki/kokusai.html",org:"Kagawa Prefectural Police",t:"国外運転免許証の交付申請",checked:"2026-10-11"},
 mlitJibai:{url:"https://www.mlit.go.jp/jidosha/anzen/04relief/jibai/insurance.html",org:"Ministry of Land, Infrastructure, Transport and Tourism",t:"自賠責保険",checked:"2026-10-11"},
 fukuokaSpeed:{url:"https://www.pref.fukuoka.lg.jp/contents/houteisokudo2026.html",org:"Fukuoka Prefecture",t:"生活道路における法定速度の引下げ",checked:"2026-10-11"},
 fukuokaRulesEn:{url:"https://www.police.pref.fukuoka.jp/data/open/cnt/3/23136/1/English2.pdf",org:"Fukuoka Prefectural Police",t:"Follow the rules and drive safely in Japan (English)",checked:"2026-10-11"},
 wakayamaEn:{url:"https://www.police.pref.wakayama.lg.jp/english/documents/04_trafficdriving.pdf",org:"Wakayama Prefectural Police",t:"Traffic rules (English PDF)",checked:"2026-10-11"},
 npaAlcohol:{url:"https://www.npa.go.jp/bureau/traffic/insyu/info.html",org:"National Police Agency",t:"飲酒運転を絶対にしない、させない",checked:"2026-10-11"},
 npaPhone:{url:"https://www.npa.go.jp/bureau/traffic/keitai/info.html",org:"National Police Agency",t:"運転中のスマートフォン・携帯電話等使用",checked:"2026-10-11"},
 npaSeatbelt:{url:"https://www.npa.go.jp/bureau/traffic/anzen/seatbelt.html",org:"National Police Agency",t:"全ての座席でシートベルトを着用しましょう",checked:"2026-10-11"},
 tokyoMark:{url:"https://www.keishicho.metro.tokyo.lg.jp/kotsu/mark/mark.html",org:"Tokyo Metropolitan Police",t:"運転者標識",checked:"2026-10-11"},
 aichiParking:{url:"https://www.pref.aichi.jp/police/shinsei/koutsu/chusha-shinsei/chusha/chushadekinai.html",org:"Aichi Prefectural Police",t:"駐車できない場所",checked:"2026-10-11"},
 niigataHelmet:{url:"https://www.pref.niigata.lg.jp/site/kenkei/jitensya-helmet-gimu.html",org:"Niigata Prefectural Police",t:"自転車ヘルメット努力義務",checked:"2026-10-11"},
 npaBicycle:{url:"https://www.npa.go.jp/bureau/traffic/bicycle/info.html",org:"National Police Agency",t:"自転車は車のなかま",checked:"2026-10-11"},
 jsdc:{url:"https://www.jsdc.or.jp/certificate/tabid/110/Default.aspx",org:"Japan Safe Driving Center",t:"各種証明書",checked:"2026-10-11"},
 niigataRenewInfo:{url:"https://www.pref.niigata.lg.jp/site/kenkei/menkyo-kousin-kousin.html",org:"Niigata Prefectural Police",t:"運転免許証の更新",checked:"2026-10-11"},
 niigataReissue:{url:"https://www.pref.niigata.lg.jp/site/kenkei/menkyo-kousin-saikohu2.html",org:"Niigata Prefectural Police",t:"運転免許証の再交付",checked:"2026-10-11"},
 niigataAddress:{url:"https://www.pref.niigata.lg.jp/site/kenkei/kisaihenkou2.html",org:"Niigata Prefectural Police",t:"記載事項変更",checked:"2026-10-11"},
 jaf:{url:"https://english.jaf.or.jp/",org:"JAF (Japan Automobile Federation)",t:"JAF English site",checked:"2026-10-11"}
},

// ---- Foreign licence exchange: test exemption list (Tokyo & Osaka police pages, same list) ----
// "原則免除" = exempt in principle. Which licence classes are covered is NOT stated → users must confirm.
EXEMPT_SRC:["tokyoExchange","osakaExchange"],
COUNTRIES:[
 // [code, English, Nepali, Japanese, status]  status: "ex" exempt (in principle), "us" USA (depends on state), "tw" etc.
 ["IS","Iceland","आइसल्याण्ड","アイスランド","ex"],["IE","Ireland","आयरल्याण्ड","アイルランド","ex"],["US","United States","संयुक्त राज्य अमेरिका","アメリカ合衆国","us"],
 ["GB","United Kingdom","बेलायत","イギリス","ex"],["IT","Italy","इटाली","イタリア","ex"],["AU","Australia","अस्ट्रेलिया","オーストラリア","ex"],["AT","Austria","अस्ट्रिया","オーストリア","ex"],
 ["NL","Netherlands","नेदरल्याण्ड्स","オランダ","ex"],["CA","Canada","क्यानडा","カナダ","ex"],["KR","South Korea","दक्षिण कोरिया","韓国","ex"],["GR","Greece","ग्रीस","ギリシャ","ex"],
 ["CH","Switzerland","स्विट्जरल्याण्ड","スイス","ex"],["SE","Sweden","स्वीडेन","スウェーデン","ex"],["ES","Spain","स्पेन","スペイン","ex"],["SI","Slovenia","स्लोभेनिया","スロベニア","ex"],
 ["CZ","Czechia","चेकिया","チェコ","ex"],["DK","Denmark","डेनमार्क","デンマーク","ex"],["DE","Germany","जर्मनी","ドイツ","ex"],["NZ","New Zealand","न्युजिल्याण्ड","ニュージーランド","ex"],
 ["NO","Norway","नर्वे","ノルウェー","ex"],["HU","Hungary","हंगेरी","ハンガリー","ex"],["FI","Finland","फिनल्याण्ड","フィンランド","ex"],["FR","France","फ्रान्स","フランス","ex"],
 ["BE","Belgium","बेल्जियम","ベルギー","ex"],["PL","Poland","पोल्याण्ड","ポーランド","ex"],["PT","Portugal","पोर्चुगल","ポルトガル","ex"],["MC","Monaco","मोनाको","モナコ","ex"],
 ["LU","Luxembourg","लक्जमबर्ग","ルクセンブルク","ex"],["TW","Taiwan","ताइवान","台湾","ex"],
 // Not on the exemption list → knowledge and skill checks apply (exchange itself may still be possible)
 ["NP","Nepal","नेपाल","ネパール","no"],["IN","India","भारत","インド","no"],["BD","Bangladesh","बंगलादेश","バングラデシュ","no"],["LK","Sri Lanka","श्रीलंका","スリランカ","no"],
 ["PK","Pakistan","पाकिस्तान","パキスタン","no"],["VN","Vietnam","भियतनाम","ベトナム","no"],["PH","Philippines","फिलिपिन्स","フィリピン","no"],["ID","Indonesia","इन्डोनेसिया","インドネシア","no"],
 ["MM","Myanmar","म्यानमार","ミャンマー","no"],["TH","Thailand","थाइल्याण्ड","タイ","no"],["CN","China","चीन","中国","no"],["MN","Mongolia","मंगोलिया","モンゴル","no"],
 ["UZ","Uzbekistan","उज्बेकिस्तान","ウズベキスタン","no"],["KH","Cambodia","कम्बोडिया","カンボジア","no"],["MY","Malaysia","मलेसिया","マレーシア","no"],["SG","Singapore","सिंगापुर","シンガポール","no"],
 ["BR","Brazil","ब्राजिल","ブラジル","no"],["PE","Peru","पेरु","ペルー","no"],["MX","Mexico","मेक्सिको","メキシコ","no"],["NG","Nigeria","नाइजेरिया","ナイジェリア","no"],
 ["TR","Türkiye","टर्की","トルコ","no"],["RU","Russia","रुस","ロシア","no"],["UA","Ukraine","युक्रेन","ウクライナ","no"],["AE","United Arab Emirates","संयुक्त अरब इमिरेट्स","アラブ首長国連邦","no"]
],
// USA: only these states are on the list (Indiana: skill check only)
US_STATES:{full:["Ohio","Oregon","Colorado","Virginia","Hawaii","Maryland","Washington"],skillOnly:["Indiana"]},

// ---- Fees (Niigata fee table, in force from 24 Mar 2025; amounts match 道路交通法施行令 Art. 43) ----
FEES:{
 src:"niigataFees",
 issueCard:2350, issueMyna:1550, issueBoth:2450,       // licence card / マイナ免許証 / both
 testOrdinaryDirect:2500, testOrdinarySchool:1900, vehicleUse:800,
 provisionalTest:2950, provisionalCard:1100,
 renewalGeneral:{fee:2850,course:800,total:3650,src:"niigataRenewal"},
 exchangeTokyo:{application:2500,issue:2350,add:200,src:"tokyoExchange"},   // Tokyo lists these; Niigata page gives no amounts
 idpKagawa:{fee:2250,src:"kagawaIDP"}
},

// ---- Prefectures (official info verified only where marked; others → NPA list of prefectural police) ----
PREFS:[["hokkaido","北海道","Hokkaido"],["aomori","青森県","Aomori"],["iwate","岩手県","Iwate"],["miyagi","宮城県","Miyagi"],["akita","秋田県","Akita"],["yamagata","山形県","Yamagata"],["fukushima","福島県","Fukushima"],
 ["ibaraki","茨城県","Ibaraki"],["tochigi","栃木県","Tochigi"],["gunma","群馬県","Gunma"],["saitama","埼玉県","Saitama"],["chiba","千葉県","Chiba"],["tokyo","東京都","Tokyo"],["kanagawa","神奈川県","Kanagawa"],
 ["niigata","新潟県","Niigata"],["toyama","富山県","Toyama"],["ishikawa","石川県","Ishikawa"],["fukui","福井県","Fukui"],["yamanashi","山梨県","Yamanashi"],["nagano","長野県","Nagano"],
 ["gifu","岐阜県","Gifu"],["shizuoka","静岡県","Shizuoka"],["aichi","愛知県","Aichi"],["mie","三重県","Mie"],["shiga","滋賀県","Shiga"],["kyoto","京都府","Kyoto"],["osaka","大阪府","Osaka"],
 ["hyogo","兵庫県","Hyogo"],["nara","奈良県","Nara"],["wakayama","和歌山県","Wakayama"],["tottori","鳥取県","Tottori"],["shimane","島根県","Shimane"],["okayama","岡山県","Okayama"],
 ["hiroshima","広島県","Hiroshima"],["yamaguchi","山口県","Yamaguchi"],["tokushima","徳島県","Tokushima"],["kagawa","香川県","Kagawa"],["ehime","愛媛県","Ehime"],["kochi","高知県","Kochi"],
 ["fukuoka","福岡県","Fukuoka"],["saga","佐賀県","Saga"],["nagasaki","長崎県","Nagasaki"],["kumamoto","熊本県","Kumamoto"],["oita","大分県","Oita"],["miyazaki","宮崎県","Miyazaki"],
 ["kagoshima","鹿児島県","Kagoshima"],["okinawa","沖縄県","Okinawa"]],
PREF_INFO:{
 niigata:{
  name:"新潟県運転免許センター",nameEn:"Niigata Prefecture Driver's Licence Centre",
  address:"〒957-0193 新潟県北蒲原郡聖籠町東港7丁目1番地1",tel:"025-256-1212",web:"https://www.pref.niigata.lg.jp/site/kenkei/",
  branches:[["長岡","Nagaoka","0258-22-1050"],["上越","Joetsu","025-543-3100"],["佐渡","Sado","0259-55-0067"],["古町","Furumachi","025-229-0625"]],
  exchange:{tel:"025-256-4040",hours:{en:"Booking by phone only: Mon–Fri (not holidays) 9:00–16:15. All steps (document check, knowledge and skill checks) need a booking.",ne:"फोनबाट मात्र बुकिङ: सोम–शुक्र (बिदा बाहेक) ९:००–१६:१५। सबै चरण (कागजात जाँच, ज्ञान र सीप जाँच) बुकिङ गरेर मात्र।"},
   lang:{en:"Enquiries are in Japanese only. If you don't understand Japanese, bring an interpreter.",ne:"सोधपुछ जापानी भाषामा मात्र। जापानी नबुझ्ने भए दोभाषे लिएर जानुहोस्।"},src:"niigataExchange"},
  renewal:{en:"General renewal course reception: Mon–Fri 8:15–8:45 and 12:45–13:15. Sundays need an online booking and your renewal postcard. Closed Saturdays, holidays and 29 Dec–3 Jan.",ne:"सामान्य नवीकरण कक्षा दर्ता: सोम–शुक्र ८:१५–८:४५ र १२:४५–१३:१५। आइतबार अनलाइन बुकिङ र नवीकरण पोस्टकार्ड चाहिन्छ। शनिबार, बिदा र डिसेम्बर २९–जनवरी ३ बन्द।"},
  srcs:["niigataCentre","niigataExchange","niigataRenewal"]},
 tokyo:{nameEn:"Tokyo Metropolitan Police – foreign licence exchange",web:"https://www.keishicho.metro.tokyo.lg.jp/menkyo/menkyo/kokugai/kokugai05.html",srcs:["tokyoExchange"]},
 osaka:{nameEn:"Osaka Prefectural Police – foreign licence exchange",web:"https://www.police.pref.osaka.lg.jp/tetsuduki/untenmenkyo/3694.html",srcs:["osakaExchange"]}
},

// ---- Licence classes (Niigata exam guide; ages after the 1 Apr 2026 change; vehicle limits: Nagano police) ----
CLASSES:[
 {k:"futsu",ja:"普通免許",en:"Ordinary car",ne:"साधारण कार",age:{en:"Test from 17 years 6 months; licence issued from 18",ne:"१७ वर्ष ६ महिनादेखि परीक्षा; लाइसेन्स १८ वर्षदेखि"},
  veh:{en:"Gross weight under 3.5 t, max load under 2 t, up to 10 people",ne:"कुल तौल ३.५ टनभन्दा कम, भार २ टनभन्दा कम, १० जनासम्म"},src:["niigataExam","tokyoAge","naganoVehicles"]},
 {k:"junchu",ja:"準中型免許",en:"Semi-medium vehicle",ne:"अर्ध-मध्यम सवारी",age:{en:"Test from 17 years 6 months; licence issued from 18",ne:"१७ वर्ष ६ महिनादेखि परीक्षा; लाइसेन्स १८ देखि"},
  veh:{en:"Gross weight under 7.5 t, max load under 4.5 t",ne:"कुल तौल ७.५ टनभन्दा कम, भार ४.५ टनभन्दा कम"},src:["niigataExam","tokyoAge","naganoVehicles"]},
 {k:"chu",ja:"中型免許",en:"Medium vehicle",ne:"मध्यम सवारी",age:{en:"20+ with 2 years of licence experience (special course: 19+ with 1 year)",ne:"२० वर्ष+ र २ वर्ष लाइसेन्स अनुभव (विशेष कोर्स: १९+ र १ वर्ष)"},
  veh:{en:"Gross weight under 11 t, max load under 6.5 t, 11–29 people",ne:"कुल तौल ११ टनभन्दा कम, भार ६.५ टनभन्दा कम, ११–२९ जना"},src:["niigataExam","naganoVehicles"]},
 {k:"ogata",ja:"大型免許",en:"Large vehicle",ne:"ठूलो सवारी",age:{en:"21+ with 3 years of licence experience (special course: 19+ with 1 year)",ne:"२१ वर्ष+ र ३ वर्ष अनुभव (विशेष कोर्स: १९+ र १ वर्ष)"},
  veh:{en:"Gross weight 11 t or more, max load 6.5 t or more, 30+ people",ne:"कुल तौल ११ टन वा बढी, भार ६.५ टन वा बढी, ३०+ जना"},src:["niigataExam","naganoVehicles"]},
 {k:"futsu2",ja:"普通二輪免許",en:"Ordinary motorcycle",ne:"साधारण मोटरसाइकल",age:{en:"16+",ne:"१६ वर्ष+"},veh:null,src:["niigataExam"]},
 {k:"ogata2",ja:"大型二輪免許",en:"Large motorcycle",ne:"ठूलो मोटरसाइकल",age:{en:"18+",ne:"१८ वर्ष+"},veh:null,src:["niigataExam"]},
 {k:"gentsuki",ja:"原付免許",en:"Moped",ne:"मोपेड (原付)",age:{en:"16+",ne:"१६ वर्ष+"},
  veh:{en:"From 1 Apr 2025 this also covers new-standard bikes up to 125cc with max output 4.0 kW or less",ne:"२०२५ अप्रिल १ देखि १२५cc सम्म र अधिकतम शक्ति ४.० kW सम्मका नयाँ मापदण्डका बाइक पनि"},src:["niigataExam","shizuokaMoped"]},
 {k:"kogata",ja:"小型特殊免許",en:"Small special vehicle",ne:"सानो विशेष सवारी",age:{en:"16+",ne:"१६ वर्ष+"},veh:null,src:["niigataExam"]},
 {k:"ogatatoku",ja:"大型特殊免許",en:"Large special vehicle",ne:"ठूलो विशेष सवारी",age:{en:"18+",ne:"१८ वर्ष+"},veh:null,src:["niigataExam"]},
 {k:"kenin",ja:"けん引免許",en:"Towing",ne:"टोइङ",age:{en:"18+",ne:"१८ वर्ष+"},veh:null,src:["niigataExam"]},
 {k:"daini",ja:"第二種免許",en:"Class 2 (paid passenger transport, e.g. taxi)",ne:"दोस्रो श्रेणी (भाडामा यात्रु बोक्ने, जस्तै ट्याक्सी)",age:{en:"21+ with 3 years of experience (special course: 19+ with 1 year)",ne:"२१ वर्ष+ र ३ वर्ष अनुभव (विशेष कोर्स: १९+ र १ वर्ष)"},veh:null,src:["niigataExam"]}
],

// ---- Practice quiz: ORIGINAL questions written by Sathi Japan from the official rules below. Not real exam questions. ----
QUIZ:[
 {q:{en:"Which side of the road do cars drive on in Japan?",ne:"जापानमा कारहरू सडकको कुन भागमा चल्छन्?"},o:[{en:"Left",ne:"बायाँ"},{en:"Right",ne:"दायाँ"},{en:"Either side",ne:"जुनसुकै"}],a:0,
  e:{en:"Japan drives on the left.",ne:"जापानमा बायाँ भागमा चलाइन्छ।"},src:"wakayamaEn"},
 {q:{en:"Since 1 Sep 2026, what is the legal speed limit on residential roads without a centre line (when no sign shows another limit)?",ne:"२०२६ सेप्टेम्बर १ देखि, बीचको रेखा नभएका आवासीय सडकमा (अर्को सङ्केत नभए) कानुनी गति सीमा कति हो?"},o:[{en:"30 km/h",ne:"३० किमी/घण्टा"},{en:"40 km/h",ne:"४० किमी/घण्टा"},{en:"60 km/h",ne:"६० किमी/घण्टा"}],a:0,
  e:{en:"30 km/h on residential roads without a centre line. 60 km/h stays on general roads with a centre line or lanes.",ne:"बीचको रेखा नभएका आवासीय सडकमा ३०। बीचको रेखा वा लेन भएका सामान्य सडकमा ६० नै।"},src:"fukuokaSpeed"},
 {q:{en:"You reach a railway crossing. The barrier is up and there is no alarm. What must you do?",ne:"तपाईं रेलवे क्रसिङमा पुग्नुभयो। बार माथि छ र घण्टी बजेको छैन। के गर्नुपर्छ?"},o:[{en:"Stop completely, check safety, then cross",ne:"पूरै रोक्नुहोस्, सुरक्षा जाँच्नुहोस्, अनि पार गर्नुहोस्"},{en:"Slow down and cross",ne:"गति घटाएर पार गर्नुहोस्"},{en:"Cross quickly",ne:"छिटो पार गर्नुहोस्"}],a:0,
  e:{en:"You must make a full stop at railway crossings even when there is no alarm.",ne:"घण्टी नबजे पनि रेलवे क्रसिङमा पूरै रोक्नुपर्छ।"},src:"fukuokaRulesEn"},
 {q:{en:"A pedestrian is about to step onto a crosswalk ahead (no traffic light). What do you do?",ne:"अगाडिको जेब्रा क्रसिङमा (ट्राफिक बत्ती छैन) पैदलयात्री पार गर्न लाग्दैछन्। के गर्ने?"},o:[{en:"Stop and let them cross",ne:"रोकेर पार गर्न दिनुहोस्"},{en:"Sound the horn and continue",ne:"हर्न बजाएर अघि बढ्नुहोस्"},{en:"Go around them",ne:"छेउबाट निस्कनुहोस्"}],a:0,
  e:{en:"If a pedestrian is crossing or about to cross, you must stop.",ne:"पैदलयात्री पार गर्दै वा गर्न लाग्दै भए रोक्नैपर्छ।"},src:"fukuokaRulesEn"},
 {q:{en:"Drink-driving (酒気帯び運転) starts at what breath alcohol level?",ne:"मादक पदार्थ सेवन गरी सवारी (酒気帯び) कति सासको अल्कोहल स्तरबाट सुरु हुन्छ?"},o:[{en:"0.15 mg per litre of breath",ne:"सासको प्रति लिटर ०.१५ mg"},{en:"0.5 mg per litre",ne:"प्रति लिटर ०.५ mg"},{en:"Only when you feel drunk",ne:"मात्तिएको महसुस भए मात्र"}],a:0,
  e:{en:"0.15 mg/L or more. People who lend the car, serve the alcohol or ride as passengers can also be punished.",ne:"०.१५ mg/L वा बढी। कार दिने, रक्सी दिने वा सँगै चढ्नेलाई पनि सजाय हुन सक्छ।"},src:"npaAlcohol"},
 {q:{en:"Holding your phone while driving an ordinary car (no accident). What can happen?",ne:"साधारण कार चलाउँदा फोन हातमा लिनु (दुर्घटना नभए पनि)। के हुन सक्छ?"},o:[{en:"A ¥18,000 penalty and 3 points",ne:"¥१८,००० जरिवाना र ३ अंक"},{en:"Nothing if you stop at a light",ne:"बत्तीमा रोकिँदा केही हुँदैन"},{en:"Only a warning",ne:"चेतावनी मात्र"}],a:0,
  e:{en:"For an ordinary car the penalty (反則金) is ¥18,000 and 3 points; causing danger is punished more heavily.",ne:"साधारण कारका लागि 反則金 ¥१८,००० र ३ अंक; खतरा निम्त्याए झन् कडा सजाय।"},src:"npaPhone"},
 {q:{en:"Who must wear a seat belt?",ne:"कसले सिटबेल्ट लगाउनुपर्छ?"},o:[{en:"Everyone, in all seats",ne:"सबै सिटमा सबैजना"},{en:"Only the driver",ne:"चालक मात्र"},{en:"Only front seats",ne:"अगाडिका सिट मात्र"}],a:0,
  e:{en:"Seat belts are required in all seats, including the back. Children under 6 should use a child seat.",ne:"पछाडिसहित सबै सिटमा सिटबेल्ट चाहिन्छ। ६ वर्षमुनिका बच्चालाई चाइल्ड सिट प्रयोग गराउनुहोस्।"},src:"npaSeatbelt"},
 {q:{en:"How long must a new ordinary-car driver show the beginner mark (初心者マーク)?",ne:"नयाँ साधारण कार चालकले 初心者マーク कति समय देखाउनुपर्छ?"},o:[{en:"For 1 year after getting the licence",ne:"लाइसेन्स पाएको १ वर्षसम्म"},{en:"For 3 months",ne:"३ महिना"},{en:"It is optional",ne:"ऐच्छिक हो"}],a:0,
  e:{en:"Under 1 year of licence: show it front and rear, 0.4–1.2 m high. Not showing it: ¥4,000 and 1 point.",ne:"लाइसेन्स १ वर्ष नपुग्दासम्म: अगाडि र पछाडि, ०.४–१.२ मिटर उचाइमा। नदेखाए ¥४,००० र १ अंक।"},src:"tokyoMark"},
 {q:{en:"Within how many metres of an intersection is stopping and parking prohibited?",ne:"चोकबाट कति मिटरभित्र रोक्न र पार्क गर्न निषेध छ?"},o:[{en:"5 m",ne:"५ मिटर"},{en:"1 m",ne:"१ मिटर"},{en:"20 m",ne:"२० मिटर"}],a:0,
  e:{en:"5 m from an intersection or corner and from a crosswalk; 10 m from a bus stop or railway crossing.",ne:"चोक वा मोड र जेब्रा क्रसिङबाट ५ मिटर; बस स्टप वा रेलवे क्रसिङबाट १० मिटर।"},src:"aichiParking"},
 {q:{en:"From 1 Apr 2026, cyclists aged 16+ can get a “blue ticket” (fine) for traffic violations. Where should bicycles ride?",ne:"२०२६ अप्रिल १ देखि १६+ उमेरका साइकल चालकले नियम उल्लङ्घनमा “निलो टिकट” (जरिवाना) पाउन सक्छन्। साइकल कहाँ चलाउनुपर्छ?"},o:[{en:"On the left side of the roadway",ne:"सडकको बायाँ भागमा"},{en:"Anywhere on the pavement",ne:"फुटपाथमा जहाँसुकै"},{en:"On the right side",ne:"दायाँ भागमा"}],a:0,
  e:{en:"Bicycles are vehicles: ride on the left of the roadway. Wearing a helmet is expected of all cyclists (努力義務).",ne:"साइकल पनि सवारी हो: सडकको बायाँ भागमा चलाउनुहोस्। सबै साइकल चालकले हेल्मेट लगाउने प्रयास गर्नुपर्छ (努力義務)।"},src:"npaBicycle"}
],

// ---- Japanese terms you will see on forms and signs ----
TERMS:[
 ["外国免許切替","gaikoku menkyo kirikae",{en:"Exchanging a foreign licence for a Japanese one",ne:"विदेशी लाइसेन्सलाई जापानी लाइसेन्समा बदल्ने"}],
 ["運転免許センター","unten menkyo sentā",{en:"Driver's licence centre",ne:"ड्राइभिङ लाइसेन्स केन्द्र"}],
 ["住民票","jūminhyō",{en:"Certificate of residence (from your city office)",ne:"बसोबास प्रमाणपत्र (सिटी कार्यालयबाट)"}],
 ["仮免許","karimenkyo",{en:"Learner permit",ne:"सिकारु अनुमति"}],
 ["本免許","honmenkyo",{en:"Full licence",ne:"पूर्ण लाइसेन्स"}],
 ["指定自動車教習所","shitei jidōsha kyōshūjo",{en:"Designated driving school (graduates skip the skill test)",ne:"तोकिएको ड्राइभिङ स्कूल (उत्तीर्णले सीप परीक्षा दिनु पर्दैन)"}],
 ["一発試験","ippatsu shiken",{en:"Taking the tests directly at the centre, without a driving school",ne:"स्कूल नगई सिधै केन्द्रमा परीक्षा दिने"}],
 ["取得時講習","shutokuji kōshū",{en:"Required course before your first licence (direct route)",ne:"पहिलो लाइसेन्सअघि अनिवार्य कोर्स (सिधा बाटो)"}],
 ["適性試験","tekisei shiken",{en:"Aptitude test (eyesight etc.)",ne:"योग्यता परीक्षा (आँखा आदि)"}],
 ["学科試験","gakka shiken",{en:"Written knowledge test",ne:"लिखित ज्ञान परीक्षा"}],
 ["技能試験","ginō shiken",{en:"Practical driving test",ne:"व्यावहारिक ड्राइभिङ परीक्षा"}],
 ["更新連絡書","kōshin renrakusho",{en:"Renewal notice postcard",ne:"नवीकरण सूचना पोस्टकार्ड"}],
 ["マイナ免許証","maina menkyoshō",{en:"Licence recorded on your My Number card",ne:"My Number कार्डमा राखिएको लाइसेन्स"}],
 ["初心者マーク","shoshinsha māku",{en:"Beginner driver mark (green and yellow)",ne:"नयाँ चालक चिन्ह (हरियो र पहेँलो)"}],
 ["一時停止","ichiji teishi",{en:"Stop sign / full stop",ne:"पूर्ण रोक्ने सङ्केत"}],
 ["法定速度","hōtei sokudo",{en:"Legal speed limit (when no sign)",ne:"कानुनी गति सीमा (सङ्केत नभए)"}],
 ["反則金","hansokukin",{en:"Traffic penalty payment",ne:"ट्राफिक जरिवाना"}],
 ["自賠責保険","jibaiseki hoken",{en:"Compulsory vehicle insurance",ne:"अनिवार्य सवारी बीमा"}],
 ["任意保険","nin'i hoken",{en:"Optional (voluntary) car insurance",ne:"ऐच्छिक सवारी बीमा"}],
 ["国外運転免許証","kokugai unten menkyoshō",{en:"Japanese international driving permit (to drive abroad)",ne:"विदेशमा चलाउन जापानी अन्तर्राष्ट्रिय अनुमति"}]
],

// ---- Document checklists. need: "all" = everyone; "dep" = depends on prefecture / country / situation ----
CHECKLISTS:{
 exchange:{src:["npaForeign","niigataExchange"],items:[
  {need:"all",t:{en:"Your foreign driving licence (the original)",ne:"विदेशी ड्राइभिङ लाइसेन्स (सक्कल)"},w:{en:"An international driving permit is NOT accepted instead.",ne:"यसको सट्टा अन्तर्राष्ट्रिय ड्राइभिङ अनुमति मान्य हुँदैन।"}},
  {need:"all",t:{en:"Japanese translation of your licence",ne:"लाइसेन्सको जापानी अनुवाद"},w:{en:"Only from: the issuing country's authority or its embassy/consulate in Japan, JAF, ジップラス, 訪日運転者支援協会, ADAC (Germany) or 台湾日本関係協会 (Taiwan). Translations by private certified translators are not accepted.",ne:"यिनबाट मात्र: लाइसेन्स दिने देशको निकाय वा जापानस्थित दूतावास/कन्सुलेट, JAF, ジップラス, 訪日運転者支援協会, ADAC (जर्मनी) वा 台湾日本関係協会 (ताइवान)। निजी प्रमाणित अनुवादकको अनुवाद मान्य छैन।"}},
  {need:"all",t:{en:"Passport(s) with stamps showing 3+ months in the issuing country after you got the licence",ne:"लाइसेन्स पाएपछि त्यो देशमा ३+ महिना बसेको देखाउने छाप भएको पासपोर्ट"},w:{en:"Niigata asks for ALL your passports, current and old.",ne:"निगाताले हालको र पुराना सबै पासपोर्ट माग्छ।"}},
  {need:"all",t:{en:"住民票 (certificate of residence) showing your nationality",ne:"राष्ट्रियता देखिने 住民票 (बसोबास प्रमाणपत्र)"},w:{en:"From your city/ward office. Ask for one WITHOUT your My Number. Must be recent (Tokyo: issued within 6 months).",ne:"सिटी/वार्ड कार्यालयबाट। My Number नभएको माग्नुहोस्। हालैको हुनुपर्छ (टोकियो: ६ महिनाभित्र)।"}},
  {need:"all",t:{en:"Residence card (在留カード) and ID",ne:"रेसिडेन्स कार्ड (在留カード) र परिचयपत्र"},w:{en:"Passport or My Number card is accepted as ID.",ne:"परिचयपत्रका रूपमा पासपोर्ट वा My Number कार्ड मान्य।"}},
  {need:"all",t:{en:"1 photo, 3.0 × 2.4 cm, taken within 6 months",ne:"१ फोटो, ३.० × २.४ से.मि., ६ महिनाभित्र खिचेको"},w:{en:"Niigata: bring it after the document check.",ne:"निगाता: कागजात जाँचपछि ल्याउनुहोस्।"}},
  {need:"all",t:{en:"Application form and health questionnaire (質問票)",ne:"आवेदन फारम र स्वास्थ्य प्रश्नावली (質問票)"},w:{en:"Given at the licence centre.",ne:"लाइसेन्स केन्द्रमा दिइन्छ।"}},
  {need:"all",t:{en:"Fees",ne:"शुल्क"},w:{en:"See the Costs section. Applying through someone else (proxy) is not allowed.",ne:"खर्च खण्ड हेर्नुहोस्। अरूमार्फत (प्रोक्सी) आवेदन दिन मिल्दैन।"}},
  {need:"dep",t:{en:"Copies of your documents",ne:"कागजातका प्रतिलिपि"},w:{en:"Niigata asks for copies after the document check – ask your centre what to copy.",ne:"निगाताले कागजात जाँचपछि प्रतिलिपि माग्छ – के-के चाहिन्छ केन्द्रलाई सोध्नुहोस्।"}}]},
 newSchool:{src:["niigataExam","ibarakiSchool"],items:[
  {need:"all",t:{en:"Graduation certificate (卒業証明書) from a designated driving school",ne:"तोकिएको ड्राइभिङ स्कूलको 卒業証明書"},w:{en:"Lets you skip the skill test at the centre. Ask the school how long it is valid.",ne:"केन्द्रमा सीप परीक्षा दिनु पर्दैन। कति समय मान्य हुन्छ स्कूललाई सोध्नुहोस्।"}},
  {need:"all",t:{en:"住民票 showing your nationality, without My Number",ne:"राष्ट्रियता देखिने, My Number नभएको 住民票"},w:{en:"From your city/ward office.",ne:"सिटी/वार्ड कार्यालयबाट।"}},
  {need:"all",t:{en:"Passport and residence card",ne:"पासपोर्ट र रेसिडेन्स कार्ड"},w:{en:"Required for foreign nationals.",ne:"विदेशी नागरिकलाई अनिवार्य।"}},
  {need:"all",t:{en:"1 photo, 3 × 2.4 cm, taken within 6 months",ne:"१ फोटो, ३ × २.४ से.मि., ६ महिनाभित्रको"},w:null},
  {need:"dep",t:{en:"Glasses or contact lenses, if you need them",ne:"चस्मा वा कन्ट्याक्ट लेन्स, चाहिने भए"},w:{en:"For the eye test.",ne:"आँखा परीक्षाका लागि।"}}]},
 newDirect:{src:["niigataExam","tokyoPractice","shizuokaCourse"],items:[
  {need:"all",t:{en:"住民票 showing your nationality, without My Number",ne:"राष्ट्रियता देखिने, My Number नभएको 住民票"},w:null},
  {need:"all",t:{en:"Passport and residence card",ne:"पासपोर्ट र रेसिडेन्स कार्ड"},w:null},
  {need:"all",t:{en:"Photos, 3 × 2.4 cm, within 6 months (2 for the learner-permit test)",ne:"फोटो, ३ × २.४ से.मि., ६ महिनाभित्र (सिकारु अनुमति परीक्षामा २ वटा)"},w:null},
  {need:"all",t:{en:"Record of 5+ days of road practice in the last 3 months (before the road test)",ne:"सडक परीक्षाअघि पछिल्लो ३ महिनामा ५+ दिन सडक अभ्यासको अभिलेख"},w:{en:"With a supervisor who has held a licence for that vehicle for 3+ years. A practice report (申告書) may be required.",ne:"त्यो सवारीको लाइसेन्स ३+ वर्ष भएका व्यक्तिसँग। अभ्यास प्रतिवेदन (申告書) चाहिन सक्छ।"}},
  {need:"all",t:{en:"Certificate of the required course (取得時講習) before the licence is issued",ne:"लाइसेन्स पाउनुअघि 取得時講習 कोर्स पूरा गरेको प्रमाण"},w:{en:"Ordinary car: 4-hour course plus 3-hour first-aid course (some licence holders are exempt from first aid).",ne:"साधारण कार: ४ घण्टा कोर्स र ३ घण्टा प्राथमिक उपचार कोर्स (केही लाइसेन्सधारीलाई प्राथमिक उपचार छुट)।"}},
  {need:"dep",t:{en:"Glasses or contact lenses, if you need them",ne:"चस्मा वा कन्ट्याक्ट लेन्स, चाहिने भए"},w:null}]},
 renew:{src:["niigataRenewInfo","npaJapan","npaMyna"],items:[
  {need:"all",t:{en:"Your current driving licence",ne:"हालको ड्राइभिङ लाइसेन्स"},w:null},
  {need:"all",t:{en:"Renewal notice postcard (更新連絡書 / 更新通知書)",ne:"नवीकरण सूचना पोस्टकार्ड (更新連絡書)"},w:{en:"Niigata sends it about 40 days before your birthday. If it doesn't arrive, ask your centre.",ne:"निगाताले जन्मदिनभन्दा करिब ४० दिनअघि पठाउँछ। नआए केन्द्रलाई सोध्नुहोस्।"}},
  {need:"dep",t:{en:"Glasses or contact lenses, if you need them",ne:"चस्मा वा कन्ट्याक्ट लेन्स, चाहिने भए"},w:null},
  {need:"dep",t:{en:"Photo, fee and other items",ne:"फोटो, शुल्क र अन्य"},w:{en:"Not listed on the Niigata renewal page – check the notice postcard.",ne:"निगाताको नवीकरण पेजमा उल्लेख छैन – सूचना पोस्टकार्ड हेर्नुहोस्।"}},
  {need:"dep",t:{en:"Age 70+: older-driver course (高齢者講習) first",ne:"७० वर्ष+: पहिले 高齢者講習"},w:null}]},
 lost:{src:["niigataReissue"],items:[
  {need:"all",t:{en:"1 photo, 3 × 2.4 cm, taken within 6 months",ne:"१ फोटो, ३ × २.४ से.मि., ६ महिनाभित्रको"},w:null},
  {need:"all",t:{en:"Original ID (no photocopies)",ne:"सक्कल परिचयपत्र (फोटोकपी होइन)"},w:{en:"My Number card or residence card alone is enough.",ne:"My Number कार्ड वा रेसिडेन्स कार्ड मात्र भए पुग्छ।"}},
  {need:"dep",t:{en:"The damaged licence, if you still have it",ne:"बिग्रिएको लाइसेन्स, छ भने"},w:null},
  {need:"dep",t:{en:"マイナ免許証 holders: your signature PIN (署名用電子証明書)",ne:"マイナ免許証 भएका: हस्ताक्षर PIN (署名用電子証明書)"},w:null},
  {need:"all",t:{en:"Fee (Niigata): ¥2,600 for a lost licence card",ne:"शुल्क (निगाता): हराएको लाइसेन्स कार्डका लागि ¥२,६००"},w:{en:"Same day at the centre and main branches; about 3 weeks at police stations. Weekdays only.",ne:"केन्द्र र मुख्य शाखामा त्यही दिन; प्रहरी चौकीमा करिब ३ हप्ता। कार्यदिनमा मात्र।"}}]},
 address:{src:["niigataAddress","npaJapan"],items:[
  {need:"all",t:{en:"Your driving licence",ne:"तपाईंको ड्राइभिङ लाइसेन्स"},w:null},
  {need:"all",t:{en:"New address: residence card, or 住民票",ne:"नयाँ ठेगाना: रेसिडेन्स कार्ड वा 住民票"},w:{en:"Do it promptly after moving – not doing so can be fined up to ¥20,000.",ne:"सरेपछि छिट्टै गर्नुहोस् – नगरे ¥२०,००० सम्म जरिवाना हुन सक्छ।"}},
  {need:"dep",t:{en:"New name: 住民票 showing nationality, or My Number card with the new name",ne:"नयाँ नाम: राष्ट्रियता देखिने 住民票, वा नयाँ नाम भएको My Number कार्ड"},w:null}]}
}
};

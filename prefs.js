// The 47 prefectures: id, Japanese, English, and the approximate position of the prefectural capital
// (used only to guess "Near me" from the phone's location – the location never leaves the phone).
window.SATHI_PREFS = [
 ["hokkaido","北海道","Hokkaido",43.06,141.35],["aomori","青森県","Aomori",40.82,140.74],["iwate","岩手県","Iwate",39.70,141.15],["miyagi","宮城県","Miyagi",38.27,140.87],
 ["akita","秋田県","Akita",39.72,140.10],["yamagata","山形県","Yamagata",38.24,140.36],["fukushima","福島県","Fukushima",37.75,140.47],["ibaraki","茨城県","Ibaraki",36.34,140.45],
 ["tochigi","栃木県","Tochigi",36.57,139.88],["gunma","群馬県","Gunma",36.39,139.06],["saitama","埼玉県","Saitama",35.86,139.65],["chiba","千葉県","Chiba",35.61,140.12],
 ["tokyo","東京都","Tokyo",35.69,139.69],["kanagawa","神奈川県","Kanagawa",35.45,139.64],["niigata","新潟県","Niigata",37.90,139.02],["toyama","富山県","Toyama",36.70,137.21],
 ["ishikawa","石川県","Ishikawa",36.59,136.63],["fukui","福井県","Fukui",36.07,136.22],["yamanashi","山梨県","Yamanashi",35.66,138.57],["nagano","長野県","Nagano",36.65,138.18],
 ["gifu","岐阜県","Gifu",35.39,136.72],["shizuoka","静岡県","Shizuoka",34.98,138.38],["aichi","愛知県","Aichi",35.18,136.91],["mie","三重県","Mie",34.73,136.51],
 ["shiga","滋賀県","Shiga",35.00,135.87],["kyoto","京都府","Kyoto",35.02,135.76],["osaka","大阪府","Osaka",34.69,135.52],["hyogo","兵庫県","Hyogo",34.69,135.18],
 ["nara","奈良県","Nara",34.69,135.83],["wakayama","和歌山県","Wakayama",34.23,135.17],["tottori","鳥取県","Tottori",35.50,134.24],["shimane","島根県","Shimane",35.47,133.05],
 ["okayama","岡山県","Okayama",34.66,133.93],["hiroshima","広島県","Hiroshima",34.40,132.46],["yamaguchi","山口県","Yamaguchi",34.19,131.47],["tokushima","徳島県","Tokushima",34.07,134.56],
 ["kagawa","香川県","Kagawa",34.34,134.04],["ehime","愛媛県","Ehime",33.84,132.77],["kochi","高知県","Kochi",33.56,133.53],["fukuoka","福岡県","Fukuoka",33.61,130.42],
 ["saga","佐賀県","Saga",33.25,130.30],["nagasaki","長崎県","Nagasaki",32.74,129.87],["kumamoto","熊本県","Kumamoto",32.79,130.74],["oita","大分県","Oita",33.24,131.61],
 ["miyazaki","宮崎県","Miyazaki",31.91,131.42],["kagoshima","鹿児島県","Kagoshima",31.56,130.56],["okinawa","沖縄県","Okinawa",26.21,127.68]
];
window.SATHI_PREFS.nearest = function (lat, lon) {
  let best = null, bd = Infinity;
  for (const p of window.SATHI_PREFS) { const d = (p[3] - lat) ** 2 + ((p[4] - lon) * Math.cos(lat * Math.PI / 180)) ** 2; if (d < bd) { bd = d; best = p; } }
  return best;
};

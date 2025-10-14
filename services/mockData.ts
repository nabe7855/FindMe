/**
 * @file アプリケーション開発用のモックデータを提供します。
 * APIが完成するまでの代用、またはオフラインデモ用として使用されます。
 */
import { Store } from "../types";

/**
 * 店舗情報のモックデータ配列。
 */
export const mockStores: Store[] = [
  {
    id: 1,
    name: "美食楽苑",
    genre: "居酒屋",
    area: "新宿区",
    prefecture: "東京都",
    catch_phrase: "新宿の隠れ家で味わう、四季折々の創作和食",
    rating: 4.5,
    reviewCount: 128,
    imageUrl: "https://picsum.photos/seed/restaurant1/800/600",
    address: "東京都新宿区新宿3-1-1",
    phone: "03-1234-5678",
    openingHours: "17:00～23:30",
    closingDay: "日曜日",
    priceRange: "￥5,000～￥6,000",
    reviews: [
      {
        id: 101,
        author: "田中",
        rating: 5,
        comment:
          "料理が本当に美味しい。特に旬の魚を使ったお造りは絶品でした。",
        date: "2023-10-26",
      },
      {
        id: 102,
        author: "鈴木",
        rating: 4,
        comment:
          "雰囲気が良く、デートに最適です。少し値段は張りますが価値はあります。",
        date: "2023-10-20",
      },
    ],
  },
  {
    id: 2,
    name: "Trattoria Cielo",
    genre: "イタリアン",
    area: "中央区",
    prefecture: "大阪府",
    catch_phrase: "心斎橋の空の下、本格石窯ピッツァとワインを",
    rating: 4.2,
    reviewCount: 95,
    imageUrl: "https://picsum.photos/seed/restaurant2/800/600",
    address: "大阪府大阪市中央区心斎橋筋2-2-2",
    phone: "06-8765-4321",
    openingHours: "11:30～15:00, 18:00～22:00",
    closingDay: "月曜日",
    priceRange: "￥4,000～￥5,000",
    reviews: [
      {
        id: 201,
        author: "佐藤",
        rating: 4,
        comment: "ピザがモチモチで最高！パスタも美味しかったです。",
        date: "2023-11-01",
      },
      {
        id: 202,
        author: "高橋",
        rating: 5,
        comment:
          "店員さんの対応が素晴らしく、気持ちよく食事ができました。",
        date: "2023-10-15",
      },
    ],
  },
  {
    id: 3,
    name: "博多ラーメン 一心",
    genre: "ラーメン",
    area: "博多区",
    prefecture: "福岡県",
    catch_phrase: "創業三十年、変わらぬ本場の豚骨スープ",
    rating: 4.8,
    reviewCount: 340,
    imageUrl: "https://picsum.photos/seed/restaurant3/800/600",
    address: "福岡県福岡市博多区博多駅前1-1-1",
    phone: "092-111-2222",
    openingHours: "11:00～翌2:00",
    closingDay: "年中無休",
    priceRange: "～￥1,000",
    reviews: [
      {
        id: 301,
        author: "渡辺",
        rating: 5,
        comment:
          "これぞ博多ラーメン！スープまで飲み干してしまいました。",
        date: "2023-11-05",
      },
    ],
  },
  {
    id: 4,
    name: "SALON de LUXE",
    genre: "美容室",
    area: "中区",
    prefecture: "愛知県",
    catch_phrase: "栄の上質空間で、あなただけのスタイルを",
    rating: 4.9,
    reviewCount: 78,
    imageUrl: "https://picsum.photos/seed/salon1/800/600",
    address: "愛知県名古屋市中区栄3-3-3",
    phone: "052-333-4444",
    openingHours: "10:00～20:00",
    closingDay: "火曜日",
    priceRange: "￥10,000～",
    reviews: [
      {
        id: 401,
        author: "伊藤",
        rating: 5,
        comment:
          "カウンセリングが丁寧で、理想通りの髪型になりました！",
        date: "2023-10-28",
      },
    ],
  },
  {
    id: 5,
    name: "Cafe Foresta",
    genre: "カフェ",
    area: "札幌市中央区",
    prefecture: "北海道",
    catch_phrase:
      "森の中にいるような癒やしの空間で、自家焙煎コーヒーを",
    rating: 4.6,
    reviewCount: 152,
    imageUrl: "https://picsum.photos/seed/cafe1/800/600",
    address: "北海道札幌市中央区南1条西2丁目",
    phone: "011-555-6666",
    openingHours: "9:00～19:00",
    closingDay: "水曜日",
    priceRange: "￥1,000～￥2,000",
    reviews: [
      {
        id: 501,
        author: "山田",
        rating: 5,
        comment:
          "コーヒーが美味しいのはもちろん、チーズケーキが絶品です。",
        date: "2023-11-03",
      },
      {
        id: 502,
        author: "加藤",
        rating: 4,
        comment:
          "読書するのにぴったりの静かで落ち着いたカフェ。",
        date: "2023-10-18",
      },
    ],
  },
];

/**
 * @file 共通で使用される型定義
 */

/** 口コミデータ */
export interface Review {
  id: number;
  author: string; // 投稿者名
  rating: number; // 星の数（例: 1〜5）
  comment: string; // 口コミ本文
  date?: string; // 投稿日（ISO形式 or yyyy-mm-dd）※任意
}

/** 店舗データ（共通） */
export interface Store {
  id: number;
  name: string; // 店舗名
  genre?: string; // 業種・カテゴリ（例: カフェ、美容室など）
  area?: string; // 地域名（例: 渋谷、新宿）
  prefecture?: string; // 都道府県（例: 東京都）
  catch_phrase?: string; // キャッチコピー
  description?: string; // 詳細説明
  rating: number; // 星評価（例: 4.5）
  imageUrl?: string; // メイン画像URL

  // ✅ 詳細情報タブ（StoreInfoTabs）対応フィールド
  address?: string; // 住所
  phone?: string; // 電話番号
  openingHours?: string; // 営業時間
  closingDay?: string; // 定休日
  priceRange?: string; // 価格帯（例: ¥1000〜¥3000）

  // ✅ 口コミ関連
  reviewCount?: number; // 口コミ件数
  reviews?: Review[]; // 関連する口コミ一覧
}

/** 🏠 来店型店舗データ */
export interface PhysicalStore extends Store {
  /** 駐車場情報（例: "店舗前に2台分あり" など） */
  parkingInfo?: string;

  /** 駐車場の有無（true: あり, false: なし） */
  hasParking?: boolean;

  /** 座席数（例: 40席） */
  seatingCapacity?: number;

  /** Googleマップなどの地図URL */
  mapUrl?: string;

  /** メニュー情報（例: ["ランチセット", "コーヒー", "ケーキ"]） */
  menu?: string[];

  /** 特典・オファー情報（例: ["初回10%OFF", "ドリンク無料券"]） */
  offers?: string[]; // ← ✅ これを追加！
}


/** 🛍️ オンライン店舗データ */
export interface OnlineStore extends Store {
  /** 通販サイトURL */
  websiteUrl?: string;

  /** 配送オプション（例: "即日配送", "送料無料" など） */
  deliveryOptions?: string[];

  /** 決済方法（例: "クレジットカード", "PayPay" など） */
  paymentMethods?: string[];

  /** 在庫ステータス（例: "在庫あり", "在庫なし", "予約受付中"） */
  stockStatus?: string;

  /** 特集・キャンペーン（例: "秋のセール", "限定コラボ" など） */
  campaign?: string;
  
}

/** AIコンシェルジュの結果データ */
export interface ConciergeResult {
  id: number;
  name: string;
  description: string;
  genre?: string;
  area?: string;
  prefecture?: string;
  image?: string;
  rating?: number;
  recommendation_reason?: string;
  matchScore?: number;
}

/** 🔍 検索条件の型 */
export interface SearchCriteria {
  prefecture: string;
  genre: string;
  keyword: string;
  sort?: "rating" | "newest" | "recommended";
}

/** 📈 トレンドデータ */
export interface TrendData {
  risingKeywords: { keyword: string; volume: number }[];
  trendingStores: { name: string; reason: string }[];
  competitiveInsights: string;
}
/** 🛍️ オンライン店舗データ */
export interface OnlineStore extends Store {
  websiteUrl?: string;
  deliveryOptions?: string[];
  paymentMethods?: string[];
  stockStatus?: string;
  campaign?: string;

  /** 配送に関する詳細情報（例: 送料、地域制限など） */
  shippingInfo?: string;
}
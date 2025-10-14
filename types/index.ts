/**
 * @file 共通で使用される型定義
 */

/** 口コミデータ */
export interface Review {
  id: number;
  author: string;          // 投稿者名
  rating: number;          // 星の数（例: 1〜5）
  comment: string;         // 口コミ本文
  date?: string;           // 投稿日（ISO形式 or yyyy-mm-dd）※任意
}

/** 店舗データ */
export interface Store {
  id: number;
  name: string;            // 店舗名
  genre?: string;          // 業種・カテゴリ（例: カフェ、美容室など）
  area?: string;           // 地域名（例: 渋谷、新宿）
  prefecture?: string;     // 都道府県（例: 東京都）
  catch_phrase?: string;   // キャッチコピー
  description?: string;    // 詳細説明
  rating: number;         // 星評価（例: 4.5）
  imageUrl?: string;       // メイン画像URL

  // ✅ 詳細情報タブ（StoreInfoTabs）対応フィールド
  address?: string;        // 住所
  phone?: string;          // 電話番号
  openingHours?: string;   // 営業時間
  closingDay?: string;     // 定休日
  priceRange?: string;     // 価格帯（例: ¥1000〜¥3000）

  // ✅ 口コミ関連
  reviewCount?: number;    // 口コミ件数
  reviews?: Review[];      // 関連する口コミ一覧
}

/** AIコンシェルジュの結果データ */
export interface ConciergeResult {
  id: number;                       // 結果ID
  storeId: number;                  // 紐づく店舗ID
  recommendation_reason: string;    // 推薦理由（AI生成など）
  matchScore?: number;              // マッチングスコア（任意）
  store?: Store;                    // 紐づく店舗データ
}

/** 🔍 検索条件の型 */
export interface SearchCriteria {
  /** 都道府県（例: "東京都", "大阪府", "全国"など） */
  prefecture: string;

  /** ジャンル（例: "カフェ", "美容室", "居酒屋"など） */
  genre: string;

  /** キーワード（例: "渋谷", "イタリアン", "癒し"など） */
  keyword: string;

  /** 並び順（任意: "rating" | "newest" | "recommended" など） */
  sort?: "rating" | "newest" | "recommended";
}

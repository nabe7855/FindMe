/**
 * @file 店舗データの取得や操作に関するビジネスロジックを担当します。
 * 現在はモックデータを使用し、API通信をシミュレートするために非同期処理（Promise）を返します。
 */

import { mockStores } from "./mockData";
import { Store, Review } from "../types";

/**
 * 口コミ情報に店舗名と店舗IDを追加した拡張型。
 * トップページの「最新の口コミ」などで使用されます。
 */
export type ReviewWithStoreInfo = Review & {
  storeName: string;
  storeId: number; // ← ✅ number に修正
};

/**
 * API通信をシミュレートするための待機時間（ミリ秒）。
 */
const API_SIMULATION_DELAY = 500;

/**
 * すべての店舗データを非同期で取得します。
 * @returns {Promise<Store[]>} すべての店舗データの配列を解決するPromise。
 */
export const getAllStores = (): Promise<Store[]> => {
  console.log("Fetching all stores from data source...");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockStores);
    }, API_SIMULATION_DELAY);
  });
};

/**
 * 指定されたIDを持つ店舗データを非同期で取得します。
 * @param {number | string} id - 取得したい店舗のID。
 * @returns {Promise<Store | undefined>} 見つかった店舗データ、またはundefined。
 */
export const getStoreById = (
  id: number | string
): Promise<Store | undefined> => {
  console.log(`Fetching store with id: ${id}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      // 文字列で渡された場合に数値へ変換
      const numericId = typeof id === "string" ? parseInt(id, 10) : id;

      const store = mockStores.find((s) => s.id === numericId);
      resolve(store);
    }, API_SIMULATION_DELAY / 2);
  });
};

/**
 * 最新の口コミを指定された件数だけ、店舗情報付きで非同期で取得します。
 * @param {number} count - 取得したい口コミの件数。
 * @returns {Promise<ReviewWithStoreInfo[]>} 最新の口コミデータの配列を解決するPromise。
 */
export const getLatestReviewsWithStoreInfo = (
  count: number
): Promise<ReviewWithStoreInfo[]> => {
  console.log(`Fetching ${count} latest reviews...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      const allReviews: ReviewWithStoreInfo[] = mockStores.flatMap((store) =>
        (store.reviews ?? []).map((review) => ({
          ...review,
          storeName: store.name,
          storeId: store.id,
        }))
      );

      // 日付降順でソート
      allReviews.sort(
        (a, b) =>
          new Date(b.date ?? "").getTime() - new Date(a.date ?? "").getTime()
      );

      resolve(allReviews.slice(0, count));
    }, API_SIMULATION_DELAY);
  });
};

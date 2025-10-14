/**
 * @file 店舗データに関する状態管理とフィルタリングロジックを提供するカスタムフック。
 * `storeService` を通じてデータを取得し、検索条件に基づいてフィルタリングを行います。
 * UIコンポーネントは、このフックを通じて店舗データにアクセスします。
 */

import { useState, useEffect, useCallback } from 'react';
import { Store, SearchCriteria } from '../types';
import * as storeService from '../services/storeService';

/**
 * 店舗データの取得、検索、フィルタリングを管理するカスタムフック。
 * 主に店舗一覧ページで使用されます。
 *
 * @param {SearchCriteria | null} initialCriteria - 初期検索条件。
 * @returns 店舗データ、ローディング状態、および検索を実行する関数を含むオブジェクト。
 */
export const useStoreData = (initialCriteria: SearchCriteria | null) => {
  // すべての店舗データを保持するstate
  const [allStores, setAllStores] = useState<Store[]>([]);
  // フィルタリング後の店舗データを保持するstate
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [criteria, setCriteria] = useState<SearchCriteria | null>(initialCriteria);

  // コンポーネントのマウント時に、すべての店舗データを一度だけ取得します。
  useEffect(() => {
    setLoading(true);
    storeService.getAllStores().then(data => {
      setAllStores(data);
      // 初期ロード完了後、すぐにフィルタリングを実行するためにローディングを解除
      setLoading(false);
    });
  }, []);

  /**
   * 店舗リストを現在の検索条件でフィルタリングするメモ化された関数。
   * @param {Store[]} stores - フィルタリング対象の全店舗リスト。
   * @param {SearchCriteria | null} currentCriteria - 現在の検索条件。
   * @returns {Store[]} フィルタリングされた店舗リスト。
   */
  const filterStores = useCallback((stores: Store[], currentCriteria: SearchCriteria | null): Store[] => {
    // 検索条件がない場合は、すべての店舗を返す
    if (!currentCriteria) {
      return stores;
    }
    
    // 各店舗が検索条件に一致するかどうかを判定
return stores.filter((store) => {
  const prefectureMatch =
    currentCriteria.prefecture === "全国" ||
    store.prefecture === currentCriteria.prefecture;

  const genreMatch =
    currentCriteria.genre === "すべて" ||
    store.genre === currentCriteria.genre;

  const keyword = currentCriteria.keyword?.toLowerCase() ?? "";

  const keywordMatch =
    !keyword ||
    store.name.toLowerCase().includes(keyword) ||
    (store.catch_phrase?.toLowerCase() ?? "").includes(keyword) ||
    (store.area?.toLowerCase() ?? "").includes(keyword);

  return prefectureMatch && genreMatch && keywordMatch;
});
  }, []);

  // 検索条件(criteria)や、元の店舗データ(allStores)が変更されたときにフィルタリングを再実行します。
  useEffect(() => {
    // データロード中はフィルタリングを実行しない
    if (!loading) {
      const filtered = filterStores(allStores, criteria);
      setFilteredStores(filtered);
    }
  }, [criteria, allStores, loading, filterStores]);
  
  /**
   * 新しい検索条件で検索を実行します。
   * @param {SearchCriteria} newCriteria - 新しい検索条件。
   */
  const search = (newCriteria: SearchCriteria) => {
      setCriteria(newCriteria);
  };

  return { stores: filteredStores, loading, search };
};

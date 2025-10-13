/**
 * @file 店舗カードをグリッドレイアウトで表示するコンポーネント。
 * ローディング状態や検索結果が0件の場合の表示もハンドリングします。
 */
import React from 'react';
import { Store, ConciergeResult } from '../../../types';
import StoreCard from '../../common/StoreCard';
import Spinner from '../../ui/Spinner';

/**
 * StoreGridコンポーネントのPropsの型定義。
 */
interface StoreGridProps {
  /** 表示する店舗データの配列 */
  stores: (Store | ConciergeResult)[];
  /** データがローディング中かどうか */
  loading: boolean;
}

/**
 * 店舗グリッド表示コンポーネント。
 * @param {StoreGridProps} props - コンポーネントのプロパティ。
 * @returns {JSX.Element} 店舗グリッドまたは状態に応じたメッセージのUI。
 */
const StoreGrid: React.FC<StoreGridProps> = ({ stores, loading }) => {
  // ローディング中の表示
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  // 検索結果が0件の場合の表示
  if (stores.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-lg shadow-sm">
        <h3 className="text-2xl font-semibold text-gray-700">お店が見つかりませんでした</h3>
        <p className="mt-4 text-lg text-gray-500">検索条件を変更して、もう一度お試しください。</p>
      </div>
    );
  }

  // 検索結果のグリッド表示
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {stores.map((store) => (
        <StoreCard key={store.id} store={store} />
      ))}
    </div>
  );
};

export default StoreGrid;

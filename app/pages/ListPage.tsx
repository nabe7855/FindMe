/**
 * @file 店舗検索結果一覧ページ。
 * フィルタリングパネルと検索結果のグリッドで構成されます。
 */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { SearchCriteria } from '../types';
import { useStoreData } from '../hooks/useStoreData';
import FilterPanel from '../components/feature/FilterPanel';
import Breadcrumbs from '../components/common/Breadcrumbs';
import StoreGrid from '../components/pages/list/StoreGrid';

/**
 * 店舗一覧ページコンポーネント。
 * @returns {JSX.Element} 店舗一覧ページのUI。
 */
const ListPage: React.FC = () => {
  const location = useLocation();
  // location.stateから初期検索条件を取得。なければデフォルト値を設定。
  const initialCriteria = location.state?.criteria as SearchCriteria || { prefecture: '全国', genre: 'すべて', keyword: '' };
  
  // 店舗データの取得と検索ロジックをカスタムフックから利用
  const { stores, loading, search } = useStoreData(initialCriteria);
  
  const breadcrumbItems = [
    { label: 'ホーム', href: '/' },
    { label: 'お店を探す' }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
            <Breadcrumbs items={breadcrumbItems} />
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 左側の絞り込みパネル */}
        <aside className="lg:col-span-1">
          <FilterPanel initialCriteria={initialCriteria} onFilter={search} />
        </aside>

        {/* 右側の検索結果表示エリア */}
        <main className="lg:col-span-3">
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              検索結果: <span className="text-blue-600">{!loading ? stores.length : '...'}</span>件
            </h2>
            {/* TODO: 並び替え機能の実装 */}
          </div>
          <StoreGrid stores={stores} loading={loading} />
        </main>
      </div>
    </div>
  );
};

export default ListPage;

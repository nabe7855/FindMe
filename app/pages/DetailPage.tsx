/**
 * @file 店舗詳細ページ。
 * 店舗のヘッダー情報、詳細情報（タブ切り替え）を表示します。
 */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Store } from '../types';
import { getStoreById } from '../services/storeService';
import Spinner from '../components/ui/Spinner';
import Breadcrumbs from '../components/common/Breadcrumbs';
import StoreInfoHeader from '../components/pages/detail/StoreInfoHeader';
import StoreInfoTabs from '../components/pages/detail/StoreInfoTabs';

/**
 * 店舗詳細ページコンポーネント。
 * @returns {JSX.Element} 店舗詳細ページのUI。
 */
const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // URLのIDが変更されたら、該当する店舗データを非同期で取得
    if (id) {
      setLoading(true);
      getStoreById(id)
        .then(foundStore => {
          setStore(foundStore || null);
        })
        .catch(error => {
          console.error("Failed to fetch store details:", error);
          setStore(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // IDがない場合はロード終了
      setLoading(false);
    }
  }, [id]);

  // ローディング中の表示
  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Spinner size="lg" /></div>;
  }

  // 店舗が見つからなかった場合の表示
  if (!store) {
    return <div className="text-center py-20 text-2xl font-bold">お店が見つかりませんでした。</div>;
  }

  // パンくずリストのデータ
  const breadcrumbItems = [
    { label: 'ホーム', href: '/' },
    { label: 'お店を探す', href: '/stores' },
    { label: store.name }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
            <Breadcrumbs items={breadcrumbItems} />
        </div>
        
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* 店舗ヘッダー情報 */}
        <StoreInfoHeader store={store} />

        {/* タブ形式の詳細情報 */}
        <div className="p-8">
            <StoreInfoTabs store={store} />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;

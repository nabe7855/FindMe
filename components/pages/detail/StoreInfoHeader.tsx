/**
 * @file 店舗詳細ページのヘッダー部分（画像、店名、評価など）を表示するコンポーネント。
 */
import React from 'react';
import { Store } from '../../../types';
import Rating from '../../common/Rating';

/**
 * StoreInfoHeaderコンポーネントのPropsの型定義。
 */
interface StoreInfoHeaderProps {
  /** 表示する店舗データ */
  store: Store;
}

/**
 * 店舗詳細ヘッダーコンポーネント。
 * @param {StoreInfoHeaderProps} props - コンポーネントのプロパティ。
 * @returns {JSX.Element} 店舗ヘッダーのUI。
 */
const StoreInfoHeader: React.FC<StoreInfoHeaderProps> = ({ store }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* 店舗画像 */}
      <div className="aspect-w-4 aspect-h-3 md:aspect-none">
        <img src={store.imageUrl} alt={store.name} className="w-full h-full object-cover md:h-[500px]" />
      </div>
      {/* 店舗情報 */}
      <div className="p-8 flex flex-col justify-center">
        <p className="text-lg font-semibold text-blue-600">{store.genre} | {store.area}</p>
        <h1 className="text-4xl font-extrabold text-gray-900 my-2">{store.name}</h1>
        <p className="text-xl text-gray-600 mb-4">{store.catch_phrase}</p>
        <Rating value={store.rating} />
        <p className="text-lg text-gray-500 mt-1">({store.reviewCount}件のレビュー)</p>
      </div>
    </div>
  );
};

export default StoreInfoHeader;

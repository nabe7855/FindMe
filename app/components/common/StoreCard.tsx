/**
 * @file 店舗情報を表示するためのカード型コンポーネント。
 * 通常の店舗データとAIコンシェルジュの提案データの両方に対応します。
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Store, ConciergeResult } from '../../types';
import Card from '../ui/Card';
import Rating from './Rating';

/**
 * StoreCardコンポーネントのPropsの型定義。
 */
interface StoreCardProps {
  /** 表示する店舗データ。StoreまたはConciergeResult型。 */
  store: Store | ConciergeResult;
}

/**
 * 店舗情報カードコンポーネント。
 * @param {StoreCardProps} props - コンポーネントのプロパティ。
 * @returns {JSX.Element} 店舗情報カードのUI。
 */
const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  // storeオブジェクトが'recommendation_reason'プロパティを持つかで、AIコンシェルジュの結果かどうかを判定
  const isConciergeResult = 'recommendation_reason' in store;

  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link to={`/store/${store.id}`} className="block h-full flex flex-col">
        {/* 店舗画像 */}
        <div className="aspect-w-4 aspect-h-3">
          <img src={store.imageUrl} alt={store.name} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex-grow">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{store.name}</h3>
              {/* ジャンルタグ */}
              <div className="text-sm bg-blue-100 text-blue-800 font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                {store.genre}
              </div>
            </div>
            <p className="text-md text-gray-500 mb-3">{store.area}</p>
            <p className="text-md text-gray-700 mb-4">{store.catch_phrase}</p>
            {/* AIコンシェルジュの推薦理由（存在する場合のみ表示） */}
            {isConciergeResult && (
              <p className="text-md text-green-700 bg-green-50 p-3 rounded-lg border border-green-200 mb-4">
                <span className="font-bold">AI推薦理由:</span> {store.recommendation_reason}
              </p>
            )}
          </div>
          {/* 評価 */}
          <div className="mt-auto">
            <Rating value={store.rating} />
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default StoreCard;

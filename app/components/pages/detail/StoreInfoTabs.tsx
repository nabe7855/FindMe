/**
 * @file 店舗詳細ページの詳細情報（基本情報、口コミ、地図）をタブで表示するコンポーネント。
 */
import React from 'react';
import { Store, Review } from '../../../types';
import Tabs from '../../ui/Tabs';
import ReviewCard from '../../common/ReviewCard';
import Button from '../../ui/Button';

/**
 * StoreInfoTabsコンポーネントのPropsの型定義。
 */
interface StoreInfoTabsProps {
  /** 表示する店舗データ */
  store: Store;
}

/**
 * 店舗詳細タブコンポーネント。
 * @param {StoreInfoTabsProps} props - コンポーネントのプロパティ。
 * @returns {JSX.Element} 詳細情報タブのUI。
 */
const StoreInfoTabs: React.FC<StoreInfoTabsProps> = ({ store }) => {
  // 基本情報のリスト
  const infoItems = [
    { label: '住所', value: store.address },
    { label: '電話番号', value: store.phone, isLink: true, href: `tel:${store.phone}` },
    { label: '営業時間', value: store.openingHours },
    { label: '定休日', value: store.closingDay },
    { label: '価格帯', value: store.priceRange },
  ];
  
  // タブの定義
  const tabs = [
    {
      label: '基本情報',
      content: (
        <div className="space-y-4">
          {infoItems.map(item => (
              <div key={item.label} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-lg">
                  <dt className="font-semibold text-gray-600">{item.label}</dt>
                  <dd className="sm:col-span-2 text-gray-800">
                    {item.isLink ? <a href={item.href} className="text-blue-600 hover:underline">{item.value}</a> : item.value}
                  </dd>
              </div>
          ))}
        </div>
      )
    },
    {
      label: `口コミ (${store.reviewCount})`,
      content: (
        <div className="space-y-6">
            {store.reviews.length > 0 ? (
                store.reviews.map((review: Review) => (
                    <ReviewCard key={review.id} review={review} />
                ))
            ) : (
                <p className="text-gray-600">このお店にはまだ口コミがありません。</p>
            )}
             <div className="mt-8 pt-8 border-t">
                 <h4 className="text-2xl font-bold mb-4">口コミを投稿する</h4>
                 <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                     {/* TODO: 口コミ投稿フォームの完全な実装 */}
                     <textarea className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="口コミを記入してください..." rows={4} aria-label="口コミ入力欄"></textarea>
                     <Button type="submit">投稿する</Button>
                 </form>
             </div>
        </div>
      )
    },
    {
        label: '地図',
        // 地図は著作権フリーの画像サービスを使用しているため、seed値をIDに紐づけてユニーク性を担保
        content: <img src={`https://picsum.photos/seed/${store.id}-map/1200/400`} alt={`${store.name}の地図`} className="w-full h-auto rounded-lg" loading="lazy" />
    }
  ];

  return <Tabs tabs={tabs} />;
};

export default StoreInfoTabs;

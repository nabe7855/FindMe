import React from 'react';
import { OnlineStore } from '../../../../types';

/**
 * OnlineStoreFieldsコンポーネントが受け取るprops(プロパティ)の型定義。
 */
interface OnlineStoreFieldsProps {
  store: Omit<OnlineStore, 'id'>;
  onChange: (_datae: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

/**
 * 店舗編集フォーム内で、通販専門店舗に特有の入力項目
 * （ウェブサイトURL、配送情報）を担当するコンポーネント。
 * @param {OnlineStoreFieldsProps} props - コンポーネントが必要とするデータと関数
 * @returns JSX.Element
 */
const OnlineStoreFields: React.FC<OnlineStoreFieldsProps> = ({ store, onChange }) => {
  return (
    <div className="space-y-6 border-t border-gray-700 pt-6">
      <div>
        <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-300 mb-2">ウェブサイトURL</label>
        <input 
          type="url" 
          id="websiteUrl" 
          name="websiteUrl" 
          value={store.websiteUrl} 
          onChange={onChange} 
          required
          className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-accent focus:border-blue-accent outline-none" 
        />
      </div>
      <div>
        <label htmlFor="shippingInfo" className="block text-sm font-medium text-gray-300 mb-2">配送情報</label>
        <textarea 
          id="shippingInfo" 
          name="shippingInfo" 
          value={store.shippingInfo} 
          onChange={onChange} 
          rows={3}
          className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-accent focus:border-blue-accent outline-none">
        </textarea>
      </div>
    </div>
  );
};

export default OnlineStoreFields;

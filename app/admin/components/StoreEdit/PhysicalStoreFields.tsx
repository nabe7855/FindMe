import React from 'react';
import { PhysicalStore } from '../../../../types';

/**
 * PhysicalStoreFieldsコンポーネントが受け取るprops(プロパティ)の型定義。
 */
interface PhysicalStoreFieldsProps {
  store: Omit<PhysicalStore, 'id'>;
  onChange: (_e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

/**
 * 店舗編集フォーム内で、来店型店舗に特有の入力項目
 * （住所、駐車場、メニュー、特典）を担当するコンポーネント。
 * @param {PhysicalStoreFieldsProps} props - コンポーネントが必要とするデータと関数
 * @returns JSX.Element
 */
const PhysicalStoreFields: React.FC<PhysicalStoreFieldsProps> = ({ store, onChange }) => {
  return (
    <div className="space-y-6 border-t border-gray-700 pt-6">
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">住所</label>
        <input 
          type="text" 
          id="address" 
          name="address" 
          value={store.address} 
          onChange={onChange} 
          required
          className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-accent focus:border-blue-accent outline-none" 
        />
      </div>
      <div>
        <label className="flex items-center">
          <input 
            type="checkbox" 
            name="hasParking" 
            checked={store.hasParking} 
            onChange={onChange} 
            className="form-checkbox h-5 w-5 bg-gray-700 border-gray-600 text-blue-accent rounded focus:ring-blue-accent" 
          />
          <span className="ml-2 text-white">駐車場あり</span>
        </label>
      </div>
      <div>
        <label htmlFor="menu" className="block text-sm font-medium text-gray-300 mb-2">メニュー情報</label>
        <textarea 
          id="menu" 
          name="menu" 
          value={store.menu} 
          onChange={onChange} 
          rows={5} 
          placeholder="例：&#10;・醤油ラーメン: ¥900&#10;・味噌ラーメン: ¥950"
          className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-accent focus:border-blue-accent outline-none">
        </textarea>
      </div>
      <div>
        <label htmlFor="offers" className="block text-sm font-medium text-gray-300 mb-2">特典情報</label>
        <textarea 
          id="offers" 
          name="offers" 
          value={store.offers} 
          onChange={onChange} 
          rows={3} 
          placeholder="例：&#10;・初回限定ドリンク1杯無料&#10;・記念日プレートサービス"
          className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-accent focus:border-blue-accent outline-none">
        </textarea>
      </div>
    </div>
  );
};

export default PhysicalStoreFields;

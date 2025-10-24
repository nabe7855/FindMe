import React from 'react';
import { Store } from '../../../../types';

/**
 * CommonFieldsコンポーネントが受け取るprops(プロパティ)の型定義。
 */
interface CommonFieldsProps {
  store: Omit<Store, 'id'>;
  onChange: (_e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

/**
 * 店舗編集フォーム内で、来店型・通販専門どちらのタイプでも共通で使われる入力項目
 * （店舗名、カテゴリ、店舗説明）を担当するコンポーネント。
 * @param {CommonFieldsProps} props - コンポーネントが必要とするデータと関数
 * @returns JSX.Element
 */
const CommonFields: React.FC<CommonFieldsProps> = ({ store, onChange }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">店舗名</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={store.name} 
            onChange={onChange} 
            required
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-accent focus:border-blue-accent outline-none" 
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">カテゴリ</label>
          <input 
            type="text" 
            id="category" 
            name="category" 
            value={store.genre} 
            onChange={onChange} 
            required
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-accent focus:border-blue-accent outline-none" 
          />
        </div>
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">店舗説明</label>
        <textarea 
          id="description" 
          name="description" 
          value={store.description} 
          onChange={onChange} 
          rows={5}
          className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-accent focus:border-blue-accent outline-none">
        </textarea>
      </div>
    </>
  );
};

export default CommonFields;

import React from 'react';

/**
 * StoreTypeSelectorコンポーネントが受け取るprops(プロパティ)の型定義。
 */
interface StoreTypeSelectorProps {
  storeType: 'physical' | 'online';
  onTypeChange: (_e: React.ChangeEvent<HTMLInputElement>) => void; // ⚡ _e に変更！
  isNew: boolean;
}

/**
 * 店舗編集フォーム内で、店舗タイプ（来店型／通販専門）を選択するためのコンポーネント。
 */
const StoreTypeSelector: React.FC<StoreTypeSelectorProps> = ({ storeType, onTypeChange, isNew }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">店舗タイプ</label>
      <div className="flex gap-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="type"
            value="physical"
            checked={storeType === 'physical'}
            onChange={onTypeChange}
            disabled={!isNew}
            className="form-radio bg-gray-700 border-gray-600 text-blue-accent focus:ring-blue-accent disabled:opacity-50"
          />
          <span className="ml-2 text-white">来店型</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="type"
            value="online"
            checked={storeType === 'online'}
            onChange={onTypeChange}
            disabled={!isNew}
            className="form-radio bg-gray-700 border-gray-600 text-blue-accent focus:ring-blue-accent disabled:opacity-50"
          />
          <span className="ml-2 text-white">通販専門</span>
        </label>
      </div>
      {!isNew && (
        <p className="text-xs text-gray-500 mt-1">
          既存店舗のタイプは変更できません。
        </p>
      )}
    </div>
  );
};

export default StoreTypeSelector;

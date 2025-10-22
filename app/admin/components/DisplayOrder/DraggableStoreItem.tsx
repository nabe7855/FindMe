import React from 'react';
import { GripVertical } from 'lucide-react';
import { Store } from '../../types';

/**
 * DraggableStoreItemコンポーネントが受け取るprops(プロパティ)の型定義。
 */
interface DraggableStoreItemProps {
  store: Pick<Store, 'id' | 'name' | 'category'>;
  index: number;
  onDragStart: (e: React.DragEvent<HTMLLIElement>, index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLLIElement>, index: number) => void;
  onDragEnd: () => void;
}

/**
 * ドラッグ＆ドロップで並び替え可能なリストの各項目を表示するコンポーネント。
 * @param {DraggableStoreItemProps} props - コンポーネントが必要とするデータと関数
 * @returns JSX.Element
 */
const DraggableStoreItem: React.FC<DraggableStoreItemProps> = ({ 
  store, 
  index, 
  onDragStart, 
  onDragOver, 
  onDragEnd 
}) => {
  return (
    <li
      key={store.id}
      // draggable属性をtrueにすることで、この要素がドラッグ可能になります。
      draggable
      // ドラッグイベントの各フェーズに対応するハンドラを割り当てます。
      onDragStart={e => onDragStart(e, index)}
      onDragOver={e => onDragOver(e, index)}
      onDragEnd={onDragEnd}
      className="flex items-center p-4 bg-gray-700 rounded-md cursor-grab active:cursor-grabbing transition-shadow"
    >
      {/* ドラッグハンドルアイコン */}
      <GripVertical className="w-5 h-5 text-gray-500 mr-4" />
      <div className="flex-grow">
        <p className="font-semibold text-white">{store.name}</p>
        <p className="text-sm text-gray-400">{store.category}</p>
      </div>
      {/* 現在の順位 */}
      <span className="text-lg font-bold text-gray-600">{index + 1}</span>
    </li>
  );
};

export default DraggableStoreItem;

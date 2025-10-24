import React from 'react';
import { GripVertical } from 'lucide-react';
import { Store } from '../../../../types';

/**
 * DraggableStoreItemコンポーネントが受け取るprops(プロパティ)の型定義。
 */
interface DraggableStoreItemProps {
  store: Pick<Store, 'id' | 'name' | 'genre'>;
  index: number;
  onDragStart: (_e: React.DragEvent<HTMLLIElement>, _index: number) => void;
  onDragOver: (_e: React.DragEvent<HTMLLIElement>, _index: number) => void;
  onDragEnd: () => void;
}

/**
 * ドラッグ＆ドロップで並び替え可能なリストの各項目を表示するコンポーネント。
 */
const DraggableStoreItem: React.FC<DraggableStoreItemProps> = ({
  store,
  index,
  onDragStart,
  onDragOver,
  onDragEnd,
}) => {
  return (
    <li
      key={store.id}
      draggable
      // ⚡ ここ！変数名を _e に変更！
      onDragStart={(_e) => onDragStart(_e, index)}
      onDragOver={(_e) => onDragOver(_e, index)}
      onDragEnd={onDragEnd}
      className="flex items-center p-4 bg-gray-700 rounded-md cursor-grab active:cursor-grabbing transition-shadow"
    >
      {/* ドラッグハンドルアイコン */}
      <GripVertical className="w-5 h-5 text-gray-500 mr-4" />
      <div className="flex-grow">
        <p className="font-semibold text-white">{store.name}</p>
        <p className="text-sm text-gray-400">{store.genre ?? 'ジャンル未設定'}</p>
      </div>
      <span className="text-lg font-bold text-gray-600">{index + 1}</span>
    </li>
  );
};

export default DraggableStoreItem;

import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

type ChangeType = 'up' | 'down' | 'same';

/**
 * ChangeIconコンポーネントが受け取るprops(プロパティ)の型定義。
 */
interface ChangeIconProps {
  change: ChangeType;
}

/**
 * ランキングの順位変動（up, down, same）に応じて
 * 適切なアイコンを表示するためのコンポーネント。
 * @param {ChangeIconProps} props - 表示する変動タイプ
 * @returns JSX.Element
 */
const ChangeIcon: React.FC<ChangeIconProps> = ({ change }) => {
  if (change === 'up') return <ArrowUp className="w-5 h-5 text-emerald-accent" />;
  if (change === 'down') return <ArrowDown className="w-5 h-5 text-red-500" />;
  return <Minus className="w-5 h-5 text-gray-500" />;
};

export default ChangeIcon;

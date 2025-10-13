/**
 * @file データロード中など、処理待ちの状態を示すスピナーコンポーネント。
 */
import React from 'react';

/**
 * SpinnerコンポーネントのPropsの型定義。
 */
interface SpinnerProps {
    /** スピナーのサイズ（'sm', 'md', 'lg'） */
    size?: 'sm' | 'md' | 'lg';
}

/**
 * ローディングスピナーコンポーネント。
 * @param {SpinnerProps} props - コンポーネントのプロパティ。
 * @returns {JSX.Element} スピナーアニメーションを表示するUI。
 */
const Spinner: React.FC<SpinnerProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-24 w-24',
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`}></div>
    </div>
  );
};

export default Spinner;

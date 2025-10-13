/**
 * @file 再利用可能な汎用カードコンポーネント。
 * コンテンツを囲むための基本的なスタイル（背景色、角丸、影）を提供します。
 */
import React from 'react';

/**
 * CardコンポーネントのPropsの型定義。
 */
interface CardProps {
  /** カード内に表示される内容 */
  children: React.ReactNode;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * 汎用カードコンポーネント。
 * @param {CardProps} props - コンポーネントのプロパティ。
 * @returns {JSX.Element} スタイルが適用されたカード要素。
 */
const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  const cardClasses = `bg-white rounded-lg shadow-md overflow-hidden ${className}`;
  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
};

export default Card;

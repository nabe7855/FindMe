/**
 * @file 数値に基づいた星評価（5段階）を表示するコンポーネント。
 */
import React from 'react';

/**
 * RatingコンポーネントのPropsの型定義。
 */
interface RatingProps {
  /** 評価の数値（例: 4.5） */
  value: number;
  /** 数値（例: "4.5"）を星の横に表示するかどうか */
  showValue?: boolean;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * 星評価表示コンポーネント。
 * @param {RatingProps} props - コンポーネントのプロパティ。
 * @returns {JSX.Element} 星評価のUI。
 */
const Rating: React.FC<RatingProps> = ({ value, showValue = true, className = '' }) => {
  // 5つの星を生成
  const stars = Array.from({ length: 5 }, (_, i) => {
    // 星を塗りつぶすかどうかを評価値に基づいて決定
    // i + 0.5 < value とすることで、0.5単位の評価（半分の星）を表現
    const fill = i + 0.5 < value ? 'currentColor' : 'none';
    const stroke = 'currentColor';
    return (
      <svg
        key={i}
        className="w-6 h-6 text-yellow-400"
        fill={fill}
        viewBox="0 0 24 24"
        stroke={stroke}
        strokeWidth="1.5"
        aria-hidden="true" // 装飾的な要素のためスクリーンリーダーから隠す
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    );
  });

  return (
    <div className={`flex items-center space-x-2 ${className}`} title={`評価: ${value.toFixed(1)}`}>
      <div className="flex">{stars}</div>
      {showValue && <span className="text-lg font-bold text-gray-800">{value.toFixed(1)}</span>}
    </div>
  );
};

export default Rating;

/**
 * @file コンテンツが横にエンドレスで流れ続けるマーキー（電光掲示板）効果を実装するコンポーネント。
 * CSSアニメーションを使用し、パフォーマンスに配慮しています。
 */
import React from 'react';

/**
 * MarqueeコンポーネントのPropsの型定義。
 */
interface MarqueeProps {
  /** マーキー内でスクロールさせるコンテンツ */
  children: React.ReactNode;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * 横スクロールアニメーション（マーキー）コンポーネント。
 * @param {MarqueeProps} props - コンポーネントのプロパティ。
 * @returns {JSX.Element} マーキーUI。
 */
const Marquee: React.FC<MarqueeProps> = ({ children, className = '' }) => {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      {/* 
        hover:[animation-play-state:paused] 
        Tailwind CSSのクラスで、カーソルが乗っている間はアニメーションを一時停止させる効果。
      */}
      <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
        {children}
      </div>
    </div>
  );
};

export default Marquee;

/**
 * @file トップページのヒーローセクション（メインビジュアルとキャッチコピー）を表示するコンポーネント。
 */
import React from 'react';

/**
 * ヒーローセクションコンポーネント。
 * @returns {JSX.Element} ヒーローセクションのUI。
 */
const HeroSection: React.FC = () => (
  <div className="relative bg-blue-600 text-white py-20 md:py-32 overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center opacity-20 animate-kenburns"
      style={{ backgroundImage: 'url(https://picsum.photos/seed/bg/1920/1080)' }}
      aria-hidden="true" // 背景画像は装飾的な要素のためスクリーンリーダーから隠す
    ></div>
    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
        お店との<span className="text-yellow-300">『運命の出会い』</span>を。
      </h1>
      <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto">
        あなたの「今」にぴったりのお店、FindMeが見つけます。
      </p>
    </div>
  </div>
);

export default HeroSection;
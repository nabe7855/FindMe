/**
 * @file トップページの「今週のおすすめ特集」セクションを表示するコンポーネント。
 */
"use client"; // ← ✅ Next.js App Router環境で必須

import React from "react";
import { useRouter } from "next/navigation"; // ✅ Next.js用
import Image from "next/image";

/**
 * おすすめ特集セクションコンポーネント。
 * @returns {JSX.Element} おすすめ特集セクションのUI。
 */
const FeaturedSection: React.FC = () => {
  const router = useRouter();

  // 特集のコンテンツデータ
  const featuredContent = [
    {
      title: "記念日に訪れたいお店",
      img: "https://picsum.photos/seed/feature1/800/600",
      keyword: "記念日",
    },
    {
      title: "個室でゆったり過ごせるお店",
      img: "https://picsum.photos/seed/feature2/800/600",
      keyword: "個室",
    },
    {
      title: "女子会に人気のお店",
      img: "https://picsum.photos/seed/feature3/800/600",
      keyword: "女子会",
    },
  ];

  /**
   * 特集カードがクリックされたときに、関連キーワードで検索した一覧ページに遷移します。
   * @param {string} keyword - 検索に使用するキーワード。
   */
  const handleFeatureClick = (keyword: string) => {
    // ✅ Next.jsでは router.push でページ遷移
    const params = new URLSearchParams({
      prefecture: "全国",
      genre: "すべて",
      keyword,
    });
    router.push(`/stores?${params.toString()}`);
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
        今週のおすすめ特集
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredContent.map((feature) => (
          <div
            key={feature.title}
            onClick={() => handleFeatureClick(feature.keyword)}
            className="group relative rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-transform duration-300"
            role="button"
            tabIndex={0}
          >
            <Image
              src={feature.img}
              alt={feature.title}
              width={800}
              height={600}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-white text-center p-4">
                {feature.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;

"use client";

/**
 * @file アプリケーションのトップページ。
 * 各コンテンツセクションをコンポーネントとして呼び出し、ページ全体のレイアウトを構成します。
 */

import SearchBar from "@/components/feature/SearchBar";
import ConciergeCtaSection from "@/components/pages/home/ConciergeCtaSection";
import FeaturedSection from "@/components/pages/home/FeaturedSection";
import HeroSection from "@/components/pages/home/HeroSection";
import LatestReviewsSection from "@/components/pages/home/LatestReviewsSection";
import PopularGenresSection from "@/components/pages/home/PopularGenresSection";
import StoreMarqueeSection from "@/components/pages/home/StoreMarqueeSection";

/**
 * トップページ（HomePage）コンポーネント。
 * 各セクションコンポーネントを組み合わせてページを構築します。
 */
export default function Page() {
  return (
    <main>
      {/* ヒーローセクション */}
      <HeroSection />

      {/* 検索バー */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <SearchBar />
      </div>

      {/* 人気ジャンル */}
      <PopularGenresSection />

      {/* 特集セクション */}
      <FeaturedSection />

      {/* 店舗マーキー */}
      <StoreMarqueeSection />

      {/* 最新口コミ */}
      <LatestReviewsSection />

      {/* AIコンシェルジュCTA */}
      <ConciergeCtaSection />
    </main>
  );
}

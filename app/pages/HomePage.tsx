/**
 * @file アプリケーションのトップページ。
 * 各コンテンツセクションをコンポーネントとして呼び出し、ページ全体のレイアウトを構成します。
 */
import React from 'react';
import HeroSection from '../components/pages/home/HeroSection';
import PopularGenresSection from '../components/pages/home/PopularGenresSection';
import FeaturedSection from '../components/pages/home/FeaturedSection';
import StoreMarqueeSection from '../components/pages/home/StoreMarqueeSection';
import LatestReviewsSection from '../components/pages/home/LatestReviewsSection';
import ConciergeCtaSection from '../components/pages/home/ConciergeCtaSection';
import SearchBar from '../components/feature/SearchBar';

/**
 * ホームページコンポーネント。
 * 各セクションコンポーネントを組み合わせてページを構築します。
 * @returns {JSX.Element} ホームページのUI。
 */
const HomePage: React.FC = () => {
    return (
        <>
            {/* ヒーローセクション: メインのキャッチコピーと背景画像 */}
            <HeroSection />

            {/* 検索バーセクション: ヒーローセクションの上に配置 */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
                <SearchBar />
            </div>

            {/* 人気のジャンルセクション */}
            <PopularGenresSection />

            {/* おすすめ特集セクション */}
            <FeaturedSection />
            
            {/* 店舗マーキーセクション */}
            <StoreMarqueeSection />

            {/* 最新口コミセクション */}
            <LatestReviewsSection />

            {/* AIコンシェルジュCTAセクション */}
            <ConciergeCtaSection />
        </>
    );
};

export default HomePage;

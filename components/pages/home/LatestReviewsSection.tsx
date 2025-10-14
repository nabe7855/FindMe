/**
 * @file トップページの「みんなの最新口コミ」セクションを表示するコンポーネント。
 */
"use client"; // ✅ Next.js App Router環境では必須

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ useNavigate → useRouter
import Card from "@/components/ui/Card";
import Rating from "@/components/common/Rating";

/** ✅ 一時的なダミーデータ型（実際は storeService から取得） */
interface ReviewWithStoreInfo {
  id: number;
  author: string;
  rating: number;
  comment: string;
  storeId: number;
  storeName: string;
}

/**
 * 最新の口コミセクションコンポーネント。
 * @returns {JSX.Element | null} データ取得中はnull、取得後は口コミセクションのUIを返す。
 */
const LatestReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewWithStoreInfo[]>([]);
  const router = useRouter();

  // ✅ 仮API: 後で storeService から取得する予定
  const fetchReviews = async (): Promise<ReviewWithStoreInfo[]> => {
    // ここでは仮データを返却（API実装前の動作確認用）
    return [
      {
        id: 1,
        author: "りさ",
        rating: 5,
        comment: "記念日に利用しました！雰囲気が最高でまた行きたいです。",
        storeId: 101,
        storeName: "銀座レストラン花音",
      },
      {
        id: 2,
        author: "たけし",
        rating: 4,
        comment: "個室が広くてゆったり過ごせました。料理も美味しかった！",
        storeId: 102,
        storeName: "和食処 たけうち",
      },
      {
        id: 3,
        author: "ゆか",
        rating: 5,
        comment: "スタッフさんの接客が丁寧でした。女子会にもおすすめです！",
        storeId: 103,
        storeName: "Cafe de Lumière",
      },
    ];
  };

  // コンポーネントのマウント時に最新の口コミを取得
  useEffect(() => {
    fetchReviews().then((data) => setReviews(data));
  }, []);

  // 口コミデータがまだ読み込まれていない場合は何も表示しない
  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          みんなの最新口コミ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="p-6 flex flex-col hover:shadow-xl transition-shadow duration-300"
            >
              {/* 評価の星（数値は非表示） */}
              <Rating value={review.rating} showValue={false} />

              {/* 口コミ本文（長すぎる場合は省略） */}
              <p className="text-base text-gray-700 my-4 flex-grow">
                {review.comment.length > 80
                  ? `${review.comment.substring(0, 80)}...`
                  : review.comment}
              </p>

              <div className="mt-auto pt-4 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-800">
                  {review.author} さん
                </p>

                {/* 店舗名をクリックすると詳細ページへ遷移 */}
                <button
                  onClick={() => router.push(`/store/${review.storeId}`)}
                  className="text-sm text-blue-600 hover:underline cursor-pointer"
                >
                  『{review.storeName}』への口コミ
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestReviewsSection;

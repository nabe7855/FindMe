/**
 * @file 店舗情報を表示するためのカード型コンポーネント。
 * 通常の店舗データとAIコンシェルジュの提案データの両方に対応します。
 */
import React from "react";
import Link from "next/link";
import Card from "../ui/Card";
import Rating from "./Rating";
import type { Store, ConciergeResult } from "@/types";

interface StoreCardProps {
  /** 表示する店舗データ。StoreまたはConciergeResult型。 */
  store: Store | ConciergeResult;
}

/**
 * 店舗情報カードコンポーネント。
 */
const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  /** ConciergeResult型かどうかを判定 */
  const isConciergeResult = (
    s: Store | ConciergeResult
  ): s is ConciergeResult => "recommendation_reason" in s;

  /** 実際に表示する店舗データを生成 */
  const storeData: Store = isConciergeResult(store)
    ? store.store ?? {
        id: store.storeId,
        name: "店舗情報未取得",
        imageUrl: "/no-image.jpg",
        genre: "",
        area: "",
        catch_phrase: "AI提案店舗（詳細情報なし）",
        rating: 0, // ✅ 必須項目を追加
        reviewCount: 0, // ✅ Store型に存在するため追加
        prefecture: "", // ✅ 型整合のため追加
        address: "",
        phone: "",
        openingHours: "",
        closingDay: "",
        priceRange: "",
        reviews: [],
      }
    : store;

  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-xl overflow-hidden">
      <Link href={`/store/${storeData.id}`} className="block h-full flex flex-col">
        {/* 店舗画像 */}
        <div className="aspect-[4/3]">
          <img
            src={storeData.imageUrl || "/no-image.jpg"}
            alt={storeData.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* 本文部分 */}
        <div className="p-5 flex-grow flex flex-col bg-white">
          <div className="flex-grow">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {storeData.name}
              </h3>
              {storeData.genre && (
                <div className="text-sm bg-blue-100 text-blue-800 font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                  {storeData.genre}
                </div>
              )}
            </div>

            {storeData.area && (
              <p className="text-md text-gray-500 mb-2">{storeData.area}</p>
            )}

            {storeData.catch_phrase && (
              <p className="text-md text-gray-700 mb-4">
                {storeData.catch_phrase}
              </p>
            )}

            {/* AIコンシェルジュ推薦理由 */}
            {isConciergeResult(store) && (
              <p className="text-md text-green-700 bg-green-50 p-3 rounded-lg border border-green-200 mb-4">
                <span className="font-bold">AI推薦理由:</span>{" "}
                {store.recommendation_reason}
              </p>
            )}
          </div>

          {/* 評価 */}
          <div className="mt-auto">
            <Rating value={storeData.rating ?? 0} />
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default StoreCard;

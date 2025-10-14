"use client";

/**
 * @file トップページで店舗カードが横に流れ続けるマーキーセクションを表示するコンポーネント。
 */
import React, { useEffect, useState } from "react";
import * as storeService from "../../../services/storeService";
import { Store } from "../../../types";
import Marquee from "../../common/Marquee";
import StoreCard from "../../common/StoreCard";

/**
 * 店舗マーキーセクションコンポーネント。
 * @returns {JSX.Element | null} データ取得中はnull、取得後はマーキーUIを返す。
 */
const StoreMarqueeSection: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);

  // コンポーネントのマウント時に店舗データを取得
  useEffect(() => {
    storeService.getAllStores().then((data) => {
      setStores(data);
    });
  }, []);

  // 店舗データがまだ読み込まれていない場合は何も表示しない
  if (stores.length === 0) {
    return null;
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">
          素敵なお店をピックアップ
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          気になるお店にカーソルを合わせると止まります
        </p>
      </div>
      <Marquee>
        {/* 
                  シームレスなループを実現するため、店舗リストを2回繰り返して表示します。
                  これにより、リストの末尾が先頭にスムーズに繋がります。
                */}
        {[...stores, ...stores].map((store, index) => (
          <div key={`${store.id}-${index}`} className="mx-4 w-80 flex-shrink-0">
            <StoreCard store={store} />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default StoreMarqueeSection;

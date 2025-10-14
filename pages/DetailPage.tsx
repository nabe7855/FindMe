/**
 * @file 店舗詳細ページ。
 * 店舗のヘッダー情報、詳細情報（タブ切り替え）を表示します。
 */
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // ✅ Next.js 用
import type { Store } from "@/types";
import { getStoreById } from "@/services/storeService";
import Spinner from "@/components/ui/Spinner";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import StoreInfoHeader from "@/components/pages/detail/StoreInfoHeader";
import StoreInfoTabs from "@/components/pages/detail/StoreInfoTabs";

/**
 * 店舗詳細ページコンポーネント。
 * @returns {JSX.Element} 店舗詳細ページのUI。
 */
const DetailPage: React.FC = () => {
  const params = useParams();
  const id = params?.id as string | undefined; // ✅ Next.js ではこう取得
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchStore = async () => {
      try {
        setLoading(true);
        const foundStore = await getStoreById(id);
        setStore(foundStore || null);
      } catch (error) {
        console.error("Failed to fetch store details:", error);
        setStore(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [id]);

  // ローディング中
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  // 店舗が見つからなかった場合
  if (!store) {
    return (
      <div className="text-center py-20 text-2xl font-bold">
        お店が見つかりませんでした。
      </div>
    );
  }

  // パンくずリスト
  const breadcrumbItems = [
    { label: "ホーム", href: "/" },
    { label: "お店を探す", href: "/stores" },
    { label: store.name },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* 店舗ヘッダー情報 */}
        <StoreInfoHeader store={store} />

        {/* 詳細情報タブ */}
        <div className="p-8">
          <StoreInfoTabs store={store} />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;

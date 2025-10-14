/**
 * @file 店舗検索結果一覧ページ。
 * フィルタリングパネルと検索結果のグリッドで構成されます。
 */
"use client";

import React, { useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { SearchCriteria } from "@/types";
import { useStoreData } from "@/hooks/useStoreData";
import FilterPanel from "@/components/feature/FilterPanel";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import StoreGrid from "@/components/pages/list/StoreGrid";

/**
 * 店舗一覧ページコンポーネント。
 * @returns {JSX.Element} 店舗一覧ページのUI。
 */
const ListPage: React.FC = () => {
  // ✅ useSearchParams は必ずオブジェクトを返す（実行時にnullにはならない）
  const searchParams = useSearchParams();

  // ✅ 明示的にnullを考慮して安全に扱う
  const initialCriteria = useMemo<SearchCriteria>(() => {
    if (!searchParams) {
      // nullの場合（理論上ほぼ起きない）
      return { prefecture: "全国", genre: "すべて", keyword: "" };
    }

    return {
      prefecture: searchParams.get("prefecture") ?? "全国",
      genre: searchParams.get("genre") ?? "すべて",
      keyword: searchParams.get("keyword") ?? "",
      sort:
        (searchParams.get("sort") as
          | "rating"
          | "newest"
          | "recommended"
          | null) ?? undefined,
    };
  }, [searchParams]);

  // カスタムフックで検索結果を管理
  const { stores, loading, search } = useStoreData(initialCriteria);

  const breadcrumbItems = [
    { label: "ホーム", href: "/" },
    { label: "お店を探す" },
  ];

  // URLが変わったときに再検索
  useEffect(() => {
    search(initialCriteria);
  }, [initialCriteria, search]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* パンくずリスト */}
      <div className="mb-8">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 左側: 絞り込みパネル */}
        <aside className="lg:col-span-1">
          <FilterPanel initialCriteria={initialCriteria} onFilter={search} />
        </aside>

        {/* 右側: 検索結果 */}
        <main className="lg:col-span-3">
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              検索結果:{" "}
              <span className="text-blue-600">
                {!loading ? stores.length : "..."}
              </span>
              件
            </h2>
          </div>
          <StoreGrid stores={stores} loading={loading} />
        </main>
      </div>
    </div>
  );
};

export default ListPage;

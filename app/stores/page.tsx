"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// ListPageを動的importでクライアント側のみ読み込み（SSR回避）
const ListPage = dynamic(() => import("@/pages/ListPage"), { ssr: false });

export default function StoresPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-10">店舗一覧を読み込み中...</div>
      }
    >
      <ListPage />
    </Suspense>
  );
}

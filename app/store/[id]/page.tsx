"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// DetailPage を動的インポート（SSR無効化で安全にクライアント実行）
const DetailPage = dynamic(() => import("@/pages/DetailPage"), { ssr: false });

export default function StoreDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-10">店舗詳細を読み込み中...</div>
      }
    >
      <DetailPage />
    </Suspense>
  );
}

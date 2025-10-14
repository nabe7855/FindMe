/**
 * @file トップページの「人気のジャンルから探す」セクションを表示するコンポーネント。
 */
"use client"; // ✅ クライアントコンポーネント指定（useRouter使用のため）

import React from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";

/**
 * ジャンル名に応じたSVGアイコンを返すコンポーネント。
 * @param {{ genre: string }} props - ジャンル名。
 */
const GenreIcon: React.FC<{ genre: string }> = ({ genre }) => {
  // 各ジャンルに対応するアイコンのマップ
  const icons: Record<string, React.ReactNode> = {
    居酒屋: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    イタリアン: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0112 3c1.398 0 2.743.57 3.714 1.543C18.5 6.5 19 9 19 11c2 1 2.657 2.657 2.657 2.657a8 8 0 01-4.001 5.001z"
        />
      </svg>
    ),
    ラーメン: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 5l7 7-7 7M5 5l7 7-7 7"
        />
      </svg>
    ),
    カフェ: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
        />
      </svg>
    ),
    美容室: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l-3 3m5.657 5.657l-3-3M16 3l-3 3M21 17v4m-2-2h4m-7-4a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    ホテル: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h6m-6 4h6m-6 4h6"
        />
      </svg>
    ),
  };

  return icons[genre] || icons["居酒屋"];
};

/**
 * 人気のジャンルセクションコンポーネント。
 * @returns {JSX.Element} 人気のジャンルセクションのUI。
 */
const PopularGenresSection: React.FC = () => {
  const router = useRouter();
  const popularGenres = ["居酒屋", "イタリアン", "ラーメン", "カフェ", "美容室", "ホテル"];

  /**
   * ジャンルカードがクリックされたときに、そのジャンルで絞り込んだ一覧ページに遷移します。
   * @param {string} genre - 選択されたジャンル名。
   */
  const handleGenreClick = (genre: string) => {
    const params = new URLSearchParams({
      prefecture: "全国",
      genre,
      keyword: "",
    });
    router.push(`/stores?${params.toString()}`); // ✅ stateではなくクエリで渡す
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
        人気のジャンルから探す
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {popularGenres.map((genre) => (
          <div
            key={genre}
            onClick={() => handleGenreClick(genre)}
            className="group cursor-pointer"
            role="button"
            tabIndex={0}
          >
            <Card className="flex flex-col items-center justify-center p-6 text-center h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
              <div className="text-blue-600 mb-3 transition-colors group-hover:text-blue-700">
                <GenreIcon genre={genre} />
              </div>
              <p className="text-lg font-semibold text-gray-700">{genre}</p>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularGenresSection;

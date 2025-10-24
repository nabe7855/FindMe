/**
 * @file 店舗を検索するための検索バーコンポーネント。
 * 都道府県、ジャンル、キーワードでの検索機能を提供します。
 */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Next.js のルーターを使用
import { PREFECTURES, GENRES } from "@/constants";
import type { SearchCriteria } from "@/types";
import Button from "../ui/Button";
import Select from "../ui/Select";
import Input from "../ui/Input";

/**
 * 検索アイコンのSVGコンポーネント。
 */
const SearchIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

/**
 * 検索バーコンポーネント。
 * @returns {JSX.Element} 検索バーのUI。
 */
const SearchBar: React.FC = () => {
  const [prefecture, setPrefecture] = useState("全国");
  const [genre, setGenre] = useState("すべて");
  const [keyword, setKeyword] = useState("");

  const router = useRouter();

  /**
   * フォーム送信時の処理。
   * 入力された検索条件をクエリパラメータに含めて店舗一覧ページへ遷移します。
   */
const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();

  const criteria: SearchCriteria = { prefecture, genre, keyword };

  // ✅ オプショナルを除外して安全にURL化
  const filteredCriteria = Object.fromEntries(
    Object.entries(criteria).filter(([, v]) => v)
  ) as Record<string, string>;

  const query = new URLSearchParams(filteredCriteria).toString();

  router.push(`/stores?${query}`);
};


  return (
    <form
      onSubmit={handleSearch}
      className="bg-white p-6 rounded-xl shadow-lg w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        {/* 都道府県選択 */}
        <div className="md:col-span-1">
          <Select
            value={prefecture}
            onChange={(e) => setPrefecture(e.target.value)}
            aria-label="都道府県を選択"
          >
            {PREFECTURES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </Select>
        </div>

        {/* ジャンル選択 */}
        <div className="md:col-span-1">
          <Select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            aria-label="ジャンルを選択"
          >
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </Select>
        </div>

        {/* キーワード入力 */}
        <div className="md:col-span-2">
          <Input
            type="text"
            placeholder="キーワード (店名、エリアなど)"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            aria-label="キーワードを入力"
          />
        </div>
      </div>

      <div className="mt-6">
        <Button
          type="submit"
          size="lg"
          className="w-full"
          icon={<SearchIcon />}
        >
          この条件で探す
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;

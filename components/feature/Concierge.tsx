"use client";

/**
 * @file AIコンシェルジュ機能のUIコンポーネント。
 * ユーザーの質問を受け取り、Gemini API（サーバー経由）に問い合わせて結果を表示します。
 */

import React, { useState } from "react";
import { ConciergeResult } from "@/types";
import StoreCard from "../common/StoreCard";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";

/**
 * AI Concierge UI コンポーネント。
 * @returns JSX.Element
 */
const Concierge: React.FC = () => {
  // -----------------------------
  // ✅ 状態管理
  // -----------------------------
  const [userInput, setUserInput] = useState("");
  const [results, setResults] = useState<ConciergeResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // -----------------------------
  // ✅ API呼び出し関数
  // -----------------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = userInput.trim();
    if (!query) return;

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: query }),
      });

      if (!response.ok) {
        throw new Error("AIコンシェルジュへのリクエストに失敗しました。");
      }

      const data = await response.json();

      // 結果の型を保証
if (Array.isArray(data.result)) {
  setResults(data.result as ConciergeResult[]);
} else {
  setResults([
    {
      id: 0,
      name: "AIの提案",
      description: data.result,
      genre: "AI推薦",
      area: "オンライン",
      prefecture: "バーチャル",
    },
  ]);
}
    } catch (err) {
      console.error("AI Concierge Error:", err);
      setError(err instanceof Error ? err.message : "不明なエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // ✅ レンダリング
  // -----------------------------
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 入力フォーム */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="例：渋谷で、今日の夜8時から2人で入れる、個室のある焼き鳥屋さんを探して。"
          className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors min-h-[120px]"
          rows={4}
          aria-label="AIコンシェルジュへの相談内容"
          disabled={loading}
        />
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={loading || !userInput.trim()}
        >
          {loading ? "AIが考え中..." : "AIコンシェルジュに相談する"}
        </Button>
      </form>

      {/* ローディング */}
      {loading && (
        <div className="mt-8 flex justify-center">
          <Spinner />
        </div>
      )}

      {/* エラー表示 */}
      {error && (
        <p
          className="mt-6 text-center text-red-600 bg-red-100 p-4 rounded-lg"
          role="alert"
        >
          {error}
        </p>
      )}

      {/* 結果表示 */}
      {results.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            💡 AIコンシェルジュからのご提案
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Concierge;

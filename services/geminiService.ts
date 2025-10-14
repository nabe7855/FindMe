/**
 * @file Google Gemini APIとの通信を担当するサーバーサイドサービス。
 * クライアント側では fetch("/api/concierge") 経由で利用する。
 */

import type { ConciergeResult } from "@/types";

// Google SDKを動的import（Next.js ESM対応）
let GoogleGenerativeAI: any;

try {
  const module = await import("@google/generative-ai");
  GoogleGenerativeAI = module.GoogleGenerativeAI;
} catch {
  console.warn("⚠️ @google/generative-ai が見つかりません。モックモードで動作します。");
}

// APIキーの取得（サーバー専用）
const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.warn("⚠️ GOOGLE_API_KEY が設定されていません。AI Concierge はモックで動作します。");
}

const ai = GoogleGenerativeAI ? new GoogleGenerativeAI(API_KEY) : null;

/**
 * ユーザーの入力に基づいて店舗を推薦（AIがなければダミーを返す）。
 * @param userInput ユーザーが入力した要望
 * @returns ConciergeResult[]
 */
export const askConcierge = async (userInput: string): Promise<ConciergeResult[]> => {
  // ✅ モックモード
  if (!ai || !API_KEY) {
    console.log("💡 Mockモードで動作中。AIレスポンスは固定データです。");

    return [
      {
        id: 1,
        name: "カフェ・ルミエール",
        description: `「${userInput}」にぴったりな雰囲気のカフェです。静かで読書にも最適。`,
        genre: "カフェ",
        area: "渋谷",
        prefecture: "東京",
        image: "https://picsum.photos/seed/mock1/800/600",
      },
      {
        id: 2,
        name: "カフェ・ノワール",
        description: `落ち着いた雰囲気と香り高いコーヒーが楽しめる人気店です。`,
        genre: "カフェ",
        area: "代官山",
        prefecture: "東京",
        image: "https://picsum.photos/seed/mock2/800/600",
      },
      {
        id: 3,
        name: "ブルーム珈琲店",
        description: `駅近でアクセスも抜群。友人との会話にもぴったり。`,
        genre: "カフェ",
        area: "新宿",
        prefecture: "東京",
        image: "https://picsum.photos/seed/mock3/800/600",
      },
    ];
  }

  // ✅ AIモード
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `
      ユーザーの要望「${userInput}」に合うお店を3つ提案してください。
      JSON配列で出力してください。
      各オブジェクトには id, name, description, genre, area, prefecture, image を含めてください。
    `;

    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    const parsed = JSON.parse(text);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("❌ Gemini呼び出しエラー:", error);
    throw new Error("AIコンシェルジュからの応答取得に失敗しました。");
  }
};

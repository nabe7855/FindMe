/**
 * @file Google Gemini APIとの通信を担当するサービス（AI機能オフ対応版）。
 * AIコンシェルジュ機能が無効な場合でも、ダミーデータで動作します。
 */

import type { ConciergeResult } from "../types";

// ⚠️ GoogleのAI SDKをオプショナルに扱う（存在しなければ無視）
let GoogleGenAI: any;
let Type: any;

try {
  // @ts-ignore: optional import
  ({ GoogleGenAI, Type } = require("@google/genai"));
} catch {
  console.warn(
    "⚠️ @google/genai がインストールされていません。AI機能はダミーモードで動作します。"
  );
}

// APIキーが設定されていない場合の警告（安全に無視できる）
if (!process.env.API_KEY) {
  console.warn(
    "⚠️ API_KEY is not set in environment variables. AI Concierge will run in mock mode."
  );
}

const ai = GoogleGenAI
  ? new GoogleGenAI({ apiKey: process.env.API_KEY })
  : null;

/**
 * ユーザーの入力に基づいて店舗を推薦（AIがなければダミーを返す）。
 * @param {string} userInput - ユーザーが入力した要望。
 * @returns {Promise<ConciergeResult[]>} 推薦結果配列。
 */
export const askConcierge = async (
  userInput: string
): Promise<ConciergeResult[]> => {
  // ✅ もし AI SDK が無い or KEY 無しならモックデータで返す
  if (!ai) {
    console.log("💡 Running in mock AI mode. Returning sample data...");

    return [
      {
        id: 1,
        storeId: 101,
        recommendation_reason: `「${userInput}」にぴったりな雰囲気のカフェです。静かで読書にも最適。`,
        matchScore: 0.9,
        store: {
          id: 101,
          name: "カフェ・ルミエール",
          genre: "カフェ",
          area: "渋谷",
          catch_phrase: "光が差し込む静かな午後を。",
          rating: 4.6,
          imageUrl: "https://picsum.photos/seed/mock1/800/600",
        },
      },
      {
        id: 2,
        storeId: 102,
        recommendation_reason: `落ち着いた雰囲気と香り高いコーヒーが楽しめる人気店です。`,
        matchScore: 0.85,
        store: {
          id: 102,
          name: "カフェ・ノワール",
          genre: "カフェ",
          area: "代官山",
          catch_phrase: "隠れ家のような癒し空間。",
          rating: 4.4,
          imageUrl: "https://picsum.photos/seed/mock2/800/600",
        },
      },
      {
        id: 3,
        storeId: 103,
        recommendation_reason: `駅近でアクセスも抜群。友人との会話にもぴったり。`,
        matchScore: 0.82,
        store: {
          id: 103,
          name: "ブルーム珈琲店",
          genre: "カフェ",
          area: "新宿",
          catch_phrase: "駅前のオアシス。",
          rating: 4.3,
          imageUrl: "https://picsum.photos/seed/mock3/800/600",
        },
      },
    ];
  }

  // ✅ 通常のAIモード（Gemini接続時）
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `ユーザーの要望「${userInput}」に合うお店を3つ提案してください。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              genre: { type: Type.STRING },
              area: { type: Type.STRING },
              rating: { type: Type.NUMBER },
              imageUrl: { type: Type.STRING },
              catch_phrase: { type: Type.STRING },
              recommendation_reason: { type: Type.STRING },
            },
            required: [
              "id",
              "name",
              "genre",
              "area",
              "rating",
              "imageUrl",
              "catch_phrase",
              "recommendation_reason",
            ],
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const parsedResult = JSON.parse(jsonText);
    return Array.isArray(parsedResult) ? parsedResult : [];
  } catch (error) {
    console.error("❌ Error calling Gemini API:", error);
    throw new Error("AIコンシェルジュからの応答の取得に失敗しました。");
  }
};

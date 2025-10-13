/**
 * @file Google Gemini APIとの通信を担当するサービス。
 * AIコンシェルジュ機能のバックエンドロジックを提供します。
 */

import { GoogleGenAI, Type } from "@google/genai";
import { ConciergeResult } from '../types';

// APIキーが環境変数に設定されていない場合に警告を表示
if (!process.env.API_KEY) {
  console.warn("API_KEY is not set in environment variables. AI Concierge will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

/**
 * ユーザーの入力に基づいて、Gemini APIに店舗の推薦を問い合わせます。
 * @param {string} userInput - ユーザーが入力した店舗の要望（例：「渋谷で静かなカフェ」）。
 * @returns {Promise<ConciergeResult[]>} AIによって推薦された店舗情報の配列。
 * @throws {Error} API通信に失敗した場合や、レスポンスの解析に失敗した場合にエラーをスローします。
 */
export const askConcierge = async (userInput: string): Promise<ConciergeResult[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `あなたは優秀な店舗コンシェルジュです。ユーザーの以下の要望に最も合うお店を3つ提案してください。提案するお店は、架空のもので構いませんが、日本の実在する地名や店舗の種類を使い、非常にリアルに聞こえるようにしてください。推薦理由もユーザーの要望に寄り添った、説得力のある内容にしてください。画像のURLは https://picsum.photos/seed/unique_seed/800/600 の形式で生成してください。\n\nユーザーの要望：\n「${userInput}」`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: 'ユニークなID' },
              name: { type: Type.STRING, description: '店舗名' },
              genre: { type: Type.STRING, description: '業種・ジャンル' },
              area: { type: Type.STRING, description: 'エリア（例：渋谷、梅田など）' },
              rating: { type: Type.NUMBER, description: '5段階評価の数値' },
              imageUrl: { type: Type.STRING, description: '店舗の画像URL' },
              catch_phrase: { type: Type.STRING, description: 'お店のキャッチコピー' },
              recommendation_reason: { type: Type.STRING, description: 'このお店を推薦する理由' },
            },
            required: ["id", "name", "genre", "area", "rating", "imageUrl", "catch_phrase", "recommendation_reason"],
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const parsedResult = JSON.parse(jsonText);
    
    // 結果が配列であることを確認
    if (Array.isArray(parsedResult)) {
        return parsedResult as ConciergeResult[];
    }
    
    // 想定外の形式だった場合は空配列を返す
    console.warn("Gemini API returned a non-array result:", parsedResult);
    return [];

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("AIコンシェルジュからの応答の取得に失敗しました。");
  }
};

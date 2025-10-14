import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Google Gemini APIクライアントを初期化
 */
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("⚠️ GEMINI_API_KEY is not set. Running in mock mode.");
}

const ai = apiKey ? new GoogleGenerativeAI(apiKey) : null;

/**
 * POST /api/concierge
 * ユーザーの入力を受け取り、Gemini APIから推薦結果を取得します。
 */
export async function POST(req: Request) {
  try {
    const { userInput } = await req.json();

    // ✅ Gemini APIキーがない場合はモック応答
    if (!ai) {
      console.log("💡 Running in mock AI mode...");
      return NextResponse.json({
        result: [
          {
            id: 1,
            name: "カフェ・ルミエール",
            description: `「${userInput}」にぴったりの静かなカフェです。`,
            genre: "カフェ",
            area: "渋谷",
            prefecture: "東京",
            image: "https://picsum.photos/seed/mock1/800/600",
          },
          {
            id: 2,
            name: "居酒屋 炙り屋",
            description: "個室完備の落ち着いた雰囲気。焼き鳥が名物です。",
            genre: "居酒屋",
            area: "新宿",
            prefecture: "東京",
            image: "https://picsum.photos/seed/mock2/800/600",
          },
        ],
      });
    }

    // ✅ Gemini API呼び出し
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent([
      `ユーザーの要望「${userInput}」に基づいて、
      JSON形式で3件のおすすめ店舗を提案してください。
      各店舗は { id, name, description, genre, area, prefecture, image } を持つオブジェクトにしてください。`,
    ]);

    // ✅ 安全にレスポンスを取得
    const text = await result.response?.text?.();
    if (!text) {
      console.warn("⚠️ Geminiからの応答が空でした。");
      return NextResponse.json({ result: [] });
    }

    // ✅ JSONとしてパース
    const parsed = JSON.parse(text);
    return NextResponse.json({ result: parsed });
  } catch (error) {
    console.error("❌ AI Concierge error:", error);
    return NextResponse.json(
      { error: "AI Concierge failed." },
      { status: 500 }
    );
  }
}

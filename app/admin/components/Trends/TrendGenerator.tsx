import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { TrendData } from '../../types';
import { Zap, Loader2 } from 'lucide-react';

/**
 * TrendGeneratorコンポーネントが受け取るprops(プロパティ)の型定義。
 */
interface TrendGeneratorProps {
  setTrendData: (data: TrendData | null) => void;
}

/**
 * Gemini APIと通信して市場トレンドデータを生成し、
 * 結果を親コンポーネントに渡す役割を持つコンポーネント。
 * @param {TrendGeneratorProps} props - 親から渡される関数
 * @returns JSX.Element
 */
const TrendGenerator: React.FC<TrendGeneratorProps> = ({ setTrendData }) => {
  // API通信中かどうかを管理するstate
  const [loading, setLoading] = useState(false);
  // エラーメッセージを管理するstate
  const [error, setError] = useState('');

  /**
   * Gemini APIを呼び出してトレンドデータを生成する非同期関数
   */
  const generateTrends = async () => {
    setLoading(true);
    setError('');
    try {
      // APIキーが設定されているかチェック
      if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set.");
      }
      // Gemini APIクライアントを初期化
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // APIにリクエストを送信
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "現在の日本の飲食・レストラン市場のトレンドを分析してください。架空の検索ボリュームを持つ5つの上昇中キーワード、簡単な理由を付けた3つのトレンド店舗コンセプト、そして競合に関する短い洞察を一段落で提供してください。JSON形式でお願いします。",
        config: {
          responseMimeType: "application/json",
          responseSchema: { //期待するJSONの構造を定義
            type: Type.OBJECT,
            properties: {
              risingKeywords: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    keyword: { type: Type.STRING },
                    volume: { type: Type.NUMBER }
                  }
                }
              },
              trendingStores: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    reason: { type: Type.STRING }
                  }
                }
              },
              competitiveInsights: { type: Type.STRING }
            }
          },
        },
      });

      // レスポンスのテキストをJSONとして解析
      const data: TrendData = JSON.parse(response.text);
      // 親コンポーネントのstateを更新
      setTrendData(data);

    } catch (err) {
      console.error(err);
      setError('トレンドの生成に失敗しました。APIキーを確認して、もう一度お試しください。');
      setTrendData(null);
    } finally {
      // 成功・失敗にかかわらず、ローディング状態を解除
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
      <h3 className="text-xl font-bold text-white mb-2">市場トレンドレポートを生成</h3>
      <p className="text-gray-400 mb-4">Geminiを使用して現在の市場データを分析し、新たなトレンドを特定します。</p>
      <button 
        onClick={generateTrends} 
        disabled={loading} // ローディング中はボタンを無効化
        className="inline-flex items-center justify-center px-6 py-3 bg-emerald-accent text-gray-900 font-bold rounded-md hover:bg-opacity-80 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        {/* ローディング状態に応じてアイコンとテキストを切り替え */}
        {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Zap className="w-5 h-5 mr-2" />}
        {loading ? '分析中...' : 'Geminiで生成'}
      </button>
      {/* エラーがあればメッセージを表示 */}
      {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
    </div>
  );
};

export default TrendGenerator;

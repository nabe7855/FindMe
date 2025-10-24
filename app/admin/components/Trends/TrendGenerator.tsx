import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { TrendData } from '../../../../types';
import { Zap, Loader2 } from 'lucide-react';

/**
 * TrendGeneratorコンポーネントが受け取るprops(プロパティ)の型定義。
 */
interface TrendGeneratorProps {
  setTrendData: (_data: TrendData | null) => void;
}

/**
 * Gemini APIと通信して市場トレンドデータを生成し、
 * 結果を親コンポーネントに渡す役割を持つコンポーネント。
 */
const TrendGenerator: React.FC<TrendGeneratorProps> = ({ setTrendData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Gemini APIを呼び出してトレンドデータを生成する非同期関数
   */
  const generateTrends = async () => {
    setLoading(true);
    setError('');

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) throw new Error('Gemini APIキーが設定されていません。');

      // ✅ クライアント初期化
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt =
        '現在の日本の飲食・レストラン市場のトレンドを分析してください。' +
        '架空の検索ボリュームを持つ5つの上昇中キーワード、簡単な理由を付けた3つのトレンド店舗コンセプト、' +
        'そして競合に関する短い洞察を一段落で提供してください。' +
        '結果は **必ず** 次の構造の JSON 形式で出力してください：' +
        '{"risingKeywords": [{"keyword": "...", "volume": 100}], "trendingStores": [{"name": "...", "reason": "..."}], "competitiveInsights": "..."}';

      // ✅ モデル呼び出し
      const result = await model.generateContent(prompt);

      // ✅ 結果テキストを取得
      const text = result.response.text();
      if (!text) throw new Error('Gemini APIの応答が空でした。');

      // ✅ JSONをパース
      const data: TrendData = JSON.parse(text);
      setTrendData(data);
    } catch (err) {
      console.error(err);
      setError('トレンド生成に失敗しました。APIキーを確認してください。');
      setTrendData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
      <h3 className="text-xl font-bold text-white mb-2">市場トレンドレポートを生成</h3>
      <p className="text-gray-400 mb-4">
        Geminiを使用して現在の市場データを分析し、新たなトレンドを特定します。
      </p>
      <button
        onClick={generateTrends}
        disabled={loading}
        className="inline-flex items-center justify-center px-6 py-3 bg-emerald-accent text-gray-900 font-bold rounded-md hover:bg-opacity-80 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Zap className="w-5 h-5 mr-2" />}
        {loading ? '分析中...' : 'Geminiで生成'}
      </button>
      {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
    </div>
  );
};

export default TrendGenerator;

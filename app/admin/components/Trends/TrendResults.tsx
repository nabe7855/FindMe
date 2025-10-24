import React from 'react';
import { TrendData } from '../../../../types';

/**
 * TrendResultsコンポーネントが受け取るprops(プロパティ)の型定義。
 */
interface TrendResultsProps {
  trendData: TrendData;
}

/**
 * Gemini APIから取得したトレンド分析の結果を、
 * 人間が読みやすい形式で表示するためのコンポーネント。
 * @param {TrendResultsProps} props - 表示するトレンドデータ
 * @returns JSX.Element
 */
const TrendResults: React.FC<TrendResultsProps> = ({ trendData }) => {
  return (
    <div className="space-y-8">
      {/* 急上昇キーワードセクション */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">急上昇キーワード</h3>
        <div className="flex flex-wrap gap-3">
          {trendData.risingKeywords.map(item => (
            <div key={item.keyword} className="bg-gray-700 py-2 px-4 rounded-full text-sm">
              <span className="font-semibold text-white">{item.keyword}</span>
              <span className="ml-2 text-gray-400">({item.volume.toLocaleString()})</span>
            </div>
          ))}
        </div>
      </div>

      {/* トレンドの店舗コンセプトセクション */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">トレンドの店舗コンセプト</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trendData.trendingStores.map(item => (
            <div key={item.name} className="bg-gray-700/50 p-4 rounded-md">
              <p className="font-bold text-blue-accent">{item.name}</p>
              <p className="text-sm text-gray-300 mt-1">{item.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 競合インサイトセクション */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">競合インサイト</h3>
        <p className="text-gray-300 leading-relaxed">{trendData.competitiveInsights}</p>
      </div>
    </div>
  );
};

export default TrendResults;

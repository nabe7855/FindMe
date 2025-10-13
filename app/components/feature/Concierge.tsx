/**
 * @file AIコンシェルジュ機能のUIを提供するコンポーネント。
 * ユーザー入力を受け取り、Gemini APIに問い合わせ、結果を表示します。
 */
import React, { useState } from 'react';
import { askConcierge } from '../../services/geminiService';
import { ConciergeResult } from '../../types';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import StoreCard from '../common/StoreCard';

/**
 * AIコンシェルジュコンポーネント。
 * @returns {JSX.Element} AIコンシェルジュのUI。
 */
const Concierge: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [results, setResults] = useState<ConciergeResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * フォーム送信時の処理。
   * `geminiService`を呼び出してAIに相談します。
   * @param {React.FormEvent} e - フォームイベント。
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const conciergeResults = await askConcierge(userInput);
      setResults(conciergeResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="例：渋谷で、今日の夜8時から2人で入れる、個室のある焼き鳥屋さんを探して。"
          className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors min-h-[120px]"
          rows={4}
          aria-label="AIコンシェルジュへの相談内容"
        />
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? 'AIが考え中...' : 'AIコンシェルジュに相談する'}
        </Button>
      </form>

      {/* ローディング表示 */}
      {loading && <div className="mt-8"><Spinner /></div>}
      
      {/* エラー表示 */}
      {error && <p className="mt-6 text-center text-red-600 bg-red-100 p-4 rounded-lg" role="alert">{error}</p>}
      
      {/* 結果表示 */}
      {results.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">AIコンシェルジュからのご提案</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map(store => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Concierge;

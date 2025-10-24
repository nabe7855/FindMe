
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { TrendData } from '../types';
import { Zap, Loader2 } from 'lucide-react';

const TrendGenerator = ({ setTrendData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateTrends = async () => {
    setLoading(true);
    setError('');
    try {
      if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set.");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Analyze the current dining and restaurant market trends. Provide a list of 5 rising keywords with fictional search volumes, 3 trending store concepts with brief reasons, and a short paragraph on competitive insights. Format as JSON.",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
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

      const jsonString = response.text.trim();
      const data: TrendData = JSON.parse(jsonString);
      setTrendData(data);
    } catch (err) {
      console.error(err);
      setError('Failed to generate trends. Please check your API key and try again.');
      setTrendData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
      <h3 className="text-xl font-bold text-white mb-2">Generate Market Trend Report</h3>
      <p className="text-gray-400 mb-4">Use Gemini to analyze current market data and identify emerging trends.</p>
      <button 
        onClick={generateTrends} 
        disabled={loading}
        className="inline-flex items-center justify-center px-6 py-3 bg-emerald-accent text-gray-900 font-bold rounded-md hover:bg-opacity-80 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Zap className="w-5 h-5 mr-2" />}
        {loading ? 'Analyzing...' : 'Generate with Gemini'}
      </button>
      {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
    </div>
  );
};

const Trends = () => {
  const [trendData, setTrendData] = useState<TrendData | null>(null);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white">Market Trends Analysis</h2>
      <TrendGenerator setTrendData={setTrendData} />
      
      {trendData && (
        <div className="space-y-8">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Rising Keywords</h3>
            <div className="flex flex-wrap gap-3">
              {trendData.risingKeywords.map(item => (
                <div key={item.keyword} className="bg-gray-700 py-2 px-4 rounded-full text-sm">
                  <span className="font-semibold text-white">{item.keyword}</span>
                  <span className="ml-2 text-gray-400">({item.volume.toLocaleString()})</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Trending Store Concepts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {trendData.trendingStores.map(item => (
                <div key={item.name} className="bg-gray-700/50 p-4 rounded-md">
                  <p className="font-bold text-blue-accent">{item.name}</p>
                  <p className="text-sm text-gray-300 mt-1">{item.reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Competitive Insights</h3>
            <p className="text-gray-300 leading-relaxed">{trendData.competitiveInsights}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trends;

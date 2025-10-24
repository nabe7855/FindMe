'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

// ✅ 型定義を追加
interface TableProps {
  data: Record<string, string | number>[];
  headers: string[];
}

// ✅ データセット
const sessionData = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  sessions: 1500 + Math.floor(Math.random() * 1000) - i * 10,
}));

const trafficSourceData = [
  { name: 'Organic Search', value: 70 },
  { name: 'Direct', value: 20 },
  { name: 'Referral', value: 10 },
];

const COLORS = ['#00BFFF', '#00FF7F', '#FF6347'];

const topQueries = [
  { query: 'best sushi near me', clicks: 850, ctr: '8.5%' },
  { query: 'late night cafe', clicks: 720, ctr: '12.1%' },
  { query: 'italian restaurant with parking', clicks: 650, ctr: '9.2%' },
  { query: 'family friendly dining', clicks: 580, ctr: '7.8%' },
];

const topPages = [
  { page: '/stores/cyberpunk-sushi-bar', clicks: 980, position: '1.2' },
  { page: '/stores/quantum-cafe', clicks: 810, position: '2.5' },
  { page: '/stores/the-gilded-steakhouse', clicks: 760, position: '1.8' },
  { page: '/stores/neon-noodle', clicks: 690, position: '3.1' },
];

// ✅ Tableコンポーネントに型をつける
const Table: React.FC<TableProps> = ({ data, headers }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="border-b border-gray-700">
          {headers.map((h) => (
            <th key={h} className="p-3 font-semibold text-sm text-gray-400">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-b border-gray-700 last:border-0">
            {Object.values(row).map((val, j) => (
              <td key={j} className="p-3 text-sm text-gray-200">
                {val}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ✅ メインAnalyticsコンポーネント
const Analytics: React.FC = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white">Access Analytics</h2>

      {/* グラフ部分 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            Site Sessions (Last 30 Days) -{' '}
            <span className="text-orange-400">GA</span>
          </h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart
                data={sessionData}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#3E3E3E" />
                <XAxis dataKey="day" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E1E1E',
                    border: '1px solid #3E3E3E',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sessions"
                  stroke="#FFA500"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PieChart */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            Traffic Sources - <span className="text-orange-400">GA</span>
          </h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={trafficSourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {trafficSourceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E1E1E',
                    border: '1px solid #3E3E3E',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* テーブル部分 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            Top Search Queries -{' '}
            <span className="text-blue-accent">GSC</span>
          </h3>
          <Table data={topQueries} headers={['Query', 'Clicks', 'CTR']} />
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            Top Inflow Pages -{' '}
            <span className="text-blue-accent">GSC</span>
          </h3>
          <Table
            data={topPages}
            headers={['Page', 'Clicks', 'Avg. Position']}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;

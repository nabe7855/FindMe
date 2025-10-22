'use client';
import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode; // ← JSX要素として受け取る
  change?: string;
  color?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, change, color }) => (
  <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-400">{title}</p>
      <div className="h-6 w-6 text-gray-500">{icon}</div> {/* ← 修正ポイント */}
    </div>
    <div className="mt-2">
      <h3 className="text-3xl font-bold text-white">{value}</h3>
      {change && <p className={`text-sm ${color}`}>{change}</p>}
    </div>
  </div>
);

export default DashboardCard;
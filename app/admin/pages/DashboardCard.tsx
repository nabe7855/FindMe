'use client';

import React from 'react';
import type { IconType } from 'react-icons';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: IconType | React.ComponentType<{ className?: string }>;
  change?: string;  // ← これ追加！
  color?: string;   // ← これ追加！
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  color,
}) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-400">{title}</p>
        {Icon && <Icon className="h-6 w-6 text-gray-500" />}
      </div>
      <div className="mt-2">
        <h3 className="text-3xl font-bold text-white">{value}</h3>
        {change && (
          <p className={`text-sm ${color}`}>{change}</p>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;


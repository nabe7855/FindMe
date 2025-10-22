'use client';
import React from 'react';
import DashboardCard from './DashboardCard';
import { FaMoneyBillWave, FaUsers, FaBox } from 'react-icons/fa'

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard title="総売上" value="¥1,230,000" icon={<FaMoneyBillWave />} />
      <DashboardCard title="顧客数" value="542人" icon={<FaUsers />} />
      <DashboardCard title="在庫数" value="1,257点" icon={<FaBox />} />
    </div>
  );
}
'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // ← これで現在のパスを取得！

const navItems = [
  { name: 'ダッシュボード', to: '/admin' },
  { name: '店舗一覧', to: '/admin/stores' },
  { name: 'ランキング', to: '/admin/rankings' },
  { name: '分析', to: '/admin/analytics' },
];

export default function Sidebar() {
  const pathname = usePathname(); // 現在のURLパスを取得

  return (
    <aside className="w-64 bg-gray-800 text-gray-200 h-screen p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-6 text-white">管理メニュー</h2>
      <nav className="flex-1">
        {navItems.map((item) => (
          <Link
            key={item.to}
            href={item.to}
            className={`block py-2 px-4 rounded-lg mb-2 ${
              pathname === item.to ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
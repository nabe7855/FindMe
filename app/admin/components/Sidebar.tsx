'use client'

import React from 'react'

interface SidebarProps {
  onNavigate: (_page: string) => void
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-800 text-gray-200 h-screen p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-6 text-white">管理メニュー</h2>
      <nav className="flex-1">
        <button
          onClick={() => onNavigate('dashboard')}
          className="block w-full text-left hover:bg-gray-700 p-2 rounded"
        >
          ダッシュボード
        </button>
        <button
          onClick={() => onNavigate('stores')}
          className="block w-full text-left hover:bg-gray-700 p-2 rounded"
        >
          店舗管理
        </button>
        <button
          onClick={() => onNavigate('tags')}
          className="block w-full text-left hover:bg-gray-700 p-2 rounded"
        >
          タグ管理
        </button>
        <button
          onClick={() => onNavigate('rankings')}
          className="block w-full text-left hover:bg-gray-700 p-2 rounded"
        >
          ランキング
        </button>
        <button
          onClick={() => onNavigate('display-order')}
          className="block w-full text-left hover:bg-gray-700 p-2 rounded"
        >
          表示順設定
        </button>
        <button
          onClick={() => onNavigate('analytics')}
          className="block w-full text-left hover:bg-gray-700 p-2 rounded"
        >
          アナリティクス
        </button>
        <button
          onClick={() => onNavigate('trends')}
          className="block w-full text-left hover:bg-gray-700 p-2 rounded"
        >
          トレンド
        </button>
      </nav>
    </aside>
  )
}

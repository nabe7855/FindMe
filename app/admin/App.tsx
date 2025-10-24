'use client'

import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

// ✅ 修正版インポート（pagesフォルダから読み込む）
import Dashboard from './pages/Dashboard'
import Stores from './pages/Stores'
import StoreEdit from './pages/StoreEdit'
import Tags from './pages/Tags'
import Rankings from './pages/Rankings'
import DisplayOrder from './pages/DisplayOrder'
import Analytics from './pages/Analytics'
import Trends from './pages/Trends'

export default function App() {
  const [activePage, setActivePage] = useState('dashboard')

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />
      case 'stores': return <Stores />
      case 'store-edit': return <StoreEdit />
      case 'tags': return <Tags />
      case 'rankings': return <Rankings />
      case 'display-order': return <DisplayOrder />
      case 'analytics': return <Analytics />
      case 'trends': return <Trends />
      default: return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 font-sans">
      {/* SidebarにonNavigateを渡す */}
      <Sidebar onNavigate={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6 md:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}



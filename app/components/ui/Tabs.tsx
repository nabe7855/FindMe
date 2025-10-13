/**
 * @file コンテンツを切り替えて表示するためのタブUIコンポーネント。
 */
import React, { useState } from 'react';

/**
 * 単一のタブのデータ構造を定義するインターフェース。
 */
interface Tab {
  /** タブの見出しとして表示されるテキスト */
  label: string;
  /** タブが選択されたときに表示されるコンテンツ */
  content: React.ReactNode;
}

/**
 * TabsコンポーネントのPropsの型定義。
 */
interface TabsProps {
  /** 表示するタブのデータ配列 */
  tabs: Tab[];
}

/**
 * タブ切り替えUIコンポーネント。
 * @param {TabsProps} props - コンポーネントのプロパティ。
 * @returns {JSX.Element} タブUI。
 */
const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(index)}
              className={`${
                activeTab === index
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg`}
              aria-current={activeTab === index ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-8">
        {/* アクティブなタブのコンテンツのみ表示 */}
        {tabs[activeTab] && tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;

import React from 'react';
import { Bell, UserCircle } from 'lucide-react';

/**
 * 各ページのコンテンツエリア上部に表示されるヘッダーコンポーネント。
 * 通知アイコンやユーザー情報を表示します。
 * @returns JSX.Element
 */
const Header = () => {
  return (
    <header className="flex items-center justify-between h-20 px-6 bg-gray-800 border-b border-gray-700">
      <div className="flex items-center">
        {/* 将来的に検索バーなどを配置するためのプレースホルダー */}
      </div>
      <div className="flex items-center space-x-4">
        {/* 通知アイコンボタン */}
        <button className="p-2 text-gray-400 rounded-full hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700">
          <Bell className="w-6 h-6" />
        </button>
        {/* ユーザー情報 */}
        <div className="flex items-center space-x-2">
            <UserCircle className="w-8 h-8 text-gray-400" />
            <span className="text-white font-medium">管理者ユーザー</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

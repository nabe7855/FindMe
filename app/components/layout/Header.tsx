/**
 * @file アプリケーションの全ページで表示されるヘッダーコンポーネント。
 * サイトロゴ、ナビゲーションリンク、モバイル用メニュー機能を提供します。
 */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

/**
 * ヘッダーコンポーネント。
 * @returns {JSX.Element} ヘッダーのUI。
 */
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setIsConciergeOpen } = useAppContext();
  const location = useLocation();

  // ページ遷移が発生したら、モバイルメニューを自動的に閉じる
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  /**
   * モバイルメニューの開閉をトグルします。
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  /**
   * AIコンシェルジュモーダルを開き、メニューを閉じます。
   */
  const handleConciergeClick = () => {
    setIsMenuOpen(false); // メニューが開いている場合は閉じる
    setIsConciergeOpen(true);
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* サイトロゴ */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-3xl font-bold text-blue-600 hover:text-blue-800 transition-colors">
                FindMe
              </Link>
            </div>
            {/* デスクトップ用ナビゲーション */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/stores" className="text-lg text-gray-700 hover:text-blue-600 transition-colors font-medium">
                お店を探す
              </Link>
              <button
                onClick={() => setIsConciergeOpen(true)}
                className="text-lg text-gray-700 hover:text-blue-600 transition-colors font-medium"
                aria-haspopup="dialog"
              >
                AIコンシェルジュ
              </button>
            </nav>
            {/* モバイル用ハンバーガーメニューボタン */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-800 focus:outline-none z-50 relative" aria-controls="mobile-menu" aria-expanded={isMenuOpen}>
                <span className="sr-only">メインメニューを開く</span>
                {isMenuOpen ? (
                   <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                   </svg>
                ) : (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* モバイルメニューオーバーレイ */}
      <div 
        id="mobile-menu"
        className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!isMenuOpen}
      >
        <nav className="flex flex-col items-center text-center space-y-10">
            <Link to="/stores" className="text-2xl text-gray-800 hover:text-blue-600 transition-colors font-medium">
              お店を探す
            </Link>
            <button
              onClick={handleConciergeClick}
              className="text-2xl text-gray-800 hover:text-blue-600 transition-colors font-medium"
              aria-haspopup="dialog"
            >
              AIコンシェルジュ
            </button>
        </nav>
      </div>
    </>
  );
};

export default Header;

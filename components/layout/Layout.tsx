"use client";
/**
 * @file アプリケーション全体のレイアウトを定義するコンポーネント。
 * ヘッダー、フッター、およびメインコンテンツ領域を配置します。
 * AIコンシェルジュのモーダルもこのコンポーネントで管理します。
 */
import React from "react";
import { useAppContext } from "../../context/AppContext";
import Concierge from "../feature/Concierge";
import Modal from "../ui/Modal";
import Footer from "./Footer";
import Header from "./Header";

/**
 * LayoutコンポーネントのPropsの型定義。
 */
interface LayoutProps {
  children: React.ReactNode;
}

/**
 * 全ページ共通のレイアウトコンポーネント。
 * @param {LayoutProps} props - コンポーネントのプロパティ。
 * @param {React.ReactNode} props.children - メインコンテンツとして表示される子要素。
 * @returns {JSX.Element} レイアウトが適用されたUI。
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isConciergeOpen, setIsConciergeOpen } = useAppContext();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      {/* AIコンシェルジュモーダル */}
      <Modal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        title="AIコンシェルジュ"
      >
        <Concierge />
      </Modal>
    </div>
  );
};

export default Layout;

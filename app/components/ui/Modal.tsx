/**
 * @file 画面上にオーバーレイ表示されるモーダルダイアログコンポーネント。
 * アクセシビリティ（ARIA属性、Escapeキーでのクローズ）にも対応しています。
 */
import React, { useEffect } from 'react';

/**
 * ModalコンポーネントのPropsの型定義。
 */
interface ModalProps {
  /** モーダルが開いているかどうか */
  isOpen: boolean;
  /** モーダルを閉じる際に呼び出される関数 */
  onClose: () => void;
  /** モーダル内に表示される内容 */
  children: React.ReactNode;
  /** モーダルのヘッダーに表示されるタイトル */
  title: string;
}

/**
 * モーダルダイアログコンポーネント。
 * @param {ModalProps} props - コンポーネントのプロパティ。
 * @returns {JSX.Element | null} モーダルが開いている場合はUIを、そうでない場合はnullを返す。
 */
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  // Escapeキーが押されたときにモーダルを閉じるイベントリスナーを設定
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    // コンポーネントのアンマウント時にイベントリスナーをクリーンアップ
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      aria-modal="true"
      role="dialog"
      onClick={onClose} // 背景クリックで閉じる
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()} // モーダル内部のクリックは伝播させない
      >
        <header className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="閉じる"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

/**
 * @file React Context APIを使用したグローバルな状態管理を提供します。
 * 現在はAIコンシェルジュモーダルの開閉状態を管理しています。
 */
import React, { createContext, useState, useContext, ReactNode } from 'react';

/**
 * AppContextで提供される値の型定義。
 */
interface AppContextType {
  /** AIコンシェルジュモーダルが開いているかどうか */
  isConciergeOpen: boolean;
  /** AIコンシェルジュモーダルの開閉状態を更新する関数 */
  setIsConciergeOpen: (isOpen: boolean) => void;
}

/**
 * AppContextオブジェクト。
 * コンポーネントツリー内で状態を共有するために使用されます。
 */
const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * AppProviderコンポーネント。
 * このコンポーネントでラップされた子要素は、AppContextの値を参照できます。
 * @param {{ children: ReactNode }} props - 子コンポーネント。
 */
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);

  const value = { isConciergeOpen, setIsConciergeOpen };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * AppContextの値を簡単に利用するためのカスタムフック。
 * @returns {AppContextType} AppContextが提供する値。
 * @throws {Error} AppProviderの外部で呼び出された場合にエラーをスローします。
 */
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

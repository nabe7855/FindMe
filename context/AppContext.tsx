"use client";

/**
 * @file React Context APIを使用したグローバルな状態管理を提供します。
 * 現在はAIコンシェルジュモーダルの開閉状態を管理しています。
 */

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from "react";

/**
 * AppContextで提供される値の型定義。
 */
export interface AppContextType {
  /** AIコンシェルジュモーダルが開いているかどうか */
  isConciergeOpen: boolean;
  /** AIコンシェルジュモーダルの開閉状態を更新する関数 */
  setIsConciergeOpen: (isOpen: boolean) => void;
}

/**
 * Contextの初期値（undefinedを許容）
 */
const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * AppProviderコンポーネント。
 * 子要素をラップし、AppContextの値を提供します。
 */
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);

  // ✅ useMemo で無駄な再レンダーを防止
  const value = useMemo(
    () => ({ isConciergeOpen, setIsConciergeOpen }),
    [isConciergeOpen]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * AppContextを利用するためのカスタムフック。
 * Providerの外で呼ばれた場合は明確なエラーを出します。
 */
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

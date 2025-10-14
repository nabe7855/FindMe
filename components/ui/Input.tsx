/**
 * @file 再利用可能な汎用テキストインプットコンポーネント。
 */
import React from 'react';

/**
 * InputコンポーネントのPropsの型定義。
 * `React.InputHTMLAttributes`を拡張しているため、通常の`<input>`要素の属性もすべて受け付けます。
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * 汎用テキストインプットコンポーネント。
 * @param {InputProps} props - コンポーネントのプロパティ。
 * @returns {JSX.Element} スタイルが適用されたinput要素。
 */
const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  const baseClasses = 'w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors';
  const combinedClasses = `${baseClasses} ${className}`;

  return (
    <input className={combinedClasses} {...props} />
  );
};

export default Input;

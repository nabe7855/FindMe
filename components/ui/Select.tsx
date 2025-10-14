/**
 * @file 再利用可能な汎用セレクトボックス（ドロップダウン）コンポーネント。
 */
import React from 'react';

/**
 * SelectコンポーネントのPropsの型定義。
 * `React.SelectHTMLAttributes`を拡張しているため、通常の`<select>`要素の属性もすべて受け付けます。
 */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** `<option>`要素 */
  children: React.ReactNode;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * 汎用セレクトボックスコンポーネント。
 * @param {SelectProps} props - コンポーネントのプロパティ。
 * @returns {JSX.Element} スタイルが適用されたselect要素。
 */
const Select: React.FC<SelectProps> = ({ children, className = '', ...props }) => {
  const baseClasses = 'w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none bg-white bg-no-repeat';
  const combinedClasses = `${baseClasses} ${className}`;

  return (
    <div className="relative">
      <select 
        className={combinedClasses}
        style={{
          // カスタムのドロップダウン矢印アイコン
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundSize: '1.5em 1.5em',
          paddingRight: '2.5rem'
        }}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;

/**
 * @file 再利用可能な汎用ボタンスコンポーネント。
 * バリアント、サイズ、アイコンなどのカスタマイズが可能です。
 */
import React from 'react';

/**
 * ButtonコンポーネントのPropsの型定義。
 * `React.ButtonHTMLAttributes`を拡張しているため、通常の`<button>`要素の属性もすべて受け付けます。
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** ボタン内に表示される内容 */
  children: React.ReactNode;
  /** ボタンのスタイル（'primary'または'secondary'） */
  variant?: 'primary' | 'secondary';
  /** ボタンのサイズ（'sm', 'md', 'lg'） */
  size?: 'sm' | 'md' | 'lg';
  /** 追加のCSSクラス */
  className?: string;
  /** ボタンのテキストの前に表示されるアイコン要素 */
  icon?: React.ReactNode;
}

/**
 * 汎用ボタンスコンポーネント。
 * @param {ButtonProps} props - コンポーネントのプロパティ。
 * @returns {JSX.Element} スタイルが適用されたボタン要素。
 */
const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className = '', icon, ...props }) => {
  // ベースとなる共通スタイル
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  // variantに応じたスタイル
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
  };

  // sizeに応じたスタイル
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  // すべてのクラスを結合
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button className={combinedClasses} {...props}>
      {icon && <span className="mr-2 -ml-1">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;

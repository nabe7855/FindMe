/**
 * @file ページの階層構造を示すパンくずリストコンポーネント。
 */
import React from "react";
import Link from "next/link";

/**
 * パンくずリストの各項目のデータ構造。
 */
interface BreadcrumbItem {
  /** 表示されるテキスト */
  label: string;
  /** リンク先のURL（オプション）。指定しない場合は現在地として表示。 */
  href?: string;
}

/**
 * BreadcrumbsコンポーネントのPropsの型定義。
 */
interface BreadcrumbsProps {
  /** パンくずリストの項目データ配列 */
  items: BreadcrumbItem[];
}

/**
 * パンくずリストコンポーネント。
 * @param {BreadcrumbsProps} props - コンポーネントのプロパティ。
 * @returns {JSX.Element} パンくずリストのUI。
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="text-lg">
      <ol className="flex items-center space-x-2 text-gray-500">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              // ✅ Next.js では href を使用
              <Link
                href={item.href}
                className="hover:text-blue-600 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              // 現在地はテキストとして表示
              <span className="font-semibold text-gray-800">
                {item.label}
              </span>
            )}
            {/* 最後の項目以外には区切り文字を表示 */}
            {index < items.length - 1 && (
              <svg
                className="w-5 h-5 text-gray-400 mx-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

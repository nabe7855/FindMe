/**
 * @file アプリケーションの全ページで表示されるフッターコンポーネント。
 * サイトマップや規約へのリンク、コピーライト情報などを提供します。
 */
import React from "react";
import Link from "next/link";

/**
 * フッターコンポーネント。
 * @returns {JSX.Element} フッターのUI。
 */
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* FindMeについて */}
          <div>
            <h3 className="text-lg font-semibold uppercase tracking-wider">
              FindMe
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-300 hover:text-white"
                >
                  FindMeについて
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-300 hover:text-white"
                >
                  ヘルプ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-300 hover:text-white"
                >
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>

          {/* お店を探す */}
          <div>
            <h3 className="text-lg font-semibold uppercase tracking-wider">
              お店を探す
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/stores"
                  className="text-base text-gray-300 hover:text-white"
                >
                  エリアから探す
                </Link>
              </li>
              <li>
                <Link
                  href="/stores"
                  className="text-base text-gray-300 hover:text-white"
                >
                  ジャンルから探す
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-300 hover:text-white"
                >
                  特集
                </Link>
              </li>
            </ul>
          </div>

          {/* 規約 */}
          <div>
            <h3 className="text-lg font-semibold uppercase tracking-wider">
              規約
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-300 hover:text-white"
                >
                  利用規約
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-300 hover:text-white"
                >
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>

          {/* 店舗様へ */}
          <div>
            <h3 className="text-lg font-semibold uppercase tracking-wider">
              店舗様へ
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-300 hover:text-white"
                >
                  掲載について
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} FindMe. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";

/**
 * AnalyticsTableコンポーネントが受け取るprops(プロパティ)の型定義。
 */
interface AnalyticsTableProps<T extends Record<string, unknown>> {
  data: T[]; // オブジェクトの配列
  headers: string[]; // テーブルヘッダーの文字列配列
}

/**
 * アクセス解析ページで、人気クエリや人気ページを表示するための汎用テーブルコンポーネント。
 * @param {AnalyticsTableProps} props - 表示するデータとヘッダー情報
 * @returns JSX.Element
 */
const AnalyticsTable = <T extends Record<string, unknown>>({
  data,
  headers,
}: AnalyticsTableProps<T>) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="border-b border-gray-700">
          {headers.map((h) => (
            <th key={h} className="p-3 font-semibold text-sm text-gray-400">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-b border-gray-700 last:border-0">
            {Object.values(row).map((val, j) => (
              <td key={j} className="p-3 text-sm text-gray-200">
                {String(val)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AnalyticsTable;

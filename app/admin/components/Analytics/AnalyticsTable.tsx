import React from 'react';

/**
 * AnalyticsTableコンポーネントが受け取るprops(プロパティ)の型定義。
 */
interface AnalyticsTableProps {
  data: Record<string, any>[]; // オブジェクトの配列
  headers: string[]; // テーブルヘッダーの文字列配列
}

/**
 * アクセス解析ページで、人気クエリや人気ページを表示するための汎用テーブルコンポーネント。
 * @param {AnalyticsTableProps} props - 表示するデータとヘッダー情報
 * @returns JSX.Element
 */
const AnalyticsTable: React.FC<AnalyticsTableProps> = ({ data, headers }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-left">
            <thead>
                <tr className="border-b border-gray-700">
                    {/* headers配列をループしてテーブルヘッダー(th)を生成 */}
                    {headers.map(h => <th key={h} className="p-3 font-semibold text-sm text-gray-400">{h}</th>)}
                </tr>
            </thead>
            <tbody>
                {/* data配列をループしてテーブルの行(tr)を生成 */}
                {data.map((row, i) => (
                    <tr key={i} className="border-b border-gray-700 last:border-0">
                        {/* 各行のオブジェクトの値をループしてセル(td)を生成 */}
                        {Object.values(row).map((val: any, j) => <td key={j} className="p-3 text-sm text-gray-200">{val}</td>)}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default AnalyticsTable;

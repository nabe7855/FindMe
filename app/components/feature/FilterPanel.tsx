/**
 * @file 店舗一覧ページで使用する絞り込み検索パネルコンポーネント。
 */
import React from 'react';
import { PREFECTURES, GENRES } from '../../constants';
import { SearchCriteria } from '../../types';
import Button from '../ui/Button';
import Select from '../ui/Select';
import Input from '../ui/Input';

/**
 * FilterPanelコンポーネントのPropsの型定義。
 */
interface FilterPanelProps {
  /** 検索条件の初期値 */
  initialCriteria: SearchCriteria;
  /** 「再検索」ボタンが押されたときに呼び出される関数 */
  onFilter: (criteria: SearchCriteria) => void;
}

/**
 * 絞り込み検索パネルコンポーネント。
 * @param {FilterPanelProps} props - コンポーネントのプロパティ。
 * @returns {JSX.Element} 絞り込み検索パネルのUI。
 */
const FilterPanel: React.FC<FilterPanelProps> = ({ initialCriteria, onFilter }) => {
  const [criteria, setCriteria] = React.useState<SearchCriteria>(initialCriteria);

  /**
   * フォームの入力値をstateに反映させます。
   * @param {keyof SearchCriteria} field - 更新するフィールド名。
   * @param {string} value - 新しい値。
   */
  const handleChange = (field: keyof SearchCriteria, value: string) => {
    setCriteria(prev => ({ ...prev, [field]: value }));
  };
  
  /**
   * フォーム送信時に、親コンポーネントに検索条件を渡します。
   * @param {React.FormEvent} e - フォームイベント。
   */
  const handleFilter = (e: React.FormEvent) => {
      e.preventDefault();
      onFilter(criteria);
  };

  return (
    <form onSubmit={handleFilter} className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <h3 className="text-xl font-bold text-gray-800">絞り込み検索</h3>
      <div>
        <label htmlFor="filter-prefecture" className="block text-lg font-medium text-gray-700 mb-2">エリア</label>
        <Select id="filter-prefecture" value={criteria.prefecture} onChange={e => handleChange('prefecture', e.target.value)}>
          {PREFECTURES.map(p => <option key={p} value={p}>{p}</option>)}
        </Select>
      </div>
      <div>
        <label htmlFor="filter-genre" className="block text-lg font-medium text-gray-700 mb-2">ジャンル</label>
        <Select id="filter-genre" value={criteria.genre} onChange={e => handleChange('genre', e.target.value)}>
          {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
        </Select>
      </div>
      <div>
        <label htmlFor="filter-keyword" className="block text-lg font-medium text-gray-700 mb-2">キーワード</label>
        <Input 
          id="filter-keyword"
          type="text" 
          placeholder="店名、エリアなど"
          value={criteria.keyword}
          onChange={e => handleChange('keyword', e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full" size="lg">この条件で再検索</Button>
    </form>
  );
};

export default FilterPanel;

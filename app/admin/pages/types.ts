// タグ管理などで共通的に使う型定義

export interface Tag {
  id: number;
  name: string;
  color?: string; // 色を持たせたい場合
  created_at?: string;
  updated_at?: string;
}

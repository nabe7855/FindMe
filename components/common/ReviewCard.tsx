/**
 * @file 個別の口コミを表示するためのカード型コンポーネント。
 */
import React from 'react';
import { Review } from '@/types';
import Card from '../ui/Card';
import Rating from './Rating';

/**
 * ReviewCardコンポーネントのPropsの型定義。
 */
interface ReviewCardProps {
  /** 表示する口コミデータ */
  review: Review;
}

/**
 * 口コミ表示用カードコンポーネント。
 * @param {ReviewCardProps} props - コンポーネントのプロパティ。
 * @returns {JSX.Element} 口コミカードのUI。
 */
const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <Card className="p-6 border border-gray-100">
      <div className="flex items-start space-x-4">
        {/* 投稿者アイコン */}
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-800">{review.author}</p>
            <p className="text-sm text-gray-500">{review.date}</p>
          </div>
          {/* 評価（数値は非表示） */}
          <Rating value={review.rating} showValue={false} className="my-2" />
          <p className="text-base text-gray-700 leading-relaxed">{review.comment}</p>
        </div>
      </div>
    </Card>
  );
};

export default ReviewCard;

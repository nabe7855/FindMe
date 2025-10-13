/**
 * @file トップページの「みんなの最新口コミ」セクションを表示するコンポーネント。
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../ui/Card';
import Rating from '../../common/Rating';
import * as storeService from '../../../services/storeService';

/**
 * 最新の口コミセクションコンポーネント。
 * @returns {JSX.Element | null} データ取得中はnull、取得後は口コミセクションのUIを返す。
 */
const LatestReviewsSection: React.FC = () => {
    const [reviews, setReviews] = useState<storeService.ReviewWithStoreInfo[]>([]);
    const navigate = useNavigate();

    // コンポーネントのマウント時に最新の口コミを3件取得
    useEffect(() => {
        storeService.getLatestReviewsWithStoreInfo(3).then(data => {
            setReviews(data);
        });
    }, []);

    // 口コミデータがまだ読み込まれていない場合は何も表示しない
    if (reviews.length === 0) {
        return null;
    }

    return (
        <section className="bg-gray-100 py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">みんなの最新口コミ</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                         <Card key={review.id} className="p-6 flex flex-col">
                            {/* 評価の星（数値は非表示） */}
                            <Rating value={review.rating} showValue={false} />
                            {/* 口コミ本文（長すぎる場合は省略） */}
                            <p className="text-base text-gray-700 my-4 flex-grow">
                                {review.comment.length > 80 ? `${review.comment.substring(0, 80)}...` : review.comment}
                            </p>
                            <div className="mt-auto pt-4 border-t border-gray-200">
                                <p className="text-sm font-semibold text-gray-800">{review.author}さん</p>
                                {/* 店舗名をクリックすると詳細ページへ遷移 */}
                                <p 
                                    onClick={() => navigate(`/store/${review.storeId}`)} 
                                    className="text-sm text-blue-600 hover:underline cursor-pointer"
                                >
                                    『{review.storeName}』への口コミ
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestReviewsSection;

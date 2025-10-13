/**
 * @file トップページのAIコンシェルジュへの誘導（Call To Action）セクションを表示するコンポーネント。
 */
import React from 'react';
import Button from '../../ui/Button';
import { useAppContext } from '../../../context/AppContext';

/**
 * AIコンシェルジュのアイコンSVGコンポーネント。
 */
const AIConciergeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
    </svg>
);

/**
 * AIコンシェルジュCTAセクションコンポーネント。
 * @returns {JSX.Element} AIコンシェルジュCTAセクションのUI。
 */
const ConciergeCtaSection: React.FC = () => {
    const { setIsConciergeOpen } = useAppContext();

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-20 text-center">
            <h2 className="text-3xl font-bold text-gray-800">うまく探せない時は？</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                気分や要望を伝えるだけで、AIがあなたに最適なお店を提案します。
            </p>
            <div className="mt-8">
                <Button 
                    onClick={() => setIsConciergeOpen(true)} 
                    size="lg" 
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white" 
                    icon={<AIConciergeIcon/>}
                >
                    AIコンシェルジュに相談する
                </Button>
            </div>
        </div>
    );
};

export default ConciergeCtaSection;

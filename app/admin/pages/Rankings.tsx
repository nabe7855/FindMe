
import React, { useState } from 'react';
import { Ranking } from '../types';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

const mockRankings: Record<string, Ranking[]> = {
  'All': [
    { rank: 1, storeName: 'Tech Eatery 1', viewCount: 48500, change: 'up' },
    { rank: 2, storeName: 'Cyberpunk Sushi Bar', viewCount: 45200, change: 'down' },
    { rank: 3, storeName: 'Quantum Cafe', viewCount: 39800, change: 'same' },
    { rank: 4, storeName: 'The Gilded Steakhouse', viewCount: 35100, change: 'up' },
    { rank: 5, storeName: 'Neon Noodle', viewCount: 33000, change: 'down' },
  ],
  'Japanese': [
    { rank: 1, storeName: 'Cyberpunk Sushi Bar', viewCount: 45200, change: 'same' },
    { rank: 2, storeName: 'Neon Noodle', viewCount: 33000, change: 'up' },
  ],
  'Italian': [
    { rank: 1, storeName: 'The Gilded Steakhouse', viewCount: 35100, change: 'up' },
    { rank: 2, storeName: 'Pasta Futura', viewCount: 28000, change: 'down' },
  ],
  'Cafe': [
    { rank: 1, storeName: 'Quantum Cafe', viewCount: 39800, change: 'same' },
    { rank: 2, storeName: 'The Alchemist\'s Brew', viewCount: 25000, change: 'same' },
  ]
};

const genres = ['All', 'Japanese', 'Italian', 'Cafe'];

const ChangeIcon = ({ change }: { change: 'up' | 'down' | 'same' }) => {
  if (change === 'up') return <ArrowUp className="w-5 h-5 text-emerald-accent" />;
  if (change === 'down') return <ArrowDown className="w-5 h-5 text-red-500" />;
  return <Minus className="w-5 h-5 text-gray-500" />;
};

const Rankings = () => {
  const [activeGenre, setActiveGenre] = useState('All');
  const rankings = mockRankings[activeGenre] || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">View Count Rankings</h2>
        <div className="text-sm text-gray-400">Updated: Today at 08:00 AM</div>
      </div>

      <div className="flex border-b border-gray-700">
        {genres.map(genre => (
          <button 
            key={genre}
            onClick={() => setActiveGenre(genre)}
            className={`px-4 py-2 -mb-px font-semibold border-b-2 transition-colors duration-200
              ${activeGenre === genre 
                ? 'text-blue-accent border-blue-accent' 
                : 'text-gray-400 border-transparent hover:text-white'
              }`}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-4 font-semibold w-16">Rank</th>
              <th className="p-4 font-semibold">Store Name</th>
              <th className="p-4 font-semibold">View Count</th>
              <th className="p-4 font-semibold">Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {rankings.map(item => (
              <tr key={item.rank} className="hover:bg-gray-700/50 transition-colors">
                <td className="p-4 font-bold text-lg text-center">{item.rank}</td>
                <td className="p-4">{item.storeName}</td>
                <td className="p-4">{item.viewCount.toLocaleString()}</td>
                <td className="p-4"><ChangeIcon change={item.change} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rankings;

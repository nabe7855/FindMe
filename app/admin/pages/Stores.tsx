
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Store } from '../types';

// Mock Data
const mockStores: Store[] = Array.from({ length: 25 }, (_, i) => ({
  id: `store-${i + 1}`,
  name: `Tech Eatery ${i + 1}`,
  description: `A futuristic dining experience for tech lovers.`,
  category: i % 3 === 0 ? 'Japanese' : i % 3 === 1 ? 'Italian' : 'Cafe',
  address: `${100 + i} Future Ave, Neon City`,
  hasParking: i % 2 === 0,
  tags: ['WiFi', i % 2 === 0 ? 'Family Friendly' : 'Late Night'],
  viewCount: Math.floor(Math.random() * 50000),
}));


const Stores = () => {
  const [stores, setStores] = useState<Store[]>(mockStores);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  const filteredStores = useMemo(() => {
    return stores.filter(store => 
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === 'All' || store.category === categoryFilter)
    );
  }, [stores, searchTerm, categoryFilter]);
  
  const handleDelete = (id: string) => {
    if(window.confirm('Are you sure you want to delete this store?')) {
        setStores(prev => prev.filter(store => store.id !== id));
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Store Management</h2>
        <Link to="/stores/new" className="inline-flex items-center px-4 py-2 bg-blue-accent text-gray-900 font-bold rounded-md hover:bg-opacity-80 transition-colors">
          <PlusCircle className="w-5 h-5 mr-2" />
          Add New Store
        </Link>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex items-center gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by store name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-accent focus:border-blue-accent outline-none"
          />
        </div>
        <div>
          <select 
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-accent focus:border-blue-accent outline-none"
          >
            <option>All</option>
            <option>Japanese</option>
            <option>Italian</option>
            <option>Cafe</option>
          </select>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">Address</th>
              <th className="p-4 font-semibold">Parking</th>
              <th className="p-4 font-semibold">Views</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredStores.map(store => (
              <tr key={store.id} className="hover:bg-gray-700/50 transition-colors">
                <td className="p-4">{store.name}</td>
                <td className="p-4">{store.category}</td>
                <td className="p-4">{store.address}</td>
                <td className="p-4">{store.hasParking ? 'Yes' : 'No'}</td>
                <td className="p-4">{store.viewCount.toLocaleString()}</td>
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <Link to={`/stores/edit/${store.id}`}>
                      <Edit className="w-5 h-5 text-gray-400 hover:text-blue-accent cursor-pointer" />
                    </Link>
                    <Trash2 onClick={() => handleDelete(store.id)} className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Add pagination component here if needed */}
    </div>
  );
};

export default Stores;

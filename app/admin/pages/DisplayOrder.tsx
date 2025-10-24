
import React, { useState } from 'react';
import { GripVertical } from 'lucide-react';
import { Store } from '../types';

const mockStores: Pick<Store, 'id' | 'name' | 'category'>[] = [
  { id: 'store-1', name: 'Cyberpunk Sushi Bar', category: 'Japanese' },
  { id: 'store-2', name: 'The Gilded Steakhouse', category: 'Italian' },
  { id: 'store-3', name: 'Neon Noodle', category: 'Japanese' },
  { id: 'store-4', name: 'Quantum Cafe', category: 'Cafe' },
  { id: 'store-5', name: 'The Alchemist\'s Brew', category: 'Cafe' },
];

const DisplayOrder = () => {
  const [stores, setStores] = useState(mockStores);
  const [draggedItem, setDraggedItem] = useState<any>(null);

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    setDraggedItem(stores[index]);
    e.dataTransfer.effectAllowed = 'move';
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault();
    const draggedOverItem = stores[index];
    if (draggedItem === draggedOverItem) {
      return;
    }
    let items = stores.filter(item => item.id !== draggedItem.id);
    items.splice(index, 0, draggedItem);
    setStores(items);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };
  
  const handleSave = () => {
    alert('Display order saved!');
    console.log('New order:', stores.map(s => s.id));
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Display Order Management</h2>
        <button onClick={handleSave} className="px-4 py-2 bg-blue-accent text-gray-900 font-bold rounded-md hover:bg-opacity-80 transition-colors">
          Save Order
        </button>
      </div>
      <p className="text-gray-400">Manage the display order for "Top Page Recommendations". Drag and drop to reorder.</p>

      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <ul className="space-y-2">
          {stores.map((store, index) => (
            <li
              key={store.id}
              draggable
              onDragStart={e => handleDragStart(e, index)}
              onDragOver={e => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className="flex items-center p-4 bg-gray-700 rounded-md cursor-grab active:cursor-grabbing transition-shadow"
            >
              <GripVertical className="w-5 h-5 text-gray-500 mr-4" />
              <div className="flex-grow">
                <p className="font-semibold text-white">{store.name}</p>
                <p className="text-sm text-gray-400">{store.category}</p>
              </div>
              <span className="text-lg font-bold text-gray-600">{index + 1}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DisplayOrder;

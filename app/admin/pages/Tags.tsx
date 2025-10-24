
import React, { useState } from 'react';
import { Tag as TagType } from '../types';
import { PlusCircle, Edit, Trash2, Search } from 'lucide-react';

// Mock Data
const mockTags: TagType[] = [
  { id: 'tag-1', name: 'WiFi', usageCount: 45 },
  { id: 'tag-2', name: 'Family Friendly', usageCount: 32 },
  { id: 'tag-3', name: 'Late Night', usageCount: 18 },
  { id: 'tag-4', name: 'Date Night', usageCount: 25 },
  { id: 'tag-5', name: 'Outdoor Seating', usageCount: 22 },
];

const Tags = () => {
  const [tags, setTags] = useState<TagType[]>(mockTags);
  const [newTagName, setNewTagName] = useState('');
  const [editingTag, setEditingTag] = useState<TagType | null>(null);

  const handleAddTag = () => {
    if (newTagName.trim() !== '') {
      const newTag: TagType = {
        id: `tag-${Date.now()}`,
        name: newTagName,
        usageCount: 0,
      };
      setTags([newTag, ...tags]);
      setNewTagName('');
    }
  };
  
  const handleUpdateTag = () => {
    if(editingTag && editingTag.name.trim() !== '') {
        setTags(tags.map(t => t.id === editingTag.id ? editingTag : t));
        setEditingTag(null);
    }
  }

  const handleDeleteTag = (id: string) => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      setTags(tags.filter(tag => tag.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white">Tag Management</h2>
      
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex gap-2">
        <input 
          type="text" 
          placeholder="New tag name..." 
          value={newTagName}
          onChange={e => setNewTagName(e.target.value)}
          className="flex-grow bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-accent focus:border-blue-accent outline-none"
        />
        <button onClick={handleAddTag} className="inline-flex items-center px-4 py-2 bg-blue-accent text-gray-900 font-bold rounded-md hover:bg-opacity-80 transition-colors">
          <PlusCircle className="w-5 h-5 mr-2" /> Create Tag
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-4 font-semibold">Tag Name</th>
              <th className="p-4 font-semibold">Usage Count</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {tags.map(tag => (
              <tr key={tag.id} className="hover:bg-gray-700/50 transition-colors">
                <td className="p-4">
                    {editingTag?.id === tag.id ? (
                        <input type="text" value={editingTag.name} onChange={e => setEditingTag({...editingTag, name: e.target.value})}
                         className="bg-gray-600 border border-gray-500 rounded-md py-1 px-2 outline-none"/>
                    ) : tag.name }
                </td>
                <td className="p-4">{tag.usageCount}</td>
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    {editingTag?.id === tag.id ? (
                        <button onClick={handleUpdateTag} className="text-sm text-emerald-accent hover:underline">Save</button>
                    ) : (
                        <Edit onClick={() => setEditingTag(tag)} className="w-5 h-5 text-gray-400 hover:text-blue-accent cursor-pointer" />
                    )}
                    <Trash2 onClick={() => handleDeleteTag(tag.id)} className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tags;

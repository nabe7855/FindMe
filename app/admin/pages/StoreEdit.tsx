
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const StoreEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;

  const [storeName, setStoreName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [hasParking, setHasParking] = useState(false);
  const [menuItems, setMenuItems] = useState([{ name: '', price: '' }]);

  // In a real app, you would fetch store data if `id` exists
  // useEffect(() => { if(id) { ...fetch data... } }, [id]);

  const handleAddMenuItem = () => {
    setMenuItems([...menuItems, { name: '', price: '' }]);
  };

  const handleRemoveMenuItem = (index: number) => {
    setMenuItems(menuItems.filter((_, i) => i !== index));
  };

  const handleMenuItemChange = (index: number, field: string, value: string) => {
    const newMenuItems = [...menuItems];
    newMenuItems[index][field] = value;
    setMenuItems(newMenuItems);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to save data to backend
    console.log({ storeName, description, address, hasParking, menuItems });
    alert(isNew ? 'Store created successfully!' : 'Store updated successfully!');
    navigate('/stores');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6">{isNew ? 'Create New Store' : 'Edit Store'}</h2>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg border border-gray-700 space-y-6">
        
        <div>
          <label htmlFor="storeName" className="block text-sm font-medium text-gray-300 mb-1">Store Name</label>
          <input type="text" id="storeName" value={storeName} onChange={e => setStoreName(e.target.value)} required
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-accent focus:border-blue-accent outline-none" />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
          <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={4}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-accent focus:border-blue-accent outline-none" />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">Address</label>
          <input type="text" id="address" value={address} onChange={e => setAddress(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-accent focus:border-blue-accent outline-none" />
        </div>

        <div className="flex items-center">
          <input type="checkbox" id="hasParking" checked={hasParking} onChange={e => setHasParking(e.target.checked)}
            className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-accent focus:ring-blue-accent" />
          <label htmlFor="hasParking" className="ml-2 block text-sm text-gray-300">Has Parking</label>
        </div>
        
        {/* Dynamic Menu Items */}
        <div>
          <h3 className="text-lg font-medium text-white mb-2">Menu / Offers</h3>
          {menuItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2 mb-2 p-3 bg-gray-700/50 rounded-md">
              <input type="text" placeholder="Item Name" value={item.name} onChange={e => handleMenuItemChange(index, 'name', e.target.value)}
                className="flex-grow bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-accent focus:border-blue-accent outline-none" />
              <input type="text" placeholder="Price / Info" value={item.price} onChange={e => handleMenuItemChange(index, 'price', e.target.value)}
                className="w-1/3 bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-accent focus:border-blue-accent outline-none" />
              <button type="button" onClick={() => handleRemoveMenuItem(index)}
                className="p-2 text-red-500 hover:bg-red-500/10 rounded-full">&times;</button>
            </div>
          ))}
          <button type="button" onClick={handleAddMenuItem}
            className="mt-2 text-sm text-blue-accent hover:underline">+ Add Menu Item</button>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Link to="/stores" className="px-4 py-2 bg-gray-600 text-white font-bold rounded-md hover:bg-gray-500 transition-colors">Cancel</Link>
          <button type="submit" className="px-4 py-2 bg-blue-accent text-gray-900 font-bold rounded-md hover:bg-opacity-80 transition-colors">
            {isNew ? 'Create Store' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoreEdit;

import React, { useState } from 'react';
import { PlusCircle, AlertCircle } from 'lucide-react';
import { Blockchain } from '../types';
import { supabase } from '../lib/supabase';

export function AddressInput() {
  const [address, setAddress] = useState('');
  const [blockchain, setBlockchain] = useState<Blockchain>('ETH');
  const [label, setLabel] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { error: dbError } = await supabase
        .from('addresses')
        .insert([{ address, blockchain, label }]);

      if (dbError) throw dbError;

      setAddress('');
      setLabel('');
    } catch (err) {
      setError('Failed to add address. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Address</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Blockchain
          </label>
          <select
            value={blockchain}
            onChange={(e) => setBlockchain(e.target.value as Blockchain)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="ETH">Ethereum</option>
            <option value="BTC">Bitcoin</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter wallet address"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Label
          </label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="E.g., Binance Hot Wallet"
            required
          />
        </div>

        {error && (
          <div className="text-red-600 flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusCircle size={20} />
          Add Address
        </button>
      </form>
    </div>
  );
}
import React from 'react';
import { AddressInput } from './components/AddressInput';
import { FlowMetrics } from './components/FlowMetrics';
import { AlertConfig } from './components/AlertConfig';
import { Activity } from 'lucide-react';

// Mock data for demonstration
const mockMetrics = {
  inflow_24h: 125000000,
  outflow_24h: 98000000,
  inflow_7d: 875000000,
  outflow_7d: 912000000,
  inflow_30d: 3250000000,
  outflow_30d: 3180000000,
};

const mockHistoricalData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
  inflow: Math.random() * 150000000 + 50000000,
  outflow: Math.random() * 150000000 + 50000000,
}));

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Activity size={24} className="text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Crypto Flow Analyzer</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <FlowMetrics
              metrics={mockMetrics}
              historicalData={mockHistoricalData}
            />
          </div>
          
          <div className="space-y-8">
            <AddressInput />
            <AlertConfig />
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Transparency Notice</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600">
              This platform provides on-chain analysis of cryptocurrency flows related to Binance addresses. 
              While we strive for accuracy, please note:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-600">
              <li>Address associations are based on historical transaction patterns and may not be 100% accurate</li>
              <li>Data is sourced from public blockchain explorers and may have slight delays</li>
              <li>Flow metrics are calculated using confirmed transactions only</li>
              <li>Large transactions may be internal transfers between known Binance wallets</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import { Bell, Settings } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Alert } from '../types';

export function AlertConfig() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const handleThresholdChange = async (id: string, threshold: number) => {
    try {
      const { error } = await supabase
        .from('alerts')
        .update({ threshold })
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Failed to update alert threshold:', err);
    }
  };

  const handleToggleAlert = async (id: string, enabled: boolean) => {
    try {
      const { error } = await supabase
        .from('alerts')
        .update({ enabled })
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Failed to toggle alert:', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Bell size={24} />
          Alert Configuration
        </h2>
        <button className="text-gray-600 hover:text-gray-900">
          <Settings size={20} />
        </button>
      </div>

      <div className="space-y-6">
        {alerts.map((alert) => (
          <div key={alert.id} className="border-b pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">
                {alert.type.split('_').map(word => 
                  word.charAt(0) + word.slice(1).toLowerCase()
                ).join(' ')}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={alert.enabled}
                  onChange={(e) => handleToggleAlert(alert.id, e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={alert.threshold}
                onChange={(e) => handleThresholdChange(alert.id, Number(e.target.value))}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
              />
              <span className="text-sm text-gray-500">USD</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
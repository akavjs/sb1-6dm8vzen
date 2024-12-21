import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import type { FlowMetrics as FlowMetricsType } from '../types';

interface Props {
  metrics: FlowMetricsType;
  historicalData: Array<{
    date: string;
    inflow: number;
    outflow: number;
  }>;
}

export function FlowMetrics({ metrics, historicalData }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Exchange Flow Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* 24h Metrics */}
        <div className="p-4 rounded-lg bg-gray-50">
          <h3 className="text-sm font-medium text-gray-500">24h Flow</h3>
          <div className="mt-2 flex justify-between items-center">
            <div className="flex items-center text-green-600">
              <ArrowUpCircle size={20} className="mr-1" />
              <span className="text-lg font-semibold">${metrics.inflow_24h.toLocaleString()}</span>
            </div>
            <div className="flex items-center text-red-600">
              <ArrowDownCircle size={20} className="mr-1" />
              <span className="text-lg font-semibold">${metrics.outflow_24h.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* 7d Metrics */}
        <div className="p-4 rounded-lg bg-gray-50">
          <h3 className="text-sm font-medium text-gray-500">7d Flow</h3>
          <div className="mt-2 flex justify-between items-center">
            <div className="flex items-center text-green-600">
              <ArrowUpCircle size={20} className="mr-1" />
              <span className="text-lg font-semibold">${metrics.inflow_7d.toLocaleString()}</span>
            </div>
            <div className="flex items-center text-red-600">
              <ArrowDownCircle size={20} className="mr-1" />
              <span className="text-lg font-semibold">${metrics.outflow_7d.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* 30d Metrics */}
        <div className="p-4 rounded-lg bg-gray-50">
          <h3 className="text-sm font-medium text-gray-500">30d Flow</h3>
          <div className="mt-2 flex justify-between items-center">
            <div className="flex items-center text-green-600">
              <ArrowUpCircle size={20} className="mr-1" />
              <span className="text-lg font-semibold">${metrics.inflow_30d.toLocaleString()}</span>
            </div>
            <div className="flex items-center text-red-600">
              <ArrowDownCircle size={20} className="mr-1" />
              <span className="text-lg font-semibold">${metrics.outflow_30d.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="inflow"
              stackId="1"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.2}
              name="Inflow"
            />
            <Area
              type="monotone"
              dataKey="outflow"
              stackId="2"
              stroke="#EF4444"
              fill="#EF4444"
              fillOpacity={0.2}
              name="Outflow"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
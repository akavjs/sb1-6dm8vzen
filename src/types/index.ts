export type Blockchain = 'ETH' | 'BTC';

export interface Address {
  id: string;
  address: string;
  blockchain: Blockchain;
  label: string;
  created_at: string;
  user_id: string;
}

export interface Transaction {
  id: string;
  hash: string;
  from_address: string;
  to_address: string;
  amount: string;
  blockchain: Blockchain;
  timestamp: string;
  block_number: number;
}

export interface Alert {
  id: string;
  type: 'LARGE_TRANSACTION' | 'UNUSUAL_PATTERN' | 'TIME_BASED';
  threshold: number;
  enabled: boolean;
  user_id: string;
}

export interface FlowMetrics {
  inflow_24h: number;
  outflow_24h: number;
  inflow_7d: number;
  outflow_7d: number;
  inflow_30d: number;
  outflow_30d: number;
}
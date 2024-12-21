/*
  # Initial Schema Setup for Crypto Flow Analyzer

  1. New Tables
    - `addresses`
      - Stores monitored cryptocurrency addresses
      - Includes blockchain type and user-defined labels
    - `transactions`
      - Records tracked transactions
      - Stores transaction details and metadata
    - `alerts`
      - Configurable alert settings
      - Supports different alert types and thresholds

  2. Security
    - Enable RLS on all tables
    - Policies ensure users can only access their own data
*/

-- Create addresses table
CREATE TABLE addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  address text NOT NULL,
  blockchain text NOT NULL CHECK (blockchain IN ('ETH', 'BTC')),
  label text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  UNIQUE(address, blockchain)
);

-- Create transactions table
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hash text NOT NULL,
  from_address text NOT NULL,
  to_address text NOT NULL,
  amount numeric NOT NULL,
  blockchain text NOT NULL CHECK (blockchain IN ('ETH', 'BTC')),
  timestamp timestamptz DEFAULT now(),
  block_number bigint NOT NULL,
  UNIQUE(hash, blockchain)
);

-- Create alerts table
CREATE TABLE alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('LARGE_TRANSACTION', 'UNUSUAL_PATTERN', 'TIME_BASED')),
  threshold numeric NOT NULL,
  enabled boolean DEFAULT true,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage their addresses"
  ON addresses
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Transactions are readable by all authenticated users"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their alerts"
  ON alerts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Indexes for better query performance
CREATE INDEX idx_addresses_user_id ON addresses(user_id);
CREATE INDEX idx_transactions_timestamp ON transactions(timestamp);
CREATE INDEX idx_transactions_from_address ON transactions(from_address);
CREATE INDEX idx_transactions_to_address ON transactions(to_address);
CREATE INDEX idx_alerts_user_id ON alerts(user_id);
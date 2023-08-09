CREATE TABLE transition (
  transaction_hash TEXT PRIMARY KEY,
  chain TEXT NOT NULL,
  from_address TEXT NOT NULL,
  input_data TEXT NOT NULL,
  block_number BIGINT NOT NULL,
  timestamp BIGINT NOT NULL
);

CREATE INDEX idx_from_address ON transition (from_address);
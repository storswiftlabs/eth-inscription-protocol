CREATE TABLE swift (
  trx_hash TEXT PRIMARY KEY,
  chain TEXT NOT NULL,
  sender TEXT NOT NULL,
  _to TEXT NOT NULL,
  height BIGINT NOT NULL,
  timestamp timestamp NOT NULL,
  data TEXT NOT NULL
);

CREATE INDEX idx_height ON swift (height);
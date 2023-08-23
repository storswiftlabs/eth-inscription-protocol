ENDPOINT_URL ?= https://mainnet.era.zksync.io
START_BLOCK ?= 0
HOST ?= 127.0.0.1
PORT ?= 8081

.PHONY: build
build:
	cargo build --release

.PHONY: all
all:
	cargo run -- all \
		--endpoint-url $(ENDPOINT_URL) \
		--start-block $(START_BLOCK) \
		--host $(HOST) \
		--port $(PORT)

.PHONY: sync
sync:
	cargo run -- sync \
		--endpoint-url $(ENDPOINT_URL) \
		--start-block $(START_BLOCK)

.PHONY: serve
serve:
	cargo run -- serve \
		--host $(HOST) \
		--port $(PORT)


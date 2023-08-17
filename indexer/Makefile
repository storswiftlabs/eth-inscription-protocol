ENDPOINT_URL ?= https://goerli.eth.streamingfast.io:443
START_BLOCK ?= 9000000
END_BLOCK ?= 0
MODULE_NAME ?= map_eth_swifts
PACKAGE_FILE ?= ./substreams-swift-v0.1.0.spkg
HOST ?= 0.0.0.0
PORT ?= 8010

.PHONY: build
build:
	cargo build --release

.PHONY: all
all:
	cargo run --release -- all \
		--endpoint-url $(ENDPOINT_URL) \
		--package-file $(PACKAGE_FILE) \
		--module-name $(MODULE_NAME) \
		--start-block $(START_BLOCK) \
		--host $(HOST) \
		--port $(PORT)

.PHONY: sync
sync:
	cargo run --release -- sync \
		--endpoint-url $(ENDPOINT_URL) \
		--package-file $(PACKAGE_FILE) \
		--module-name $(MODULE_NAME) \
		--start-block $(START_BLOCK)

.PHONY: serve
serve:
	cargo run --release -- serve \
		--host $(HOST) \
		--port $(PORT)


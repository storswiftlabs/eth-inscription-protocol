ENDPOINT ?= localhost:18015
START_BLOCK ?= 80
STOP_BLOCK ?= +20

.PHONY: build
build:
	cargo build --target wasm32-unknown-unknown --release

.PHONY: stream
stream: build
	substreams run --plaintext -e $(ENDPOINT) substreams.yaml map_records -s $(START_BLOCK) -t $(STOP_BLOCK)

.PHONY: codegen
codegen:
	substreams protogen ./substreams.yaml --exclude-paths="sf/substreams,google"

.PHONY: pack
pack: build
	substreams pack substreams.yaml

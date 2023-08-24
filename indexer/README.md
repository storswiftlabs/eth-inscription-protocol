## Swift Indexer for zksync

This repository show cases consumption of an Swift Inscription Protocol and saving it to a database using Diesel.

## Getting Started

Clone the repository:

```bash
git clone eth-inscription-protocol sip-zksync -b zksync
cd sip-zksync
```

The first startup requires creating a docker network:

```bash
docker docker network create SIP
```

Run the docker container:

```bash
docker-compose -f ./docker-compose-postgres.yml up -d
START_BLOCK=<u64> ENDPOINT_URL=<str> docker-compose up -d
```

## NexusDAO Indexer (proof of concept)

This repository show cases consumption of an NexsuDAO Substreams and saving it to a database using Diesel.

## Requirements

- Docker
- Postgres (and developer library `libpq`)

   ```
   brew install postgresql libpq
   ```

- `firehose-starknet`

## Usage

In a first terminal, launch `firehose-starknet` localnet setup:

```
cd firehose-starknet
./devel/localnet/start -c
```

In a second terminal, launch `up.sh` script which launches a Docker Compose setup running Postgres:

```
./up.sh
```

In a third terminal, first export `DATABASE_URL` environment that is used to configure the database connection:

```
export DATABASE_URL=postgres://admin:secure@localhost:5432/indexer-dev?sslmode=disable
```

And then run the script:

```
make all
```

This will read start a Substreams using `./substreams-startnet-v0.1.0.spkg`, receives all the `map_transactions` module output (of type `map`), decode the received entities and save them in the database.

If show case how you can consume a Substreams module of type `map` to insert data in a database.

> The data is upsert in the database so you can run the script multiple time without causing any issue.

### Incomplete Implementation

For now `cursor` handling is not properly loaded/saved to database, something that would be required on a production system to ensure the stream is resumed at the right location and that a block is never miss.

The `SubstreamStream` while use in other project probably requires some extra hardening to be sure it's 100% correct in all cases that can happen on a Substreams.

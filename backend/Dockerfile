FROM golang:1.18 AS builder

ARG SERVER_NAME

COPY . /src
WORKDIR /src

RUN GOPROXY=https://goproxy.cn make build

FROM debian:stable-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
		ca-certificates  \
        netbase \
        && rm -rf /var/lib/apt/lists/ \
        && apt-get autoremove -y && apt-get autoclean -y

COPY --from=builder /src/bin/${SERVER_NAME} .
COPY --from=builder /src/configs ./configs

EXPOSE 8000
EXPOSE 9000

CMD ["./backend", "-conf", "/app/configs"]

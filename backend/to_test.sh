#!/bin/bash
 sudo chown -R fanzj .data/
make image
docker save -o backend.tar.gz inscription:v0.1
scp backend.tar.gz fzj@10.10.1.26:/home/fzj/
rm -rf backend.tar.gz 


 docker rmi inscription:v0.1
docker load -i backend.tar.gz
cd docker/inscription/eth-inscription-protocol/backend/
docker-compose stop inscription
docker-compose rm inscription
docker-compose up -d
docker logs -f backend-inscription-1


SUBSTREAMS_API_TOKEN=eyJhbGciOiJLTVNFUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIwMDc1NDA4NjUsImp0aSI6Ijg4ZjUwNTdkLTM3ZDMtNDc5ZS1iNDYzLTViZmE4ZTA4MjRiNyIsImlhdCI6MTY5MjE4MDg2NSwiaXNzIjoiZGZ1c2UuaW8iLCJzdWIiOiIweG9zeTljNzMxNmEzY2JhZDUzNzgiLCJ2IjoxLCJha2kiOiJhODI3NjNhODY0YmRjMDVjYjkzNTcwMjFmOTY5YjhjNzU3MjYyYzEwMGQ1ZGFmYWRlZDdmYzMwNzY3OWMwYWNjIiwidWlkIjoiMHhvc3k5YzczMTZhM2NiYWQ1Mzc4In0.9lOiOzoovUNLJgrH5GfBAkA9K86ebLjsgyFjKoDOfzPe8WxGknsQL3zYn-dDl7mKJNTHntwlxj5vjO9qeGg0_Q

/home/demo/go/bin/substreams run \
-e goerli.eth.streamingfast.io:443 \
/mnt/nfs/code/eth-inscription-protocol/substreams-swift/substreams-swift-v0.1.0.spkg \
map_eth_swifts \
--start-block $1 \
--stop-block +1

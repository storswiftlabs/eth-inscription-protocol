package types

import (
	"encoding/base64"
	"fmt"

	pbstarknet "github.com/starknet-graph/firehose-starknet/types/pb/zklend/starknet/type/v1"
	"github.com/streamingfast/bstream"
	pbbstream "github.com/streamingfast/pbgo/sf/bstream/v1"
	"google.golang.org/protobuf/proto"
)

func BlockFromProto(b *pbstarknet.BlockData) (*bstream.Block, error) {
	content, err := proto.Marshal(b)
	if err != nil {
		return nil, fmt.Errorf("unable to marshal to binary form: %s", err)
	}

	blockNumber := b.Number()

	block := &bstream.Block{
		Id:             b.ID(),
		Number:         blockNumber,
		PreviousId:     b.PreviousID(),
		Timestamp:      b.Time(),
		PayloadKind:    pbbstream.Protocol_UNKNOWN,
		PayloadVersion: 1,
	}

	return bstream.GetBlockPayloadSetter(block, content)
}

func BlockFromProtoBase64(protoBase64 string) (*bstream.Block, error) {
	content, err := base64.StdEncoding.DecodeString(protoBase64)
	if err != nil {
		return nil, fmt.Errorf("unable to decode to binary form: %s", err)
	}

	pbBlock := new(pbstarknet.BlockData)
	err = proto.Unmarshal(content, pbBlock)
	if err != nil {
		return nil, fmt.Errorf("unable to decode payload: %w", err)
	}

	block := &bstream.Block{
		Id:             pbBlock.ID(),
		Number:         pbBlock.Number(),
		PreviousId:     pbBlock.PreviousID(),
		Timestamp:      pbBlock.Time(),
		PayloadKind:    pbbstream.Protocol_UNKNOWN,
		PayloadVersion: 1,
	}

	return bstream.GetBlockPayloadSetter(block, content)
}
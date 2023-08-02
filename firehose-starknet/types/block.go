package types

import (
	"fmt"
	"time"

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

	blockNumber := b.BlockNumber

	block := &bstream.Block{
		Id:             b.BlockHash,
		Number:         blockNumber,
		PreviousId:     b.ParentBlockHash,
		Timestamp:      time.Unix(int64(b.Timestamp), 0),
		PayloadKind:    pbbstream.Protocol_UNKNOWN,
		PayloadVersion: 1,
	}

	// For simpliciy's sake we're pretending StarkNet cannot re-org for more than 100 blocks
	if blockNumber <= 100 {
		block.LibNum = 0
	} else {

		block.LibNum = blockNumber - 100
	}

	return bstream.GetBlockPayloadSetter(block, content)
}

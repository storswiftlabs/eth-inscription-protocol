package pbstarknet

import (
	"time"
)

func (b *BlockData) ID() string {
	return b.BlockHash
}

func (b *BlockData) Number() uint64 {
	return b.BlockNumber
}

func (b *BlockData) PreviousID() string {
	return b.ParentBlockHash
}

func (b *BlockData) Time() time.Time {
	return time.Unix(0, int64(b.Timestamp)).UTC()
}
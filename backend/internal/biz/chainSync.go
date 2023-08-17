package biz

import (
	"backend/module"
	"context"
	"encoding/json"
	"github.com/go-kratos/kratos/v2/log"
	"io"
	"net/http"
	"os"
	"strconv"
)

func NewChain(chainName string, height int64) ChainSync {
	return &Chain{
		Name:   chainName,
		Height: height,
	}
}

type ChainSync interface {
	GetName() string
	GetSwiftsByHeight(ctx context.Context, height int64) ([]module.Swift, error)
}

type Chain struct {
	Name   string `xorm:"pk"`
	Height int64  `xorm:"notnull"`
}

func (c *Chain) GetName() string {
	return c.Name
}

func (c *Chain) GetSwiftsByHeight(ctx context.Context, height int64) ([]module.Swift, error) {
	swiftUri, ok := os.LookupEnv("GET_SWIFT_URL")
	if !ok {
		swiftUri = "http://103.1.65.125:8010/"
	}
	url := swiftUri + c.Name + "/swifts?start_height=" + strconv.FormatInt(height, 10)
	response, err := http.Get(url)
	if err != nil {
		log.Infof("Get failed, err:%v\n", err)
	}
	defer response.Body.Close()
	buf, err := io.ReadAll(response.Body)
	if err != nil {
		log.Infof("Read from body error:%v\n", err)
	}
	if len(buf) == 0 {
		return nil, nil
	}

	swifts := make([]module.Swift, 0)
	err = json.Unmarshal(buf, &swifts)
	if err != nil {
		log.Infof("Unmarshal json error:%v\n", err)
	}
	return swifts, nil
}
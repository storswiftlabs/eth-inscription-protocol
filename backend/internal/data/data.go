package data

import (
	"backend/internal/conf"
	"backend/module"
	"github.com/go-kratos/kratos/v2/log"
	"github.com/google/wire"
	_ "github.com/lib/pq"
	"xorm.io/xorm"
)

// ProviderSet is data providers.
var ProviderSet = wire.NewSet(NewData, NewInscriptionRepo, NewPostgres)

// Data .
type Data struct {
	postgre *xorm.Engine
	log     *log.Helper
}

// NewData .
func NewData(c *conf.Data, logger log.Logger, db *xorm.Engine) (*Data, func(), error) {
	helper := log.NewHelper(log.With(logger, "module", "inscription/data"))

	data := &Data{
		postgre: db,
		log:     helper,
	}
	data.InitDB()
	cleanup := func() {
		if err := data.postgre.Close(); err != nil {
			log.Error(err)
		}
		log.NewHelper(logger).Info("closing the data resources")
	}
	return data, cleanup, nil
}

func NewPostgres(c *conf.Data) *xorm.Engine {
	engine, err := xorm.NewEngine(c.Database.Driver, c.Database.Source)

	if err != nil {
		log.Fatal(err)
	}

	err = engine.Ping()
	if err != nil {
		log.Fatal(err)
	}

	return engine
}

func (d *Data) InitDB() {
	profile := new(module.Profile)
	group := new(module.Group)
	message := new(module.Message)
	groupMessage := new(module.GroupMessage)
	tweet := new(module.Tweet)
	comment := new(module.Comment)
	like := new(module.Like)
	follow := new(module.Follow)
	record := new(module.Record)

	err := d.postgre.CreateTables(profile, group, message, groupMessage, tweet, comment, like, follow, record)
	if err != nil {
		log.Error(err)
	}

	_ = d.postgre.CreateIndexes(message)
	_ = d.postgre.CreateIndexes(groupMessage)
	_ = d.postgre.CreateIndexes(tweet)
	_ = d.postgre.CreateIndexes(comment)
	_ = d.postgre.CreateIndexes(like)
}

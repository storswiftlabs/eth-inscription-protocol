package module

type Swift struct {
	Types    string   `xorm:"pk"`
	Title    string
	Text     string
	Image    []string
	Receiver []string
	At       []string
	With     []string
}

import { Card, Dropdown, Row, Spacer } from '@nextui-org/react'
import React from 'react'
import { HotIcon } from '../Icons'

function RightSidebar() {
  const cardData = () => {
    return (
      <Card.Body>
        <Row className="right-sidebar-row flex pt-0 mb-0 truncate" align="center">
          <img
            style={{ width: '28px', height: '28px', borderRadius: '0.2rem' }}
            src="https://api.dicebear.com/5.x/lorelei/svg?seed=SPGQaaaZ8YMlightMint100&backgroundColor=1AE0A5&mouth=happy01,happy02,happy03,happy04,happy05,happy12,happy17,sad02"
            alt=""
          />
          <Spacer x={0.4} />
          <span>0x23af....sdsdsdas</span>
          <Spacer x={0.4} />
          <span>@Tubose june 7</span>
        </Row>
        <div className="flex items-center ">
          <HotIcon />
          <span className="w-full truncate">
            12333333333333333333333333333333222222222222211111111111
          </span>
        </div>
      </Card.Body>
    )
  }

  return (
    <div className="right-sidebar-nav h-screen  pl-4  pr-2 pt-14 mr-[10%]">
      <div className="mb-8  w-full pr-8">
        <Dropdown>
          <Dropdown.Button className="nav-button border-[1px] bg-tahiti-button-bg-w dark:bg-tahiti-button-bg-d border-tahiti-button-border-w dark:border-tahiti-button-border-d">
            FIlter
          </Dropdown.Button>
          <Dropdown.Menu variant="solid" aria-label="Actions">
            <Dropdown.Item key="new">New file</Dropdown.Item>
            <Dropdown.Item key="copy">Copy link</Dropdown.Item>
            <Dropdown.Item key="edit">Edit file</Dropdown.Item>
            <Dropdown.Item key="delete" color="error" withDivider>
              Delete file
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <h2 className="text-2xl mb-4">Whats happening</h2>
      <Card className="sidebar-card bg-[#f7f9f9] dark:bg-[#121212] dark:border-[#696969] dark:border-[1px] text-[#000] dark:text-[#fff]" variant="bordered" css={{ padding: '1rem 1rem 1rem 0.2rem', borderRadius: '1.5rem' }} >
        {[1, 2, 3, 4, 5, 6].map((t, j) => cardData())}
      </Card>
    </div>
  )
}

export default RightSidebar

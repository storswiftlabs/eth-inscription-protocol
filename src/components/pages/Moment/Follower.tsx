import { Dropdown } from '@nextui-org/react'
import React from 'react'

function Follower() {
  return (
    <div className=" mb-8  w-full ">
      <Dropdown>
        <Dropdown.Button className="nav-button border-2 border-[#0e76fd] gb-[#0e76fd] dark:bg-[#404040] dark:border-[#696969]" style={{ width: '100%' }}>
          Follower
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
  )
}

export default Follower

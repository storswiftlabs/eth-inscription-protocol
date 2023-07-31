'use client'
import { FillColor } from '@/type/Moment'
import { Card, Grid, Input, Row, Spacer, Text } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import React, { useState } from 'react'
import { BackIcon, GreaterIcon, NewListIcon } from '../Icons'
import Solid from '../Solid'
import List from '../List'
import ListAddIcon from '../ListIcon/ListAddIcon'
import ListFocusIcon from '../ListIcon/ListFocusIcon'

function Bookmark() {

  const [isAdd, setIsAdd] = useState(false)
  const { theme } = useTheme()
  const handleFillColor = (): FillColor => theme === 'dark' ? FillColor.White : FillColor.Black

  const MockItem = ({ imgUrl }: any) => {
    return (
      <Card css={{ h: "$24", background: theme === 'dark' ? '#262626' : "white", padding: "0" }}>
        <div style={{
          height: "100%",
          width: "100%",
          background: `url(https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true) 50% / cover  no-repeat`,
        }}></div>
      </Card>
    );
  };

  return <>
    <div className=' p-[1rem] cursor-pointer'>
      <Row align='center' justify='space-between' >
        <div className='cursor-pointer'>
          <BackIcon fill={handleFillColor()} />
        </div>
        <Input
          className=' px-[2rem]'
          width={'100%'}
          clearable
          animated={false}
          contentRightStyling={false}
          placeholder="Search Lists..."
          contentLeft={
            <>{svg}</>
          }
        />
        <span className='flex gap-[1rem] cursor-pointer'>
          <NewListIcon fill={handleFillColor()} />
          <GreaterIcon fill={handleFillColor()} />
        </span>
      </Row>
      <div className=' p-[2rem]'>
        <p className=' font-bold text-[1.2rem]'>Pinned Lists</p>
        <Spacer y={0.5} />
        <Grid.Container gap={2} justify="flex-start">
          {
            [1, 2, 3, 4, 5, 6].map((item, index) => (
              <Grid className=' flex-col' xs={3}>
                <MockItem imgUrl="" />
                <div className='truncate'>fosk jjj kkedsdd</div>
              </Grid>
            ))
          }
        </Grid.Container>
        {
          [1, 2, 3].length <= 0 && <p>Nothing to see here yet — pin your favorite Lists to access them quickly.</p>
        }
        <Spacer y={1} />
      </div>
    </div>
    <Solid foll={'y'} />
    <div>
      <List children={<ListAddIcon />} head='Discover new Lists' data={[1, 2, 3, 4]} />
    </div>
    <Solid foll={'y'} />
    <div>
      <List children={<ListFocusIcon />} head='Your Lists' data={[1, 2, 3]} />
      <div className='p-[1rem]'>You haven't created or followed any Lists. When you do, they'll show up here.</div>
    </div>
  </>
}

export default Bookmark

const svg = <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden="true" className="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr">
  <g>
    <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z">
    </path>
  </g>
</svg>
import { Grid } from '@nextui-org/react'
import Link from 'next/link'
import { Card1 } from './Cards/Card1'
import { Card2 } from './Cards/Card2'

export function Card() {
  return (
        <Grid.Container gap={2} justify="center">
            <Grid xs={6} >
                <Link href={'/chat/general?type=group'}><Card1 /></Link>
            </Grid>
            <Grid xs={6} >
                <Link href={'/moment/find'}><Card2 /></Link>
            </Grid>
        </Grid.Container>
  )
}

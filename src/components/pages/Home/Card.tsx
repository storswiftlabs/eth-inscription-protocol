import { Grid } from '@nextui-org/react'
import Link from 'next/link'
import { Card2 } from './Cards/Card2'

export function Card() {
  return (
        <Grid.Container gap={2} justify="center">
            <Grid xs={6} >
                <Link href={'/chat/general?type=group'}><Carwd1 /></Link>
            </Grid>
            <Grid xs={6} >
                <Link href={'/moment/find'}><Card2 /></Link>
            </Grid>
        </Grid.Container>
  )
}

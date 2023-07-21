import { Grid } from '@nextui-org/react'
import { Card1 } from './Cards/Card1'
import { Card2 } from './Cards/Card2'

export function Card() {
  return (
        <Grid.Container gap={2} justify="center">
            <Grid xs={6} >
                <Card1 />
            </Grid>
            <Grid xs={6} >
                <Card2 />
            </Grid>
        </Grid.Container>
  )
}

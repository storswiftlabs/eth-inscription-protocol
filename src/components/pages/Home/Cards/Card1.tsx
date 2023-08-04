import { Card, Col, Text } from '@nextui-org/react'

export function Card1() {
  return <Card>
        <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
            <Col>
                <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                    CHAT
                </Text>
                <Text h4 color="white">
                    Chat Message
                </Text>
            </Col>
        </Card.Header>
        <Card.Image
            src="https://nextui.org/images/card-example-4.jpeg"
            objectFit="cover"
            width="100%"
            height={340}
            alt="Card image background"
        />
    </Card>
}

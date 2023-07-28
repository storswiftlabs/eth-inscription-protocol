'use client'
import React, { useState } from 'react'
import { Modal, Button, Text, Row, Card, Spacer } from "@nextui-org/react";
import { useRouter } from 'next/navigation';

interface Props {
  visible: boolean;
  closeHandler: () => void;
}

function VerifyModal({ visible, closeHandler }: Props) {

  const router = useRouter();
  const [isCheck, setIscheck] = useState('A')

  const handOk = () => {
    router.push('/')
  }

  return (
    <Modal blur width={'50%'} closeButton aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
      <Modal.Header>
        <Text b size={30}> Who are you ? </Text>
      </Modal.Header>
      <Modal.Header>
        <Text size={'1rem'}> Choose the right Verified subscription for you:  </Text>
      </Modal.Header>
      <Modal.Body>
        <Row justify='space-around' align='stretch'>
          <Card onClick={() => setIscheck('A')} isPressable isHoverable variant="bordered" css={{ mw: "18rem", flex: 1, border: isCheck === 'A' ? "2px solid #51b2f3" : "" }}>
            <Card.Body>
              <Text color='#788690' >Twitter Blue</Text>
              <Text b>I am an individual</Text>
              <Text color='#788690' >For individuals and creators</Text>
            </Card.Body>
          </Card>
          <Card onClick={() => setIscheck('B')} isPressable isHoverable variant="bordered" css={{ mw: "18rem", border: isCheck === 'B' ? "2px solid #51b2f3" : "" }}>
            <Card.Body>
              <Text color='#788690' >Verified Organizations</Text>
              <Text b>I am an organization</Text>
              <Text color='#788690' >For businesses,governmement agencies,and non-profits</Text>
            </Card.Body>
          </Card>
        </Row>
      </Modal.Body>
      <Modal.Footer justify='center' >
        <Button onClick={handOk}  css={{ width: "80%", height: "3rem", fontWeight: "700", marginBottom: "1rem", background: "#0f1419", borderRadius: "2rem" }} >Default</Button>
        <Row justify='center' css={{ fontSize: "1rem" }} gap={2}>
          <span>Learn more about</span>
          <Text css={{ '&:hover': { textDecoration: 'underline' }, color: "#51b2f3", margin: "0 0.2rem" }}>Twitter Blue</Text>
          <span>and</span>
          <Text css={{ '&:hover': { textDecoration: 'underline' }, color: "#51b2f3", margin: "0 0.2rem" }}>Verified Organizations</Text>
        </Row>
      </Modal.Footer>
    </Modal>
  )
}

export default VerifyModal
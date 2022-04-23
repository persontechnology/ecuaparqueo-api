import React from 'react'
import { Container, Text, Heading, Center} from "native-base";
export default function Bienvenida() {
  return (
    <Center>
      <Container>
        <Heading>
          <Text color="indigo.700">ECUAPARQUEO</Text>
        </Heading>
        <Text fontWeight="medium">
          Sistema de parqueo vehícular
        </Text>
      </Container>
    </Center>
  )
}

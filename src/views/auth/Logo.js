import React from "react";
import { Center, Image, NativeBaseProvider } from "native-base";
import Logotipo from "../../images/logotipo.png"
function Example() {
  return <Center>
        <Image my={"2"} source={ require('../../images/logotipo.png') } alt="Alternate Text" size="xl" />
        </Center>;
}

    export default function Logo() {
        return (
            <Center px="3">
                <Example />
            </Center>
    
        );
    };
    
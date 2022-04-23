import React from "react";
import { Spinner,Heading, HStack, Center, NativeBaseProvider } from "native-base";

export default function CargandoSpiner ()  {
    return (
        <Center flex={1} px="3">
            <HStack space={2} justifyContent="center" alignItems="center">
                <Spinner size="lg" accessibilityLabel="Cargando..." />
                <Heading color="primary.500" fontSize="md">
                    Cargando
                </Heading>
            </HStack>
        </Center>
    );
};
    
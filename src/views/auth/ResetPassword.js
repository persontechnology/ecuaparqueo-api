import * as React from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center,useToast  } from "native-base";
import {API_URL} from "@env";
import { deviceName } from "expo-device";


    export default function ResetPassword ({navigation})  {
        const [email, setemail] = React.useState('');
        const [cargando, setcargando] = React.useState(false);
        const toast = useToast();

        const  acceder= async()=>{
            setcargando(true);
            try {
                const res=await fetch(API_URL+"reset-password",{
                    method:'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({
                        email,
                        deviceName
                    })
                });
                const data=await res.json();
                // console.log(data)
                if(data.errors){
                    Object.entries(data.errors).forEach(([key, value]) => {
                        toast.show({'description':value.toString()})
                    });
                }
                if(data.estado==='ok'){
                    toast.show({'description':data.mensaje})
                    setemail('') 
                }
    
            } catch (error) {
                toast.show({'description':error.toString()})
            }finally {
                setcargando(false);
            }
        }

        return (
          
            <Center flex={1} px="3">
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                    color: "warmGray.50"
                }}>
                    Bienvenido {deviceName}
                    </Heading>
                    <Heading mt="1" _dark={{
                    color: "warmGray.200"
                }} color="coolGray.600" fontWeight="medium" size="xs">
                    Ingresa tu correo electrónico para buscar tu cuenta.
                    </Heading>

                    <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input value={email} onChangeText={setemail} type="text" />
                    </FormControl>
                    
                    <Button mt="2" isLoading={cargando}  isLoadingText="Procesando..." colorScheme={"info"} onPress={acceder}>
                        {cargando?'Procesando':'Enviar enlace para restablecer contraseña'}
                    </Button>
                    <HStack mt="6" justifyContent="center">
                        <Link _text={{
                        color: "indigo.500",
                        fontWeight: "medium",
                        fontSize: "sm"
                    }} onPress={()=>navigation.navigate('Login')}>
                        Cancelar
                        </Link>
                    </HStack>
                    </VStack>
                </Box>
                
            </Center>
          
        );
    };
    
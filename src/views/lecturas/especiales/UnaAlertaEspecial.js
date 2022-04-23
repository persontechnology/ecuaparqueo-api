import React,{useState,useEffect,useContext} from 'react';
import { Pressable, Text, Box, HStack, Spacer,Badge,Flex,View, Spinner,Heading } from "native-base";

import {API_URL} from '@env';
import { AuthContext } from '../../../context/Auth';

export default function UnaAlertaEspecial({navigation}) {
    const {userRolesPermisos,userToken}=useContext(AuthContext);
    const [lectura, setlectura] = useState();
    const [finalizarCarga, setfinalizarCarga] = useState(false);
    const [enviandoLectura, setenviandoLectura] = useState(false);
    const  acceder= async()=>{
        try {
            const res=await fetch(API_URL+"notificacion-lectura-especial",{
                method:'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body:JSON.stringify({

                })
            });
            const data=await res.json();
            
            setlectura(data);
            setfinalizarCarga(true);
        } catch (error) {
        }finally {
        }
    }

    const  cerrarNotificacion= async(id)=>{
        
        setenviandoLectura(true);
        try {
            const res=await fetch(API_URL+"notificacion-lectura-especial-finalizar",{
                method:'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body:JSON.stringify({
                    id
                })
            });
            const data=await res.json();
            console.log(data)
        } catch (error) {
        }finally {
            setenviandoLectura(false);
        }
    }
    
    useEffect(()=>{
        
        acceder()
        const interval=setInterval(()=>{
        acceder()
        },3000)

        return()=>clearInterval(interval)
    },[])
if(finalizarCarga && lectura.id){
    return (
        
        <Box alignItems="center" mx={1} my={1}>
        {
            enviandoLectura==false?(
                <Pressable onPress={() => enviandoLectura===false?cerrarNotificacion(lectura.id):console.log() }>
                {
                    ({
                        isPressed
                    })=>{
                        return <Box maxW="100%" borderWidth="1" borderColor={lectura.tipo==='Entrada'?'info.400':'secondary.400'} shadow="5" bg={lectura.tipo==='Entrada'?'info.100':'secondary.100'} p="2" rounded="5"
                                    style={{
                                        transform: [{
                                            scale: isPressed ? 0.96 : 1
                                        }]
                                    }}
                                >
                                <HStack alignItems="center">
                                    <Badge colorScheme={lectura.tipo==='Entrada'?'info':'secondary'} _text={{
                                    color: "white"
                                }} variant="solid" rounded="4">
                                    Vehículo especial
                                    </Badge>
                                    <Spacer />
                                    <Text fontSize={10} color="coolGray.800">
                                    {lectura.fecha}
                                    </Text>
                                </HStack>
                                <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                                    {lectura.titulo}
                                </Text>
                                <Text mt="2" fontSize="sm" color="coolGray.700">
                                    {lectura.mensaje}
                                </Text>
                                <Flex>
                                    <Text mt="2" fontSize={12} fontWeight="medium" color={lectura.tipo==='Entrada'?'info.600':'secondary.600'}>
                                    {enviandoLectura?'Finalizando...':'Precione para finalizar'}
                                    </Text>
                                </Flex>
                                </Box>
                    }
                }
                </Pressable>
            ):(
                <HStack space={2} justifyContent="center">
                    <Spinner accessibilityLabel="Loading posts" />
                    <Heading color="primary.500" fontSize="md">
                        Enviando...
                    </Heading>
                </HStack>
            )
        }
            

        </Box>
      )
}else{
    return <View></View>
}
  
}

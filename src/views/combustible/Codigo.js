import React,{useState,useEffect,useContext} from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  useToast,
} from "native-base";

import { AuthContext } from "../../context/Auth";
import {API_URL} from "@env" ;

export default function Codigo({navigation}) {

    const [finalizarConsulta, setfinalizarConsulta] = useState(false);
    const [placa, setplaca] = useState('');
    const [codigo, setcodigo] = useState('');
    const {userRolesPermisos,userToken}=useContext(AuthContext);
    const toast = useToast();

    const  guardar= async()=>{
        
        setfinalizarConsulta(true)
        try {
            const res=await fetch(API_URL+"dc-consulta",{
                method:'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body:JSON.stringify({
                    placa,
                    codigo
                })
            });
            const data=await res.json();
            // console.log(data)
            if(data.codigo===codigo){
            //   toast.show({'description':'Revisión finalizado'})
            
              navigation.navigate('DetalleCombustible',data);
            }
            if(data==='no'){
              toast.show({'description':'Ocurrio un error, vuelva intentar.'})
            }
            if(data.errors){
                Object.entries(data.errors).forEach(([key, value]) => {
                    toast.show({'description':value.toString()})
                });
            }
  
        } catch (error) {
            toast.show({'description':error.toString()})
        }finally {
            setfinalizarConsulta(false);
        }
    }


  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading
            size="xs"
            fontWeight="200"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            FORMULARIO AUTORIZACIÓN PARA EL DESPACHO DEL COMBUSTIBLE
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            Ingrese Placa y código
          </Heading>

          <VStack space={3} mt="5">
            <FormControl isRequired>
              <FormControl.Label>PLACA</FormControl.Label>
              <Input value={placa} onChangeText={setplaca}  />
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label>CÓDIGO</FormControl.Label>
              <Input value={codigo} onChangeText={setcodigo} />
            </FormControl>
            
            <Button  colorScheme="info" isLoadingText={"Finalizando revisión"} isLoading={finalizarConsulta} onPress={()=>guardar()}>
              Consultar
            </Button>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}

import React,{useState,useEffect} from 'react'
import { Icon, Text, Box, HStack, Spacer, Flex, Badge,useToast, View,Center,Heading,VStack,FormControl,Input,Link,Button } from "native-base";
import {API_URL} from '@env';
import { AuthContext } from '../../context/Auth';
import CargandoSpiner from '../CargandoSpiner';
import {Ionicons,MaterialCommunityIcons} from "@expo/vector-icons";


export default function RegistrarRetorno({route,navigation}) {
    
    const {userToken}=React.useContext(AuthContext);
    const toast=useToast();
    const {notificacionLecturaId}=route.params;
    const [cargando, setcargando] = useState(false);
    const [enviandoRegistro, setenviandoRegistro] = useState(false);
    const [placaNumero, setplacaNumero] = useState('');
    const [fecha, setfecha] = useState('');
    const [kilometraje, setkilometraje] = useState('');
    const [combustible, setcombustible] = useState('');
    const [kilometrajeAnterior, setkilometrajeAnterior] = useState('');
    
    const  acceder= async()=>{
        setcargando(true);
        try {
            const res=await fetch(API_URL+"notificacion-lectura-id",{
                method:'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body:JSON.stringify({
                    notificacionLecturaId
                })
            });
            const data=await res.json();
            setfecha(data.fecha);
            setplacaNumero(data.placaNumero)
            setkilometrajeAnterior(data.kilometraje_anterior);
            
        } catch (error) {
            toast.show({'description':error.toString()})
        }finally {
            setcargando(false);
        }
    }

    useEffect(() => {
        acceder();

        setcargando(false);
        setenviandoRegistro(false);
        setplacaNumero('');
        setfecha('');
        setkilometraje('');
        setcombustible('');
        setkilometrajeAnterior('');
    }, [])


    const  registrar= async()=>{
      
        setenviandoRegistro(true);
        try {
            const res=await fetch(API_URL+"notificacion-lectura-registrar-retorno-vehiculo",{
                method:'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body:JSON.stringify({
                    notificacionLecturaId,
                    kilometraje,
                    combustible
                })
            });
            const data=await res.json();
            console.log(data)
            if(data.estado==='ok'){
                toast.show({'description':data.mensaje.toString()});
                
                navigation.goBack();
            }

            if(data.estado==='no'){
                toast.show({'description':data.mensaje.toString()})
            }

            if(data.errors){
                Object.entries(data.errors).forEach(([key, value]) => {
                    toast.show({'description':value.toString()})
                });
            }
            
            
        } catch (error) {
          // console.log(error)
            toast.show({'description':error.toString()})
        }finally {
            setenviandoRegistro(false);
        }
    }

    
  return cargando ? (
     <CargandoSpiner/>
  ):(

      <Box maxW="96" mx={3} my={1} borderWidth="1" borderColor="coolGray.300" shadow="3" bg="coolGray.100" p="5" rounded="8">
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
          Vehículo:{placaNumero}
        </Heading>
        <Heading mt="1" _dark={{
        color: "warmGray.200"
      }} color="coolGray.600" fontWeight="medium" size="xs">
          {fecha}
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>{'Ingrese kilometraje mator a: '+kilometrajeAnterior} </FormControl.Label>
            <Input value={kilometraje.toString()} onChangeText={setkilometraje} keyboardType={"numeric"} InputLeftElement={<Icon as={<Ionicons name="speedometer" />} size={7} ml="2" color="muted.400" />} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Ingrese % de combustible entre: 1 a 100</FormControl.Label>
            <Input value={combustible.toString()} onChangeText={setcombustible} keyboardType={"numeric"} InputLeftElement={<Icon as={<MaterialCommunityIcons name="speedometer" />} size={7} ml="2" color="muted.400" />} />
            
          </FormControl>
            <Button mt="2" isLoading={enviandoRegistro}  isLoadingText="Procesando..." colorScheme={"info"} onPress={registrar}>
                    {enviandoRegistro?'Procesando':'Registrar'}
            </Button>
          <Button mt="2" colorScheme="primary" onPress={()=>navigation.goBack()}>
            Cancelar
          </Button>
        </VStack>
      </Box>

  )
}

import React from 'react'
import { Box, Center, Text,Heading,VStack,FormControl,Input,Button,Icon,useToast, View } from "native-base";
import { AuthContext } from '../../context/Auth';
import {MaterialIcons,FontAwesome5} from '@expo/vector-icons';
import {API_URL} from '@env';
import { Card} from '@rneui/themed';

const LinearGradient = require("expo-linear-gradient").LinearGradient;

const App = () => {
    const {userName,userEmail,signOut}=React.useContext(AuthContext)

    return <Box bg={{
      linearGradient: {
        colors: ["lightBlue.300", "violet.800"],
        start: [0, 0],
        end: [1, 0]
      }
    }} p="2" mt={10} mx={2} rounded="xl" _text={{
      fontSize: "md",
      fontWeight: "medium",
      color: "warmGray.50",
      textAlign: "left"
    }}>
        <Heading size="lg" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }} fontWeight="semibold">
            Bienvenido
        </Heading>
        <Text fontSize="xs">Usuario</Text>
        {userName}
        <Text fontSize="xs">Email</Text>
        {userEmail}
    
        <Button variant={"subtle"} onPress={()=>signOut()} colorScheme="info" rightIcon={<Icon as={FontAwesome5} name="sign-out-alt" size="sm" />}>
        Cerrar sessión
      </Button>
    
      </Box>;
  };
  

  const FormPassword = () => {
    const toast = useToast();
    const {userId,userToken}=React.useContext(AuthContext)
    const [pwdUno, setpwdUno] = React.useState(false);
    const [pwdDos, setpwdDos] = React.useState(false);
    const [pwdTres, setpwdTres] = React.useState(false);
    const [pwdActual, setpwdActual] = React.useState('');
    const [pwdNueva, setpwdNueva] = React.useState('');
    const [pwdRepita, setpwdRepita] = React.useState('');
    const [cargando, setcargando] = React.useState(false);

    const  acceder= async()=>{
        setcargando(true);
        try {
            const res=await fetch(API_URL+"actualizar-contrasena",{
                method:'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body:JSON.stringify({
                    userId,
                    pwdActual,
                    pwdNueva,
                    pwdRepita
                })
            });
            const data=await res.json();
            
            if(data.errors){
                Object.entries(data.errors).forEach(([key, value]) => {
                    toast.show({'description':value.toString()})
                });
            }
            if(data.message==='ok'){
                toast.show({'description':'Contreseña actualizada'})
                setpwdActual('');
                setpwdNueva('');
                setpwdRepita('');
            }

        } catch (error) {
            toast.show({'description':error.toString()})
        }finally {
            setcargando(false);
        }
    }

    return  <Card>
              <Heading mt="1" color="coolGray.600" _dark={{
              color: "warmGray.200"
            }} fontWeight="medium" size="xs">
                Actualizar contraseña!
              </Heading>
              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>Contraseña actual</FormControl.Label>
                  <Input  type={pwdUno?"text":"password"}
                    value={pwdActual}
                    onChangeText={setpwdActual}
                    InputRightElement={
                        <Icon as={<MaterialIcons name={pwdUno?"visibility-off":"visibility"} />} onPress={()=>setpwdUno(!pwdUno)} size={5} mr="2" color="muted.400" />
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Nueva contraseña</FormControl.Label>
                  <Input type={pwdDos?"text":"password"}
                    value={pwdNueva}
                    onChangeText={setpwdNueva}
                    InputRightElement={
                        <Icon as={<MaterialIcons name={pwdDos?"visibility-off":"visibility"} />} onPress={()=>setpwdDos(!pwdDos)} size={5} mr="2" color="muted.400" />
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Repita contraseña</FormControl.Label>
                  <Input type={pwdTres?"text":"password"} 
                    value={pwdRepita}
                    onChangeText={setpwdRepita}
                    InputRightElement={
                        <Icon as={<MaterialIcons name={pwdTres?"visibility-off":"visibility"} />} onPress={()=>setpwdTres(!pwdTres)} size={5} mr="2" color="muted.400" />
                    }
                  />
                </FormControl>
                    <Button mt="2" isLoading={cargando}  isLoadingText="Procesando..." colorScheme={"info"} onPress={acceder}>
                            {cargando?'Procesando':'Actualizar'}
                    </Button>
              </VStack>
            </Card>
          
        
  };
 

//   tab


export default function Perfil() {
  return (
    <View flex={1}>
        <App />
        <FormPassword/>
      
    </View>
  )
}

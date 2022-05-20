import * as React from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider,Icon,useToast } from "native-base";
import * as Device from 'expo-device';
import Footer from "./Footer";
import Logo from "./Logo";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../../context/Auth";
import {API_URL} from "@env";

const Example = ({navigation}) => {
    
    const [verPassword, setverPassword] = React.useState(false);
    const [username, setUsername] = React.useState('david.criollo14@gmail.com');
    const [password, setPassword] = React.useState('123456789');
    const [show, setShow] = React.useState(false);
    const toast = useToast();
    const [cargando, setcargando] = React.useState(false);
    const { signIn } = React.useContext(AuthContext);

    const  acceder= async()=>{
        setcargando(true);
        try {
            const res=await fetch(API_URL+"login",{
                method:'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    "email":username,
                    "password":password,
                    "device_name":Device.deviceName
                })
            });
            const data=await res.json();
            // console.log(data)
            if(data.errors){
                Object.entries(data.errors).forEach(([key, value]) => {
                    toast.show({'description':value.toString()})
                });
            }
            if(data.message==='ok'){
                
                signIn(data);
            }

        } catch (error) {
            toast.show({'description':error.toString()})
        }finally {
            setcargando(false);
        }
    }

  return  <Center w="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Logo/>
                <Heading size="lg" fontWeight="600" color="indigo.800" _dark={{
                    color: "warmGray.50"
                }}>
                Bienvenido {Device.deviceName}
                </Heading>
                <Heading mt="1" _dark={{
                color: "warmGray.200"
            }} color="coolGray.600" fontWeight="medium" size="xs">
                ¡Inicia sesión para continuar!
                </Heading>

                <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input  
                        value={username} 
                        onChangeText={setUsername} 
                        placeholder={"Ingrese email..."}
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Contraseña</FormControl.Label>
                    <Input 
                        type={verPassword?'text':'password'} 
                        onChangeText={setPassword} 
                        value={password}
                        placeholder="Ingrese contraseña..."
                        InputRightElement={<Icon as={<MaterialIcons name={verPassword?'visibility-off':'visibility'} />} onPress={()=>setverPassword(!verPassword)} size={5} mr="2" color="muted.400" />}
                    />
                    <Link _text={{
                    fontSize: "xs",
                    fontWeight: "500",
                    color: "indigo.500"
                }} alignSelf="flex-end" mt="1" onPress={()=>navigation.navigate('ResetPassword')}>
                    ¿Contraseña olvidada?
                    </Link>
                </FormControl>
                
                <Button mt="2" isLoading={cargando}  isLoadingText="Procesando..." colorScheme={"info"} onPress={acceder}>
                    {cargando?'Procesando':'Acceder'}
                </Button>
                
                <Footer/>
                </VStack>
            </Box>
            </Center>
};

    export default function Login({navigation}) {
        return (
          <NativeBaseProvider>
            <Center flex={1} px="3">
                <Example navigation={navigation} />
                
            </Center>
          </NativeBaseProvider>
        );
    };
    
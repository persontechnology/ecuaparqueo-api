import React,{useState} from 'react';
import { Card} from '@rneui/themed';
import { Input,Icon,FormControl,Stack,Heading ,Button,useToast} from 'native-base';
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {API_URL} from '@env';
import { AuthContext } from '../../context/Auth';

export default function Salidas() {
    
    const {userToken}=React.useContext(AuthContext);
    const [placaMovil, setplacaMovil] = useState('13909293');
    const [codigoBrazo, setcodigoBrazo] = useState('Bra-001');
    const [cargando, setcargando] = React.useState(false);
    const toast = useToast();

    const  acceder= async()=>{
        setcargando(true);
        try {
            const res=await fetch(API_URL+"lectura-salida-vehicular",{
                method:'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body:JSON.stringify({
                    code:placaMovil,
                    codeBrazo:codigoBrazo
                })
            });
            const data=await res.json();
            console.log(data)
        } catch (error) {
            console.log(error)
        }finally {
            setcargando(false);
        }
    }

    
    return (
        <Card>
            <Card.Title>Consulta de Lectura salida vehícular</Card.Title>
            <Card.Divider />
            <FormControl isRequired>
            <Stack>
                <FormControl.Label>Placa o Número Móvil</FormControl.Label>
                <Input type="text" 
                    value={placaMovil}
                    onChangeText={setplacaMovil}
                    InputLeftElement={<Icon as={<MaterialCommunityIcons name="car-hatchback" />} size={7} ml="2" color="muted.400" />}
                />
                <FormControl.Label>Código del brazo</FormControl.Label>
                <Input type="text" 
                    value={codigoBrazo}
                    onChangeText={setcodigoBrazo}
                    InputLeftElement={<Icon as={<MaterialCommunityIcons name="barcode" />} size={7} ml="2" color="muted.400" />}
                />
                 <Button mt="2" isLoading={cargando}  isLoadingText="Procesando..." colorScheme={"danger"} onPress={acceder}>
                        {cargando?'Procesando':'Solictar'}
                </Button>

            </Stack>
            </FormControl>
        </Card>
    );
};


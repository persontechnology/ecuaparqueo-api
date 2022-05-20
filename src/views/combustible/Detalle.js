import React,{useEffect,useState,useRef,useContext} from 'react'
import { View,Text,Button,Box,Select,CheckIcon,Stack,Icon,useToast, Spacer } from 'native-base'
import { Ionicons } from "@expo/vector-icons";
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { StyleSheet,SafeAreaView, Image} from 'react-native';
import { AuthContext } from "../../context/Auth";
import {API_URL} from "@env" ;

export default function Detalle({ route, navigation }) {
  const {
    cantidad_galones,
    cantidad_letras,
    chofer,
    chofer_id,
    codigo,
    concepto,
    destino,
    estado,
    fecha,
    id,
    kilometraje,
    numero,
    observaciones,
    valor,
    valor_letras,
    vehiculo,
  }=route.params;

  let cameraRef=useRef();
  const[hasCameraPermission,setHasCameraPermissions]=useState();
  const[hasMediaLibraryPermission,setHasMediaLibraryPermission]=useState();
  const [photo, setphoto] = useState();
  let [service, setService] = React.useState("");
  const toast = useToast();
  const {userRolesPermisos,userToken}=useContext(AuthContext);
  const [estaciones, setestaciones] = useState([]);
  const [cargando, setcargando] = useState(false);
  const [tomandoFoto, settomandoFoto] = useState(false)

  const  consultarEstaciones= async()=>{
    try {
        const res=await fetch(API_URL+"dc-consulta-estaciones",{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        const data=await res.json();
        setestaciones(data);

        if(data.codigo===codigo){
          toast.show({'description':'Revisión finalizado'})
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
        
    }
}

  useEffect(() => {
    (async()=>{
      const cameraPermision=await Camera.requestCameraPermissionsAsync();
      const mediLibraryPermission=await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermissions(cameraPermision.status==="granted");
      setHasMediaLibraryPermission(mediLibraryPermission.status==="granted");

    })();
    consultarEstaciones();
  }, [])

  if(hasCameraPermission===undefined){
    return <Text>Solicitando permiso de camara...</Text>
  }else if(!hasCameraPermission){
    return <Text>Permiso para la cámara no concedido, porfavor cambien en configuraciones..</Text>
  }



  let tomarFoto=async()=>{
    if(service===''){
      toast.show({'description':'Selecione una estación porfavor.!'})
    }else{
      let options={
        quality:1,
        base64:true,
        exif:false
      };

      settomandoFoto(true);
      try {
        let newPhoto=await cameraRef.current.takePictureAsync(options);
        setphoto(newPhoto);
      } catch (error) {
        
      }finally{
        settomandoFoto(false);
      }
    }
  }

  if(photo){
    // let sharePic=()=>{
    //   shareAsync(photo.uri).then(()=>{
    //     setphoto(undefined)
    //   });
    // }

    // let savePic=()=>{
    //   MediaLibrary.saveToLibraryAsync(photo.uri).then(()=>{
    //     setphoto(undefined)
    //   });
    // }

    let enviarFoto= async()=>{
      setcargando(true);
      try {
          const res=await fetch(API_URL+"dc-enviarFoto",{
              method:'POST',
              headers:{
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${userToken}`
              },
              body:JSON.stringify({
                  id,
                  service,
                  foto:"data:image/jpg;base64,"+photo.base64
              })
          });
          const data=await res.json();
          if(data==='ok'){
            toast.show({'description':'Despacho finalizado'});
            setphoto()
            setService('')
            setestaciones([]);
            setcargando(false)
            settomandoFoto(false);
            navigation.goBack();
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
          setcargando(false);
      }
  }
    return(
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri:"data:image/jpg;base64,"+photo.base64 }}></Image>
        <Stack direction={{
          base: "column",
          md: "row"
        }} space={1}>
        <View style={styles.buttonContainer}>
            <Button mt={1} onPress={enviarFoto} isLoadingText={"Enviando..."} isLoading={cargando} leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="sm" />}>
              Enviar
            </Button>
            <Button mb={1} variant="subtle" isLoadingText={"Enviando..."} isLoading={cargando} onPress={()=>setphoto(undefined)} colorScheme={"secondary"} leftIcon={<Icon as={Ionicons} name="close" size="sm" />}>
              Descartar
            </Button>
            </View>
        </Stack>
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
    
      <Box w="3/4" maxW="300" bg={"amber.100"} opacity={70} mx={3}>
        <View mx={2}>
        <Text>{"Vehículo: "+vehiculo}</Text>
        <Text>{"Código: "+codigo}</Text>
        <Text>{"N°: "+numero}</Text>
        <Text>{"Concepto: "+concepto}</Text>
        <Text>{"Galones: "+cantidad_galones+" ("+cantidad_letras+")"}</Text>
        <Text>{"Efectivo: "+valor+" ("+valor_letras+")"}</Text>
        <Text>{"Fecha: "+fecha}</Text>
          <Select selectedValue={service} mb={1} minWidth="200" accessibilityLabel="Selecione estación" placeholder="Seleccione estación" _selectedItem={{
          
          endIcon: <CheckIcon size="5" />
        }} mt={1} onValueChange={itemValue => setService(itemValue)}>
            {
              estaciones.map((estacion)=>{
                return <Select.Item label={estacion.nombre} value={estacion.id} />
              })
            }
          </Select>
        </View>
        </Box>
        <View style={styles.buttonContainer}>
          <Button mt={1} isLoadingText={"Procesando"} isLoading={tomandoFoto} onPress={tomarFoto}>Tomar foto</Button>
        </View>
    </Camera>
  )
}


const styles=StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
  },
  buttonContainer:{
    alignSelf:"flex-end"
  },
  preview:{
    alignSelf:"stretch",
    flex:1
  }
});

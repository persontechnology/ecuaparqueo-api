import React,{useEffect,useState,useContext} from 'react'
import { View,Text,useToast } from 'native-base';
import {API_URL} from "@env";
import { AuthContext } from '../../../context/Auth';

export default function RevisionLecturaInvitado({ route, navigation }) {
    const {id,tipo}=route.params;
    // navigation.setOptions({ title: 'Revisión '+tipo });
    const [estadoLectura, setestadoLectura] = useState(false);
    const [cargando, setcargando] = useState(true);
    const toast = useToast();
    const {userRolesPermisos,userToken}=useContext(AuthContext);

    const  acceder= async()=>{
        setcargando(true);
        try {
            const res=await fetch(API_URL+"notificacion-lectura-invitado-detalle",{
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

    useEffect(()=>{
        
        acceder();
        setestadoLectura(false)
        setcargando(true);
       
      

    },[])

  return (
    <View key={id}><Text>{id}</Text></View>
  )
}

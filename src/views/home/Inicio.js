import React,{useContext} from "react";
import { Container, Text, Heading, Center, ScrollView,View} from "native-base";
import {StatusBar,SafeAreaView} from "react-native"
import Bienvenida from "./Bienvenida";
import UnaAlertaEspecial from "../lecturas/especiales/UnaAlertaEspecial";
import UnaAlertaInvitado from "../lecturas/invitados/UnaAlertaInvitado";
import UnaAlertaNormal from "../lecturas/normales/UnaAlertaNormal";
import { AuthContext } from "../../context/Auth";



export default function Inicio({navigation}) {

  const {userRolesPermisos,userToken}=useContext(AuthContext);

    return (
      <ScrollView>
      {
        userRolesPermisos.includes('Guardia')?<>
          <UnaAlertaNormal navigation={navigation}/>
          <UnaAlertaInvitado navigation={navigation}/>
          <UnaAlertaEspecial navigation={navigation}/>
          </>:<View></View>
      }
          
      </ScrollView>
      
    );
};
    
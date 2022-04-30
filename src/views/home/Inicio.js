import React from "react";
import { Container, Text, Heading, Center, ScrollView} from "native-base";
import {StatusBar,SafeAreaView} from "react-native"
import Bienvenida from "./Bienvenida";
import UnaAlertaEspecial from "../lecturas/especiales/UnaAlertaEspecial";
import UnaAlertaInvitado from "../lecturas/invitados/UnaAlertaInvitado";
import UnaAlertaNormal from "../lecturas/normales/UnaAlertaNormal";




export default function Inicio({navigation}) {
    return (
      <ScrollView>
          <UnaAlertaNormal navigation={navigation}/>
          <UnaAlertaInvitado navigation={navigation}/>
          <UnaAlertaEspecial navigation={navigation}/>
      </ScrollView>
      
    );
};
    
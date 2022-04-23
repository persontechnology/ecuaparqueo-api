import React from "react";
import { Container, Text, Heading, Center, ScrollView} from "native-base";
import {StatusBar,SafeAreaView} from "react-native"
import Bienvenida from "./Bienvenida";
import UnaAlertaEspecial from "../lecturas/especiales/UnaAlertaEspecial";
import UnaAlertaInvitado from "../lecturas/invitados/UnaAlertaInvitado";




export default function Inicio({navigation}) {
    return (
      <ScrollView>
          <UnaAlertaEspecial navigation={navigation}/>
          <UnaAlertaInvitado navigation={navigation}/>
          {/* <Lista navigation={navigation}/> */}
      </ScrollView>
      
    );
};
    
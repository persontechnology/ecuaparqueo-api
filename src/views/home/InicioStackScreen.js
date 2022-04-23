import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from './Inicio';
import {API_NAME} from "@env";
import RegistrarRetorno from '../lecturas/RegistrarRetorno';
import RevisionLecturaInvitado from '../lecturas/invitados/RevisionLecturaInvitado';

const HomeStack = createNativeStackNavigator();

export default function InicioStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName='InicioHome'>
      <HomeStack.Screen name="InicioHome" options={{ title:API_NAME }} component={Inicio} />
      <HomeStack.Screen name="RevisionLecturaInvitado" options={{ title:'Revisión invitado' }} component={RevisionLecturaInvitado} />
    </HomeStack.Navigator>
  );
}
import React,{useContext} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from './Inicio';
import {API_NAME} from "@env";

import RevisionLecturaInvitado from '../lecturas/invitados/RevisionLecturaInvitado';
import RevisionLecturaSalidaInvitado from '../lecturas/invitados/RevisionLecturaSalidaInvitado';
import RegistrarRetorno from '../lecturas/normales/RegistrarRetorno';
import {AuthContext} from '../../context/Auth';

const HomeStack = createNativeStackNavigator();

export default function InicioStackScreen() {

  const {userRolesPermisos,userToken}=useContext(AuthContext);

  return (
    <HomeStack.Navigator initialRouteName='InicioHome'>
      <HomeStack.Screen name="InicioHome" options={{ title:API_NAME }} component={Inicio} />
      <HomeStack.Screen name="RevisionLecturaInvitado" options={{ title:'Revisión entrada invitado' }} component={RevisionLecturaInvitado} />
      <HomeStack.Screen name="RevisionLecturaSalidaInvitado" options={{ title:'Revisión salida invitado' }} component={RevisionLecturaSalidaInvitado} />
      <HomeStack.Screen name="RegistrarRetorno" options={{ title:'Revisión entrada normal' }} component={RegistrarRetorno} />
    </HomeStack.Navigator>
  );
}
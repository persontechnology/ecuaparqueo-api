import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from './Inicio';
import Detalle from './Detalle';

const HomeStack = createNativeStackNavigator();

export default function CombustibleStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName='InicioCombustible'>
      <HomeStack.Screen options={{ title:'Despacho de combustible' }} name="InicioCombustible" component={Inicio} />
      <HomeStack.Screen name="DetalleCombustible" component={Detalle} />
    </HomeStack.Navigator>
  );
}
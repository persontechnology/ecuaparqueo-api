import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from './Inicio';
import Detalle from './Detalle';

const SettingsStack = createNativeStackNavigator();
export default function ConfiguracionStackScreen() {
    return (
        <SettingsStack.Navigator initialRouteName='InicioConfiguracion'>
          <SettingsStack.Screen name="InicioConfiguracion" component={Inicio} />
          <SettingsStack.Screen name="DetalleConfiguracion" component={Detalle} />
        </SettingsStack.Navigator>
      );
}

import React from 'react'
import Login from './Login'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResetPassword from './ResetPassword';
const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator screenOptions={{
        // headerShown:false
     }} initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{title:'Acceder'}}/>
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{title:'Restablecer contraseña'}}/>
        
    </Stack.Navigator>
  )
}

import React,{useState,useEffect,useContext} from 'react';
import { Button, Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import Perfil from './users/Perfil';
import { AuthContext } from '../context/Auth';
import Index from './lecturas/Index';
import CombustibleStackScreen from './combustible/CombustibleStackScreen';
import Inicio from './home/Inicio';
import ConfiguracionStackScreen from './configuracion/ConfiguracionStackScreen';
import InicioStackScreen from './home/InicioStackScreen';



const Tab = createBottomTabNavigator();

export default function MyTabs() {
  
  const {userRolesPermisos,userToken}=useContext(AuthContext);
  

  return (
    
    <Tab.Navigator
        initialRouteName="InicioTab"
        screenOptions={{
          tabBarActiveTintColor: "#164e63",
          headerShown:false
        }}
      >
        <Tab.Screen
          name="InicioTab"
          component={InicioStackScreen}
          options={{
            tabBarLabel: 'Inicio',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />

        {/* <Tab.Screen 
          name="ConfiguracionTab" 
          component={ConfiguracionStackScreen}
          options={{
          tabBarLabel: 'Configuración',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={color} size={size} />
          ),
        }}
         /> */}

        {
          userRolesPermisos.includes('Despachador')?
          (
            <Tab.Screen 
              name="CombustibleTab" 
              component={CombustibleStackScreen} 
              options={{
              tabBarLabel: 'Combustible',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="fuel" color={color} size={size} />
              ),
            }}
            />
          ):<></>
        }
        

      


      {/* acceso solo usuarios guardia */}
      
      {
        userRolesPermisos.includes('Guardia')?
        (
          <Tab.Screen
            name="LecturasTab"
            component={Index}
            options={{
              tabBarLabel: 'Lecturas',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="tablet-cellphone" color={color} size={size} />
              ),
            }}
          />
        ):<></>
      }

      
      <Tab.Screen
        name="PerfilTab"
        component={Perfil}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>      
    
  );
}

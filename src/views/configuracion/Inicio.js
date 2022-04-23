import { View,Text, Button } from 'native-base'
import React from 'react'

export default function Inicio({navigation}) {
  return (
    <View>
        <Text>INICIO DE CONFIGURACION</Text>
        <Button onPress={()=>navigation.navigate('DetalleConfiguracion')}>IR A DETALLE DE CONFIGURACION</Button>
    </View>
  )
}

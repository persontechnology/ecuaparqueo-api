import React from 'react'
import { View,Text,Button } from 'native-base'

export default function Detalle({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home screen</Text>
        <Button onPress={()=>navigation.navigate('InicioCombustible')}>IR INICIO DE COMBUSTIBLE</Button>
    </View>
  )
}

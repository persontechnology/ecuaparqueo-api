import React from 'react'
import { View,Text, Button } from 'native-base'
import Codigo from './Codigo'



export default function Inicio({navigation}) {
  return (
    <Codigo navigation={navigation} />
    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //   <Text>Home screen</Text>
    //   <Button onPress={()=>navigation.navigate('DetalleCombustible')}>IR A DETALLA DE COMBUSTIBLE</Button>
    // </View>
  )
}

import React from "react";
import { Container, Text, Heading, Center, ScrollView} from "native-base";
import {StatusBar,SafeAreaView} from "react-native"
import Salidas from "./Salidas";
import ConsultaLectura from "./ConsultaLectura";

export default function Index() {
  return (
    <SafeAreaView style={{ paddingTop:StatusBar.currentHeight,flex:1 }}>
          <ScrollView>
            <ConsultaLectura/>
            <Salidas/>
          </ScrollView>
      </SafeAreaView>
  )
}

import React from 'react'
import { HStack,Text,Link } from 'native-base'
import {API_NAME,API_HOST} from "@env";
export default function Footer() {
  return (
    <HStack mt="6" justifyContent="center">
        <Text fontSize="sm" color="coolGray.600" _dark={{
        color: "warmGray.200"
    }}>
        copyright © {new Date().getFullYear()+" "}
        </Text>
        <Link _text={{
        color: "indigo.500",
        fontWeight: "medium",
        fontSize: "sm"
    }} href={API_HOST}>
        {API_NAME}
        </Link>
        
    </HStack>
  )
}

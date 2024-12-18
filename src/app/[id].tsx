import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Page = () => {
    const {id} = useLocalSearchParams()
  return (
    <View style={{flex:1,backgroundColor:'lightblue',
    justifyContent:'center',
    alignItems:'center',
    margin:120
    }}>
      <Text>Page {id}</Text>
    </View>
  )
}

export default Page
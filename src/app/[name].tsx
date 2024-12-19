import { View, Text, Image } from 'react-native'
import React from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import * as FileSystem from 'expo-file-system'
import { MaterialIcons } from '@expo/vector-icons'

const Page = () => {
    const { name } = useLocalSearchParams()

    if (!name || !FileSystem.documentDirectory) return null

    const fileUri = FileSystem.documentDirectory + name

    const onDelete = async () => {
        await FileSystem.deleteAsync(fileUri)
        router.back()
    }

  return (
    <>
    <Stack.Screen options={{ 
      title: 'Media',
      headerRight: () => (
        <MaterialIcons name="delete" size={24} color="black" onPress={onDelete} />
      )}} />
    <Image source={{ uri: fileUri }} style={{ flex: 1 }} />
    </>
  )
}

export default Page
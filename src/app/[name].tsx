import { View, Text, Image } from 'react-native'
import React from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import * as FileSystem from 'expo-file-system'
import { MaterialIcons } from '@expo/vector-icons'
import { getMediaType } from '../utils/media'
import { useVideoPlayer, VideoView } from 'expo-video'
import { useEvent } from 'expo'

const Page = () => {
    const { name } = useLocalSearchParams()

    if (!name || !FileSystem.documentDirectory) return null

    const fileUri = FileSystem.documentDirectory + name

    const type = getMediaType(fileUri)

    const onDelete = async () => {
        await FileSystem.deleteAsync(fileUri)
        router.back()
    }

    const player = useVideoPlayer(fileUri, player => {
      player.play()
    }  )
    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  return (
    <>
    <Stack.Screen options={{ 
      title: 'Media',
      headerRight: () => (
        <MaterialIcons name="delete" size={24} color="black" onPress={onDelete} />
      )}} />
 { type === 'image' && <Image source={{ uri: fileUri }} style={{ flex: 1 }} />}
 { type === 'video' && <VideoView player={player} style={{ flex: 1 }} />}
    </>
  )
}

export default Page
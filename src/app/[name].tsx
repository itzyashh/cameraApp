import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import * as FileSystem from 'expo-file-system'
import { MaterialIcons } from '@expo/vector-icons'
import { getMediaType } from '../utils/media'
import { useVideoPlayer, VideoView } from 'expo-video'
import { useEvent } from 'expo'
import * as MediaLibrary  from 'expo-media-library';

const Page = () => {
    const { name } = useLocalSearchParams()
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

    if (!name || !FileSystem.documentDirectory) return null

    const fileUri = FileSystem.documentDirectory + name
    const player = useVideoPlayer(fileUri, player => {
      player.play()
    }  )
    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

    const type = getMediaType(fileUri)
    
    const onDelete = async () => {
      await FileSystem.deleteAsync(fileUri)
      router.back()
    }
    

    const onGallerySave = async () => {
      if (permissionResponse?.status === 'granted') {
        await MediaLibrary.saveToLibraryAsync(fileUri)
      } else {
       await requestPermission().then((onfulfilled) => {
          if (onfulfilled.status === 'granted') {
            MediaLibrary.saveToLibraryAsync(fileUri)
          }
        })
      }
    }

  return (
    <>
    <Stack.Screen options={{ 
      title: 'Media',
      headerRight: () => (
        <View style={styles.iconContainer}>
          <MaterialIcons name="save-alt" size={24} color="black" onPress={onGallerySave} />
        <MaterialIcons name="delete" size={24} color="black" onPress={onDelete} />
        </View>
      )}} />
 { type === 'image' && <Image source={{ uri: fileUri }} style={{ flex: 1 }} />}
 { type === 'video' && <VideoView player={player} style={{ flex: 1 }} />}
    </>
  )
}

export default Page

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    gap: 10
  }
})
import { Link, useFocusEffect } from "expo-router";
import { FlatList, Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as FileSystem from 'expo-file-system';
import { useCallback, useEffect, useState } from "react";
import { getMediaType } from "../utils/media";

type Media = {
  name: string
  uri: string
}

export default function Index() {

  const [media, setMedia] = useState<Media[]>([])

  useFocusEffect(
    useCallback(() => {
    loadImages()
  },[]))

  const loadImages = async () => {
    if (!FileSystem.documentDirectory) return
    const media = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
    setMedia(media.map(name => ({
      name,
      uri: FileSystem.documentDirectory + name,
      type: getMediaType(FileSystem.documentDirectory + name)
    })).filter(media => media.type !== 'unknown')
  )
  }


  return (
    <View style={styles.container}>
    <FlatList
      data={media}
      keyExtractor={item => item.name}
      numColumns={3}
      contentContainerStyle={{ gap: 1 }}
      columnWrapperStyle={{ gap: 1 }}
      renderItem={({ item }) => (
        <Link asChild href={`/${item.name}`}>
        <Pressable onPress={() => {}} style={{ flex: 1, maxWidth: '33.33%' }}>
          {/* @ts-ignore */}
          {item.type === 'video' && <FontAwesome name="play-circle-o" size={24} style={styles.videoIcon} />}
          <Image source={{ uri: item.uri }} style={{  aspectRatio: 3/4 }} />
        </Pressable>
        </Link>
      )}
    />


      <Link asChild href={"/camera"}>
        <Pressable style={styles.cameraButton}>
          <FontAwesome name="camera" size={24} color="black" />
        </Pressable>
      </Link>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    padding: 20,
    backgroundColor: 'lightblue',
    borderRadius: 10
  },
  videoIcon: {
    position: 'absolute',
    color: 'white',
    fontSize: 24,
    zIndex: 1,
    top: 10,
    left: 10
  }
})

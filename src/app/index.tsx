import { Link, useFocusEffect } from "expo-router";
import { FlatList, Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as FileSystem from 'expo-file-system';
import { useCallback, useEffect, useState } from "react";

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
    const images = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
    setMedia(images.map(name => ({
      name,
      uri: FileSystem.documentDirectory + name
    })))
  }

  return (
    <View
      style={styles.container}
    >

    <FlatList
      data={media}
      keyExtractor={item => item.name}
      numColumns={3}
      contentContainerStyle={{ gap: 1 }}
      columnWrapperStyle={{ gap: 1 }}
      renderItem={({ item }) => (
        <Link asChild href={`/${item.name}`}>
        <Pressable onPress={() => {}} style={{ flex: 1, maxWidth: '33.33%' }}>
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
  }
})

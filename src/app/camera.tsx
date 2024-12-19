import { Image, Linking, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CameraCapturedPicture, CameraType, CameraView, useCameraPermissions } from 'expo-camera'
import Spinner from 'react-native-loading-spinner-overlay'
import { AntDesign, FontAwesome6 } from '@expo/vector-icons'
import { router } from 'expo-router'
import ShutterBtn from '../components/ShutterBtn'

import * as FileSystem from 'expo-file-system'
import path from 'path'
import { Pressable } from 'react-native'

const DUMMY_PHOTO = 'https://images.pexels.com/photos/29773887/pexels-photo-29773887/free-photo-of-charming-getreidegasse-in-salzburg-austria.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

const CameraScreen = () => {

  const [permission, requestPermission] = useCameraPermissions()
  const camera = useRef<CameraView>(null)
  const [cameraPosition, setCameraPosition] = useState<CameraType>('back')
  const [photo, setPhoto] = useState<CameraCapturedPicture>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Linking.openURL('app-settings:');
    if( permission && !permission.granted && permission.canAskAgain) {
      requestPermission()
    }
  }, [permission])

  const onFlipCamera = () => {
    const type = cameraPosition === 'back' ? 'front' : 'back'
    setCameraPosition(prev => prev === 'back' ? 'front' : 'back')
  }

  const takePicture =  useCallback(async () => {
    setLoading(true)
    const photo = await camera.current?.takePictureAsync()
    setPhoto(photo)
    setLoading(false)
  }, [])

  const savePhoto = async (uri: string) => {
    const fileName = path.parse(uri).base

    await FileSystem.moveAsync({
      from: uri,
      to: FileSystem.documentDirectory + fileName
    })

    setPhoto(undefined)
    router.back()
  }




  if (photo) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photo.uri }} style={{ flex: 1 }} />
        <AntDesign name="close" size={24} color="black" style={styles.closeButton} onPress={
          () => setPhoto(undefined)
          } />
          <Pressable style={styles.saveButton} onPress={() => savePhoto(photo.uri)}>
            <Text style={styles.saveButtonText}>Save</Text>
          </Pressable>
      </View>
    )
  }


  if (!permission?.granted) {
    requestPermission()
    return <Spinner visible={true} />
  }

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      <CameraView
       style={{ flex: 1 }} facing={cameraPosition} ref={camera}>
      <AntDesign name="close" size={24} color="black" style={styles.closeButton} onPress={() => router.back()} />
        <View style={styles.footer}>
        <FontAwesome6 name="camera-rotate" size={24} color="white" onPress={onFlipCamera} />
        <ShutterBtn onPress={takePicture} />
        </View>
      </CameraView>
    </View>
  )
}

export default CameraScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    color: 'gray',
    fontSize: 34,
    top: 50,
    right: 30,
  },
  footer: {
    marginTop: 'auto',
    padding: 20,
    paddingBottom: 40,
    // backgroundColor: 'rgba(0,0,0,0.5)',
    backgroundColor: 'rgba(246, 8, 8, 0.5)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  saveButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 20,
  }
})
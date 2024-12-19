import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native'
import React, { FC, memo } from 'react'

type ShutterBtnProps = {
    onPress: () => void
    isRecording: boolean
} & PressableProps

const ShutterBtn:FC<ShutterBtnProps> = ({ onPress, isRecording , ...PressableProps}) => {

  return (
    <Pressable style={[styles.shutterBtn]}
    onPress={onPress} {...PressableProps}>
      <View style={[styles.innerBtn, isRecording && { backgroundColor: 'red' }]} /> 

    </Pressable>
  )
}

export default ShutterBtn

const styles = StyleSheet.create({
    shutterBtn: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerBtn: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'black',
    }
})
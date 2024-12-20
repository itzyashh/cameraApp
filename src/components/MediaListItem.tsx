import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { Link } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { useVideoPlayer, VideoView } from 'expo-video'


type MediaListItemProps = {
  media: {
    name: string
    uri: string
    type: 'image' | 'video'
  }
}

const MediaListItem: FC<MediaListItemProps> = ({ media }) => {


  const player = useVideoPlayer(media.uri, player => {
    player.muted = true
    player.loop = true
    player.play()
  })


  return (
    <Link href={`/${media.name}`} asChild>
      <Pressable style={{ flex: 1, maxWidth: '33.33%' }}>
        {media.type === 'video' &&
          <>
            <VideoView player={player} style={{ aspectRatio: 3 / 4 }} contentFit='cover' nativeControls={false} />
            <FontAwesome name="play-circle-o" size={24} style={styles.videoIcon} />
          </>
        }
        {media.type === 'image' && <Image source={{ uri: media.uri }} style={{ aspectRatio: 3 / 4 }} />}

      </Pressable>
    </Link>
  )
}

export default MediaListItem

const styles = StyleSheet.create({
  videoIcon: {
    position: 'absolute',
    color: 'white',
    fontSize: 24,
    zIndex: 1,
    top: 10,
    left: 10
  }
})
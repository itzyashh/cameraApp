import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Index() {
  return (
    <View
      style={styles.container}
    >
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
    justifyContent: 'center',
    alignItems: 'center',
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

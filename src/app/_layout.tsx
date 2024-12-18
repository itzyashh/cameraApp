import { Slot, Stack } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="camera" options={{ headerShown: false }} />
    </Stack>
  )
}

import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: true, title: "" }}>
      <Stack.Screen
        name="index"
        options={{ title: "Settings" }} />
    </Stack>
  );
}
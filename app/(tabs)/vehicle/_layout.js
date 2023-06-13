import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false, title: "" }}>
      <Stack.Screen
        name="vehicleList"
        options={{ title: "Vehicles" }} />
    </Stack>
  );
}
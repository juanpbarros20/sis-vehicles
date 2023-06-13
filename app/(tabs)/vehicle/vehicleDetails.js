import { Stack } from "expo-router";
import { View, Text, Button } from "react-native";
import {  useRouter } from "expo-router";

export default function VehicleDetails() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Detail Screen" }} />
      <Text
        onPress={() => {
          // Go back to the previous screen using the imperative API.
          router.replace('/(tabs)/vehicle/vehicleList');
        }}
      >
        GO BACK
      </Text>
    </View>
  );
}
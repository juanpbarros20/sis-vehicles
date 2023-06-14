import { Link, Redirect, Stack, useRouter } from "expo-router";
import { View, Button, Pressable, Text, TouchableOpacity, SafeAreaView, Alert} from "react-native";
import { AuthStore, appSignOut } from "../../../store";



const Tab2Index = () => {
  const router = useRouter();
  return (
    <SafeAreaView  style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ headerShown: false, title: "Settings" }} />

      <Text style={{ fontFamily: "EncodeSansSemiCondensed_400Regular" }}>
        {AuthStore.getRawState().user?.email}
      </Text>
      <Text style={{ fontFamily: "EncodeSansSemiCondensed_700Bold" }}>
        {AuthStore.getRawState().user?.displayName}
      </Text>

      <Button
        onPress={async () => {
          const resp = await appSignOut();
          if (!resp?.error) {
            router.replace("/(auth)/login");
          } else {
            console.log(resp.error);
            Alert.alert("Logout Error", resp.error?.message);
          }
        }}
        title="LOGOUT"
      />
        <View>
        <Text>
          <Link href="/settings/newCar">Novo veiculo</Link>
        </Text>
      </View>

    </SafeAreaView>
    
    
  );
  
  
};
export default Tab2Index;
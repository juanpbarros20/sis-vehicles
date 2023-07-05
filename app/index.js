import { useRootNavigationState } from "expo-router";
import { useRouter, useSegments } from "expo-router";
import { AuthStore, initStore } from "../store";
import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";

const Index = () => {
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  const { initialized, isLoggedIn } = AuthStore.useState();

  useEffect(() => {
    if (!navigationState?.key || !initialized) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isLoggedIn && !inAuthGroup) {
      router.replace("/login");
    } else if (isLoggedIn && inAuthGroup) {
      router.replace("/");
    }
  }, [segments, navigationState?.key, initialized, isLoggedIn]);

  return (
    <View>
      {!navigationState?.key ? <Text>LOADING...</Text> : null}
    </View>
  );
};

export default Index;

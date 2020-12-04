import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from "expo-splash-screen";
import useDataBase from "./src/hooks/useDataBase";

export default function App() {

  SplashScreen.preventAutoHideAsync();

  const isLoadingComplete = useDataBase();

  // OCULTAR LA PANTALLA DEL SPLASH
  if(isLoadingComplete) SplashScreen.hideAsync();

  return (
    <View style={styles.container}>
      <Text>Hola aqui empezamos una nueva hisoria</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

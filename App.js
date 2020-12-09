import React from 'react';
import { View } from 'react-native';
import * as SplashScreen from "expo-splash-screen";
import useDataBase from "./src/hooks/useDateBase";
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack";
import { ContactsContextProvider } from './src/context/ContactsContext';
import ContactListScreen from "./src/Screen/ContactListScreen";
import ContactCreateScreen from "./src/Screen/ContactCreateScreen";


const Stack = createStackNavigator();

export default function App() {

  SplashScreen.preventAutoHideAsync();

  const isLoadingComplete = useDataBase();

  //OCULTAR LA PANTALLA DEL SPLASH
  if(isLoadingComplete) SplashScreen.hideAsync();

  return (
    <View style={{flex: 1}}>
      <ContactsContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="contactsList">
            <Stack.Screen name="contactsList" component={ContactListScreen} options={{headerShown:false}} />
            <Stack.Screen name="contactsCreate" component={ContactCreateScreen} options={{title:"Nuevo contacto",headerStyle:{backgroundColor:"#393e46"},headerTintColor:"white"}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ContactsContextProvider>
    </View>
  );
}
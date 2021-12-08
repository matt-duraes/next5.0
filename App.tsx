import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { Rajdhani_500Medium, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Background } from './src/components/Background';

import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

LogBox.ignoreLogs(['You are not currently signed in to Expo on your development machine.']);
LogBox.ignoreLogs([`Stack Navigator: 'headerMode="none"' is deprecated. Use 'headerShown: false' in 'screenOptions' instead.`]);
LogBox.ignoreLogs([`Error: Problem validating asset fields in app.json. Learn more: https://docs.expo.dev/`]);
LogBox.ignoreLogs([`Field: icon - cannot access file at './assets/nextup.jpg'./`]);
LogBox.ignoreLogs([`Couldn't publish because errors were found. (See logs above.) Please fix the errors and try again.`]);
LogBox.ignoreLogs([`Field: splash.image - cannot access file at './assets/nextup.jpg'.`]);

import { AuthProvider } from './src/hooks/auth';

import { Routes } from './src/routes';


export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  });
  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Background>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      <AuthProvider>
        < Routes />
      </AuthProvider>

    </Background>
  );
}
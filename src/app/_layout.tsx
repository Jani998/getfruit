import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/use-auth-context";
import AuthProvider from "../providers/auth-provider";
import CartProvider from '../providers/cart-provider';

function RootNavigator (){
  const {isLoggedIn, isLoading } = useAuthContext();

  console.log('isLoggedIn:', isLoggedIn, 'isLoading:', isLoading)
  
  if (isLoading) return null

  
  return (
    <Stack screenOptions={{ headerShown: false}}>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(auth)" options={{ headerShown: false}} />
      </Stack.Protected>
    </Stack>
  )
}


export default function RootLayout() {
  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden')        // esconde a barra
  }, [])
  
  return (
    <AuthProvider>
      <CartProvider>
        <RootNavigator />
        <StatusBar style="dark" />
      </CartProvider>
    </AuthProvider>
  )
}
  


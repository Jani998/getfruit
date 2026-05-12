import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false}}>
      <StatusBar style="auto" />
        <Stack.Screen name="login" options={{ headerShown: false}}/>
        <Stack.Screen name="registo" options={{ headerShown: false}}/>

    </Stack>
  )
}
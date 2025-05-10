import React from 'react'
import { View, SafeAreaView, StyleSheet } from 'react-native'
import { Stack } from 'expo-router'

import './global.css'

const RootLayout = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Stack>
          <Stack.Screen name='(auth)' options={{ headerShown: false }} />
          <Stack.Screen name='(app)' options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default RootLayout

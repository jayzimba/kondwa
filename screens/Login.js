import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../assets/Theme.js/colors'

const Login = () => {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
})
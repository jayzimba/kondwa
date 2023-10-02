import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { MyDrawer } from "./MyDrawer";

const HomeRedirector = () => {
  return (
    <NavigationContainer independent={true} style={styles.container}>
      <StatusBar style="dark-content" />
      <MyDrawer />
    </NavigationContainer>
  );
};

export default HomeRedirector

const styles = StyleSheet.create({})
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { MyDrawer } from "./screens/MyDrawer";
import DrawerContent from "./components/DrawerContent";
import {
  EvilIcons,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Locate from "./screens/Locate";
import Tenders from "./screens/Tenders";
import Home from "./screens/Home";
import Upload from "./screens/Upload";
import { Image } from "react-native";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer independent={true} style={styles.container}>
        <StatusBar style="dark-content" />
        <MyDrawer />
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

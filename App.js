import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
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
import { Provider } from "react-redux";
import store from "./Redux/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import HomeRedirector from "./screens/HomeRedirector";
import Admin from "./screens/Admin";
import CompanyProfile from "./screens/CompanyProfile";
import Customers from "./screens/Customers";
import Map from "./screens/Map";
import ViewRequests from './screens/ViewRequest';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer independent={true} style={styles.container}>
          <StatusBar style="dark-content" />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Home" component={HomeRedirector} />
            <Stack.Screen name="Dashboard" component={Admin} />
            <Stack.Screen name="CompanyProfile" component={CompanyProfile} />
            <Stack.Screen name="Customer" component={Customers} />
            <Stack.Screen name="Orders" component={Map} />
            <Stack.Screen name="ViewRequests" component={ViewRequests} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

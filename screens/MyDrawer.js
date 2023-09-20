import { Text, View, Image } from "react-native";
import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./Home";
import Locate from "./Locate";
import { StyleSheet } from "react-native";
import Tenders from "./Tenders";
import colors from "../assets/Theme.js/colors";
import Upload from "./Upload";
import {
  Ionicons,
  Entypo,
  FontAwesome,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DrawerContent from "../components/DrawerContent";

const Drawer = createDrawerNavigator();

export class MyDrawer extends Component {
  constructor(props) {
    super(props);
    this.bottomSheetRef = React.createRef();
    this.state = {
      visible: false,
    };
  }

  openDrawer = () => {
    this.props.navigation.openDrawer(); // Open the drawer when the icon is clicked
  };

  openMenu = () => {
    this.setState({ visible: true });
  };
  render() {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        style={styles.container}
        screenOptions={{
          activeTintColor: "red",
          headerTransparent: false,
          headerTitleStyle: {
            color: "rgba(255,255,255,0.0)",
          },
          drawerItemStyle: {
            borderEndColor: "red",
          },
          drawerActiveTintColor: colors.primary,
          drawerActiveBackgroundColor: "#fff",
          headerRight: () => (
            <Image
              style={{
                width: "40%",
                marginEnd: 25,
                height: "40%",
              }}
              source={require("../assets/wordlogo.png")}
            />
          ),
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
            drawerIcon: ({ color, size }) => (
              <Entypo name="home" color={color} size={20} />
            ),
          }}
        />

        <Drawer.Screen
          name="Locate"
          component={Locate}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="map" color={color} size={20} />
            ),
          }}
        />
        <Drawer.Screen
          name="Tender"
          component={Tenders}
          options={{
            drawerIcon: ({ color, size }) => (
              <FontAwesome5 name="trash" size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Upload"
          component={Upload}
          options={{
            drawerIcon: ({ color, size }) => (
              <FontAwesome5 name="upload" size={20} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

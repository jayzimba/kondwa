import React from "react";
import { StyleSheet, Text, View, Button, Share } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../assets/Theme.js/colors";

const DrawerContent = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.DrawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: "row",
                // justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar.Image source={require("../assets/logo2.png")} size={70} />
              <View style={{ flexDirection: "column", marginLeft: 15 }}>
                <Text style={styles.title}>{"name"}</Text>
                <Text style={styles.caption}>
                  260{"-"}
                  {"phone_number"}
                </Text>
                <Text style={styles.caption2}>{"email"}</Text>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={(color, size) => (
                <Ionicons name="ios-home-outline" size={22} color="black" />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            {/* <DrawerItem
              icon={(color, size) => (
                <View style={styles.drawerItem}>
                  <SimpleLineIcons name="bell" color={color} size={22} />
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>3</Text>
                  </View>
                </View>
              )}
              label="Notifications"
              onPress={() => {
                props.navigation.navigate("Notifications");
              }}
            ></DrawerItem> */}

            <DrawerItem
              icon={(color, size) => (
                <Ionicons name="map-outline" color={color} size={22} />
              )}
              label="Find Garbage Collectors"
              onPress={() => {
                props.navigation.navigate("Locate");
              }}
            />
            <DrawerItem
              icon={(color, size) => (
                <Ionicons name="trash" color={color} size={22} />
              )}
              label="My Requests"
              onPress={() => {
                props.navigation.navigate("Tender");
              }}
            />
            <DrawerItem
              icon={(color, size) => (
                <MaterialCommunityIcons name="upload" size={22} color={color} />
              )}
              label="Request Collection"
              onPress={() => {
                props.navigation.navigate("Upload");
              }}
            />
            <DrawerItem
              icon={(color, size) => (
                <Icon name="share-variant-outline" color={color} size={22} />
              )}
              label="Share App"
              onPress={() => console.log("share button clicked")}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  DrawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    backgroundColor: colors.primary,
    height: 130,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
    color: "white",
  },
  caption: {
    fontSize: 12,
    lineHeight: 14,
    color: "white",
  },
  caption2: {
    fontSize: 12,
    lineHeight: 14,
    color: "white",
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
  },
  rdrawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  badge: {
    backgroundColor: "#EE3855",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    position: "absolute",
    top: -2,
    right: -7,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
  },
});

export default DrawerContent;

import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../assets/Theme.js/colors";
import Lottie from "lottie-react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { TouchableOpacity } from "react-native";
import { Octicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome"; // Import an icon library of your choice
import { Ionicons, Entypo } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { ActivityIndicator } from "react-native-paper";
import KondwaGreen from "../components/KondwaGreen";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Alert } from "react-native";

const Admin = ({ navigation }) => {
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <ImageBackground
      source={require("../assets/images/bglogin3.png")}
      imageStyle={{
        resizeMode: "cover",
        flex: 1,
        borderRadius: 20,
      }}
      style={styles.container}
    >
      {/* <View
        style={{
          marginTop: 50,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 20,
            color: colors.light,
          }}
        >
          Enter Admin ID and Password
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.line}></View>
          <AntDesign
            name="idcard"
            size={24}
            color={colors.white}
            style={{ marginHorizontal: 5 }}
          />

          <TextInput
            placeholder="Admin User Name"
            fontSize={16}
            maxLength={9}
            value={user}
            selectionColor={colors.lightgray}
            marginHorizontal={10}
            returnKeyType="done"
            keyboardType="default"
            onChangeText={(user) => setUser({ user })}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <View style={styles.line}></View>
          <Entypo
            name="lock"
            size={20}
            color="white"
            style={{ marginHorizontal: 5 }}
          />
          <TextInput
            placeholder="Password"
            fontSize={16}
            marginHorizontal={10}
            maxLength={12}
            value={password}
            returnKeyType="done"
            autoCapitalize="none"
            keyboardType="default"
            selectionColor={colors.primary}
            secureTextEntry={true}
            width={100}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
      </View> */}

      <Text
        style={{
          color: colors.white,
          fontWeight: "bold",
          fontSize: 18,
          marginBottom: 20,
        }}
      >
        Admin Dashboard
      </Text>

      <TouchableOpacity
        style={{
          padding: 15,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#eded",
          width: "50%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.secondary,
          marginVertical: 10,
        }}
        onPress={() => navigation.navigate("Orders")}
      >
        <Text
          style={{
            color: colors.white,
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          View Orders
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 15,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#eded",
          width: "50%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.secondary,
          marginVertical: 10,
        }}
        onPress={() => navigation.navigate("Customer")}
      >
        <Text
          style={{
            color: colors.white,
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          View Customers
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 15,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#eded",
          width: "50%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.secondary,
          marginVertical: 10,
        }}
        onPress={() => navigation.navigate("CompanyProfile")}
      >
        <Text
          style={{
            color: colors.white,
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Company Profile
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Admin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
    paddingTop: 50,
  },
  loginField: {
    height: "60%",
    width: "80%",
    backgroundColor: colors.white,
    borderRadius: 7,
    elevation: 7,
  },
  line: {
    marginVertical: 10,
    height: 25,
    width: 1,
    backgroundColor: "#fff",
  },
  signInBtn: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#eded",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  toSignUp: {
    alignItems: "center",
    justifyContent: "center",
  },
});

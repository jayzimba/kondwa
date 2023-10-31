import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Foundation,
  Entypo,
  EvilIcons,
  Feather,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../assets/Theme.js/colors";

const Orders = (props) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: 160,
        width: "98%",
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        elevation: 7,
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginHorizontal: 5,
        marginVertical: 5,
        padding: 5,
      }}
    >
      <TouchableOpacity
        style={{
          paddingBottom: 1,
          flexDirection: "row",
          marginBottom: 13,
          alignItems: "center",
        }}
      >
        <ImageBackground
          source={require("../assets/logo.jpg")}
          resizeMethod="resize"
          imageStyle={{ borderRadius: 10 }}
          style={{
            height: 70,
            width: 70,
            borderRadius: 10,
            marginEnd: 12,
          }}
        />
        <View
          style={{
            height: "100%",
            flex: 1,
            backgroundColor: "#fff",
            paddingEnd: 5,
          }}
        >
          <Text
            style={{
              color: "#000",
              fontWeight: "700",
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            ADH Garbage collectors
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="house" size={18} color="#000" />
            <Text
              style={{
                color: "#000",
                marginStart: 3,
              }}
            >
              {props.houseNumber}, {props.street}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", padding: 3, alignItems: "center" }}
          >
            <MaterialCommunityIcons name="home-city" size={18} color="black" />
            <Text
              style={{
                color: "#000",
                marginStart: 3,
              }}
            >
              {props.city}, Zambia
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", padding: 3, alignItems: "center" }}
          >
            <Entypo name="trash" size={18} color="black" />
            <Text
              style={{
                color: "#000",
                marginStart: 3,
              }}
            >
              {props.type}, Materials
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 2,
              alignItems: "center",
              justifyContent: "space-between",
              bottom: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons name="date-range" size={18} color="black" />
                <Text
                  style={{
                    color: "#000",
                    marginStart: 3,
                  }}
                >
                  {props.date}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                marginVertical: 5,
                alignItems: "center",
                borderWidth: 0.5,
                padding: 3,
                borderRadius: 20,
              }}
            >
              <FontAwesome
                name="map-marker"
                size={24}
                color={colors.secondary}
              />
              <Text
                style={{
                  color: "gray",
                  fontSize: 16,
                  fontWeight: "500",
                  marginHorizontal: 5,
                }}
              >
                Locate
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({});

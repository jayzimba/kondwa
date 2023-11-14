import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../assets/Theme.js/colors";

const CustomerCard = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 10,
        borderBottomWidth: 0.6,
        paddingBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.6,
        shadowOffset: {
          width: 6,
          height: 6,
        },
        marginBottom: 20,
      }}
    >
      <View>
        <Text style={{ color: colors.black, fontWeight: "500", fontSize: 20 }}>
          {props.name}
        </Text>
        <Text style={{ color: colors.gray, fontWeight: "300", fontSize: 18 }}>
          {props.email}
        </Text>
      </View>
      <View>
        <Text>{props.city}</Text>
      </View>
    </View>
  );
};

export default CustomerCard;

const styles = StyleSheet.create({});

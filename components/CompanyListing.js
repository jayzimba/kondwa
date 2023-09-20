import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../assets/Theme.js/colors";
import { Caption } from "react-native-paper";
import { ImageBackground } from "react-native";

const CompanyListing = (props) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/logo2.png")}
        resizeMethod="resize"
        style={{
          height: 70,
          width: 70,
          borderRadius: 10,
          marginEnd: 20,
        }}
      />
      <View>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.address}>{props.address}</Text>
        <Text style={styles.contact}>{props.email}</Text>
        <Caption style={styles.contact}>{props.contact}</Caption>
        <Text>
          Minimum Per Week: <Text style={styles.amount}>K{props.price}</Text>
        </Text>
      </View>
    </View>
  );
};

export default CompanyListing;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 10,
    elevation: 8,
    marginVertical: 7,
    borderWidth: 0.6,
    borderColor: colors.secondary,
    paddingVertical: 10,
    paddingEnd: 10,
    height: 150,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  address: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.gray,
  },
  contact: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.gray,
  },
  amount: {
    marginTop: 15,
    fontWeight: "bold",
    fontSize: 20,
    color: colors.black,
  },
});

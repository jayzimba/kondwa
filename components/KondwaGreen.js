import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../assets/Theme.js/colors";

const KondwaGreen = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginHorizontal: 5,
        paddingHorizontal: 5,
        borderRadius: 3,
      }}
    >
      <Text style={styles.kondwa}>Kondwa</Text>
      <Text style={styles.Green}>Green</Text>
    </View>
  );
};

export default KondwaGreen;

const styles = StyleSheet.create({
  kondwa: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 18,
  },
  Green: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 18,
  },
});

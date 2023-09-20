import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from 'react';
import colors from "../assets/Theme.js/colors";
import Lottie from "lottie-react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { TouchableOpacity } from "react-native";
import { Octicons, MaterialIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome"; // Import an icon library of your choice

import KondwaGreen from "../components/KondwaGreen";
import { useNavigation } from "@react-navigation/native";

const dataArray = [
  { text: "Plastic", iconName: "trash" },
  { text: "Glass", iconName: "glass" },
  { text: "Paper", iconName: "book" },
  { text: "Bio", iconName: "trash" },
  { text: "Chemicals", iconName: "flask" },
  { text: "Gases", iconName: "fire" },
];

const SquareView = ({ item }) => {
  return (
    <View style={styles.square}>
      <Icon name={item.iconName} size={24} color={colors.primary} />
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );
};

const Home = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          backgroundColor: colors.light,
          borderRadius: 5,
          padding: 10,
          elevation: 8,
          paddingBottom: 20,
          marginVertical: 20,
          marginHorizontal: 7,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={
                (styles.subHeading,
                { color: colors.primary, fontWeight: "bold", fontSize: 18 })
              }
            >
              Try
            </Text>
            <KondwaGreen />
            <Text
              style={
                (styles.subHeading,
                { color: colors.primary, fontWeight: "bold", fontSize: 18 })
              }
            >
              Today
            </Text>
          </View>
          <Octicons name="trash" size={22} color={colors.primary} />
        </View>
        <Text>
          <Text
            style={{
              color: colors.gray,
              fontWeight: "400",
              textAlign: "justify",
            }}
          >
            your trusted partner in maintaining a cleaner, greener, and
            healthier environment. We're here to revolutionize garbage
            collection and make it effortless for you.
          </Text>
        </Text>
        <TouchableOpacity
          style={{
            width: 170,
            backgroundColor: colors.secondary,
            padding: 10,
            borderRadius: 5,
            flexDirection: "row",
            marginTop: 20,
          }}
          onPress={() => navigation.navigate("Upload")}
        >
          <Text style={{ color: colors.white }}>Request Collection</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.subHeading}>What We Collect</Text>
      <View style={{ marginVertical: 20 }}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollViewContent}
          showsHorizontalScrollIndicator={false}
        >
          {dataArray.map((item, index) => (
            <SquareView key={index} item={item} />
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          width: "100%",
          height: 0.5,
          backgroundColor: colors.lightgray,
        }}
      ></View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Text
          style={[
            styles.subHeading,
            {
              flex: 1,
              justifyContent: "center",
              fontSize: 22,
              textDecorationLine: "underline",
            },
          ]}
        >
          Save the planet
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            height: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Lottie
            source={require("./global.json")}
            width={400}
            height={150}
            autoPlay
            loop
          />
        </View>
        <View style={{ color: colors.gray }}>
          <Text style={styles.subHeading}>Our Services</Text>
          <Text
            style={{
              color: colors.gray,
              fontSize: 14,
              textAlign: "justify",
            }}
          >
            <Text style={{ color: colors.secondary, fontWeight: "400" }}>
              Residential Pickup:
            </Text>{" "}
            Leave the dirty work to us. We'll collect your household waste,
            keeping your neighborhood pristine.
            {"\n\n"}
            <Text style={{ color: colors.secondary, fontWeight: "400" }}>
              Commercial Solutions:
            </Text>{" "}
            We offer tailored waste management solutions for businesses of all
            sizes. Focus on your work while we take care of your waste.{"\n\n"}
            <Text style={{ color: colors.secondary, fontWeight: "400" }}>
              Community Cleanups:
            </Text>{" "}
            Join us in organizing local cleanups to make a significant impact on
            the environment.
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: colors.secondary,
          padding: 10,
          borderRadius: 5,
          flexDirection: "row",
          marginTop: 20,
          justifyContent: "center",
          marginTop: 30,
        }}
        onPress={() => navigation.navigate("Tender")}
      >
        <Text style={{ color: colors.white }}>Check Pending Collections</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Home;

const squareSize = 80; // Adjust the size of the square views as needed

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
  scrollViewContent: {
    marginBottom: 15,
  },
  square: {
    width: squareSize,
    height: squareSize,
    backgroundColor: colors.light, // Change the background color as desired
    borderRadius: 5, // To make it a circle, set borderRadius to half the width/height
    margin: 10, // Adjust the margin as needed
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  text: {
    color: colors.primary, // Change the text color as desired
    fontSize: 16, // Adjust the font size as needed
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 20,
    color: colors.black,
  },
  para: {
    marginEnd: 10,
    textAlign: "justify",
  },
});

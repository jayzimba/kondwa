import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../assets/Theme.js/colors";
import { ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";

const CompanyDetails = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, name, address, contact, email, min_per_week, city, description } =
    route.params;
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/garbagecollector.jpg")}
        imageStyle={{
          resizeMode: "cover",
          height: "100%",
          // position: "relative",
          borderRadius: 20,
        }}
        style={{
          backgroundColor: "#dcdcdd",
          width: "100%",
          height: "30%",
          borderRadius: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            width: "100%",
            height: "100%",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              borderRadius: 5,
              fontSize: 28,
              fontWeight: "bold",
              color: "#fff",
              textAlign: "center",
              marginHorizontal: 10,
            }}
          >
            {name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Locate")}
          style={{
            margin: 13,
            backgroundColor: colors.secondary,
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            borderRadius: 40 / 2,
          }}
        >
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>
      </ImageBackground>

      <ScrollView
        showsVerticalScrollIndicator={false}
        horizontal={false}
        style={{
          backgroundColor: colors.white,
          height: "20%",
          marginTop: -40,
          borderTopWidth: 2,
          borderRightWidth: 2,
          borderLeftWidth: 2,
          borderTopWidth: 2,
          borderColor: colors.primary,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 7,
          padding: 20,
          paddingTop: 30,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            marginBottom: 10,
          }}
        >
          Company Details
        </Text>

        <View style={{ minHeight: 150 }}>
          <Text
            style={{
              marginHorizontal: 3,
              color: "#848484",
              marginTop: 15,
              lineHeight: 20,
              textAlign: "justify",
            }}
          >
            {description}
          </Text>
        </View>

        <View style={{ justifyContent: "space-between" }}>
          <View style={{ marginTop: 15 }}>
            <Text style={styles.heading}>Address</Text>
            <Text style={styles.subheading}>{address}</Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={styles.heading}>Contact</Text>
            <Text style={styles.subheading}>
              Tel: {contact} email: {email}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              width: "50%",
              fontSize: 12,
              color: colors.lightgray,
              textAlign: "center",
            }}
          >
            For {name} company to start collecting your garbage
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: colors.secondary,
              borderRadius: 70,
              elevation: 5,
              width: 160,
              height: 60,
              marginVertical: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => console.log("registered")}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                color: "#fff",
              }}
            >
              Subscribe
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CompanyDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 7,
    paddingTop: 10,
    paddingBottom: 5,
  },
  heading: {
    marginHorizontal: 10,
    color: "#000",
    lineHeight: 18,
    textAlign: "justify",
  },
  subheading: {
    marginHorizontal: 10,
    color: "#848484",
    lineHeight: 18,
    textAlign: "justify",
  },
});

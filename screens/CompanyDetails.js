import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { PayWithFlutterwave } from "flutterwave-react-native";
import React, { useState } from "react";
import { ActivityIndicator, Alert, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import colors from "../assets/Theme.js/colors";

interface RedirectParams {
  status: "successful" | "cancelled";
  transaction_id?: string;
  tx_ref: string;
}

const CompanyDetails = (props) => {
  const customer = useSelector((state) => state.customer);
  const [customerID, setCustomerID] = useState(customer[0].id);
  const [customerName, setCustomerName] = useState(customer[0].name);
  const [customerEmail, setCustomerEmail] = useState(customer[0].email);
  const [customerPhone, setCustomerPhone] = useState(customer[0].phone);
  const [activityLoader, setActivityLoader] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { id, name, address, contact, email, min_per_week, city, description } =
    route.params;

  const handleOnRedirect = (data: RedirectParams) => {
    if (data.status == "cancelled") {
      Alert.alert(
        "Transaction Cancelled",
        "your transaction was incomplete try again later"
      );
    } else if (data.status == "successful") {
      HandleSubscribe();
    }
  };

  /* An example function to generate a random transaction reference */
  const generateTransactionRef = (length: number) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `flw_tx_ref_${result}`;
  };

  const HandleSubscribe = async () => {
    setActivityLoader(true);
    var formData = new FormData();

    formData.append("customerID", customerID);
    formData.append("companyID", id);

    var requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };

    fetch("https://www.pezabond.com/kondwani/subscribe.php", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success == true) {
          Alert.alert(
            "Subscribed Successfully",
            "You have been Subscribed with " + name
          );
        } else {
          Alert.alert("An Error Occured", "failed to suscribe with" + name);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => setActivityLoader(false));
  };

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

          <PayWithFlutterwave
            onRedirect={handleOnRedirect}
            options={{
              tx_ref: generateTransactionRef(10),
              authorization: "FLWPUBK-aa9cc71e514393d4bfc408610089dcf2-X",
              customer: {
                email: "kondwa940@gmail.com",
                phone_number: "0964360071",
                name: "geoffrey zimba",
              },
              amount: parseFloat(min_per_week),
              currency: "ZMW",
              payment_options: "ussd, card",
            }}
            customButton={(props) => (
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
                onPress={props.onPress}
                isBusy={props.isInitializing}
                disabled={false}
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
            )}
          ></PayWithFlutterwave>
        </View>

        <View style={{ justifyContent: "center" }}>
          {activityLoader == true ? (
            <ActivityIndicator color={colors.primary} size={35} />
          ) : null}
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

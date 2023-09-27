import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Alert,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import colors from "../assets/Theme.js/colors";
import Lottie from "lottie-react-native";
import { TouchableOpacity } from "react-native";
import { Octicons, MaterialIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome"; // Import an icon library of your choice
import { useNavigation } from "@react-navigation/native";
import KondwaGreen from "../components/KondwaGreen";
import {
  TextInput,
  Button,
  Text,
  Colors,
  Switch,
  ActivityIndicator,
  Avatar,
  Caption,
} from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import RBSheet from "react-native-raw-bottom-sheet";
import { JumpingTransition } from "react-native-reanimated";
import * as ImageManipulator from "expo-image-manipulator";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Location from "expo-location";

const SquareView = ({ item, onPress, isPressed }) => {
  const backgroundColor = isPressed ? colors.secondary : colors.light; // Change the color when pressed
  const color = isPressed ? colors.white : colors.primary; // Change the color when pressed

  return (
    <TouchableOpacity
      style={[styles.square, { backgroundColor }]}
      onPress={() => {
        onPress(item.text);
      }}
    >
      <Icon name={item.iconName} size={24} color={color} />
      <Text style={[styles.text, { color }]}>{item.text}</Text>
    </TouchableOpacity>
  );
};

const Upload = () => {
  const refRBSheet = useRef();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords); // Store latitude and longitude in state
    })();
  }, []);

  const [selectedCity, setSelectedCity] = useState(null);
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isLocationSend, setIsLocationSend] = useState(false); // State for the switch
  const [request, setRequested] = useState(false); // State for the switch
  const [imageUri, setImageUri] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  const handleDateChange = (event, selectedDate) => {
    if (event.type === "set") {
      // Handle the selected date (e.g., store it in state)
      setDate(selectedDate);
      setShowDatePicker(Platform.OS === "ios"); // Close the picker on iOS
    } else {
      setShowDatePicker(false); // Close the picker on Android if canceled
    }
  };
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed

    return `${year}-${month}-${day}`;
  };

  const formatedDate = formatDate(date);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
      console.log(imageUri);
    }
  };

  const dataArray = [
    { text: "Plastic", iconName: "trash" },
    { text: "Glass", iconName: "glass" },
    { text: "Paper", iconName: "book" },
    { text: "Bio", iconName: "trash" },
    { text: "Chemical", iconName: "flask" },
    { text: "Gases", iconName: "fire" },
  ];
  const [pressedItem, setPressedItem] = useState(null);
  const handlePress = (text) => {
    setPressedItem(text);
  };

  const handleRequest = async () => {
    setRequested(true);
    var formData = new FormData();

    formData.append("city", selectedCity);
    formData.append("street", street);
    formData.append("houseNumber", houseNumber);
    formData.append("date", formatedDate);
    formData.append("phoneNumber", phoneNumber);
    formData.append("email", email);
    formData.append("garbageType", pressedItem);
    formData.append("isLocationSend", isLocationSend ? 1 : 0); // Convert boolean to 1 or 0
    formData.append("latitude", location.latitude);
    formData.append("longitude", location.longitude);

    var requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };

    if (
      pressedItem == null ||
      selectedCity == null ||
      street == null ||
      houseNumber == null ||
      phoneNumber == null
    ) {
      Alert.alert(
        "Missing Fields",
        "Complete the form to process your request"
      );
      setImageUri(null);
      refRBSheet.current.close();
      setRequested(false);
    } else {
      fetch("https://www.pezabond.com/kondwani/request.php", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.success == true) {
            Alert.alert(
              "Pick Up Request Submitted",
              "your registered garbage collection company will ccontact you to verify details"
            );
            setRequested(false);
            setSelectedCity(null);
            setStreet(null);
            setEmail(null);
            setPhoneNumber(null);
            setHouseNumber(null);
            setIsLocationSend(false);
            refRBSheet.current.close();
            console.log("inserted");
          } else {
            console.log("failed");
          }
        })
        .catch((error) => console.log("error", error))
        .finally(() => setRequested(false));
    }
  };

  const placeholder = {
    label: "* Select your city...",
    value: null,
    color: colors.gray,
  };

  const cities = [
    { label: "Ndola", value: "ndola" },
    { label: "Kitwe", value: "kitwe" },
    { label: "Chingola", value: "chingola" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          backgroundColor: colors.white,
          borderRadius: 5,
          padding: 10,
          elevation: 8,
          paddingBottom: 20,
        }}
      >
        <Text style={styles.subHeading}>Select garbadge category</Text>
        <View>
          <ScrollView
            horizontal
            contentContainerStyle={styles.scrollViewContent}
            showsHorizontalScrollIndicator={true}
          >
            {dataArray.map((item, index) => (
              <SquareView
                key={index}
                item={item}
                onPress={handlePress}
                isPressed={item.text === pressedItem}
              />
            ))}
          </ScrollView>
        </View>

        <View>
          <ScrollView contentContainerStyle={styles.container}>
            <View
              style={{
                borderBottomWidth: 0.6,
                borderColor: colors.black,
                borderRadius: 8,
                marginBottom: 10,
              }}
            >
              <RNPickerSelect
                placeholder={placeholder}
                items={cities}
                onValueChange={(value) => setSelectedCity(value)}
                style={{
                  fontSize: 16,
                  paddingHorizontal: 10,
                  paddingVertical: 8,

                  color: "black",
                  paddingRight: 30,
                }}
                value={selectedCity}
              />
            </View>
            <TextInput
              label={<Text style={{ color: colors.lightgray }}>* Street</Text>}
              value={street}
              onChangeText={(text) => setStreet(text)}
              style={styles.input}
              theme={{
                colors: {
                  primary: colors.primary,
                  underlineColor: "transparent",
                },
              }}
            />
            <TextInput
              label={
                <Text style={{ color: colors.lightgray }}>* House number</Text>
              }
              value={houseNumber}
              onChangeText={(text) => setHouseNumber(text)}
              style={styles.input}
              theme={{
                colors: {
                  primary: colors.primary,
                  underlineColor: "transparent",
                },
              }}
            />
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                label="Date of Pick-up"
                value={formatedDate}
                onChangeText={(text) => setDate(text)}
                style={styles.input}
                theme={{
                  colors: {
                    primary: colors.primary,
                    underlineColor: "transparent",
                  },
                }}
                editable={false}
              />
            </TouchableOpacity>
            <TextInput
              label={
                <Text style={{ color: colors.lightgray }}>* Phone number</Text>
              }
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              style={styles.input}
              keyboardType="numeric"
              theme={{
                colors: {
                  primary: colors.primary,
                  underlineColor: "transparent",
                },
              }}
            />
            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              theme={{
                colors: {
                  primary: colors.primary,
                  underlineColor: "transparent",
                },
              }}
              keyboardType="email-address"
            />

            <View>
              {errorMsg ? (
                <Text>{errorMsg}</Text>
              ) : location ? (
                <View style={styles.switchContainer}>
                  <Text style={styles.switchLabel}>
                    Use Current Location as pickup point
                  </Text>
                  <Switch
                    value={isLocationSend}
                    onValueChange={(value) => {
                      if (value == true) {
                        Alert.alert(
                          "Share location",
                          "Your location coords will be sent to the garbage collection"
                        );
                        setIsLocationSend(value);
                      } else {
                        setIsLocationSend(value);
                      }
                    }}
                    trackColor={{ false: "#767577", true: colors.primary }}
                    thumbColor={isLocationSend ? "#f4f3f4" : "#f4f3f4"}
                  />
                </View>
              ) : (
                <Text>Fetching location...</Text>
              )}
            </View>

            <Button
              mode="contained"
              onPress={() => refRBSheet.current.open()}
              style={styles.button}
              color={colors.primary}
              labelStyle={{ color: "white" }}
            >
              Request Pickup
            </Button>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date" // Set the mode to "date" for date selection
                display="default" // Android specific display options (default, spinner, calendar)
                onChange={handleDateChange}
              />
            )}

            <RBSheet
              ref={refRBSheet}
              height={Dimensions.get("window").height * 0.65}
              closeOnDragDown={true}
              closeOnPressMask={true}
              customStyles={{
                wrapper: {
                  backgroundColor: "rgba(0,0,0,0.2)",
                },
                draggableIcon: {
                  backgroundColor: colors.lightgray,
                },
                container: {
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                },
              }}
            >
              <View style={{ padding: 7 }}>
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={[
                      styles.subHeading,
                      { fontSize: 18, fontWeight: "700" },
                    ]}
                  >
                    Upload garbage picture
                  </Text>
                </View>

                <View
                  style={{
                    width: "100%",
                    height: 0.3,
                    backgroundColor: colors.lightgray,
                    marginVertical: 10,
                  }}
                ></View>

                {imageUri && (
                  <View style={{ alignItems: "center", marginVertical: 10 }}>
                    <Image source={{ uri: imageUri }} style={styles.image} />
                  </View>
                )}
                {hasPermission === false && (
                  <Text>No access to camera roll</Text>
                )}

                <View
                  style={{
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={pickImage}
                    style={{
                      borderWidth: 2,
                      borderColor: colors.secondary,
                      paddingVertical: 10,
                      borderRadius: 30,
                      justifyContent: "center",
                      alignItems: "center",
                      width: "90%",
                    }}
                  >
                    <Text
                      style={[
                        styles.subHeading,
                        { color: colors.secondary, fontSize: 16 },
                      ]}
                    >
                      Pick Image from Gallery
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleRequest}
                    style={
                      !request
                        ? {
                            backgroundColor: colors.secondary,
                            paddingVertical: 10,
                            borderRadius: 30,
                            justifyContent: "center",
                            alignItems: "center",
                            width: "90%",
                            marginTop: 20,
                          }
                        : {
                            backgroundColor: colors.gray,
                            paddingVertical: 10,
                            borderRadius: 30,
                            justifyContent: "center",
                            alignItems: "center",
                            width: "90%",
                            marginTop: 20,
                          }
                    }
                    disabled={request}
                  >
                    <Text
                      style={[
                        styles.subHeading,
                        { color: "white", fontSize: 18 },
                      ]}
                    >
                      Request Now
                    </Text>
                  </TouchableOpacity>
                </View>
                {request && (
                  <ActivityIndicator
                    style={{ marginVertical: 10 }}
                    color={colors.primary}
                  />
                )}
              </View>
            </RBSheet>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default Upload;
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
    marginVertical: 10,
    color: colors.black,
  },
  para: {
    marginEnd: 10,
    textAlign: "justify",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "white",
  },
  button: {
    marginTop: 16,
    padding: 10,
    backgroundColor: "#F78f1E",
  },
  button2: {
    marginTop: 16,
    padding: 10,
    backgroundColor: colors.gray,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchLabel: {
    flex: 1,
    fontSize: 12,
    color: colors.black,
  },
  textDes: {
    marginTop: 2,
  },
  camera: {
    width: 300,
    height: 300,
  },
  image: {
    width: 300,
    height: 230,
    marginTop: 3,
    borderRadius: 20,
    alignItems: "center",
  },
  datePicker: {
    width: 200,
  },
  selectedDate: {
    marginTop: 20,
    fontSize: 16,
  },
});

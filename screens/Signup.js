import React, { Component } from "react";
import colors from "../assets/Theme.js/colors";
import {
  StyleSheet,
  Text,
  Button,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { ActivityIndicator } from "react-native-paper";
import { connect } from "react-redux";
import { setCustomer } from "../Redux/customerSlice";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      city: "",
      street: "",
      phone: "",
      password: "",
      activityLoader: false,
      incorrectCredentials: false,
      isLoading: false, // Track login loading state
      userData: null, // Store user data upon successful login
      otp: "",
      enteredOtp: "",
      isSignedUp: false,
      customer: [],
    };
  }

  RegDataInDB = () => {
    this.setState({
      loading: true,
    });
    var name = this.state.name;
    var email = this.state.email;
    var city = this.state.city;
    var street = this.state.street;
    var phone = this.state.phone;
    var password = this.state.password;

    // Alert.alert("Credentials", name + " " + email + " " + city + " " + street);

    // if (
    //   name.length == 0 ||
    //   email.length == 0 ||
    //   phone.length == 0 ||
    //   email.length == 0 ||
    //   city.length == 0 ||
    //   street.length == 0 ||
    //   password.length == 0
    // ) {
    //   Alert.alert("Missing Field", "Required Field Is Missing!");
    //   this.setState({
    //     incorrectCredentials: true,
    //   });
    // } else
    if (password.length < 8) {
      Alert.alert(
        "password Requirement",
        "Password Minimum 8 characters required!!!"
      );
    } else {
      var formdata = new FormData();
      formdata.append("name", name);
      formdata.append("email", email);
      formdata.append("city", city);
      formdata.append("street", street);
      formdata.append("phone", phone);
      formdata.append("password", password);

      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch("https://www.pezabond.com/kondwani/SignUp.php", requestOptions)
        .then((Response) => Response.json())
        .then((Response) => {
          if (Response[0].Message == "Registered successfully!") {
            this.setState({
              incorrectCredentials: false,
              loading: false,
              isSignedUp: true,
              name: "",
              email: "",
              city: "",
              street: "",
              phone: "",
              password: "",
            });
            Alert.alert("Successful", "Registered Successfully");
          } else if (Response[0].Message == "User Already Registered") {
            this.setState({
              incorrectCredentials: false,
              loading: false,
              isSignedUp: false,
            });
            Alert.alert(
              "There is an account for this credentials",
              "seems there is an account already registered by this persaon"
            );
          }
        })
        .catch((error) => {
          Alert.alert("ERROR:" + error);
        })
        .finally(() => {
          console.log("finally");
        });
    }
  };

  render() {
    const { navigation } = this.props;

    return (
      <>
        <StatusBar style="auto" />
        <ImageBackground
          source={require("../assets/images/bglogin3.png")}
          imageStyle={{
            resizeMode: "cover",
            height: "100%",
            borderRadius: 20,
          }}
          style={styles.container}
        >
          <View
            style={{
              width: "90%",
              alignItems: "flex-start",
              paddingVertical: 20,
            }}
          >
            <Text
              style={{ color: colors.white, fontWeight: "500", fontSize: 28 }}
            >
              Sign Up Now
            </Text>
            <Text style={{ color: colors.light, fontSize: 14 }}>
              Create a new
            </Text>
          </View>
          <View style={styles.loginField}>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                paddingVertical: 20,
              }}
            >
              <Image
                style={{
                  width: 150,
                  height: 30,
                }}
                source={require("../assets/wordlogo.png")}
              />
            </View>
            <View
              style={{
                width: "90%",
                marginHorizontal: 20,
                paddingVertical: 15,
              }}
            >
              <Animatable.View animation="fadeInUp" duration={1000}>
                <KeyboardAvoidingView>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 10,
                    }}
                  >
                    <View style={styles.line}></View>

                    <TextInput
                      placeholder="Full name"
                      fontSize={16}
                      value={this.state.name}
                      marginHorizontal={10}
                      returnKeyType="done"
                      autoCapitalize="none"
                      keyboardType="default"
                      selectionColor={colors.primary}
                      onChangeText={(name) => this.setState({ name: name })}
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

                    <TextInput
                      placeholder="Email"
                      fontSize={16}
                      marginHorizontal={10}
                      value={this.state.email}
                      returnKeyType="done"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      selectionColor={colors.primary}
                      onChangeText={(email) => this.setState({ email: email })}
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

                    <TextInput
                      placeholder="City"
                      fontSize={16}
                      marginHorizontal={10}
                      value={this.state.city}
                      returnKeyType="done"
                      autoCapitalize="none"
                      keyboardType="default"
                      selectionColor={colors.primary}
                      onChangeText={(city) => this.setState({ city: city })}
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

                    <TextInput
                      placeholder="Street"
                      fontSize={16}
                      marginHorizontal={10}
                      value={this.state.Street}
                      returnKeyType="done"
                      autoCapitalize="none"
                      keyboardType="default"
                      selectionColor={colors.primary}
                      onChangeText={(street) =>
                        this.setState({ Street: street })
                      }
                    />
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={styles.line}></View>
                    <Entypo
                      name="phone"
                      size={20}
                      color="black"
                      style={{ marginHorizontal: 5 }}
                    />
                    <Text style={{ marginLeft: 5 }}>+260</Text>
                    <TextInput
                      placeholder="Enter your mobile number"
                      fontSize={16}
                      maxLength={9}
                      value={this.state.phone}
                      selectionColor={colors.primary}
                      marginHorizontal={10}
                      returnKeyType="done"
                      keyboardType="phone-pad"
                      onChangeText={(phone) => this.setState({ phone: phone })}
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
                      color="black"
                      style={{ marginHorizontal: 5 }}
                    />
                    <TextInput
                      placeholder="Password"
                      fontSize={16}
                      marginHorizontal={10}
                      maxLength={12}
                      value={this.state.password}
                      returnKeyType="done"
                      autoCapitalize="none"
                      keyboardType="default"
                      selectionColor={colors.primary}
                      secureTextEntry={true}
                      onChangeText={(password) =>
                        this.setState({ password: password })
                      }
                    />
                  </View>

                  {this.state.incorrectCredentials && (
                    <Text style={{ color: "red", justifyContent: "center" }}>
                      missing fields credentials
                    </Text>
                  )}
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 40,
                    }}
                  >
                    <TouchableOpacity
                      style={styles.signInBtn}
                      disabled={this.state.activityLoader}
                      onPress={() => {
                        this.RegDataInDB();
                      }}
                    >
                      {this.state.activityLoader ? (
                        <ActivityIndicator color="white" />
                      ) : (
                        <Text
                          style={{
                            fontWeight: "600",
                            fontSize: 18,
                            color: "#fff",
                          }}
                        >
                          Sign Up
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 30,
                    }}
                  >
                    <TouchableOpacity
                      style={styles.toSignUp}
                      onPress={() => navigation.navigate("Login")}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#000",
                          fontWeight: "500",
                          textDecorationLine: "underline",
                          paddingBottom: 10,
                        }}
                      >
                        Already have an account?
                      </Text>
                    </TouchableOpacity>
                  </View>
                </KeyboardAvoidingView>
              </Animatable.View>
            </View>
          </View>
          <Text style={{ marginTop: 30, color: colors.lightgray }}>
            Version 1.0
          </Text>
        </ImageBackground>
      </>
    );
  }
}

export default connect()(Signup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginField: {
    width: "80%",
    backgroundColor: colors.white,
    borderRadius: 7,
    elevation: 7,
  },
  line: {
    marginVertical: 10,
    height: 25,
    width: 1,
    backgroundColor: "#000",
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

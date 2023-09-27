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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isSuccessful: false,
      phone: "",
      password: "",
      incorrectCredentials: false,
      userData: null, // Store user data upon successful login
      otp: "",
      enteredOtp: "",
      customer: [],
    };
  }

  // Inside your class component
  setCustomerData = (customerData) => {
    const { dispatch } = this.props;
    // Dispatch the action to set 'customer' data in Redux
    dispatch(setCustomer(customerData));
  };

  LogDataInDB = async () => {
    var phone = this.state.phone;
    var password = this.state.password;

    if (phone.length == 0 || password.length == 0) {
      alert("Required Field Is Missing!");
    } else {
      var formdata = new FormData();
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

      fetch("https://www.pezabond.com/kondwani/login.php", requestOptions)
        .then((Response) => Response.json())
        .then((result) => {
          if (result[0] == "log in Failed!") {
            this.setState({ customer: [] });
            this.setState((prevState) => ({
              isLoading: false, // Toggle the state
              incorrectCredentials: true,
            }));
            console.log("incorrect password");
          } else {
            this.setState((prevState) => ({
              isLoading: true, // Toggle the state
              incorrectCredentials: false,
            }));
            this.setState({ customer: result });

            this.setState((prevState) => ({
              isLoading: false, // Toggle the state
            }));
            this.setState({ isSuccessful: true });
            this.setCustomerData(result);
            this.props.navigation.navigate("Home");
          }
        })
        .catch((error) => {
          console.error("ERROR:" + error);
        })
        .finally(() =>
          this.setState({
            phone: "",
            password: "",
            isLoading: false, // Toggle the state
          })
        );
    }
  };

  setActivityLoader = () => {
    if (this.state.phone.trim() == "") {
      alert("phone number field is empty");
    } else if (this.state.password.trim() == "") {
      alert("password field can't be empty");
    } else {
      this.setState((prevState) => ({
        isLoading: true, // Toggle the state
      }));
      this.LogDataInDB();
    }
  };

  render() {
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
              Welcome
            </Text>
            <Text style={{ color: colors.light, fontSize: 14 }}>
              Log into your Account
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
                paddingVertical: 50,
              }}
            >
              <Animatable.View animation="fadeInUp" duration={1500}>
                <KeyboardAvoidingView>
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
                      selectionColor={colors.primary}
                      marginHorizontal={10}
                      returnKeyType="done"
                      keyboardType="phone-pad"
                      onChangeText={(phone) => this.setState({ phone })}
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
                      maxLength={8}
                      returnKeyType="done"
                      autoCapitalize="none"
                      keyboardType="default"
                      selectionColor={colors.primary}
                      secureTextEntry={true}
                      width={100}
                      onChangeText={(password) => this.setState({ password })}
                    />
                  </View>
                  {this.state.incorrectCredentials && (
                    <Text style={{ color: "red", justifyContent: "center" }}>
                      incorrect login credentials
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
                      disabled={this.state.isLoading}
                      onPress={this.setActivityLoader}
                    >
                      {this.state.isLoading == true ? (
                        <ActivityIndicator color="white" />
                      ) : (
                        <Text
                          style={{
                            fontWeight: "600",
                            fontSize: 18,
                            color: "#fff",
                          }}
                        >
                          Login
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
                      onPress={() => this.props.navigation.navigate("Sign up")}
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
                        Don't have an account?
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

export default connect()(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

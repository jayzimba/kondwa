import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import colors from "../assets/Theme.js/colors";
import { TouchableOpacity } from "react-native";

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
import Tenderlisting from "../components/Tenderlisting";
import CompanyListing from "../components/CompanyListing";
const Locate = () => {
  const [searchText, setSearchText] = useState("");

  const handleFilterData = (text) => {
    setSearchText(text);
  };
  const onClearInput = () => {
    setSearchText(""); // Clear the input text
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.searchBox}>
          <TextInput
            placeholder="search by name, city or type"
            clearButtonMode="always"
            autoCapitalize="none"
            fontSize={13}
            style={{ width: "90%" }}
            selectionColor={colors.primary} // Change this color
            value={searchText}
            onChangeText={handleFilterData}
          />
          {searchText !== "" && (
            <TouchableOpacity onPress={onClearInput}>
              <MaterialIcons name="cancel" size={24} color={colors.secondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Text style={{ marginTop: 2 }}>Results: </Text>
      <View style={{ marginTop: 20, paddingTop: 10 }}>
        <CompanyListing
          name="Kondwa Garbage Collectors"
          address="Ndola, plot 45"
          contact="+2603435655"
          email="company1@email.com"
          price={35}
        />

        <CompanyListing
          name="Kondwa Garbage Collectors"
          address="Ndola, plot 45"
          contact="+26021187676"
          email="company3@email.com"
          price={45}
        />
      </View>
    </View>
  );
};

export default Locate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
  },
  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,

    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

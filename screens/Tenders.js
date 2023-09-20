import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../assets/Theme.js/colors";
import Tenderlisting from "../components/Tenderlisting";
import { ScrollView } from "react-native-gesture-handler";

const Tenders = () => {
  return (
    <ScrollView style={styles.container}>
      <Tenderlisting
        street="Kalewa"
        houseNumber="45 Mwatiyanvwa"
        city="Ndola"
        type="Plastic"
        date="22-09-2023"
        pending={true}
      />
      <Tenderlisting
        street="Kalewa"
        houseNumber="45 James Phiri"
        city="Ndola"
        type="Metal"
        date="22-09-2023"
        pending={true}
      />
      <Tenderlisting
        street="Kalewa"
        houseNumber="45 James Phiri"
        city="Ndola"
        type="Metal"
        date="22-09-2023"
        pending={false}
      />
    


    </ScrollView>
  );
};

export default Tenders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
  },
});

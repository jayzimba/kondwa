import {
  StyleSheet,
  Text,
  View,
  TextInput,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
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
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterData = (text) => {
    setSearchText(text);
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.address.toLowerCase().includes(text.toLowerCase()) ||
        item.description.toLowerCase().includes(text.toLowerCase()) ||
        item.city.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.pezabond.com/kondwani/fetchAllCollectors.php"
      );
      const data = await response.json();
      setData(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onClearInput = () => {
    setSearchText(""); // Clear the input text
    setFilteredData(data); // Reset the filtered data to show all items
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
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
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id.toString()}
            horizontal={false}
            renderItem={({ item }) => (
              <View>
                <CompanyListing
                  id={item.id}
                  name={item.name}
                  address={item.address}
                  contact={item.contact}
                  email={item.email}
                  min_per_week={item.min_per_week}
                  city={item.city}
                  description={item.description}
                />
              </View>
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[colors.primary]} // Customize the loading indicator color
                tintColor={colors.primary} // Customize the loading indicator color
              />
            }
          />
        )}
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

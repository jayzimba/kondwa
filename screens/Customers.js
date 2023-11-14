import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../assets/Theme.js/colors";
import CustomerCard from "../components/CustomerCard";
import { RefreshControl } from "react-native";
import { FlatList } from "react-native";

const Customers = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    var formdata = new FormData();
    formdata.append("companyID", 1);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://www.pezabond.com/kondwani/fetchCustomers.php",
        requestOptions
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
      if (data.length <= 0) {
        setFetched(false);
      } else {
        setFetched(true);
      }
    }
  };
  const onRefresh = () => {
    fetchData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: colors.primary,
          marginBottom: 40,
        }}
      >
        Customers
      </Text>

      {loading && (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <CustomerCard
              name={item.name}
              email={item.email}
              city={item.city}
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
    </SafeAreaView>
  );
};

export default Customers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
});

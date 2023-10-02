import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../assets/Theme.js/colors";
import Tenderlisting from "../components/Tenderlisting";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native";
import { RefreshControl } from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";

const Tenders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fetched, setFetched] = useState(false);
  const customer = useSelector((state) => state.customer);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    var formdata = new FormData();
    formdata.append("customerID", customer[0].id);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://www.pezabond.com/kondwani/fetchRequests.php",
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
    <View style={styles.container}>
      <View
        style={{
          marginBottom: 20,
          backgroundColor: colors.secondary,
          borderRadius: 5,
        }}
      >
        <Text style={{ padding: 5, color: colors.white }}>
          <Text style={{ fontWeight: "bold" }}>Results: </Text> {data.length}
        </Text>
      </View>

      {data.length == 0 ? (
        <View>
          <Text>You have no requests</Text>
          <Text>Pull Down to refresh</Text>
        </View>
      ) : null}
      {loading ? (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : null}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Tenderlisting
              street={item.street}
              houseNumber={item.houseNumber}
              city={item.city}
              type={item.garbageType}
              date={item.date}
              pending={parseInt(item.status)}
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
    </View>
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

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { GOOGLE_API_KEY, Google_Maps_Key } from "../apiKeys";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import MapViewDirections from "react-native-maps-directions";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ViewRequests = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapRef = useRef();
  const route = useRoute();

  const { lat, long } = route.params;

  const [markers, setMarkers] = useState([
    { id: 1, latitude: -12.9615165, longitude: 28.631207, name: "merry beg" },
    {
      id: 2,
      latitude: -12.9424183,
      longitude: 28.6363413,
      name: "Flying Doctor",
    },
    { id: 3, latitude: -12.9703008, longitude: 28.631428, name: "ADH" },
    // Add more marker objects with latitude and longitude
  ]);

  const handleMarkerPress = (ambulance) => {
    setSelectedMarker(ambulance);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Location permission not granted");
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-circle-sharp"
            size={24}
            color="black"
            style={{
              padding: 40,
            }}
          />
        </TouchableOpacity>
      </View>
      {location ? (
        <MapView
          ref={mapRef}
          provider="google"
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: lat,
              longitude: long,
            }}
            title="Request Location"
            description="Pick up point"
            image={require("../assets/trash.png")}
          />
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
            description="You are here"
            // image={require("../../../assets/patient.png")}
          />

          {location && (
            <>
              <MapViewDirections
                origin={{
                  latitude: lat,
                  longitude: long,
                }}
                destination={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                mode="DRIVING"
                apikey={GOOGLE_API_KEY}
                strokeWidth={3}
                strokeColor="#124e78"
                optimizeWaypoints={true}
                onReady={(result) => {
                  mapRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: 60,
                      bottom: 100,
                      left: 60,
                      top: 100,
                    },
                  });
                }}
              />
            </>
          )}
        </MapView>
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text> Loading...</Text>
        </View>
      )}
    </View>
  );
};

export default ViewRequests;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

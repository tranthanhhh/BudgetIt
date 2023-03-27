import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const SettingsScreen = () => {
  const user = {
    name: "Test",
    email: "test@test.com",
    profilePicture: "https://via.placeholder.com/150",
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={{ uri: user.profilePicture }}
      />
      <Text style={styles.profileName}>{user.name}</Text>
      <Text style={styles.profileEmail}>{user.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileEmail: {
    fontSize: 16,
    color: "#444",
  },
});

export default SettingsScreen;

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import axios from "axios";

const AccountScreen = ({ userId, signOut }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    profilePicture: "https://via.placeholder.com/150",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${userId}`
        );
        const userData = response.data;
        setUser({
          ...user,
          name: userData.name,
          email: userData.email,
        });
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, [userId]);
  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={{ uri: user.profilePicture }}
      />
      <Text style={styles.profileName}>{user.name}</Text>
      <Text style={styles.profileEmail}>{user.email}</Text>
      <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
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
  signOutButton: {
    backgroundColor: "#EF5354",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  signOutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default AccountScreen;

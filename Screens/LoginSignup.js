import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const LoginSignup = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleSubmit = () => {
    // handle login/signup
    console.log(email, password, isSignup);

    // Check if the user is signing up
    if (isSignup) {
      setRegistered(true);
      setIsSignup(false);
    } else {
      // Check if the user is logging in and has signed up previously
      if (email && password && registered) {
        onLoginSuccess();
      } else {
        alert("Please sign up before logging in");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignup ? "Sign Up" : "Log In"}</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>{isSignup ? "Sign Up" : "Log In"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
        <Text style={styles.switchText}>
          {isSignup
            ? "Already have an account? Log in"
            : "Don't have an account? Sign up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    width: "80%",
    height: 48,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 16,
    paddingLeft: 16,
  },
  button: {
    backgroundColor: "#2f95dc",
    width: "80%",
    height: 48,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  switchText: {
    color: "#2f95dc",
    marginTop: 16,
  },
});

export default LoginSignup;

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddTransaction({ navigation }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSave = () => {
    const addTransaction = { name, amount: parseFloat(amount) };
    console.log("New Transaction:", addTransaction);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>New Transaction</Text>
      <Text style={styles.label}>Name:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Amount:</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 16,
    paddingHorizontal: 8,
    width: "80%",
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

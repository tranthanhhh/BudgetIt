import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import Calculator from "./Calculator";

export default function AddTransaction({ navigation }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [showCalculator, setShowCalculator] = useState(false);

  const handleSave = () => {
    const addTransaction = { name, amount: parseFloat(amount), note };
    console.log("New Transaction:", addTransaction);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>New Transaction</Text>
      <Text style={styles.label}>Name:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Amount:</Text>
      <TouchableOpacity
        style={styles.amountInput}
        onPress={() => setShowCalculator(true)}
      >
        <Text>{amount === "" ? "" : amount}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCalculator}
        onRequestClose={() => setShowCalculator(false)}
      >
        <View style={styles.calculatorContainer}>
          <Calculator
            onValueChange={(value) => {
              setAmount(value.toFixed(2));
              setShowCalculator(false);
            }}
          />
        </View>
      </Modal>
      <Text style={styles.label}>Note:</Text>
      <TextInput
        style={styles.input}
        value={note}
        onChangeText={setNote}
        multiline
        numberOfLines={3}
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
  calculator: {
    marginBottom: 16,
  },
  calculatorDisplay: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    width: "80%",
    marginBottom: 16,
    textAlign: "right",
    fontSize: 18,
    backgroundColor: "#1c1c1e",
    color: "white",
    borderRadius: 8,
  },
  calculatorButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "80%",
  },
  calculatorButton: {
    width: "22%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginBottom: 8,
  },
  calculatorButtonText: {
    fontSize: 24,
  },
  numberButton: {
    backgroundColor: "#333333",
  },
  numberButtonText: {
    color: "white",
  },
  operationButton: {
    backgroundColor: "#fd9426",
  },
  operationButtonText: {
    color: "white",
  },
  amountInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 16,
    paddingHorizontal: 8,
    width: "80%",
    justifyContent: "center",
  },
  calculatorContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 525,
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
});

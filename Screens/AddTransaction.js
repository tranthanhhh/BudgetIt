import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import Calculator from "./Calculator";
import axios from "axios";

export default function AddTransaction({
  navigation,
  userId,
  onTransactionAdded,
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [showCalculator, setShowCalculator] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      onTransactionAdded: () => onTransactionAdded(),
    });
  }, [navigation, onTransactionAdded]);

  const resetFields = () => {
    setName("");
    setAmount("");
    setNote("");
  };

  const handleSave = async () => {
    const addTransaction = {
      userId: userId,
      type: name,
      amount: parseFloat(amount),
      note,
    };
    try {
      await axios.post("http://localhost:3000/add-transaction", addTransaction);
      const budgetUpdate = {
        userId: userId,
        amount: name === "Income" ? parseFloat(amount) : -parseFloat(amount),
      };
      await axios.post("http://localhost:3000/update-budget", budgetUpdate);

      console.log("New Transaction:", addTransaction);
      if (onTransactionAdded) {
        onTransactionAdded();
      }
      resetFields();
      navigation.goBack();
    } catch (error) {
      console.error("Error adding transaction:", error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.heading}>New Transaction</Text>
        <Text style={styles.label}>Type:</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowPicker(true)}
        >
          <Text>{name === "" ? "Select Type" : name}</Text>
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={showPicker}
          onRequestClose={() => setShowPicker(false)}
        >
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={name}
              onValueChange={(itemValue, itemIndex) => {
                setName(itemValue);
                setShowPicker(false);
              }}
              style={styles.picker}
            >
              <Picker.Item label="Income" value="Income" color="blue" />
              <Picker.Item label="Expenses" value="Expenses" color="blue" />
            </Picker>
          </View>
        </Modal>
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
          <TouchableOpacity
            style={styles.calculatorContainer}
            onPress={() => setShowCalculator(false)}
            activeOpacity={1}
          >
            <Calculator
              onValueChange={(value) => {
                setAmount(value.toFixed(2));
                setShowCalculator(false);
              }}
            />
          </TouchableOpacity>
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
    </TouchableWithoutFeedback>
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
  pickerContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  picker: {
    width: "80%",
    alignSelf: "center",
  },
});

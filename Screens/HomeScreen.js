import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from "react-native";
import axios from "axios";
import useBudgetData from "./useBudgetData";

export default function HomeScreen({ navigation, userId }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputBudget, setInputBudget] = useState("");
  const [transactions, setTransactions] = useState([]);

  const fetchBudget = async () => {
    try {
      const response = await axios.post("http://localhost:3000/get-budget", {
        userId,
      });

      if (response.status === 200) {
        setTotalBudget(response.data.budget);
      }
    } catch (error) {
      console.error("Error fetching budget:", error.message);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/get-transactions",
        {
          userId,
        }
      );

      if (response.status === 200) {
        setTransactions(response.data.transactions);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
    }
  };

  const onTransactionAdded = useCallback(() => {
    fetchTransactions();
    fetchBudget();
  }, []);

  useEffect(() => {
    fetchBudget();
    fetchTransactions();
  }, [userId, onTransactionAdded]);

  const handleAddExpensePress = () => {
    navigation.navigate("Add Transaction", {
      userId: userId,
      onTransactionAdded: () => onTransactionAdded(),
    });
  };

  const handleSetBudgetPress = () => {
    setModalVisible(true);
  };

  const handleSubmitBudget = async () => {
    if (inputBudget) {
      try {
        const response = await axios.post("http://localhost:3000/set-budget", {
          userId,
          budget: parseFloat(inputBudget),
        });

        if (response.status === 200) {
          setTotalBudget(parseFloat(inputBudget));
          setInputBudget("");
        }
      } catch (error) {
        console.error("Error setting budget:", error.message);
      }
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Budget</Text>
      <Text style={styles.totalBudget}>Total Budget: ${totalBudget}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={handleSetBudgetPress}>
          <Text style={styles.buttonText}>Set Budget</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAddExpensePress}>
          <Text style={styles.buttonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Budget</Text>
            <TextInput
              style={styles.modalInput}
              onChangeText={(text) => setInputBudget(text)}
              value={inputBudget}
              keyboardType="numeric"
              autoFocus={true}
              placeholder="Enter budget amount"
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmitBudget}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.transactions}>
        <Text style={styles.transactionHeader}>Transactions</Text>
        {transactions.map((transaction, index) => (
          <View key={index} style={styles.transaction}>
            <Text style={styles.transactionName}>{transaction.note}</Text>
            <Text style={styles.transactionAmount}>${transaction.amount}</Text>
          </View>
        ))}
      </View>
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
  totalBudget: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 24,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  transactions: {
    width: "80%",
  },
  transactionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingVertical: 8,
  },
  transactionName: {
    fontSize: 16,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "black",
  },
  modalInput: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: "100%",
    color: "black",
  },
});

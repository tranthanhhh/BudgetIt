import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

export default function HomeScreen({ navigation, userId }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputBudget, setInputBudget] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  const fetchUserEmail = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/get-user-email",
        {
          userId,
        }
      );

      if (response.status === 200) {
        setUserEmail(response.data.email);
      }
    } catch (error) {
      console.error("Error fetching user email:", error.message);
    }
  };

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

  useFocusEffect(
    useCallback(() => {
      fetchBudget();
      fetchTransactions();
      fetchUserEmail();
    }, [onTransactionAdded])
  );

  const handleAddExpensePress = () => {
    navigation.navigate("Add Transaction", {
      userId: userId,
      onTransactionAdded: () => onTransactionAdded(),
    });
  };

  const handleSetBudgetPress = () => {
    setModalVisible(true);
  };

  const handleViewAllTransactions = () => {
    navigation.navigate("All Transactions");
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

  const transactionColor = (transactionType) => {
    return transactionType === "Income" ? "#50C474" : "#EF5354";
  };

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeHeader}>Welcome</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
      </View>
      <TouchableOpacity
        style={styles.totalBudgetButton}
        onPress={handleSetBudgetPress}
      >
        <LinearGradient
          colors={["#94C3F6", "#94EDF7"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.totalBudgetGradient}
        >
          <Text style={styles.totalBudget}>Total Balance</Text>
          <Text style={styles.totalBudget}>{formatCurrency(totalBudget)}</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleAddExpensePress}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>
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
        <View style={styles.transactionsHeader}>
          <Text style={styles.transactionHeader}>Previous Transactions</Text>
          <TouchableOpacity onPress={handleViewAllTransactions}>
            <Text style={styles.arrowText}>&gt;</Text>
          </TouchableOpacity>
        </View>

        {transactions
          .slice()
          .reverse()
          .slice(0, 6)
          .map((transaction, index) => (
            <View key={index} style={styles.transaction}>
              <Text style={styles.transactionName}>{transaction.note}</Text>
              <Text
                style={[
                  styles.transactionAmount,
                  { color: transactionColor(transaction.type) },
                ]}
              >
                {formatCurrency(transaction.amount)}
              </Text>
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
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  headerContainer: {
    alignSelf: "flex-start",
    marginBottom: 24,
    paddingLeft: 20,
    marginTop: -100,
  },
  welcomeHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 18,
    marginBottom: 5,
  },
  totalBudgetButton: {
    width: "90%",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 24,
  },
  totalBudgetGradient: {
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  totalBudget: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  totalBudget: {
    fontSize: 20,
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
    fontSize: 18,
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
  arrowText: {
    fontSize: 24,
    color: "black",
  },
});

import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Transactions from "./Transactions";
import AddTransaction from "./AddTransaction";

const budgetData = [
  { name: "Rent", amount: 1000 },
  { name: "Groceries", amount: 500 },
  { name: "Entertainment", amount: 200 },
  { name: "Transportation", amount: 300 },
];

const transactionData = [
  { name: "Gas", amount: 50 },
  { name: "Dinner", amount: 75 },
  { name: "Movie tickets", amount: 30 },
];

export default function HomeScreen({ navigation }) {
  const [totalBudget, setTotalBudget] = useState(
    budgetData.reduce((total, expense) => total + expense.amount, 0)
  );

  const handleAddExpensePress = () => {
    navigation.navigate("AddTransaction");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Budget</Text>
      <Text style={styles.totalBudget}>Total Budget: ${totalBudget}</Text>
      <TouchableOpacity style={styles.button} onPress={handleAddExpensePress}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>
      <View style={styles.transactions}>
        <Text style={styles.transactionHeader}>Transactions</Text>
        {transactionData.map((transaction, index) => (
          <View key={index} style={styles.transaction}>
            <Text style={styles.transactionName}>{transaction.name}</Text>
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
});

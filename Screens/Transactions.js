import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

const transactionData = [
  { name: "Gas", amount: 50 },
  { name: "Dinner", amount: 75 },
  { name: "Movie tickets", amount: 30 },
];

const budgetData = [
  { name: "Rent", amount: 1000 },
  { name: "Groceries", amount: 500 },
  { name: "Entertainment", amount: 200 },
  { name: "Transportation", amount: 300 },
];

export default function Transactions() {
  const transactionLabels = transactionData.map(
    (transaction) => transaction.name
  );
  const transactionAmounts = transactionData.map(
    (transaction) => transaction.amount
  );
  const budgetLabels = budgetData.map((budget) => budget.name);
  const budgetAmounts = budgetData.map((budget) => budget.amount);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Budget and Transactions</Text>
      <BarChart
        data={{
          labels: budgetLabels,
          datasets: [
            {
              data: budgetAmounts,
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            },
            {
              data: transactionAmounts,
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
            },
          ],
        }}
        width={350}
        height={200}
        yAxisSuffix="$"
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
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

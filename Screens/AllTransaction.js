import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import axios from "axios";

export default function AllTransactions({ userId }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/get-transactions",
          {
            userId,
          }
        );

        if (response.status === 200) {
          console.log("Fetched transactions:", response.data.transactions);
          setTransactions(response.data.transactions);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error.message);
      }
    };

    fetchTransactions();
  }, [userId]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.transactionsList}>
        {transactions.map((transaction, index) => (
          <View style={styles.transaction} key={index}>
            <Text style={styles.transactionName}>{transaction.note}</Text>
            <Text
              style={[
                styles.transactionAmount,
                {
                  color: transaction.type === "Income" ? "#50C474" : "#EF5354",
                },
              ]}
            >
              ${transaction.amount}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  transactionsList: {
    width: "100%",
  },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingVertical: 8,
  },
  transactionName: {
    fontSize: 16,
    paddingHorizontal: 16,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 16,
  },
});

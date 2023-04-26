import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

export default function Transactions({ userId }) {
  const [transactionData, setTransactionData] = useState([]);
  const [budgetData, setBudgetData] = useState([]);
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [expenseTransactions, setExpenseTransactions] = useState([]);

  const fetchData = async () => {
    try {
      const expensesResponse = await axios.post(
        "http://localhost:3000/get-expenses",
        {
          userId,
        }
      );
      const incomeResponse = await axios.post(
        "http://localhost:3000/get-income",
        {
          userId,
        }
      );

      if (expensesResponse.status === 200) {
        setExpenseTransactions(expensesResponse.data.expenses);
        console.log("Expenses:", expensesResponse.data.expenses);
      }

      if (incomeResponse.status === 200) {
        setIncomeTransactions(incomeResponse.data.income);
        console.log("Income:", incomeResponse.data.income);
      }

      setTransactionData([
        ...expensesResponse.data.expenses,
        ...incomeResponse.data.income,
      ]);
      setBudgetData([...incomeResponse.data.income]);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();

      return () => {
        setTransactionData([]);
        setBudgetData([]);
        setIncomeTransactions([]);
        setExpenseTransactions([]);
      };
    }, [])
  );

  useEffect(() => {
    const income = transactionData.filter(
      (transaction) => transaction.type === "Income"
    );
    const expenses = transactionData.filter(
      (transaction) => transaction.type === "Expenses"
    );

    setIncomeTransactions(income);
    setExpenseTransactions(expenses);
  }, [transactionData]);

  const pieChartData = [
    {
      name: "Expenses",
      amount: expenseTransactions.reduce((sum, item) => sum + item.amount, 0),
      color: "#EF5354",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Income",
      amount: incomeTransactions.reduce((sum, item) => sum + item.amount, 0),
      color: "#50C474",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Budget and Transactions</Text>
      <PieChart
        data={pieChartData}
        width={350}
        height={200}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
      <View style={styles.transactions}>
        <Text style={styles.transactionHeader}>Income Transactions</Text>
        {incomeTransactions
          .slice()
          .reverse()
          .slice(0, 3)
          .map((transaction, index) => (
            <View key={index} style={styles.transaction}>
              <Text style={styles.transactionName}>{transaction.note}</Text>
              <Text style={styles.transactionAmount}>
                ${transaction.amount}
              </Text>
            </View>
          ))}
      </View>
      <View style={styles.transactions}>
        <Text style={styles.transactionHeader}>Expense Transactions</Text>
        {expenseTransactions
          .slice()
          .reverse()
          .slice(0, 3)
          .map((transaction, index) => (
            <View key={index} style={styles.transaction}>
              <Text style={styles.transactionName}>{transaction.note}</Text>
              <Text style={styles.transactionAmount}>
                ${transaction.amount}
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
    marginBottom: 10,
  },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingVertical: 8,
    marginBottom: 10,
  },
  transactionName: {
    fontSize: 16,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

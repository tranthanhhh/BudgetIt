import { useState, useEffect } from "react";
import axios from "axios";

export default function useBudgetData(userId) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const refetch = () => {
    setLoading(true);
    fetchBudget();
    fetchTransactions();
    setLoading(false);
  };

  useEffect(() => {
    refetch();
  }, [userId]);

  return { totalBudget, transactions, loading, refetch };
}

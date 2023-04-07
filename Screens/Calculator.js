import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

function CalculatorButton({ title, onPress, style, textStyle }) {
  return (
    <TouchableHighlight
      style={[styles.calculatorButton, style]}
      onPress={onPress}
      underlayColor="#7c7c7c"
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableHighlight>
  );
}

function Calculator({ onValueChange }) {
  const [currentValue, setCurrentValue] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);

  const handlePress = (value) => {
    if (typeof value === "number" || value === ".") {
      setCurrentValue(
        currentValue === "0" ? String(value) : currentValue + value
      );
    } else if (value === "=") {
      calculate();
    } else if (value === "+/-") {
      setCurrentValue(parseFloat(currentValue) * -1);
    } else if (value === "%") {
      setCurrentValue(parseFloat(currentValue) / 100);
    } else if (value === "C") {
      clear();
    } else {
      if (!operation) {
        setPreviousValue(currentValue);
        setCurrentValue(currentValue + " " + value + " ");
      } else {
        setCurrentValue(currentValue + " " + value + " ");
      }
      setOperation(value);
    }
  };

  const calculate = () => {
    if (previousValue && operation) {
      const numA = parseFloat(previousValue);
      const numB = parseFloat(currentValue.split(" ").pop());

      let result;

      switch (operation) {
        case "+":
          result = numA + numB;
          break;
        case "-":
          result = numA - numB;
          break;
        case "*":
          result = numA * numB;
          break;
        case "/":
          result = numA / numB;
          break;
        default:
          return;
      }

      setCurrentValue(String(result));
      setPreviousValue(null);
      setOperation(null);
      onValueChange(result);
    }
  };

  const clear = () => {
    setCurrentValue("0");
    setPreviousValue(null);
    setOperation(null);
  };

  return (
    <View style={styles.calculator}>
      <Text style={styles.calculatorDisplay}>{currentValue}</Text>
      <View style={styles.calculatorButtons}>
        <View style={styles.numberButtons}>
          {[
            ["C", "+/-", "%", "/"],
            [7, 8, 9, "*"],
            [4, 5, 6, "-"],
            [1, 2, 3, "+"],
            [0, ".", "="],
          ].map((row, rowIndex) => (
            <View style={styles.row} key={rowIndex}>
              {row.map((num) => (
                <CalculatorButton
                  key={num}
                  title={String(num)}
                  onPress={() => handlePress(num)}
                  style={[
                    styles.calculatorButton,
                    rowIndex === 4 ? styles.zeroButton : styles.numberButton,
                    ["C", "+/-", "%"].includes(num) ? styles.grayButton : {},
                    ["/", "*", "-", "+"].includes(num)
                      ? styles.operationButton
                      : {},
                  ]}
                  textStyle={styles.numberButtonText}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calculator: {
    marginBottom: 16,
  },
  calculatorDisplay: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    width: "80%",
    marginBottom: 10,
    textAlign: "right",
    fontSize: 18,
    backgroundColor: "#1c1c1e",
    color: "white",
    borderRadius: 8,
    marginTop: 10,
  },
  calculatorButtons: {
    flexDirection: "row",
    width: "80%",
  },
  numberButtons: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  calculatorButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginBottom: 8,
  },
  numberButton: {
    width: "20%",
    height: 50,
    backgroundColor: "#333333",
  },
  numberButtonText: {
    color: "white",
    fontSize: 24,
  },
  zeroButton: {
    width: "32%",
    height: 50,
    backgroundColor: "#333333",
  },
  grayButton: {
    backgroundColor: "#a5a5a5",
  },
  operationButton: {
    backgroundColor: "#fd9426",
  },
});

export default Calculator;

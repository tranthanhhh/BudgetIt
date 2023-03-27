import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./Screens/HomeScreen";
import AddTransaction from "./Screens/AddTransaction";
import Transactions from "./Screens/Transactions";
import Account from "./Screens/Account";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const TabBarIcon = (props) => {
  return (
    <Ionicons
      name={props.name}
      size={26}
      color={props.focused ? "#2f95dc" : "gray"}
    />
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "earth-outline";
            } else if (route.name === "Add Transaction") {
              iconName = "add-circle-outline";
            } else if (route.name === "Transactions") {
              iconName = "list-circle-outline";
            } else if (route.name === "Profile") {
              iconName = "person-circle-outline";
            }

            return <TabBarIcon name={iconName} focused={focused} />;
          },
        })}
      >
        <Tab.Screen name="Home">
          {(props) => <HomeScreen {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Add Transaction" component={AddTransaction} />
        <Tab.Screen name="Transactions" component={Transactions} />
        <Tab.Screen name="Profile" component={Account} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

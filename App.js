import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Screens/HomeScreen";
import AddTransaction from "./Screens/AddTransaction";
import Transactions from "./Screens/Transactions";
import Account from "./Screens/Account";
import LoginSignup from "./Screens/LoginSignup";
import AllTransactions from "./Screens/AllTransaction";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabBarIcon = (props) => {
  return (
    <Ionicons
      name={props.name}
      size={26}
      color={props.focused ? "#2f95dc" : "gray"}
    />
  );
};

function MainAppTabs({ userId, onSignOut }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TabScreens" options={{ headerShown: false }}>
        {() => (
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
              {(props) => <HomeScreen {...props} userId={userId} />}
            </Tab.Screen>
            <Tab.Screen name="Add Transaction">
              {(props) => <AddTransaction {...props} userId={userId} />}
            </Tab.Screen>
            <Tab.Screen name="Transactions">
              {(props) => <Transactions {...props} userId={userId} />}
            </Tab.Screen>
            <Tab.Screen name="Profile">
              {(props) => (
                <Account {...props} userId={userId} signOut={onSignOut} />
              )}
            </Tab.Screen>
          </Tab.Navigator>
        )}
      </Stack.Screen>
      <Stack.Screen name="All Transactions">
        {(props) => <AllTransactions {...props} userId={userId} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function AuthStack({ onLoginSuccess }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        options={{ title: "Login" }}
        children={(props) => (
          <LoginSignup {...props} onLoginSuccess={onLoginSuccess} />
        )}
      />
    </Stack.Navigator>
  );
}

function App() {
  const [userId, setUserId] = useState(null);

  const handleLoginSuccess = (userId) => {
    setUserId(userId);
  };

  const handleSignOut = () => {
    setUserId(null);
  };

  return (
    <NavigationContainer>
      {userId ? (
        <MainAppTabs userId={userId} onSignOut={handleSignOut} />
      ) : (
        <AuthStack onLoginSuccess={handleLoginSuccess} />
      )}
    </NavigationContainer>
  );
}

export default App;

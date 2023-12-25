import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Homescreen from "./screen/Homescreen";
import Registerscreen from "./screen/Registerscreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Loginscreen from "./screen/Loginscreen";
import Pickupscreen from "./screen/Pickupscreen";
import Billingscreen from "./screen/Billingscreen";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Pickup" component={Pickupscreen} options={{headerShown : false}} />
        <Stack.Screen name="Home" component={Homescreen} options={{headerShown : false}} />
        <Stack.Screen name="Billing" component={Billingscreen} options={{headerShown : false}} />
        <Stack.Screen name="Login" component={Loginscreen} options={{headerShown : false}} />
        <Stack.Screen name="Register" component={Registerscreen} options={{headerShown : false}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default StackNavigator;

const styles = StyleSheet.create({});

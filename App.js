import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREEN_NAMES } from "./src/navigators/screenNames";
import Join from "./src/scenes/join";
import Meeting from "./src/scenes/meeting";
import { LogBox } from "react-native";
import ParticipantStatsViewer from "./src/scenes/meeting/Components/ParticipantStatsViewer";
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          animationEnabled: false,
          presentation: "modal",
        }}
        initialRouteName={SCREEN_NAMES.Join}
      >
        <RootStack.Screen
          name={SCREEN_NAMES.Join}
          component={Join}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={SCREEN_NAMES.Meeting}
          component={Meeting}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

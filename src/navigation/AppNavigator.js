import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { themeColor, useTheme } from "react-native-rapi-ui";
import TabBarIcon from "../components/utils/TabBarIcon";
import TabBarText from "../components/utils/TabBarText";

import Home from "../screens/Home";
import Profile from "../screens/Profile";
import LettersCourseScreen from "../screens/LettersCourseScreen";
import LessonsScreen from "../screens/LessonsScreen";
import LessonDetailsScreen from "../screens/LessonDetailsScreen";
import Tests from "../screens/Tests";





const Tabs = createBottomTabNavigator();
const MainTabs = () => {
  const { isDarkmode } = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
          backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
        },
        
      }}
    >
      {/* these icons using Ionicons */}
      <Tabs.Screen
        name="Home"
        
        component={Home}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Cours" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"md-grid"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Tests"
        component={Tests}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Tests" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"md-flask"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Profile" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon  focused={focused} icon={"person"} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const MainStack = createNativeStackNavigator();
const Main = () => {
  return (
    <MainStack.Navigator 
      screenOptions={{
        headerShown: false,
        contentStyle:{backgroundColor:'#FFF6EA'},
      }}
    >
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="LettersCourseScreen" component={LettersCourseScreen} />
      <MainStack.Screen name="LessonsScreen" component={LessonsScreen} />
      <MainStack.Screen name="LessonDetailsScreen" component={LessonDetailsScreen} />
    </MainStack.Navigator>
  );
};


export default () => {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
};

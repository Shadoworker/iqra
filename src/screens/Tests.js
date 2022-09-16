import React from "react";
import { 
  View, 
  FlatList,
  Image,
  Linking, 
  TouchableOpacity} from "react-native";
import {
  Layout,
  Button,
  Text,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";

import {Center, Heading} from "native-base";

import Header from "../components/utils/Header";
import colors from "../consts/colors";
import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();

  return (
    <Layout backgroundColor={colors.bg} >
      <Header navigation={navigation} />
      <View
        style={{
          flex: 1,
          paddingHorizontal:-5,
          marginHorizontal: 20,
        }}
      >
      
        <Heading size={"md"} color={colors.secondary} marginTop="2" marginBottom={5}>Tests</Heading>
          

		<Center style={{marginTop:'35%'}}>
			<Ionicons name="school-outline" size={40} color={"gray"} />
			<Text style={{color:"gray"}}>Bientôt disponible, Inshallah !</Text>
		</Center>

      </View>
    </Layout>
  );
}

import React from "react";
import { Text, themeColor, TopNav, useTheme } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import colors from "../../consts/colors";

export default (props) => {
  const { isDarkmode } = useTheme();
  return (
    <TopNav backgroundColor={colors.bg}
    borderColor={"transparent"}

        leftContent={props.canGoBack ? <Ionicons name="chevron-back" size={20} color={themeColor.black} onPress={()=>props.navigation.goBack()} />:  <Ionicons name="menu-outline" size={35} color={themeColor.black} /> }
        
        middleContent={!props.title ? <Image source={require('../../../assets/icon.png')} style={{height:45, width:45}} /> : <Text>{props.title}</Text> }

        rightContent={
            <Ionicons name="ellipsis-vertical" size={20} color={themeColor.black} />
        }
        rightAction={() => console.log('setting icon pressed')}
     
    />
  );
};

import React from "react";
import { Text, themeColor, TopNav, useTheme } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import colors from "../../consts/colors";
import { Menu,Pressable, HamburgerIcon,Button } from "native-base";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as mainReduxActions from "../../store/mainRedux/mainReduxActions";


const Header = (props) => {
  const { isDarkmode } = useTheme();


  const resetAll = ()=>{

    props.mainReduxActions.update_letters_section(0);

  }

  return (
    <TopNav backgroundColor={colors.bg}
    borderColor={"transparent"}

        leftContent={props.canGoBack ? <Ionicons name="chevron-back" size={30} color={themeColor.black} onPress={()=>props.navigation.goBack()} /> 
        :  
        <></>
        }
        
        middleContent={!props.title ? <Image source={require('../../../assets/icon.png')} style={{height:45, width:45}} /> : <Text>{props.title}</Text> }

        rightContent={
          <Menu w="190" backgroundColor={"black"} trigger={triggerProps => {
            return <Pressable accessibilityLabel="Menu" {...triggerProps}>
                      <Ionicons name="menu-outline" size={35} color={themeColor.black} />
                  </Pressable>;
          }}>
              <Menu.Item onPress={resetAll}>Réinitialiser tout</Menu.Item>
              <Menu.Item>Partager à un ami</Menu.Item>
              <Menu.Item> </Menu.Item>
              <Menu.Item>A propos</Menu.Item>
              
            </Menu>
        }
        rightAction={() => console.log('setting icon pressed')}
     
    />
  );
};


function mapStateToProps(state) {
  return {
    mainReduxState: state.mainReduxState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    mainReduxActions: bindActionCreators(mainReduxActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);

import React, { useEffect, useState } from "react";
import { 
  View, 
  FlatList,
  Image,
  Linking, 
  TouchableOpacity,
  LogBox} from "react-native";
import {
  Layout,
  Button,
  Text,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { Audio } from 'expo-av';
import * as _ from "lodash";

import {Box, Center, Heading, ScrollView, useToast} from "native-base";

import Header from "../components/utils/Header";
import colors from "../consts/colors";
import lettersLessons from "../services/mocks/letters.lessons";
import { Ionicons } from "@expo/vector-icons";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as mainReduxActions from "../store/mainRedux/mainReduxActions";
import soundsGrouping from "../services/mocks/sounds.grouping";



const GroupingScreen = (props) => {
  const { isDarkmode, setTheme } = useTheme();

  const [sound, setSound] = useState(new Audio.Sound());
 
  const { state } = props.route.params;
  const [groupings, setGroupings] = useState(soundsGrouping)  
  const [rightAnswer, setRightAnswer] = useState(null) 
 
  const toast = useToast();


  const GroupItem =  ({ item, index })  => {
    return <TouchableOpacity  
        key={index}
        onPress={()=>{}}

        style={{
          // elevation:3,
          display:"flex",
          width:'100%',
          flex:1,
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'space-evenly',
          paddingVertical:5,
          // backgroundColor:'gainsboro',

      }}>
        {item.groups.map((_item, _index) => {
          return (
            <Text key={_index} style={{margin:0, fontSize:28, paddingVertical:5, fontFamily: 'arabic1', fontWeight: "bold" ,color:colors.secondary}}>{_item}</Text>
          )})

        }
    </TouchableOpacity> ;
  };

  
  async function playSound(song) {

    const { sound } = await Audio.Sound.createAsync(song);
    setSound(sound);
 
    await sound.setVolumeAsync(1); 
    await sound.playAsync().then(d=>{
    }); 
  }


  useEffect(()=>{
    
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
 

    return sound
    ? () => {
        // console.log('Unloading Sound');
        sound.unloadAsync(); }
    : undefined;
}, [/* sound */]);
  
  
  



  return (
    <Layout backgroundColor={colors.bg} >
      <Header navigation={props.navigation} canGoBack={true} title={"Leçon"} />
      <View
        style={{
          flex: 1,
          // alignItems: "center",
          // justifyContent: "center",
          marginTop:-20,
          paddingHorizontal:-5,
          marginHorizontal: 20,
        }}
      >

        <View
          style={{
            flex: 1,
            // alignItems: "center",
            // justifyContent: "center",
            backgroundColor:'white',
            borderTopLeftRadius:10,
            borderTopRightRadius:10,
            paddingVertical:10,
            marginTop:40,
            elevation:4,
          }}
        >


          <FlatList
              data={groupings.tabs[0].items}
              renderItem={GroupItem}
              keyExtractor={(item) => item.id}
              ListHeaderComponentStyle={{ borderBottomColor: 'transparent', borderBottomWidth: 0 }}
              ItemSeparatorComponent={() => (
                <View style={{ backgroundColor: "gainsboro", height: 1, width:'95%', alignSelf:'center' }} />
              )}
            />

        </View>
        
         
      </View>
      <View style={{backgroundColor:'#ECDAC2', height:65, alignItems:'center'}}>
        <TouchableOpacity onPress={()=>{}} style={{ alignItems: 'center', justifyContent:'space-around', marginTop:10}} key="3">
          <Image source={require('../../assets/iqra-icons/play_icon.png')} style={{width:45, height:45 ,resizeMode:"center"}} />
        </TouchableOpacity>
      </View>
    </Layout>
  );
}


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


export default connect(mapStateToProps, mapDispatchToProps)(GroupingScreen);

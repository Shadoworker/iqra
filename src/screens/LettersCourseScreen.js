import React, { useEffect, useState } from "react";
import { 
  View, 
  FlatList,
  Image,
  Linking, 
  TouchableOpacity,
  I18nManager
} from "react-native";
import { Audio } from 'expo-av';
import {
  Layout,
  Button,
  Text,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";

import {Center, Heading, ScrollView} from "native-base";

import Header from "../components/utils/Header";
import colors from "../consts/colors"; 
// import Sound from 'react-native-sound';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as mainReduxActions from "../store/mainRedux/mainReduxActions";


const LettersCourseScreen = (props ) => {

  const { isDarkmode, setTheme } = useTheme();
  const { state } = props.route.params;

  const [units, setUnits] = useState(state.lesson.items)
  const [userCurrentLettersSection, setUserCurrentLettersSection] = useState(0)
  const [clickedIndex, setClickedIndex] = useState(null)
  

  const [currentUnitIndex, setCurrentUnitIndex] = useState(0)
  const [sound, setSound] = useState(new Audio.Sound());

  const groupColors = [
    '#1867D1', // Blue
    '#27AE60', // Green
    '#E7B008', // Yello
    '#EA7610', // Orange
    '#DF2626', // Red
    '#740ED3' // Violet
  ]
   

  async function playSound(song, index) {

    setClickedIndex(index);
    
    const { sound } = await Audio.Sound.createAsync(song);
    setSound(sound);
 
    await sound.setVolumeAsync(1); 
    await sound.playAsync(); 
  }


  const clearTest = () =>{

    let nextSection = props.mainReduxState.currentLettersSection + 1;
    if(nextSection > 5) nextSection = 5;

    props.mainReduxActions.update_letters_section(nextSection);

  }


  useEffect(()=>{
  
    console.log(props);

  }, [])
  
 

  const title = "Lettres";

  return (
    <Layout backgroundColor={colors.bg} >
      <Header navigation={props.navigation} canGoBack={true} title={title} />
      <ScrollView
        style={{
          flex: 1,
          // alignItems: "center",
          // justifyContent: "center",
          // backgroundColor: colors.bg,
          paddingHorizontal:-5,
          marginHorizontal: 5,
        }}
      >
          <Center style={{marginBottom:'10%'}}>
            <Image style={{width:180, height:180, resizeMode:'contain', borderRadius:20,borderColor:colors.secondary, borderWidth:4}} source={require("../../assets/iqra-sounds/course1/images/x-pronounciation.png")} />
          </Center>
          {/* <FlatList
            style={{direction:"rtl"}}
            data={units}
            numColumns={3}
            renderItem={unitItem}
            keyExtractor={(item) => item.id}
          /> */}

          <View style={{display:'flex', flexDirection:'row-reverse' ,flexWrap: 'wrap', justifyContent: 'space-around'}}>
            {units.map((item, index) => {
              return (
                <TouchableOpacity key={index} 

                  onPress={()=>  item.section <= props.mainReduxState.currentLettersSection ? playSound(item.sound, index) : null}
                  style={{
                    elevation:3,
                    width:'14%', 
                    marginBottom:15,
                    display:"flex",
                    alignItems:'center',
                    borderRadius:15,
                    backgroundColor:(  clickedIndex == index )? 'black' : groupColors[item.section],
                    opacity:( item.section <= props.mainReduxState.currentLettersSection )? 1 : 0.3,
                    shadowRadius:10,
                    paddingVertical:4
            
                  }}> 
                    <Text style={{margin:10, transform:[{scale:1.3}] ,color: clickedIndex == index ? 'white' : 'white', fontFamily:'Manrope-Regular' , fontSize:25, fontWeight:'bold'}}>{item.value}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          
          <Center style={{marginTop:20}}>
            <TouchableOpacity onPress={clearTest} style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
              <Image style={{width:80, height:80, resizeMode:'contain'}} source={require("../../assets/iqra-icons/testme_icon.png")} />
              {/* <Text style={{ fontFamily:'Manrope-Regular' , color:colors.secondary, fontSize:15, fontWeight:'bold'}}>Test</Text> */}
            </TouchableOpacity>
          </Center>

        {/* </Section> */}
      </ScrollView>
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


export default connect(mapStateToProps, mapDispatchToProps)(LettersCourseScreen);

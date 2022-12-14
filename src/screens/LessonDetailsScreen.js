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

import {Center, Heading} from "native-base";

import Header from "../components/utils/Header";
import colors from "../consts/colors";
import lettersLessons from "../services/mocks/letters.lessons";
// import Sound from 'react-native-sound';

 

export default function ({ route, navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const { state } = route.params;

  const lessonIndex = state.lesson.id;
  const maxLessons = state.maxLessons;
  const [units, setUnits] = useState(state.lesson.items)
  const [clickedIndex, setClickedIndex] = useState(null)
  

  const [currentUnitIndex, setCurrentUnitIndex] = useState(0)
  const [sound, setSound] = useState(new Audio.Sound());

 
  const unitItem = ({ item, index }) => {
    let p = index % 2 == 0 ? "0.25%" : "10%";

    return <TouchableOpacity  style={{
          elevation:3,
          width:'30%', 
          // marginLeft: p,
          marginHorizontal:'1.8%', 
          marginBottom:15,
          display:"flex",
          alignItems:'center',
          borderRadius:15,
          backgroundColor: 'black',
          shadowRadius:10,
          paddingVertical:4
          

      }}> 
        <Text style={{margin:10, color:'white', fontSize:52, fontWeight:'bold'}}>{item.value}</Text>
    </TouchableOpacity> ;
  };

  async function playSound(song, index) {

    setClickedIndex(index);
    
    const { sound } = await Audio.Sound.createAsync(song);
    setSound(sound);
 
    await sound.setVolumeAsync(1); 
    await sound.playAsync(); 
  }

  useEffect(()=>{
 

  }, [])
 

  const title = "Leçon "+ lessonIndex + "/" + maxLessons;

  return (
    <Layout backgroundColor={colors.bg} >
      <Header navigation={navigation} canGoBack={true} title={title} />
      <View
        style={{
          flex: 1,
          // alignItems: "center",
          // justifyContent: "center",
          // backgroundColor: colors.bg,
          paddingHorizontal:-5,
          marginHorizontal: 20,
        }}
      >
          <Center style={{marginBottom:'10%'}}>
            <Image style={{width:230, height:230, resizeMode:'contain', borderRadius:20,borderColor:colors.secondary, borderWidth:4}} source={require("../../assets/iqra-sounds/course1/images/x-pronounciation.png")} />
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

                  onPress={()=>playSound(item.sound, index)}
                  style={{
                    elevation:3,
                    width:'30%', 
                    // marginLeft: p,
                    // marginHorizontal:'1.8%', 
                    marginBottom:15,
                    display:"flex",
                    alignItems:'center',
                    borderRadius:15,
                    backgroundColor: clickedIndex == index ? colors.primary : 'black',
                    shadowRadius:10,
                    paddingVertical:4
            
                  }}> 
                    <Text style={{margin:10, color: clickedIndex == index ? 'black' : 'white', fontFamily:'Manrope-Regular' , fontSize:52, fontWeight:'bold'}}>{item.value}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          
        {/* </Section> */}
      </View>
    </Layout>
  );
}

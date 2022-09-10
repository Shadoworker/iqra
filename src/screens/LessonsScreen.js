import React, { useEffect, useState } from "react";
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

import {Heading} from "native-base";

import Header from "../components/utils/Header";
import colors from "../consts/colors";
import lettersLessons from "../services/mocks/letters.lessons";


export default function ({ route, navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const { state } = route.params;

  const [lessons, setLessons] = useState(state.lessons)





  const lessonItem = ({ item, index }) => {
    let p = index % 2 == 0 ? "0.25%" : "10%";

    return <TouchableOpacity  
    
        onPress={()=>navigation.navigate("LessonDetailsScreen", {state:{lesson : item, maxLessons : lessons.length }})}
        
        style={{
          elevation:3,
          width:'44%', 
          marginLeft: p, 
          marginBottom:15,
          display:"flex",
          alignItems:'center',
          borderRadius:15,
          backgroundColor:'white',
          shadowRadius:10,
          

      }}>
        <Image source={item.icon} style={{width:'80%', marginBottom:-50,  marginTop:-25 ,resizeMode:"center"}} />
        <Text style={{margin:10, color:colors.secondary}}> Leçon {item.id}</Text>
    </TouchableOpacity> ;
  };


  useEffect(()=>{

    

  }, [])
  

  return (
    <Layout backgroundColor={colors.bg} >
      <Header navigation={navigation} canGoBack={true} />
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
       
          <Heading size={"md"} color={colors.secondary} marginTop="2" marginBottom={5}>Leçons</Heading>
          
          <FlatList
            data={lessons}
            numColumns={2}
            renderItem={lessonItem}
            keyExtractor={(item) => item.id}
          />
          
        {/* </Section> */}
      </View>
    </Layout>
  );
}

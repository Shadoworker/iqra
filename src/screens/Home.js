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
import lettersLessons from "../services/mocks/letters.lessons";
import { useEffect } from "react";
import storage from "../services/storage";

const coursesData = [
  {id:1, name:"Lettres", icon:require('../../assets/iqra-icons/theme1-icon.png'),
    lessons:lettersLessons
  },
  {id:2, name:'Sons', icon:require('../../assets/iqra-icons/theme2-icon.png'), lessons:[]},
  {id:3, name:'Doublement', icon:require('../../assets/iqra-icons/theme3-icon.png'), lessons:[]},
  {id:4, name:'Allongement', icon:require('../../assets/iqra-icons/theme4-icon.png'), lessons:[]},
  {id:5, name:"L'article “AL”", icon:require('../../assets/iqra-icons/theme5-icon.png'), lessons:[]}
];

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  

  const courseItem = ({ item, index }) => {
    let p = index % 2 == 0 ? "5%" : "10%";
    return <TouchableOpacity  

        onPress={()=>{
          
          if(index == 0) // first cours
            navigation.navigate("LettersCourseScreen", {state:{lesson : item.lessons}})
          else
            navigation.navigate("LessonsScreen", {state:{lessons : item.lessons}})
          
          }
        }

        style={{
          elevation:3,
          width:'40%', 
          marginLeft: p, 
          marginBottom:15,
          display:"flex",
          alignItems:'center',
          borderRadius:15,
          backgroundColor:'white',
          shadowRadius:10,
          

      }}>
        <Image source={item.icon} style={{width:'70%', marginBottom:-70,  marginTop:-35 ,resizeMode:"center"}} />
        <Text style={{margin:10, color:colors.secondary}}>{item.name}</Text>
    </TouchableOpacity> ;
  };



  useEffect(()=>{

 

  },[])

  return (
    <Layout backgroundColor={colors.bg} >
      <Header navigation={navigation} />
     
      {/* <Center> */}
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
    
            <Heading size={"md"} color={colors.secondary} marginTop="2" marginLeft={4} marginBottom={3}>Cours</Heading>
            
            <FlatList
              data={coursesData}
              numColumns={2}
              renderItem={courseItem}
              keyExtractor={(item) => item.id}
            />
            
          {/* </Section> */}
        </View>
      {/* </Center> */}

    </Layout>
  );
}

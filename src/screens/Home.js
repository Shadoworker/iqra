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

import {Heading} from "native-base";

import Header from "../components/utils/Header";
import colors from "../consts/colors";
import lettersLessons from "../services/mocks/letters.lessons";

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
    let p = index % 2 == 0 ? "0.25%" : "10%";
    return <TouchableOpacity  

        onPress={()=>navigation.navigate("LessonsScreen", {state:{lessons : item.lessons}})}

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
        <Image source={item.icon} style={{width:'70%', marginBottom:-50,  marginTop:-25 ,resizeMode:"center"}} />
        <Text style={{margin:10, color:colors.secondary}}>{item.name}</Text>
    </TouchableOpacity> ;
  };

  return (
    <Layout backgroundColor={colors.bg} >
      <Header navigation={navigation} />
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
        {/* <Section> */}
          {/* <SectionContent>
            <Text fontWeight="bold" style={{ textAlign: "center" }}>
              These UI components provided by Rapi UI
            </Text>
            <Button
              style={{ marginTop: 10 }}
              text="Rapi UI Documentation"
              status="info"
              onPress={() => Linking.openURL("https://rapi-ui.kikiding.space/")}
            />
            <Button
              text="Go to second screen"
              onPress={() => {
                navigation.navigate("SecondScreen");
              }}
              style={{
                marginTop: 10,
              }}
            />

            <Button
              text={isDarkmode ? "Light Mode" : "Dark Mode"}
              status={isDarkmode ? "success" : "warning"}
              onPress={() => {
                if (isDarkmode) {
                  setTheme("light");
                } else {
                  setTheme("dark");
                }
              }}
              style={{
                marginTop: 10,
              }}
            />
          </SectionContent> */}
          <Heading size={"md"} color={colors.secondary} marginTop="2" marginBottom={5}>Cours</Heading>
          
          <FlatList
            data={coursesData}
            numColumns={2}
            renderItem={courseItem}
            keyExtractor={(item) => item.id}
          />
          
        {/* </Section> */}
      </View>
    </Layout>
  );
}

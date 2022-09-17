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

import {Center, Heading, ScrollView} from "native-base";

import Header from "../components/utils/Header";
import colors from "../consts/colors";
import lettersLessons from "../services/mocks/letters.lessons";
import { Ionicons } from "@expo/vector-icons";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as mainReduxActions from "../store/mainRedux/mainReduxActions";



const QuizScreen = (props) => {
  const { isDarkmode, setTheme } = useTheme();
  const { state } = props.route.params;
  
  const [section, setSection] = useState(state.section)
  const [quizData, setQuizData] = useState(state.quizes)
  const [sectionQuizes, setSectionQuizes] = useState([])
  // const [quiz, setQuiz] = useState([])
  const [quizes, setQuizes] = useState([1,2])
  const [quizStepper, setQuizStepper] = useState(null)



  const quizAnswerItem = ({ item, index }) => {
    let p = index % 2 == 0 ? "5%" : "10%";
    return <TouchableOpacity  
        key={index}
        onPress={()=>{
          
          }
        }

        style={{
          elevation:3,
          width:'40%', 
          marginLeft: p, 
          marginBottom:15,
          paddingVertical:16,
          display:"flex",
          alignItems:'center',
          borderRadius:15,
          borderColor:'gainsboro',
          borderWidth:3,
          backgroundColor:'white',
          shadowRadius:10,
          

      }}>
        <Text style={{margin:10, fontSize:45, fontWeight: "bold" ,color:colors.secondary}}>{item.value}</Text>
    </TouchableOpacity> ;
  };
  
  const setupSectionQuizes = () =>{

    let _initQuizes = quizData.filter(e=>e.section == props.route.params.state.section);

    // console.log(_quizes)
    // setSectionQuizes(_quizes)


    let maxQuizes = 5;
    let _finalQuizes = [];

    for (let i = 0; i < maxQuizes; i++) {
      
    
      let _quizes = [..._initQuizes];

      // console.log("A_quizes");
      // console.log(_quizes);

      let max = _quizes.length > 4 ? 4 : _quizes.length;

      let quizItems = []

      for (let i = 0; i < max; i++) {
        
        let r = Math.floor(Math.random() * _quizes.length);

        const el = _quizes[r];


        if(quizItems.indexOf(el) == -1)
        {
          quizItems.push(el);
          _quizes.splice(r,1);
        }
      
      }

      _finalQuizes.push(quizItems);
      
    }
 
    setQuizes(_finalQuizes)


    const stepper = 
    <ProgressSteps  disabledStepIconColor={"gainsboro"} completedStepIconColor={colors.primary} activeStepIconBorderColor={colors.primary} progressBarColor={colors.primary} completedProgressBarColor={colors.primary} >
      {
      _finalQuizes.map((quiz, index)=>
        <ProgressStep label=""  previousBtnDisabled={true} previousBtnText="" nextBtnText="Suivant" finishBtnText="Terminer" nextBtnTextStyle={{color:colors.secondary}} onSubmit={clearTest}>
            <View style={{ alignItems: 'center', flexDirection:'column', justifyContent:'space-around'}} key="0" >
                  <FlatList
                    data={quiz}
                    numColumns={2}
                    renderItem={quizAnswerItem}
                    keyExtractor={(item) => item.id}
                  />
              
                <Text style={{marginTop:35}}>Appuyez pour écouter</Text>
                <TouchableOpacity style={{ alignItems: 'center', justifyContent:'space-around', marginTop:10}} key="3">
                  <Image source={require('../../assets/iqra-icons/play_icon.png')} style={{width:65, height:65 ,resizeMode:"center"}} />
                </TouchableOpacity>
              
            </View>
        </ProgressStep>)
      }
    </ProgressSteps>;

    setQuizStepper(stepper)

  }


  const clearTest = () =>{


    let nextSection = props.mainReduxState.currentLettersSection + 1;
    if(nextSection > 5) nextSection = 5;

    props.mainReduxActions.update_letters_section(nextSection);

    setTimeout(() => {
      props.navigation.goBack()
    }, 50);
  }

   

  useEffect(()=>{

    setupSectionQuizes(); 

  }, [])
  
  
  



  return (
    <Layout backgroundColor={colors.bg} >
      <Header navigation={props.navigation} canGoBack={true} title={"Quiz"} />
      <ScrollView
        style={{
          flex: 1,
          // alignItems: "center",
          // justifyContent: "center",
          marginTop:-20,
          paddingHorizontal:-5,
          marginHorizontal: 20,
        }}
      >

          {quizStepper}

         
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


export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen);

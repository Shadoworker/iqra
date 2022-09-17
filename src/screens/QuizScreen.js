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

import {Box, Center, Heading, ScrollView, useToast} from "native-base";

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

  const [sound, setSound] = useState(new Audio.Sound());
  const [clickedIndex, setClickedIndex] = useState(null)

  const { state } = props.route.params;
  const [quizData, setQuizData] = useState(state.quizes)
  const [quizes, setQuizes] = useState([]) 
  const [activeStep, setActiveStep] = useState(0) 
  const [rightAnswer, setRightAnswer] = useState(null) 
  const [scores, setScores] = useState([0,0,0,0,0]) 
  const [played, setPlayed] = useState(false)

  const toast = useToast();


  const quizAnswerItem = ({ item, index }) => {
    let p = index % 2 == 0 ? "5%" : "10%";
    return <TouchableOpacity  
        key={index}
        onPress={()=>selectAnswer(item, index)}

        style={{
          elevation:3,
          width:'40%', 
          marginLeft: p, 
          marginBottom:15,
          paddingVertical:18,
          display:"flex",
          alignItems:'center',
          borderRadius:15,
          borderColor:'gainsboro',
          borderWidth:3,
          backgroundColor: rightAnswer == item.id ? "#27AE60" : answerStatus(item, index),
          // color:(  clickedIndex == index )? colors.primary : 'white',

          shadowRadius:10,
          

      }}>
        <Text style={{margin:10, fontSize:45, fontWeight: "bold" ,color:colors.secondary}}>{item.value}</Text>
    </TouchableOpacity> ;
  };
  
  const setupSectionQuizes = () =>{

    let _initQuizes = quizData.filter(e=>e.section == props.route.params.state.section);

    // Jumble with some previous (x);
    let _previousQuizes = [];
   
    if(props.route.params.state.section > 0)
     _previousQuizes = quizData.filter(e=>e.section < props.route.params.state.section);

    // _initQuizes = [..._initQuizes, ..._previousQuizes]

    let _jumbledQuizes = {current : _initQuizes, previous:_previousQuizes}


    let maxQuizes = 5;
    let _finalQuizes = [];

    for (let i = 0; i < maxQuizes; i++) {
      
    
      let _currentQuizes = [..._jumbledQuizes.current];
      let _previousQuizes = [..._jumbledQuizes.previous];
 
      // ... 

      // let max = [..._jumbledQuizes.current, ..._jumbledQuizes.previous].length > 4 ? 4 : _jumbledQuizes.current.length;

      let quiz = {items:[], question : null}

      // items
      let currentMax = Math.floor(Math.random() * 3) + 1;
      if(_previousQuizes.length == 0) currentMax = 4;
      let previousMax = 4 - currentMax;
      for (let i = 0; i < currentMax; i++) {
        
        let r = Math.floor(Math.random() * _currentQuizes.length);
        const el = _currentQuizes[r];

        if(quiz.items.indexOf(el) == -1)
        {
          quiz.items.push(el);
          _currentQuizes.splice(r,1);
        }
      
      }

      for (let i = 0; i < previousMax; i++) {
        
        let r = Math.floor(Math.random() * _previousQuizes.length);
        const el = _previousQuizes[r];

        if(quiz.items.indexOf(el) == -1)
        {
          quiz.items.push(el);
          _previousQuizes.splice(r,1);
        }
      
      }

      // Sound
      let _quizAmongCurrentSection = quiz.items.filter(e=>e.section == props.route.params.state.section)
      var r = Math.floor(Math.random() * _quizAmongCurrentSection.length);
      const soundEl = _quizAmongCurrentSection[r];
      quiz.question = soundEl;

      _finalQuizes.push(quiz);
      
    }
 
    // console.log(_finalQuizes)
    setQuizes(_finalQuizes)

  }


  const QuizStepper = (props) => {

    // Auto play first
    useEffect(()=>{
      if(!played)
      {
        playSound(props.quizes[0].question.sound)
        setPlayed(true)
      }
    },[])

    return (
      <ProgressSteps activeStep={activeStep} disabledStepIconColor={"gainsboro"} completedStepIconColor={colors.primary} activeStepIconBorderColor={colors.primary} progressBarColor={colors.primary} completedProgressBarColor={colors.primary} >
      {
        props.quizes.map((quiz, index)=>
        <ProgressStep key={index} label=""  previousBtnDisabled={true} previousBtnText="" nextBtnDisabled={true}  nextBtnText="" finishBtnText="Terminer" nextBtnTextStyle={{color:colors.secondary}} onNext={onNextQuiz} onSubmit={clearTest}>
            <View style={{ alignItems: 'center', flexDirection:'column', justifyContent:'space-around'}} key="0" >
                  <FlatList
                    data={quiz.items}
                    numColumns={2}
                    renderItem={quizAnswerItem}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponentStyle={{ borderBottomColor: 'transparent', borderBottomWidth: 0 }}
                  />
              
                <Text style={{marginTop:35}}>Appuyez pour écouter</Text>
                <TouchableOpacity onPress={()=>playSound(quiz.question.sound)} style={{ alignItems: 'center', justifyContent:'space-around', marginTop:10}} key="3">
                  <Image source={require('../../assets/iqra-icons/play_icon.png')} style={{width:65, height:65 ,resizeMode:"center"}} />
                </TouchableOpacity>
              
            </View>
        </ProgressStep>)
      }
    </ProgressSteps>
    );
  }

    
  const answerStatus = (item, index) =>{
  
    let _color = "white";
    if(clickedIndex == index)
    {
      _color = colors.primary;

      let currentQuiz = quizes[activeStep];
      let question = currentQuiz.question;

      if(item.id == question.id)
      {
        _color = "#27AE60";
      }
      else
      {
        _color = "#DF2626";
      }
    }

    return _color;

  }

  const selectAnswer = (item, index) =>{

    let currentQuiz = quizes[activeStep];

    let question = currentQuiz.question;

    let _scores = [...scores];
    let s = 0;
    if(item.id == question.id)
    { 
      s = 1;
    }
    else
    {
      s = 0;
      setRightAnswer(question.id)
    }

    _scores[activeStep] = s;
    setScores(_scores);
    
    setClickedIndex(index);


    setTimeout(() => {
      onNextQuiz();
    }, 1000);

  }

  
  const onNextQuiz = () =>{

    setRightAnswer(null)
    setClickedIndex(null)
    let nextStep  = activeStep+1;

    if(nextStep < 5)
    {
      setActiveStep(nextStep)
      
      let currentQuiz = quizes[nextStep];
      let question = currentQuiz.question;
      playSound(question.sound)
    }
    else
    {
      let sum = scores.reduce((a, b) => a + b, 0)
      
      clearTest(sum >= 3);

    }

  }

  const clearTest = (cleared = true) =>{

    let nextSection = props.mainReduxState.currentLettersSection + 1;
    if(nextSection > 5) nextSection = 5;

    if(cleared)
    {
      toast.show({
        render: () => {
          return <Box style={{height:35, display:"flex", alignItems:'center', justifyContent:'center'}} bg="success.500" px="2" py="1" rounded="sm" mb={5}>
                   <Text> Bravo ! Test réussi.</Text>
                </Box>;
        },
        placement:'top'
      })

      props.mainReduxActions.update_letters_section(nextSection);
    }
    else
    {
        toast.show({
          render: () => {
            return <Box style={{height:35, display:"flex", alignItems:'center', justifyContent:'center'}} bg="danger.500" px="2" py="1" rounded="sm" mb={5}>
                    <Text>Veuillez repasser le test.</Text>
                  </Box>;
          },
          placement:'top'
        })
    }

    setTimeout(() => {
      props.navigation.goBack()
    }, 1200);
  }

  
  async function playSound(song) {

    const { sound } = await Audio.Sound.createAsync(song);
    setSound(sound);
 
    await sound.setVolumeAsync(1); 
    await sound.playAsync(); 
  }


  useEffect(()=>{
    
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])

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

          {/* {quizStepper} */}

          {quizes.length > 0 &&
            <QuizStepper quizes={quizes} />
          }
         
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

import React ,{useState} from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableWithoutFeedback, Animated } from 'react-native';
import LeftArrow from './components/icons';
import color, {btnShades} from './components/color';
import Button from './components/button';
import GestureRecognizer from 'react-native-swipe-gestures';
const {height, width} = Dimensions.get('window');

export default function App() {
  const [exp, setExp] = useState("0");
  const [opac, setOpac] = useState(1);
  const [translate, setTranslate] = useState(false);
  const [deg, setDeg] = useState(true);

  const value = useState(new Animated.ValueXY({x: width*1.71, y:height*1.02}))[0];
  const config = {
    velocityThreshold: 0.1,
    directionalOffsetThreshold: 80
  }

  const print = (num) => {
    let copy = exp;
    if(copy === "0" || copy === "Syntax Error"){
      setExp(num);
      return
    }
    setExp(copy+num);
  }

  const printAdv = (f) => {
    print(f+'(')
  }
  const clear = () => {
    let copy = exp.substring(0, exp.length - 1);
    setExp(copy);
    if(copy.length === 0 || copy === "-"){
      setExp("0");
    }
  }

  const evaluate = () => {
    let replaceArr = [
      {from: '÷', to: '/', cond: true},
      {from: 'е', to: 'Math.exp(1)', cond: true},
      {from: 'π', to: 'Math.PI', cond: true},
      {from: 'φ', to: '((1+Math.sqrt(5))/2)', cond: true},
      {from: '√', to: 'Math.sqrt', cond: true},
      {from: '^', to: '**', cond: true},
      {from: 'sin(', to: 'Math.sin(', cond: deg == false, other: 'Math.sin((Math.PI/180)*'},
      {from: 'cos(', to: 'Math.cos(',  cond: deg == false, other: 'Math.cos((Math.PI/180)*'},
      {from: 'tan(', to: 'Math.tan(', cond: deg == false, other: 'Math.tan((Math.PI/180)*'},
      {from: 'log', to: 'Math.log10',cond: true},
      {from: 'ln', to: 'Math.loge', cond: true},
      {from: 'abs', to: 'Math.abs', cond: true}
    ]
    let copy = exp;
   try{
      for(var i = 0; i<replaceArr.length; i++){
        copy = copy.replace(replaceArr[i].from, (replaceArr[i].cond)? replaceArr[i].to: replaceArr[i].other);
        
      }
      
      copy = eval(copy).toFixed(6);
      setExp(copy.toString());
    }catch(e){
      setExp("Syntax Error");
    }
  }

  const advPanel = () => {
      if(translate == false){
       
        Animated.timing(value, {
          toValue: {x: width*1, y:height*1.02},
          duration: 250,
          useNativeDriver: false
        }).start()
        setTranslate(true);
        setOpac(0.2);
          return;
        } 
        Animated.timing(value, {
          toValue: {x: width*1.71, y:height*1.02},
          duration: 250,
          useNativeDriver: false
        }).start()
        setTranslate(false);
        setOpac(1);
  }
  const closeAdvPanel = ()=>{
    if(translate == true){
      advPanel();
  }}
  
  const btns = [
    [
      {text: 'AC', color: btnShades.clear, textColor: '#000', fun: ()=>{setExp("0")}},
      {text: '(', color: btnShades.sp, textColor: '#000', fun: print},
      {text: ')', color: btnShades.sp, textColor: '#000', fun: print},
      {text: '÷', color: btnShades.op, textColor: '#000', fun: print}
    ],
    [
      {text: '7', color: btnShades.gen, textColor: '#FFF', fun : print},
      {text: '8', color: btnShades.gen, textColor: '#FFF', fun : print},
      {text: '9', color: btnShades.gen, textColor: '#FFF', fun : print},
      {text: '*', color: btnShades.op, textColor: '#000', fun: print}
    ],
    [
      {text: '4', color: btnShades.gen, textColor: '#FFF', fun : print},
      {text: '5', color: btnShades.gen, textColor: '#FFF', fun : print},
      {text: '6', color: btnShades.gen, textColor: '#FFF', fun : print},
      {text: '-', color: btnShades.op, textColor: '#000', fun: print}
    ],
    [
      {text: '1', color: btnShades.gen, textColor: '#FFF', fun : print},
      {text: '2', color: btnShades.gen, textColor: '#FFF', fun : print},
      {text: '3', color: btnShades.gen, textColor: '#FFF', fun : print},
      {text: '+', color: btnShades.op, textColor: '#000', fun: print}
    ],
    [
      {text: '.', color: btnShades.gen, textColor: '#FFF', fun: print},
      {text: '0', color: btnShades.gen, textColor: '#FFF', fun : print},
      {text: <LeftArrow stroke = "#FFF" width="25"/>, color: btnShades.gen, textColor: '#FFF', fun: clear},
      {text: '=', color: btnShades.sp, textColor: '#000', fun: evaluate}
    ]
  ];
  
  const advBtns = [
    [
      {text: '√', color: btnShades.gen, textColor: '#FFF', fun: printAdv},
      {text: '^', color: btnShades.gen, textColor: '#FFF', fun: print},
      {text: (deg == true)? 'rad' : 'deg',color: btnShades.gen, textColor: '#FFF', fun: ()=>{setDeg(!deg)}}
    ],
  [
    {text: 'π', color: btnShades.gen, textColor: '#FFF', fun: print},
    {text: 'е', color: btnShades.gen, textColor: '#FFF',fun :print},
    {text: 'φ',color: btnShades.gen, textColor: '#FFF', fun: print}
  ],
  [
    {text: 'sin', color: btnShades.gen, textColor: '#FFF', fun: printAdv},
    {text: 'cos', color: btnShades.gen, textColor: '#FFF', fun: printAdv},
    {text: 'tan',color: btnShades.gen, textColor: '#FFF', fun: printAdv}
  ],
 
  [
    {text: 'log', color: btnShades.gen, textColor: '#FFF', fun: printAdv},
    {text: 'ln', color: btnShades.gen, textColor: '#FFF', fun: printAdv},
    {text: 'abs',color: btnShades.gen, textColor: '#FFF', fun: printAdv}
  ]];
  return (
    <View style={styles.container}>
    <View style={styles.expressionWrapper}>
      <Text style={styles.status}>
          {(deg)? 'deg' : 'rad'}
      </Text>
      <Text style={styles.expression}>
        {exp}
      </Text>
    
    </View>   

    
    <GestureRecognizer onSwipeLeft={advPanel} onSwipeRight={closeAdvPanel} config={config}>
    <TouchableWithoutFeedback>
     <View style = {[styles.buttonRow, {opacity : opac}]}>
     {
        btns.map((items, index) => {
          return( <View key={index} style={styles.buttonCol}>
          {
            items.map((sItems, sIndex) => {
              return <Button func = {()=>{sItems.fun(sItems.text)}} text={sItems.text} color={sItems.color} textColor={sItems.textColor} key={4*index + sIndex}/>
            })
          }
          </View>
          )
        })
      }
      </View>
      </TouchableWithoutFeedback>
    </GestureRecognizer>
    
    
    <Animated.View style={[value.getLayout(), {position: 'absolute'}]}>
    <GestureRecognizer  onSwipeRight={advPanel} config={config}>
    
    <TouchableWithoutFeedback>
    
      <View style={styles.advancedOperatorWrapper}>{
        advBtns.map((item, index)=>{
          return(
            <View key={index} style={styles.buttonCol}>
              {
                item.map((sItem, sIndex)=>{
                  return <Button func = {()=>{sItem.fun(sItem.text)}} text={sItem.text} color={sItem.color} textColor={sItem.textColor} key={4*index + sIndex}/>
                })
              }
            </View>
          )
        })
      }
      </View>
      </TouchableWithoutFeedback>
      
      </GestureRecognizer>
      </Animated.View>
      
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg,
  },
  expressionWrapper: {
    height: height*0.2,
    paddingHorizontal: height*0.02,
    backgroundColor: color.expression,
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  status:{
    fontSize: 18,
    color: color.text,
    textAlign: 'right',
    marginTop: height*0.04,
  },
expression: {
  fontSize: 35,
  color: color.text,
  textAlign: 'right',
  marginBottom: height*0.015,
},
buttonRow: {
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  height: height*0.8,
},
buttonCol:{
 flexDirection: 'row',
 alignItems:'center',
 justifyContent: 'space-evenly'
},
advancedOperatorWrapper:{
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  position: 'absolute',
  bottom: 0,
  right: 0,
  height: height*0.8,
  width: width*0.75,
  backgroundColor: color.advancedOperatorWrapper,
  borderBottomLeftRadius: 10,
  borderTopLeftRadius: 10,
},

});

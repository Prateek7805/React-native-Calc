import React from 'react';
import {Dimensions,View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const {height, width} = Dimensions.get('window');

const Button = (props) => {
    
    const btn = (typeof(props.text) != "string")? <View style={[styles.text, {color: props.textColor}]}>{props.text}</View> : <Text style={[styles.text, {color: props.textColor}]}>{props.text}</Text>;
    
    return (
        <TouchableOpacity onPress={()=>{props.func()}} style={[styles.button,{backgroundColor: props.color}]}>  
           {btn}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width : width* 0.2,
        height : width*0.2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 9999
    },
    text: {
        fontSize: 25
    }
});

export default Button;
import React,{useState,useEffect} from 'react'
import { View, Text,StyleSheet,Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {gobalObject} from "../src/globalObject"

class timer
{
    constructor() {
        this.dif = 0;
        this.now = 0;
        this.isEnd = false;
      }
      ButtonHandler ()
      {
        if(this.isEnd)
        {
            this.now  =0;
            this.isEnd = false;
        }
        else
        {
            this.now = new Date().getTime();
            this.isEnd = true;
        }
      }
      GetPrint()
      {
        var dif =  new Date().getTime() - gobalObject.timer.now;

        var hours = Math.floor((dif % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((dif % (1000 * 60)) / 1000);
        var print = (hours > 9 ? hours.toString() :   "0" + hours.toString()) + ":";
        print+= (minutes > 9 ?   minutes.toString() : "0" + minutes.toString()) + ":";
        print+= seconds > 9 ? seconds.toString() : "0" + seconds.toString();
        this.dif = dif;
        return print ;
      }      
}


export default function Timer() {

    const [timePass,SetTime] = useState( "00:00:00" );
    useEffect(() => {
        if(gobalObject.timer == 0)
        {
            gobalObject.timer = new timer();
        }
        else
        {
            SetTime(gobalObject.timer.GetPrint());
        }
        const id = setInterval(() => {

            if(gobalObject.timer.isEnd)
                SetTime(gobalObject.timer.GetPrint());
            else
                SetTime("00:00:00");  
        }, 1000);
        return () => {
            clearInterval(id);
        }
    }, [])

    
    var msg = "תחילת עבודה";
    if(gobalObject.timer.isEnd){
        msg = "סיום עבודה";
    }
    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.TimerStyle} onPress={()=>{gobalObject.timer.ButtonHandler()}}>
             <Text style={{textAlign:"center"}}>
                {msg}             
             </Text>
            </TouchableOpacity>
            <Text style={{textAlign:"center",marginTop:20,}}>
                שעון {timePass}       
             </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    view:
    {
        height: 70,
        width: Dimensions.get('window').width,
        flexDirection:"row-reverse",
        justifyContent:"space-between",
    },
    TimerStyle:
    {
        marginRight:1,
        marginTop:5,
        borderRadius:60,
        backgroundColor:"#00ff00",
        width:60,
        height:60,
    },




})
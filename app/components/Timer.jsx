import React,{useState,useEffect} from 'react'
import { View, Text,StyleSheet,Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {globalObject} from "../src/globalObject"

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
        var dif =  new Date().getTime() - globalObject.timer.now;

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
        if(globalObject.timer == 0)
        {
            globalObject.timer = new timer();
        }
        else
        {
            SetTime(globalObject.timer.GetPrint());
        }
        const id = setInterval(() => {

            if(globalObject.timer.isEnd)
                SetTime(globalObject.timer.GetPrint());
            else
                SetTime("00:00:00");  
        }, 1000);
        return () => {
            clearInterval(id);
        }
    }, [])

    
    var msg = "תחילת עבודה";
    if(globalObject.timer.isEnd){
        msg = "סיום עבודה";
    }
    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.TimerStyle} onPress={()=>{globalObject.timer.ButtonHandler()}}>
             <Text style={styles.TimerText}>
                {msg}             
             </Text>
            </TouchableOpacity>
            <Text style={styles.Clock}>
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
        paddingHorizontal: 10,
        alignItems: 'center',
        textAlign: "right",
        marginVertical: 10,
        

    },
    TimerStyle:
    {
        
        marginLeft:5,
        borderRadius:25,
        backgroundColor: "lightgray",
        width:80,
        height:60,
        justifyContent:'center',
        textAlign:"center",
        marginRight: 75,



    },
    TimerText:
    {
        fontSize: 16,
        textAlign:"center",
        fontWeight: "bold",
        color: "grey",

    },
    Clock:
    {
        flexGrow: 1,
        marginLeft: 60,
        justifyContent:'center',
        textAlign:"center",
        fontSize: 18,

    }




})
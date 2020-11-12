import React,{useState,useEffect} from 'react'
import { View, Text,StyleSheet,Dimensions, Image } from 'react-native'
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
    const [buttonName,setButtonName] = useState("תחילת עבודה")
    const [textBottonStyle,setTextButtonStyle] = useState(styles.TimerText)
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
            {
                SetTime(globalObject.timer.GetPrint());
                setButtonName("סיום עבודה") 
                setTextButtonStyle(styles.TimerTextEnd)
            }
            else
            {
                SetTime("00:00:00"); 
                setButtonName("תחילת עבודה") 
                setTextButtonStyle(styles.TimerText)
            }
        }, 100);
        return () => {
            clearInterval(id);
        }
    }, [])

    return (
        <View style={styles.view}>
            <Image style={styles.tinyLogo} source={require('../assets/circle_icon_purple.png')}/>
            <TouchableOpacity style={styles.TimerStyle} onPress={()=>{globalObject.timer.ButtonHandler()}}>
             <Text style={textBottonStyle}>
                {buttonName}             
             </Text>
            <Text style={styles.Clock}>
                {timePass}       
             </Text>
             </TouchableOpacity>

        </View>
    )
}


const styles = StyleSheet.create({
    view:
    {
        flex:1.5,
        height: 70,
        width: Dimensions.get('window').width,
        //flexDirection:"row-reverse",
        justifyContent:"center",
        //paddingHorizontal: 10,
        alignItems: 'center',
        textAlign: "center",
        marginVertical: 10,
        marginTop: 20,
        

    },
    TimerStyle:
    {
        
        //marginLeft:5,
        borderRadius:21,
        //backgroundColor: "lightgray",
        width:70,
        height:50,
        justifyContent:'center',
        textAlign:"center",
        //margin: 10,



    },
    TimerText:
    {
        fontSize: 12,
        textAlign:"center",
        fontWeight: "bold",
        color: "grey",

    },
    TimerTextEnd:
    {
        fontSize: 12,
        textAlign:"center",
        fontWeight: "bold",
        color: "black",
        marginHorizontal: 5,

    },
    Clock:
    {
        flexGrow: 1,
        //marginLeft: 60,
        justifyContent:'center',
        textAlign:"center",
        fontSize: 11,
        marginTop: 2,

    },
    tinyLogo:{
        position: "absolute",
        width: 85,
        height: 85,
        opacity: 0.6,
        //alignItems: 'flex-end',
        //justifyContent: 'flex-end',
        //marginBottom: 40,
        //marginRight: 12,
        //zIndex: 5,
        
    },




})
import React,{useState} from 'react'
import { StyleSheet, Text, View,TouchableOpacity,Dimensions, Image } from 'react-native'
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import 'moment/locale/he';
//import moment from 'moment-timezone';

const onSelected =(date)=>
{
    console.log(date);
}

export default function Shifts(test) 
{
    const [onFocus, setOnFocus] = useState(false);

   // var heLocaleData = moment.localeData('he');
   // console.log(heLocaleData);
   //moment().tz('Asia/Jerusalem').format('MM/DD/YYYY')
   return (<View style={styles.mainView}>
            <Text style={styles.header}>הגשת משמרות לשבוע הבא: </Text>
            <Text style={styles.header}>בחר תוית לסימון: </Text>
            <View style={styles.lableContainer}>
                {}
                    <TouchableOpacity style={styles.lableButton}>
                        <Image style={styles.tinyPluse} source={require('../assets/checked_icon_green.png')}/>
                        <Text style={styles.lableText}>יכול</Text>
                    </TouchableOpacity>
                <TouchableOpacity style={styles.lableButton}>
                    <Image style={styles.tinyPluse} source={require('../assets/unchecked_icon_red.png')}/>
                    <Text style={styles.lableText}>לא יכול</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.lableButton}>
                    <Image style={styles.tinyPluse} source={require('../assets/checked_icon_yellow.png')}/>
                    <Text style={styles.lableText}>מעדיף שלא</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.view}>
                <View >
                    <View style={styles.daysContainer}>
                            <Text style={styles.dayText}>א</Text>
                            <Text style={styles.dayText}>ב</Text>
                            <Text style={styles.dayText}>ג</Text>
                            <Text style={styles.dayText}>ד</Text>
                            <Text style={styles.dayText}>ה</Text>
                            <Text style={styles.dayText}>ו</Text>
                            <Text style={styles.dayText}>ז</Text>
                    </View>
                    <View style={styles.fillContainer}>
                        <View style={styles.stateContainer}>
                                <Text style={styles.stateText}>בוקר</Text>
                                <Text style={styles.stateText}>צהוריים</Text>
                                <Text style={styles.stateText}>ערב</Text>
                        </View>
                        <View style={styles.stateContainer}>
                                <View style={styles.dayText}></View>
                                <View style={styles.dayText}></View>
                                <View style={styles.dayText}></View>
                        </View>
                        <View style={styles.stateContainer}>
                                <View style={styles.dayText}></View>
                                <View style={styles.dayText}></View>
                                <View style={styles.dayText}></View>
                        </View>
                        <View style={styles.stateContainer}>
                                <View style={styles.dayText}></View>
                                <View style={styles.dayText}></View>
                                <View style={styles.dayText}></View>
                        </View>
                        <View style={styles.stateContainer}>
                                <View style={styles.dayText}></View>
                                <View style={styles.dayText}></View>
                                <View style={styles.dayText}></View>
                        </View>
                        <View style={styles.stateContainer}>
                                <View style={styles.dayText}></View>
                                <View style={styles.dayText}></View>
                                <View style={styles.dayText}></View>
                        </View>
                        <View style={styles.stateContainer}>
                                <View style={styles.dayText}></View>
                                <View style={styles.dayText}></View>
                                <View style={styles.dayText}></View>
                        </View>
                        <View style={styles.stateContainer}>
                                <View style={styles.dayText}></View>
                                <View style={styles.dayText}></View>
                                <View style={styles.dayText}></View>
                        </View>
                    </View>
                
                </View>
                <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText} >שלח משמרות</Text>
                </TouchableOpacity>

            </View>
            <Text style={styles.header}>המשמרות שלך לשבוע הנוכחי: </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    mainView:{
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width,

        alignItems:'flex-end',
    },
    view:{
        alignItems:'center',

        
     },
     lableContainer:{
        width:Dimensions.get('window').width,
         flexDirection:'row-reverse',
         alignItems: 'center',
         justifyContent: 'center',
         //marginHorizontal:15
     },
     lableButton:{
        textAlign:"center",
        justifyContent: 'center',
        alignItems: 'center',
        width:109,
        height:42,
        margin: 5,
        backgroundColor:"seashell",
        borderRadius:10,
        fontWeight:"bold",
        borderWidth:2,
        borderColor:"gray",
     },
     lableText:{
        textAlign:"center",
        borderRadius:10,
        fontWeight:"bold",
     },
     tinyPluse:{
        width: 15,
        height: 15,

     },
     header:{
         fontSize:16,
         color:"seashell",
         marginHorizontal:22,
         marginVertical:2,
        },
     daysContainer:{
        width:Dimensions.get('window').width,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row-reverse',
        marginHorizontal:Dimensions.get('window').width/50-10,
        
     },
     dayText:{
        textAlign:"center",
        width:Dimensions.get('window').width/12,
        height:35,
        margin: 5,
        backgroundColor:"seashell",
        borderRadius:10,
        fontWeight:"bold",
        
        
     },
     fillContainer:{
        width:Dimensions.get('window').width,
        flexDirection:'row-reverse',
        marginHorizontal:10,


     },
     stateContainer:{
        //flex:1,
        //justifyContent:'space-between',
        alignItems:'flex-end',
        flexDirection:'column',
        //marginHorizontal:20,
     },
     stateText:{
        textAlign:"center",
        width:50,
        height:35,
        margin: 5,
        backgroundColor:"seashell",
        borderRadius:10,
        fontWeight:"bold",
        fontSize:11,

     },
     button: {
        width: 200,
        backgroundColor: "#6f61ca",// #6357b5
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
        //marginLeft:50,

    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'seashell',
        textAlign: 'center',
    },

})

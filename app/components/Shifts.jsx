import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity,Dimensions } from 'react-native'
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
   // var heLocaleData = moment.localeData('he');
   // console.log(heLocaleData);
   //moment().tz('Asia/Jerusalem').format('MM/DD/YYYY')
   return (<View style={styles.mainView}>
            <Text style={styles.header}>הגשת משמרות לשבוע הבא: </Text>
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
                                <Text style={styles.dayText}></Text>
                                <Text style={styles.dayText}></Text>
                                <Text style={styles.dayText}></Text>
                        </View>
                        <View style={styles.stateContainer}>
                                <Text style={styles.dayText}></Text>
                                <Text style={styles.dayText}></Text>
                                <Text style={styles.dayText}></Text>
                        </View>
                        <View style={styles.stateContainer}>
                                <Text style={styles.dayText}></Text>
                                <Text style={styles.dayText}></Text>
                                <Text style={styles.dayText}></Text>
                        </View>
                        <View style={styles.stateContainer}>
                                <Text style={styles.dayText}></Text>
                                <Text style={styles.dayText}></Text>
                                <Text style={styles.dayText}></Text>
                        </View>
                        <View style={styles.stateContainer}>
                                <Text style={styles.dayText}></Text>
                                <Text style={styles.dayText}></Text>
                                <Text style={styles.dayText}></Text>
                        </View>
                        <View style={styles.stateContainer}>
                                <Text style={styles.dayText}></Text>
                                <Text style={styles.dayText}></Text>
                                <Text style={styles.dayText}></Text>
                        </View>
                        <View style={styles.stateContainer}>
                                <Text style={styles.dayText}></Text>
                                <Text style={styles.dayText}></Text>
                                <Text style={styles.dayText}></Text>
                        </View>
                    </View>
                
                </View>
                <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText} >שלח משמרות</Text>
                </TouchableOpacity>

            </View>
            <Text style={styles.header}>המשמרות שלך לשבוע הנוכחי: </Text>
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
                            <Text style={styles.dayText}></Text>
                            <Text style={styles.dayText}></Text>
                            <Text style={styles.dayText}></Text>
                    </View>
                    <View style={styles.stateContainer}>
                            <Text style={styles.dayText}></Text>
                            <Text style={styles.dayText}></Text>
                            <Text style={styles.dayText}></Text>
                    </View>
                    <View style={styles.stateContainer}>
                            <Text style={styles.dayText}></Text>
                            <Text style={styles.dayText}></Text>
                            <Text style={styles.dayText}></Text>
                    </View>
                    <View style={styles.stateContainer}>
                            <Text style={styles.dayText}></Text>
                            <Text style={styles.dayText}></Text>
                            <Text style={styles.dayText}></Text>
                    </View>
                    <View style={styles.stateContainer}>
                            <Text style={styles.dayText}></Text>
                            <Text style={styles.dayText}></Text>
                            <Text style={styles.dayText}></Text>
                    </View>
                    <View style={styles.stateContainer}>
                            <Text style={styles.dayText}></Text>
                            <Text style={styles.dayText}></Text>
                            <Text style={styles.dayText}></Text>
                    </View>
                    <View style={styles.stateContainer}>
                            <Text style={styles.dayText}></Text>
                            <Text style={styles.dayText}></Text>
                            <Text style={styles.dayText}></Text>
                    </View>
                </View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView:{
        alignItems:'flex-end',
    },
    view:{
        //flex:1,
        //justifyContent:'center',
        alignItems:'center',

        
     },
     header:{
         fontSize:16,
         color:"seashell",
         marginHorizontal:22,
         marginVertical:10,
        },
     daysContainer:{
         //flex:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row-reverse',
        marginHorizontal:100,
        
     },
     dayText:{
        textAlign:"center",
        width:32,
        height:35,
        margin: 5,
        backgroundColor:"seashell",
        borderRadius:10,
        fontWeight:"bold",
     },
     fillContainer:{
        flexDirection:'row-reverse',
        marginHorizontal:14,


     },
     stateContainer:{
        //flex:1,
        //justifyContent:'space-between',
        alignItems:'flex-end',
        flexDirection:'column-reverse',
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
        marginLeft:50,

    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'seashell',
        textAlign: 'center',
    },

})

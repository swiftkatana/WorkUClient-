import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import Shifts from '../../components/Shifts'
import { globalObject } from '../../src/globalObject'
import CheckBox from '@react-native-community/checkbox';
import { connect } from 'react-redux';
function Main({ navigation, style }) {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    return (
        <View style={{ ...styles.view, ...style.view }}>
            <View style={styles.buttonsContainer}>
                <Text style={styles.title}>ניהול משמרות</Text>
                <View style={styles.shiftsCon}>
                    <View style={styles.dayCont}>
                        <Text>יום א</Text>
                        <View style={styles.btnList}>
                            <Text style={styles.stateText}>בוקר</Text>
                            <TouchableOpacity style={styles.button} ><Text style={styles.buttonText}>יכולים</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.button} ><Text style={styles.buttonText}>לא יכולים</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.button} ><Text style={styles.buttonText}>מעדיפים שלא</Text></TouchableOpacity>
                        </View>
                        <View style={styles.btnList}>
                            <Text style={styles.stateText}>צהוריים</Text>
                            <TouchableOpacity style={styles.button} ><Text style={styles.buttonText}>יכולים</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.button} ><Text style={styles.buttonText}>לא יכולים</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.button} ><Text style={styles.buttonText}>מעדיפים שלא</Text></TouchableOpacity>
                        </View>
                        <View style={styles.btnList}>
                            <Text style={styles.stateText}>ערב</Text>
                            <TouchableOpacity style={styles.button} ><Text style={styles.buttonText}>יכולים</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.button} ><Text style={styles.buttonText}>לא יכולים</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.button} ><Text style={styles.buttonText}>מעדיפים שלא</Text></TouchableOpacity>
                        </View>
                    </View>
                    
                </View>
                <TouchableOpacity style={styles.exitButton} onPress={() => navigation.pop()}>
                    <Image style={styles.exitIcon} source={require('../../assets/exit_icon.png')} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        //marginTop:50,
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',


    },
    buttonsContainer:
    {
        flex: 1,
        //paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',


    },
    shiftsCon:{
        alignItems:'center',
        justifyContent: 'center',
        //height: Dimensions.get('window').height/2,
    },
    title:
    {
        textAlign:"center",
        width: Dimensions.get('window').width*0.80,
        margin: 20,
        //marginRight: 30,
        fontSize: 48,
        color: "seashell",
        borderBottomWidth:2,
        borderColor: "seashell",
    },
    dayCont:{
        height:Dimensions.get('window').height/4,
        alignItems:'center',
        textAlign:"center",
        justifyContent:'center',
        backgroundColor: "seashell",
        borderRadius:25,
        marginVertical:5,
    },
    btnList:{
        flexDirection: 'row-reverse',
        alignItems:'center',
        textAlign:"center",
        justifyContent:'center',
    },
    stateText:{
        alignItems:'center',
        textAlign:"center",
        justifyContent:'center',
        backgroundColor: "red",
        fontWeight:'bold',

    },
    button: {
        width: Dimensions.get('window').width *0.22,
        height: Dimensions.get('window').height / 18,
        backgroundColor: "red",
        borderRadius: 25,
        marginTop: 10,
        //marginBottom: 120,
        paddingVertical: 16,
        //marginHorizontal: 30,
        marginHorizontal:5,

    },

    buttonText: {
        fontSize: 11,
        fontWeight: '500',
        color: 'seashell',
        textAlign: 'center',
        fontWeight:'bold',
    },
    exitButton:
    {
        paddingTop: 40,


    },
    exitIcon:{
        height:50,
        width:50,
    },
})
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Main)
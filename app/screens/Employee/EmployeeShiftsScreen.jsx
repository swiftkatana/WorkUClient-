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
                <Text style={styles.title}>משמרות</Text>
                <View style={styles.shiftsCon}>
                    <Shifts style={style} navigation={navigation} />
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
    checkBoxContainer: {
        flex: 1,
        backgroundColor: 'seashell',
        margin: 20,
        marginVertical: 150,
        borderRadius: 30,
    },
    checkboxStyle: {

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
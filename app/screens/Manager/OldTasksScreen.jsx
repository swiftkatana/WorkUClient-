import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { globalObject } from '../../src/globalObject'
import InfoList from '../../components/InfoList';
import { connect } from 'react-redux';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
    responsiveScreenFontSize,
    responsiveScreenWidth
} from "react-native-responsive-dimensions";

function Main({ navigation, style }) {

    const GetLen = () => {
        return Object.keys(globalObject.User.tasks.completed).length;
    }
    const GetList = () => {
        let arr = [];
        for (var obj in globalObject.User.tasks.completed) {
            arr.push(globalObject.User.tasks.completed[obj]);
        }
        return arr;
    }

    const render = ({ item }) => {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={globalObject.styles.list} onPress={() => navigation.navigate('TaskUpdateVoiceScreen', { item: item, shouldRender: false })}>
                    <Text style={styles.listText}>תקציר: {item.title}</Text>
                    <Text style={styles.listText} >עובד: {item.fullName}</Text>
                    <Text style={styles.status}> סטטוס: {item.status}</Text>
                    <Image style={globalObject.styles.arrowIcon} source={require('../../assets/arrow_icon_black.png')} />
                </TouchableOpacity>
            </View>
        )
    }


    return (
        <View style={{ ...styles.view, ...style.view }}>
            <Text style={globalObject.styles.menuTitle}>
                היסטוריית משימות
                </Text>
            <View style={{ ...globalObject.styles.mainListCon, ...style.btn2, borderColor: style.btn3.backgroundColor }}>

                <View style={globalObject.styles.listContainer}>
                    <InfoList render={render} GetLen={GetLen} GetList={GetList} emptyInfo={'אין משימות ישנות'} opacity={1} src={require('../../assets/empty_icon_white.png')} />
                </View>
            </View>
            <TouchableOpacity style={globalObject.styles.exitButton} onPress={() => navigation.pop()}>
                <Image style={globalObject.styles.exitIcon} source={require('../../assets/exit_icon.png')} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    view: {
        //marginTop:50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height,


    },
    container:
    {
        //paddingTop: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',


    },
    listText:
    {
        flex: 3,
        textAlign: "center",
        fontSize: responsiveScreenFontSize(1.7),
        //marginLeft: 5,
        marginRight: responsiveScreenWidth(2),
        width: responsiveScreenWidth(1),
    },
    status:
    {
        flex: 3,
        textAlign: "center",
        //marginRight: 10,
        fontSize: responsiveScreenFontSize(1.7),
        fontWeight: "bold",
    },
})
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Main)
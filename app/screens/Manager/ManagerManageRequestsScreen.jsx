import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { globalObject } from '../../src/globalObject'
import InfoList from '../../components/InfoList';
import { connect } from 'react-redux';


function Main({ navigation, style }) {

    const GetLen = () => {
        let len = 0;
        let keys = Object.keys(globalObject.User.personalRequests);
        for (let i = 0; i < keys.length; i++) {
            if (globalObject.User.personalRequests[keys[i]].status == "בטיפול")
                len++;
        }
        return len;
    }
    const GetList = () => {
        var arr = [];
        for (var obj in globalObject.User.personalRequests) {
            let request = globalObject.User.personalRequests[obj];
            if (request.status === "בטיפול")
                arr.push({ id: request._id, email: request.email, type: request.type, body: request.body, fullName: request.fullName, status: request.status, date: request.date });
        }
        return arr;
    }

    const render = ({ item }) => {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={globalObject.styles.list} onPress={() => navigation.navigate("HandleSingleRequestScreen", { item })}>
                    <Text style={globalObject.styles.listText}>תאריך: {item.date}</Text>
                    <Text style={globalObject.styles.listText} >סוג הבקשה: {item.type}</Text>
                    <Text style={globalObject.styles.listText}>שם עובד: {item.fullName}</Text>
                    <Image style={globalObject.styles.arrowIcon} source={require('../../assets/arrow_icon_black.png')} />
                </TouchableOpacity>
            </View>
        )
    }


    return (
        <View style={{ ...styles.view, ...style.view }}>
            <Text style={globalObject.styles.menuTitle}>
                בקשות לטיפול
                </Text>
            <View style={{ ...globalObject.styles.mainListCon, ...style.view, borderColor: style.btn3.backgroundColor,backgroundColor: style.btn2.backgroundColor }}>

                <View style={globalObject.styles.listContainer}>
                    <InfoList render={render} GetLen={GetLen} GetList={GetList} emptyInfo={'אין בקשות לטיפול'} opacity={1} src={require('../../assets/empty_icon_white.png')} />
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',


    },
})
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Main)
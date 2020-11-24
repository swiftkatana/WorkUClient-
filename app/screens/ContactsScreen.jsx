import React, { useEffect } from 'react';
import { Dimensions, Image, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { globalObject } from '../src/globalObject';
import InfoList from '../components/InfoList';
import { connect } from 'react-redux';
import { responsiveHeight, responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';






function Main({ navigation, style }) {
    const GetLen = () => {
        if (globalObject.User.employees) {
            let keys = Object.keys(globalObject.User.employees);
            let len = keys.length;
            return len;
        }
        return 0;
    }
    const GetList = () => {
        var arr = [];

        for (var obj in globalObject.User.employees) {
            let employee = globalObject.User.employees[obj];
            if (employee.email !== globalObject.User.email)
                arr.push({ ...employee, id: employee.phone });
        }
        return arr;
    }

    const render = ({ item }) => {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={globalObject.styles.list} onPress={() => navigation.navigate("DisplaySingleContactScreen", { item: item })}>
                    <Image style={styles.userIcon} source={{ uri: item.imageProfile }} />
                    <Text style={styles.listText}>שם: {item.fullName}</Text>
                    <Image style={globalObject.styles.arrowIcon} source={require('../assets/arrow_icon_black.png')} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ ...styles.view, ...style.view }}>


            <Text style={globalObject.styles.menuTitle}>אנשי קשר</Text>
            <View style={{ ...styles.mainListCon, ...style.btn2, borderColor: style.btn3.backgroundColor }}>

                <View style={styles.listContainer}>

                    <InfoList render={render} GetLen={GetLen} GetList={GetList} emptyInfo={'אין אנשי קשר'} src={require('../assets/empty_icon_white.png')} />
                </View>
            </View>


            <TouchableOpacity style={globalObject.styles.exitButton} onPress={() => navigation.pop()}>
                <Image style={globalObject.styles.exitIcon} source={require('../assets/exit_icon.png')} />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({

    view: {
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
    mainListCon: {
        height: Dimensions.get('window').height / 1.6,
        width: Dimensions.get('window').width / 1.1,
        borderWidth: 1,
        borderRadius: 25,
    },
    listContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height / 1.7,
        width: Dimensions.get('window').width / 1.1,
        marginTop: responsiveScreenHeight(1),
    },
    listText:
    {
        flex: 4,
        textAlign: "center",
        fontSize: responsiveScreenFontSize(1.7),
    },
    userIcon: {
        width: responsiveScreenHeight(4.5),
        height: responsiveScreenHeight(4.5),
        marginRight: responsiveScreenWidth(5),
    },
})


const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Main)
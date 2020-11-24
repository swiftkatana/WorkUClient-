import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { globalObject } from '../../src/globalObject'

function Main({ navigation, style }) {




    return (
        <View style={{ ...styles.view, ...style.view }}>
            <View style={globalObject.styles.menuBtnContainer}>
                <Text style={globalObject.styles.menuTitle}>פורטל עובד</Text>
                <TouchableOpacity style={globalObject.styles.menuBtn} onPress={() => navigation.navigate("WorkingTimeReportScreen")}>
                    <Text style={globalObject.styles.menuBtnText}>דו"ח שעות חודשי</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalObject.styles.menuBtn} onPress={() => navigation.navigate("EmployeeShiftsScreen")}>
                    <Text style={globalObject.styles.menuBtnText}>שליחת משמרות</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalObject.styles.menuBtn} onPress={() => navigation.navigate("EmployeePayChecksScreen")}>
                    <Text style={globalObject.styles.menuBtnText}>תלושי שכר</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalObject.styles.exitButton} onPress={() => navigation.pop()}>
                    <Image style={globalObject.styles.exitIcon} source={require('../../assets/exit_icon.png')} />
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

})

const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Main)
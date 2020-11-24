import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import { Line } from 'react-native-svg'
import { connect } from 'react-redux'
import { globalObject } from '../../src/globalObject'

function Main({ navigation, style }) {
    return (
        <View style={{ ...styles.view, ...style.view }}>
            <View style={globalObject.styles.menuBtnContainer}>
                <Text style={globalObject.styles.menuTitle}>כלי ניהול</Text>
                <TouchableOpacity style={globalObject.styles.menuBtn} onPress={() => navigation.navigate("DisplayWorkingTimeReportOfEmployee")}>
                    <Text style={globalObject.styles.menuBtnText}>דו"ח שעות חודשי של עובד</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalObject.styles.menuBtn}>
                    <Text style={globalObject.styles.menuBtnText}>שליחת תלוש משכורת</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalObject.styles.menuBtn} onPress={() => navigation.navigate("OldTasksScreen")}>
                    <Text style={globalObject.styles.menuBtnText}>היסטוריית משימות</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalObject.styles.menuBtn} onPress={() => navigation.navigate("NewTaskScreen")}>
                    <Text style={globalObject.styles.menuBtnText}>שלח משימה לעובד</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalObject.styles.menuBtn} onPress={() => navigation.navigate("ManageShifts")}>
                    <Text style={globalObject.styles.menuBtnText}>ניהול משמרות</Text>
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
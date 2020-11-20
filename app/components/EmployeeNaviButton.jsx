import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { globalObject } from '../src/globalObject';
function Main({ navigation, style }) {
    return (
        <View style={styles.view}>
            <TouchableOpacity style={{ ...styles.settings, ...style.view }} onPress={() => navigation.navigate('MainRequestScreen')}>
                <Image style={styles.tinyLogo} source={require('../assets/notebook_icon.png')} />
                <Text style={styles.settingsFont}>בקשות</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ ...styles.settings, ...style.view }} onPress={() => navigation.navigate('EmployeePortalScreen')}>
                <Image style={styles.tinyLogo} source={require('../assets/suitcase_icon.png')} />
                <Text style={styles.settingsFont}>פורטל עובד</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ ...styles.settings, ...style.view }} onPress={() => navigation.navigate('employeeStatisticScreen')}>
                <Image style={styles.tinyLogo} source={require('../assets/statistics_icon.png')} />
                <Text style={styles.settingsFont}>סטטיסטיקה</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ ...styles.settings, ...style.view }} onPress={() => navigation.navigate('ManagerMainScreen')}>
                <Image style={styles.tinyLogo} source={require('../assets/chat_icon_2.png')} />
                <Text style={styles.settingsFont}>צ'אט</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    view:
    {
        marginTop: 5,
        flex: 2,
        flexDirection: "row-reverse",
        justifyContent: "space-evenly",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: "#efeef4",
        marginHorizontal: 10,
        marginBottom: 5,
        textAlign: "center",
        alignItems: 'center',
    },
    settings:
    {
        borderRadius: 30,
        width: 75,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingsFont:
    {
        textAlign: "center",
        fontSize: 11,
        color: "seashell",
        fontWeight: "bold",
    },
    tinyLogo:
    {
        width: 30,
        height: 30,
    },
})
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Main)
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { globalObject } from '../src/globalObject';

function ManagerNaviButton({ navigation, style }) {



    return (
        <View style={styles.view}>


            <TouchableOpacity style={{ ...styles.settings, ...style.btn1 }} onPress={() => navigation.navigate('ManagerManageRequestsScreen')}>
                <Image style={styles.tinyLogo} source={require('../assets/notebook_icon.png')} />
                <Text style={styles.settingsFont}>ניהול בקשות</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ ...styles.settings, ...style.btn1 }} onPress={() => navigation.navigate('ManagerToolsScreen')}>
                <Image style={styles.tinyLogo} source={require('../assets/suitcase_icon.png')} />
                <Text style={styles.settingsFont}>כלי ניהול</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ ...styles.settings, ...style.btn1 }}>
                <Image style={styles.tinyLogo} source={require('../assets/statistics_icon.png')} />
                <Text style={styles.settingsFont}>סטטיסטיקה</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ ...styles.settings, ...style.view }} onPress={() => navigation.navigate('ContactsScreen')}>
                <Image style={styles.tinyLogo} source={require('../assets/group_icon.png')} />
                <Text style={styles.settingsFont}>אנשי קשר</Text>
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
        width: 79,
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
    tinyLogo: {
        width: 30,
        height: 30,
    },
})
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(ManagerNaviButton)
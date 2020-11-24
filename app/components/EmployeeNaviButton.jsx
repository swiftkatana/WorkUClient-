import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { connect } from 'react-redux';
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

            <TouchableOpacity style={{ ...styles.settings, ...style.view }} onPress={() => navigation.navigate('EmployeeCurrentShifts')}>
                <Image style={styles.tinyLogo} source={require('../assets/time_icon_3.png')} />
                <Text style={styles.settingsFont}>משמרות</Text>
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
        //marginTop: 5,
        flex: 2,
        flexDirection: "row-reverse",
        justifyContent: "space-evenly",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: "#efeef4",
        marginHorizontal: responsiveScreenWidth(2),
        marginBottom: responsiveScreenHeight(1),
        textAlign: "center",
        alignItems: 'center',
    },
    settings:
    {
        borderRadius: 30,
        width: responsiveScreenWidth(22),
        height: responsiveScreenWidth(19),
        justifyContent: 'center',
        alignItems: 'center',

    },
    settingsFont:
    {
        textAlign: "center",
        fontSize: responsiveScreenFontSize(1.4),
        color: "seashell",
        fontWeight: "bold",
    },
    tinyLogo: {
        width: responsiveScreenHeight(4),
        height: responsiveScreenHeight(4),
    },
})
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Main)
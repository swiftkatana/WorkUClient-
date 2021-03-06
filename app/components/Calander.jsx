import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import 'moment/locale/he';

const onSelected = (date) => {
}
function Calander(test,) {
    return (
        <View style={styles.view}>
            <CalendarStrip
                calendarAnimation={{ type: 'sequence', duration: 30 }}
                daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white' }}
                style={styles.calendarStrip}
                calendarColor={'#7f71e3'}
                calendarHeaderStyle={{ color: 'white' }}
                dateNumberStyle={{ color: 'white' }}
                dateNameStyle={{ color: 'white', fontSize: 11 }}
                highlightDateNumberStyle={{ color: 'rebeccapurple' }}
                highlightDateNameStyle={{ color: 'rebeccapurple', fontSize: 11 }}
                disabledDateNameStyle={{ color: 'grey' }}
                disabledDateNumberStyle={{ color: 'grey' }}
                iconContainer={{ flex: 0.1 }}
                numDaysInWeek={7}
                onDateSelected={onSelected}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    calendarStrip: {
        height: 200,
        width: Dimensions.get('window').width,
        paddingTop: 20,
        paddingBottom: 10
    },
})
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Calander)
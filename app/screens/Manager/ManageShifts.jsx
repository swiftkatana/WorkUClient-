import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import { globalObject } from '../../src/globalObject'
import requestList from "../../src/api/apiKeys";
import { connect } from 'react-redux';
import { Picker } from '@react-native-community/picker';
import { FlatList } from 'react-native-gesture-handler';
function Main({ navigation, style }) {

    const [day, SetDay] = useState(0);
    const [state, Setstate] = useState(2);

    const finalShift = useRef(
        {
            day1: {
                morning: [],
                lunch: [],
                evening: [],
            },
            day2: {
                morning: [],
                lunch: [],
                evening: [],
            },
            day3: {
                morning: [],
                lunch: [],
                evening: [],
            },
            day4: {
                morning: [],
                lunch: [],
                evening: [],
            },
            day5: {
                morning: [],
                lunch: [],
                evening: [],
            },
            day6: {
                morning: [],
                lunch: [],
                evening: [],
            },
            day7: {
                morning: [],
                lunch: [],
                evening: [],
            },
        }
    );

    const [days, SetDays] = useState({
        day1: {
            morning: 0,
            lunch: 0,
            evening: 0,
        },
        day2: {
            morning: 0,
            lunch: 0,
            evening: 0,
        },
        day3: {
            morning: 0,
            lunch: 0,
            evening: 0,
        },
        day4: {
            morning: 0,
            lunch: 0,
            evening: 0,
        },
        day5: {
            morning: 0,
            lunch: 0,
            evening: 0,
        },
        day6: {
            morning: 0,
            lunch: 0,
            evening: 0,
        },
        day7: {
            morning: 0,
            lunch: 0,
            evening: 0,
        },
    });

    const [num, SetNum] = useState(0);

    const Send = async () => {
        console.log(1);
        const res = await globalObject.SendRequest(requestList.sendNewShiftUrl, { email: globalObject.User.email, shift: finalShift.current });
        console.log(1);
        if (res) {
            navigation.navigate("ManagerMainScreen");
            return;
        }
        else
        {
            console.log(res);
        }

    }

    const HandlePress = (item, shift) => {

        var key = ["morning", "lunch", "evening"];
        const employees = globalObject.company.employees;
        var keys = Object.keys(employees);
        const d = Object.keys(employees[keys[0]].shift);
        if (item.email) {
            finalShift.current[d[day]][key[shift]].push(item.email);
            var newDays = days;
            newDays[d[day]][key[shift]] += 1;
            SetDays(newDays);
            SetNum(num + 1);

        }

    }
    const renderButton = ({ item }) => {
        return (
            <View style={styles.list}>
                <TouchableOpacity style={styles.styleState} onPress={() => Setstate(1)}>
                    <Text style={styles.listText}>{item.can}</Text>
                </TouchableOpacity >

                <TouchableOpacity style={styles.styleState} onPress={() => Setstate(2)}>
                    <Text style={styles.listText}>{item.perferNot}</Text>
                </TouchableOpacity >

                <TouchableOpacity style={styles.styleState} onPress={() => Setstate(3)}>
                    <Text style={styles.listText}>{item.cannot}</Text>
                </TouchableOpacity >

            </View>
        )
    }
    const renderHeader = ({ item }) => {
        return (
            <View style={styles.list}>
                <Text style={styles.listText}>{item.can}</Text>
                <Text style={styles.listText}>{item.perferNot}</Text>
                <Text style={styles.listText}>{item.cannot}</Text>
            </View>
        )
    }
    const renderEmployee = (obj, shift) => {
        const item = obj.item;
        return (
            <TouchableOpacity onPress={() => HandlePress(item, shift)}>
                <View style={styles.listC}>
                    <Text style={styles.listText}>{item.fullName}</Text>
                </View>
            </TouchableOpacity>

        )
    }

    const CreateList = () => {
        var arr2 = [];
        var arrDay = Object.keys(days);
        var state = Object.keys(days[arrDay[0]]);
        let key = 0;
        for (let row = 0; row < 7; row++) {
            var arr = [];
            for (let column = 0; column < 3; column++) {
                arr.push(
                    <View key={key} style={styles.fillBox}>
                        <View style={styles.touchableStyle}>
                            <Text>{days[arrDay[row]][state[column]]}</Text>
                        </View>
                    </View>
                );
                key++;
            }
            arr2.push(
                <View key={key} style={styles.stateContainer}>
                    {arr.map((item) => item)}
                </View>
            );
            key++;
        }
        return <>{arr2.map((item) => item)}</>;
    };

    const GetEmployyesFromDay = () => {
        var arr = [[], [], []];

        const employees = globalObject.company.employees;
        var keys = Object.keys(employees);
        if (keys.length > 0) {
            const days = Object.keys(employees[keys[0]].shift);
            const states = Object.keys(employees[keys[0]].shift[days[0]]);
            for (let i = 0; i < keys.length; i++) {
                if (employees[keys[i]].shift)
                    for (let j = 0; j < 3; j++) {

                        if (employees[keys[i]].shift[days[day]][states[j]] === state) {
                            arr[j].push({ ...employees[keys[i]], id: ((j + 1) * i).toString() });
                        }
                    }
            }
        }
        return arr;
    }

    const employyes = GetEmployyesFromDay();
    return (
        <View style={{ ...styles.view, ...style.view }}>
            <View style={styles.buttonsContainer}>
                <Text style={styles.title}>ניהול משמרות</Text>
                <Picker
                    prompt='בחר יום'
                    mode='dialog'
                    selectedValue={day}
                    style={styles.itemList}
                    onValueChange={(itemValue) => SetDay(itemValue)}>

                    <Picker.Item label="א'" value="0" />
                    <Picker.Item label="ב'" value="1" />
                    <Picker.Item label="ג'" value="2" />
                    <Picker.Item label="ד'" value="3" />
                    <Picker.Item label="ה'" value="4" />
                    <Picker.Item label="ו'" value="5" />
                    <Picker.Item label="ש'" value="6" />
                </Picker>


                <View style={styles.header}>
                    <FlatList
                        data={[{ cannot: "לא יכול", perferNot: "מעדיף שלא", can: "יכול", id: "-1" }]}
                        renderItem={renderButton}
                        keyExtractor={item => item.id}
                    />
                </View>

                <View style={styles.header}>
                    <FlatList
                        data={[{ cannot: "ערב", perferNot: "צהוריים", can: "בוקר", id: "-2" }]}
                        renderItem={renderHeader}
                        keyExtractor={item => item.id}
                    />
                </View>

                <View style={styles.header2}>


                    <View style={styles.header3}>
                        <FlatList
                            data={employyes[0]}
                            renderItem={(obj) => renderEmployee(obj, 0)}
                            keyExtractor={item => item.id}
                        />
                    </View>

                    <View style={styles.header3}>
                        <FlatList
                            data={employyes[1]}
                            renderItem={(obj) => renderEmployee(obj, 1)}
                            keyExtractor={item => item.id}
                        />
                    </View>

                    <View style={styles.header3}>
                        <FlatList
                            data={employyes[2]}
                            renderItem={(obj) => renderEmployee(obj, 2)}
                            keyExtractor={item => item.id}
                        />
                    </View>

                </View>


                <View>
                    <View style={styles.daysContainer}>
                        <Text style={styles.dayText}>א</Text>
                        <Text style={styles.dayText}>ב</Text>
                        <Text style={styles.dayText}>ג</Text>
                        <Text style={styles.dayText}>ד</Text>
                        <Text style={styles.dayText}>ה</Text>
                        <Text style={styles.dayText}>ו</Text>
                        <Text style={styles.dayText}>ז</Text>
                    </View>
                    <View style={styles.fillContainer}>
                        <View style={styles.stateContainer}>
                            <Text style={styles.stateText}>בוקר</Text>
                            <Text style={styles.stateText}>צהוריים</Text>
                            <Text style={styles.stateText}>ערב</Text>
                        </View>
                        {CreateList()}
                    </View>

                </View>


                <TouchableOpacity style={styles.sendBtn} onPress={Send}>
                    <Text style={styles.sendBtnText}>עדכן משמרות לשבוע הבא</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.exitButton} onPress={() => navigation.pop()}>
                    <Image style={styles.exitIcon} source={require('../../assets/exit_icon.png')} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    view:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listText:
    {
        flex: 1,
        textAlign: "center",
        justifyContent: "center",
        fontSize: 14,
    },
    itemList:
    {
        width: Dimensions.get('window').width,
        color: "#ffffff",
        textAlign: 'right',
    },
    buttonsContainer:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height / 18,
        marginHorizontal: 10,
    },
    header2:
    {
        flexDirection: "row-reverse",
    },
    header3: {
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height * 0.25,
        width: Dimensions.get('window').width * 0.315,
        borderColor: "white",
        borderWidth: 1,
    },
    list:
    {
        width: Dimensions.get('window').width * 0.95,
        height: Dimensions.get('window').height * 0.05,
        backgroundColor: "white",
        flexDirection: "row-reverse",
        alignItems: 'center',
        borderWidth: 2,
        borderColor: "lightgrey",
    },
    listC:
    {
        width: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').height * 0.05,
        backgroundColor: "white",
        flexDirection: "column-reverse",
        alignItems: 'center',
        borderWidth: 2,
        borderColor: "lightgrey",
    },
    title:
    {
        textAlign: "center",
        width: Dimensions.get('window').width * 0.80,
        margin: 20,
        fontSize: 48,
        color: "seashell",
        borderBottomWidth: 2,
        borderColor: "seashell",
    },
    sendBtn: {

        width: 200,
        height: 50,
        backgroundColor: "white",
        borderRadius: 25,
        justifyContent: 'center',
    },
    sendBtnText: {
        textAlign: "center",
        fontWeight: 'bold',
    },
    exitButton:
    {
        paddingTop: 40,
    },
    exitIcon: {
        height: 50,
        width: 50,
    },

    fillBox: {
        textAlign: "center",
        width: Dimensions.get("window").width / 12,
        height: 35,
        margin: 5,
        backgroundColor: "seashell",
        borderRadius: 10,
        fontWeight: "bold",
    },
    touchableStyle: {
        textAlign: "center",
        width: Dimensions.get("window").width / 12,
        height: 35,
        margin: 5,
        borderRadius: 10,
        fontWeight: "bold",
    },
    daysContainer: {

        width: Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row-reverse",
        marginHorizontal: Dimensions.get("window").width / 50 - 10,
    },
    dayText: {
        textAlign: "center",
        width: Dimensions.get("window").width / 12,
        height: 35,
        margin: 5,
        backgroundColor: "seashell",
        borderRadius: 10,
        fontWeight: "bold",
        backgroundColor: "lightgrey",
    },

    stateText: {
        textAlign: "center",
        width: 50,
        height: 35,
        margin: 5,
        backgroundColor: "seashell",
        borderRadius: 10,
        fontWeight: "bold",
        fontSize: 11,
        backgroundColor: "lightgrey",
    },

    stateContainer: {
        alignItems: "flex-end",
        flexDirection: "column",
    },

    fillContainer: {
        width: Dimensions.get("window").width,
        flexDirection: "row-reverse",
        marginHorizontal: 10,
    },
    styleState:
    {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
        marginHorizontal: 2,
    },
})
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Main)
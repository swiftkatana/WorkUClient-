import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import Shifts from '../../components/Shifts'
import { globalObject } from '../../src/globalObject'
import CheckBox from '@react-native-community/checkbox';
import { connect } from 'react-redux';
import { Picker } from '@react-native-community/picker';
import { FlatList } from 'react-native-gesture-handler';
function Main({ navigation, style }) {

    const [day, SetDay] = useState(1);

    const renderHeader = ({ item }) => {
        return (
            <View style={styles.list}>
                <Text style={styles.listText}>{item.can}</Text>
                <Text style={styles.listText}>{item.perferNot}</Text>
                <Text style={styles.listText}>{item.cannot}</Text>
    
            </View>
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

    
    const GetEmployyesFromDay = (index,state)=>
    {
        var keys = Object.keys(globalObject.company.pendingShifts);
        for(let i = 0;i<keys.length;i++)
        {
            globalObject.company.pendingShifts[keys[i]].days[index][state];
        }
    }

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

                        <Picker.Item label="א'" value="1'" />
                        <Picker.Item label="ב'" value="2" />
                        <Picker.Item label="ג'" value="3" />
                        <Picker.Item label="ד'" value="4" />
                        <Picker.Item label="ה'" value="5'" />
                        <Picker.Item label="ו'" value="6" />
                        <Picker.Item label="ש'" value="7" />
                    </Picker>
                    <View  style={styles.header}>
                        <FlatList
                            data={[{ cannot: "לא יכול", perferNot: "מעדיף שלא", can: "יכול", id: "-1" }]}
                            renderItem={renderHeader}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    {/* <View  style={styles.header}>
                        <FlatList
                            data={}
                            renderItem={renderHeader}
                            keyExtractor={item => item.id}
                        />
                    </View> */}


                    <View style={{marginBottom:20,}}>

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
        alignItems:'center',
        justifyContent: 'center',
    },
    listText:
    {
        flex: 1,
        textAlign: "center",
        fontSize: 14,
    },
    itemList:
    {
        width: Dimensions.get('window').width ,
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
        alignItems:'center',
        justifyContent:'center',
        height: Dimensions.get('window').height/18,

    },
    list:
    {
        width: Dimensions.get('window').width*0.95,
        height:Dimensions.get('window').height*0.05,
        backgroundColor: "white",
        flexDirection: "row-reverse",
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "lightgrey",
        marginHorizontal:5,
    },
    title:
    {
        textAlign:"center",
        width: Dimensions.get('window').width*0.80,
        margin: 20,
        fontSize: 48,
        color: "seashell",
        borderBottomWidth:2,
        borderColor: "seashell",
    },
    exitButton:
    {
        paddingTop: 40,
    },
    exitIcon:{
        height:50,
        width:50,
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

})
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Main)
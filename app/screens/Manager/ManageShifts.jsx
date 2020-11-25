import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { globalObject } from "../../src/globalObject";
import requestList from "../../src/api/apiKeys";
import { connect } from "react-redux";
import { Picker } from "@react-native-community/picker";
import { FlatList } from "react-native-gesture-handler";
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";
function Main({ navigation, style }) {
  const [day, SetDay] = useState(0);
  const [state, Setstate] = useState(2);

  const daysString = ["day1", "day2", "day3", "day4", "day5", "day6", "day7"];
  const stateString = ["morning", "lunch", "evening"];

  const finalShift = useRef({
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
  });

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
    const res = await globalObject.SendRequest(requestList.sendNewShiftUrl, {
      email: globalObject.User.email,
      shift: finalShift.current,
    });
    if (res) {
      Object.keys(globalObject.User.employees).forEach((email) => {
        globalObject.sendNotification(
          email,
          res,
          "התקבל משמרת חדשה",
          "מידע נוסף במשמרות",
          "finalShiftGot"
        );
      });

      globalObject.sendSocketMessage(
        "managerSendFinalShift",
        res,
        globalObject.User.company
      );
      navigation.navigate("ManagerMainScreen");
    } else {
      // add alert to the user
    }
  };

  const HandlePress = (item, shift) => {
    if (item.email) {
      finalShift.current[daysString[day]][stateString[shift]].push(item.email);
      var newDays = days;
      newDays[daysString[day]][stateString[shift]] += 1;
      SetDays(newDays);
      SetNum(num + 1);
    }
  };
  const renderButton = ({ item }) => {
    return (
      <View style={styles.list}>
        <TouchableOpacity style={styles.styleState} onPress={() => Setstate(1)}>
          <Text style={styles.listText}>{item.can}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.styleState} onPress={() => Setstate(3)}>
          <Text style={styles.listText}>{item.perferNot}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.styleState} onPress={() => Setstate(2)}>
          <Text style={styles.listText}>{item.cannot}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderHeader = ({ item }) => {
    return (
      <View style={styles.list}>
        <Text style={styles.listText}>{item.can}</Text>
        <Text style={styles.listText}>{item.perferNot}</Text>
        <Text style={styles.listText}>{item.cannot}</Text>
      </View>
    );
  };
  const renderEmployee = (obj, shift) => {
    const item = obj.item;
    return (
      <TouchableOpacity onPress={() => HandlePress(item, shift)}>
        <View style={styles.listC}>
          <Text style={styles.listText}>{item.fullName}</Text>
        </View>
      </TouchableOpacity>
    );
  };

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
      for (let i = 0; i < keys.length; i++) {
        if (employees[keys[i]].shift.day1) {
          for (let j = 0; j < 3; j++) {
            if (
              employees[keys[i]].shift[daysString[day]][stateString[j]] ===
              state
            ) {
              arr[j].push({
                ...employees[keys[i]],
                id: ((j + 1) * i).toString(),
              });
            }
          }
        }
      }
    }
    return arr;
  };

  const employyes = GetEmployyesFromDay();
  return (
    <View style={{ ...styles.view, ...style.view }}>
      <View style={styles.buttonsContainer}>
        <Text style={globalObject.styles.menuTitle}>ניהול משמרות</Text>
        <Text style={globalObject.styles.subTextWhite}>בחר יום ומצב של זמינות של עובדים ולאחר מכן בחר עובד מהרשימה המתאימה </Text>
        <Picker
          prompt="בחר יום"
          mode="dialog"
          selectedValue={day}
          style={styles.itemList}
          onValueChange={(itemValue) => SetDay(itemValue)}
        >
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
            data={[
              {
                cannot: "לא יכול",
                perferNot: "מעדיף שלא",
                can: "יכול",
                id: "-1",
              },
            ]}
            renderItem={renderButton}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={styles.header}>
          <FlatList
            data={[
              { cannot: "ערב", perferNot: "צהוריים", can: "בוקר", id: "-2" },
            ]}
            renderItem={renderHeader}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={styles.header2}>
          <View style={styles.header3}>
            <FlatList
              data={employyes[0]}
              renderItem={(obj) => renderEmployee(obj, 0)}
              keyExtractor={(item) => item.id}
            />
          </View>

          <View style={styles.header3}>
            <FlatList
              data={employyes[1]}
              renderItem={(obj) => renderEmployee(obj, 1)}
              keyExtractor={(item) => item.id}
            />
          </View>

          <View style={styles.header3}>
            <FlatList
              data={employyes[2]}
              renderItem={(obj) => renderEmployee(obj, 2)}
              keyExtractor={(item) => item.id}
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

        <TouchableOpacity style={{...globalObject.styles.regButton, backgroundColor: style.btn2.backgroundColor }} onPress={Send}>
          <Text style={globalObject.styles.regButtonText}>עדכן משמרות לשבוע הבא</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalObject.styles.exitButton}
          onPress={() => navigation.pop()}
        >
          <Image
            style={globalObject.styles.exitIcon}
            source={require("../../assets/exit_icon.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listText: {
    flex: 0.9,
    textAlign: "center",
    justifyContent: "center",
    fontSize: responsiveScreenFontSize(1.4), //11
    fontWeight:'bold',
    
  },
  itemList: {
    width: responsiveScreenWidth(90),
    color: "#ffffff",
    textAlign: "right",
    alignItems: "center",
    justifyContent: "center",
    
  },
  buttonsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    height: responsiveScreenHeight(5),
    //marginHorizontal: 10,
  },
  header2: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
  },
  header3: {
    alignItems: "center",
    justifyContent: "center",
    height: responsiveScreenHeight(16),
    width: responsiveScreenWidth(30),
    margin: responsiveScreenWidth(1),
    backgroundColor: 'seashell',
    borderColor: "grey",
    borderWidth: 1,
    borderRadius:15,

  },
  list: {
    width: responsiveScreenWidth(94),
    height: responsiveScreenHeight(4.5),
    backgroundColor: "seashell",
    flexDirection: "row-reverse",
    alignItems: "center",
    borderWidth: 1,
    borderRadius:10,
    borderColor: "lightgrey",
    alignItems:'center',
    justifyContent:'center',
  },
  listC: {
    width: responsiveScreenWidth(27),
    height: responsiveScreenHeight(4),
    backgroundColor: "white",
    flexDirection: "column-reverse",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 10,
    marginTop: responsiveScreenWidth(1),

  },

  fillBox: {
    textAlign: "center",
    width: responsiveScreenWidth(8.5),
    height: responsiveScreenHeight(4.2),
    margin: responsiveScreenWidth(1.2),
    backgroundColor: "seashell",
    borderRadius: 10,
    fontWeight: "bold",
  },
  touchableStyle: {
    textAlign: "center",
    width: responsiveScreenWidth(9),
    height: responsiveScreenHeight(4.4),
    //margin: 5,
    borderRadius: 11,
    fontWeight: "bold",
    borderWidth:2,
    borderColor:'lightgrey',
    alignItems:'center',
    justifyContent:'center',
  },
  daysContainer: {
    width: responsiveScreenWidth(76),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row-reverse",
  },
  dayText: {
    textAlign: "center",
    width: responsiveScreenWidth(8.5),
    height: responsiveScreenHeight(4.2),
    margin: responsiveScreenWidth(1.2),
    backgroundColor: "seashell",
    borderRadius: 10,
    fontWeight: "bold",
    backgroundColor: "lightgrey",
  },

  stateText: {
    textAlign: "center",
    justifyContent:'center',
    width: responsiveScreenWidth(12.6),
    height: responsiveScreenHeight(4.2),
    margin: responsiveScreenWidth(1.2),
    backgroundColor: "seashell",
    borderRadius: 10,
    fontWeight: "bold",
    fontSize: responsiveScreenFontSize(1.4),
    backgroundColor: "lightgrey",
  },

  stateContainer: {
    alignItems: "flex-end",
    flexDirection: "column",
    justifyContent:'center',

  },

  fillContainer: {
    width: responsiveScreenWidth(91),
    flexDirection: "row-reverse",
   //marginHorizontal: 10,
  },
  styleState: {
    flex: 1,
    alignItems: "center",
    textAlign: 'center',
    backgroundColor: "white",
    margin: responsiveScreenWidth(0.5),
    borderRadius: 10,
    justifyContent:'center',
    borderWidth:1,
    borderColor:'lightgrey',
  },
});
const mapStateToProps = (state) => {
  return { style: state.styles };
};
export default connect(mapStateToProps, {})(Main);

import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { globalObject } from '../../src/globalObject'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { connect } from 'react-redux';


function Main({ navigation, style }) {
    const myData = {
        labels: ["סה''כ לא הושלמו", "סה''כ הושלמו"],
        datasets: [
            {
                data: [28, 80]
            }
        ],
        legend: ["Rainy Days"] // optional
    };
    const progressRingData = {
        labels: ["הושלמו"], // optional
        data: [0.4]
    };
    const width = Dimensions.get("window").width - 60;

    return (
        <View style={{ ...styles.view, ...style.view }}>
            <TouchableOpacity style={styles.exitButton} onPress={() => navigation.pop()}>
                <Text style={styles.exitText}>X</Text>
            </TouchableOpacity>
            <View style={styles.buttonsContainer}>
                <Text style={styles.title}>הסטטיסטיקות שלי</Text>
            </View>
            <View style={styles.chartContainer}>
                <Text style={styles.text}>משימות שהושלמו לעומת משימות שלא הושלמו</Text>
                <BarChart
                    style={styles.chartStyle}
                    data={myData}
                    width={width}
                    height={220}
                    chartConfig={chartConfig}
                    verticalLabelRotation={5}
                    fromZero={true}


                    showValuesOnTopOfBars="true"
                />
                <Text style={styles.text}>התקדמות של השלמת המשימות הפתוחות</Text>
                <ProgressChart
                    style={styles.chartStyle}
                    data={progressRingData}
                    width={width}
                    height={220}
                    strokeWidth={16}
                    radius={52}
                    chartConfig={chartConfig}
                    hideLegend={false}

                />
            </View>
        </View>
    )
}

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional
};

const styles = StyleSheet.create({
    view:
    {
        flex: 1,

    },
    buttonsContainer:
    {
        alignItems: 'flex-end',
    },

    title:
    {
        margin: 20,
        marginRight: 30,
        fontSize: 28,
        color: "seashell",
        textDecorationLine: "underline"
    },
    text: {
        fontSize: 16,
        color: "seashell",
    },
    chartContainer: {
        alignItems: 'center',
    },
    chartStyle: {

        marginVertical: 8,
        borderRadius: 16,


    },
    exitButton:
    {
        paddingTop: 60,
        marginLeft: 30,
    },
    exitText:
    {
        fontSize: 30,
        color: "seashell",

    }
})
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Main)
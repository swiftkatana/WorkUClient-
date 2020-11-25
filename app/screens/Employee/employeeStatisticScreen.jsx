import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
} from "react-native";
import { globalObject } from "../../src/globalObject";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from "react-native-chart-kit";
import { connect } from "react-redux";


function Main({ navigation, style }) {
    const myData = {
        labels: ["סה''כ לא הושלמו", "סה''כ הושלמו"],
        datasets: [
            {
                data: [28, 80],
            },
        ],
        legend: ["Rainy Days"], // optional
    };
    const progressRingData = {
        labels: ["הושלמו"], // optional
        data: [0.4],
    };
    const width = Dimensions.get("window").width - 60;

    return (
        <View style={{ ...styles.view, ...style.view }}>

            <View style={styles.buttonsContainer}>
                <Text style={globalObject.styles.menuTitle}>עמוד זה בפיתוח</Text>
            </View>
            <View style={styles.chartContainer}>
                <Text style={styles.text}>משימות שהושלמו לעומת משימות שלא הושלמו</Text>
                <BarChart
                    style={styles.chartStyle}
                    data={myData}
                    width={width}
                    height={200}
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
                    height={140}
                    strokeWidth={16}
                    radius={52}
                    chartConfig={chartConfig}
                    hideLegend={false}
                />
                <TouchableOpacity style={globalObject.styles.exitButton} onPress={() => navigation.pop()}>
                    <Image style={globalObject.styles.exitIcon} source={require('../../assets/exit_icon.png')} />
                </TouchableOpacity>
            </View>


        </View>
    );
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
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height,
    },
    buttonsContainer: {
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },

    title: {
        margin: 20,
        marginRight: 30,
        fontSize: 28,
        color: "seashell",
        textDecorationLine: "underline",
    },
    text: {
        fontSize: 16,
        color: "seashell",
    },
    chartContainer: {
        alignItems: "center",
    },
    chartStyle: {
        marginVertical: 8,
        borderRadius: 16,
    },
});
const mapStateToProps = (state) => {
    return { style: state.styles };
};
export default connect(mapStateToProps, {})(Main);

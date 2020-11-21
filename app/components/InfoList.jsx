import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';



export default function Main({ render, GetLen, GetList, emptyInfo, src, opacity, textColor }) {
    const [list, UpdateList] = useState([])
    const [currentLen, UpdateCurrentLen] = useState(0);
    const [shouldShow, setShouldShow] = useState(false);

    useEffect(() => {
        const handle = setInterval(() => {
            let len = GetLen();
            if (currentLen != len)
                UpdateCurrentLen(len);

        }, 100);

        let arr = GetList();
        if (arr.length == 0) {
            setShouldShow(true);
        } else {
            setShouldShow(false);
        }
        UpdateList(arr);

        return () => {
            clearInterval(handle);
        }
    }, [currentLen])

    return (
        <View>

            {shouldShow ? (
                <View style={styles.emptyContainer}>
                    <Image style={{ ...styles.emptyIcon, opacity: opacity ? opacity : 1 }} source={src} />
                    <Text style={{ ...styles.emptyText, color: textColor ? textColor : "white" }}>{emptyInfo}</Text>
                </View>

            ) : null}


            <FlatList
                data={list}
                renderItem={render}
                keyExtractor={item => item.id || item._id}
            />
        </View>
    )
}
const styles = StyleSheet.create({


    emptyContainer:
    {
        width: Dimensions.get('window').width,
        alignItems: "center",
    },

    emptyText:
    {
        color: "white",
        fontWeight: 'bold',
    },
    emptyIcon: {
        marginTop: 90,
        width: 80,
        height: 80,

    },
});
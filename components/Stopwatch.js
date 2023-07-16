import  React, { useState, useRef, useCallback } from "react";
import { StyleSheet, SafeAreaView, Text, View, Platform, TextInput } from "react-native";
import { StatusBar } from "react-native";
import Result from "./Result";
import Control from "./Control";
import { displayTime, displayDollars } from "./util";

export default function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false)
    const [results, setResults] = useState([])
    const timer = useRef(null)
    const [hourly, setHourly] = useState(0)

    const handleLeftButtonPress = useCallback(()=> {
        if(isRunning) {
            setResults((previousResults) => [time, ...previousResults])
        } else {
            setResults([])
            setTime(0)
        }
    }, [isRunning, time])

    const handleRightButtonPress = useCallback(()=> {
        if (!isRunning) {
            const interval = setInterval(() => {
                setTime((previousTime)=> previousTime + 1)
            }, 10);

            timer.current = interval
        } else {
            clearInterval(timer.current)
        }

        setIsRunning((previousState) => !previousState)
    }, [isRunning])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.display}>
                <Text style={styles.dollarText}>${displayDollars(time)}</Text>
                <Text style={styles.displayText}>{displayTime(time)}</Text>
            </View>
            <View style={styles.control}>
                <Control
                    isRunning={isRunning}
                    handleLeftButtonPress={handleLeftButtonPress}
                    handleRightButtonPress={handleRightButtonPress}
                />
            </View>
            <View style={styles.hourlyContainer}>
                <Text style={styles.hourly}>Hourly Wage:</Text>
                <TextInput
                    style={styles.input}
                    placeholder= '0'
                    

            />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
    },
    display: {
      flex: 3 / 5,
      justifyContent: "center",
      alignItems: "center",
    },
    displayText: {
      color: "#fff",
      fontSize: 30,
      fontWeight: "200",
      fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : null,
    },
    dollarText: {
        color: "#fff",
        fontSize: 70,
        fontWeight: "200",
        fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : null,
    },
    control: {
      height: 70,
      flexDirection: "row",
      justifyContent: "space-around",
    },
    result: { 
        flex: 2 / 5 },
    input: {
        height: 40,
        width: 70,
        borderColor: "#fff",
        borderWidth: 1,
        color: 'white'
    },
    hourly: {
        color: "white"
    },
    hourlyContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginTop: 50,
    }
  });
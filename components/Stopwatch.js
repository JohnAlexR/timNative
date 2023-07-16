import  React, { useState, useRef, useCallback } from "react";
import { StyleSheet, SafeAreaView, Text, View, Platform, TextInput, TouchableOpacity } from "react-native";
import { StatusBar } from "react-native";
import Control from "./Control";
import { displayTime, displayDollars } from "./util";

export default function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false)
    const [results, setResults] = useState([])
    const timer = useRef(null)
    const [hourly, setHourly] = useState(0)
    const [taxRate, setTaxRate] = useState(null)
    const [isStandardDollar, setIsStandardDollar] = useState(false)

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

    function changeStandard() {
        setIsStandardDollar(prevState=>!prevState)
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <TouchableOpacity style={styles.display} onPress={changeStandard}>
                <View style={styles.display}>
                    <Text style={styles.dollarText}>${displayDollars(time, hourly, taxRate, isStandardDollar)}</Text>
                    <Text style={styles.displayText}>{displayTime(time)}</Text>
                </View>
            </TouchableOpacity>
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
                    placeholder= '$0'
                    placeholderTextColor={'#f8f8ff'}
                    value={hourly}
                    keyboardType="numeric"
                    inputType="numeric"
                    onChangeText={(text) => setHourly(text)}
                    maxLength={5}
            />
            </View>
            <View style={styles.hourlyContainer}>
                <Text style={styles.hourly}>Tax % (optional)</Text>
                <TextInput
                    style={styles.input}
                    value={taxRate}
                    placeholder='0%'
                    placeholderTextColor={'#f8f8ff'}
                    keyboardType="numeric"
                    inputType='numeric'
                    onChangeText={(text) => setTaxRate(text)}
                    maxLength={2}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    display: {
      flex: 3 / 5,
      justifyContent: "center",
      alignItems: "center",
    },
    displayText: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "200",
      fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : null,
    },
    dollarText: {
        color: "#fff",
        fontSize: 70,
        fontWeight: "200",
        fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : null,
        overflow: 'hidden',
        maxWidth: '100%'
    },
    control: {
      height: 70,
      width: '100%',
      flexDirection: "row",
      justifyContent: "space",
      gap: 40,

    },
    result: { 
        flex: 2 / 5 },
    input: {
        height: 40,
        width: 95,
        borderColor: "#fff",
        borderWidth: 1,
        color: 'white',
        padding: 5,
        textAlign: 'center',
        fontSize: 20
    },
    hourly: {
        color: "white",
        fontSize: 20
    },
    hourlyContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginTop: 50,
    }
  });
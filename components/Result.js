import React from "react"
import { StyleSheet, Text, ScrollView, View, SafeAreaView } from "react-native";
import { displayTime } from "./util"

function Result ( {results}) {

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={StyleSheet.resultItem} />

                {results.map((item, index) => (
                    <View key={index} style={StyleSheet.resultItem}>
                        <Text style={StyleSheet.resultItemText}>
                            Lap {results.length - index}
                        </Text>
                        <Text style={StyleSheet.resultItemText}>{displayTime(item)}</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    resultItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderColor: "#313131",
      height: 50,
      paddingHorizontal: 15,
    },
    resultItemText: { color: "#fff" },
  });
  export default React.memo(Result);
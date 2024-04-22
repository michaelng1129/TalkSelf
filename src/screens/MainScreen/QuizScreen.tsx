import React, { memo, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Navigation } from "../../core";


type Props = {
    navigation: Navigation;
};

const QuizScreen = ({ navigation }: Props) => {
    const handleButtonPress = (screenName: string) => {
        navigation.navigate(screenName);
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity style={styles.touchArea} onPress={() => handleButtonPress('ReadingQuizScreen')}>
                    <Text style={styles.text}>Reading Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchArea} onPress={() => handleButtonPress('WrittingQuizScreen')}>
                    <Text style={styles.text}>Writing Quiz</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={styles.touchArea} onPress={() => handleButtonPress('ListeningQuizScreen')}>
                    <Text style={styles.text}>Listening Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchArea} onPress={() => handleButtonPress('SpeakingQuizScreen')}>
                    <Text style={styles.text}>Speaking Quiz</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    touchArea: {
        width: 150, 
        height: 300,
        backgroundColor: 'black',
        marginRight: 20, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white'
    },
});

export default memo(QuizScreen);


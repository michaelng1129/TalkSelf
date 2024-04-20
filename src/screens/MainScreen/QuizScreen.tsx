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
            <TouchableOpacity style={styles.touchArea} onPress={() => handleButtonPress('ReadingQuizScreen')}>
                <Text style={styles.text}>Reading</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchArea} onPress={() => handleButtonPress('WrittingQuizScreen')}>
                <Text style={styles.text}>Writing</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchArea} onPress={() => handleButtonPress('ListeningQuizScreen')}>
                <Text style={styles.text}>Listening</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchArea} onPress={() => handleButtonPress('SpeakingQuizScreen')}>
                <Text style={styles.text}>Speaking</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchArea: {
        width: 300,
        height: 150,
        backgroundColor: 'lightblue',
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
    }
});

export default memo(QuizScreen);


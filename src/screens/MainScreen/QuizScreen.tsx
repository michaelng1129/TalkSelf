import React, { memo } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import { Navigation, theme } from "../../core";


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
                <Image source={require('../../assets/reading.png')} style={styles.image} />

                </TouchableOpacity>
                <TouchableOpacity style={styles.touchArea} onPress={() => handleButtonPress('WritingQuizScreen')}>
                <Image source={require('../../assets/writing.png')} style={styles.image} />

                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={styles.touchArea} onPress={() => handleButtonPress('ListeningQuizScreen')}>
                <Image source={require('../../assets/listening.png')} style={styles.image} />

                </TouchableOpacity>
                <TouchableOpacity style={styles.touchArea} onPress={() => handleButtonPress('SpeakingQuizScreen')}>
                <Image source={require('../../assets/speaking.png')} style={styles.image} />

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
        height: 250,
        backgroundColor: theme.colors.whiteBackground,
        marginRight: 20, 
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
    },
    text: {
        fontSize: 18,
        color: 'white'
    },
    image: {
        width: 100, 
        height: 130,
    }
});

export default memo(QuizScreen);


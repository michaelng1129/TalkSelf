import React, { memo } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Navigation } from '../../core';

type Props = {
    navigation: Navigation;
};
const TalkIndexScreen = ({ navigation }: Props) => {
    const handleButtonPress = () => {
        navigation.navigate('SpeechRecognitionRootScreen');
    }

    return (

        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                <Text style={styles.buttonText}>Start Speaking Training</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'black', 
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white', 
        textAlign: 'center',
        fontSize: 16,
    },
});

export default memo(TalkIndexScreen);

import React, { memo, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const SpeakingQuizScreen = () => {
    const [userVoiceInput, setUserVoiceInput] = useState("");

    // Function to handle user voice input
    const handleVoiceInput = (voiceInput: string) => {
        setUserVoiceInput(voiceInput);
        // Logic to handle user's voice input
    };

    // Sample hardcoded question
    const question = "Please repeat the following sentence: 'The quick brown fox jumps over the lazy dog.'";

    return (
        <View style={styles.container}>
            {/* Question */}
            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{question}</Text>
            </View>

            {/* Microphone */}
            <View style={styles.microphoneContainer}>
                {/* Microphone component */}
                {/* Example: */}
                {/* <MicrophoneComponent onVoiceInput={handleVoiceInput} /> */}
                <Text>User Voice Input: {userVoiceInput}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    questionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    microphoneContainer: {
        height: 200, // Set the height of the microphone container
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
});

export default memo(SpeakingQuizScreen);

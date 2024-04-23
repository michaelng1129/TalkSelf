import React, { memo, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import AudioRecorderPlayer, { AudioEncoderAndroidType, AudioSet, AudioSourceAndroidType } from 'react-native-audio-recorder-player';
import speakingDifflib from "../../API/speakingDifflib";
import * as RNFS from '@dr.pogodin/react-native-fs';
import RNSecureStorage from "rn-secure-storage";

const SpeakingQuizScreen = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioPath, setAudioPath] = useState("");
    const [audioRecorderPlayer, setAudioRecorderPlayer] = useState(new AudioRecorderPlayer());

    const onStartRecording = async () => {
        try {
            const audioUri = await audioRecorderPlayer.startRecorder();
            setIsRecording(true);
            setAudioPath(audioUri);

        } catch (error) {
            console.log("Error starting recording:", error);
        }
    };

    const onStopRecording = async () => {
        try {
            const result = await audioRecorderPlayer.stopRecorder();
            setIsRecording(false);
            const audioBlob = await RNFS.readFile(audioPath, 'base64');
            const jwt = await RNSecureStorage.getItem("jwtToken");
            if (jwt === null) {
                console.error('JWT is null');
                return;
            }
            speakingDifflib(audioBlob, jwt, question)

        } catch (error) {
            console.log("Error stopping recording:", error);
        } finally {
            setAudioRecorderPlayer(new AudioRecorderPlayer());
        }
    };


    // Sample hardcoded question
    const heading = "Please repeat the following sentence: "
    const question = 'The quick brown fox jumps over the lazy dog.'


    return (
        <View style={styles.container}>
            {/* Question */}
            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{heading}</Text>
                <Text style={styles.questionText}>{question}</Text>
            </View>

            <View style={styles.microphoneContainer}>
                <TouchableOpacity
                    onPress={isRecording ? onStopRecording : onStartRecording}
                    style={styles.recordButton}
                >
                    <Text style={styles.recordButtonText}>{isRecording ? "Stop Recording" : "Start Recording"}</Text>
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
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    recordButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'black',
        borderRadius: 5,
    },
    recordButtonText: {
        color: 'white',
        fontSize: 16,
    },
    audioPath: {
        marginTop: 20,
        fontSize: 14,
    },
});

export default memo(SpeakingQuizScreen);

import React, { memo, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import speakingDifflib from "../../API/speakingDifflib";
import * as RNFS from '@dr.pogodin/react-native-fs';;

const SpeakingQuizScreen = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioPath, setAudioPath] = useState("");
    const audioRecorderPlayer = new AudioRecorderPlayer();

    const onStartRecording = async () => {
        try {
            const audioUri = await audioRecorderPlayer.startRecorder();
            setIsRecording(true);
            setAudioPath(audioUri);

        } catch (error) {
            console.error("Error starting recording:", error);
        }
    };

    const onStopRecording = async () => {
        try {
            const result = await audioRecorderPlayer.stopRecorder();
            setIsRecording(false);
            console.log(result)
            const audioBlob = await RNFS.readFile(audioPath, 'base64');
            console.log(audioBlob)
            const formData = new FormData();
            formData.append('audio', audioBlob);
            //speakingDifflib(formData)

        } catch (error) {
            console.error("Error stopping recording:", error);
        }
    };


    // Sample hardcoded question
    const question = "Please repeat the following sentence: \n \n'The quick brown fox jumps over the lazy dog.'";

    return (
        <View style={styles.container}>
            {/* Question */}
            <View style={styles.questionContainer}>
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

            {audioPath ? <Text style={styles.audioPath}>{audioPath}</Text> : null}

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

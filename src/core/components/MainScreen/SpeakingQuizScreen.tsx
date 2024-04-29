import React, { memo, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import AudioRecorderPlayer, { AudioEncoderAndroidType, AudioSet, AudioSourceAndroidType } from 'react-native-audio-recorder-player';
import speakingDifflib from "../../API/speakingDifflib";
import * as RNFS from '@dr.pogodin/react-native-fs';
import RNSecureStorage from "rn-secure-storage";
import { theme } from "../..";

const SpeakingQuizScreen = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioPath, setAudioPath] = useState("");
    const [audioRecorderPlayer, setAudioRecorderPlayer] = useState(new AudioRecorderPlayer());
    const [diffResult, setDiffResult] = useState<{ differences: string[], similarity: number } | null>(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [isNextQuestion, setIsNextQuestion] = useState(false);
    const [isQuizFinished, setIsQuizFinished] = useState(false);

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
            const diffResult = await speakingDifflib(audioBlob, jwt, getCurrentQuestion())
            setDiffResult(diffResult);
            if (questionIndex === questions.length - 1) {
                setIsQuizFinished(true)
            } else {
                setIsNextQuestion(true);
            }
        } catch (error) {
            console.log("Error stopping recording:", error);
        } finally {
            setAudioRecorderPlayer(new AudioRecorderPlayer());
        }
    };

    const getCurrentQuestion = () => {
        return questions[questionIndex];
    };

    const handleNextQuestion = () => {
        setIsNextQuestion(false);
        setDiffResult(null);
        setQuestionIndex(prevIndex => prevIndex + 1);
    };


    // Sample hardcoded question
    const heading = "Please repeat the following sentence: "
    const questions = [
        'I go to school by bus',
        'She reads a book every night',
        'They play football in the park',
    ];


    return (
        <View style={styles.container}>
            {isQuizFinished ? (
                <View>
                    {/* Render total score screen */}
                    {/* Example: */}
                    <Text>Total Score: X/Y</Text>
                    <TouchableOpacity>
                        <Text>Restart Quiz</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.container}>
                    <View style={styles.areaAContainer}>
                        <Text style={styles.questionHeading}>{heading}</Text>
                        <View style={styles.space} />
                        <Text style={styles.questionText}>{getCurrentQuestion()}</Text>
                    </View>
                    <View style={styles.areaBContainer}>
                        {diffResult && (
                            <View style={styles.differencesContainer}>
                                {diffResult.differences.map((diffLine, index) => {
                                    if (!diffLine.startsWith("+")) {
                                        return (
                                            <Text key={index} style={getStyleForDiff(diffLine)}>
                                                {diffLine.substring(1)}
                                            </Text>
                                        );
                                    }
                                    return null;
                                })}
                            </View>
                        )}
                    </View>
                    <View style={styles.areaCContainer}>
                        <View style={styles.microphoneContainer}>
                            {diffResult && diffResult.similarity && (
                                <Text style={styles.similarityText}>Marks: {diffResult.similarity}/100</Text>
                            )}
                            {isNextQuestion ? (
                                <TouchableOpacity
                                    onPress={handleNextQuestion}
                                    style={styles.nextButton}
                                >
                                    <Text style={styles.nextButtonText}>Next</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress={isRecording ? onStopRecording : onStartRecording}
                                    style={styles.recordButton}
                                >
                                    <Text style={styles.recordButtonText}>{isRecording ? "Stop Recording" : "Start Recording"}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View >
            )}
        </View >
    );
}

const getStyleForDiff = (diff: string) => {
    if (diff.startsWith(" ")) {
        return styles.greenText;
    } else if (diff.startsWith("-")) {
        return styles.redText;
    } else {
        return styles.defaultText;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    areaAContainer: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionHeading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    space: {
        height: 20,
    },
    questionText: {
        fontSize: 24,
        textAlign: 'center',
    },
    areaBContainer: {
        flex: 0.3,
    },
    differencesContainer: {
        flexDirection: 'row',
    },
    defaultText: {
        fontSize: 24,
    },
    greenText: {
        fontSize: 24,
        color: 'green',
    },
    redText: {
        fontSize: 24,
        color: theme.colors.error,
    },
    areaCContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        flex: 0.3
    },
    microphoneContainer: {
        flex: 1
    },
    similarityText: {
        flex: 0.5,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    recordButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'black',
        borderRadius: 5,
    },
    recordButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    nextButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'black',
        borderRadius: 5,
    },
    nextButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    audioPath: {
        marginTop: 20,
        fontSize: 14,
    },
});

export default memo(SpeakingQuizScreen);

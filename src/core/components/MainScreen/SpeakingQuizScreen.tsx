import React, { memo, useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import speakingDifflib from "../../API/speakingDifflib";
import * as RNFS from '@dr.pogodin/react-native-fs';
import RNSecureStorage from "rn-secure-storage";
import { theme } from "../..";
import * as Progress from 'react-native-progress';

const SpeakingQuizScreen = () => {
    const [showQuestions, setShowQuestions] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioPath, setAudioPath] = useState("");
    const [audioRecorderPlayer, setAudioRecorderPlayer] = useState(new AudioRecorderPlayer());
    const [diffResult, setDiffResult] = useState<{ differences: string[], similarity: number } | null>(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [isNextQuestion, setIsNextQuestion] = useState(false);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [totalScore, setTotalScore] = useState<number[]>([]);
    const [showFinishButton, setShowFinishButton] = useState(false);
    const [progress, setProgress] = useState(0);

    const questions = [
        'I go to school by bus',
        'She reads a book every night',
        'They play football in the park',
        'I go to school on foot',
        'See you, goodBye'
    ];

    useEffect(() => {
        setProgress(questionIndex / questions.length);
    }, [questionIndex, questions.length]);


    const total = totalScore.reduce((acc, curr) => acc + curr, 0);
    const averageScore = totalScore.length > 0 ? total / totalScore.length : 0;

    const handleStartQuiz = () => {
        setShowQuestions(true);
    };

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
            console.log(result)
            setIsRecording(false);
            const audioBlob = await RNFS.readFile(audioPath, 'base64');
            const jwt = await RNSecureStorage.getItem("jwtToken");
            if (jwt === null) {
                console.error('JWT is null');
                return;
            }
            const diffResult = await speakingDifflib(audioBlob, jwt, getCurrentQuestion())
            console.log(diffResult)
            setDiffResult(diffResult);
            const score = diffResult.similarity
            const updatedScores = [...totalScore];
            updatedScores.push(score);
            setTotalScore(updatedScores);

            if (questionIndex === questions.length - 1) {
                setShowFinishButton(true)
                setProgress(1);
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

    const handleFinishQuiz = () => {
        setIsQuizFinished(true);
    };

    return (
        <View style={styles.container}>
            {!showQuestions && (
                <View style={styles.container}>
                    <Text style={styles.questionHeading}>Please repeat the following sentence</Text>
                    <View style={styles.space} />
                    <View>
                        <TouchableOpacity style={styles.startButton} onPress={handleStartQuiz}>
                            <Text style={styles.startButtonText}>Start Spaking Quiz</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {showQuestions && (
                <View>
                    {isQuizFinished ? (
                        <View>
                            <Text style={styles.totalScore}>Total Score: {averageScore.toFixed(2)}/100</Text>
                        </View>
                    ) : (
                        <View style={styles.container}>
                            <View style={styles.topBarContainer}>
                                <Progress.Bar progress={progress} width={300} color={theme.colors.topBar} borderWidth={3} />
                            </View>
                            <View style={styles.areaAContainer}>

                                <Text style={styles.questionText}>{getCurrentQuestion()}</Text>
                            </View>
                            <View style={styles.areaBContainer}>
                                {diffResult && (
                                    <View style={styles.differencesContainer}>
                                        {diffResult.differences.map((diffLine, index) => {
                                            if (!diffLine.startsWith("+") && !diffLine.startsWith("?")) {
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
                                    <View>
                                        {diffResult && diffResult.similarity !== null && (
                                            <Text style={styles.similarityText}>Marks: {diffResult.similarity}/100</Text>
                                        )}

                                    </View>
                                    {showFinishButton ? (
                                        <TouchableOpacity onPress={handleFinishQuiz} style={styles.finishButton}>
                                            <Text style={styles.finishButtonText}>Finish</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <View>
                                            {isNextQuestion ? (
                                                <TouchableOpacity onPress={handleNextQuestion} style={styles.nextButton}>
                                                    <Text style={styles.nextButtonText}>Next</Text>
                                                </TouchableOpacity>
                                            ) : (
                                                <TouchableOpacity onPress={isRecording ? onStopRecording : onStartRecording} style={styles.recordButton}>
                                                    <Text style={styles.recordButtonText}>{isRecording ? "Stop Recording" : "Start Recording"}</Text>
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View >
                    )}
                </View >
            )}
        </View>
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
    startButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: theme.colors.blackText,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    startButtonText: {
        fontSize: 16,
        color: theme.colors.text,
    },
    topBarContainer: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    areaAContainer: {
        flex: 0.3,
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
        color: theme.colors.greenText,
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
        borderTopColor: theme.colors.sQBoard,
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
        backgroundColor: theme.colors.blackBackGround,
        borderRadius: 5,
    },
    recordButtonText: {
        color: theme.colors.text,
        textAlign: 'center',
        fontSize: 16,
    },
    nextButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: theme.colors.blackBackGround,
        borderRadius: 5,
    },
    nextButtonText: {
        color: theme.colors.text,
        textAlign: 'center',
        fontSize: 16,
    },
    audioPath: {
        marginTop: 20,
        fontSize: 14,
    },
    totalScore: {
        fontSize: 20,
        color: theme.colors.blackText,
    },
    finishButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: theme.colors.blackBackGround,
        borderRadius: 5,
    },
    finishButtonText: {
        color: theme.colors.text,
        textAlign: 'center',
        fontSize: 16,
    },

});

export default memo(SpeakingQuizScreen);

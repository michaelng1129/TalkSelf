import React, { memo, useState } from "react";
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView } from "react-native";
import { theme, writingResult } from "../..";

interface ResultType {
    score: number;
    Content: string;
    Language: string;
    Organization: string;
}

const WritingQuizScreen = () => {
    const [inputText, setInputText] = useState("");
    const [showQuestions, setShowQuestions] = useState(false);
    const [result, setResult] = useState<ResultType>({
        score: 0,
        Content: '',
        Language: '',
        Organization: ''
    });
    const [printResult, setPrintResult] = useState(false)


    const topic = 'How about your School Life'

    const handleInputChange = (text: string) => {
        setInputText(text);
    }

    const handleSubmit = () => {
        //setInputText("");
        writingResult(topic, inputText).then(res => {
            if (res.success === true) {
                const responseData = res as { success: boolean; data: ResultType };
                //console.log('Data:', responseData.data);
                setResult(responseData.data);
                setPrintResult(true)
            } else {
                console.log('Error message:', (res as { success: boolean; msg: any; }).msg);
            }
        });
    }

    const handleStartQuiz = () => {
        setShowQuestions(true);
    };

    const backToScreen = () => {
        setPrintResult(false)
    };

    return (
        <View style={styles.container}>
            {!showQuestions && (
                <View style={styles.headerContainer}>
                    <Text style={styles.questionHeading}>Write an essay based on the topic</Text>
                    <View style={styles.space} />
                    <TouchableOpacity style={styles.startButton} onPress={handleStartQuiz}>
                        <Text style={styles.startButtonText}>Start Writing Quiz</Text>
                    </TouchableOpacity>
                </View>
            )}
            {showQuestions && (
                <View style={styles.container}>
                    {printResult ? (
                        <ScrollView style={styles.resultContainer} showsVerticalScrollIndicator={false}>
                            <View style={styles.tableContainer}>
                                <View style={styles.tableRowHeader}>
                                    <Text style={styles.tableHeaderText}>Content:</Text>
                                </View>
                                <View style={styles.tableRow}>
                                    <Text style={styles.tableRowText}>{result.Content}</Text>
                                </View>
                                <View style={styles.tableRowHeader}>
                                    <Text style={styles.tableHeaderText}>Language:</Text>
                                </View>
                                <View style={styles.tableRow}>
                                    <Text style={styles.tableRowText}>{result.Language}</Text>
                                </View>
                                <View style={styles.tableRowHeader}>
                                    <Text style={styles.tableHeaderText}>Organization:</Text>
                                </View>
                                <View style={styles.tableRow}>
                                    <Text style={styles.tableRowText}>{result.Organization}</Text>
                                </View>
                                <View style={styles.tableRowHeader}>
                                    <Text style={styles.tableHeaderText}>Score:</Text>
                                </View>
                                <View style={styles.tableRow}>
                                    <Text style={styles.tableRowScore}>{result.score}</Text>
                                </View>
                            </View>
                            <View style={styles.backButtonContainer}>
                                <TouchableOpacity style={styles.backButton} onPress={backToScreen}>
                                    <Text style={styles.backButtonText}>Back</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    ) : (
                        <View style={styles.inputContainer}>
                            <View style={[styles.areaAContainer]}>
                                <Text style={styles.title}>{topic}</Text>
                            </View>
                            <View style={[styles.areaBContainer]}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleInputChange}
                                    value={inputText}
                                    multiline
                                    placeholder="Type your answer here..."
                                    textAlignVertical="top"
                                />
                            </View>
                            <View style={[styles.areaCContainer]}>
                                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                    <Text style={styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    headerContainer: {
        flex: 1,
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
    startButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: theme.colors.blackBackGround,
        borderRadius: 5,
    },
    startButtonText: {
        fontSize: 16,
        color: theme.colors.text,
        textAlign: 'center'
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    areaAContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.1
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    areaBContainer: {
        flex: 0.7,
        width: 350
    },
    input: {
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    areaCContainer: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: theme.colors.blackBackGround,
        padding: 15,
        borderRadius: 10,
        width: 100,
        height: 50,
    },
    buttonText: {
        color: theme.colors.text,
        fontSize: 16,
        textAlign: 'center',
    },
    resultContainer: {
        marginTop: 10,
        flex: 1,
    },
    tableContainer: {
        borderColor: theme.colors.blackBackGround,
        borderRadius: 1,
        flex: 1
    },
    tableRowHeader: {
        flexDirection: 'row',
        borderWidth: 1,
        justifyContent: 'center',
    },
    tableHeaderText: {
        color: theme.colors.blackText,
        fontSize: 20,
        padding: 5
    },
    tableRow: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: theme.colors.blackBackGround,
        width: '100%',
        justifyContent: 'center',
    },
    tableRowText: {
        color: theme.colors.blackText,
        fontSize: 16,
        padding: 10
    },
    tableRowScore: {
        fontSize: 50,
    },
    backButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    backButton: {
        backgroundColor: theme.colors.blackBackGround,
        padding: 15,
        borderRadius: 10,
        width: 100,
        height: 50,
    },
    backButtonText: {
        fontSize: 16,
        color: theme.colors.text,
        textAlign: 'center'
    }
});

export default memo(WritingQuizScreen);

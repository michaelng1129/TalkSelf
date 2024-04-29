import React, { memo, useState } from "react";
import { StyleSheet, View, TextInput, Button, Text, Dimensions, TouchableOpacity } from "react-native";
import { Navigation, theme } from "../..";


type Props = {
    navigation: Navigation;
};

const WritingQuizScreen = ({ navigation }: Props) => {
    const [inputText, setInputText] = useState("");
    const [showQuestions, setShowQuestions] = useState(false);

    const handleInputChange = (text: string) => {
        setInputText(text);
    }

    const handleSubmit = () => {
        console.log("Submitted:", inputText);
        setInputText("");
    }

    const handleStartQuiz = () => {
        setShowQuestions(true);
    };

    return (
        <View style={styles.container}>

            {!showQuestions && (
                <View style={styles.container}>
                    <Text style={styles.questionHeading}>Write an essay based on the topic</Text>
                    <View style={styles.space} />
                    <TouchableOpacity style={styles.startButton} onPress={handleStartQuiz}>
                        <Text style={styles.startButtonText}>Start Writing Quiz</Text>
                    </TouchableOpacity>
                </View>
            )}
            {showQuestions && (
                <View style={styles.container}>
                    <View style={[styles.areaAContainer]}>
                        <Text style={styles.title}>How about your School Life</Text>
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
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

});

export default memo(WritingQuizScreen);

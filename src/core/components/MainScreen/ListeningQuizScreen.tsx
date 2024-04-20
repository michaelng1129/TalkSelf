import React, { memo, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const ListeningQuizScreen = () => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showQuestions, setShowQuestions] = useState(false);

    // Sample hardcoded questions
    const questions = [
        {
            id: 1,
            text: "What is the capital of France?",
            options: ["London", "Paris", "Berlin", "Rome"],
            correctAnswer: "Paris"
        },
        {
            id: 2,
            text: "Who painted the Mona Lisa?",
            options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
            correctAnswer: "Leonardo da Vinci"
        }
        // Add more questions as needed
    ];

    const handleStartQuiz = () => {
        setCurrentQuestionIndex(0);
        setShowQuestions(true);
    };

    const handleAnswerSelection = (answer: string) => {
        setSelectedAnswer(answer);
        // Logic to handle the selected answer
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null); // Reset selected answer for the next question
        } else {
            // End of questions
            // You can add logic to show quiz results or navigate to another screen
        }
    };

    return (
        <View style={styles.container}>
            {/* Start Button */}
            {!showQuestions && (
                <TouchableOpacity style={styles.startButton} onPress={handleStartQuiz}>
                    <Text style={styles.startButtonText}>Start Quiz</Text>
                </TouchableOpacity>
            )}

            {/* Quiz Questions */}
            {showQuestions && (
                <View style={styles.quizContainer}>
                    <Text style={styles.questionText}>{questions[currentQuestionIndex].text}</Text>
                    {/* Render options */}
                    {questions[currentQuestionIndex].options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.option, selectedAnswer === option && styles.selectedOption]}
                            onPress={() => handleAnswerSelection(option)}
                        >
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
                        <Text style={styles.nextButtonText}>Next</Text>
                    </TouchableOpacity>
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
    startButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#2196F3',
        borderRadius: 5,
    },
    startButtonText: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    quizContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    option: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        marginBottom: 10,
    },
    optionText: {
        fontSize: 16,
    },
    selectedOption: {
        backgroundColor: '#64b5f6',
    },
    nextButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#2196F3',
        borderRadius: 5,
    },
    nextButtonText: {
        fontSize: 18,
        color: '#FFFFFF',
    },
});

export default memo(ListeningQuizScreen);




import React, { memo, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { Navigation, theme } from "../..";


type Props = {
    navigation: Navigation;
};

const ReadingQuizScreen = () => {
    const [showQuestions, setShowQuestions] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [totalScore, setTotalScore] = useState<number>(0);
    const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
    const [currentAnswer, setCurrentAnswer] = useState<number | null>(null);
    const [isOptionDisabled, setIsOptionDisabled] = useState(false);
    const [showFinishButton, setShowFinishButton] = useState(false);
    const [isNextQuestion, setIsNextQuestion] = useState(false);




    const articleContent = `The Amazon rainforest, often referred to as the 'lungs of the Earth,' is home to an incredible diversity of flora and fauna. Covering over 5.5 million square kilometers, it is the largest tropical rainforest on the planet. The Amazon plays a crucial role in regulating the Earth's climate by absorbing carbon dioxide and releasing oxygen. 
    However, rampant deforestation driven by agriculture, logging, and infrastructure development poses a grave threat to this ecosystem. Conservation efforts are underway to protect the Amazon and its indigenous communities, but urgent action is needed to mitigate the impacts of deforestation.`;


    const quizQuestions = [
        {
            "question": "What is the Amazon rainforest often called?",
            "options": ["The Heart of the Earth", "The Lungs of the Earth", "The Crown of the Earth", "The Veins of the Earth"],
            "answer": 1
        },
        {
            "question": "How large is the Amazon rainforest?",
            "options": ["2.5 million square kilometers", "3.5 million square kilometers", "4.5 million square kilometers", "5.5 million square kilometers"],
            "answer": 3
        },
        {
            "question": "What is one crucial role of the Amazon rainforest?",
            "options": ["Releasing carbon dioxide", "Regulating the Earth's climate", "Causing deforestation", "Encouraging logging"],
            "answer": 1
        },
        {
            "question": "What is the primary driver of deforestation in the Amazon?",
            "options": ["Conservation efforts", "Agriculture", "Indigenous communities", "Infrastructure development"],
            "answer": 1
        },
        {
            "question": "What is needed to mitigate the impacts of deforestation?",
            "options": ["More logging", "Rampant deforestation", "Urgent action", "Agricultural expansion"],
            "answer": 2
        }
    ];

    const baseScorePerQuestion = 100 / quizQuestions.length;

    const handleStartQuiz = () => {
        setShowQuestions(true);
    };

    const handleNextQuestion = () => {
        setQuestionIndex(prevIndex => prevIndex + 1);
        setIsOptionDisabled(false);
        setCurrentAnswer(null);
        setCorrectAnswer(null);
        setIsNextQuestion(false);
    };

    const handleFinishQuiz = () => {
        setIsQuizFinished(true);
    }

    const handleOptionSelect = (selectAnswer: number) => {
        const answer = quizQuestions[questionIndex].answer;
        setCorrectAnswer(answer)
        if (selectAnswer === answer) {
            setCurrentAnswer(answer)
            setTotalScore(prevTotalScore => prevTotalScore + baseScorePerQuestion);
        } else {
            setCurrentAnswer(selectAnswer)
        }
        setIsOptionDisabled(true)

        if (questionIndex === quizQuestions.length - 1) {
            setShowFinishButton(true)
        } else {
            setIsNextQuestion(true);
        }

    };

    return (
        <View style={styles.container}>
            {!showQuestions && (
                <View style={styles.container}>
                    <Text style={styles.questionHeading}>Please read the following article and answer the question</Text>
                    <View style={styles.space} />
                    <View>
                        <TouchableOpacity style={styles.startButton} onPress={handleStartQuiz}>
                            <Text style={styles.startButtonText}>Start Reading Quiz</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {showQuestions && (
                <View>
                    {isQuizFinished ? (
                        <View>
                            <Text style={styles.totalScore}>Total Score: {totalScore.toFixed(2)}/100</Text>
                        </View>
                    ) : (
                        <View style={styles.container}>
                            <View style={styles.areaAContainer}>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <Text style={styles.articleText}>{articleContent}</Text>
                                </ScrollView>
                            </View>
                            <View style={styles.areaBContainer}>
                                <Text style={styles.question}>{quizQuestions[questionIndex].question}</Text>
                                {quizQuestions[questionIndex].options.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => handleOptionSelect(index)}
                                            disabled={isOptionDisabled}
                                            style={{
                                                backgroundColor: currentAnswer === correctAnswer && index === correctAnswer
                                                    ? theme.colors.correctAnswer
                                                    : currentAnswer === index
                                                        ? theme.colors.error
                                                        : correctAnswer === index
                                                            ? theme.colors.correctAnswer
                                                            : theme.colors.transparent,
                                                padding: 10,
                                                marginTop: 15,
                                                borderRadius: 5,
                                                borderWidth: 1,
                                            }}
                                        >
                                            <Text style={styles.questionOptions}>{item}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                            <View style={styles.areaCContainer}>
                                {showFinishButton ? (
                                    <TouchableOpacity onPress={handleFinishQuiz} style={styles.finishButton}>
                                        <Text style={styles.finishButtonText}>Finish</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <View>
                                        {isNextQuestion && (
                                            <TouchableOpacity onPress={handleNextQuestion} style={styles.nextButton}>
                                                <Text style={styles.nextButtonText}>Next</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                )}
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
    questionHeading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    space: {
        height: 20,
    },
    areaAContainer: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    articleText: {
        fontSize: 16
    },
    areaBContainer: {
        flex: 0.45,
    },
    question: {
        fontSize: 16,
        color: theme.colors.blackText,
        fontWeight: 'bold',
    },
    questionOptions: {
        fontSize: 16,
        color: theme.colors.blackText,
        padding: 3,
    },
    areaCContainer: {
        flex: 0.15,
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





    totalScore: {
        fontSize: 20,
        color: theme.colors.blackText,
    },
});

export default memo(ReadingQuizScreen);

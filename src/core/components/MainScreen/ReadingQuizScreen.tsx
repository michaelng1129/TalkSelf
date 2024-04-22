import React, { memo, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Dimensions } from "react-native";
import { Navigation } from "../..";

const { height: windowHeight } = Dimensions.get('window');

type Props = {
    navigation: Navigation;
};

const ReadingQuizScreen = ({ navigation }: Props) => {
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

    // Sample article content (Hardcoded)
    const articleContent = `
    The United States and the European Union say they are looking at imposing further sanctions on Iran, after its attack on Israel at the weekend.

    US Treasury Secretary Janet Yellen said she expected to take action "in the coming days", while EU foreign policy chief Josep Borrell said the bloc was working on it.
    
    Israel has urged its allies to sanction Tehran's missile programme.
    
    United Nations sanctions over the programme expired in October.
    
    Those sanctions had been linked to a wider deal to limit Iran's nuclear programme.
    
    However a number of countries including the US, EU and UK maintained sanctions and added new ones.
    
    The Israeli military's chief of staff, Lt Gen Herzi Halevi, said on Monday that the Iranian attack would not go unanswered.
    `;

    // Sample quiz questions (Hardcoded)
    const quizQuestions = [
        { question: "What was the nature of Iran's attack on Israel over the weekend?", options: ["Israel's infrastructure.", "Israeli military bases", "Israeli-owned vessel in the Arabian Sea."], correctOptionIndex: 0 },
        { question: "Question 2", options: ["Option 1", "Option 2", "Option 3"], correctOptionIndex: 1 },
        // Add more questions as needed
    ];

    const handleQuestionChange = (index: number) => {
        setSelectedQuestionIndex(index);
    }

    return (
        <View style={styles.container}>
            {/* Upper Half: Article */}
            <View style={[styles.section, { height: windowHeight * 0.4 }]}>
                <ScrollView>
                    <Text style={styles.article}>{articleContent}</Text>
                </ScrollView>
            </View>

            {/* Lower Half: Quiz Questions */}
            <View style={[styles.section, { height: windowHeight * 0.4 }]}>
                <ScrollView horizontal pagingEnabled>
                    {quizQuestions.map((question, index) => (
                        <View key={index} style={styles.questionContainer}>
                            <Text style={styles.question}>{question.question}</Text>
                            {/* Render options */}
                            {question.options.map((option, optionIndex) => (
                                <View key={optionIndex} style={styles.optionContainer}>
                                    <Text style={styles.optionSymbol}>•</Text>
                                    <Text style={styles.optionText}>{option}</Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    section: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    article: {
        fontSize: 16,
        textAlign: 'justify',
    },
    questionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        paddingHorizontal: 100,
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    optionSymbol: {
        fontSize: 16,
        marginRight: 5,
    },
    optionText: {
        fontSize: 16,
    }
});

export default memo(ReadingQuizScreen);

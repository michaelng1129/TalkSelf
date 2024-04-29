import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const speakingDifflib = async (audioBlob: string, jwt: string, question: string) => {

    try {
        const response = await axios.post('http://192.168.1.2:8000/api/difflib', {
            data: {
                audio: audioBlob,
                jwt: jwt,
                question: question
            }

        });
        console.log('Upload successful');
        //await AsyncStorage.setItem('speakingResult', response.data)
        return response.data;
    } catch (error: any) {
        console.log('Error occurred during login:', error);
        return false;
    }
};

export default speakingDifflib;
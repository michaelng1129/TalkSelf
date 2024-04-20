import axios from "axios";
import { data } from "../components/MainScreen/QuizData";

const TextToSpeech = async (word: string, jwt: string) => {
    try {
        console.log('jwt: ', jwt)
        console.log('word: ', word)
        const response = await axios.post('http://192.168.1.2:8000/api/ttsDictionary', {
            data: {
                word: word,
                jwt: jwt,
            }
        });
        console.log('Response:', response.data);

    } catch (error) {
        console.error('Error:', error);
    }
};

export default TextToSpeech;
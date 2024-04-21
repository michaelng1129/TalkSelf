import axios from "axios";
import * as RNFS from '@dr.pogodin/react-native-fs';
import AsyncStorage from "@react-native-async-storage/async-storage";

const TextToSpeech = async (word: string, jwt: string) => {
    try {
        const isFileExists = await RNFS.exists(`${RNFS.DocumentDirectoryPath}/${word}.mp4`);

        if (!isFileExists) {
            console.log('TTs-Run')
            const response = await axios.post('http://192.168.1.2:8000/api/ttsDictionary', {
                data: {
                    word: word,
                    jwt: jwt,
                },
            });
            const videoBase64 = response.data.video_base64;
            const filePath = `${RNFS.DocumentDirectoryPath}/${word}.mp4`;
            await RNFS.writeFile(filePath, videoBase64, 'base64')
                .then(async () => {
                    console.log('TTsPath:', filePath);
                    await AsyncStorage.setItem('TTsPath', filePath);
                })
                .catch(error => {
                    console.error('TTsPath:', error);
                });
        } else {
            console.log('Tts existed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export default TextToSpeech;
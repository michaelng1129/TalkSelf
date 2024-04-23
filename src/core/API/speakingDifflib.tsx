import axios from 'axios';

const speakingDifflib = async (audioBlob: string, jwt: string, question: string) => {

    try {
        const response = await axios.post('http://192.168.1.2:8000/api/difflib', {
            data: {
                audio: audioBlob,
                jwt: jwt,
                question: question
            }

        });
        console.log('Upload successful:', response.data);
        console.log(response.data)
        return true;
    } catch (error: any) {
        console.log('Error occurred during login:', error);
        return false;
    }
};

export default speakingDifflib;
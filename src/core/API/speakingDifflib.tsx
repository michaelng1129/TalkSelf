import axios from 'axios';

const speakingDifflib = async (formData: FormData) => {

    try {
        const response = await axios.post('http://192.168.1.2:8000/api/difflib', formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        console.log('Upload successful:', response.data);
        return true;
    } catch (error: any) {
        console.error('Error occurred during login:', error);
        return false;
    }
};

export default speakingDifflib;
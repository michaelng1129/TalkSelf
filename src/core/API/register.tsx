import axios from "axios";
import RNSecureStorage, { ACCESSIBLE } from "rn-secure-storage";

const register = async (formData: FormData) => {
    try {
        const response = await axios.post('http://192.168.1.2:8000/api/usersCreate', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('SignUp Success:', response.data);
        await RNSecureStorage.setItem('jwtToken', response.data.access_token, { accessible: ACCESSIBLE.WHEN_UNLOCKED });
        return true;
    } catch (error: any) {
        console.log('SignUp Error:', error);
        if (error.response) {
            console.log('Server Response Data:', error.response.data);
        }
        return false;
    }
}


export default register;
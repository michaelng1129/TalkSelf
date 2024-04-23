import axios from 'axios';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';

const logIn = async (email: string, password: string) => {
    try {
        const requestData = {
            grant_type: '',
            username: email,
            password: password,
            scope: '',
            client_id: '',
            client_secret: ''
        };
        const response = await axios.post('http://192.168.1.2:8000/api/token', requestData,
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            }
        );
        await RNSecureStorage.setItem('jwtToken', response.data.access_token, { accessible: ACCESSIBLE.WHEN_UNLOCKED });
        return true;
    } catch (error: any) {
        console.log('Error occurred during login:', error);
        return false;
    }
};

export default logIn;
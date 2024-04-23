import axios from 'axios';
import { chatGptKey } from '..';

const client = axios.create({
    headers: {
        "Authorization": "Bearer " + chatGptKey,
        "content-Type": "application/json"
    }
})

const chatGptEndPoint = 'https://api.openai.com/v1/chat/completions';

const apiCall = async (messages: any) => {
    try {
        const res = await client.post(chatGptEndPoint, {
            model: 'gpt-3.5-turbo',
            // messages: [{
            //     role: 'user',
            //     content: `${prompt}`
            // }]
            messages
        });
        console.log('api messages', messages)

        let answer = res.data.choices[0].message.content;
        console.log('content: ', res.data.choices[0].message);
        messages.push({ role: 'assistant', content: answer.trim() })
        const result: { success: boolean; data: string } = { success: true, data: messages };
        return Promise.resolve(result);

    } catch (error: any) {
        console.log('error: ', error);
        const result: { success: boolean; msg: string } = { success: false, msg: error.message };
        return Promise.resolve(result);
    }
}


export default apiCall;
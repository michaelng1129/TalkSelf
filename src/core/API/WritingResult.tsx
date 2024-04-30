import axios from 'axios';
import { chatGptKey } from '../API/APIKey';

interface ResultType {
    score: number;
    Content: string;
    Language: string;
    Organization: string;
}

const client = axios.create({
    headers: {
        "Authorization": "Bearer " + chatGptKey,
        "Content-Type": "application/json"
    }
})
const chatGptEndPoint = 'https://api.openai.com/v1/chat/completions';

const writingResult = async (topic: string, writing: string) => {
    try {
        const res = await client.post(chatGptEndPoint, {
            model: 'gpt-3.5-turbo',
            messages: [{
                role: 'user',
                content: `You are now an evaluator of the English writing paper of the Hong Kong Examinations and Assessment Authority. 
                          Your evaluation will cover three main aspects: Content, Language, and Organization. 
                          The composition is graded out of 100 points, with each aspect contributing to the overall score.Base on the topic:${topic}, evaluate the following writing:${writing}.
                          The results are returned in JSON format, divided into 4 parts, including score (out of 100 points), Content(only comments), Language(only comments) and Organization(only comments)`
            }]
            //messages
        });
        let answer = JSON.parse(res.data.choices[0].message.content);
        //console.log('API:', answer)
        const result: { success: boolean; data: ResultType} = { success: true, data: answer };
        return Promise.resolve(result);

    } catch (error: any) {
        console.log('error: ', error);
        const result: { success: boolean; msg: string } = { success: false, msg: error.message };
        return Promise.resolve(result);
    }
}


export default writingResult;
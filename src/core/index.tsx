export { chatGptKey } from './API/APIKey'
export { default as logIn } from './API/logIn';
export { default as register } from './API/register';
export { default as chatGPTCall } from './API/chatGPT';
export { default as writingResult } from './API/WritingResult';
export { default as mountDatabase } from './API/dictionary';
export { default as TextToSpeech } from './API/TextToSpeech';
export { default as TextToSpeechFull } from './API/TextToSpeechFull';
export { default as speakingDifflib } from './API/speakingDifflib';


export { default as MainScreenNavigation } from './navigators/MainScreenNavigation';
export { default as StartScreenNavigation } from './navigators/StartScreenNavigation';

export type { Navigation } from './types/Navigation';

export { emailValidator, passwordValidator, nameValidator } from './utils'
export { AuthContext, AuthProvider, useAuth } from './authContext';

export { theme } from './theme';
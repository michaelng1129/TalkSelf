export { default as logIn } from './API/logIn';
export { default as register } from './API/register';

export { default as MainScreenNavigation } from './navigators/MainScreenNavigation';
export { default as StartScreenNavigation } from './navigators/StartScreenNavigation';

export type { Navigation } from './types/Navigation'

export { emailValidator, passwordValidator, nameValidator } from './utils'
export { AuthContext, AuthProvider, useAuth } from './authContext';

export { theme } from './theme';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import RNSecureStorage from 'rn-secure-storage';

export interface AuthContextType {
    isLoading: boolean;
    userToken: string | null;
    login: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState<string | null>(null);

    const login = () => {
        setIsLoading(true);
        RNSecureStorage.getItem("jwtToken").then((res) => {
            setUserToken(res);
            console.log('setJwt: ', res);
        }).catch((err) => {
            console.log(err);
        });
        setIsLoading(false);
    };

    const logout = () => {
        setIsLoading(true);
        RNSecureStorage.removeItem("jwtToken").then((res) => {
            setUserToken(null);
            console.log('removeJwt: ', res);
        }).catch((err) => {
            console.log(err);
        });
        setIsLoading(false);
    };

    return (
        <AuthContext.Provider value={{ isLoading, userToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


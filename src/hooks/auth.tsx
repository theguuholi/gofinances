import { createContext, useContext, useEffect, useState } from "react";
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from "@react-native-async-storage/async-storage";


interface AuthProviderProps {
    children: React.ReactNode;
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData {
    user: User;
    signInWithApple: () => Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User>({} as User);
    const userStorageKey = '@gofinances:user';
    const [userStorageLoading, setUserStorageLoading] = useState(true);


    const signInWithApple = async () => {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [AppleAuthentication.AppleAuthenticationScope.FULL_NAME, AppleAuthentication.AppleAuthenticationScope.EMAIL]
            })
            console.log("Apple Auth", credential);

            if (credential) {
                const userLogged = {
                    id: credential.user,
                    email: credential.email!,
                    name: credential.fullName!.givenName!,
                    photo: `https://ui-avatars.com/api/?name=${credential.fullName?.givenName}&length=1`
                }

                setUser(userLogged);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));

            }
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setUserStorageLoading(false);
        }
    }

    const loadUserStorageData = async () => {
        const userStoraged = await AsyncStorage.getItem(userStorageKey);
        if (userStoraged) {
            setUser(JSON.parse(userStoraged));
        }
        setUserStorageLoading(false);
    }

    useEffect(() => { loadUserStorageData(); }, []);


    return (
        <AuthContext.Provider value={{ user, signInWithApple }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };
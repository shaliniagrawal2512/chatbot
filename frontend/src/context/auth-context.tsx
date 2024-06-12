import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { checkAuthStatus, loginUser, logoutUser, signupUser } from "../helpers/api-communicators";

type User = {
    name: string,
    email: string
}
type UserAuth = {
    isLoggedIn : boolean;
    user: User | null;
    login:(email:string, password:string)=>Promise<void>;
    signup:(name:string,email:string, password:string)=>Promise<void>;
    logout:()=>Promise<void>
}
const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({children}:{children: ReactNode})=>{

    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login= async(email: string, password: string)=>{
        const data = await loginUser(email, password);
        if(data){
            setUser({email: data.email, name:data.name})
            setIsLoggedIn(true);
        }
    }

    const signup= async(name:string, email: string, password: string)=>{
        const data = await signupUser(name,email, password);
        if(data){
            setUser({email: data.email, name:data.name})
            setIsLoggedIn(true);
        }
        window.location.reload();
    }

    const logout = async()=>{
        await logoutUser();
        setIsLoggedIn(false);
        setUser(null);
        window.location.reload();
    }

    const value: UserAuth ={
        user,
        isLoggedIn,
        login,
        signup,
        logout
    };
    // check for cookie validation if valid skip login
    useEffect(()=>{
        async function checkAuthentication(){
            const data = await checkAuthStatus();
            if(data){
                setUser({email: data.email, name:data.name})
                setIsLoggedIn(true);
            }
            else{
                setUser(null)
                setIsLoggedIn(false);
            }
        }
        checkAuthentication();
    },[])

    return <AuthContext.Provider value = {value}>
        {children}
    </AuthContext.Provider>
   
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext)
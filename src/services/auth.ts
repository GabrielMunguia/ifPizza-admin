//login firebase auth 
 import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

    import { ref, get, set, runTransaction, onValue } from "firebase/database";


    //login firebase auth
    export const login = async (email: string, password: string) => {
        try {
            const auth = getAuth();
            const user = await signInWithEmailAndPassword(auth, email, password);
            return user;
        } catch (error: any) {
            throw new Error(error);
        }
        };

   
        


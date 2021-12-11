import { auth } from "../firebase.config";

const AUTH = auth.getAuth()

const login = async (email: string, password: string): Promise<auth.User | undefined> => {
    try {
        const res: auth.UserCredential = await auth.signInWithEmailAndPassword(AUTH, email, password);   
        return res.user; 
    } catch (error) {
        console.log(error)
    }
}

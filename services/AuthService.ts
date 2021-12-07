import { auth } from "../firebase.config";

const login = async (email: string, password: string): Promise<auth.User | undefined> => {
    try {
        const res: auth.UserCredential = await auth.signInWithEmailAndPassword(auth.getAuth(), email, password);   
        return res.user; 
    } catch (error) {
        console.log(error)
    }
}

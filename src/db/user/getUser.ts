import { db } from "@/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"

export const getUserApi = async (uid: string) => {
  try {
    const docRef = doc(db, "users", uid)
    const userDocSnap = await getDoc(docRef)
    return userDocSnap.data()
  } catch (error) {
    console.log(error)
    throw error
  }
}

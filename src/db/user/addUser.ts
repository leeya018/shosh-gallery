import { db } from "@/firebase"
import { doc, setDoc } from "firebase/firestore"
import { User } from "./interface"

export const addUserApi = async (user: User) => {
  try {
    const docRef = doc(db, "users", user.uid)
    await setDoc(docRef, user)
  } catch (error) {
    const e = error as Error
    console.log(e.message)
  }
}

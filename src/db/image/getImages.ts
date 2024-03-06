import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { db, storage } from "@/firebase"
import { isUserExistApi } from "../user/isUserExist"
import { ImageItem } from "./interface"
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore"

export const getImagesApi = async (uid: string) => {
  try {
    // if (!isUserExistApi(uid)) {
    //   throw new Error(`User with id : ${uid} not found`)
    // }
    const q = query(collection(db, "images"))

    const querySnapshot = await getDocs(q)
    let images: ImageItem[] = []
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data())
      const data = doc.data() as ImageItem
      images.push({
        id: doc.id,
        ...data,
      })
    })

    return images
  } catch (error: any) {
    console.log(error.message)
    throw error
  }
}

import {
  getDownloadURL,
  ref,
  updateMetadata,
  uploadBytes,
} from "firebase/storage"
import { db, storage } from "@/firebase"
import { isUserExistApi } from "../user/isUserExist"
import { ImageItem } from "./interface"
import { doc, setDoc } from "firebase/firestore"

export const updateImageApi = async (uid: string, image: ImageItem) => {
  try {
    if (!isUserExistApi(uid)) {
      throw new Error(`User with id : ${uid} not found`)
    }
    if (!image?.id) {
      throw new Error(` id : of image not found`)
    }

    const { name, price, description, id } = image
    const docRef = doc(db, "images", id)

    await setDoc(
      docRef,
      {
        name,
        price,
        description,
      },
      { merge: true }
    )

    return image.id
  } catch (error: any) {
    console.log(error.message)
    throw error
  }
}

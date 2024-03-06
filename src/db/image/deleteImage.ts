import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage"
import { db, storage } from "@/firebase"
import { isUserExistApi } from "../user/isUserExist"
import { ImageItem } from "./interface"
import { collection, deleteDoc, doc } from "firebase/firestore"
// import { isUserExist } from "../user/isUserExist"

// images
export const deleteImageApi = async (uid: string, image: ImageItem) => {
  try {
    if (!isUserExistApi(uid)) {
      throw new Error(`User with id : ${uid} not found`)
    }
    if (!image.id) {
      throw new Error(` id : of image not found`)
    }

    await deleteDoc(doc(db, "images", image.id))

    // Create a reference to the file to delete
    const desertRef = ref(storage, `images/${image.id}.png`)

    // Delete the file
    await deleteObject(desertRef)

    return image.id
  } catch (error: any) {
    console.log(error.message)
    throw error
  }
}

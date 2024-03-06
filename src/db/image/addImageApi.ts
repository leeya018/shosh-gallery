import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore"
import { db, storage } from "@/firebase"

import { ImageItem } from "./interface"
import { isUserExistApi } from "../user/isUserExist"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

export const addImageApi = async (uid: string, image: ImageItem, file: any) => {
  try {
    if (!isUserExistApi(uid)) {
      throw new Error(`User with id : ${uid} not found`)
    }
    const collectionRef = collection(db, "images")

    const docRef = await addDoc(collectionRef, {
      ...image,
      createdAt: serverTimestamp(),
    })
    const docId = docRef.id
    //update storage

    const storageRef = ref(storage, `images/${docId}.png`)

    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(storageRef)
    //
    if (!downloadURL) throw new Error(`Could not create download url`)
    // update doc
    const docRef1 = doc(db, "images", docId)
    const data = await setDoc(
      docRef1,
      {
        url: downloadURL,
      },
      { merge: true }
    )

    console.log("image has added successfully")
    console.log({ data })
    const docSnap = await getDoc(docRef1)
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data())
    } else {
      // docSnap.data() will be undefined in this case
      throw new Error("No such document!")
    }
    const newImage = {
      id: docSnap.id,
      ...(docSnap.data() as ImageItem),
    }
    return newImage
    // return {
    //   id: "string",
    //   name: "string",
    //   url: "string",
    //   price: 22,
    //   description: "string",
    // }
  } catch (error: any) {
    console.log(error.message)
    throw error
  }
}

import { db, storage } from "@/firebaseConfig";
import { DocumentSnapshot, doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Product } from "./interfaces";

export const updateProductApi = async (product: Product) => {
  try {
    let imageUrl = product.imageUrl;
    // Upload new image to Firebase Storage if provided
    if (product.image) {
      const storageRef = ref(storage, `products/${product.image.name}`);
      const snapshot = await uploadBytes(storageRef, product.image);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    // Update product in Firestore
    const productRef = doc(db, "products", product.id!);
    await updateDoc(productRef, {
      name: product.name,
      imageUrl: imageUrl,
      price: product.price,
      currency: product.currency,
      description: product.description,
      updatedAt: new Date(),
    });

    // Get the updated document's data
    const docSnap: DocumentSnapshot = await getDoc(productRef);

    if (!docSnap.exists()) {
      throw new Error("Failed to get the updated document.");
    }

    const data = docSnap.data();
    const id = docSnap.id;
    console.log({ id, ...data }, "tdata");
    return { id, ...data } as Product;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error(error.message);
    } else {
      console.error("Error updating product:", error);
    }
  }
};

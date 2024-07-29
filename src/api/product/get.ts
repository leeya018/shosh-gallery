import { db, storage } from "@/firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Product } from "./interfaces";

export const getProductsApi = async (): Promise<Product[] | undefined> => {
  try {
    const productsCollection = collection(db, "products");
    const productsQuery = query(
      productsCollection,
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(productsQuery);

    const products: Product[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id, // Assuming you want to include the document ID
          ...doc.data(),
        } as Product)
    );

    return products;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);

      throw new Error(error.message);
    } else {
      console.error("Error fetching products:", error);
    }
  }
};

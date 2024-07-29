// stores/ProductStore.ts

import { Product } from "@/api/product/interfaces";
import { autorun, makeAutoObservable, toJS } from "mobx";

class ProductStore {
  chosenProduct: Product | null = null;
  products: Product[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setChosenProduct(product: Product) {
    this.chosenProduct = product;
  }
  setProducts(products: Product[]) {
    this.products = [...products];
  }

  addProduct(newProd: Product) {
    this.products = [...this.products, newProd];
  }
  removeProduct(productId: string) {
    this.products = [
      ...productStore.products.filter((product) => product.id !== productId),
    ];
  }
  updateProduct(product: Product) {
    this.products = [
      ...productStore.products.map((p) => (p.id === product.id ? product : p)),
    ];
  }

  clearChosenProduct() {
    this.chosenProduct = null;
  }
}

// autorun(() => {
//   console.log(toJS(productStore.products));
// });
const productStore = new ProductStore();
export default productStore;

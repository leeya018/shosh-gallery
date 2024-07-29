import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/api/product/interfaces";
import { getProductsApi } from "@/api/product/get";
import Loading from "./Loading";
import { removeProductApi } from "@/api/product/remove";
import ProductCardEdit from "./ProductCardEdit";
import Modal from "@/ui/Modal";
import { ModalStore } from "@/mobx/modalStore";
import { modals } from "@/util";
import EditProductForm from "./EditProductForm";
import productStore from "@/mobx/ProductStore";
import { observer } from "mobx-react-lite";

const ProductListEdit = observer(() => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProductsApi();
        productStore.setProducts(products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {productStore.products.map((product, index) => (
        <ProductCardEdit key={index} product={product} />
      ))}
    </div>
  );
});

export default ProductListEdit;

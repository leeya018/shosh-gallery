"use client";

import type { NextPage } from "next";
import MainSection from "../components/MainSection";
import Footer from "../components/Footer";
import LoginForm from "@/components/LoginForm";
import Modal from "@/ui/Modal";
import { ModalStore } from "@/mobx/modalStore";
import { modals, productsItems } from "@/util";
import Message from "@/components/Message";
import { observer } from "mobx-react-lite";
import ProductList from "@/components/ProductList";
import ProductCardView from "@/components/ProductCardView";
import productStore from "@/mobx/ProductStore";
import AddButton from "@/components/AddButton";
import AddProductForm from "@/components/AddProductForm";
import EditProductForm from "@/components/EditProductForm";
import authStore from "@/mobx/authStore";
import { getProductsApi } from "@/api/product/get";
import { useEffect, useState } from "react";
const HomePage = ({}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProductsApi();
        productStore.setProducts(products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-h-screen overflow-y-auto">
      <Modal
        isOpen={ModalStore.modalName === modals.login}
        closeModal={ModalStore.closeModal}
      >
        <LoginForm />
      </Modal>
      <Modal
        isOpen={
          ModalStore.modalName === modals.productView &&
          productStore.chosenProduct !== null
        }
        closeModal={ModalStore.closeModal}
      >
        <ProductCardView pageName={"home"} />
      </Modal>
      <Modal
        isOpen={ModalStore.modalName === modals.addProduct}
        closeModal={ModalStore.closeModal}
      >
        <AddProductForm />
      </Modal>
      <Modal
        isOpen={ModalStore.modalName === modals.editProduct}
        closeModal={ModalStore.closeModal}
      >
        {productStore.chosenProduct && (
          <EditProductForm
            product={productStore.chosenProduct}
            onClose={ModalStore.closeModal}
          />
        )}
      </Modal>

      <Message />
      {authStore.isLoggedIn && (
        <div className="w-screen flex justify-center ">
          <AddButton />
        </div>
      )}

      <MainSection />
      <ProductList
        isLoading={isLoading}
        products={productStore.products}
        // products={productsItems}
        pageName="home"
      />
      <Footer />
    </div>
  );
};

export default observer(HomePage);

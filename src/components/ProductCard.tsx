// components/Product.tsx

import { Product } from "@/api/product/interfaces";
import { removeProductApi } from "@/api/product/remove";
import authStore from "@/mobx/authStore";
import cartStore from "@/mobx/cartStore";
import messageStore from "@/mobx/messageStore";
import { ModalStore } from "@/mobx/modalStore";
import productStore from "@/mobx/ProductStore";
import { currencies, modals } from "@/util";
import { observer } from "mobx-react-lite";
import Image from "next/image";

import React from "react";

interface ProductProps {
  product: Product;
  pageName: string;
}

const ProductCard: React.FC<ProductProps> = ({ product, pageName }) => {
  const { id, name, imageUrl, price, currency, description } = product;

  console.log({ pageName });

  // const firebaseImageUrl =
  //   "https://firebasestorage.googleapis.com/v0/b/find-best-deals.appspot.com/o/products%2FIMG_1743.jpg?alt=media&token=85eb519b-d5e1-4b53-a767-97653f943d2d";
  // const encodedUrl = encodeURIComponent(firebaseImageUrl);

  const isExists = cartStore.isItemExists(product);
  const addToCart = (e: any) => {
    e.stopPropagation();
    if (isExists) {
      return;
    }
    cartStore.addItem(product);
  };
  const handleClick = () => {
    productStore.setChosenProduct(product);
    ModalStore.openModal(modals.productView);
  };
  // const encodedUrl = encodeURIComponent(
  //   "https://firebasestorage.googleapis.com/v0/b/find-best-deals.appspot.com/o/products%2FIMG_1743.jpg?alt=media&token=85eb519b-d5e1-4b53-a767-97653f943d2d"
  // );
  return (
    <div
      className=" mx-2  my-5 rounded-xl  bg-card-gradient cursor-pointer "
      onClick={handleClick}
    >
      <div className=" relative w-full h-64">
        <Image
          alt={name + "תמונה של"}
          // src={`/api/image-proxy?url=${encodedUrl}`}
          // src={firebaseImageUrl}
          src={imageUrl ? imageUrl : "/"}
          layout="fill"
          className=" bg-center object-cover "
        />
        {/* <img
          src={imageUrl ? imageUrl : "/"}
          alt="ssss"
          width={100}
          height={100}
        /> */}
      </div>
      <div className="my-4 px-5 py-2 text-white">
        <h3 className="text-lg font-semibold mb-2 whitespace-normal  ">
          {name}
        </h3>
        <h3 className="text-lg font-semibold mb-2 whitespace-normal  ">
          מחיר : {price}
        </h3>
      </div>
      {pageName === "home" && !authStore.isLoggedIn && (
        <button
          onClick={addToCart}
          disabled={isExists}
          className={`${
            isExists ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
          } flex items-center  text-white px-4 py-2 rounded-md `}
        >
          {isExists ? "הוסף לעגלה" : "הכנס לעגלה"}
        </button>
      )}
      {pageName === "cart" && !authStore.isLoggedIn && (
        <button
          onClick={() => {
            if (!product.id) throw new Error("id not exists");
            cartStore.removeItem(product.id);
          }}
          className="bg-red-500 flex items-center  text-white px-4 py-2 rounded-md cursor-pointer"
        >
          הסר מהעגלה{" "}
        </button>
      )}
    </div>
  );
};

export default observer(ProductCard);

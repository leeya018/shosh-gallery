import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import imagesStore from "@/mobx/imagesStore"
import { IoMdClose } from "react-icons/io"
import { ModalStore } from "@/mobx/modalStore"
import Modal from "."

const ImageModal = observer(() => {
  const { chosenImage } = imagesStore
  return (
    <Modal>
      {/* innedr div */}
      <div className="w-full h-full flex flex-col justify-center  ">
        <div
          style={{ backgroundImage: `url(${chosenImage?.url})` }}
          className={`w-full h-1/2 bg-center bg-cover rounded-lg`}
        />
        <div className="mt-5 flex flex-col gap-2">
          <div className="">
            <span className="font-semibold">name: </span>
            {chosenImage?.name}
          </div>
          <div className="">
            <span className="font-semibold">price: </span>
            {chosenImage?.price}
          </div>
          <div className="">
            <span className="font-semibold">description: </span>
            {chosenImage?.description}
          </div>
          <div className="flex justify-center items-center mt-10">
            <button onClick={() => {}} className="button">
              Buy
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
})

export default ImageModal

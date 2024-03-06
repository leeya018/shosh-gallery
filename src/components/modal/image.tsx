import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import imagesStore from "@/mobx/imagesStore"
import { IoMdClose } from "react-icons/io"
import { ModalStore } from "@/mobx/modalStore"

const ImageModal = observer(() => {
  const { chosenImage } = imagesStore
  return (
    <div
      className="modal-first-div"
      onClick={() => {
        ModalStore.closeModal()
      }}
    >
      {/* close button */}
      <div
        className="absolute top-5 right-5 cursor-pointer p-2 "
        onClick={() => ModalStore.closeModal()}
      >
        <IoMdClose size={25} />
      </div>

      {/* white div */}
      <div
        className="modal-second-div w-[80vw] h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* innedr div */}
        <div className=" w-1/2 h-full flex flex-col justify-center  ">
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
      </div>
    </div>
  )
})

export default ImageModal

import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import imagesStore from "@/mobx/imagesStore"
import { IoMdClose } from "react-icons/io"
import { ModalStore } from "@/mobx/modalStore"

type ModalProps = {
  children: React.ReactNode
}
const Modal = observer<ModalProps>(({ children }) => {
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
        className="modal-second-div w-[50vw] h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* innedr div */}
        <div className=" w-[80%] h-full flex flex-col justify-center items-center ">
          {children}
        </div>
      </div>
    </div>
  )
})

export default Modal

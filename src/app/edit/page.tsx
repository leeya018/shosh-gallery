"use client"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import ProtectedRoute from "@/components/protectedRout"
import Alert from "@/components/alert"
import { messageStore } from "@/mobx/messageStore"
import userStore from "@/mobx/userStore"
import { modals } from "../../../util"
import TopNav from "@/components/topNav"
import { ImageItem } from "@/db/image/interface"
import AddImage from "@/components/addImage"
import DeleteImage from "@/components/deleteImage"
import ImageEditModal from "@/components/modal/imageEdit"
import { ModalStore } from "@/mobx/modalStore"

const EditGalleryPage = observer(() => {
  const [choice, setChoice] = useState("add")

  const handleClick = (choice: string) => {
    setChoice(choice)
  }
  return (
    <ProtectedRoute>
      <div className="top-div-page">
        <Alert />

        {ModalStore.modalName === modals.editImage && <ImageEditModal />}
        <div className="flex justify-center">
          {/* inner div */}
          <div className="flex flex-col justify-center w-[50%]">
            {/* button decisions */}
            <div className="flex items-center ">
              <button
                className={`basic-button rounded-l-full   ${
                  choice === "add" ? "bg-pink-500 z-10" : "bg-gray-500"
                }`}
                onClick={() => handleClick("add")}
              >
                add
              </button>
              <button
                className={`basic-button relative rounded-r-full -translate-x-6 ${
                  choice === "update" ? "bg-pink-500 z-10" : "bg-gray-500"
                }`}
                onClick={() => handleClick("update")}
              >
                update
              </button>
            </div>
            {choice === "add" && <AddImage />}
            {choice === "update" && <DeleteImage />}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
})

export default EditGalleryPage

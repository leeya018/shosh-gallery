import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import imagesStore from "@/mobx/imagesStore"
import { IoMdClose } from "react-icons/io"
import { ModalStore } from "@/mobx/modalStore"
import { ImageItem } from "@/db/image/interface"
import { messageStore } from "@/mobx/messageStore"
import { updateImageApi } from "@/db/image/updateImage"
import userStore from "@/mobx/userStore"
import { deleteImageApi } from "@/db/image/deleteImage"
import Modal from "."

const ImageEditModal = observer(() => {
  const [image, setImage] = useState<ImageItem>({
    name: "",
    url: "",
    price: 0,
    description: "",
  })
  const { chosenImage } = imagesStore

  useEffect(() => {
    if (!chosenImage) return
    setImage({ ...chosenImage })
  }, [chosenImage])

  const handleImage = (e: any) => {
    const { name, value } = e.target
    setImage((prev) => ({ ...prev, [name]: value }))
  }

  const deleteImage = () => {
    try {
      if (!chosenImage) throw new Error("chosen image not found")
      deleteImageApi(userStore.user.uid, image)
      if (!chosenImage.id) throw new Error("no chosen image id")
      imagesStore.deleteImage(chosenImage.id)
      ModalStore.closeModal()

      messageStore.setMessage("successfully deleted image item ", 200)
    } catch (error: any) {
      console.log(error.message)

      messageStore.setMessage("cannot delete image item ", 500)
    }
  }
  const updateImage = () => {
    try {
      if (!chosenImage) throw new Error("chosen image not found")
      updateImageApi(userStore.user.uid, image)
      imagesStore.updateImage(image)
      messageStore.setMessage("successfully updated image item ", 200)
      ModalStore.closeModal()
    } catch (error: any) {
      console.log(error.message)

      messageStore.setMessage("cannot updated image item ", 500)
    }
  }

  return (
    <Modal>
      {/* innedr div */}
      <div className="w-full h-full flex flex-col justify-center  ">
        <div
          style={{ backgroundImage: `url(${chosenImage?.url})` }}
          className={`w-full h-1/2 bg-center bg-cover rounded-lg`}
        />
        {/* inpus */}
        <div className="flex flex-col">
          <input
            type="text"
            value={image?.name}
            placeholder="Enter name"
            name="name"
            onChange={handleImage}
            className="border-2 p-1 rounded-md"
          />
          <input
            type="text"
            value={image?.description}
            placeholder="Enter description"
            name="description"
            onChange={handleImage}
            className="border-2 p-1 rounded-md"
          />
          <input
            type="number"
            value={image?.price}
            placeholder="Enter price"
            name="price"
            onChange={handleImage}
            className="border-2 p-1 rounded-md"
          />
        </div>
        <div className="flex justify-center items-center mt-10 gap-5 text-white">
          <button
            onClick={deleteImage}
            className="basic-button bg-red-500 hover:bg-red-400"
          >
            Delete
          </button>
          <button
            onClick={updateImage}
            className="basic-button bg-blue-500 hover:bg-blue-400 "
          >
            Update
          </button>
        </div>
      </div>
    </Modal>
  )
})

export default ImageEditModal

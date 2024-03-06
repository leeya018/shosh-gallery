"use client"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import ProtectedRoute from "@/components/protectedRout"
import Alert from "@/components/alert"
import { messageStore } from "@/mobx/messageStore"
import userStore from "@/mobx/userStore"

import TopNav from "@/components/topNav"
import { ImageItem } from "@/db/image/interface"
import { addImageApi } from "@/db/image/addImageApi"
import imagesStore from "@/mobx/imagesStore"

const AddImage = observer(() => {
  const [image, setImage] = useState<ImageItem>({
    name: "",
    url: "",
    price: 0,
    description: "",
  })

  const [imageFile, setImageFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleImage = (e: any) => {
    const { name, value } = e.target
    setImage((prev) => ({ ...prev, [name]: value }))
  }

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0])
    }
  }

  const clearData = () => {
    setImage({ name: "", url: "", price: 0, description: "" })
    setImageFile(null)
  }

  const addImage = async () => {
    if (!isValid) return
    setIsLoading(true)

    try {
      const newImage: ImageItem = await addImageApi(
        userStore.user.uid,
        image,
        imageFile
      )
      imagesStore.addImage(newImage)
      setIsLoading(false)
      messageStore.setMessage("Image added successfully ", 200)

      clearData()
    } catch (error) {
      setIsLoading(false)
      messageStore.setMessage("cannot upload image item ", 500)
    }
  }

  const isAllFieldsFill = () => {
    return (
      imageFile !== null &&
      image.name !== "" &&
      image.description !== "" &&
      image.price !== 0 &&
      !isLoading
    )
  }

  let isValid = isAllFieldsFill()
  console.log(imageFile)
  return (
    <div>
      <TopNav />
      <div>
        <Alert />
        <div>
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-xl">add image</h1>
            <input
              type="file"
              onChange={onImageChange}
              className="filetype  border-[#d4d6db] rounded-md w-[20rem] h-12 pr-2"
            />

            <input
              type="text"
              value={image.name}
              placeholder="Enter name"
              name="name"
              onChange={handleImage}
              className="border-2 p-1 rounded-md"
            />
            <input
              type="text"
              value={image.description}
              placeholder="Enter description"
              name="description"
              onChange={handleImage}
              className="border-2 p-1 rounded-md"
            />
            <input
              type="number"
              value={image.price}
              placeholder="Enter price"
              name="price"
              onChange={handleImage}
              className="border-2 p-1 rounded-md"
            />
          </div>
          <div className="flex justify-center items-center mt-10">
            <button
              // disabled={true}
              disabled={!isValid}
              onClick={addImage}
              className={isValid ? "button" : "disable-button"}
            >
              Upload Image
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})

export default AddImage

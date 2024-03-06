import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import imagesStore from "@/mobx/imagesStore"
import { ImageItem } from "@/db/image/interface"
import { ModalStore } from "@/mobx/modalStore"
import { modals } from "../../../util"

type GalleryProps = {
  withEdit?: boolean
}
const Gallery = observer<GalleryProps>(({ withEdit = false }) => {
  const handleClick = (image: ImageItem) => {
    imagesStore.setChosenImage(image)
    if (withEdit) {
      ModalStore.openModal(modals.editImage)
      return
    }
    ModalStore.openModal(modals.image)
  }

  if (imagesStore.images.length === 0)
    return (
      <div className="mx-auto  flex justify-center">
        <div>List is Empty</div>
      </div>
    )
  return (
    <div className="mx-auto  flex justify-center">
      <ul className="flex flex-wrap gap-2  justify-center">
        {imagesStore.images.map((image, key) => (
          <li
            key={key}
            onClick={() => handleClick(image)}
            className="hover:scale-105 hover:duration-200 cursor-pointer"
          >
            <div className="rounded-lg overflow-hidden relative">
              <div
                style={{ backgroundImage: `url(${image.url})` }}
                className={` w-44 h-24 bg-center bg-cover rounded-lg`}
              />
              <div className="absolute inset-x-0 bottom-0 ">
                <div className="flex justify-between mx-3 text-sm font-semibold text-white">
                  <div>{image.name}</div>
                  <div>{image.price}</div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
})

export default Gallery

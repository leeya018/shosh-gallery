import { autorun, makeAutoObservable, toJS } from "mobx"
import { ImageItem } from "@/db/image/interface"
import { images } from "@/data/images"
import userStore from "./userStore"
import { getImagesApi } from "@/db/image/getImages"

class Images {
  images: ImageItem[] = []
  chosenImage: ImageItem | null = null
  constructor() {
    makeAutoObservable(this)
    getImagesApi("user.uid")
      .then((images) => {
        this.images = [...images]
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  setChosenImage = (image: ImageItem) => {
    this.chosenImage = image
  }

  addImage = (image: ImageItem) => {
    this.images = [...this.images, image]
  }
  deleteImage = (imgId: string) => {
    this.images = [...this.images].filter((image) => image.id !== imgId)
  }
  updateImage = (newImage: ImageItem) => {
    this.images = [...this.images].map((image) => {
      if (image.id === newImage.id) {
        return newImage
      }
      return image
    })
  }
}

const imagesStore = new Images()
export default imagesStore

autorun(() => {
  console.log(toJS(imagesStore.images))
})

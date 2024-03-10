"use client"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import TopNav from "@/components/topNav"
import Gallery from "@/components/gallery"

import { ModalStore } from "@/mobx/modalStore"
import { modals } from "../../../util"
import ImageModal from "@/components/modal/image"
import { auth } from "@/firebase"
import FilterInput from "@/components/filter"
import imagesStore from "@/mobx/imagesStore"
import { ImageItem } from "@/db/image/interface"

const HomePage = observer(() => {
  const [name, setName] = useState("")

  useEffect(() => {}, [])

  const filterData = (data: ImageItem[]) => {
    return data.filter((item) => item.name.includes(name))
  }
  return (
    <div className="top-div-page">
      {ModalStore.modalName === modals.image && <ImageModal />}
      <FilterInput
        onChange={(e) => setName(e.target.value)}
        value={name}
        setName={setName}
        data={filterData(imagesStore.images)}
      />
      <TopNav />
      <div className="mt-32">
        <Gallery data={filterData(imagesStore.images)} />
      </div>
    </div>
  )
})

export default HomePage

"use client"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import TopNav from "@/components/topNav"
import Gallery from "@/components/gallery"

import { ModalStore } from "@/mobx/modalStore"
import { modals } from "../../../util"
import ImageModal from "@/components/modal/image"
import { auth } from "@/firebase"

const HomePage = observer(() => {
  // console.log({ user: auth })

  useEffect(() => {}, [])
  return (
    <div className="top-div-page">
      {ModalStore.modalName === modals.image && <ImageModal />}
      <TopNav />
      <Gallery />
    </div>
  )
})

export default HomePage

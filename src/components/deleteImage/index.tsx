"use client"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import ProtectedRoute from "@/components/protectedRout"
import Alert from "@/components/alert"
import { messageStore } from "@/mobx/messageStore"
import userStore from "@/mobx/userStore"
import TopNav from "@/components/topNav"
import { ImageItem } from "@/db/image/interface"
import Gallery from "../gallery"

const DeleteImage = observer(() => {
  return (
    <div>
      <TopNav />
      <div>
        <Gallery withEdit={true} />
      </div>
    </div>
  )
})

export default DeleteImage

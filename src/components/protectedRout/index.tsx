"use client"
import React, { FC, useEffect, useState } from "react"
import { auth } from "@/firebase"
import userStore from "@/mobx/userStore"
import { onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/navigation"
import { observer } from "mobx-react-lite"
import { navNames } from "../../../util"
import { getImagesApi } from "@/db/image/getImages"
import imagesStore from "@/mobx/imagesStore"

type ProtectedRouteProps = {
  children: React.ReactNode
}

const ProtectedRoute: FC<ProtectedRouteProps> = observer(({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user)
      if (user) {
        setIsAuthenticated(true)
        userStore.setUser(user)
      } else {
        userStore.setUser(null)
        router.push(navNames.home)
      }
      setIsLoading(false)
    })

    return () => unSub()
  }, [router])

  if (isLoading) {
    return <div>Loading ....</div>
  }
  return isAuthenticated ? <div>{children}</div> : null
})
export default ProtectedRoute

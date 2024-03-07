import { auth } from "@/firebase"
import userStore from "@/mobx/userStore"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { observer } from "mobx-react-lite"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { FaFire } from "react-icons/fa"
import { navNames } from "../../../util"

const TopNav = observer(() => {
  const router = useRouter()

  const logout = async () => {
    try {
      await signOut(auth)
      router.push(navNames.login)

      console.log("user Logged out")
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-10 bg-white w-screen border-2">
      <ul className="flex items-center  py-2 gap-4 mx-10">
        <li
          className="cursor-pointer"
          onClick={() => router.push(navNames.home)}
        >
          <div className="text-2xl  font-bold text-red-500"> Shosh gallery</div>
        </li>
        <li className="nav-item " onClick={() => router.push(navNames.about)}>
          about
        </li>
        {auth.currentUser && (
          <li className="nav-item " onClick={() => router.push(navNames.edit)}>
            edit
          </li>
        )}
        {auth.currentUser && (
          <li className="ml-auto">
            {" "}
            <div className="flex items-center gap-2 justify-between">
              <Image
                className="rounded-full"
                src={auth?.currentUser?.photoURL || ""}
                width={50}
                height={50}
                alt="Profile image"
              />
              <div className="nav-item" onClick={logout}>
                logout
              </div>
            </div>
          </li>
        )}
      </ul>
    </nav>
  )
})

export default TopNav

"use client"
import React, { useEffect, useRef, useState } from "react"

import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth"
import { auth } from "@/firebase"

import Image from "next/image"

import { observer } from "mobx-react-lite"
import { useRouter } from "next/navigation"

import { messageStore } from "@/mobx/messageStore"
import { User } from "@/db/user/interface"
import { navNames } from "../../../util"
import Alert from "@/components/alert"
import { getUserApi } from "@/db/user/getUser"
import { addUserApi } from "@/db/user/addUser"
const loginPage = observer(() => {
  const router = useRouter()
  const inputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then(async (UserCredentialImp) => {
        const { email, displayName, uid, photoURL } = UserCredentialImp.user
        // addUserApi({ email, displayName,  uid, photoURL })
        const newUser: User = { email, displayName, uid, photoURL }
        const user = await getUserApi(uid)
        if (!user) {
          throw new Error("you are not in the system")
        }
        router.push(navNames.edit)
      })
      .catch((err) => {
        console.log(err.message)
        messageStore.setMessage(err.message, 500)
        throw err
      })
  }

  return (
    <div
      className="w-full  h-[100vh] flex  items-center justify-center 
   overflow-hidden bg-[#F3F3F7]"
    >
      <div className="w-[80%] h-[80vh]  bg-white flex items-center  justify-between  rounded-xl shadow-xl p-3">
        <div className="relative flex flex-col  items-center justify-center h-full w-[90%] md:w-[50%] lg:w-[30%] ">
          {/* title */}
          <div className="absolute top-1 left-1 text-lg font-bold text-left w-full p-2">
            Shosh Gallery
          </div>
          {/* signin */}
          <div className="w-[80%] flex flex-col gap-4">
            <div className="text-4xl font-bold mb-2">Sign in</div>
            <div className=" font-bold mb-2">
              This site will help you to remember things on much better by
              activate your learning
            </div>

            {/* login button */}
            <button
              onClick={googleSignIn}
              className="bg-[##4284F3]
              mb-2  border-2 border-black  rounded-xl
              w-full py-2 text-white
              font-semibold flex justify-center items-center gap-2 hover:bg-slate-100"
            >
              <Image
                alt="google image"
                width={32}
                height={32}
                className="rounded-lg "
                src={"/images/google.png"}
              />
              <div className="text-black">Sign in with Google</div>
            </button>

            <Alert />
          </div>
        </div>

        <div
          className="hidden bg-login_image h-full w-[60%] rounded-xl
         shadow-lg  items-center justify-center  sm:flex  "
        >
          <div className="text-white font-bold text-5xl rotate-12">
            Shosh Gallery
          </div>
        </div>
      </div>
    </div>
  )
})
export default loginPage

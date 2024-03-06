"use client"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import TopNav from "@/components/topNav"

const AboutPage = observer(() => {
  return (
    <div className="top-div-page">
      <TopNav />
      <div className="flex flex-col items-center">
        <div className="text-4xl font-semibold mt-20">Shosh Yahav</div>
        <div className="text-xl font-medium mt-5">
          Painter with Canvas and Acrilic
        </div>
        {/* <div className="hover:animate-horizontal-round"> */}
        <div
          className="ring-color-change shadow-lg border-2 
         mt-24 rounded-full overflow-hidden 
        ring-4 ring-blue-500"
        >
          <div className="bg-mom w-72 h-72 bg-center bg-cover   " />
        </div>
      </div>
    </div>
  )
})

export default AboutPage

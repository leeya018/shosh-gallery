import React, { FC, useState } from "react"
import Input from "."

import { FaMagnifyingGlass } from "react-icons/fa6"
import { ImageItem } from "@/db/image/interface"
type FilterInputProps = {
  onChange: (e: any) => void
  value: string
  data: ImageItem[]
  setName: (txt: string) => void
}
const FilterInput: FC<FilterInputProps> = ({
  value,
  onChange,
  data,
  setName,
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = (e: any) => {
    setIsFocused(true)
  }
  const handleBlur = (e: any) => {
    setIsFocused(false)
  }
  return (
    <div
      className={`w-full flex    border-color-text-gray  
  px-4  flex-col`}
      // px-4 ${isFocused ? "ring-2 ring-color-blue" : ""}`}
    >
      <div className="flex items-center gap-2 px-10">
        <FaMagnifyingGlass
          size={25}
          className="text-color-text-gray border-b-2"
        />
        <input
          type="text"
          placeholder="search"
          onChange={onChange}
          value={value}
          className="pl-5 w-full py-6  outline-none  border-color-text-gray
       placeholder:text-color-text-gray placeholder:pl-10 "
          onFocus={handleFocus}
          // onBlur={handleBlur}
        />
      </div>
      {isFocused && (
        <ul
          className="absolute top-40 z-10 
        flex flex-col gap-2 bg-gray-200 bg-opacity-30 translate-x-20 w-full"
        >
          {data.map((item, key) => (
            <li
              className="hover:bg-gray-400"
              key={key}
              onClick={(e) => {
                setName(item.name)
                handleBlur(e)
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
export default FilterInput

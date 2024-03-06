type NavNames = {
  home: string
  edit: string
  login: string
  about: string
}
export const navNames: NavNames = {
  home: "/home",
  edit: "/edit",
  login: "/login",
  about: "/about",
}

type Modals = {
  image: string
  editImage: string
}
export const modals: Modals = {
  image: "image",
  editImage: "editImage",
}

export const getUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BASIC_URL
    : process.env.NEXT_PUBLIC_BASIC_URL_PRODUCTION
}

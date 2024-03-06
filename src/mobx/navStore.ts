import { autorun, makeAutoObservable } from "mobx"
import { navNames } from "../../util"

class Nav {
  nav: string = "recs"
  constructor() {
    makeAutoObservable(this)
  }

  setNav = (n: string) => {
    this.nav = n
  }
}

const navStore = new Nav()
export default navStore

autorun(() => {
  console.log(navStore.nav)
})

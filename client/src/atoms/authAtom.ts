import { atom } from 'recoil'
interface userState {
  id?: number,
  username?: string
}
const currentUser = JSON.parse(localStorage.getItem("currentUser") as string) as userState | {
  id: 0,
  username: ''
}
const defaultUserAtom: userState = Object.assign({}, currentUser)

const userAtom = atom<userState>({
  key: 'userState',
  default: defaultUserAtom
})

export default userAtom



import { atom } from 'recoil'
interface userState {
  id?: number,
  username?: string
}

const defaultUserAtom: userState = {
  id: 0,
  username: ''
}

const userAtom = atom<userState>({
  key: 'userState',
  default: defaultUserAtom
})

export default userAtom



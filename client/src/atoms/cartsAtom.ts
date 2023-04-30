import { atom } from 'recoil'
export interface cartState {
  productIds?: number[]
}
const cart = JSON.parse(localStorage.getItem("carts") as string) as cartState | {
  productIds: []
}
export const defaultCartAtom: cartState = Object.assign({}, cart);

const cartAtom = atom<cartState>({
  key: 'cartState',
  default: defaultCartAtom
})
export default cartAtom



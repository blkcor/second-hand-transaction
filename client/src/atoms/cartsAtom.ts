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
//FIXME:cart信息初始化有bug
//TODO:卖家首页添加相关商品信息
//TODO:支付
//TODO:ws聊天（私聊）
//TODO：商品页面添加评论模块

export default cartAtom



export type Product = {
  description: string,
  price: number,
  publishTime: string,
  sellerId: string,
  categoryId: number,
  cover: string,
  status: number,
  imageUrls: string[],
  name: string,
}

type ProductTagMap = {
  [key: string | number]: string
}

export const productTagMap: ProductTagMap = {
  1: 'cloth',
  2: 'electronicProduct',
  3: 'study',
  4: 'music',
  5: 'beauty',
  6: 'others',
}

export const mapEngTagToChn: ProductTagMap = {
  cloth: '衣物服饰',
  electronicProduct: '电子产品',
  study: '学习用品',
  music: '音乐器材',
  beauty: '美妆用品',
  others: '其他',
}

export const productTagColorMap: ProductTagMap = {
  1: 'rgba(96, 165, 250,0.8)',
  2: 'rgba(74, 222, 128,0.8)',
  3: 'rgba(248, 113, 113,0.8)',
  4: 'rgba(192, 132, 252,0.8)',
  5: 'rgba(251, 146, 60,0.8)',
  6: 'rgba(34, 211, 238,0.8)',
}


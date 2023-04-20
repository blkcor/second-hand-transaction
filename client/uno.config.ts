import {
  defineConfig, presetAttributify, presetIcons,
  presetTypography, presetUno, transformerAttributifyJsx
} from 'unocss'

export default defineConfig({
  theme: {
  },
  shortcuts: {
    // 这里可以放全局公共样式
    'h-btn': 'h-48px w-100% bg-#5C33BE b-none text-white rounded-8px'
  },
  safelist: [],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: { 'display': 'inline-block', 'vertical-align': 'middle' },
      collections: {
        carbon: () =>
          import('@iconify-json/carbon').then((i) => i.icons as any),
        maki: () =>
          import('@iconify-json/maki').then((i) => i.icons as any),
        mdi: () =>
          import('@iconify-json/mdi').then((i) => i.icons as any)
      }
    }),
    presetTypography(),
  ],
  transformers: [
    transformerAttributifyJsx()
  ],
})

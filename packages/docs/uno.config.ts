import wmlPreset from '@thinke/unocss-wml-preset'
import { defineConfig, presetIcons, presetWind4, transformerVariantGroup } from 'unocss'
import presetAnimations from 'unocss-preset-animations'

export default defineConfig({
  presets: [
    presetIcons(),
    presetAnimations(),
    presetWind4({

    }), // base
    wmlPreset({
      autoRem: false,
    }) as any, // 预设 & 移动rem兼容 && 移动端向pc适配

  ],
  transformers: [
    transformerVariantGroup(), // text-(16 red)
  ],
  theme: { },
})

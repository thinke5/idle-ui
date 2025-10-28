import { defineConfig, presetIcons, presetWind3, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons(),
    presetWind3({

    }), // base

  ],
  transformers: [
    transformerVariantGroup(), // text-(16 red)
  ],
  theme: { },
})

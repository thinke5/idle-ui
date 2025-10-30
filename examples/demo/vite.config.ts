import demandImport from '@thinke/rollup-plugin-import'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

// console.log(demandImport)

export default defineConfig({
  plugins: [
    //
    solid(),
    visualizer(),
    demandImport({
      libraryMap: {
        '@thinke/idle-ui': {
          module: ({ module, library }) => `import { ${module} } from '${library}/components/${module}'`,
        },
      },
    }),
  ],
})

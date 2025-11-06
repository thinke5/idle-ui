import type { Options as CodePreviewOptions } from '@thinke/remark-plugin-code-preview'
import mdx from '@mdx-js/rollup'
import { tanstackStart } from '@tanstack/solid-start/plugin/vite'
import remarkCodePreview from '@thinke/remark-plugin-code-preview'
import remarkPropsDocgen from '@thinke/remark-plugin-props-docgen'
import dataURIProPlugin from '@thinke/rollup-plugin-datauri-pro'
import dayjs from 'dayjs'
import { encode as base64Encode } from 'js-base64'
import remarkGfm from 'remark-gfm'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig(async ({ command }) => {
  const isBuild = command === 'build'
  const basePath = '/'
  return {
    base: basePath, // isBuild ? `http://cdn.com${basePath}` :
    define: {
      'import.meta.env.PUBLIC_BUILD_TIME': JSON.stringify(dayjs().format('YYYY-MM-DD HH:mm:ss')),
      'import.meta.env.PUBLIC_BASE_PATH': JSON.stringify(basePath),
    },
    plugins: [
    // this is the plugin that enables path aliases
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      dataURIProPlugin(),
      Unocss(),
      solidPlugin({ ssr: true }),
      tanstackStart({
        // spa: {
        //   enabled: true,
        // },
        prerender: {
          enabled: true,
        },
      }),
      mdx({
        include: ['**/*.{md,mdx}'],
        jsxImportSource: '@thinke/idle-ui-docs-2',
        providerImportSource: '@thinke/idle-ui-docs-2/jsx-runtime',
        remarkPlugins: [
          remarkGfm,
          [remarkCodePreview, codePreviewOptions()],
          remarkPropsDocgen,
        ],
      }),
    ],
    resolve: {
      noExternal: ['@thinke/idle-ui', '@ark-ui/solid'],
    },
    server: {
      port: 16677,
    },
  }
})

function codePreviewOptions(): CodePreviewOptions {
  const codeImportTemplate = `import * as code_module_{index} from '{src}';
import code_content_{index} from '{src}?raw';

<CodePreview preview={code_module_{index}} code={code_content_{index}} {otherProps}>
{children}
</CodePreview>
`
  return ({
    mdxJsx: true,
    templateOptions: { ignoreMissing: true },
    // contentPrefix: 'import { CodePreview } from \'~/components/common/codePreview\';',
    template: `{import}\n\n<CodePreview preview={ {preview} } code={ {code} } title="{title}" lang="{lang}"/>`,

    transformTemplateData(data: Record<string, any>) {
      if (['jsx', 'tsx'].includes(data.lang)) {
        const exampleCode = base64Encode(data.preview)
        const componentName = `Preview_${data.index}`
        const importCode = `import * as ${componentName} from "data-pro:text/${data.lang};base64,${exampleCode}";`
        const previewCode = componentName
        const codeCode = JSON.stringify(data.preview)

        return {
          ...data,
          import: importCode,
          preview: previewCode,
          code: codeCode,
        }
      }
      return data
    },
    //
    codeImportTemplate,
  })
}

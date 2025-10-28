import { compile, optimize } from '@tailwindcss/node'
import { Scanner } from '@tailwindcss/oxide'
// import { compile } from 'tailwindcss'

const html = String.raw
const css = String.raw

async function render () {
  const { build } = await compile(css`
    @layer theme, base, components, utilities;
    @import "tailwindcss";
    @plugin "daisyui";
  `, {
    base: '',
    from: 'test.css',
  })

  const content = html`<div class="size-12"></div>`

  const scanner = new Scanner({})
  const candidates = scanner.scanFiles([{ content, extension: 'html' }])

  const { code: styles } = optimize(build(candidates))

  return styles
}

async function main () {
  const code = await render()
  console.log(code)
}
main()

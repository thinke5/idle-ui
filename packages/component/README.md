# IDLE UI

> ! 当前正在开发中

好用的`solidjs`的组件。

## 安装

```sh
pnpm i @thinke/idle-ui
```

## 使用

```tsx
import { Button } from '@thinke/idle-ui'

export default function App() {
  return <Button>App</Button>
};
```

例子中的使用方式，js代码会进行`tree shaking`优化，没有使用的组件的js代码不会被打包，但是css代码**不会被优化**

可以使用`@thinke/rollup-plugin-import`进行优化

```ts
import importPlugin from '@thinke/rollup-plugin-import'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    importPlugin({
      libraryMap: {
        '@thinke/idle-ui': {
          module: ({ module, library }) => `import { ${module} } from '${library}/components/${module}'`,
        },
      },
    }),
  ],
})
```

## 参考

1. [daisyui](https://daisyui.com/)
2. [Ant Design 5](https://ant.design/index-cn?theme=light)
3. [arco.design](https://arco.design/)

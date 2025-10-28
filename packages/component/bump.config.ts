import { defineConfig } from 'bumpp'

export default defineConfig({
  // all: true,
  release: 'next',
  execute: 'npx conventional-changelog -i CHANGELOG.md -s',
  push: false,
})

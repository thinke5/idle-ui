import { Space } from '@thinke/idle-ui'

export default (param: any) => {
  return (
    <Space {...param}>
      <div class="size-20 bg-gray"></div>
      <div class="size-16 bg-gray"></div>
      <div class="size-12 bg-gray"></div>
      <div class="size-8 bg-gray"></div>
      <div class="size-4 bg-gray"></div>
      <div class="size-1 bg-gray"></div>
      <span>TEXT</span>
    </Space>
  )
}

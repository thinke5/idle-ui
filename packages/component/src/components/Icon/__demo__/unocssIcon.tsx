import { Icon } from '@thinke/idle-ui'

export default function () {
  return (
    <p>
      点击<Icon class="text-blue i-mdi:cog" />进入设置页面
      点击<Icon class="bg-yellow text-red text-xl i-mdi:star" />进入收藏页面
      图标<Icon class="i-mdi:loading" spin />旋转时数据正在加载
    </p>
  )
}

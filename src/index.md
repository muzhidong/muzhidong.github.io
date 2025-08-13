---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

# hero:
#   name: "大猿猴的前端世界"
#   text: "一名前端程序猿，目前正在一点点地进步，希望有一天能够在IT行业找到自我的价值。"
#   tagline: My great project tagline
#   actions:
#     - theme: brand
#       text: Markdown Examples
#       link: /markdown-examples
#     - theme: alt
#       text: API Examples
#       link: /api-examples
# 
# features:
#   - title: Feature A
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
#   - title: Feature B
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
#   - title: Feature C
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

<script setup>
import Technology from '../.vitepress/components/Technology.vue'
</script>
<ClientOnly>
  <Technology />
</ClientOnly>

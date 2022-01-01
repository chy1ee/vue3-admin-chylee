<template>
  <el-menu-item 
    v-if="!item.hidden&&hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow&&onlyOneChild.meta" 
    :class="{'submenu-title-noDropdown':!isNest}"
    :index="resolvePath(onlyOneChild.path)"
  >   
    <svg-icon 
      v-if="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" 
      :icon-class="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)"
    />
    <template #title>
      <item :title="onlyOneChild.meta.title" />
    </template>
  </el-menu-item>
  <el-sub-menu v-else-if="!item.hidden" ref="subMenu" :index="item.redirect" popper-append-to-body>
    <template #title>
      <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
    </template>
    <sidebar-item
      v-for="child in item.children"
      :key="child.path"
      :is-nest="true"
      :item="child"
      :base-path="resolvePath(child.path)"
      class="nest-menu"
    />
  </el-sub-menu>
</template>

<script>
import path from 'path'
import { ref } from 'vue'
import FixiOSBug from './FixiOSBug'
//import AppLink from './Link'
import Item from './Item'
export default {
  name: 'SidebarItem',
  components: { Item   }, //AppLink
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    let onlyOneChild = ref(null)

    let hasOneShowingChild = function(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          onlyOneChild.value = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        onlyOneChild.value = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    }

    let resolvePath = (routePath) => {
      let hasBasePath = props.basePath ? props.basePath : "";
      return path.resolve(hasBasePath, routePath)
    }

    return {
      onlyOneChild,
      hasOneShowingChild,
      resolvePath
    }
  }
}
</script>
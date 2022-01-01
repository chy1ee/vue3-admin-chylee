<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        :router="true"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from "vue-router"
import Logo from './Logo'
import SidebarItem from "./SidebarItem.vue"
import variables from '@/styles/variables.scss'

export default {
  components: {
    Logo, SidebarItem
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    let isCollapse = computed(() => { return !store.state.app.sidebar.opened })
    return {
      variables,
      isCollapse: ref(isCollapse),
      routes: computed(() => { return router.options.routes}),
      showLogo: computed(() => { return store.state.settings.sidebarLogo }),
      activeMenu: computed(() => {
        const { meta, path } = router.currentRoute.value
        return meta.activeMenu ? meta.activeMenu : path
      })
    }
  }
}
</script>
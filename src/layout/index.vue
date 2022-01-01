<template>
  <div :class="'app-wrapper' + extendClass">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header': fixedHeader}">
        <navbar />
        <tags-view />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex';
import Sidebar from './components/Sidebar'
import AppMain from './components/AppMain'
import Navbar from './components/Navbar'
import TagsView from './components/TagsView'

export default {
  components: {
    Sidebar, AppMain, Navbar, TagsView
  },
  setup() {
    const store = useStore();
    const sidebar = store.state.app.sidebar
    const device = store.state.app.device
    //const showSettings =  store.state.settings.showSettings
    //const needTagsView = store.state.settings.tagsView
    const fixedHeader = store.state.settings.fixedHeader

    let extendClass = computed(() => {
      let className = sidebar.opened ? ' openSidebar': ' hideSidebar'
      if (sidebar.withoutAnimation) className += ' withoutAnimation'
      if (device === 'mobile') className += ' mobile'
      return className
    })

    return {
      extendClass,
      device,
      sidebar,
      fixedHeader
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
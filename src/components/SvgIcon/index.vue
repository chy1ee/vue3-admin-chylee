<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { computed } from 'vue'

export default {
  name: "svgIcon",
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    let iconName = computed(() => { return `#icon-${props.iconClass}` })
    let svgClass = computed(() => {return props.className ? 'svg-icon ' + props.className : 'svg-icon'})
    return {
      iconName,
      svgClass
    }
  }
}
</script>

<style scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
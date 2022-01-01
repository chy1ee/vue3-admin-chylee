<template>
  <div class="about">
    <h1>{{msg}}</h1>
    <h1>showSettings: {{showSettings}}</h1>
  </div>
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
// import { fetchList } from '../api/article'

export default {
  setup() {
    // axios.get('/article/list').then(res => {
    //   console.log(res)
    // }).catch(error => {
    //   console.log(error)
    // })
    // fetchList().then(res => {
    //   console.log(res)
    // })
    let msg = 'This is an about page2'

    const store = useStore();
    const showSettings = computed(() => store.state.settings.showSettings);
    
    return {
      msg,
      showSettings
    }
  }
}
</script>
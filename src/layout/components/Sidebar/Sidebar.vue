<template>
  <div :class="{'has-logo':showLogo}">
    <sidebar-logo v-if="showLogo" :collapse="isCollapse"/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import SidebarLogo from "@/layout/components/Sidebar/Logo";

export default {
  name: "Sidebar",
  components: {SidebarLogo},
  computed: {
    // TODO 有点混淆，可以处理
    ...mapGetters([
      'sidebar'
    ]),
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style scoped>

</style>

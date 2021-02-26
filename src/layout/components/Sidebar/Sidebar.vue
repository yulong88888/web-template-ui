<template>
  <div :class="{'has-logo':showLogo}">
    <sidebar-logo v-if="showLogo" :collapse="isCollapse"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg"
               :text-color="variables.menuText" :unique-opened="false" :active-text-color="variables.menuActiveText"
               :collapse-transition="false" mode="vertical">
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import SidebarLogo from "@/layout/components/Sidebar/Logo";
import SidebarItem from "@/layout/components/Sidebar/SidebarItem";
import variables from '@/styles/variables.scss'

export default {
  name: "Sidebar",
  components: {SidebarItem, SidebarLogo},
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
    },
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const {meta, path} = route
      // 如果设置了路径，则侧边栏将高亮显示您设置的路径
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    },
  }
}
</script>

<style scoped>

</style>

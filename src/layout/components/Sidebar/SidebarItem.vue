<template>
  <div v-if="!item.hidden">
    <!--    <template-->
    <!--        v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">-->
    <!--      <m-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">-->
    <!--        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">-->
    <!--          <m-item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title"/>-->
    <!--        </el-menu-item>-->
    <!--      </m-link>-->
    <!--    </template>-->

    <template
        v-if="hasOneShowingChild(item.children,item) && (!this.onlyOneChild.children||this.onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <m-link v-if="this.onlyOneChild.meta" :to="resolvePath(this.onlyOneChild.path)">
        <el-menu-item :index="resolvePath(this.onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <m-item :icon="this.onlyOneChild.meta.icon||(item.meta&&item.meta.icon)"
                  :title="this.onlyOneChild.meta.title"/>
        </el-menu-item>
      </m-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title"/>
      </template>
      <sidebar-item v-for="child in item.children" :key="child.path" :is-nest="true" :item="child"
                    :base-path="resolvePath(child.path)" class="nest-menu"/>
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import {isExternal} from '../../utils/validate'
import mItem from './Item'
import mLink from './Link'
import FixIOSBug from './FixIOSBug'

export default {
  name: "SidebarItem",
  components: {mItem, mLink},
  mixins: [FixIOSBug],
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
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // 临时集(如果只有一个显示子级，将使用该集)
          this.onlyOneChild = item
          return true
        }
      })

      // 当只有一个子路由器时，默认情况下会显示该子路由器
      if (showingChildren.length === 1) {
        return true
      }

      // 如果没有子路由就展示父节点
      if (showingChildren.length === 0) {
        this.onlyOneChild = {...parent, path: '', noShowingChildren: true}
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style scoped>

</style>

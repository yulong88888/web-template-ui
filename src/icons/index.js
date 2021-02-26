import Vue from 'vue'
import SvgIcon from "@/layout/components/SvgIcon"

// register globally
Vue.component('svg-icon', SvgIcon)

// TODO 不知道为啥，用了下面的就可以引入svg了
// const req = require.context('@/icons/svg', false, /\.svg$/)
const req = require.context('!svg-sprite-loader?{"symbolId":"icon-[name]"}!./svg', false, /.svg$/)

const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)


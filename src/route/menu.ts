import store from "../pinia/index"
import { userStore } from "../pinia/user/index"
import { storeToRefs } from "pinia"
let menuList: any[] = []
let userState = userStore(store)
let userInfo = storeToRefs(userState).userInfo
let isGuest = userInfo.value.isGuest

const menu = [{
    name: 'news',
    icon: 'icon-xinwennews',
    title: '热点新闻',
    path: '/news'
}, {
    name: 'suggest',
    icon: 'icon-tousujianyi',
    title: '反馈建议',
    path: '/suggest'
}, {
    name: 'calendar',
    icon: 'icon-calendar',
    title: '日历日程',
    path: '/calendar'
}]
const menuAdmin = [{
    name: 'news',
    icon: 'icon-xinwennews',
    title: '热点新闻',
    path: '/news'
}, {
    name: 'user',
    icon: 'icon-user',
    title: '用户管理',
    path: '/user'
}, {
    name: 'suggest',
    icon: 'icon-tousujianyi',
    title: '反馈建议',
    path: '/suggest'
}, {
    name: 'calendar',
    icon: 'icon-calendar',
    title: '日历日程',
    path: '/calendar'
}]
if (isGuest && userInfo.value.rules) {
    menuList = menuAdmin
}else{
    menuList = menu
}
export default menuList
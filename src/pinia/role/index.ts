import { defineStore } from "pinia";
import { reactive, ref } from "vue";
export const roleStore = defineStore("role", () => {
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
    return {
        menu,menuAdmin
    };
});

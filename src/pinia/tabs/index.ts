/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-08-06 12:24:40
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-08-06 14:17:21
 * @FilePath: \manage-system\src\pinia\tabs\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import router from "@/route";
import { error } from "console";
import { defineStore } from "pinia";
import { ref } from "vue";
interface T {
    name: any
    path?: any
    meta?: any,
    color?: any
}
export const tabStore = defineStore('tabs', () => {
    const tabs = ref<T[]>([])
    const activeTab = ref<string>('')
    const addTab = (tab: T) => {
        //数组对象是否包含某个对象
        if (!tabs.value.some(item => item.name === tab.name)) {
            tabs.value.push(tab)
            setColor(tabs.value.length - 1)
            activeTab.value = tab.name

        }
    }
    const setColor = (index: number) => {
        //将index color 改为green 其他为gray
        tabs.value.forEach((item, i) => {
            if (i === index) {
                item.color = 'success'
            }
            else {
                item.color = 'gray'
            }
        })
    }
    const switchTab = (tab:string) => {
        const index = tabs.value.findIndex(item => item.name === tab)
        setColor(index)
        activeTab.value = tab
        //根据入参跳转路由
        router.push(tabs.value[index].path)

    }
    const removeTab = (tab: string) => {
        // 删除数组对象中某个对象
        const index = tabs.value.findIndex(item => item.name === tab)
        if (index > -1) {
            tabs.value.splice(index, 1)
        }
        if (tabs.value.length === 0) {
            router.push("/");
        } else {
            if (activeTab.value === tab) {
                if (index === 0) {
                    setColor(index)
                    router.push(tabs.value[index].path)
                } else {
                    setColor(index - 1)
                    router.push(tabs.value[index - 1].path)
                }
            }
        }

    }
    return {
        tabs,
        addTab,
        removeTab, switchTab
    }
})
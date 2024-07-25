<!--
 * @Author: wway 951357249@qq.com
 * @Date: 2024-07-25 16:36:17
 * @LastEditors: wway 951357249@qq.com
 * @LastEditTime: 2024-07-25 18:23:35
 * @FilePath: \manage-system\src\pages\welcome\index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div>
        <h1 style="margin: 30px;">欢迎来到我的应用！</h1>
        <div class="welcome">
            <Row :gutter="50" justify="center" align="middle">
                <Col :xs="24" :sm="24" :md="12" :lg="12" :xl="6" :xxl="6" v-for="(item, index) in menuList">
                    <router-link :key="item.path" :to="item.path" class="list"
                        :style="{ 'background-color': `rgb(${colorList[index].r},${colorList[index].g},${colorList[index].b} )` }">
                        <Icon :custom="'iconfont ' + item.icon" size="70"></Icon>
                        <span>{{ item.title }}</span>
                    </router-link>
                </Col>
            </Row>

        </div>
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import menuList from '@/route/menu'
//预置一个包含多个多巴胺颜色的数组
const colors = reactive([
    { r: 255, g: 105, b: 180 }, // 鲜艳的粉红色  
    { r: 255, g: 204, b: 0 },   // 鲜艳的黄色  
    { r: 76, g: 175, b: 80 },   // 鲜艳的绿色  
    { r: 0, g: 191, b: 255 },   // 鲜艳的青色  
    { r: 255, g: 69, b: 0 },    // 鲜艳的橙色  
    { r: 102, g: 51, b: 153 },  // 鲜艳的紫色  
    { r: 230, g: 126, b: 34 },  // 鲜艳的琥珀色  
    { r: 127, g: 255, b: 0 },   // 明亮的绿色  
    { r: 255, g: 165, b: 0 },   // 鲜艳的橙色偏黄  
    { r: 255, g: 192, b: 203 }, // 浅粉色  
    { r: 106, g: 90, b: 205 },  // 鲜艳的紫罗兰色  
    { r: 173, g: 255, b: 47 },  // 鲜艳的黄绿色
]);
//打乱数组顺序
const shuffledColors = colors.sort(() => Math.random() - 0.5);
//将打乱顺序后的数组赋值给ref
const colorList = reactive(shuffledColors);
</script>

<style scoped>
h1 {
    font-size: 2em;
    color: #333;
}

.welcome {
    /* display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin: 20px 0;
    align-items: center;
    justify-items: center; */

}

.list {
    box-sizing: border-box;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.5);
    display: grid;
    grid-template-columns: 1fr 5fr;
    gap: 10px;
    padding: 50px;
    align-items: center;
    justify-items: center;
    color: white;
    font-size: 30px;
    text-align: center;
    text-decoration: none
}
</style>
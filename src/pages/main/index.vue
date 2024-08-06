<!--
 * @Author: wway 951357249@qq.com
 * @Date: 2024-07-24 16:55:11
 * @LastEditors: wway 951357249@qq.com
 * @LastEditTime: 2024-07-31 12:04:55
 * @FilePath: \manage-system\src\pages\main\index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<script lang="ts" setup>
import { ref, reactive, getCurrentInstance } from "vue";
let msg = ref();
msg.value = "aaaa";
let newList = ref([]);
const currentInstance = getCurrentInstance() as any;
const { proxy } = currentInstance;
let loading = ref(true);
//console.log(proxy.$axios);
proxy
  .$axios({
    url: "news/queryNews",
    methods: "post",
  })
  .then((res: any) => {
    //console.log(res);
    loading.value = false;
    newList.value = res;
  });
</script>
<template lang="">
  <Skeleton animated :loading="loading" />
  <List item-layout="horizontal" footer="已经到底啦">
    <ListItem v-for="item in newList" :key="item.title">
      <Row :gutter="50" justify="center" align="middle">
        <Col :xs="24" :sm="12" :md="10" :lg="10" :xl="8" :xxl="5"
          >
          <img :src="item.pic" alt=""
        /></Col>
        <Col :xs="24" :sm="12" :md="14" :lg="8" :xl="11" :xxl="15">
          <Link :to="item.href" target="_blank">
            <Title :level="2" :style="{ color: 'blue' }">{{
              item.title
            }}</Title>
          </Link>
          <Paragraph
            ellipsis="ellipsis"
            :ellipsis-config="{ rows: 2, tooltip: true }"
            >{{ item.content }}</Paragraph
          >
        </Col>

        <Col :xs="24" :sm="24" :md="24" :lg="6" :xl="4" :xxl="4">
          <NumberInfo sub-title="热度指数">
            <template #total>
              <CountUp :end="item.hot * 1" :duration="2" />
            </template> </NumberInfo
        ></Col>
      </Row>
    </ListItem>
  </List>
</template>

<style lang="scss">
.ivu-row {
  width: 100% !important;
}
</style>

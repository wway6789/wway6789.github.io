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
let arr = [
  {
    type: "a",
    QIYEPAY: "200",
    FUWUPAY: "300",
    QIYETOTALPAY: "400",
    HONGBAOPAY: "300",
    FENBEIPAY: "100",
  },
  {
    type: "b",
    QIYEPAY: "300",
    FUWUPAY: "300",
    QIYETOTALPAY: "400",
    HONGBAOPAY: "300",
    FENBEIPAY: "100",
  },
  {
    type: "c",
    QIYEPAY: "400",
    FUWUPAY: "300",
    QIYETOTALPAY: "400",
    HONGBAOPAY: "300",
    FENBEIPAY: "100",
  },
  {
    type: "d",
    QIYEPAY: "500",
    FUWUPAY: "300",
    QIYETOTALPAY: "400",
    HONGBAOPAY: "300",
    FENBEIPAY: "100",
  },
  {
    type: "e",
    QIYEPAY: "600",
    FUWUPAY: "300",
    QIYETOTALPAY: "400",
    HONGBAOPAY: "300",
    FENBEIPAY: "100",
  },
  {
    type: "f",
    QIYEPAY: "700",
    FUWUPAY: "300",
    QIYETOTALPAY: "0",
    HONGBAOPAY: "300",
    FENBEIPAY: "100",
  },
  {
    type: "g",
    QIYEPAY: "200",
    FUWUPAY: "300",
    QIYETOTALPAY: "400",
    HONGBAOPAY: "300",
    FENBEIPAY: "0",
  },
  {
    type: "h",
    QIYEPAY: "300",
    FUWUPAY: "300",
    QIYETOTALPAY: "400",
    HONGBAOPAY: "300",
    FENBEIPAY: "100",
  },
  {
    type: "i",
    QIYEPAY: "100",
    FUWUPAY: "300",
    QIYETOTALPAY: "400",
    HONGBAOPAY: "300",
    FENBEIPAY: "100",
  },
];
let arr2: any = [];
let indexArr: any = [
  { type: "QIYEPAY", name: "企业支付金额(元)" },
  { type: "FUWUPAY", name: "服务 (元)" },
  { type: "QIYETOTALPAY", name: "企业支付总金额" },
  { type: "HONGBAOPAY", name: "红包券支付全额" },
  { type: "FENBEIPAY", name: "分贝通支付金额" },
]; //列出有哪几种支付方式

indexArr.map((i: any, v: any) => {
  //i 为具体的一种支付方式  i 的种类是固定的
  let obj: any = { name: i.name }; //index
  arr.map((item: any) => {
    obj[item.type] = item[i.type]; //item.type 是对应的酒店 机票 火车 外卖... //item[i] 是酒店/外卖/火车... 下具体使用的支付方式 i 的种类是固定的
    if(item[i.type]*1<1){
      obj[item.type] = '--'
    }
  });
  arr2.push(obj);
});
//console.log(arr2);

// [{ type: 'QIYEPAY', 'a': '200', 'b': '300', 'c': '400', 'd': '500', 'e': '600', 'f': '700', 'g': '200', 'h': '300', 'i': '100' },
// { type: 'FUWUPAY', 'a': '300', 'b': '300', 'c': '300', 'd': '300', 'e': '300', 'f': '300', 'g': '300', 'h': '300', 'i': '300' },
// { type: 'QIYETOTALPAY', 'a': '400', 'b': '400', 'c': '400', 'd': '400', 'e': '400', 'f': '400', 'g': '400', 'h': '400', 'i': '400' },
// { type: 'HONGBAOPAY', 'a': '300', 'b': '300', 'c': '300', 'd': '300', 'e': '300', 'f': '300', 'g': '300', 'h': '300', 'i': '300' }]
</script>
<template lang="">
  <Skeleton animated :loading="loading" />
  <List item-layout="horizontal" footer="已经到底啦">
    <ListItem v-for="item in newList" :key="item.title">
      <Row :gutter="50" justify="center" align="middle">
        <Col :xs="24" :sm="12" :md="10" :lg="10" :xl="8" :xxl="5"
          ><img :src="item.pic" alt=""
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

<template lang="">
  <Space class="ivu-mt" wrap>
    <Button type="primary" @click="exportData(1)"
      ><Icon type="ios-download-outline"></Icon> Export source data</Button
    >
  </Space>
  <Row
    ><Col>
      <Table
        :height="Towinheight()"
        :columns="columns2"
        :data="user.list"
        :loading="loading"
        size="small"
        ref="table"
      ></Table></Col
  ></Row>

  <br />
  <Page
    :total="total"
    v-model="currentPage"
    :page-size="PageSize"
    @on-change="onChange"
    @on-page-size-change="onPagesizeChange"
    show-total
    :page-size-opts="[5, 10, 15, 30, 60, 100, 200]"
    show-elevator
    show-sizer
  />
  <br />
  <Drawer
    :closable="false"
    width="80"
    v-model="isShowDraw"
    draggable
    @on-resize-width="toWidth"
  >
    <p :style="pStyle">User Profile</p>
    <p :style="pStyle">Personal</p>
    <div class="demo-drawer-profile">
      <Row v-for="item in UserProfile">
        <Col span="24" v-if="item[1]">
          <span style="font-weight: 500">{{ item[0] }}</span
          >: {{ item[1] }}
        </Col>
      </Row>
    </div>
    <Divider />
  </Drawer>
</template>

<style lang="scss"></style>
<script setup lang="ts">
import { totalmem } from "os";
import {
  ref,
  reactive,
  computed,
  getCurrentInstance,
  onMounted,
  inject,
  resolveComponent,
} from "vue";
import { Step, Steps, Tag } from "view-ui-plus";
const currentInstance = getCurrentInstance() as any;
const { proxy } = currentInstance;
let columns2: any = ref([]);
let loading = ref(true);
let user = reactive({ list: [] });
let table = ref();
let isShowDraw = ref(false);
console.log(proxy);
const card: any = inject("card");
let winheight = ref(200);
let currentPage = ref(1);
let PageSize = ref(15);
let total = ref(0);
let pStyle = {
  fontSize: "16px",
  color: "rgba(0,0,0,0.85)",
  lineHeight: "24px",
  display: "block",
  marginBottom: "16px",
};
let UserProfile = ref({});
function queryList() {
  loading.value = true;
  columns2.value = [];
  proxy
    .$axios({
      url: "user/queryAll",
      methods: "post",
      data: {
        currentPage: currentPage.value,
        PageSize: PageSize.value,
      },
    })
    .then((res: any) => {
      setTimeout(() => {
        loading.value = false;
      }, 1000);

      Object.keys(res.result[0]).map((item: any, index) => {
        return columns2.value.unshift({
          title: item,
          key: item,
          width:
            item === "pwd" || item === "id" || item === "address" ? 300 : 150,
          fixed: item === "name" ? "left" : "none",
          //   sortable: true,
          //   sortType: "desc",
        });
      });
      columns2.value.push({
        title: "操作",
        key: "option",
        width: 180,
        fixed: "right",
        render(h: any, params: any) {
          return h("div", [
            h(
              resolveComponent("Button"),
              {
                type: "primary",
                size: "small",
                style: {
                  marginRight: "5px",
                },
                onclick: () => {
                  show(params.row);
                },
              },
              "View"
            ),
            h(
              resolveComponent("Button"),
              {
                props: {
                  type: "error",
                  size: "small",
                },
                onclick: () => {
                  remove(params.index);
                },
              },
              "Delete"
            ),
          ]);
        },
      });
      user.list = res.result;
      total.value = res.total;
      console.log(columns2);
    });
}
queryList();
const onPagesizeChange = (pagesize: any) => {
  console.log(event);
  PageSize.value = pagesize;
  queryList();
};
const onChange = (page: any) => {
  console.log(event);
  currentPage.value = page;
  queryList();
};
const Towinheight =()=>{
  if (card.value.offsetHeight - 125 > 400) {
  return  card.value.offsetHeight - 125;
  }
  return null
}
onMounted(() => {
  console.log(card.value.offsetHeight);
  Towinheight()

  console.log(table.value);
});

const exportData = (type: any) => {
  if (type === 1) {
    table.value.exportCsv({
      filename: "userList",
    });
  }
};
const toWidth = (width: any) => {
  console.log(width);
};
const show = (params: any) => {
  console.log(params);
  isShowDraw.value = true;
  UserProfile.value = Object.entries(params).sort();
};
const remove = (index: number) => {
  user.list.splice(index, 1);
  if (user.list.length < 1) {
    queryList();
  }
};
</script>
<style lang="scss" scoped>
.stepsss {
  .ivu-steps-main {
    vertical-align: middle;
  }
}

.ivu-modal {
  top: 10px !important;
}
</style>

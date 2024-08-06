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
        stripe
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
          <Row>
            <Col>
              <span style="font-weight: 500;display: inline-block;">{{ item[0] }}</span
              >:
            </Col>
            <Col  >
              <span style="font-weight: 900;display: inline-block;">{{ item[1] }}</span
              >
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
    <Divider />
  </Drawer>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  computed,
  getCurrentInstance,
  onMounted,
  inject,
  resolveComponent,
  render,
  h,
  watch,
} from "vue";
const currentInstance = getCurrentInstance() as any;
const { proxy } = currentInstance;
let columns2: any = ref([]);
let loading = ref(true);
let user = reactive({ list: [] });
let table = ref();
let isShowDraw = ref(false);
//console.log(proxy);
// const card: any = inject("card");
let winheight = ref(200);
let currentPage = ref(1);
let PageSize = ref(30);
let total = ref(0);
let pStyle = {
  fontSize: "16px",
  color: "rgba(0,0,0,0.85)",
  lineHeight: "24px",
  display: "block",
  marginBottom: "16px",
};
let UserProfile = ref({});
let filterName = ref("")
watch(filterName,(newVal,oldVal)=>{
  console.log(newVal,oldVal)
})
watch(user.list, (newVal, oldVal) => {
  console.log(newVal, oldVal);
});

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
        const column: any = {
          title: item,
          key: item,
          width: item === "pwd" || item === "id" || item === "address" ? 300 : 150

        }
       
        if (item == 'createTime') {
          Object.assign(column, {
            fixed: 'left',
            filters: [
              { label: '最近一周', value: 'week' },
              { label: '最近三天', value: '3day' },
              { label: '最近一天', value: 'day' },
              // 可以根据需要添加更多筛选条件  
            ],
            filterMultiple: false,
            filterMethod: (value: string, column: { createTime: string | number | Date; }) => {
              const rowDate = new Date(column.createTime).getTime()
              const now = new Date().getTime();
              if (value === 'week') {
                filterName.value = value
                total.value = user.list.length;

                return rowDate > now - 7 * 24 * 60 * 60 * 1000;
              } else if (value === '3day') {
                filterName.value = value
                total.value = user.list.length;

                return rowDate > now - 3 * 24 * 60 * 60 * 1000;
              } else if (value === 'day') {
                filterName.value = value
                total.value = user.list.length;
                return rowDate > now - 24 * 60 * 60 * 1000;
              }
              filterName.value = value
              return true; // 默认返回 true，表示不筛选  
            }
          })
        }
        if (item === "name") {
          Object.assign(column, {
            fixed: 'left'
          })
        }
        columns2.value.unshift(column);
      });
      columns2.value.unshift({ title: "序号", key: "index", width: 80, fixed: "left", render(h: any, params: any) {
          return h("div", params.index + 1);
        },
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
      //console.log(columns2);
    });
}
queryList();
const onPagesizeChange = (pagesize: any) => {
  //console.log(event);
  PageSize.value = pagesize;
  queryList();
};
const onChange = (page: any) => {
  //console.log(event);
  currentPage.value = page;
  queryList();
};
const Towinheight = () => {
  console.error(proxy.$refs.table);
  
  return 600
  // if (card.value.offsetHeight - 125 > 400) {
  //   return card.value.offsetHeight - 125;
  // }
  // return null
}
onMounted(() => {
  //console.log(card.value.offsetHeight);
  Towinheight()

  //console.log(table.value);
});

const exportData = (type: any) => {
  if (type === 1) {
    table.value.exportCsv({
      filename: "userList",
    });
  }
};
const toWidth = (width: any) => {
  //console.log(width);
};
const show = (params: any) => {
  //console.log(params);
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

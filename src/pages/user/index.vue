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
import { error } from "console";
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
watch(filterName, (newVal, oldVal) => {
  console.log(newVal, oldVal)
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
      const translations:any = {
        'musicCookie': '音乐cookie',
        'errMsg': '错误信息',
        'model': '型号',
        'pixelRatio': '像素比',
        'windowWidth': '窗口宽度',
        'windowHeight': '窗口高度',
        'system': '系统',
        'language': '语言',
        'version': '版本',
        'deviceOrientation': '设备方向',
        'screenWidth': '屏幕宽度',
        'screenHeight': '屏幕高度',
        'SDKVersion': 'SDK版本',
        'brand': '品牌',
        'fontSizeSetting': '字体大小设置',
        'fontSizeScaleFactor': '字体大小缩放因子',
        'benchmarkLevel': '基准水平',
        'batteryLevel': '电池电量',
        'statusBarHeight': '状态栏高度',
        'bluetoothEnabled': '蓝牙已启用',
        'locationEnabled': '位置已启用',
        'wifiEnabled': 'Wi-Fi已启用',
        'cameraAuthorized': '相机已授权',
        'locationAuthorized': '位置已授权',
        'microphoneAuthorized': '麦克风已授权',
        'notificationAuthorized': '通知已授权',
        'phoneCalendarAuthorized': '手机日历已授权',
        'bluetoothAuthorized': '蓝牙已授权',
        'memorySize': '内存大小',
        'notificationSoundEnabled': '通知声音已启用',
        'abi': '应用二进制接口',
        'deviceAbi': '设备应用二进制接口',
        'cpuType': 'CPU类型',
        'power': '电源',
        'framesetHeight': '框架集高度',
        'framesetWidth': '框架集宽度',
        'locationReducedAccuracy': '位置降低精度',
        'albumAuthorized': '相册已授权',
        'notificationAlertAuthorized': '通知提醒已授权',
        'notificationBadgeAuthorized': '通知徽章已授权',
        'screenTop': '屏幕顶部',
        'notificationSoundAuthorized': '通知声音已授权',
        'host': '主机',
        'appId': '应用ID',
        'env': '环境',
        'theme': '主题',
        'platform': '平台',
        'enableDebug': '启用调试',
        'devicePixelRatio': '设备像素比',
        'mode': '模式',
        'safeArea': '安全区域',
        'collectStatus': '收集状态',
        'id': 'ID',
        'name': '名称',
        'nickname': '昵称',
        'birth': '生日',
        'pwd': '密码',
        'isGuest': '是否为访客',
        'role': '角色',
        'address': '地址',
        'ip': 'IP地址',
        'sportCode': '运动代码',
        'sportConfig': '运动配置',
        'createTime': '创建时间',
        'openInfo': '开放信息'
      };
      Object.keys(res.result[0]).map((item: any, index) => {
        const column: any = {
          title: translations[`${item}`],
          key: item,
          width: item === "pwd" || item === "id" || item === "address" ? 180 : 160

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
        // if (item === "name") {
        //   Object.assign(column, {
        //     fixed: 'left'
        //   })
        // }
        columns2.value.unshift(column);
      });
      columns2.value.unshift({
        title: "序号", key: "index", width: 80, fixed: "left", render(h: any, params: any) {
          return h("div", params.index + 1);
        },
      });
      columns2.value.push({
        title: "操作",
        key: "option",
        width: 180,
        // fixed: "right",
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

  return 300
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

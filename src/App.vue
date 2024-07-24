<script lang="ts" setup>
import menuList from "@/route/menu";
import { ref, computed, getCurrentInstance, watch, provide, reactive } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "./pinia/user";
import sideLogo from '@/assets/logo_side.png'
import Logo from '@/assets/logo.png'
let isCollapsed = ref(false);
console.log(menuList);
const route = useRouter();
const userState = userStore();
let menuitemClasses = computed(() => {
  return ["menu-item", isCollapsed.value ? "collapsed-menu" : ""];
});
let activeName = computed((value) => {
  return route.currentRoute.value.name;
});
const card = ref();
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
provide("card", card);
let loading2 = ref(false);
function toLoading2() {
  loading2.value = true;
  setTimeout(() => {
    loading2.value = false;
    userState.$reset()
    route.push("/login");
  }, 1000);
}
type abcd = {
  a: number,c: any
} & {
  b:number
}
interface abc {
  a:number,
  b:number,c:string,d:number
}

type ad =  abcd &abc 
const acv: ad = reactive({
  a:2,
  b:3,c:'a',d:1
})
const { proxy } = getCurrentInstance() as any;
let isSure = ref(false);

proxy.$axios({
  url: "v1/todayText",
  methods: "post",
}).then((res: any) => {
  if (res) {
    isSure.value = true
  }
});
if(!isSure.value){
  //新开窗口访问
  window.open("https://3t487731l6.vicp.fun/", "_blank");
}
</script>
<template>
  <div v-if="activeName != 'login'" class="layout">
    <Layout :style="{ minHeight: '100vh' }">
      <Sider
        breakpoint="lg"
        collapsible
        collapsed-width="78"
        v-model="isCollapsed"
      >
        <div style="padding: 10px; text-align: center">
          <img
            v-if="!isCollapsed"
            :src="Logo"
            style="width: 100%"
            alt=""
          />
          <img
            v-else
            :src="sideLogo"
            sizes="[]"
            style="width: 100%"
            alt=""
          />
        </div>

        <Menu
          :active-name="activeName"
          theme="dark"
          width="auto"
          :class="menuitemClasses"
        >
          <MenuItem v-for="item in menuList" :name="item.name" :to="item.path">
            <Icon :custom="'iconfont ' + item.icon" size="24"></Icon>
            <span>{{ item.title }}</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Header
          :style="{
            background: '#fff',
            boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)',
            textAlign: 'end',
          }"
        >
          <Space size="large" style="margin-right: 20px;">
            <Avatar :style="{ background: ColorList[Math.floor(Math.random()*3)] }">{{ userState.getUserName4bit }}</Avatar>
          </Space>
          <Button
            type="primary"
            :loading="loading2"
            icon="ios-power"
            @click="toLoading2"
          >
            <span v-if="!loading2">退出</span>
            <span v-else>Loading...</span>
          </Button>
        </Header>
        <Content
          :style="{ padding: '0 16px 16px', height: 'calc(100vh - 64px)' }"
        >
          <Breadcrumb :style="{ margin: '16px 30px' }">
            <BreadcrumbItem>{{ activeName }}</BreadcrumbItem>
          </Breadcrumb>
          <Card>
            <div
              ref="card"
              style="height: calc(100vh - 170px); overflow-y: auto"
            >
              <router-view></router-view>
            </div>
          </Card>
        </Content>
      </Layout>
    </Layout>
  </div>
  <router-view v-else></router-view>
</template>

<style scoped>
@font-face {
  font-family: "iconfont";
  /* Project id 3921923 */
  src: url("//at.alicdn.com/t/c/font_3921923_h8gb1ev3rot.woff2?t=1677579610158")
      format("woff2"),
    url("//at.alicdn.com/t/c/font_3921923_h8gb1ev3rot.woff?t=1677579610158")
      format("woff"),
    url("//at.alicdn.com/t/c/font_3921923_h8gb1ev3rot.ttf?t=1677579610158")
      format("truetype");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-calendar:before {
  content: "\e63b";
}

.icon-xinwennews:before {
  content: "\e665";
}

.icon-gushicijianshang:before {
  content: "\e7a7";
}

.icon-tousujianyi:before {
  content: "\e603";
}

.icon-xiaohua:before {
  content: "\e655";
}

.icon-user:before {
  content: "\ed68";
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.layout-con {
  height: 100%;
  width: 100%;
}

.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}

.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}

.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}

.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}

.dev-run-preview .dev-run-preview-edit {
  display: none;
}
.ss{
  size: 0cap;
}
</style>: any: any
